import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  oobCode: "",
};

const verficationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.oobCode = action.payload;
    },
  },
});

export const { setCode } = verficationSlice.actions;
export default verficationSlice.reducer;
