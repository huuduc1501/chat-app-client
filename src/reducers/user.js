import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authenticate, client } from '../utils/index'

export const login = createAsyncThunk('user/login', async ({ payload }) => {
    const { data: user } = await authenticate('login', payload)
    if (user.token) {
        return user
    }
})
export const signup = createAsyncThunk('user/signup', async ({ payload }) => {
    const { data: user } = await authenticate('signup', payload)
    console.log(user)
    if (user.token) {
        return user
    }
})
export const getMe = createAsyncThunk('user/getme', async () => {
    const { data: user } = await client('/auth/me')

    return { token: localStorage.getItem('token'), ...user }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isFetching: true,
        data: { token: localStorage.getItem('token') }
    },
    reducers: {
        logout(state, action) {
            state = {}
            localStorage.removeItem('token')
        },
        addGroup(state, action) {
            // state.data = { ...state.data, listGroup: [...state.data.listGroup, action.payload] }
            state.data.listGroups.push(action.payload)
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.data = action.payload || {}
            state.isFetching = false
        },
        [signup.fulfilled]: (state, action) => {
            state.data = action.payload || {}
            state.isFetching = false

        },
        [getMe.fulfilled]: (state, action) => {
            state.data = action.payload
            state.isFetching = false

        }
    }
})

export const { logout, addGroup } = userSlice.actions
export default userSlice.reducer