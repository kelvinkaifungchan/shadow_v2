import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/actions/action'
import { addBridgeThunk } from '../Redux/actions/bridgeAction'
import classes from './displaycardmodule.module.css'

class PureDisplayCardModule extends React.Component {
    addFlashConnect(e){
        this.props.addBridge({
            type: "flashcard",
            setId: this.props.location.state.set[0].id,
            flashcardId: e.target.attributes["data-key"].value
        })
    }
    addQuizConnect(e){
        this.props.addBridge({
            type: "quizcard",
            setId: this.props.location.state.set[0].id,
            quizcardId: e.target.attributes["data-key"].value
        })
    }
    addDictationcardConnect(e){
        this.props.addBridge({
            type: "dictationcard",
            setId: this.props.location.state.set[0].id,
            quizcardId: e.target.attributes["data-key"].value
        })
    }
    render() {
        console.log("props in display card module",this.props)

        return (
            <>
                {this.props.allCard && this.props.allCard.flashcard.length > 0 ? this.props.allCard.flashcard.map((card, i) => {
                    return (
                        <div data-key={card.id} data-type="flashcard" className={classes.card} onClick={(e)=>{ this.addFlashConnect(e); this.props.toggle(e) }}>
                            <h4 data-key={card.id} data-type="flashcard">{card.flashcardTitle}</h4>
                            <p data-key={card.id} data-type="flashcard">{card.flashcardBody}</p>
                        </div>
                    )
                }): 
                this.props.view && this.props.view.correctflashCard.length > 0 ? this.props.view.correctflashCard.map((card, i) => {
                    return (
                        <div data-key={card.id} data-type="flashcard" className={classes.card} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-type="flashcard">{card.flashcardTitle}</h4>
                            <p data-key={card.id} data-type="flashcard">{card.flashcardBody}</p>
                        </div>
                    )
                })
                : null
                }

                {this.props.allCard && this.props.allCard.quizcard.length > 0 ? this.props.allCard.quizcard.map((card, i) => {
                    return (
                                                                                                    // insert add bridge function here
                        <div data-key={card.id} data-type="quizcard" className={classes.card} onClick={(e)=>{ this.addQuizConnect(e);this.props.toggle(e) }}>
                            <h4 data-key={card.id} data-type="quizcard">{card.quizcardTitle}</h4>
                            <p data-key={card.id} data-type="quizcard">{card.quizcardRecording}</p>
                        </div>
                    )
                }): 
                this.props.view && this.props.view.correctquizCard.length > 0 ? this.props.view.correctquizCard.map((card, i) => {
                    return (
                        <div data-key={card.id} data-type="quizcard" className={classes.card} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-type="quizcard">{card.quizcardTitle}</h4>
                            <p data-key={card.id} data-type="quizcard">{card.quizcardRecording}</p>
                        </div>
                    )
                })
                : null
                }
                {this.props.allCard && this.props.allCard.dictationcard.length > 0 ? this.props.allCard.dictationcard.map((card, i) => {
                    return (
                                                                                                    // insert add bridge function here
                        <div data-key={card.id} data-type="dictationcard" className={classes.card} onClick={(e)=>{ this.addDictationcardConnect(e);this.props.toggle(e) }}>
                            <h4 data-key={card.id} data-type="dictationcard">{card.dictationcardTitle}</h4>
                            <p data-key={card.id} data-type="dictationcard">{card.dictationBody}</p>
                        </div>
                    )
                }): 
                this.props.view && this.props.view.correctdictationCard.length > 0 ? this.props.view.correctdictationCard.map((card, i) => {
                    return (
                        <div data-key={card.id} data-type="flashcard" className={classes.card} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-type="flashcard">{card.dictationcardTitle}</h4>
                            <p data-key={card.id} data-type="flashcard">{card.dictationBody}</p>
                        </div>
                    )
                })
                : null
                }
            </>

        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addBridge: (bridge) => {
            dispatch(addBridgeThunk(bridge))
        },
        getdata: (email) => {
            dispatch(getdataThunk(email))
        }
    }
}

export const DisplayCardModule = connect(null, mapDispatchToProps)(PureDisplayCardModule)
