import {ReduceStore} from "flux/utils";
import update from "react-addons-update";
import constants from "../constants";
import TourSearchActionCreator from "../actions/TourSearchActionCreator";
import AppDispatcher from "../AppDispatcher";

/**
    관광정보 검색조건에 따른 이벤트 리스트  store객체
*/
class TourDetailStore extends ReduceStore {

    getInitialState(){
        return {}
    }

    reduce( state, action ){

        switch( action.type ) {
            case constants.FETCH_TOUR_ITEM_DETAIL_SUCCESS:
                console.log("이벤트 상세", action.data );
                state = action.data.response.items.item;
            break;
        }
        return state;
    }

}

export default new TourDetailStore(AppDispatcher);
