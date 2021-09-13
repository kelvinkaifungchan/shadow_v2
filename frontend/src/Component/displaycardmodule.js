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
                        <div className={classes.frame}>
                        <div data-key={i} className={classes.card}>
                            <h4>{card.flashcardTitle}</h4>
                            <p>{card.flashcardBody}</p>
                        </div>
                        </div>
                    )
                })}

                {this.props.cards.quizcard.map((card, i) => {
                    return (
                        <div data-key={i} className={classes.card}>
                            <h4>{card.quizcardTitle}</h4>
                            <p>{card.quizcardRecording}</p>
                        </div>
                    )
                })}

                {this.props.cards.dictationcard.map((card, i) => {
                    return (
                        <div data-key={i} className={classes.card}>
                            <h4>{card.dictationcardTitle}</h4>
                            <p >{card.dictationBody}</p>
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
