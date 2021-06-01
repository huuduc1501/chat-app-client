import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../utils/index'

export const getRecommendGroup = createAsyncThunk('recomendGroup/getAll',
    async () => {
        const { data: recommendGroup } = await client('/group')
        return recommendGroup
    })

const recommenSlice = createSlice({
    name: 'reccomendGroup',
    initialState: { isFetching: true, data: [] },
    extraReducers: {
        [getRecommendGroup.fulfilled]: (state, action) => {
            state.data = action.payload
            state.isFetching = false

        }
    }
})

export default recommenSlice.reducer