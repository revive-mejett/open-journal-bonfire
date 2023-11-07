import './Background.scss';

const Background = () => {

    console.log("akshan background")

    const leaves = Array.from({ length: 8 }, (_, i) => {
        let randomRotation = Math.floor(Math.random() * 360)
        let sizeMultiplier = Math.floor(Math.random() + 0.5)
        const width = 45 * sizeMultiplier
        const height = 60 * sizeMultiplier
        let styles = {
            transform: `rotate(${randomRotation}deg)`,
            width: `${width}px`,
            height: `${height}px`,
        }

        let newPaperDiv = <div className="leaf" style={styles} key={i}></div>
        // newPaperDiv.style.rotation = `${randomRotation}deg`
        return newPaperDiv
    })


    return (
        <div className="background">
            {leaves}
        </div>
    )
}

export default Background