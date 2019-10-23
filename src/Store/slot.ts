export const State = {
    
    defaultOrder: [0, 1, 2, 3, 4],
    
    //@base64
    assets: { 0: '', 1: '',  2: '', 3: '', 4: '' },

    
    reels: [0, 2, 4], // server should respond with start positions
    prev: [0, 2, 4], // current rotation begins from prev start positions

    spining: false,

    // we apply winning combos after 
    // the reels stop spinning
    combosMatrix: [[false,false,false],
                  [false,false,false],
                  [false,false,false]]
}

export enum ActionType {
    SPIN   = 'REEL_SPIN',
    UPDATE = 'REEL_UPDATE',
}

export const Actions = {

    spin(payload: any) {
        return { 
            type: ActionType.SPIN,
            payload,
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
        
        case ActionType.SPIN:

            state.spining = true; 
            state.prev = state.reels
            const {startPos, rewards} = action.payload
            state.reels = startPos
            state.combosMatrix = rewards.combosMatrix
            setTimeout(() => {
                state.spining = false
            },4000)
            return state

        default:
            return state
    }
}
