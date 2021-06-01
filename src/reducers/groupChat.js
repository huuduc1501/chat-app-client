import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../utils/index'


export const getAllChat = createAsyncThunk('groupChat/getChat',
    async (groupId) => {
        const { data: logChat } = await client(`/groupChat/${groupId}`)

        return logChat
    })

const groupChatSlice = createSlice({
    name: 'groupChat',
    initialState: {
        isFetching: true,
        data: []
    },
    reducers: {
        addNewMess(state, action) {
            state.data = [...state.data, action.payload,]
        },
        outRoom(state, action) {
            state.data = []
            state.isFetching = true
        }
    },
    extraReducers: {
        [getAllChat.fulfilled]: (state, action) => {
            state.data = action.payload
            state.isFetching = false

        }
    }
})

export const { addNewMess, outRoom } = groupChatSlice.actions

export default groupChatSlice.reducer