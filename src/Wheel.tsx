import * as PReact from 'preact';
const h = PReact.createElement

import {useContext} from 'preact/hooks'
import Context from './Store/Context'
import stylesheet from './Styles/Wheel.style' 


export default (props) => {
    const {assets, defaultOrder, spin, startPosition, prev} = props
    const {classes} = stylesheet(props)
    const seq: any[] = []
    for (let i = 0; i < defaultOrder.length * 3; i++) {
        if (i < defaultOrder.length)
            seq.push((i + prev) % defaultOrder.length) // always begin rotation from prev
        else
            seq.push((i + startPosition) % defaultOrder.length)
    }
    return (
        <div className={ `${classes.wrapper} ${spin ? classes.spin : ''}` }>
            {seq.map((i: number) =>(
                <div className={classes.image}> 
                    <img src={assets[i]}></img> 
                </div>
            ))}
        </div>
    )
}