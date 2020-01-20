const initialState = {
    search: ''
}

export default function searchReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        default:
            return state;
    }
}