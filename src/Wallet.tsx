import * as PReact from 'preact';
const h = PReact.createElement

import {useContext, useState} from 'preact/hooks'
import Store from './Store'
import Context from './Store/Context'
import {Actions} from './Store/wallet'

export default () => {

    const {dispatch} = Store
    const {wallet} = useContext(Context)
    return (
        <div>
            <hr></hr>
            <label>Balance $</label>
            <input value={wallet.balance} onBlur={(e) => {
                dispatch(Actions.update({
                    balance: parseInt(e.target.value)
                }))
            }}/>
            <button onClick={() => dispatch(Actions.inc(1))}>
                +
            </button>
        </div>
    )
}