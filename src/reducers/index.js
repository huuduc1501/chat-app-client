import { combineReducers } from 'redux'

import user from './user'
import groupUser from './groupUser'
import groupChat from './groupChat'
import recommend from './recommendGroup'

export default combineReducers({
    user,
    groupUser,
    groupChat,
    recommend,
})