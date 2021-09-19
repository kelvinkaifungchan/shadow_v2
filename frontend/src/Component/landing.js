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
                        <PrivateRoute path="/viewclassroom/:id" component={ViewClassroom} />
                        <PrivateRoute path="/viewset/:id" component={ViewSet} />
                        <PrivateRoute path="/createFlashcard/:setId" component={CreateFlashcard} />
                        <PrivateRoute path="/viewflashcard/:id" component={ViewFlashCard} />
                        <PrivateRoute path="/createquizcard/:setId" component={CreateQuizcard} />
                        <PrivateRoute path="/viewquizcard/:id" component={ViewQuizcard} />
                        <PrivateRoute path="/viewquizcardSubmission/:id" component={ViewQuizcardSubmission} />
                        <PrivateRoute path="/createdictationcard/:setId" component={CreateDictationcard} />
                        <PrivateRoute path="/viewdictationcard/:id" component={ViewDictationcard} />
                        <PrivateRoute path="/viewdictationQuestion" component = {ViewDictationQuestion}/>
                        <PrivateRoute path="/viewdictationCardSubmission/:id" component={ViewDictationcardSubmission} />
                        <PrivateRoute path="/editdictationCard" component={ViewDictationQuestion} />
                        <Route path="/login" component={Login} />
                    </Switch>

               
            </BrowserRouter >
        )
    }
}

export default Landing