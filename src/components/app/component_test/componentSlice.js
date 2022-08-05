import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ITEMS_URL = 'https://jsonplaceholder.typicode.com/posts';
const itemsUrl ="/equipment-booking-status";

const initialState = {
  items: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

export const fetchItems = createAsyncThunk('fetchItems', async () => {
  const response = await axios.get(ITEMS_URL)
  return response.data
})

export const addItem = createAsyncThunk('addItem', async (initialItem) => {
  // const response = await axios.post(ITEMS_URL, initialItem)
  // return response.data
})

const componentSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    itemAdded: {
      reducer(state, action) {
        state.items.push(action.payload)
      },
      prepare(id, name) {
        return {
          payload: {
            id,
            name,
          }
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const loadedItems = action.payload.map(item => {
          return item;
        });
        state.items = state.items.concat(loadedItems)
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed'
        console.log(action.error.message);
        state.error = action.error.message
      })
      .addCase(addItem.fulfilled, (state, action) => {
        action.payload.name = action.payload.name + "!";
        state.items.push(action.payload)
      })
  }
})

export const selectAllItems = (state) => state.items.items;
export const getItemsStatus = (state) => state.items.status;
export const getItemsError = (state) => state.items.error;

export const { itemAdded } = componentSlice.actions

export default componentSlice.reducer