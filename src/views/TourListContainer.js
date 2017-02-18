import React,{Component, PropTypes} from "react";
import TourSearchActionCreator from "../actions/TourSearchActionCreator";
import TourList from "./TourList";
import Paginate from "./Paginate";
import {Link} from 'react-router';

class TourListContainer extends Component {

    render(){

        /*let eventList;
        let tourInfo = this.props.eventStore;
        if( tourInfo.tours ) {
            eventList = tourInfo.tours.map( ( event , index ) => {
                return ( <TourListItemRenderer data ={event} /> );
            });
        }*/

        return (
            <div className="event-list">
                <TourList data = { this.props.eventStore.tours } />
                <Paginate data = { this.props.eventStore } />
            </div>
        );
    }
}

TourListContainer.PropTypes = {
    eventStore:PropTypes.object
}

export default TourListContainer;
