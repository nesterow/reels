import * as PReact from 'preact'
const h = PReact.createElement
import stylesheet from './Styles/Wheel.style' 


export default function (props) {
    const {assets, defaultOrder, spin, startPosition, prev, combos} = props
    const {classes} = stylesheet(props)
    
    const seq: any[] = []
    for (let i = 0; i < defaultOrder.length * 3; i++) {
        if (i < defaultOrder.length && spin)
            seq.push((i + prev) % defaultOrder.length) // always begin rotation from prev
        else
            seq.push((i + startPosition) % defaultOrder.length)
    }

    const isWinning = (i: number) => spin && combos[i % defaultOrder.length]

    return (
        <div className={ `${classes.wrapper} ${spin ? classes.spin : ''}` }>
            {seq.map((symbolNum: number, i: number) =>(
                <div className={classes.image + ` ${isWinning(i) ? classes.win : ''}`}> 
                    <img src={assets[symbolNum]}></img> 
                </div>
            ))}
        </div>
    )
}