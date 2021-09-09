import React from 'react';
import { connect } from 'react-redux'


class PureNavBar extends React.Component {

    render() {
        console.log("this.props>>>>>>>>>>>",this.props);
        return (
            <div className=" p-3 d-flex  justify-content-between" id="navbar">
                <div>
                    <h2>shadow</h2>
                </div>
                <div>
                   <span>{this.props.classroom}<i className="fas fa-bars"></i></span> 
                </div>
                <div>
                    <i className="fas fa-search"></i>
                    <img src="" alt="Avatar" className="avatar-sm"></img>
                </div>

            </div>

        );
    }
}


export const NavBar = connect(null, null)(PureNavBar)