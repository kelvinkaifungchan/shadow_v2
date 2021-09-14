import React from 'react';
import { connect } from 'react-redux'

import classes from './displaycardmodule.module.css'

class PureDisplayCardModule extends React.Component {
  
    render() {
        console.log("this.......",this.props)
           
        return (
            <>
                {this.props.flashcard.map((card, i) => {
                    return (
                        <div data-key={card.id} data-type="flashcard" className={classes.card} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-type="flashcard">{card.flashcardTitle}, flashcard</h4>
                            <p data-key={card.id} data-type="flashcard">{card.flashcardBody}</p>
                        </div>
                    )
                })}

                {this.props.quizcard.map((card, i) => {
                    return (
                        <div data-key={card.id} data-type="quizcard" className={classes.card} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-type="flashcard">{card.quizcardTitle}, quizcard</h4>
                            <p data-key={card.id} data-type="flashcard">{card.quizcardRecording}</p>
                        </div>
                    )
                })}

                {this.props.dictationcard.map((card, i) => {
                    return (
                        <div data-key={card.id} data-type="dictationcard" className={classes.card} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-type="flashcard">{card.dictationcardTitle}, dicktationcard</h4>
                            <p data-key={card.id} data-type="flashcard">{card.dictationBody}</p>
                        </div>
                    )
                })}
            </>

        );
    }
}


export const DisplayCardModule = connect(null, null)(PureDisplayCardModule)
