import React,{Component, PropTypes} from "react";
import TourSearchActionCreator from "../actions/TourSearchActionCreator";

class SearchFormView extends Component {

    onChangeAreaList( event ){
        TourSearchActionCreator.updateAreaCode(parseInt(event.target.value));
    }

    onChangeSigunAreaList( event ){
        TourSearchActionCreator.updateSigunguCode( parseInt(event.target.value) );
    }

    onChangeContentTypeList( event ){
        TourSearchActionCreator.updateContentId(parseInt(event.target.value));
    }

    onClickSubmit( e ){
        console.log("검색 요청");
        e.preventDefault();
        return false;
    }



    render(){

        let contents;
        let sigunList;
        let optionList
        let areaValue;
        let sigundoValue;
        let contentList;
        if( this.props.showSearchForm ) {

            if(this.props.areas) {
                optionList = this.props.areas.map( (area, index ) => {
                    return <option key={index} value={area.code} >{area.name}</option>
                });
            }

            contentList = this.props.contentTypeList.map( (content, index ) => {
                return <option key={index} value={content.code}>{content.name}</option>
            });


            if( this.props.sigungus ) {
                sigunList = this.props.sigungus.map( (sigun, index ) => {
                    return <option key={index} value={sigun.code}>{sigun.name}</option>
                });
            }

        }
        //<button className="btn-submit" onClick={this.toggleState.bind(this)}>{ this.state.showDetails ? '닫기':'열기'}</button>
        return(
                <div className="search-area">
                    <div className={this.props.showSearchForm ? "search-area-form-content" : "search-area-form-content hide" }>
                        <form name="searchOptionForm" action="POST" action="" onSubmit={this.onClickSubmit.bind(this)} >
                            <fieldset>
                                <label>콘텐츠타입 :
                                <select title="contentType" name="contentType" onChange={this.onChangeContentTypeList.bind(this)}>
                                    {contentList}
                                </select>
                                </label>
                                <label>지역선택 :
                                <select title="지역" name="area" defaultValue={areaValue} onChange={this.onChangeAreaList.bind(this)} >
                                    {optionList}
                                </select>
                                </label>
                                <label>시군구선택 :
                                <select title="시군구" name="sigun" defaultValue={sigundoValue} onChange={this.onChangeSigunAreaList.bind(this)}>
                                    {sigunList}
                                </select>
                                </label>
                            </fieldset>
                        </form>
                    </div>
                </div>
        );
    }
}


SearchFormView.PropTypes = {
    contentTypeList :PropTypes.arrayOf( PropTypes.object ),
    sigundos : PropTypes.arrayOf( PropTypes.object ),
    areas : PropTypes.arrayOf( PropTypes.object ),
    showSearchForm:PropTypes.boolean
}

export default SearchFormView;
