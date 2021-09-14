import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/actions/action'
import { addBridgeThunk } from '../Redux/actions/bridgeAction'
import classes from './displaycardmodule.module.css'

class PureDisplayCardModule extends React.Component {
  addFlashConnect(e){
    this.props.addBridge({
        type: "set_flashcard",
        setId: this.props.correctSet.id,
        flashcardId: e.target.attributes["data-key"].value
    })
  }
    render() {
        console.log("this.......",this.props)

        return (
            <>
                {this.props.create && this.props.create.connect === "card" ? this.props.flashcard.map((card, i) => {
                    return (
                        <div data-key={card.id} data-type="flashcard" className={classes.card} onClick={(e)=>{ this.addFlashConnect(e); this.props.toggle(e) }}>
                            <h4 data-key={card.id} data-type="flashcard">{card.flashcardTitle}, flashcard</h4>
                            <p data-key={card.id} data-type="flashcard">{card.flashcardBody}</p>
                        </div>
                    )
                }): this.props.flashcard.map((card, i) => {
                    return (
                        <div data-key={card.id} data-type="flashcard" className={classes.card} onClick={(e)=>{this.props.toggle(e)}}>
                            <h4 data-key={card.id} data-type="flashcard">{card.flashcardTitle}, flashcard</h4>
                            <p data-key={card.id} data-type="flashcard">{card.flashcardBody}</p>
                        </div>
                    )
                })}

                {this.props.quizcard.map((card, i) => {
                    return (
                        <div data-key={card.id} data-type="quizcard" className={classes.card} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-type="quizcard">{card.quizcardTitle}, quizcard</h4>
                            <p data-key={card.id} data-type="quizcard">{card.quizcardRecording}</p>
                        </div>
                    )
                })}

                {this.props.dictationcard.map((card, i) => {
                    return (
                        <div data-key={card.id} data-type="dictationcard" className={classes.card} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-type="dictationcard">{card.dictationcardTitle}, dicktationcard</h4>
                            <p data-key={card.id} data-type="dictationcard">{card.dictationBody}</p>
                        </div>
                    )
                })}
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
