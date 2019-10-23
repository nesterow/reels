
// default values
const table = [
    ['3xCHERRY :TOP',  false, 2000, 1],
    ['3xCHERRY :CENTER',  false, 1000, 1],
    ['3xCHERRY :BOTTOM', false, 4000, 1],
    ['3x7', false, 150, 1],
    ['CHERRY+7', false, 75, 1],
    ['3x3BAR', false, 50, 1],
    ['3x2BAR', false, 20, 1],
    ['3xBAR', false, 10, 1],
    ['BARS+BARS+BARS', false, 5, 1]
];

export const State = {

    // wining combos from server
    // [name, blink?, reward, multiplier]
    table,

    rewards: {
        map: {}
    }

}

export enum ActionType {
    UPDATE  = 'TABLE_UPDATE' 
}

export const Actions = {


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
            Object.keys(state.rewards.map).map((key) => {
                const multiplier = state.rewards.map[key]
                if (multiplier > 0) {
                    const index = parseInt(key)
                    state.table[index][1] = true
                    state.table[index][3] = multiplier
                }
            })
            return state
        

        default:
            return state
    }
}
