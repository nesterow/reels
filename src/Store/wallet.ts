export const State = {
    balance: 50000
}

export enum ActionType {
    INCREMENT = 'WALLET_INC',
    DECREMENT = 'WALLET_DEC',
    UPDATE = 'WALLET_UPDATE',
}

export const Actions = {
    inc(value: number = 1) {
        return {
            type: ActionType.INCREMENT,
            payload: value
        }
    },

    dec(value: number = 1) {
        return {
            type: ActionType.DECREMENT,
            payload: value
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
        case ActionType.INCREMENT:
            state.balance += (action.payload || 1)
            return state
        case ActionType.DECREMENT:
            state.balance -= (action.payload || 1)
            return state
        case ActionType.UPDATE:
            Object.keys(action.payload || {}).map((key) => {
                state[key] = action.payload[key]
            })
            return state
        default:
            return state
    }
}
