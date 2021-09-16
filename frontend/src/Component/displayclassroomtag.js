import React from 'react';
import { connect } from 'react-redux'

import classes from './displayclassroomtag.module.css'

class PureDisplayClassroomTag extends React.Component {

    render() {
        console.log("CLASSROOM TAG PROPS",this.props.classrooms);
        return (
            <>
                {this.props.tags && this.props.tags.length > 0 ?this.props.tags.map((tag, i) => {
                        return (
                            <span data-key={i} className={classes.tagbutton}>
                                #{tag.body}
                            </span>
                        )
                }): null}
            </>
        )

    }
}


export const DisplayClassroomTag = connect(null, null)(PureDisplayClassroomTag)