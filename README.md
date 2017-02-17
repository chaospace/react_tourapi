## React Flux 스터디
  flux를 사용하기 위한 plugin 설치
  ```javascript
    npm install --save flux;
  ```
 ## Flux?  
 웹 어플리케이션을 개발하기 위한 아키텍처 가이드 라인( 페이스북 제작 )  
 리액트 전용은 아님  

 **주요 요소**
- 액션 ( 이벤트 )
- 디스패처 ( 컨트롤러 )
- 스토어  ( 데이터 )  

()안에 내용은 개인적인 생각을 적은 것임.  
글보단 코드로 이해.

```javascript
    let FooActionMSG ={
        FOO_INIT : "FOO INIT",
        FOO_CHANGE : "FOO CHANGE"
    };

    // 디스패처 객체 액션발송 담당
    class AppDispatcher extends Dispatcher {

        dispatch( action ={}){
            super.dispatch( action );
        }
    };

    let dispatcher = new AppDispatcher();

    /**
        액션 생성자
        액션을 만들어 dispatcher를 이용한 액션 발생
    */
    let FooAction = {

        initFoo(){
            dispatcher.dispatch({
                type:FooActionMSG.FOO_INIT,
                msg :"chaospace"
            })
        }

    };


    /**
        store
        에플리케이션에 사용되는 데이터 담당 객체
        action을 통한 데이터 변경 시
        ui갱신을 가져옴.
    */
    class FooStore extends ReducStore {

        getInitialState(){
            return "";
        }

        // 상태 변경에 다른
        reduce( state, action ){

            switch( action.type ){

                case FooActionMSG.FOO_INIT :
                    state = action.msg;
                break;

                case FooActionMSG.FOO_CANGE :
                    state += action.msg;
                break;

            }
            return state;
        }

    };

    // store를 객체 초기화
    let store = new FooStore(dispatcher);


    /**
        app 객체
        FooAction객체를 통해 변경된 store를 이쁘게 사용.
    */
    class App extends Component {

        constructor(){
            super(...arguments);
            FooAction.initFoo();
        }

        render(){
            return(
                <div>
                    <p>{this.state.message}</p>
                </div>
            );
        }

    };

    // app객체에 store와 state 매칭
    App.getStore = () => ([store]);
    App.calculateState = ( prevState ) => ({
        message : store.getState()
    });

    // flux의 Component를 통한 App생성
    const objApp = Component.create(App);

    render( <objApp />, document.getElementById('root'));
```
