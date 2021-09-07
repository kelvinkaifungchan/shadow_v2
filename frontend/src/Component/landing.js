import React from 'react'

import './landing.css'
import { Login } from "./login";

import { Dashboard } from '../Pages/Dashboard';
import { Account} from '../Pages/Account';
import { CreateClassroomPage } from '../Pages/CreateClassroomPage';
import { ViewClassroomPage } from '../Pages/ViewClassroomPage';
import { CreateSetPage } from '../Pages/CreateSetPage';
import { ViewSetPage } from '../Pages/ViewSetPage';
import { ViewDictationCardSubmission } from '../Pages/ViewDictationCardSubmission';
import { EditDictationCard } from '../Pages/EditDictationCard';







import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from './PrivateRoute'

class Landing extends React.Component {

    render() {
        return (

            <BrowserRouter>
                <div className="row d-flex align-items-center" id="landing">
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <PrivateRoute path="/account" component={Account} />
                        <PrivateRoute path="/createclassroompage" component={CreateClassroomPage} />
                        <PrivateRoute path="/viewclassroompage" component={ViewClassroomPage} />
                        <PrivateRoute path="/CreateSetPage" component={CreateSetPage} />
                        <PrivateRoute path="/ViewSetPage" component={ViewSetPage} />
                        <PrivateRoute path="/ViewDictationCardSubmission" component={ViewDictationCardSubmission} />
                        <PrivateRoute path="/EditDictationCard" component={EditDictationCard} />








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