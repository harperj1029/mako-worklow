import React, {Component} from 'react';
import WorkflowList from "./components/workflow/WorkflowList";
import {Route} from "react-router-dom";
import WorkflowContainer from "./components/workflow/WorkflowContainer";
import {Grid} from "react-bootstrap";

class App extends Component {
    render() {
        return (
            <Grid>
                <Route exact path="/" component={WorkflowList} />
                <Route path="/w/:id" component={WorkflowContainer} />
            </Grid>
        );
    }
}

export default App;
