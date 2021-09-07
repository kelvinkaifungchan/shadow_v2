import React from 'react'
import { connect } from 'react-redux'

import './landing.css'
import {Login}  from "./login";
import {HomePage} from './HomePage';
import Dashboard from './dashboard'

import { BrowserRouter , Route, Switch, Redirect } from "react-router-dom";

const PurePrivateRoute = ({ component, isAuthenticated, ...rest }) => {
    const Component = component;
    console.log("component",component);
    console.log("Component != null",Component != null);
    if (Component != null) {
        return (
            <Route {...rest} render={(props) => (
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
                )
            )} />
        )
    } else {
        return null;
    }
};

const PrivateRoute = connect((state) => ({
    isAuthenticated: state.authStore.isAuthenticated
}))(PurePrivateRoute);

class Landing extends React.Component {

    render() {
        return (

            <BrowserRouter>
                <div className="row d-flex align-items-center" id="landing">
                    <Switch>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <PrivateRoute path="/dashboard" component={Dashboard} />

                        <Route path="/login" component={Login} />
                    </Switch>
                    {/* <div className="col-8 p-5 d-flex align-items-center">
                    <div className="p-5 mx-5">
                        <div>
                            <h1>shadow.</h1>
                            <h2 className="w-75">...is an application that allows language students and tutors to learn and teach through speaking.</h2>
                        </div>
                    </div>
                </div> */}
                    {/* <div className="col-8 p-3"> */}
                    {/*this is login */}
                    
                    {/*this is login */}

                    {/*this is signup */}

                    {/* <div class="p-5">
                        <div class="card bg-light rounded-lg border-0 p-3">
                            <div className="card-body bg-transparent border-0">
                                <form className="text-center" action="/signup" method="post">
                                    <input type="text" name="username" className="form-control mb-4" placeholder="Email" />
                                    <input type="text" name="displayName" className="form-control mb-4" placeholder="Username (for display only)" />
                                    <input <hr class="pt-2" />
                                    <button type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Signup</button>
                                </form>
                                <a href="/login" className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-outline-dark waves-effect w-100"> Back</button>
                                </a>
                            </div>
                        </div>
                    </div> */}

                    {/*this is signup */}

                
            </div>
            </BrowserRouter >
        )
    }
}

export default Landing