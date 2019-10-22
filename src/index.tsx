import jss from 'jss'
import jssPreset from 'jss-preset-default'
jss.setup(jssPreset())

import * as PReact from 'preact';
const h = PReact.createElement

import getAssets from './Mocks/getAssets'
import Store from './Store'
import Context from './Store/context'
import { useState } from 'preact/hooks'

import {Actions as GlobalActions} from './Store/global'
import {Actions as SlotActions} from './Store/slot'

import Wallet from './Wallet'
import Slot from './Slot'
import Paytable from './Paytable'
import stylesheet from './Styles/App.style'


let unsubscribe = () => {}
const App = () => {
    const [time = new Date().getTime(), setTime] = useState(0)
    unsubscribe()
    unsubscribe = Store.subscribe(() => setTime(new Date().getTime()))

    const {dispatch} = Store
    const state = Store.getState()
    
    if (!state.global.ready)
        getAssets().then((assets: any) => {
            dispatch(SlotActions.update({assets,}))
            dispatch(GlobalActions.ready(true))
        })

    if (!state.global.ready)
        return (
            <div>
                Loading...
            </div>
        )
    
    const {classes} = stylesheet
    
    //console.log(time)
    return (
        //@ts-ignore
        <Context.Provider value={state}>
            <div className={classes.container}>
                <div>
                    <Slot></Slot>
                </div>
                <div>
                    <Paytable></Paytable>
                    <Wallet></Wallet>
                </div> 
            </div>
        </Context.Provider>
    )
};


PReact.render(<App />, document.getElementById('root'));