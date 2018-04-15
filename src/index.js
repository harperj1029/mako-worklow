import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import {BrowserRouter} from "react-router-dom";
//NOTE: This import is only here to satisfy codesandbox.io as it was having trouble with lazy-loaded
// (code split point) modules.
import "./components/workflow-instances/workflow1/index";

ReactDOM.render((
        <BrowserRouter>
            <App />
        </BrowserRouter>), document.getElementById('root'));
