import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { handleInitialData } from '../actions/shared';
import { setAuthedUser } from '../actions/authedUser';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import LoadingBar  from 'react-redux-loading-bar'


function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const [selectedUserID, setselectedUserID] = useState('')
    const {showPage} = props 

    useEffect(() => {
        dispatch(handleInitialData())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    const handleSelectUser = (e) => {
        setselectedUserID(e.target.value)
    }

    const handleLogin = (e , toLocation) => {
        e.preventDefault();
        dispatch(setAuthedUser(selectedUserID))
        if(showPage)
            showPage()
        else
            history.push('/home')

    }

    return (
        <div className="login-page-container">
            
            <div className="login-card-container">
                
                <div className="login-card">
                <LoadingBar scope="sectionBar" />
                    <div className="welcome-message">
                        <p><b>Welcome to the Would You Rather App!</b></p>
                        <p>Please sign in to continue</p>
                    </div>
                   <div className="login-page-image">
                        <img src="https://equimper.gallerycdn.vsassets.io/extensions/equimper/react-native-react-redux/2.0.6/1602247317454/Microsoft.VisualStudio.Services.Icons.Default" alt="" />
                   </div>
                    <div className="login-form">

                        <form onSubmit={ e => handleLogin(e) }>

                            <label> Sign in</label>
                            <select defaultValue = "" onChange={(e)=> handleSelectUser(e) }>
                                <option value="" disabled>Select User</option>
                                {
                                    Object.keys(users).map(name => {
                                        let user = users[name];
                                        return <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                    })
                                }
                            </select>
                                <button type="submit" disabled={selectedUserID === '' ? true : false}  className='btn'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;