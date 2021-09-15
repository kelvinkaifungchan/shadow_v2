import React from 'react';
import { connect } from 'react-redux'

import classes from './displaysettag.module.css'

class PureDisplaySetTag extends React.Component {

    render() {
        console.log("SET TAG PROPS",this.props.sets);
        return (
            <>
                   {this.props.tags.map((tag, i) => {
                        return (
                            <span data-key={i} className={classes.tagbutton}>
                                #{tag.body}
                            </span>
                        )
                })}
            </>
        )

    }
}


export const DisplaySetTag = connect(null, null)(PureDisplaySetTag)