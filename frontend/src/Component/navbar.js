import React from 'react';
import { connect } from 'react-redux'

class PureNavBar extends React.Component {

    render() {
        console.log("this.props>>>>>>>>>>>",this.props);
        return (
            <div className=" p-3 d-flex  justify-content-between" id="navbar">
                <div className=" p-3 d-inline-flex">
                    <h2>shadow</h2>
                </div>
                <div className=" p-3 d-inline-flex">
                   <span>{this.props.classroom}<i className="fas fa-bars"></i></span> 
                </div>
                <div className=" p-3 d-inline-flex">
                    <span><i className="m-2 fas fa-search"></i></span>
                    <span ><img id="picture" src="https://static-s.aa-cdn.net/img/gp/20600014424487/UTpd6qixaabJJIKkkMixyqTq26NMnWoFJvgXXXEMf7aJGsR0lyYFYaLU9_TTP7kLGqI=s300?v=1" alt="Avatar" className="avatar-sm"></img></span>
                </div>

            </div>

        );
    }
}


export const NavBar = connect(null, null)(PureNavBar)