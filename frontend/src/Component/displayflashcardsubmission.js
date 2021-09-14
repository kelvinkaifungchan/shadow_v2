// import React from 'react';
// import { connect } from 'react-redux'

// import classes from './displayflashcardsubmission.module.css'

// class PureDisplayFlashcardSubmissionModule extends React.Component {

//     render() {
//         return (
//             <>
//                 {this.props.flashcard && this.props.cards.length > 0 ? this.props.sets.map((set, i) => {
//                     return (
//                         <div data-key={set.id} className={classes.set} onClick={(e)=>{this.props.navigate(e)}}>
//                             <h4 data-key={set.id}>{set.title}</h4>
//                             <p data-key={set.id}>{set.description}</p>
//                         </div>
//                     )
//                 }) : null}
//             </>
//         )

//     }
// }


// export const DisplayFlashcardSubmissionModule = connect(null, null)(PureDisplayFlashcardSubmissionModule)
