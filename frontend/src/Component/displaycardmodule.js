import React from 'react';
import { connect } from 'react-redux'

import classes from './displaycardmodule.module.css'

class PureDisplayCardModule extends React.Component {
  
    render() {
        console.log("this.......",this.props)

        return (
            <>
                {this.props.cards.flashcard.map((card, i) => {
                    return (
                        <div data-key={card.id} data-type="flashcard" className={classes.card} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-type="flashcard">{card.flashcardTitle}</h4>
                            <p data-key={card.id} data-type="flashcard">{card.flashcardBody}</p>
                        </div>
                    )
                })}

                {this.props.cards.quizcard.map((card, i) => {
                    return (
                        <div data-key={card.id} data-type="quizcard" className={classes.card} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-type="flashcard">{card.quizcardTitle}</h4>
                            <p data-key={card.id} data-type="flashcard">{card.quizcardRecording}</p>
                        </div>
                    )
                })}

                {this.props.cards.dictationcard.map((card, i) => {
                    return (
                        <div data-key={card.id} data-type="dictationcard" className={classes.card} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={card.id} data-type="flashcard">{card.dictationcardTitle}</h4>
                            <p data-key={card.id} data-type="flashcard">{card.dictationBody}</p>
                        </div>
                    )
                })}
            </>

        );
    }
}
const mapStateToProps = (state) => {
    console.log("state in dashboard", state);

    return {
        cards: state.cardStore.card,
    }
}

export const DisplayCardModule = connect(mapStateToProps, null)(PureDisplayCardModule)
