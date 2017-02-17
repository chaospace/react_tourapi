
import TourAPI from "../TourAPI";
import AppDispatcher from "../AppDispatcher";
import constants from "../constants";

let TourSeachActionCreator = {

    // 지역 리스트 가져오기
    fetchAreas(){

        let areaData;
        TourAPI.fetchAreas().then((response) =>{
            areaData = response.items.item;
            TourAPI.fetchSigunDos( areaData[0].code ).then((response) =>{
                AppDispatcher.dispatch({
                    type:constants.FETCH_AREAS_SUCCESS,
                    data:{
                        areas:areaData,
                        sigungus:response.items.item,
                        areaCode:areaData[0].code,
                        sigunguCode:response.items.item[0].code
                    }
                })
            });
        });
    },

    // 시군도 리스트 가져오기
    fetchSigunDos( areaCode ){
        AppDispatcher.dispatchAsync( TourAPI.fetchSigunDos( areaCode ), {
            success:constants.FETCH_SIGUNDOS_SUCCESS,
            failure:constants.FETCH_SIGUNDOS_FAILURE
        })
    },
    // 이벤트 리스트 가져오기
    fetchTourList( areaCode, sigunguCode, pageNo ){
        AppDispatcher.dispatchAsync( TourAPI.fetchTourList( areaCode, sigunguCode, pageNo ), {
            success:constants.FETCH_TOUR_LIST_SUCCESS,
            failure:constants.FETCH_TOUR_LIST_FAILURE
        })
    },

    fetchTourListWithType( type, pageNo ){
        AppDispatcher.dispatchAsync( TourAPI.fetchTourListWithType( type, pageNo ), {
            success:constants.FETCH_TOUR_LIST_SUCCESS,
            failure:constants.FETCH_TOUR_LIST_FAILURE
        })
    },

    fetchTourListWithParams( params ){
        AppDispatcher.dispatchAsync( TourAPI.fetchTourListWithParams( params ), {
            success:constants.FETCH_TOUR_LIST_SUCCESS,
            failure:constants.FETCH_TOUR_LIST_FAILURE
        });
    },

    fetchTourItemDetail( contentId ){
        AppDispatcher.dispatchAsync( TourAPI.fetchTourItemDetail(contentId), {
            success:constants.FETCH_TOUR_ITEM_DETAIL_SUCCESS,
            failure:constants.FETCH_TOUR_ITEM_DETAIL_FAILURE
        } )

    },

    updateAreaCode( areaCode ){
        TourAPI.fetchSigunDos( areaCode ).then( (response) => {
            var sigungus = response.items.item;
            AppDispatcher.dispatch({
                type:constants.UPDATE_AREA_CODE,
                data:{
                    areaCode:areaCode,
                    sigungus:sigungus,
                    sigunguCode:sigungus[0].code
                }
            });

        });

    },

    updateSigunguCode( sigunguCode ){
        AppDispatcher.dispatch({
            type:constants.UPDATE_SIGUNGU_CODE,
            data:{
                sigunguCode:sigunguCode
            }
        });
    },

    updateContentId( contentId ){
        AppDispatcher.dispatch({
            type:constants.UPDATE_SEARCH_CONTENT_ID,
            data:{
                contentId:contentId
            }
        });
    },

    updatePageNo( pageNo ){
        AppDispatcher.dispatch({
            type:constants.UPDATE_PAGE_NO,
            data:{
                pageNo:pageNo
            }
        });
    },

    toggleSearchForm(){
        console.log("dee");
        AppDispatcher.dispatch({
            type:constants.TOGGLE_SEARCH_FORM
        });
    }

}

export default TourSeachActionCreator;
