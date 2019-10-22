export const State = {
    locked: false,
    ready: false
}

export enum ActionType {
    LOCK = 'GLOBAL_LOCK',
    READY = 'GLOBAL_READY'
}

export const Actions = {
    lock(value: boolean = false) {
        return {
            type: ActionType.LOCK,
            payload: value
        }
    },
    
    ready(value: boolean = false) {
        return {
            type: ActionType.READY,
            payload: value
        }
    },
}


export default function (state: any = State, action: any){
    switch(action.type) {
        case ActionType.READY:
            state.ready = action.payload
            return state
        case ActionType.LOCK:
            state.lock = action.payload
            return state
        default:
            return state
    }
}
