import React, {Component} from 'react';
import WorkflowList from "./components/workflow/WorkflowList";
import {Route} from "react-router-dom";
import WorkflowContainer from "./components/workflow/WorkflowContainer";

class App extends Component {
    render() {
        return (
            <div>                
                <Route exact path="/" component={WorkflowList} />
                <Route path="/w/:id" component={WorkflowContainer} />
            </div>
        );
    }
}

export default App;
