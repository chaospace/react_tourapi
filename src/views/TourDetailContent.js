import React,{Component, PropTypes} from "react";
import {Link} from 'react-router';
import {Container} from 'flux/utils';
import TourDetailStore from "../stores/TourDetailStore";
import TourSearchActionCreator from "../actions/TourSearchActionCreator";

class TourDetailContent extends Component {

    componentDidMount(){
        TourSearchActionCreator.fetchTourItemDetail(this.props.params.content_id);
    }

    render(){
        return (
            <div className="content-detail-area">
                <Link to ="/" className="btn-close">닫기</Link>
                <h1>{this.state.info.title}</h1>
                <div>
                    <img className="snapshot" src={this.state.info.firstimage} />
                    <dl>
                        <dt>주소</dt>
                        <dd>eee</dd>
                        <dt>전화</dt>
                        <dd>eee</dd>
                    </dl>
                </div>


                <p className="overview" dangerouslySetInnerHTML = {{__html:this.state.info.overview}} />
                <span dangerouslySetInnerHTML = {{__html:this.state.info.homepage}} />
            </div>
        );
    }
}

TourDetailContent.getStores = () => ([TourDetailStore]);
TourDetailContent.calculateState = (prevState) => ({
  info: TourDetailStore.getState()
});

export default Container.create(TourDetailContent);
