import React,{Component, PropTypes} from "react";
import {Link} from 'react-router';

class TourList extends Component {

    getListItem(){
        let items = this.props.data.map( (event, index )=>{

            let timeInfo = event.createdtime.toString();
            let year = timeInfo.substring(0, 4);
            let month = timeInfo.substring(4, 6);
            let day = timeInfo.substring(6, 8);
            let createInfo = year+"년 "+month+"월 "+day+"일";

            return (
                <li key={index}>
                    <Link className="link" to = {"/detail/"+event.contentid} >
                    <div className="thumb">
                        <img src={event.firstimage2}/>
                    </div>
                    <div className="description">
                        <p className="title">{event.title}</p>
                        <p>등록일 : {createInfo}</p>
                    </div>
                    </Link>
                </li>
            );
        });
        return items;
    }

    render(){
        if( !this.props.data ) {
            console.log( "데이터가 엇음");
            const styles ={
                root:{
                    textAlign:'center'
                },
                alert:{
                    fontSize:80,
                    fontWeight:'bold',
                    color:'#e9ab2d'
                }
            }
            return(
                <div style={styles.root}>
                    <div style={styles.alert}>&#9888;</div>
                    <h1>검색 데이터가 없습니다</h1>
                    <p>찾으시는 검색 결과가 없습니다.<br/>다른 조건으로 다시 검색해 보세요.</p>
                </div>
            );
        }

        return(
            <ul>
                {this.getListItem()}
            </ul>
        );
    }

}

TourList.PropTypes = {
    data:PropTypes.object
}

export default TourList;
