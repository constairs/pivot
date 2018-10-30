import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects';

import { push } from 'connected-react-router';

import {
  CREATE_CLASS_REQUEST,
  GET_CLASSES_REQUEST,
  UPDATE_CLASS_REQUEST,
  DELETE_CLASS_REQUEST,
  CREATE_COLLECTION_REQUEST,
  GET_COLLECTIONS_REQUEST,
  UPDATE_COLLECTION_REQUEST
} from './types';

import {
  createClassSuccessed,
  createClassFailed,
  getClassesSuccessed,
  getClassesFailed,
  updateClassSuccessed,
  updateClassFailed,
  deleteClassSuccessed,
  deleteClassFailed,
  createCollectionSuccessed,
  createCollectionFailed,
  getCollectionsSuccessed,
  getCollectionsFailed,
  updateCollectionSuccessed,
  updateCollectionFailed,
} from './actions';

import {
  createClass,
  getAllClasses,
  updateClass,
  deleteClass,
  createCollection,
  getAllCollections,
  updateCollection
} from './requests';

export function* createClassSaga(action) {
  try {
    const createResponse = yield call(createClass, action.payload);
    yield put(createClassSuccessed(createResponse.data.data));
  } catch (error) {
    yield put(createClassFailed(error.message));
  }
}

export function* getAllClassesSaga() {
  try {
    const classesList = yield call(getAllClasses);
    yield put(getClassesSuccessed(classesList.data.data));
  } catch (error) {
    yield put(getClassesFailed(error));
  }
}

export function* updateClassSaga(action) {
  try {
    const updateResponse = yield call(updateClass, action.payload);
    yield put(updateClassSuccessed(updateResponse));
  } catch (error) {
    yield put(updateClassFailed(error.message));
  }
}

export function* deleteClassSaga(action) {
  try {
    yield call(deleteClass, action.payload);
    yield put(deleteClassSuccessed(action.payload));
    yield put(push('/'));
  } catch (error) {
    yield put(deleteClassFailed(error.message));
  }
}

export function* createCollectionSaga(action) {
  try {
    const createResponse = yield call(createCollection, action.payload);
    yield put(createCollectionSuccessed(createResponse.data.data));
  } catch (error) {
    yield put(createCollectionFailed(error.message));
  }
}

export function* getAllCollectionsSaga() {
  try {
    const collectionsList = yield call(getAllCollections);
    yield put(getCollectionsSuccessed(collectionsList.data.data));
  } catch (error) {
    yield put(getCollectionsFailed(error));
  }
}

export function* updateCollectionSaga(action) {
  try {
    const updateResponse = yield call(updateCollection, action.payload);
    yield put(updateCollectionSuccessed(updateResponse.data.data));
  } catch (error) {
    yield put(updateCollectionFailed(error));
    if (error.response.status === 500) {
      const updateResponse = yield call(updateCollection, action.payload);
      yield put(updateCollectionSuccessed(updateResponse.data.data));
    }
  }
}

export function* classesSagas() {
  yield takeLatest(CREATE_CLASS_REQUEST, createClassSaga);
  yield takeLatest(GET_CLASSES_REQUEST, getAllClassesSaga);
  yield takeLatest(UPDATE_CLASS_REQUEST, updateClassSaga);
  yield takeLatest(DELETE_CLASS_REQUEST, deleteClassSaga);
  yield takeLatest(CREATE_COLLECTION_REQUEST, createCollectionSaga);
  yield takeLatest(GET_COLLECTIONS_REQUEST, getAllCollectionsSaga);
  yield takeLatest(UPDATE_COLLECTION_REQUEST, updateCollectionSaga);
}
