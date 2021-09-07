import React from 'react';
import {connect} from 'react-redux'
// import { Link } from 'react-router-dom';
import {logoutNowThunk} from '../Redux/action'
import {LoginBox} from '../Component/loginbox'


class Login extends React.Component {
    

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    render() {
       

        return (
            <div className="row d-flex align-items-center" id="landing">
                <div className="col-6  p-5 d-flex align-items-center">
                        <div className="p-5 mx-5">
                            <div>
                                <h1>shadow.</h1>
                                <h2 className="w-75">...is an application that allows language students and tutors to learn and teach through speaking.</h2>
                            </div>
                        </div>
                    </div>
                 <LoginBox />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated
    }
}
const mapDispatchToProps  = dispatch => {
    return {
        logout: () => {
            dispatch(logoutNowThunk())
        }
    }
}


const connectedLogin= connect(mapStateToProps, mapDispatchToProps)(Login)
export { connectedLogin as Login };