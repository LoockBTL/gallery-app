import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPhotoMin } from "../../types/entity.types";

interface IPhotoState {
  photos: IPhotoMin[];
  error: string;
}

const initialState: IPhotoState = { photos: [], error: "" };

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    callApi: (state, action: PayloadAction<number>) => {},
    callApiSuccess: (state, action: PayloadAction<IPhotoMin[]>) => {
      state.photos = [...state.photos, ...action.payload];
    },
    callApiError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { reducer: photoReducer, actions: photoActions } = photoSlice;
