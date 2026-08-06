import React from "react"

/** Clearing / ground plane — deep green that stays readable under night lighting */
const Ground: React.FC = () => {
    return (
        <group>
            {/* Outer forest floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow={false}>
                <circleGeometry args={[28, 48]} />
                <meshStandardMaterial
                    color="#2a6b45"
                    emissive="#0d3a22"
                    emissiveIntensity={0.55}
                    roughness={0.98}
                    metalness={0}
                />
            </mesh>
            {/* Inner clearing */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow={false}>
                <circleGeometry args={[10, 40]} />
                <meshStandardMaterial
                    color="#3f8f58"
                    emissive="#14532d"
                    emissiveIntensity={0.7}
                    roughness={0.9}
                    metalness={0}
                />
            </mesh>
            {/* Worn patch around the fire */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow={false}>
                <ringGeometry args={[0.7, 1.7, 28]} />
                <meshStandardMaterial
                    color="#5a6b38"
                    emissive="#2a3218"
                    emissiveIntensity={0.45}
                    roughness={1}
                    metalness={0}
                />
            </mesh>
        </group>
    )
}

export default Ground
