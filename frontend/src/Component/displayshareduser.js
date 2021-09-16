import React from 'react';
import { connect } from 'react-redux'
import classes from './shareusermodal.module.css'


class PureDisplayShareUser extends React.Component {

    render() {
        console.log("SET SHARE PROPS",this.props.shared);
        return (
            <>
                   {this.props.shared &&
                            this.props.shared.length > 0
                            ? this.props.shared.map(
                                (shared, j) => {
                                    return (
                                        <div data-key={shared.id} className={classes.sharingusericon}>
                                            <img src={shared.picture} alt="Avatar"></img>
                                        </div>
                                    )
                                }
                            ) : null
                        }
            </>
        )

    }
}


export const DisplayShareUser = connect(null, null)(PureDisplayShareUser)