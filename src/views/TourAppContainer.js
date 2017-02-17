import React,{Component, PropTypes} from "react";
import {Container} from "flux/utils";
import TourSearchActionCreator from "../actions/TourSearchActionCreator";
import TourEventStore from "../stores/TourEventStore";
import TourSearchStore from "../stores/TourSearchStore";
import TourApp from "./TourApp";

//루트 뷰
class TourAppContainer extends Component {

    constructor(){
        super(...arguments);
    }
    componentDidMount(){
        TourSearchActionCreator.fetchAreas();
    }
    render(){
        let rootApp
        if( this.props.params.content_id ){
            rootApp = this.props.children && React.cloneElement( this.props.children);
        } else {
            rootApp = this.props.children && React.cloneElement( this.props.children,{
                searchStore:this.state.searchStore,
                eventStore:this.state.eventStore
            } );
        }
        return rootApp;
    }

}


TourAppContainer.getStores = () => ([TourSearchStore, TourEventStore]);
TourAppContainer.calculateState = (prevState) => ({
  searchStore: TourSearchStore.getState(),
  eventStore:TourEventStore.getState()
});

export default Container.create(TourAppContainer);
