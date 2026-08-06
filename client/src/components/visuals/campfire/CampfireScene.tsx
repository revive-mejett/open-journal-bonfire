import React, { useLayoutEffect } from "react"
import { useThree } from "@react-three/fiber"
import Ground from "./Ground"
import Forest from "./Forest"
import Campfire from "./Campfire"
import PicnicTable from "./PicnicTable"

const TABLE_COUNT = 7
const TABLE_RADIUS = 4.2
/** Leave a gap toward the camera (+Z) so the fire stays readable */
const TABLE_GAP_CENTER = Math.PI / 2
const TABLE_ARC = Math.PI * 2 - 0.9

/** Picnic tables arcing around the fire, benches facing inward */
const TABLE_PLACEMENTS: {
    position: [number, number, number]
    rotation: [number, number, number]
}[] = Array.from({ length: TABLE_COUNT }, (_, i) => {
    const angle = TABLE_GAP_CENTER + 0.45 + (i / (TABLE_COUNT - 1)) * TABLE_ARC
    return {
        position: [
            Math.cos(angle) * TABLE_RADIUS,
            0,
            Math.sin(angle) * TABLE_RADIUS,
        ] as [number, number, number],
        // Orient so the table's ±Z (bench sides) face the fire
        rotation: [0, -angle - Math.PI / 2, 0] as [number, number, number],
    }
})

const CameraRig: React.FC = () => {
    const { camera } = useThree()
    useLayoutEffect(() => {
        // Eye-level gaze toward the far tree line so sky sits above the canopy
        camera.lookAt(0, 2.4, -6)
    }, [camera])
    return null
}

/** Full campsite scene: forest clearing, fire, picnic tables */
const CampfireScene: React.FC = () => {
    return (
        <>
            <color attach="background" args={["#120828"]} />
            <fog attach="fog" args={["#120828", 18, 42]} />
            <CameraRig />

            <ambientLight intensity={0.35} color="#6a8aaa" />
            <hemisphereLight args={["#4a3870", "#1a3a28", 0.7]} />
            {/* Soft moonlight so the green clearing reads without washing out the fire */}
            <directionalLight position={[4, 10, 2]} intensity={0.35} color="#8aa8c8" />

            <Ground />
            <Forest />
            <Campfire />

            {TABLE_PLACEMENTS.map((table, i) => (
                <PicnicTable
                    key={`table-${i}`}
                    position={table.position}
                    rotation={table.rotation}
                    scale={0.95}
                    seed={i + 1}
                />
            ))}
        </>
    )
}

export default CampfireScene
