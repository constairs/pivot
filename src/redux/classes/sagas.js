import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';

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
  for (let i = 0; i < 5; i + 1) {
    try {
      const createResponse = yield call(createClass, action.payload);
      yield put(createClassSuccessed(createResponse.data.data));
      break;
    } catch (error) {
      if (error.response.status === 500 && i < 4) {
        yield delay(1000);
      } else {
        yield put(createClassFailed(error.message));
        break;
      }
    }
  }
}

export function* getAllClassesSaga() {
  for (let i = 0; i < 5; i + 1) {
    try {
      const classesList = yield call(getAllClasses);
      yield put(getClassesSuccessed(classesList.data.data));
      break;
    } catch (error) {
      if (error.response.status === 500 && i < 4) {
        yield delay(1000);
      } else {
        yield put(getClassesFailed(error.message));
        break;
      }
    }
  }
}

export function* updateClassSaga(action) {
  for (let i = 0; i < 5; i + 1) {
    try {
      const updateResponse = yield call(updateClass, action.payload);
      yield put(updateClassSuccessed(updateResponse.data.data));
      break;
    } catch (error) {
      if (error.response.status === 500 && i < 4) {
        yield delay(1000);
      } else {
        yield put(updateClassFailed(error.message));
        break;
      }
    }
  }
}

export function* deleteClassSaga(action) {
  for (let i = 0; i < 5; i + 1) {
    try {
      yield call(deleteClass, action.payload);
      yield put(deleteClassSuccessed(action.payload));
      yield put(push('/'));
      break;
    } catch (error) {
      if (error.response.status === 500 && i < 4) {
        yield delay(1000);
      }
      yield put(deleteClassFailed(error.message));
      break;
    }
  }
}

export function* createCollectionSaga(action) {
  for (let i = 0; i < 5; i + 1) {
    try {
      const createResponse = yield call(createCollection, action.payload);
      yield put(createCollectionSuccessed(createResponse.data.data));
      break;
    } catch (error) {
      if (error.response.status === 500 && i < 4) {
        yield delay(1000);
      }
      yield put(createCollectionFailed(error.message));
      break;
    }
  }
}

export function* getAllCollectionsSaga() {
  for (let i = 0; i < 5; i + 1) {
    try {
      const collectionsList = yield call(getAllCollections);
      yield put(getCollectionsSuccessed(collectionsList.data.data));
      break;
    } catch (error) {
      if (error.response.status === 500 && i < 4) {
        yield delay(1000);
      } else {
        yield put(getCollectionsFailed(error.message));
        break;
      }
    }
  }
}

export function* updateCollectionSaga(action) {
  for (let i = 0; i < 5; i + 1) {
    try {
      const updateResponse = yield call(updateCollection, action.payload);
      yield put(updateCollectionSuccessed(updateResponse.data.data));
      break;
    } catch (error) {
      if (error.response.status === 500 && i < 4) {
        yield delay(1000);
      } else {
        yield put(updateCollectionFailed(error.message));
        break;
      }
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
