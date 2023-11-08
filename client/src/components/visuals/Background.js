import { useEffect, useMemo, useState } from 'react';
import AutumnLeaf from "../../assets/images/autumn_leaf.png";
import './Background.scss';

const generateLeaves = () => {

    let randomRotation = Math.floor(Math.random() * 360)
    let sizeMultiplier = Math.floor(Math.random() + 0.5)
    const width = 45 * sizeMultiplier
    const height = 60 * sizeMultiplier

    const leaves = Array.from({ length: 5 }, (_, i) => {

        let styles = {
            transform: `rotate(${randomRotation}deg)`,
            width: `${width}px`,
            height: `${height}px`,
        }

        let newPaperDiv = <img src={AutumnLeaf} className="leaf tint" style={styles} key={i} alt=""></img>
        // newPaperDiv.style.rotation = `${randomRotation}deg`
        return newPaperDiv
    })

    return leaves
}

const Background = () => {

    const [leaves, setLeaves] = useState([])
    

    const mappedLeaves = useMemo(() => generateLeaves(), [])
    useEffect(() => {
        setLeaves(mappedLeaves)
    }, [mappedLeaves])

    return (
        <div className="background">
            {leaves}
        </div>
    )
}

export default Background