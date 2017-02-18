import 'whatwg-fetch';
import 'babel-polyfill';

const API_KEY = "";
const SEARCH_AREA_URL = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode?ServiceKey=";
const REST_PARAMS = "&arrange=P&MobileOS=ETC&MobileApp=AppTesting";
const JSON_TYPE = "&_type=json";
const AREA_BASE_URL = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey="
const EVENT_DETAIL_URL = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey="

// 외부 통신 담당 객체
let TourAPI ={

    fetchAreas(){
        return fetch(`${SEARCH_AREA_URL}${API_KEY}${REST_PARAMS}&numOfRows=17${JSON_TYPE}`)
                .then((response) => response.json() )
                .then((responseData) => {
                    return responseData.response.body
                });
    },

    fetchSigunDos( areaCode ){
        return fetch(`${SEARCH_AREA_URL}${API_KEY}${REST_PARAMS}&areaCode=${areaCode}&numOfRows=30${JSON_TYPE}`)
                .then( (response) => response.json() )
                .then( (responseData) => {
                    return responseData.response.body;
                });
    },

    fetchTourList( areaCode, sigunguCode, pageNo ){
        var pageNo = pageNo || 1;
        console.log( areaCode, sigunguCode, pageNo );
        return fetch(`${AREA_BASE_URL}${API_KEY}${REST_PARAMS}&areaCode=${areaCode}&sigunguCode=${sigunguCode}&pageNo=${pageNo}${JSON_TYPE}`)
        .then( ( response ) => response.json() )
        .then( (responseData) => {
            return responseData.response.body;
        });
    },

    fetchTourListWithParams( params ){
        return fetch(`${AREA_BASE_URL}${API_KEY}${REST_PARAMS}&${params}${JSON_TYPE}`)
        .then( ( response ) => response.json() )
        .then( (responseData) => {
            return responseData.response.body;
        });
    },
    fetchTourItemDetail( contentId ){

        return fetch(`${EVENT_DETAIL_URL}${API_KEY}${REST_PARAMS}&firstImageYN=Y&addrinfoYN=Y&defaultYN=Y&overviewYN=Y&contentId=${contentId}${JSON_TYPE}`)
        .then( ( response ) => response.json())
        .then( (responseData) =>{
            return responseData.response.body;
        } );
    },
    fetchTourListWithType( type, pageNo ){
        var pageNo = pageNo || 1;
        return fetch(`${AREA_BASE_URL}${API_KEY}${REST_PARAMS}&contentTypeId=${type}&pageNo=${pageNo}${JSON_TYPE}`)
        .then( ( response ) => response.json() )
        .then( (responseData) => {
            return responseData.response.body;
        });
    }

}

export default TourAPI;
