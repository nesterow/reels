import * as PReact from 'preact'
const h = PReact.createElement

import Wheel from './Wheel'
import Store from './Store'

import stylesheet from './Styles/Slot.style'
import {debug, request} from './Mocks/spinRequest'

import {Actions as SlotActions} from './Store/slot'
import {Actions as PaytableActions} from './Store/paytable'



const doDebug = (reels) => {
    debug(reels).then((data) => {
        Store.dispatch(SlotActions.spin(data))
    })
}

const doRequest= () => {
    request().then((data) => {
        //console.log(data)
        Store.dispatch(SlotActions.spin(data))
        //console.log(data)
        Store.dispatch(PaytableActions.update({table:data.table, rewards: data.rewards}))
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
                <button className={classes.spinButton} onClick={()=> doRequest()}>Spin</button>
            </div>
        </div>
    )
}