import React from 'react';
import { connect } from 'react-redux'


class PureDisplayFlashcardFeedbackModule extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            flashcardid: "1",
            flashcard: this.props.cards.flashcard.filter(flashcard => flashcard.id === 1)
        }
    }
    
    render() {
        console.log("THE PORPS IS HEREEEEEE",this.props)

        return (
            <>
                {this.state.flashcard[0].submission.map((submission, i) => {
                    return (
                        <table data-key={i}> 
                        <th>{submission.feedback[0].flashcardFeedbackTime}</th>
                        <td>{submission.feedback[0].flashcardFeedbackBody}</td>
                        </table>
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

export const DisplayFlashcardFeedbackModule = connect(mapStateToProps, null)(PureDisplayFlashcardFeedbackModule)
