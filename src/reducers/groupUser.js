import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../utils/index'

export const getAllUser = createAsyncThunk('group/getAllUser',
    async (groupId) => {
        
        const { data: allUser } = await client(`/group/${groupId}`)
        return allUser
    })

const groupSlice = createSlice({
    name: 'groupUser',
    initialState: {
        isFetching:true,
        data: []
    },
    reducers: {
        joinGroup(state, action) {
            state.data = [action.payload, ...state.data]
        }
    },
    extraReducers: {
        [getAllUser.fulfilled]: (state, action) => {
            state.isFetching = false
            state.data = action.payload
        }
    }
})

export const { joinGroup } = groupSlice.actions

export default groupSlice.reducer