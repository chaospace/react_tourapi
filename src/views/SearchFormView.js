import React,{Component, PropTypes} from "react";

class SearchFormView extends Component {

    constructor(){
        super(...arguments);
        this.state ={
            showDetails:false
        }
    }

    onChangeAreaList( event ){
        this.props.chanageCallbacks.toggleArea( parseInt(event.target.value) );
    }

    onChangeSigunAreaList( event ){
        this.props.chanageCallbacks.toggleSigungu( parseInt(event.target.value) );
    }

    onChangeContentTypeList( event ){
        this.props.chanageCallbacks.toggleOptionType( parseInt(event.target.value) );
    }

    onClickSubmit( e ){
        console.log("검색 요청");
        e.preventDefault();
        return false;
    }

    toggleState(){
        this.setState({showDetails:!this.state.showDetails});
    }

    render(){



        let contents;
        let sigunList;
        let optionList
        let areaValue;
        let sigundoValue;
        let contentList;
        if( this.state.showDetails ) {
            console.log("확장");
            // 배열 정보를 태그로 변환

            if(this.props.areas) {
                optionList = this.props.areas.map( (area, index ) => {
                    return <option key={index} value={area.code} >{area.name}</option>
                });
            }

            contentList = this.props.contentTypeList.map( (content, index ) => {
                return <option key={index} value={content.code}>{content.name}</option>
            });


            if(  this.props.sigungus ) {
                sigunList = this.props.sigungus.map( (sigun, index ) => {
                    return <option key={index} value={sigun.code}>{sigun.name}</option>
                });
            }

        }

        return(
                <div className="search-area">
                    <div className={this.state.showDetails ? "search-area-form-content" : "search-area-form-content hide" }>
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
                                <input type="submit" value="검색" />
                            </fieldset>
                        </form>
                    </div>
                    <button className="btn-submit" onClick={this.toggleState.bind(this)}>{ this.state.showDetails ? '닫기':'열기'}</button>
                </div>
        );
    }
}


SearchFormView.PropTypes = {
    chanageCallbacks:PropTypes.object,
    contentTypeList :PropTypes.arrayOf( PropTypes.object ),
    sigundos : PropTypes.arrayOf( PropTypes.object ),
    areas : PropTypes.arrayOf( PropTypes.object )
}

export default SearchFormView;
