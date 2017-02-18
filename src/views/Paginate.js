import React,{Component, PropTypes} from "react";
import {Link} from 'react-router';
import TourSearchActionCreator from "../actions/TourSearchActionCreator";

class Paginate extends Component {

    render(){

        if( this.props.data.lastPageGroup == "" ){
            return null;
        }

        let pageList;
        let prevButton;
        let nextButton;

        if( this.props.data ) {

            let vo = this.props.data;
            let pageNo = vo.pageNo;
            let numberOfRows = vo.numberOfRows;
            let lastPageGroup = vo.lastPageGroup;
            let currentPageGroup  = vo.currentPageGroup;
            let lastPage = vo.lastPage;
            let beginPage = vo.beginPage;

            pageList=[];
            for( var i=beginPage; i<lastPage; i++){
                pageList.push(<a key={i} className="link" href={"#"+i}
                                onClick={TourSearchActionCreator.updatePageNo.bind(this, i )}>{i}</a>);
            }

            if( currentPageGroup > 1 ){
                let prevPage = parseInt(beginPage - numberOfRows);
                prevButton = (<a className="btn-skip-page" href={"#"+ prevPage }
                                onClick={TourSearchActionCreator.updatePageNo.bind(this, prevPage )}>이전</a>);
            }

            if( lastPage < lastPageGroup ){
                nextButton = (<a className="btn-skip-page" href={"#"+ lastPage }
                                onClick={TourSearchActionCreator.updatePageNo.bind(this, lastPage )}>다음</a>);
            }
        }

        return(
            <div className="paginate-wrapper">
                <div className="paginate">{prevButton}{pageList}{nextButton}</div>
            </div>
        );
    }

}

Paginate.PropTypes = {
    data:PropTypes.object
}

export default Paginate;
