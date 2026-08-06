import React, { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const EMBER_COUNT = 40

/** Logs, animated flames, warm light, and rising embers */
const Campfire: React.FC = () => {
    const flameRefs = useRef<THREE.Mesh[]>([])
    const emberRefs = useRef<THREE.Points>(null)
    const lightRef = useRef<THREE.PointLight>(null)

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
            const flicker = 0.85 + Math.sin(t * (8 + i * 2) + i) * 0.15
            const bob = Math.sin(t * (6 + i) + i * 1.3) * 0.05
            mesh.scale.setScalar(flicker)
            mesh.position.y = 0.55 + i * 0.25 + bob
        })
        if (lightRef.current) {
            lightRef.current.intensity = 2.2 + Math.sin(t * 9) * 0.35 + Math.sin(t * 13) * 0.15
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

            {[0xff7300, 0xff9900, 0xffd900].map((color, i) => (
                <mesh
                    key={`flame-${i}`}
                    ref={(el) => {
                        if (el) flameRefs.current[i] = el
                    }}
                    position={[0, 0.55 + i * 0.25, 0]}
                >
                    <coneGeometry args={[0.28 - i * 0.05, 0.7 - i * 0.1, 5]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={2.5 - i * 0.4}
                        transparent
                        opacity={0.85 - i * 0.15}
                        roughness={1}
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
