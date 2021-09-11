import React from 'react';
import '../Component/main.css'

import { connect } from 'react-redux'

// import { Link } from 'react-router-dom';
import { LoginBox } from '../Component/loginbox'
import { SignUp } from '../Component/signupbox';




class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: Boolean(),
        };
        this.handleshow = this.handleshow.bind(this);
    }

    componentDidUpdate() {
        console.log("this.props", this.props);
        if (this.props.isAuthenticatedMSP === true) {
            this.props.history.push('/')
        }
    }
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
                                <h1>shadow.</h1>
                                <h2 className="w-75">Simplifying the process of teaching students how to speak, listen and write second languages online.</h2>
                            </div>
                        </div>
                    </div>
                {!show ? <LoginBox handleshow={()=>this.handleshow()}/> : null}
                {show ? <SignUp handleshow={()=>this.handleshow()}/> : null}
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