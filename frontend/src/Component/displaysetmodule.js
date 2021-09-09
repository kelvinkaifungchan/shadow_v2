import React from 'react';
import { connect } from 'react-redux'


class PureDisplaySetModule extends React.Component {

    render() {
        return (
            <div className="col m-1 p-5 border border-4 rounded-lg highlight ">
                <h4><strong>Study Set 1</strong></h4>
                <p>Do you want to start a career in UX Design?  Check the top courses that will help you learn the skills.</p>
            </div>
        );
    }
}


export const DisplaySetModule = connect(null, null)(PureDisplaySetModule)