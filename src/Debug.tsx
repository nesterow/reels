import * as PReact from 'preact'
const h = PReact.createElement
import {debug} from './Mocks/spinRequest'
import Store from './Store'
import {Actions as SlotActions} from './Store/slot'
import {Actions as PaytableActions} from './Store/paytable'
import {Actions as WalletActions} from './Store/wallet'
import {Actions as GlobalActions} from './Store/global'


const doDebug = (startPos: any[]) => {
    console.log(startPos)
    const {dispatch} = Store
    dispatch(GlobalActions.lock(true))
    debug(startPos).then((data) => {
        dispatch(WalletActions.dec(1))
        dispatch(SlotActions.spin(data))
        dispatch(PaytableActions.update({
            table:data.table, 
            rewards: data.rewards
        }))
        setTimeout(()=> {
            dispatch(WalletActions.inc(data.rewards.sum))
            dispatch(GlobalActions.lock(false))
        },4500)
    })
}

export default function () {

    this.refs = [{},{},{}]
    const setRef = (dom, reel, name) => this.refs[reel][name] = dom;

    const startPos: any[] = [false, false, false]

    const setStartValues = (reel, symbol) => {
        startPos[reel] = parseInt(symbol)
    }
    const setStartPositions = (reel, pos) => {
        let offset = (startPos[reel] - parseInt(pos))
        // we need to invert offset for negatives
        offset = offset < 0 ? Math.abs(Math.abs(offset) - 5) % 5 : offset
        startPos[reel] = offset
    }

    const spin = () => {
        this.refs.map((e, reel)=>{
            const symbol = e['sym'].value
            const pos = e['pos'].value
            if (symbol && pos) {
                setStartValues(reel, symbol)
                setStartPositions(reel, pos)
            }
        })
        doDebug(startPos)
    }

    return (
        <div>
            <h4>DEBUG AREA</h4>
            {[0,1,2].map((reel)=> (
                <div>
                    <hr></hr>
                    <label>REEL #{reel + 1}: </label>
                    <select ref={(dom) => setRef(dom, reel, 'sym')}>
                        <option value="">Select Symbol</option>
                        <option value="0">3xBAR</option>
                        <option value="1">BAR</option>
                        <option value="2">2xBAR</option>
                        <option value="3">Seven (7)</option>
                        <option value="4">Cherry</option>
                    </select>
                    <select ref={(dom) => setRef(dom, reel, 'pos')}>
                        <option value="0">TOP</option>
                        <option value="1">CENTER</option>
                        <option value="2">BOTTOM</option>
                    </select>
                </div>
            ))}
            <hr></hr>
            <button onClick={() => spin()} style={{padding: 16}}>
                SPIN WITH DEBUG VALUES
            </button>
        </div>
    )
}