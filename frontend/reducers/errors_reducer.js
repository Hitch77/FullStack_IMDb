import { combineReducers } from 'redux';

import session from './session_errors_reducer';
import reviews from './review_errors_reducer'

export default combineReducers({
    session,
    reviews
});
