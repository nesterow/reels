import jss from 'jss'
import jssPreset from 'jss-preset-default'
jss.setup(jssPreset())

import * as PReact from 'preact';
const h = PReact.createElement

import Store from './Store'
import Context from './Store/context'
import { useState } from 'preact/hooks'

import Wallet from './Wallet'
import Slot from './Slot'
import Paytable from './Paytable'
import Debug from './Debug'

import stylesheet from './Styles/App.style'

import {Actions as GlobalActions} from './Store/global'
import {Actions as SlotActions} from './Store/slot'

import getAssets from './Mocks/getAssets'

let unsubscribe = () => {}

const App = () => {
    
    const [time = new Date().getTime(), setTime] = useState(0)
    unsubscribe()
    unsubscribe = Store.subscribe(() => {
        setTime(new Date().getTime())
    })

    const state = Store.getState()
 
    if (!state.global.ready || !state.global.ready) {
        getAssets().then((assets: any) => {
           Store.dispatch(SlotActions.update({assets,}))
           Store.dispatch(GlobalActions.ready(true))
        })
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    const {classes} = stylesheet
    const {locked} = state.global
    //console.log(time)
    return (
        //@ts-ignore
        <Context.Provider value={state}>
            <div className={classes.container + ` ${locked ? classes.disabled : ''}`}>
                <div>
                    <Slot></Slot>
                </div>
                <div>
                    <Paytable></Paytable>
                    <Wallet></Wallet>
                </div> 
            </div>
            <div className={`${locked ? classes.disabled : ''}`}>
                <hr></hr>
                <Debug></Debug>
            </div>
        </Context.Provider>
    )
};


PReact.render(<App />, document.getElementById('root'));