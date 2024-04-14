import { createSlice } from "@reduxjs/toolkit";


const budgetSlice = createSlice({
  name: "budgetData",
  initialState:
    {
        budgets: []
    },
  reducers: {
    addBudgetDetails: (state, action) => {
      state.budgets.push(action.payload);

      //   return [...state, action.payload];
    },
  },
});

export const { addBudgetDetails } = budgetSlice.actions;
export default budgetSlice.reducer;
