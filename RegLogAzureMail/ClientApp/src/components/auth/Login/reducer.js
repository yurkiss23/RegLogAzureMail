import loginService from './loginService';
import { push } from 'connected-react-router';

export const LOGIN_STARTED = "user/REGISTER_STARTED";
export const LOGIN_SUCCESS = "user/REGISTER_SUCCESS";
export const LOGIN_FAILED = "user/REGISTER_FAILED";

const initialState = {
    loading: false,
    success: false,
    failed: false,
    errors: {}
}

export const loginReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case LOGIN_STARTED: {
            console.log('-----Begin login User--------');
            newState = {...state, loading: true};
            break;
        }
        case LOGIN_SUCCESS: {
            console.log('-----Success login User--------');
            newState = {...state, loading: false};
            break;
        }
        case LOGIN_FAILED: {
            console.log('-----Filed login User--------');
            newState = {
                ...state, 
                loading: false, 
                errors: action.servErrors
            };
            break;
        }
        default: {
            return state;
        }
    }
    return newState;
}

export const loginUser = (model) => {
    return (dispatch) => {
        dispatch({type: LOGIN_STARTED});
        loginService.loginUser(model)
            .then((response)=>
            {
                console.log('Server message', response.data);
                dispatch({type: LOGIN_SUCCESS});
                dispatch(push('/cabinet'));
            }, err => {
                dispatch({type: LOGIN_FAILED, servErrors: err.response.data});
                console.log('Server problen in controler message', err.response.data);
            })
            .catch(err=> {
                console.log('Global Server problen in controler message', err);
            });
        // setTimeout(()=> {
        //     dispatch({type: LOGIN_SUCCESS});
        // }, 2000);
    };
}