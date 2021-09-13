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
                        /* <div key={i} className="col  m-1 p-3 border border-4 rounded-lg highlight ">
                            <h4 className="p-3"><strong>{card.title}</strong></h4>
                            <p className="p-3">{card.description}</p>
                        </div> */

                        <table key={i}> 
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
