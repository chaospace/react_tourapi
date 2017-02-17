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

    /*updatePageCallBack( pageNo ){
        let searchStore = this.state.searchStore;
        let eventStore = this.state.eventStore;
        let areaCode = searchStore.areaCode > -1 ? searchStore.areaCode : '';
        let sigunguCode = searchStore.sigunguCode > -1 ? searchStore.sigunguCode : '';
        let contentId = searchStore.contentId > -1 ? searchStore.contentId : '';
        let query = `areaCode=${areaCode}&sigunguCode=${sigunguCode}&contentTypeId=${contentId}&pageNo=${pageNo}`;
        TourSearchActionCreator.fetchTourListWithParams( query );
    }*/
    /*
    <div className="wrapper">
        <div className="header">
            <h1>ReactJS TourAPI</h1>
            <a className="sidebar"><i className="fa fa-search" aria-label="검색" aria-hidden="true"></i></a>
        </div>
        <SearchFormView areas={this.props.searchStore.areas}  sigungus={this.props.searchStore.sigungus} contentTypeList = {this.props.searchStore.contentTypes} chanageCallbacks={
            {
                toggleArea : this.toggleArea.bind(this),
                toggleSigungu : this.toggleSigungu.bind(this),
                toggleOptionType : this.toggleOptionType.bind(this),
            }
        }/>
        <p>지역코드 : {this.props.searchStore.areaCode} 시군구코드 : {this.props.searchStore.sigunguCode} 관광타입 : {this.props.searchStore.contentId}</p>
        <div className="contents-area">
            <ul className="event-list">
                {eventList}
            </ul>
            <div className="paginate-wrapper">
                <div className="paginate">{prevButton}{pageList}{nextButton}</div>
            </div>
        </div>
        {this.props.children}
    </div>

    */
    render(){
        let rootApp = this.props.children && React.cloneElement( this.props.children,{
            searchStore:this.state.searchStore,
            eventStore:this.state.eventStore
        } );
        return rootApp;
    }

}


TourAppContainer.getStores = () => ([TourSearchStore, TourEventStore]);
TourAppContainer.calculateState = (prevState) => ({
  searchStore: TourSearchStore.getState(),
  eventStore:TourEventStore.getState()
});

export default Container.create(TourAppContainer);
