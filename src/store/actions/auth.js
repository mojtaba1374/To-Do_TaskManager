import axios from '../../axios';

const submitFormStart = () => {
    return {
        type: 'SUBMIT_FORM_START'
    };
};

const successSignup = (data) => {
    return {
        type: 'SUCCESS_SIGNUP'
    };
};

const failSignup = (errorData) => {
    return {
        type: 'FAIL_SIGNUP',
        errorData: errorData
    };
};

export const submitSignup = (data) => {
    
    return dispatch => {
        dispatch(submitFormStart());
        axios.post('/api/register/', data)
                .then(response => {
                    // console.log(response.data);  // {username: 'mojtaba', email: 'mojtaba@gmail.com'}
                    dispatch(successSignup());
                })
                .catch(error => {
                    // this.setState({loading: false});
                    // console.log(error.response.data);
                    dispatch(failSignup(error.response.data));
                });
    };
};

// submit for LOG IN


const successLogin = (tokenData) => {
    return {
        type: 'SUCCESS_LOGIN',
        tokenData: tokenData
    };
};

const failLogin = (errorData) => {
    return {
        type: 'FAIL_LOGIN',
        errorData: errorData
    };
};

const logOutUser = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    return {
        type: 'LOGOUT_USER'
    };
};

// export const checkExpirationToken = () => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(logOutUser());
//         }, 3600 * 1000);
//     };
// };

export const submitLogin = (userData) => {
    
    return dispatch => {
        dispatch(submitFormStart());
        axios.post('/api/token/', userData)
            .then(response => {
                // const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                console.log(response.data);
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                localStorage.setItem('email', userData.email);
                localStorage.setItem('password', userData.password);
                // axios.defaults.headers.common['Authorization'] = `bearer ${response.data.token}`;
                dispatch(successLogin(response.data));
                // localStorage.setItem('expirationDate', expirationDate);
                // dispatch(checkExpirationToken());  // bara inke bade expire shodan token log out shavad(bayad karbar ra bargardanim be safhe login)
            })
            .catch(error => {
                console.log(error);
                dispatch(failLogin(error.response));
            });
    };
};

export const autoLogin = () => {
    return dispatch => {
        const accessToken = localStorage.getItem('access');
        // if(!accessToken) {
        //     dispatch(logOutUser());
        // } else {
        //     const expirationDate = new Date(localStorage.getItem('expirationDate'));
        //     if(expirationDate > new Date()) {
        //         dispatch(successLogin(accessToken));
        //     } else {
        //         dispatch(logOutUser());
        //     }
        // }
    };
};
