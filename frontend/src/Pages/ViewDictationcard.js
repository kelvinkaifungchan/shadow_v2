import React from 'react';
import { connect } from 'react-redux'

import { Link } from 'react-router-dom';

import { NavBar } from '../Component/navbar';
import { HeadingInput } from '../Component/headinginput';
import {QRModal} from '../Component/qrcode'
import classes from './ViewDictationcard.module.css'


class ViewDictationcard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            type:"dictationcard",
        }
    }
    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    navigateSubmission(e){
        this.props.history.push({
            pathname:`/viewDictationCardSubmission`,
            state: { dictationcard: this.props.location.state.card[0]}
        })
    }

    render() {
        console.log("Props IN VD", this.props);

        return (
            <div>
                <NavBar history={this.props.history} />
                <QRModal modal={this.state} toggle={() => this.toggle()}/>

                <div className={classes.viewdictationcard}>
                    <div className="row d-flex p-4">
                        <div className="col-8">
                            <h1>{this.props.location.state.card[0].dictationcardTitle}</h1>
                        </div>
                    </div>


                    <div className="row d-flex p-4">
                        <div className="col col-12 d-flex justify-content-center align-items-center">
                            <div className={classes.startbtncontainer}>
                                <span className={classes.startbtn}> Start Dictation</span>
                            </div>
                        </div>
                    </div>

                    <div className="row d-flex p-4">
                        <div className="col col-12 justify-content-center align-items-center">
                            <button cards={this.props.cards} onClick={(e)=>{this.navigateSubmission(e)}}>View Submission</button>
                        </div>
                    </div>

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



const connectedViewDictationcard = connect(mapStateToProps, null)(ViewDictationcard)
export { connectedViewDictationcard as ViewDictationcard };