import React, { useLayoutEffect } from "react"
import { useThree } from "@react-three/fiber"
import Ground from "./Ground"
import Forest from "./Forest"
import Campfire from "./Campfire"
import PicnicTable from "./PicnicTable"

const TABLE_PLACEMENTS: {
    position: [number, number, number]
    rotation: [number, number, number]
}[] = [
    { position: [3.2, 0, 1.5], rotation: [0, -0.6, 0] },
    { position: [-3.0, 0, 1.8], rotation: [0, 0.7, 0] },
    { position: [2.4, 0, -3.0], rotation: [0, 2.4, 0] },
    { position: [-2.8, 0, -2.6], rotation: [0, -2.2, 0] },
]

const CameraRig: React.FC = () => {
    const { camera } = useThree()
    useLayoutEffect(() => {
        camera.lookAt(0, 0.9, 0)
    }, [camera])
    return null
}

/** Full campsite scene: forest clearing, fire, picnic tables */
const CampfireScene: React.FC = () => {
    return (
        <>
            <color attach="background" args={["#190033"]} />
            <fog attach="fog" args={["#190033", 12, 34]} />
            <CameraRig />

            <ambientLight intensity={0.12} color="#4a6a8a" />
            <hemisphereLight args={["#2a1a40", "#0a0610", 0.35]} />

            <Ground />
            <Forest />
            <Campfire />

            {TABLE_PLACEMENTS.map((table, i) => (
                <PicnicTable
                    key={`table-${i}`}
                    position={table.position}
                    rotation={table.rotation}
                    scale={0.95}
                />
            ))}
        </>
    )
}

export default CampfireScene
