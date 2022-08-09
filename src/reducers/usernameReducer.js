const initialState = {
    username: ""
}

const usernameReducer = (state=initialState, action) => {
    switch (action.type) {
        case "addUsername" :
            return {
                ...state,
                username: action.payload
            }
        default:
            return state
    }
}

export default usernameReducer;
