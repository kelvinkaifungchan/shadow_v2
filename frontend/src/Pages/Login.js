import React from 'react';
import { connect } from 'react-redux'

import { LoginBox } from '../Component/loginbox'
import { SignUp } from '../Component/signupbox';

import '../Component/main.css'


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: Boolean(),
        };
        this.handleshow = this.handleshow.bind(this);
    }

    componentDidUpdate() {
        console.log('didupdate')
        if (this.props.isAuthenticatedMSP === true) {
            this.props.history.push('/')
        }
    }
    // navLogin(e){
    //     e.preventDefault();
    //     console.log('nav')
    //     if(this.props.isAuthenticatedMSP === true){
    //         this.props.history.push('/')
    //     }
    // }
    handleshow() {
        this.setState((prevState) => {
            return {
                show: !prevState.show
            }
        });
    }


    render() {
        const { show } = this.state;
        return (
            <div className="row d-flex align-items-center" id="login">
                <div className="col-6  p-5 d-flex align-items-center">
                        <div className="p-5 mx-5">
                            <div>
                                <p className="landingLogo">shadow.</p>
                                <p className="w-75">Simplifying the process of teaching students how to speak, listen and write second languages online.</p>
                            </div>
                        </div>
                    </div>
                <div className="col-6 p-2 d-flex align-items-center justify-content-center ">
                {!show ? <LoginBox nav={()=>this.navLogin()}handleshow={()=>this.handleshow()}/> : null}
                {show ? <SignUp handleshow={()=>this.handleshow()}/> : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated
    }
}



const connectedLogin = connect(mapStateToProps, null)(Login)
export { connectedLogin as Login };