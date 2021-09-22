import React from 'react';
import { connect } from 'react-redux'

import { deleteTag } from '../Redux/actions/tagAction';
import classes from './displayclassroomtag.module.css'

class PureDisplayClassroomTag extends React.Component {

    deleteTag(tagId){
        this.props.deleteTag({
            tag: tagId
        })
    }
    
    render() {
        console.log("CLASSROOM TAG PROPS",this.props.tags);
        return (
            <>
                {this.props.tags && this.props.tags.length > 0 ?this.props.tags.map((tag, i) => {
                        return (
                            <span key={i} data-key={i} onClick={()=>this.deleteTag(tag.id)} data-key="delete" className={classes.tagbutton}>
                                #{tag.body}
                            </span>
                        )
                }): null}
            </>
        )

    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteTag: (tag) => {
            console.log("Delete Tag", tag)
            dispatch(deleteTag(tag))
        }
    }
}

export const DisplayClassroomTag = connect(null, mapDispatchToProps)(PureDisplayClassroomTag)