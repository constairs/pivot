import {
  put,
  // call,
  takeLatest
} from 'redux-saga/effects';
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
// createClass,
// getAllClasses,
// updateClass,
// deleteClass,
// createCollection,
// getAllCollections,
// updateCollection
} from './requests';

export function* createClassSaga(action) {
  try {
    // const createResponse = yield call(createClass, action.payload);
    const createResponse = {
      data: {
        end_time: null,
        id: '74c5ff62-a10e-4a56-b7d1-0a399dba87c2',
        instructor: null,
        media: [],
        start_time: null,
        title: action.payload.title,
        workout_plan_id: null
      }
    };
    yield put(createClassSuccessed(createResponse.data));
  } catch (error) {
    yield put(createClassFailed(error.message));
  }
}

export function* getAllClassesSaga() {
  try {
    // const classesList = yield call(getAllClasses);
    const classesList = {
      data: [
        {
          end_time: null,
          id: '0ce98a81-9250-4d75-87b4-1f66c7306110',
          instructor: {
            avatar_url: 'http://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg',
            email: 'josh@trainwithpivot.com',
            first_name: 'Joshua',
            id: '5aa214c9-8f44-425f-b82a-e6de17ca81e9',
            last_name: 'Augustin',
            username: 'august'
          },
          media: [
            {
              index: 0,
              type_id: 9,
              url: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
            },
            {
              index: 0,
              type_id: 11,
              url: 'https://s3-us-west-1.amazonaws.com/pivot-development/result.jsonl'
            }
          ],
          start_time: null,
          title: 'My New Plan Again',
          workout_plan_id: '636e2214-fc52-42c8-a155-f4215ed4ce2a'
        },
        {
          end_time: null,
          id: 'd0e71908-38ea-4e4f-bf15-c5e8e498b249',
          instructor: null,
          media: [],
          start_time: null,
          title: 'Example Plan',
          workout_plan_id: 'e78ad8d3-b158-4952-a15b-c3c297071492'
        },
      ]
    };
    yield put(getClassesSuccessed(classesList.data));
  } catch (error) {
    yield put(getClassesFailed(error));
  }
}

export function* updateClassSaga(action) {
  try {
    // const updateResponse = yield call(updateClass, action.payload);
    const UpdateResponse = {
      end_time: action.payload.newData.end_time,
      id: action.payload.id,
      instructor: {
        avatar_url: 'http://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg',
        email: 'josh@trainwithpivot.com',
        first_name: 'Joshua',
        id: '5aa214c9-8f44-425f-b82a-e6de17ca81e9',
        last_name: 'Augustin',
        username: 'august'
      },
      media: [
        {
          index: 0,
          type_id: 9,
          url: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
        },
        {
          index: 0,
          type_id: 11,
          url: 'https://s3-us-west-1.amazonaws.com/pivot-development/result.jsonl'
        }
      ],
      start_time: action.payload.newData.start_time,
      title: action.payload.newData.title,
      workout_plan_id: '636e2214-fc52-42c8-a155-f4215ed4ce2a'
    };
    yield put(updateClassSuccessed(UpdateResponse));
  } catch (error) {
    yield put(updateClassFailed(error.message));
  }
}

export function* deleteClassSaga(action) {
  try {
    // const deleteResponse = yield call(deleteClass, action.payload);
    yield put(deleteClassSuccessed(action.payload));
  } catch (error) {
    yield put(deleteClassFailed(error.message));
  }
}

export function* createCollectionSaga(action) {
  try {
    // const createResponse = yield call(createCollection, action.payload);
    const createResponse = {
      data: {
        class_sessions: [],
        title: action.payload.title,
        id: 'cool-classes'
      }
    };
    yield put(createCollectionSuccessed(createResponse.data));
  } catch (error) {
    yield put(createCollectionFailed(error.message));
  }
}

export function* getAllCollectionsSaga() {
  try {
    // const collectionsList = yield call(getAllCollections);
    const collectionsList = {
      data: [
        {
          class_sessions: [
            {
              end_time: null,
              id: '0ce98a81-9250-4d75-87b4-1f66c7306110',
              instructor: {
                avatar_url: 'http://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg',
                email: 'josh@trainwithpivot.com',
                first_name: 'Joshua',
                id: '5aa214c9-8f44-425f-b82a-e6de17ca81e9',
                last_name: 'Augustin',
                username: 'august'
              },
              media: [
                {
                  index: 0,
                  type_id: 9,
                  url: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
                },
                {
                  index: 0,
                  type_id: 11,
                  url: 'https://s3-us-west-1.amazonaws.com/pivot-development/result.jsonl'
                }
              ],
              start_time: null,
              title: 'My New Plan Again',
              workout_plan_id: '636e2214-fc52-42c8-a155-f4215ed4ce2a'
            },
            {
              end_time: null,
              id: 'd0e71908-38ea-4e4f-bf15-c5e8e498b249',
              instructor: null,
              media: [],
              start_time: null,
              title: 'Example Plan',
              workout_plan_id: 'e78ad8d3-b158-4952-a15b-c3c297071492'
            },
          ],
          title: 'Cool Classes'
        }
      ]
    };
    yield put(getCollectionsSuccessed(collectionsList.data));
  } catch (error) {
    yield put(getCollectionsFailed(error));
  }
}

export function* updateCollectionSaga() {
  try {
    // const updateResponse = yield call(updateCollection, action.payload);
    const updateResponse = {
      data: {
        class_sessions: [
          {
            end_time: null,
            id: 'd0e71908-38ea-4e4f-bf15-c5e8e498b249',
            instructor: null,
            media: [],
            start_time: null,
            title: 'Workout Plan',
            workout_plan_id: 'e78ad8d3-b158-4952-a15b-c3c297071492'
          }
        ],
        title: 'Cool Classes'
      }
    };
    yield put(updateCollectionSuccessed(updateResponse.data));
  } catch (error) {
    yield put(updateCollectionFailed(error.message));
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
