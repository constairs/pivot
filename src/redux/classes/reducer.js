import {
  assoc,
  pipe,
  lensProp,
  over,
  append,
  map,
  filter
} from 'ramda';

import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

export const initState = {
  classesList: [],
  collections: [],
  end_time: null,
  classesFetching: false,
  id: '',
  instructor: '',
  media: '',
  start_time: null,
  title: '',
  workout_plan_id: '',
  error: ''
};

const classesLens = lensProp('classes');
const collectionsLens = lensProp('collections');

const createClassRequest = () => assoc('classesFetching', true);
const createClassSuccessed = createResponse => pipe(
  assoc('classesFetching', false),
  over(classesLens, append(createResponse.data)),
);
const createClassFailed = error => pipe(
  assoc('classesFetching', false),
  assoc('error', error)
);

const getClassesRequest = () => assoc('classesFetching', true);
const getClassesSuccessed = classes => pipe(
  assoc('classesFetching', false),
  over(classesLens, append(classes)),
);
const getClassesFailed = error => pipe(
  assoc('classesFetching', false),
  assoc('error', error)
);

const updateClassRequest = () => assoc('classesFetching', true);
const updateClassSuccessed = updateResponse => pipe(
  assoc('classesFetching', false),
  over(
    classesLens,
    map(classItem => (classItem.id === updateResponse.id ? updateResponse : classItem))
  ),
);
const updateClassFailed = error => pipe(
  assoc('classesFetching', false),
  assoc('error', error)
);

const deleteClassRequest = () => assoc('classesFetching', true);
const deleteClassSuccessed = deleteResponse => pipe(
  assoc('classesFetching', false),
  over(
    classesLens,
    filter(classItem => (classItem.id !== deleteResponse.id))
  ),
);
const deleteClassFailed = error => pipe(
  assoc('classesFetching', false),
  assoc('error', error)
);

const createCollectionRequest = () => assoc('classesFetching', true);
const createCollectionSuccessed = createResponse => pipe(
  assoc('classesFetching', false),
  over(collectionsLens, append(createResponse.data)),
);
const createCollectionFailed = error => pipe(
  assoc('classesFetching', false),
  assoc('error', error)
);

const getCollectionsRequest = () => assoc('classesFetching', true);
const getCollectionsSuccessed = collections => pipe(
  assoc('classesFetching', false),
  over(collectionsLens, append(collections)),
);
const getCollectionsFailed = error => pipe(
  assoc('classesFetching', false),
  assoc('error', error)
);

const updateCollectionRequest = () => assoc('classesFetching', true);
const updateCollectionSuccessed = updateResponse => pipe(
  assoc('classesFetching', false),
  over(
    collectionsLens,
    map(
      collectionItem => (collectionItem.id === updateResponse.id ? updateResponse : collectionItem)
    )
  ),
);
const updateCollectionFailed = error => pipe(
  assoc('classesFetching', false),
  assoc('error', error)
);

const handlers = {
  [TYPES.CREATE_CLASS_REQUEST]: createClassRequest,
  [TYPES.CREATE_CLASS_SUCCESSED]: createClassSuccessed,
  [TYPES.CREATE_CLASS_FAILED]: createClassFailed,

  [TYPES.GET_CLASSES_REQUEST]: getClassesRequest,
  [TYPES.GET_CLASSES_SUCCESSED]: getClassesSuccessed,
  [TYPES.GET_CLASSES_FAILED]: getClassesFailed,

  [TYPES.UPDATE_CLASS_REQUEST]: updateClassRequest,
  [TYPES.UPDATE_CLASS_SUCCESSED]: updateClassSuccessed,
  [TYPES.UPDATE_CLASS_FAILED]: updateClassFailed,

  [TYPES.DELETE_CLASS_REQUEST]: deleteClassRequest,
  [TYPES.DELETE_CLASS_SUCCESSED]: deleteClassSuccessed,
  [TYPES.DELETE_CLASS_FAILED]: deleteClassFailed,

  [TYPES.CREATE_COLLECTION_REQUEST]: createCollectionRequest,
  [TYPES.CREATE_COLLECTION_SUCCESSED]: createCollectionSuccessed,
  [TYPES.CREATE_COLLECTION_FAILED]: createCollectionFailed,

  [TYPES.GET_COLLECTIONS_REQUEST]: getCollectionsRequest,
  [TYPES.GET_COLLECTIONS_SUCCESSED]: getCollectionsSuccessed,
  [TYPES.GET_COLLECTIONS_FAILED]: getCollectionsFailed,

  [TYPES.GET_CLASSES_REQUEST]: getClassesRequest,
  [TYPES.GET_CLASSES_SUCCESSED]: getClassesSuccessed,
  [TYPES.GET_CLASSES_FAILED]: getClassesFailed,

  [TYPES.UPDATE_COLLECTION_REQUEST]: updateCollectionRequest,
  [TYPES.UPDATE_COLLECTION_SUCCESSED]: updateCollectionSuccessed,
  [TYPES.UPDATE_COLLECTION_FAILED]: updateCollectionFailed
};

export const classSessions = createReducer(initState, handlers);
