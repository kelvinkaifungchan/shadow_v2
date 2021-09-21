import React from 'react';
import { connect } from 'react-redux'
// Require Action
import { getdataThunk } from '../Redux/actions/action'
import { addBridgeThunk } from '../Redux/actions/bridgeAction'
import { deleteCard } from '../Redux/actions/cardAction';
import { deleteBridgeThunk } from '../Redux/actions/bridgeAction';
// Require Css
import classes from './displaycardmodule.module.css'

class PureDisplayCardModule extends React.Component {

    addFlashConnect(e){
        this.props.addBridge({
            type: "set_flashcard",
            setId: parseInt(this.props.match.params.id),
            flashcardId: e.target.attributes["data-key"].value
        })
    }
    addQuizConnect(e){
        this.props.addBridge({
            type: "set_quizcard",
            setId:  parseInt(this.props.match.params.id),
            quizcardId: e.target.attributes["data-key"].value
        })
    }
    addDictationcardConnect(e){
        this.props.addBridge({
            type: "set_dictationcard",
            setId:  parseInt(this.props.match.params.id),
            dictationcardId: e.target.attributes["data-key"].value
        })
    }
    deleteCard(e, cardId) {
        if(e.target.attributes['data-type'].value === "flashcard"){
            this.props.deleteCard({
                type: "flashcard",
                id: cardId,
            })
        } else if(e.target.attributes['data-type'].value === "quizcard"){
            this.props.deleteCard({
                type: "quizcard",
                id: cardId,
            })
        } else if(e.target.attributes['data-type'].value === "dictationcard"){
            this.props.deleteCard({
                type: "dictationcard",
                id: cardId,
            })
        }
        this.deleteBridge(e, cardId)
    }
    deleteBridge(e, cardId) {
        if(e.target.attributes['data-type'].value === "flashcard"){
            if(this.props.match.params.id !== undefined){
                this.props.deleteBridge({
                    type: "set_flashcard",
                    cardId: cardId,
                    setId: parseInt(this.props.match.params.id)
                })
            } else {
                this.props.deleteBridge({
                    type: "set_flashcard",
                    cardId: cardId
                })
            }
        } else if (e.target.attributes['data-type'].value === "quizcard"){
            if(this.props.match.params.id !== undefined){
                this.props.deleteBridge({
                    type: "set_quizcard",
                    cardId: cardId,
                    setId: parseInt(this.props.match.params.id)
                })
            } else {
                this.props.deleteBridge({
                    type: "set_quizcard",
                    cardId: cardId
                })
            }
        } else if (e.target.attributes['data-type'].value === "dictationcard"){
            if(this.props.match.params.id !== undefined){
                this.props.deleteBridge({
                    type: "set_dictationcard",
                    cardId: cardId,
                    setId: parseInt(this.props.match.params.id)
                })
            } else {
                this.props.deleteBridge({
                    type: "set_dictationcard",
                    cardId: cardId
                })
            }
        }
    }

    render() {

        return (
            <>
                {/* flashcard */}
                {this.props.allCard && this.props.allCard.flashcard.length > 0 ? this.props.allCard.flashcard.map((card, i) => {
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="flashcard" className={classes.flashcard} onClick={(e)=>{ this.addFlashConnect(e); this.props.toggle(e) }}>
                            <h4 data-key={card.id} data-del="" data-type="flashcard">{card.flashcardTitle} Add Exist Flashcard</h4>
                            <p data-key={card.id} data-del="" data-type="flashcard">{card.flashcardBody}</p>
                        </div>
                    )
                }): 
                this.props.view && this.props.view.correctflashCard.length > 0 ? this.props.view.correctflashCard.map((card, i) => {
                    
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="flashcard" className={classes.flashcard} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-del="" data-type="flashcard">{card.flashcardTitle} ViewSet</h4>
                            <span className={classes.deletebtn}><i data-del="delete" data-type="flashcard" onClick={(e)=>this.deleteBridge(e, card.id)} className="fas fa-times"></i></span>
                            <p data-key={card.id} data-del="" data-type="flashcard">{card.flashcardBody}</p>
                        </div>
                    )
                })
                : this.props.dash === "dashSet" && this.props.cards.flashcard && this.props.cards.flashcard.length > 0 ? this.props.cards.flashcard.map((card, i)=>{
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="flashcard" className={classes.flashcard} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-del="" data-type="flashcard">{card.flashcardTitle} </h4>
                            <span className={classes.deletebtn}><i data-del="delete" data-type="flashcard" onClick={(e)=>this.deleteCard(e, card.id)} className="fas fa-times"></i></span>
                            <p data-key={card.id} data-del="" data-type="flashcard">{card.flashcardBody}</p>
                        </div>
                    )
                }) : null
                }

                {/* quizcard */}
                {this.props.allCard && this.props.allCard.quizcard.length > 0 ? this.props.allCard.quizcard.map((card, i) => {
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="quizcard" className={classes.quizcard} onClick={(e)=>{ this.addQuizConnect(e);this.props.toggle(e) }}>
                            <h4 data-key={card.id} data-del="" data-type="quizcard">{card.quizcardTitle} Add Exist Quizcard</h4>
                            <p data-key={card.id} data-del="" data-type="quizcard">{card.quizcardRecording}</p>
                        </div>
                    )
                }): 
                this.props.view && this.props.view.correctquizCard.length > 0 ? this.props.view.correctquizCard.map((card, i) => {
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="quizcard" className={classes.quizcard} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-del="" data-type="quizcard">{card.quizcardTitle} ViewSet</h4>
                            <span className={classes.deletebtn} data-del="" ><i data-del="delete" data-type="quizcard" onClick={(e)=>this.deleteBridge(e, card.id)} className="fas fa-times"></i></span>
                        </div>
                    )
                })
                : this.props.dash === "dashSet" && this.props.cards.quizcard && this.props.cards.quizcard.length > 0 ? this.props.cards.quizcard.map((card, i)=>{
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="quizcard" className={classes.quizcard} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-del="" data-type="quizcard">{card.quizcardTitle} </h4>
                            <span className={classes.deletebtn}><i data-del="delete" data-type="quizcard" onClick={(e)=>this.deleteCard(e, card.id)} className="fas fa-times"></i></span>
                        </div>
                    )
                }) : null
                }
                {/* dictationcard */}
                {this.props.allCard && this.props.allCard.dictationcard.length > 0 ? this.props.allCard.dictationcard.map((card, i) => {
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="dictationcard" className={classes.dictationcard} onClick={(e)=>{ this.addDictationcardConnect(e);this.props.toggle(e) }}>
                            <h4 data-key={card.id} data-del="" data-type="dictationcard">{card.dictationcardTitle} Add Exist Dictation Crd</h4>
                            <p data-key={card.id} data-del="" data-type="dictationcard">{card.dictationBody}</p>
                        </div>
                    )
                }): 
                this.props.view && this.props.view.correctdictationCard.length > 0 ? this.props.view.correctdictationCard.map((card, i) => {
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="dictationcard" className={classes.dictationcard} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-del="" data-type="dictationcard">{card.dictationcardTitle} ViewSet</h4>
                            <span className={classes.deletebtn}><i data-del="delete" data-type="dictationcard" onClick={(e)=>this.deleteBridge(e, card.id)} className="fas fa-times"></i></span>
                            <p data-key={card.id} data-del="" data-type="dictationcard">{card.dictationBody}</p>
                        </div>
                    )
                })
                : this.props.dash === "dashSet" && this.props.cards.dictationcard && this.props.cards.dictationcard.length > 0 ? this.props.cards.dictationcard.map((card, i)=>{
                    return (
                        <div key={i} data-key={card.id} data-del="" data-type="dictationcard" className={classes.dictationcard} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-del="" data-type="dictationcard">{card.dictationcardTitle} </h4>
                            <span className={classes.deletebtn}><i data-del="delete" data-type="dictationcard" onClick={(e)=>this.deleteCard(e, card.id)} className="fas fa-times"></i></span>
                            <p data-key={card.id} data-del="" data-type="dictationcard">{card.dictationBody}</p>
                        </div>
                    )
                }) : null
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
        },
        deleteCard: (card) => {
            dispatch(deleteCard(card))
        },
        deleteBridge: (link) => {
            dispatch(deleteBridgeThunk(link))
        }
    }
}

export const DisplayCardModule = connect(null, mapDispatchToProps)(PureDisplayCardModule)
