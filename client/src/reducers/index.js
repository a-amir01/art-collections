/**
 * Created by amirassad on 7/18/17.
 */

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';

import { paintingReducer } from './paintingReducer';
import { paintingFormReducer } from './paintingFormReducer';
import { categoryReducer } from './categoryReducer';

//https://facebook.github.io/immutable-js/
/*Redux doesn't care how you store the state—it can be a plain object,
 *an Immutable object, or anything else. You'll probably want a (de)serialization
 *mechanism for writing universal apps and hydrating their state from the server,
 *but other than that, you can use any data storage library as long as it supports immutability. */

export default combineReducers({
    paintingReducer,
    paintingFormReducer,
    categoryReducer,
    form : formReducer,
});