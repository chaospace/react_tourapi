import React,{Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {Container} from "flux/utils";
/*import TourSearchActionCreator from "./actions/TourSearchActionCreator";
import TourEventStore from "./stores/TourEventStore";
import TourSearchStore from "./stores/TourSearchStore";
import SearchFormView from "./views/SearchFormView";*/
import TourAppContainer from "./views/TourAppContainer";
/*
//루트 뷰
class TourApp extends Component {

    constructor(){
        super(...arguments);
    }
    componentDidMount(){
        TourSearchActionCreator.fetchAreas();
    }

    toggleArea( areaCode ){
        TourSearchActionCreator.updateAreaCode( areaCode );
    }
    toggleSigungu( sigunguCode ){
        TourSearchActionCreator.updateSigunguCode( sigunguCode )
    }
    toggleOptionType( contentTypeId ){
        TourSearchActionCreator.updateContentId( contentTypeId )
    }

    onClickDetailEvent( contentid ){
        TourSearchActionCreator.fetchTourItemDetail( contentid );
    }

    onClickPagingItem( pageNo ){
        let searchState = this.state.searchStore;
        let eventStore = this.state.eventStore;
        let areaCode = searchState.areaCode > -1 ? searchState.areaCode : '';
        let sigunguCode = searchState.sigunguCode > -1 ? searchState.sigunguCode : '';
        let contentId = searchState.contentId > -1 ? searchState.contentId : '';
        let query = `areaCode=${areaCode}&sigunguCode=${sigunguCode}&contentTypeId=${contentId}&pageNo=${pageNo}`;
        TourSearchActionCreator.fetchTourListWithParams( query );
    }

    render(){

        let eventList;
        let pageList;
        let prevButton;
        let nextButton;

        if( this.state.eventStore.tours ) {
            let tourInfo = this.state.eventStore;
            let pageNo = tourInfo.pageNo;
            let numberOfRows = tourInfo.numberOfRows;
            let lastPageGroup = tourInfo.lastPageGroup;
            let currentPageGroup  = tourInfo.currentPageGroup;
            let lastPage = tourInfo.lastPage;
            let beginPage = tourInfo.beginPage;
            eventList = tourInfo.tours.map( ( event , index ) => {
                // year
                let timeInfo = event.createdtime.toString();
                let year = timeInfo.substring(0, 4);
                let month = timeInfo.substring(4, 6);
                let day = timeInfo.substring(6, 8);
                let createInfo = year+"년 "+month+"월 "+day+"일";
                return (
                        <li key={index}>
                        <a href={"#"+event.contentid } className="link" onClick={this.onClickDetailEvent.bind( this, event.contentid )}>
                            <div className="thumb">
                                <img src={event.firstimage2}/>
                            </div>
                            <div className="description">
                                <p className="title">{event.title}</p>
                                <p>등록일 : {createInfo}</p>
                            </div>
                        </a>
                        </li>
                    )
            });
            pageList=[];
            for( var i=beginPage; i<lastPage; i++){
                pageList.push(<a key={i} className="link" href={"#"+i} onClick={this.onClickPagingItem.bind(this, i )}>{i}</a>);
            }


            if( currentPageGroup > 1 ){
                let prevPage = parseInt(beginPage - numberOfRows);
                prevButton = (<a className="btn-skip-page" href={"#"+ prevPage } onClick={this.onClickPagingItem.bind(this, prevPage )}>이전</a>);
            }

            if( lastPage < lastPageGroup ){
                nextButton = (<a className="btn-skip-page" href={"#"+ lastPage } onClick={this.onClickPagingItem.bind(this, lastPage )}>다음</a>);
            }
        }


        return (
            <div className="wrapper">
                <h1>Hello React API</h1>
                <SearchFormView areas={this.state.searchStore.areas}  sigungus={this.state.searchStore.sigungus} contentTypeList = {this.state.searchStore.contentTypes} chanageCallbacks={
                    {
                        toggleArea : this.toggleArea.bind(this),
                        toggleSigungu : this.toggleSigungu.bind(this),
                        toggleOptionType : this.toggleOptionType.bind(this),
                    }
                }/>
                <p>지역코드 : {this.state.searchStore.areaCode} 시군구코드 : {this.state.searchStore.sigunguCode} 관광타입 : {this.state.searchStore.contentId}</p>
                <div className="contents-area">
                    <ul className="event-list">
                        {eventList}
                    </ul>
                    <div className="paginate-wrapper">
                        <div className="paginate">{prevButton}{pageList}{nextButton}</div>
                    </div>
                </div>
            </div>
        );

    }

}


TourApp.getStores = () => ([TourSearchStore, TourEventStore]);
TourApp.calculateState = (prevState) => ({
  searchStore: TourSearchStore.getState(),
  eventStore:TourEventStore.getState()
});

let App = Container.create(TourApp);
*/


ReactDOM.render( <TourAppContainer />, document.getElementById("root") );
