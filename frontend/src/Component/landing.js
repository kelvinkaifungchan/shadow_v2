import React from 'react'

import { Login } from '../Pages/Login';
import { Dashboard } from '../Pages/Dashboard';
import { Account } from '../Pages/Account';
import { CreateClassroom } from '../Pages/CreateClassroom';
import { ViewClassroom } from '../Pages/ViewClassroom';
import { CreateSet } from '../Pages/CreateSet';
import { ViewSet } from '../Pages/ViewSet';
import { CreateFlashcard } from '../Pages/CreateFlashcard';
import { ViewFlashCard } from '../Pages/ViewFlashCard';
import { CreateQuizcard } from '../Pages/CreateQuizcard';
import { ViewQuizcard } from '../Pages/ViewQuizcard';
import { ViewQuizcardSubmission } from '../Pages/ViewQuizcardSubmission';

import { CreateDictationcard } from '../Pages/CreateDictationcard';
import { ViewDictationcard } from '../Pages/ViewDictationcard';
import { ViewDictationCardSubmission } from '../Pages/ViewDictationCardSubmission';
import { EditDictationCard } from '../Pages/EditDictationCard';


import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from './PrivateRoute'

class Landing extends React.Component {

    render() {
        return (

            <BrowserRouter>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <PrivateRoute path="/account" component={Account} />
                        <PrivateRoute path="/createclassroom" component={CreateClassroom} />
                        <PrivateRoute path="/viewclassroom" component={ViewClassroom} />
                        <PrivateRoute path="/Createset" component={CreateSet} />
                        <PrivateRoute path="/viewset" component={ViewSet} />
                        <PrivateRoute path="/createFlahscard" component={CreateFlashcard} />
                        <PrivateRoute path="/viewflahscard" component={ViewFlashCard} />
                        <PrivateRoute path="/CreateQuizcard" component={CreateQuizcard} />
                        <PrivateRoute path="/Quizcard" component={ViewQuizcard} />
                        <PrivateRoute path="/ViewQuizcardSubmission" component={ViewQuizcardSubmission} />
                        <PrivateRoute path="/CreateDictationcard" component={CreateDictationcard} />
                        <PrivateRoute path="/ViewDictationcard" component={ViewDictationcard} />
                        <PrivateRoute path="/ViewDictationCardSubmission" component={ViewDictationCardSubmission} />
                        <PrivateRoute path="/EditDictationCard" component={EditDictationCard} />

                        <Route path="/login" component={Login} />
                    </Switch>

               
            </BrowserRouter >
        )
    }
}

export default Landing