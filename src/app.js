import React,{Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {Container} from "flux/utils";
import {Router, Route, IndexRoute, Link, browserHistory } from "react-router";
import TourApp from "./views/TourApp";
import TourAppContainer from "./views/TourAppContainer";
import TourDetailContent from "./views/TourDetailContent";
import TourListContainer from "./views/TourListContainer";

ReactDOM.render( <Router history={browserHistory} >
                    <Route component={TourAppContainer}>
                        <Route path="/" component={TourApp}>
                            <IndexRoute component={TourListContainer}/>
                            <Route path="detail/:content_id" component = {TourDetailContent} />
                        </Route>
                    </Route>
                </Router>, document.getElementById("root") );
