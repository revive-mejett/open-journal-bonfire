import React from "react"

/** Clearing / ground plane under the campsite */
const Ground: React.FC = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow={false}>
            <circleGeometry args={[28, 48]} />
            <meshStandardMaterial color="#1a1420" roughness={0.95} metalness={0.05} />
        </mesh>
    )
}

export default Ground
