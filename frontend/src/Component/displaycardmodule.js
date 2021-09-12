import React from 'react';
import { connect } from 'react-redux'


class PureDisplayCardModule extends React.Component {
  
    render() {
        console.log("this.......",this.props)

        return (
            <>
                {this.props.cards.flashcard.map((card, i) => {
                    return (
                        <div key={i} className="col  m-1 p-3 border border-4 rounded-lg highlight ">
                            <h4 className="p-3"><strong>{card.title}</strong></h4>
                            <p className="p-3">{card.description}</p>
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
