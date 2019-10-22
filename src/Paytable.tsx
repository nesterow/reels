import * as PReact from 'preact'
const h = PReact.createElement
import {useContext} from 'preact/hooks'
import Context from './Store/Context'
import stylesheet from './Styles/Paytable.styles'

export default () => {
    const {table} = useContext(Context).paytable
    const {classes} = stylesheet
    return (
        <ul className={classes.table}>{
            table.map((entry: any[]) => {
                const [name, blink, reward, multiplier] = entry
                return (
                <li className={blink && classes.blink}>
                    <span>{name}</span>
                    <span> -- </span>
                    <b title="Penis Dollars">${reward}</b>
                    <b>{(multiplier > 1 ? ' x ' + multiplier : '')}</b> 
                </li>
            )})
        }</ul>
    )
}