import * as PReact from 'preact'
const h = PReact.createElement

import Wheel from './Wheel'
import Store from './Store'

import stylesheet from './Styles/Slot.style'
import {request} from './Mocks/spinRequest'

import {Actions as SlotActions} from './Store/slot'
import {Actions as PaytableActions} from './Store/paytable'
import {Actions as WalletActions} from './Store/wallet'
import {Actions as GlobalActions} from './Store/global'



const doRequest= () => {
    const {dispatch} = Store
    dispatch(GlobalActions.lock(true))
    request().then((data) => {
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
    
    const state = Store.getState()
    const {classes} = stylesheet

    const {defaultOrder, assets, spining, reels, prev, combosMatrix} = state.slot
    let landOffsetTimeout = 0

    //we need to rotate 3x3 matix 90deg
    //because the reels positioned vertically
    const combos = [[],[],[]];
    [0, 1, 2].map((x) => {
        const [y1, y2, y3] = combosMatrix
        combos[x] = [y1[x], y2[x], y3[x]]
    })

    return (
        <div>
            <div className={classes.box}>
                {
                    reels.map((pos, i) => (
                        <Wheel 
                            defaultOrder={defaultOrder}
                            prev={prev[i]}
                            assets={assets} 
                            spin={spining} 
                            startPosition={pos}
                            combos={combos[i]}
                            landOffset={landOffsetTimeout+=0.5}>
                        </Wheel>
                    ))
                }
            </div>
            <div>
                <button className={classes.spinButton} onClick={()=> doRequest()}>
                    Spin
                </button>
            </div>
        </div>
    )
}