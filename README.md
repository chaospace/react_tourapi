## React Flux 스터디 오픈API를 이용한 투어리스트 만들기

**지금까지 제작하며 느낀점**  

- 컴포넌트와 데이터 처리를 위한 객체 관리를 어디까지 할 것인지 생각할 거리가 많았음.  
- Store를 통한 데이터 관리를 어디까지 묶을 것인지도 생각할 거리가 많음.  
- 일정시점 이상에서는 라우터의 적용을 자연스럽게 고민하게 됐음(개인적인 생각일 수도).

#### 1단계
**목적 : 무작정 시작해 보기**  

테스트를 위해 필요한 데이터는 [openAPI](https://www.data.go.kr/irossearch.do?index=OPENAPI&query=&currentPage=1&countPerPage=10)를 사용.  
app.js파일에 하나의 클래스만 선언한 후 모든 기능을 구현해 봄.  
객체간의 연동을 고민할 필요없기 때문에 쭈욱 생각을 구현해 보기 좋음.  
Store객체를 사용하기 보단 내부에 state를 두고 모든 것을 관리.  

```javascript
// 랜더 부분 코드
<div className="wrapper">
    <h1>Hello React API</h1>
    <div className="search-option-area">
        <form>
            <filedset>
                <label>콘텐츠타입 :
                <select title="contentType" name="contentType" onChange={this.onChangeContentTypeList.bind(this)}>
                    {contentList}
                </select>
                </label>
                <label>지역선택 :
                <select title="지역" name="area" onChange={this.onChangeAreaList.bind(this)} >
                    {optionList}
                </select>
                </label>
                <label>시군구선택 :
                <select title="시군구" name="sigun" onChange={this.onChangeSigunAreaList.bind(this)}>
                    {sigunList}
                </select>
                </label>
            </filedset>
        </form>

    </div>
    <p>지역코드 : {this.state.areaCode} 시군구코드 : {this.state.sigunCode} 관광타입 : {this.state.type}</p>
    <ul>
        {eventList}
    </ul>
    <div>
        {prevButton}<ul>{pageList}</ul>{nextButton}
    </div>
    {eventDetail}
</div>
```

#### 2단계
**목적 : 요소를 객체로 구성해보기**  

UI중 상단 검색 부분을 별도의 객체로 분리해 보기로 결정.  
- SearchFormView.js파일을 추가하여 해당부분 코드를 옮김.  
- 별도 객체를 사용하게 됨에 따라 PropTypes 적용과 자식객체에 props속성 전달방법을 학습  

```javascript  
<div className="wrapper">
    <h1>Hello React API</h1>
    <SearchFormView areas={this.state.areas}
                    sigungus={this.state.sigungus}
                    contentTypeList = {this.state.contentTypes} />
    <p>지역코드 : {this.state.areaCode} 시군구코드 : {this.state.sigunCode} 관광타입 : {this.state.type}</p>
    <ul>
        {eventList}
    </ul>
    <div>
        {prevButton}<ul>{pageList}</ul>{nextButton}
    </div>
    {eventDetail}
</div>
```  

#### 3단계
**목적 : Store사용해 보기**  

컴포넌트에서 관리하던 데이터를 Store를 통해 관리해보기  
- 원할한 Store 사용을 위해서는 Dispatcher와 Action등을 구성하는게 좋음.  
- Store적용을 하며 데이터의 어느수준까지 Store로 관리하는 것이 좋을 것인지 생각해 봄.  
- react특성상 Store간 데이터 접근이 쉬운만큼 성격에 따른 Store객체 구성이 필요해 보임.  

```javascript
// 관리해야 할 정보가 아래와 같이 4가지 라면
let areaCode;
let areaList;
let sigunguCode;
let sigunguList;

// 관리해야 할 데이터만큼의 Store를 만들어서 관리가 가능.
class AreaCodeStore extends ReduceStore {
    getInitialState(){
        return 0;
    }
}
class AreaListStore extends ReduceStore {
    getInitialState(){
        return [];
    }
}
class SigunguCodeStore extends ReduceStore {
    getInitialState(){
        return 0;
    }
}
class SigunguListStore extends ReduceStore {
    getInitialState(){
        return [];
    }
}

// 너무 많은 store가 부담스럽다면 여러속성을 묶어서 관리해도 관리
class SearchDataStore extends ReduceStore {
    getInitialState(){
        return{
            areaCode:0,
            areaList:[],
            sigunguCode:0,
            sigunguList:[]
        }
    }
}
```

#### 4단계
**목적 : Route적용해 보기**  

리스트 상세내용을 표현하려고 보니 단페이지에서 모두 다루기에는  
코드가 복잡하고 깔끔하지 않아 Router를 이용한 랜더링 분리를 시도  

간단하게 적용후 느낀점
- 역할에 따른 객체구분을 잘해야 Router적용하기에도 좋음
- Router를 잘 적용하려 하다 보니 React사고방식도 좋아지는 느낌

```javascript
//1차적인 구성은 아래와 같음
<Router history={browserHistory} >
    <Route path="/" component={TourApp}></Route>
    <Route path="detail/:content_id" component = {TourDetailContent} />
</Router>

// 객체를 나누고 효율을 생각하다 보니 아래와 같은 구성으로 변경
<Router history={browserHistory} >
    <Route component={TourAppContainer}>
        <Route path="/" component={TourApp}>
            <IndexRoute component={TourList}/>
            <Route path="detail/:content_id" component = {TourDetailContent} />
        </Route>
    </Route>
</Router>
```
