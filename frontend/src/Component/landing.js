import React from 'react'

import { Login } from '../Pages/Login';
import { Dashboard } from '../Pages/Dashboard';
import { Account } from '../Pages/Account';
import { ViewClassroom } from '../Pages/ViewClassroom';
import { ViewSet } from '../Pages/ViewSet';
import { CreateFlashcard } from '../Pages/CreateFlashcard';
import { ViewFlashCard } from '../Pages/ViewFlashCard';
import { CreateQuizcard } from '../Pages/CreateQuizcard';
import { ViewQuizcard } from '../Pages/ViewQuizcard';
import { ViewQuizcardSubmission } from '../Pages/ViewQuizcardSubmission';

import { CreateDictationcard } from '../Pages/CreateDictationcard';
import { ViewDictationcard } from '../Pages/ViewDictationcard';
import { ViewDictationcardSubmission } from '../Pages/ViewDictationCardSubmission';
import { ViewDictationQuestion } from '../Pages/ViewDictationQuestion';


import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from './PrivateRoute'

class Landing extends React.Component {

    render() {
        return (

            <BrowserRouter>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <PrivateRoute path="/account" component={Account} />
                        <PrivateRoute path="/viewclassroom" component={ViewClassroom} />
                        <PrivateRoute path="/viewset" component={ViewSet} />
                        <PrivateRoute path="/createFlashcard" component={CreateFlashcard} />
                        <PrivateRoute path="/viewflashcard" component={ViewFlashCard} />
                        <PrivateRoute path="/createQuizcard" component={CreateQuizcard} />
                        <PrivateRoute path="/viewQuizcard" component={ViewQuizcard} />
                        <PrivateRoute path="/viewQuizcardSubmission" component={ViewQuizcardSubmission} />
                        <PrivateRoute path="/createDictationcard" component={CreateDictationcard} />
                        <PrivateRoute path="/viewDictationcard" component={ViewDictationcard} />
                        <PrivateRoute path="/viewDictationCardSubmission" component={ViewDictationcardSubmission} />
                        <PrivateRoute path="/editDictationCard" component={ViewDictationQuestion} />
                        <Route path="/login" component={Login} />
                    </Switch>

               
            </BrowserRouter >
        )
    }
}

export default Landing