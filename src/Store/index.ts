
import {combineReducers, createStore} from 'redux'
import global from './global'
import wallet from './wallet'
import slot from './slot'
import paytable from './paytable'

const rootReducer = combineReducers({
    global,
    wallet,
    slot,
    paytable
})


export default createStore(rootReducer)