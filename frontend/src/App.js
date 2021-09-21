import React from 'react'

// import Landing from './Component/landing'


import { NavBar } from '../src/Component/navbar';

import { Login } from '../src/Pages/Login';
import { Dashboard } from '../src/Pages/Dashboard';
import { Account } from '../src/Pages/Account';
import { ViewClassroom } from '../src/Pages/ViewClassroom';
import { ViewSet } from '../src/Pages/ViewSet';
import { CreateFlashcard } from '../src/Pages/CreateFlashcard';
import { ViewFlashCard } from '../src/Pages/ViewFlashCard';
import { CreateQuizcard } from '../src/Pages/CreateQuizcard';
import { ViewQuizcard } from '../src/Pages/ViewQuizcard';
import { ViewQuizcardSubmission } from '../src/Pages/ViewQuizcardSubmission';

import { CreateDictationcard } from '../src/Pages/CreateDictationcard';
import { ViewDictationcard } from '../src/Pages/ViewDictationcard';
import { ViewDictationcardSubmission } from '../src/Pages/ViewDictationCardSubmission';
import { ViewDictationQuestion } from '../src/Pages/ViewDictationQuestion';


import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css'
import PrivateRoute from '../src/Component/PrivateRoute'

class App extends React.Component {

  render(){
    console.log('props in app', this.props)
    console.log('state in app', this.state)
    return (
      <div className="App">
        <Router>
        <div className="nav">
        <Route exact to="/" activeClassName="active"><NavBar history={this.props.history}/></Route>
        </div>
         
            {/* Empty Route for getting the location key */}
            <Route render={({location}) => (
                <TransitionGroup>
                <CSSTransition
                key={location.key}
                timeout={250}
                classNames="fade">
                    <Switch location={location}>
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
                        <PrivateRoute path="/viewdictationQuestion/:id" component = {ViewDictationQuestion}/>
                        <PrivateRoute path="/viewdictationCardSubmission/:id" component={ViewDictationcardSubmission} />
                        <PrivateRoute path="/editdictationCard" component={ViewDictationQuestion} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </CSSTransition>
                </TransitionGroup>
            )} />       
            </Router >
    </div>
    )};

}

export default App;
