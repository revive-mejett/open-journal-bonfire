import React, { useMemo } from "react"

type TreeProps = {
    position: [number, number, number]
    scale?: number
}

const Tree: React.FC<TreeProps> = ({ position, scale = 1 }) => {
    const trunkHeight = 1.2 * scale
    const foliageY = trunkHeight + 0.9 * scale

    return (
        <group position={position}>
            <mesh position={[0, trunkHeight / 2, 0]}>
                <cylinderGeometry args={[0.12 * scale, 0.18 * scale, trunkHeight, 6]} />
                <meshStandardMaterial color="#2a1810" roughness={0.95} />
            </mesh>
            <mesh position={[0, foliageY, 0]}>
                <coneGeometry args={[0.85 * scale, 2.2 * scale, 7]} />
                <meshStandardMaterial color="#0d1f14" roughness={0.9} />
            </mesh>
            <mesh position={[0, foliageY + 0.7 * scale, 0]}>
                <coneGeometry args={[0.6 * scale, 1.5 * scale, 7]} />
                <meshStandardMaterial color="#123022" roughness={0.9} />
            </mesh>
        </group>
    )
}

/** Ring of stylized trees around the clearing */
const Forest: React.FC = () => {
    const trees = useMemo(() => {
        const items: { position: [number, number, number]; scale: number; key: string }[] = []
        const rings = [
            { radius: 12, count: 14, scaleBase: 1.1 },
            { radius: 16, count: 18, scaleBase: 1.35 },
            { radius: 20, count: 22, scaleBase: 1.6 },
        ]

        rings.forEach((ring, ringIndex) => {
            for (let i = 0; i < ring.count; i++) {
                const angle = (i / ring.count) * Math.PI * 2 + ringIndex * 0.2
                const jitter = ((i * 17 + ringIndex * 9) % 7) * 0.15
                const r = ring.radius + jitter
                const scale = ring.scaleBase + ((i % 5) * 0.08)
                items.push({
                    key: `tree-${ringIndex}-${i}`,
                    position: [Math.cos(angle) * r, 0, Math.sin(angle) * r],
                    scale,
                })
            }
        })

        return items
    }, [])

    return (
        <group>
            {trees.map((tree) => (
                <Tree key={tree.key} position={tree.position} scale={tree.scale} />
            ))}
        </group>
    )
}

export default Forest
