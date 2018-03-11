import React from "react";
import {Link} from "react-router-dom";

const WorkflowList = () => {
    return (
        <div>
            <header>
                <h1>Choose a workflow</h1>
            </header>
        <ul className="nav">
            <li className="nav-item"><Link className="nav-link" to="/w/one">Workflow 1</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/w/two">Workflow 2</Link></li>
        </ul>
        </div>
    );
};

export default WorkflowList;