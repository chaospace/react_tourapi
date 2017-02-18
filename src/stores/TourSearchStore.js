import {ReduceStore} from "flux/utils";
import AppDispatcher from "../AppDispatcher";
import constants from "../constants";
import update from "react-addons-update";
import TourSearchActionCreator from "../actions/TourSearchActionCreator";
/**
    관광정보 검색조건을 위한 store객체
*/
class TourSearchStore extends ReduceStore {

    getInitialState(){
        return {
            showSearchForm:false,
            areas:[],
            sigungus:[],
            areaCode:-1,
            sigunguCode:-1,
            contentTypes:[
                {
                    name:"검색타입선택",
                    code:-1
                },
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
            ],
            contentId:-1
        };
    }

    reduce( state, action ){

        switch( action.type ){
            case constants.FETCH_AREAS_SUCCESS:
                state = update( this.getState(), {
                    areas:{$set:action.data.areas },
                    sigungus:{$set:action.data.sigungus},
                    areaCode:{$set:action.data.areaCode},
                    sigunguCode:{$set:action.data.sigunguCode},
                    contentId:{$set:state.contentTypes[0].code}
                });
            break;

            case constants.UPDATE_AREA_CODE:
                state = update( this.getState(),{
                    areaCode:{$set:action.data.areaCode},
                    sigungus:{$set:action.data.sigungus },
                    sigunguCode:{$set:action.data.sigunguCode}
                });
            break;

            case constants.UPDATE_SIGUNGU_CODE:
                state = update( this.getState(),{
                    sigunguCode:{$set:action.data.sigunguCode}
                });
            break;

            case constants.UPDATE_SEARCH_CONTENT_ID:
                state = update( this.getState(),{
                    contentId:{$set:action.data.contentId}
                });
            break;

            case constants.TOGGLE_SEARCH_FORM:
                console.log("업데이트 검색창");
                state = update( this.getState(),{
                    showSearchForm: {$apply: (currentValue) => (currentValue !== false)? false : true}
                });
            break;

        }
        return state;
    }

}


export default new TourSearchStore(AppDispatcher);
