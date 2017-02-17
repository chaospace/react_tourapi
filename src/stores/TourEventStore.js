import {ReduceStore} from "flux/utils";
import update from "react-addons-update";
import constants from "../constants";
import TourSearchActionCreator from "../actions/TourSearchActionCreator";
import TourSearchStore from "../stores/TourSearchStore";
import AppDispatcher from "../AppDispatcher";

/**
    관광정보 검색조건에 따른 이벤트 리스트  store객체
*/
class TourEventStore extends ReduceStore {

    getInitialState(){
        return {
            pageNo:1,
            currentPageGroup:1,
            lastPageGroup:1,
            beginPage:1,
            lastPage:1,
            numberOfRows:10,
            hasNext:false,
            hasPrev:false,
            tours:[],
            selectTourInfo:{}
        }
    }


    reduce( state, action ){

        this.getDispatcher().waitFor([
            TourSearchStore.getDispatchToken()
        ]);
        let pageNo;
        switch( action.type ) {
            case constants.FETCH_AREAS_SUCCESS:
            case constants.UPDATE_AREA_CODE:
            case constants.UPDATE_SIGUNGU_CODE:
            case constants.UPDATE_SEARCH_CONTENT_ID:
                let searchState = TourSearchStore.getState();
                pageNo = 1;
                let areaCode = searchState.areaCode > -1 ? searchState.areaCode : '';
                let sigunguCode = searchState.sigunguCode > -1 ? searchState.sigunguCode : '';
                let contentId = searchState.contentId > -1 ? searchState.contentId : '';
                let query = `areaCode=${areaCode}&sigunguCode=${sigunguCode}&contentTypeId=${contentId}&pageNo=${pageNo}`;
                TourSearchActionCreator.fetchTourListWithParams( query );
            break;

            case constants.FETCH_TOUR_LIST_SUCCESS:
                console.log("이벤트 목록", action.data );
                let info = action.data.response;
                pageNo  = parseInt(info.pageNo);
                let numberOfRows = parseInt(info.numOfRows);
                let totalPage = parseInt(info.totalCount);

                let lastPageGroup = Math.ceil(totalPage/numberOfRows);
                let currentPageGroup = Math.ceil(pageNo/numberOfRows);
                let tours       = info.items.item;

                let lastPage    = (currentPageGroup*numberOfRows)+1 < lastPageGroup ? (currentPageGroup * numberOfRows)+1 : lastPageGroup;
                let beginPage   = 1 + ((currentPageGroup-1) * numberOfRows);
                let hasNext     = lastPage < lastPageGroup;
                let hasPrev     = currentPageGroup > 1;
                state = update( this.getState(), {
                    beginPage:{$set:beginPage},
                    lastPage:{$set:lastPage},
                    lastPageGroup:{$set:lastPageGroup},
                    currentPageGroup:{$set:currentPageGroup},
                    hasNext:{$set:hasNext},
                    hasPrev:{$set:hasPrev},
                    tours:{$set:tours},
                    pageNo:{$set:pageNo},
                    numberOfRows:{$set:numberOfRows}
                });
            break;

            case constants.FETCH_TOUR_ITEM_DETAIL_SUCCESS:
                console.log("이벤트 상세", action.data );
            break;
        }
        return state;
    }

}

export default new TourEventStore(AppDispatcher);
