import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../Constant/userConstant"
import axios from 'axios';

export const userLoginAction = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const { data } = await axios.post(
            '/api/user/login',
            { email, password },
            config);

        console.log(data);

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const userLogoutAction = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
};

export const userRegisterAction = (name, email, password, picture) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST })

    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }

        const { data } = await axios.post(
            '/api/user',
            { name, email, password, picture },
            config
        );

        console.log(data);

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

        localStorage.setItem('userInfo', JSON.stringify(data));


    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const userProfileAction = (user) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_PROFILE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post('/api/user/profile', user, config);

        dispatch({ type: USER_PROFILE_SUCCESS, payload: data });

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}