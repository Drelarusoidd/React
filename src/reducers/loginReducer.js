const initialState = {
    isLogin: false
}

const loginReducer = (state=initialState, action) => {
    switch (action.type) {
        case "login" :
            return {
                ...state,
                isLogin: true
            }
        case "unlogin" :
            return {
                ...state,
                isLogin: false
            }
        default:
            return state;
    }
}

export default loginReducer;
