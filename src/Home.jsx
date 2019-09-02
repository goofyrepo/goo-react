import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PageExample from "./pages/pageExample.jsx"
import "antd/dist/antd.css";

const App = () => {
    return (
        <Router>
            <Route exact path="/" component={PageExample} />
        </Router>
    )
}

export default App;