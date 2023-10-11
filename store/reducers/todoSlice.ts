import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Item {
    id: String
    text: String
}
const todosSlice = createSlice({
    name: 'todos',
    initialState: [] as Item[],
    reducers: {
      addTodo: {
        reducer: (state, action: PayloadAction<Item>) => {
          state.push(action.payload)
        },
        prepare: (item: Item) => {
          const id = 'new id'
          return { payload: { id: id, text: item.text } }
        },
      },
    },
  })
  export const { addTodo } = todosSlice.actions
  export default todosSlice.reducer