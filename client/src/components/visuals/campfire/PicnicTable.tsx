import React from "react"

type PicnicTableProps = {
    position?: [number, number, number]
    rotation?: [number, number, number]
    scale?: number
}

/** Simple low-poly picnic table with benches */
const PicnicTable: React.FC<PicnicTableProps> = ({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
}) => {
    const wood = "#5c3d2e"
    const woodDark = "#3a2418"

    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Table top */}
            <mesh position={[0, 0.75, 0]}>
                <boxGeometry args={[2.2, 0.08, 0.9]} />
                <meshStandardMaterial color={wood} roughness={0.85} />
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
        </group>
    )
}

export default PicnicTable
