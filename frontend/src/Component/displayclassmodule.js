import React from 'react';
import { connect } from 'react-redux'


class PureDisplayClassModule extends React.Component {

    render() {
        return (
            <div className="col m-1 p-5 border border-4 rounded-lg highlight ">
                <h4><strong>Classroom A</strong></h4>
                <p>Noa is a Health Care Kit that allows families with children around the age of five to prepare to positively overcome the child's future vaccinations. Noa is a Health Care Kit that allows families with children.</p>
            <div className="d-flex justify-content-between"> 
                <span className="pl-3 pr-3 p-1 rounded-pill bg-dark text-light">#tags</span>
                <span ><img id="picture" src="https://static-s.aa-cdn.net/img/gp/20600014424487/UTpd6qixaabJJIKkkMixyqTq26NMnWoFJvgXXXEMf7aJGsR0lyYFYaLU9_TTP7kLGqI=s300?v=1" alt="Avatar" className="avatar-sm"></img></span>
             </div>
        </div>
        );
    }
}


export const DisplayClassModule = connect(null, null)(PureDisplayClassModule)