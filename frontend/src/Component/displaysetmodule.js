import React from 'react';
import { connect } from 'react-redux'

import classes from './displaysetmodule.module.css'

class PureDisplaySetModule extends React.Component {

    render() {
        return (
            <>
                {this.props.sets.map((set, i) => {
                    return (
                        <div className="col">
                        <div data-key={set.id} className={classes.set} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={set.id}><strong data-key={set.id}>{set.title}</strong></h4>
                            <p data-key={set.id}>{set.description}</p>
                        </div>

                        </div>
                    )
                })}
            </>
        )

    }
}


export const DisplaySetModule = connect(null, null)(PureDisplaySetModule)