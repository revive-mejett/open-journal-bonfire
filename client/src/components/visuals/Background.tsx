import { useEffect, useMemo, useState } from 'react';
import AutumnLeaf from "../../assets/images/autumn_leaf.png";
import './Background.scss';


/**
 * 
 * generates divs as leaves for the background
 */
function generateLeaves() : React.JSX.Element[] {

    let randomRotation = Math.floor(Math.random() * 360)
    let sizeMultiplier = Math.floor(Math.random() + 0.5)
    const width = 45 * sizeMultiplier
    const height = 60 * sizeMultiplier

    const leaves : React.JSX.Element[] = Array.from({ length: 5 }, (_, i) => {

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

/**
 * background component which will have leaves slide over the screen
 */
const Background : React.FC = () => {

    const [leaves, setLeaves] = useState<React.JSX.Element[] | []>([])
    

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
