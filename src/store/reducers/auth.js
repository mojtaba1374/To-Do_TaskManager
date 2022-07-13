const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    let updatedState;
    switch(action.type) {
        case 'SUBMIT_FORM_START':
            updatedState = {
                ...state,
                error: null,
                loading: true
            };
            break;
        case 'SUCCESS_LOGIN':
            updatedState = {
                ...state,
                loading: false,
                accessToken: action.tokenData.access,
                refreshToken: action.tokenData.refresh
            };
            break;
        case 'FAIL_LOGIN':
            updatedState = {
                ...state,
                loading: false,
                error: action.errorData
            };
            break;
        case 'SUCCESS_SIGNUP':
            updatedState = {
                ...state,
                loading: false
            };
            break;
        case 'FAIL_SIGNUP':
            updatedState = {
                ...state,
                loading: false,
                error: action.errorData
            };
            break;
        case 'LOGOUT_USER':
            updatedState = {
                ...state,
                accessToken: null,
                user: null
            };
            break;
        default:
            updatedState = state;
    }
    return updatedState;
};

export default reducer;