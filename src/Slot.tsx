import * as PReact from 'preact'
const h = PReact.createElement

import Wheel from './Wheel'
import {useContext} from 'preact/hooks'
import Store from './Store'
import Context from './Store/Context'
import {Actions} from './Store/slot'
import stylesheet from './Styles/Slot.style'
import {debug, request} from './Mocks/spinRequest'
import {Actions as PaytableActions} from './Store/paytable'

const doDebug = (reels) => {
    debug(reels).then((data) => {
        Store.dispatch(Actions.spin(data))
    })
}

const doRequest= () => {
    request().then((data) => {
        Store.dispatch(Actions.spin(data))
        console.log(data)
        Store.dispatch(PaytableActions.update({table:data.table, rewards: data.rewards}))
    })
}


export default (props) => {
    const {defaultOrder, assets, spining, reels, prev} = useContext(Context).slot
    const {classes} = stylesheet
    
    let landOffsetTimeout = 0
    return (
        <div>
            <div className={classes.box}>
                {
                    reels.map((pos, i) => (
                        <Wheel defaultOrder={defaultOrder}
                               prev={prev[i]}
                               assets={assets} 
                               spin={spining} 
                               startPosition={pos}
                               landOffset={landOffsetTimeout+=0.5}></Wheel>
                    ))
                }
            </div>
            <div>
                <button onClick={()=> doRequest()}>Spin</button>
            </div>
        </div>
    )
}