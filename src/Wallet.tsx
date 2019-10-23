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
            <label style={{fontSize: 26}} title="Penis Dollars">
                Balance $
            </label>
            <input style={{padding: 12, fontSize: 16}} value={wallet.balance} onBlur={(e) => {
                dispatch(Actions.update({
                    balance: parseInt(e.target.value)
                }))
            }}/>
        </div>
    )
}