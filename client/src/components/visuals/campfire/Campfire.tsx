import React, { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const EMBER_COUNT = 40

type FlameDef = {
    seed: number
    color: number
    height: number
    radius: number
    offset: [number, number, number]
    emissiveIntensity: number
    opacity: number
}

const FLAMES: FlameDef[] = [
    { seed: 1, color: 0xff6a00, height: 0.95, radius: 0.38, offset: [0.02, 0.42, -0.01], emissiveIntensity: 2.4, opacity: 0.88 },
    { seed: 2, color: 0xff8c1a, height: 0.85, radius: 0.3, offset: [-0.06, 0.48, 0.04], emissiveIntensity: 2.2, opacity: 0.8 },
    { seed: 3, color: 0xffb020, height: 0.72, radius: 0.24, offset: [0.05, 0.55, 0.03], emissiveIntensity: 2.0, opacity: 0.72 },
    { seed: 4, color: 0xffd54a, height: 0.55, radius: 0.16, offset: [-0.02, 0.62, -0.04], emissiveIntensity: 2.6, opacity: 0.65 },
    { seed: 5, color: 0xff9a30, height: 0.68, radius: 0.2, offset: [0.08, 0.5, -0.06], emissiveIntensity: 1.8, opacity: 0.55 },
]

/** Deterministic 0–1 noise from seed + index */
function hash(seed: number, i: number) {
    const x = Math.sin(seed * 127.1 + i * 311.7) * 43758.5453
    return x - Math.floor(x)
}

/**
 * Low-poly flame: stacked irregular n-gons that taper to a jagged tip.
 * Looks like flickering fire instead of a clean cone.
 */
function createFlameGeometry(seed: number, height: number, baseRadius: number) {
    const sides = 7
    const rings = [
        { y: 0, r: baseRadius * 0.55 },
        { y: height * 0.18, r: baseRadius },
        { y: height * 0.42, r: baseRadius * 0.78 },
        { y: height * 0.68, r: baseRadius * 0.42 },
        { y: height * 0.88, r: baseRadius * 0.18 },
    ]

    const positions: number[] = []
    const indices: number[] = []

    // Bottom center
    positions.push(0, 0, 0)
    const bottomCenter = 0

    rings.forEach((ring, ringIndex) => {
        for (let s = 0; s < sides; s++) {
            const baseAngle = (s / sides) * Math.PI * 2
            const angleJitter = (hash(seed, ringIndex * 20 + s) - 0.5) * 0.45
            const radiusJitter = 0.65 + hash(seed, ringIndex * 20 + s + 40) * 0.7
            // Outer lobes — some verts push out like flame tongues
            const lobe = s % 3 === 0 ? 1.15 + hash(seed, s + 90) * 0.35 : 1
            const r = ring.r * radiusJitter * lobe
            const yJitter = (hash(seed, ringIndex * 20 + s + 60) - 0.5) * height * 0.04
            positions.push(
                Math.cos(baseAngle + angleJitter) * r,
                ring.y + yJitter,
                Math.sin(baseAngle + angleJitter) * r
            )
        }
    })

    // Jagged tip (slightly off-center)
    const tipIndex = 1 + rings.length * sides
    positions.push(
        (hash(seed, 200) - 0.5) * baseRadius * 0.15,
        height,
        (hash(seed, 201) - 0.5) * baseRadius * 0.15
    )

    // Cap bottom to first ring
    for (let s = 0; s < sides; s++) {
        const a = 1 + s
        const b = 1 + ((s + 1) % sides)
        indices.push(bottomCenter, b, a)
    }

    // Stitch consecutive irregular rings
    for (let r = 0; r < rings.length - 1; r++) {
        const ringA = 1 + r * sides
        const ringB = 1 + (r + 1) * sides
        for (let s = 0; s < sides; s++) {
            const a0 = ringA + s
            const a1 = ringA + ((s + 1) % sides)
            const b0 = ringB + s
            const b1 = ringB + ((s + 1) % sides)
            indices.push(a0, a1, b1)
            indices.push(a0, b1, b0)
        }
    }

    // Tip fan from last ring
    const lastRing = 1 + (rings.length - 1) * sides
    for (let s = 0; s < sides; s++) {
        const a = lastRing + s
        const b = lastRing + ((s + 1) % sides)
        indices.push(a, b, tipIndex)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    return geometry
}

const GLOW_LAYERS = [
    { radius: 0.7, opacity: 0.28, color: "#ff5a1a", y: 0.65 },
    { radius: 1.15, opacity: 0.16, color: "#ff3b10", y: 0.7 },
    { radius: 1.7, opacity: 0.08, color: "#e82200", y: 0.75 },
]

/** Logs, animated irregular flames, warm light, and rising embers */
const Campfire: React.FC = () => {
    const flameRefs = useRef<THREE.Mesh[]>([])
    const glowRefs = useRef<THREE.Mesh[]>([])
    const emberRefs = useRef<THREE.Points>(null)
    const lightRef = useRef<THREE.PointLight>(null)
    const glowLightRef = useRef<THREE.PointLight>(null)

    const flameGeometries = useMemo(
        () => FLAMES.map((f) => createFlameGeometry(f.seed, f.height, f.radius)),
        []
    )

    const outerGlowGeometry = useMemo(
        () => createFlameGeometry(11, 1.15, 0.55),
        []
    )

    const emberGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(EMBER_COUNT * 3)
        for (let i = 0; i < EMBER_COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 0.6
            positions[i * 3 + 1] = Math.random() * 1.5
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.6
        }
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
        return geometry
    }, [])

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        flameRefs.current.forEach((mesh, i) => {
            if (!mesh) return
            const def = FLAMES[i]
            const flickerX = 0.88 + Math.sin(t * (9 + i * 1.7) + i) * 0.14
            const flickerY = 0.92 + Math.sin(t * (7 + i * 2.1) + i * 1.4) * 0.18
            const flickerZ = 0.88 + Math.cos(t * (8 + i * 1.5) + i * 0.7) * 0.14
            const bob = Math.sin(t * (5.5 + i) + i * 1.3) * 0.04
            mesh.scale.set(flickerX, flickerY, flickerZ)
            mesh.position.y = def.offset[1] + bob
            mesh.rotation.y = Math.sin(t * (1.8 + i * 0.4) + i) * 0.2
        })
        const glowPulse = 1 + Math.sin(t * 6.5) * 0.08 + Math.sin(t * 11) * 0.04
        glowRefs.current.forEach((mesh, i) => {
            if (!mesh) return
            const base = GLOW_LAYERS[i]
            const s = glowPulse * (1 + i * 0.03)
            mesh.scale.set(s, s * (0.95 + Math.sin(t * 5 + i) * 0.08), s)
            mesh.position.y = base.y + Math.sin(t * 4 + i) * 0.03
        })
        if (lightRef.current) {
            lightRef.current.intensity = 3.0 + Math.sin(t * 9) * 0.4 + Math.sin(t * 13) * 0.2
        }
        if (glowLightRef.current) {
            glowLightRef.current.intensity = 1.4 + Math.sin(t * 7) * 0.25
        }
        if (emberRefs.current) {
            const positions = emberRefs.current.geometry.attributes.position as THREE.BufferAttribute
            for (let i = 0; i < positions.count; i++) {
                let y = positions.getY(i) + 0.008 + (i % 3) * 0.002
                if (y > 2.2) {
                    y = 0.2
                    positions.setX(i, (Math.random() - 0.5) * 0.5)
                    positions.setZ(i, (Math.random() - 0.5) * 0.5)
                }
                positions.setY(i, y)
            }
            positions.needsUpdate = true
        }
    })

    return (
        <group position={[0, 0, 0]}>
            {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2
                return (
                    <mesh
                        key={`stone-${i}`}
                        position={[Math.cos(angle) * 0.85, 0.08, Math.sin(angle) * 0.85]}
                        rotation={[0, angle, 0]}
                    >
                        <sphereGeometry args={[0.18, 6, 6]} />
                        <meshStandardMaterial color="#3a3540" roughness={0.95} />
                    </mesh>
                )
            })}

            {/* Logs lie flat (cylinders are Y-up by default → pitch π/2 onto the ground) */}
            <mesh position={[0, 0.11, 0]} rotation={[Math.PI / 2, 0, Math.PI / 5]}>
                <cylinderGeometry args={[0.1, 0.12, 1.4, 6]} />
                <meshStandardMaterial color="#3b2416" roughness={0.95} />
            </mesh>
            <mesh position={[0.05, 0.2, 0.02]} rotation={[Math.PI / 2, 0.15, -Math.PI / 3]}>
                <cylinderGeometry args={[0.09, 0.11, 1.3, 6]} />
                <meshStandardMaterial color="#2e1a10" roughness={0.95} />
            </mesh>
            <mesh position={[-0.02, 0.3, -0.04]} rotation={[Math.PI / 2 + 0.12, -0.1, Math.PI / 2]}>
                <cylinderGeometry args={[0.08, 0.1, 1.15, 6]} />
                <meshStandardMaterial color="#4a2c1a" roughness={0.95} />
            </mesh>

            {/* Soft orange-red outer bloom */}
            {GLOW_LAYERS.map((layer, i) => (
                <mesh
                    key={`glow-${i}`}
                    ref={(el) => {
                        if (el) glowRefs.current[i] = el
                    }}
                    position={[0, layer.y, 0]}
                >
                    <sphereGeometry args={[layer.radius, 20, 16]} />
                    <meshBasicMaterial
                        color={layer.color}
                        transparent
                        opacity={layer.opacity}
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}

            {/* Irregular orange-red shell around the core flames */}
            <mesh geometry={outerGlowGeometry} position={[0, 0.4, 0]} scale={[1.35, 1.2, 1.35]}>
                <meshBasicMaterial
                    color="#ff2e00"
                    transparent
                    opacity={0.22}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {FLAMES.map((flame, i) => (
                <mesh
                    key={`flame-${flame.seed}`}
                    ref={(el) => {
                        if (el) flameRefs.current[i] = el
                    }}
                    geometry={flameGeometries[i]}
                    position={flame.offset}
                >
                    <meshStandardMaterial
                        color={flame.color}
                        emissive={flame.color}
                        emissiveIntensity={flame.emissiveIntensity}
                        transparent
                        opacity={flame.opacity}
                        roughness={1}
                        side={THREE.DoubleSide}
                        depthWrite={false}
                    />
                </mesh>
            ))}

            <pointLight
                ref={lightRef}
                position={[0, 1.2, 0]}
                color="#ff9a3c"
                intensity={3.2}
                distance={28}
                decay={1.6}
            />
            <pointLight
                ref={glowLightRef}
                position={[0, 1.0, 0]}
                color="#ff3a12"
                intensity={1.5}
                distance={12}
                decay={2}
            />

            <points ref={emberRefs} geometry={emberGeometry}>
                <pointsMaterial
                    color="#ffb347"
                    size={0.06}
                    sizeAttenuation
                    transparent
                    opacity={0.85}
                    depthWrite={false}
                />
            </points>
        </group>
    )
}

export default Campfire
