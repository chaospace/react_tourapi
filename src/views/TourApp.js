
import React,{Component, PropTypes} from "react";
import TourSearchActionCreator from "../actions/TourSearchActionCreator";
import SearchFormView from "./SearchFormView";
import {Link} from 'react-router';
import { browserHistory } from 'react-router'

class TourApp extends Component {

    getBackButton(){
        if( browserHistory.getCurrentLocation().pathname !== "/" ){
            return (
                    <a className="btn-back" onClick={browserHistory.goBack}>
                        <i className="fa fa-arrow-left" aria-label="뒤로" aria-hidden="true"></i>
                    </a>
                );
        }
        return "";
    }

    getSearchButton(){
        if( this.props.params.content_id ){
            return "";
        }
        return (<a className="btn-search">
                    <i className="fa fa-search" aria-label="검색" aria-hidden="true"
                    onClick={ TourSearchActionCreator.toggleSearchForm.bind(null) }></i>
                </a>);
    }

    getSearchForm(){
        if(this.props.params.content_id){
            return "";
        }
        return (<SearchFormView
                        showSearchForm={this.props.searchStore.showSearchForm}
                        areas={this.props.searchStore.areas}
                        sigungus={this.props.searchStore.sigungus}
                        contentTypeList = {this.props.searchStore.contentTypes} />);
    }

    getContentRenderer(){
        if( this.props.params.content_id ){
            return this.props.children;
        }
        return this.props.children && React.cloneElement( this.props.children,{eventStore:this.props.eventStore});
    }

    render(){
            console.log("browserHistory", browserHistory.getCurrentLocation() );
        return (
            <div className="wrapper">
                <div className="header-area">
                    { this.getBackButton()}
                    <h1>ReactJS TourAPI</h1>
                    { this.getSearchButton() }
                </div>
                {this.getSearchForm()}
                <div className="contents-area">
                    {this.getContentRenderer()}
                </div>
            </div>
        );
    }
}

TourApp.propTypes = {
  searchStore: PropTypes.object,
  eventStore : PropTypes.object
};

export default TourApp;
