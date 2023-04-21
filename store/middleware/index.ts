import { IPhotoMin } from "./../../types/entity.types";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { IApiPhotos } from "../../types/api.type";
import { photoActions } from "../reducer/photosSlice";

async function callPhotos(action: PayloadAction<number>) {
  return await axios
    .get<IApiPhotos>(`https://api.unsplash.com/photos?page=${action.payload}`, {
      headers: {
        Authorization:
          "Client-ID 896d4f52c589547b2134bd75ed48742db637fa51810b49b607e37e46ab2c0043",
      },
    })
    .then((res) => {
      return res.data.map((item) => ({
        id: item.id,
        first_name: item.user.first_name,
        thumb: item.urls.thumb,
        full: item.urls.full,
        alt_description: item.alt_description,
      }));
    })
    .catch((e) => {
      console.log(e);
    });
}

function* apiCallWorker(action: PayloadAction<number>) {
  try {
    const photos: IPhotoMin[] = yield call(callPhotos, action);
    yield put(photoActions.callApiSuccess(photos));
  } catch (error: any) {
    yield put(photoActions.callApiError(error));
  }
}

function* apiCallWatcher() {
  yield takeEvery("photos/callApi", apiCallWorker);
}

export function* apiCallSaga() {
  yield fork(apiCallWatcher);
}
