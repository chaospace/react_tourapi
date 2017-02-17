
import {Dispatcher} from 'flux';
import 'babel-polyfill';

// dispatcher
class AppDispatcher extends Dispatcher {

    dispatchAsync( promise, types, payload ){

        const {success, failure} = types;
        // 성공 실패 시 각각 알맞은 콜백 실행
        promise.then(
            ( (response) => {
                    this.dispatch({
                        type:success,
                        data:Object.assign({}, payload, {response})
                    })
            }
            ),
            error =>
                        this.dispatch({
                        type:failure,
                        data:Object.assign({}, payload, {error})

            })
        );
    }
}

export default new AppDispatcher();
