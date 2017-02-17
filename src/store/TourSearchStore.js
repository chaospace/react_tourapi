import {ReduceStore} from "flux/utils";
import AreaListStore from "./AreaListStore";
import AppDispatcher from "../AppDispatcher";
import constants from "../constants";
import update from "react-addons-update";
import TourSearchActionCreator from "../actions/TourSearchActionCreator";

class TourSearchStore extends ReduceStore {

    getInitialState(){
        return {
            areas:[],
            sigungus:[],
            areaCode:-1,
            sigunguCode:-1,
            contentTypes:[
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
                    areas:{$set:action.data.response.items.item },
                    areaCode:{$set:action.data.response.items.item[0].code }
                });
                TourSearchActionCreator.fetchSigunDos(state.areaCode);
            break;

            case constants.FETCH_SIGUNDOS_SUCCESS:
                let items = action.data.response.items;
                state = update( this.getState(), {
                    sigungus:{$set:items.item },
                    sigunguCode:{$set:items.item[0].code}
                });
                TourSearchActionCreator.fetchTourList(state.areaCode, state.sigunguCode);
            break;

        }
        return state;
    }

}


export default new TourSearchStore(AppDispatcher);
