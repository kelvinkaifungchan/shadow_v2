import React from 'react'
import { connect } from 'react-redux'
import { loginUserThunk } from '../Redux/loginbox/action'


class PureSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }
    componentDidUpdate() {
        console.log("this.props", this.props);
        if (this.props.isAuthenticatedMSP === true) {
            this.props.history.push('/')
        }
    }
    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;

        this.setState(state);
    }

    login = (e) => {
        e.preventDefault();
        this.props.loginMDP(this.state.email, this.state.password)
    };

    render() {
        return (

            <div>
                 <div className="p-5">
                        <div className="card bg-light rounded-lg border-0 p-3">
                            <div className="card-body bg-transparent border-0">
                                <form className="text-center" action="/signup" method="post">
                                    <input type="text" name="username" className="form-control mb-4" placeholder="Email" />
                                    <input type="text" name="displayName" className="form-control mb-4" placeholder="Username (for display only)" />
                                    <hr className="pt-2" />
                                    <button type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Signup</button>
                                </form>
                                <a href="/login" className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-outline-dark waves-effect w-100"> Back</button>
                                </a>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("this is state;", state);
    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loginMDP: (email, password) => {
            dispatch(loginUserThunk(email, password))
        }
     
    }
}
export const SignUp = connect(mapStateToProps, mapDispatchToProps)(PureSignUp)
