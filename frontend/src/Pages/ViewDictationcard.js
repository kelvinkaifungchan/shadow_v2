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
            pathname:`/viewdictationCardSubmission/${this.props.match.params.id}`,
            // state: { dictationcard: this.props.location.state.card[0]}
        })
    }
    navigateCanvas(e){
        this.props.history.push({
            pathname:`/viewdictationQuestion/${this.props.match.params.id}`
        })

    }

    render() {
        console.log("Props IN VD", this.props);

        return (
            <div>
                
                <NavBar user={this.props.user} history={this.props.history} />
                <QRModal modal={this.state} toggle={() => this.toggle()} navigate={(e) => this.navigateCanvas(e)}/>
                <div className={classes.viewdictationcard}>
                    <div className="row d-flex p-4">
                        <div className="col-8">
                            {/* <h1>{this.props.location.state.card[0].dictationcardTitle}</h1> */}
                        </div>
                    </div>


                    <div className="row d-flex p-4">
                        <div className="col col-12 d-flex justify-content-center align-items-center">
                            <div className={classes.startbtncontainer}>
                                <span onClick={() => this.toggle()} className={classes.startbtn}> Start Dictation</span>
                            </div>
                        </div>
                    </div>

                    <div className="row d-flex p-4">
                        <div className="col col-12 justify-content-center align-items-center">
                            {/* need to add data-key */}
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