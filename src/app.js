import React,{Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {Container} from "flux/utils";
import {Router, Route, IndexRoute, Link, browserHistory } from "react-router";
/*import TourSearchActionCreator from "./actions/TourSearchActionCreator";
import TourEventStore from "./stores/TourEventStore";
import TourSearchStore from "./stores/TourSearchStore";
import SearchFormView from "./views/SearchFormView";*/
import TourApp from "./views/TourApp";
import TourAppContainer from "./views/TourAppContainer";
import TourDetailContent from "./views/TourDetailContent";
import TourList from "./views/TourList";

/*
render( <Router history={browserHistory} >
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="about" component={About} title="About Us"/>
                <Route path="repos" component={Repos}>
                    <Route path="repo/:repo_name" component={ReposDetails} />
                </Route>
                <Route path="error" component={ServerError} />
            </Route>
        </Router>, document.getElementById('root'));*/

ReactDOM.render( <Router history={browserHistory} >
                    <Route component={TourAppContainer}>
                        <Route path="/" component={TourApp}>
                            <IndexRoute component={TourList}/>
                            <Route path="detail/:content_id" component = {TourDetailContent} />
                        </Route>
                    </Route>
                </Router>, document.getElementById("root") );
