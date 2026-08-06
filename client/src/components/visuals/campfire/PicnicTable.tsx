import React, { useMemo } from "react"

type PicnicTableProps = {
    position?: [number, number, number]
    rotation?: [number, number, number]
    scale?: number
    /** Varies paper layout per table */
    seed?: number
}

type PaperPiece = {
    position: [number, number, number]
    rotation: [number, number, number]
    size: [number, number, number]
}

function papersForSeed(seed: number): PaperPiece[] {
    // Deterministic pseudo-random from seed so layouts stay stable
    const n = (i: number) => {
        const x = Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453
        return x - Math.floor(x)
    }

    const count = 2 + Math.floor(n(0) * 2) // 2–3 scraps
    const pieces: PaperPiece[] = []
    for (let i = 0; i < count; i++) {
        const w = 0.18 + n(i * 3 + 1) * 0.16
        const d = 0.14 + n(i * 3 + 2) * 0.12
        pieces.push({
            position: [
                -0.7 + n(i * 5 + 3) * 1.4,
                0.795,
                -0.28 + n(i * 5 + 4) * 0.56,
            ],
            rotation: [0, (n(i * 5 + 5) - 0.5) * 1.2, 0],
            size: [w, 0.008, d],
        })
    }
    return pieces
}

/** Simple low-poly picnic table with benches, papers, and a warm table lamp glow */
const PicnicTable: React.FC<PicnicTableProps> = ({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    seed = 0,
}) => {
    const wood = "#5c3d2e"
    const woodDark = "#3a2418"
    const papers = useMemo(() => papersForSeed(seed), [seed])

    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Table top — slight warm emissive so yellow light reads on the wood */}
            <mesh position={[0, 0.75, 0]}>
                <boxGeometry args={[2.2, 0.08, 0.9]} />
                <meshStandardMaterial
                    color={wood}
                    emissive="#5a3a10"
                    emissiveIntensity={0.18}
                    roughness={0.85}
                />
            </mesh>
            {/* Legs */}
            <mesh position={[-0.9, 0.35, 0.3]}>
                <boxGeometry args={[0.1, 0.7, 0.1]} />
                <meshStandardMaterial color={woodDark} roughness={0.9} />
            </mesh>
            <mesh position={[0.9, 0.35, 0.3]}>
                <boxGeometry args={[0.1, 0.7, 0.1]} />
                <meshStandardMaterial color={woodDark} roughness={0.9} />
            </mesh>
            <mesh position={[-0.9, 0.35, -0.3]}>
                <boxGeometry args={[0.1, 0.7, 0.1]} />
                <meshStandardMaterial color={woodDark} roughness={0.9} />
            </mesh>
            <mesh position={[0.9, 0.35, -0.3]}>
                <boxGeometry args={[0.1, 0.7, 0.1]} />
                <meshStandardMaterial color={woodDark} roughness={0.9} />
            </mesh>
            {/* Benches */}
            <mesh position={[0, 0.4, 0.85]}>
                <boxGeometry args={[2.0, 0.06, 0.35]} />
                <meshStandardMaterial color={wood} roughness={0.85} />
            </mesh>
            <mesh position={[0, 0.4, -0.85]}>
                <boxGeometry args={[2.0, 0.06, 0.35]} />
                <meshStandardMaterial color={wood} roughness={0.85} />
            </mesh>
            {/* Bench supports */}
            <mesh position={[-0.8, 0.2, 0.85]}>
                <boxGeometry args={[0.08, 0.4, 0.08]} />
                <meshStandardMaterial color={woodDark} roughness={0.9} />
            </mesh>
            <mesh position={[0.8, 0.2, 0.85]}>
                <boxGeometry args={[0.08, 0.4, 0.08]} />
                <meshStandardMaterial color={woodDark} roughness={0.9} />
            </mesh>
            <mesh position={[-0.8, 0.2, -0.85]}>
                <boxGeometry args={[0.08, 0.4, 0.08]} />
                <meshStandardMaterial color={woodDark} roughness={0.9} />
            </mesh>
            <mesh position={[0.8, 0.2, -0.85]}>
                <boxGeometry args={[0.08, 0.4, 0.08]} />
                <meshStandardMaterial color={woodDark} roughness={0.9} />
            </mesh>

            {/* Journal scraps on the table */}
            {papers.map((paper, i) => (
                <mesh key={`paper-${i}`} position={paper.position} rotation={paper.rotation}>
                    <boxGeometry args={paper.size} />
                    <meshStandardMaterial
                        color="#f2e6c4"
                        emissive="#e8c86a"
                        emissiveIntensity={0.35}
                        roughness={0.75}
                        metalness={0}
                    />
                </mesh>
            ))}

            {/* Subtle yellow lamp glow over the tabletop */}
            <pointLight
                position={[0, 1.05, 0]}
                color="#ffd56a"
                intensity={0.55}
                distance={2.8}
                decay={2}
            />
        </group>
    )
}

export default PicnicTable
