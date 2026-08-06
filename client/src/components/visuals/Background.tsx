import React, { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import CampfireScene from "./campfire/CampfireScene"
import "./Background.scss"

const DESKTOP_MQ = "(min-width: 992px)"

/**
 * Site-wide desktop-only Three.js campfire background.
 * Mobile / narrow viewports never mount the WebGL canvas.
 */
const Background: React.FC = () => {
    const [isDesktop, setIsDesktop] = useState(() =>
        typeof window !== "undefined" ? window.matchMedia(DESKTOP_MQ).matches : false
    )
    const [isVisible, setIsVisible] = useState(() =>
        typeof document !== "undefined" ? !document.hidden : true
    )

    useEffect(() => {
        const media = window.matchMedia(DESKTOP_MQ)
        const onChange = () => setIsDesktop(media.matches)
        onChange()
        media.addEventListener("change", onChange)
        return () => media.removeEventListener("change", onChange)
    }, [])

    useEffect(() => {
        const onVisibility = () => setIsVisible(!document.hidden)
        document.addEventListener("visibilitychange", onVisibility)
        return () => document.removeEventListener("visibilitychange", onVisibility)
    }, [])

    if (!isDesktop || !isVisible) {
        return null
    }

    return (
        <div className="background" aria-hidden="true">
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 1.85, 10.5], fov: 45, near: 0.1, far: 80 }}
                gl={{ antialias: true, alpha: false, powerPreference: "low-power" }}
                style={{ width: "100%", height: "100%" }}
            >
                <Suspense fallback={null}>
                    <CampfireScene />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Background
