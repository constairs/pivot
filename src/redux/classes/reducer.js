import {
  assoc,
  pipe,
  lensProp,
  over,
  append,
  map,
  filter,
} from 'ramda';

import { createReducer } from '../../utils/reducerUtils';
import * as TYPES from './types';

export const initState = {
  classSessions: [],
  collectionList: [],
  currectClass: {},
  currentCollection: {},
  classesFetching: false,
  collectionsFetching: false,
  error: ''
};

const classesLens = lensProp('classSessions');
const collectionsLens = lensProp('collectionList');

const createClassRequest = () => assoc('classesFetching', true);
const createClassSuccessed = createResponse => pipe(
  assoc('classesFetching', false),
  over(classesLens, append(createResponse)),
);
const createClassFailed = error => pipe(
  assoc('classesFetching', false),
  assoc('error', error)
);

const getClassesRequest = () => assoc('classesFetching', true);
const getClassesSuccessed = classes => pipe(
  assoc('classesFetching', false),
  assoc('classSessions', classes)
);
const getClassesFailed = error => pipe(
  assoc('classesFetching', false),
  assoc('error', error)
);

const selectClass = classData => assoc('currectClass', classData);

const selectCollection = collectionData => assoc('currentCollection', collectionData);

const updateClassRequest = () => assoc('classesFetching', true);
const updateClassSuccessed = updateResponse => pipe(
  assoc('classesFetching', false),
  over(
    classesLens,
    map(classItem => (classItem.id === updateResponse.id ? updateResponse : classItem))
  ),
  assoc('currectClass', updateResponse)
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
    filter(classItem => (classItem.id !== deleteResponse))
  ),
  assoc('currentClass', {}),
);
const deleteClassFailed = error => pipe(
  assoc('classesFetching', false),
  assoc('error', error)
);

const createCollectionRequest = () => assoc('collectionsFetching', true);
const createCollectionSuccessed = createResponse => pipe(
  assoc('collectionsFetching', false),
  over(collectionsLens, append(createResponse)),
);
const createCollectionFailed = error => pipe(
  assoc('collectionsFetching', false),
  assoc('error', error)
);

const getCollectionsRequest = () => assoc('collectionsFetching', true);
const getCollectionsSuccessed = collections => pipe(
  assoc('collectionsFetching', false),
  assoc('collectionList', collections),
);
const getCollectionsFailed = error => pipe(
  assoc('collectionsFetching', false),
  assoc('error', error)
);

const updateCollectionRequest = () => assoc('collectionsFetching', true);
const updateCollectionSuccessed = updateResponse => pipe(
  assoc('collectionsFetching', false),
  over(
    collectionsLens,
    map(
      collectionItem => (collectionItem.id === updateResponse.id ? updateResponse : collectionItem)
    )
  ),
  assoc('currentCollection', updateResponse),
);
const updateCollectionFailed = error => pipe(
  assoc('collectionsFetching', false),
  assoc('error', error)
);

const handlers = {
  [TYPES.CREATE_CLASS_REQUEST]: createClassRequest,
  [TYPES.CREATE_CLASS_SUCCESSED]: createClassSuccessed,
  [TYPES.CREATE_CLASS_FAILED]: createClassFailed,

  [TYPES.GET_CLASSES_REQUEST]: getClassesRequest,
  [TYPES.GET_CLASSES_SUCCESSED]: getClassesSuccessed,
  [TYPES.GET_CLASSES_FAILED]: getClassesFailed,

  [TYPES.SELECT_CLASS]: selectClass,
  [TYPES.SELECT_COLLECTION]: selectCollection,

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
