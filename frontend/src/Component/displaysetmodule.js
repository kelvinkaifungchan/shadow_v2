import React from 'react';
import { connect } from 'react-redux'

import classes from './displaysetmodule.module.css'

class PureDisplaySetModule extends React.Component {

    render() {
        console.log("THISSSSS ISSSS SUCKSSSS", this.props.sets);
        return (
            <>
                {this.props.sets && this.props.sets.length > 0 ? this.props.sets.map((set, i) => {
                    return (
                        <div data-key={set.id} className={classes.set} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={set.id}>{set.title}</h4>
                            <p data-key={set.id}>{set.description}</p>
                        </div>
                    )
                }) : null}

            </>
        )

    }
}


export const DisplaySetModule = connect(null, null)(PureDisplaySetModule)