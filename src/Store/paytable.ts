export const State = {

    // wining combos from server
    // [name, blink?, reward, multiplier]
    table: [
        ['3xCHERRY :TOP',  false, 2000, 1],
        ['3xCHERRY :CENTER',  false, 1000, 1],
        ['3xCHERRY :BOTTOM', false, 4000, 1],
        ['3x7', false, 150, 1],
        ['CHERRY+7', false, 75, 1],
        ['3x3BAR', false, 50, 1],
        ['3x2BAR', false, 20, 1],
        ['3xBAR', false, 10, 1],
        ['BARS+BARS+BARS', false, 5, 1]
    ]

}

export enum ActionType {
    BLINK   = 'TABLE_BLINK',
    UPDATE  = 'TABLE_UPDATE' 
}

export const Actions = {

    blink(combo: string) {
        return { 
            type: ActionType.BLINK,
            payload: combo
        }
    },

    update(new_state: Object | any) {
        return { 
            type: ActionType.UPDATE,
            payload: new_state
        }
    }
}


export default function (state: any = State, action: any){
    switch(action.type) {

        case ActionType.UPDATE:
            Object.keys(action.payload || {}).map((key) => {
                state[key] = action.payload[key]
            })
            return state
        
        case ActionType.BLINK:
            state.map((entry) => {
                const [name] = entry
                if (name === action.payload) {
                    entry[1] = true
                    setTimeout(() => { 
                        entry[1] = false
                    },1000)
                }
            })
            return state

        default:
            return state
    }
}
