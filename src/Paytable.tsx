import * as PReact from 'preact'
const h = PReact.createElement
import {useContext} from 'preact/hooks'
import Context from './Store/Context'
import stylesheet from './Styles/Paytable.styles'

export default (props) => {
    const {table} = useContext(Context).paytable
    const {spining} = useContext(Context).slot
    const {classes} = stylesheet(props)
    return (
        <ul className={classes.table}>{
            table.map((entry: any[]) => {
                const [name, blink, reward, multiplier] = entry
                return (
                <li>
                    <span className={ (spining && blink) ? classes.blink : ''}>{name}</span>
                    <span> -- </span>
                    <b title="Penis Dollars">${reward}</b>
                    <b className={(spining && blink) ? classes.multiplier : classes.hidden}>
                        {(multiplier > 1 ? ' x ' + multiplier : '')}
                    </b> 
                </li>
            )})
        }</ul>
    )
}