import React,{Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {Dispatcher} from "flux";
import {ReduceStore, Container} from "flux/utils";
import update from "react-addons-update";

const API_KEY = "Q6MEbeyAP7scqDnkIJT2gUlUj0Fka7fy4xYnWeqOrIr1ri%2B6fiL5HinpEnMyRGym%2Bk5fBDt9YzClTIpQeqaWXA%3D%3D";
const SEARCH_AREA_URL = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode?ServiceKey=";
const REST_PARAMS = "&MobileOS=ETC&MobileApp=AppTesting";
const JSON_TYPE = "&_type=json";
const AREA_BASE_URL = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey="
const EVENT_DETAIL_URL = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey="

//sigunguCode=

let AreaEvent = {
    INIT : "AreaEvent.INIT",
    AREA_SELECT : "AreaEvent.AREA_SELECT",
    AREA_LIST_CHANGE: "AreaEvent.AREA_LIST_CHANGE"
}

// action = model
let AppAction = {

    getAreaList(){

        fetch(`${SEARCH_AREA_URL}${API_KEY}${REST_PARAMS}&numOfRows=17${JSON_TYPE}`)
        .then( (response) =>{
            if( response.ok ){
                return response.json();
            } else {
                throw new Error("server-error");
            }
        })
        .then( (responseData ) => {
            let body = responseData.response.body;
            dispatcher.dispatch({
                type: AreaEvent.INIT,
                data:body.items.item
            });
        } );

    },

    getSigunList( areaCode ){
        fetch(`${SEARCH_AREA_URL}${API_KEY}${REST_PARAMS}&areaCode=${areaCode}&numOfRows=17${JSON_TYPE}`)
        .then( (response) =>{
            if( response.ok ){
                return response.json();
            } else {
                throw new Error("server-error");
            }
        })
        .then( (responseData ) => {
            let body = responseData.response.body;
            dispatcher.dispatch({
                type: AreaEvent.AREA_LIST_CHANGE,
                data: body.items.item
            });
        } );
    },

    getAraBaseEventList(areaCode, sigunCode){
        fetch(`${AREA_BASE_URL}${API_KEY}${REST_PARAMS}&areaCode=${areaCode}&sigunCode=${sigunCode}${JSON_TYPE}`)
        .then( ( response ) =>{
            if( response.ok ){
                return response.json();
            } else {
                throw new Error("server-error");
            }
        })
        .then( (responseData) =>{
            console.log( responseData );
        } );
    }

}

// dispatcher
class AppDispatcher extends Dispatcher {
    dispatch( action={}){
        super.dispatch( action );
    }
}

// 데이터
class AreaStore extends ReduceStore {
    getInitialState(){
        return [];
    }
    reduce( state, action ){
        switch( action.type ){
            case AreaEvent.INIT:
            state = action.data;
            break;
        }
        return state;
    }
}

class AreaListStore extends ReduceStore {
    getInitialState(){
        return [];
    }

    reduce( state, action ){
        switch( action.type ){
            case AreaEvent.AREA_LIST_CHANGE:
            state = action.data;
            break;
        }
        return state;
    }
}

let contentTypeList= [
    {
        name:"관광지",
        code:12
    },
    {
        name:"문화시설",
        code:14
    },
    {
        name:"행사/공연/축제",
        code:15
    },
    {
        name:"여행코스",
        code:25
    },
    {
        name:"레포츠",
        code:28
    },
    {
        name:"숙박",
        code:32
    },
    {
        name:"쇼핑",
        code:38
    },
    {
        name:"음식점",
        code:39
    }
];

//루트 뷰
class MyApp extends Component {

    constructor(){
        super(...arguments);
        //AppAction.getAreaList();
        this.state = {
            areas       :[],
            areaDetail  :[],
            areaCode    :-1,
            sigunCode   :-1
        }
        /*this.props.areaCode = -1;
        this.props.sigunCode = -1;*/

    }



    getAreaList(){
        fetch(`${SEARCH_AREA_URL}${API_KEY}${REST_PARAMS}&numOfRows=25${JSON_TYPE}`)
        .then( (response) =>{
            if( response.ok ){
                return response.json();
            } else {
                throw new Error("server-error");
            }
        })
        .then( (responseData ) => {
            let body = responseData.response.body;
            this.setState({areas:body.items.item, areaCode:body.items.item[0].code});
            this.getAreaDetailList(body.items.item[0].code);
            //this.getAraBaseEventList(body.items.item[0].code);
        } );
    }


    getAreaDetailList( areaCode ){

        fetch(`${SEARCH_AREA_URL}${API_KEY}${REST_PARAMS}&areaCode=${areaCode}&numOfRows=25${JSON_TYPE}`)
        .then( (response) =>{
            if( response.ok ){
                return response.json();
            } else {
                throw new Error("server-error");
            }
        })
        .then( (responseData ) => {
            let body = responseData.response.body;
            this.setState({areaDetail:body.items.item, sigunCode:body.items.item[0].code});
            this.getAraBaseEventList(this.state.areaCode, body.items.item[0].code);
        } );
    }

    getAraBaseEventList(areaCode, sigunCode, pageNo ){
        var pageNo = pageNo || 1;
        fetch(`${AREA_BASE_URL}${API_KEY}${REST_PARAMS}&areaCode=${areaCode}&sigunguCode=${sigunCode}&pageNo=${pageNo}${JSON_TYPE}`)
        .then( ( response ) =>{
            if( response.ok ){
                return response.json();
            } else {
                throw new Error("server-error");
            }
        })
        .then( (responseData) =>{
            let body = responseData.response.body;
            this.setState({eventInfo:body});
        } );
    }

    getEventDetail( contentId ){
        fetch(`${EVENT_DETAIL_URL}${API_KEY}${REST_PARAMS}&firstImageYN=Y&addrinfoYN=Y&defaultYN=Y&overviewYN=Y&contentId=${contentId}${JSON_TYPE}`)
        .then( ( response ) =>{
            if( response.ok ){
                return response.json();
            } else {
                throw new Error("server-error");
            }
        })
        .then( (responseData) =>{
            let body = responseData.response.body;

            this.setState({eventDetail:body.items.item});
        } );
    }

    componentDidMount(){
        this.getAreaList();
    }

    onChangeAreaList( event ){
        this.getAreaDetailList(event.target.value);
        this.setState({areaCode:event.target.value});
    }

    onChangeSigunAreaList( event ){
        this.setState({sigunCode:event.target.value});
        this.getAraBaseEventList(this.state.areaCode, event.target.value);
    }

    onChangeContentTypeList( event ){
        console.log( "타입변경", event.target.value );
    }

    onClickDetailEvent( vo ){
        this.getEventDetail( vo.contentid );
    }

    onClickPagingItem( vo ){
        console.log( "padding-click", vo );
        this.getAraBaseEventList(this.state.areaCode, this.state.sigunCode, parseInt(vo) );
        return false;
    }

    render(){
        // 배열 정보를 태그로 변환
        let optionList = this.state.areas.map( (area) => {
            return <option key={area.code} value={area.code}>{area.name}</option>
        });

        let contentList = contentTypeList.map( (content, index ) => {
            return <option key={index} value={content.code}>{content.name}</option>
        });

        let sigunList;
        if(  this.state.areaDetail ) {
            sigunList = this.state.areaDetail.map( (sigun ) => {
                return <option key={sigun.code} value={sigun.code}>{sigun.name}</option>
            });
        }

        let eventList;
        let pageList;
        let prevButton;
        let nextButton;
        if( this.state.eventInfo ) {
            let pageNo = this.state.eventInfo.pageNo;
            let numberOfRows = this.state.eventInfo.numOfRows;
            let totalPage = Math.ceil( this.state.eventInfo.totalCount/numberOfRows  );
            let currentPage  = Math.ceil(pageNo/numberOfRows);

            let nextPage = (currentPage*numberOfRows)+1 < totalPage ? (currentPage * numberOfRows)+1 :totalPage;
            let startPageNo = 1 + ((currentPage-1) * numberOfRows);
            eventList = this.state.eventInfo.items.item.map( ( event , index ) => {
                return <li key={index}><a href="#" onClick={this.onClickDetailEvent.bind( this, event )}>{event.title}</a></li>
            });
            pageList=[];
            let pageStyle ={
                display:"inline-block",
                padding:"4px"
            }
            for( var i=startPageNo; i<nextPage; i++){
                pageList.push(<li key={i} style={pageStyle}><a href={"#"+i} onClick={this.onClickPagingItem.bind(this, i )}>{i}</a></li>);
            }


            if( currentPage > 1 ){
                let prevPage = parseInt(startPageNo - numberOfRows);
                prevButton = (<p><a href={"#"+ prevPage } onClick={this.onClickPagingItem.bind(this, prevPage )}>이전</a></p>);
            }

            if( nextPage < totalPage ){
                nextButton = (<p><a href={"#"+ nextPage } onClick={this.onClickPagingItem.bind(this, nextPage )}>다음</a></p>);
            }
        }


        let eventDetail;
        if( this.state.eventDetail ) {
            eventDetail = (
                <div>
                    <h4>{this.state.eventDetail.title}</h4>
                    <img src = { this.state.eventDetail.firstimage2 } alt={this.state.eventDetail.title} />
                    <p dangerouslySetInnerHTML = {{__html:this.state.eventDetail.overview}} />
                    <address>{this.state.eventDetail.addr1}</address>
                    <span dangerouslySetInnerHTML = {{__html:this.state.eventDetail.homepage}} />
                </div>
            );
        }

        return (
            <div className="wrapper">
                <h1>Hello React API</h1>
                <div className="search-option-area">
                    <form>
                        <filedset>
                            <label>콘텐츠타입 :
                            <select title="contentType" name="contentType" onChange={this.onChangeContentTypeList.bind(this)}>
                                {contentList}
                            </select>
                            </label>
                            <label>지역선택 :
                            <select title="지역" name="area" onChange={this.onChangeAreaList.bind(this)} >
                                {optionList}
                            </select>
                            </label>
                            <label>시군구선택 :
                            <select title="시군구" name="sigun" onChange={this.onChangeSigunAreaList.bind(this)}>
                                {sigunList}
                            </select>
                            </label>
                        </filedset>
                    </form>

                </div>
                <p>지역코드 : {this.state.areaCode} 시군구코드 : {this.state.sigunCode} 관광타입 : {this.state.type}</p>
                <ul>
                    {eventList}
                </ul>
                <div>
                    {prevButton}<ul>{pageList}</ul>{nextButton}
                </div>
                {eventDetail}
            </div>
        );

    }

}

ReactDOM.render( <MyApp areaCode={-1} sigunCode={-1} />, document.getElementById("root") );
