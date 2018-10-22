import * as TYPES from './types';

export const createClassRequest = classData => ({
  type: TYPES.CREATE_CLASS_REQUEST,
  payload: classData
});
export const createClassSuccessed = createResponse => ({
  type: TYPES.CREATE_CLASS_SUCCESSED,
  payload: createResponse
});
export const createClassFailed = error => ({
  type: TYPES.CREATE_CLASS_FAILED,
  payload: error
});

export const getClassesRequest = () => ({
  type: TYPES.GET_CLASSES_REQUEST,
});
export const getClassesSuccessed = classesList => ({
  type: TYPES.GET_CLASSES_SUCCESSED,
  payload: classesList
});
export const getClassesFailed = error => ({
  type: TYPES.GET_CLASSES_FAILED,
  payload: error
});

export const selectClass = classData => ({
  type: TYPES.SELECT_CLASS,
  payload: classData
});

export const selectCollection = collectionData => ({
  type: TYPES.SELECT_COLLECTION,
  payload: collectionData
});

export const updateClassRequest = updateData => ({
  type: TYPES.UPDATE_CLASS_REQUEST,
  payload: updateData
});
export const updateClassSuccessed = updateResponse => ({
  type: TYPES.UPDATE_CLASS_SUCCESSED,
  payload: updateResponse
});
export const updateClassFailed = error => ({
  type: TYPES.UPDATE_CLASS_FAILED,
  payload: error
});

export const deleteClassRequest = () => ({
  type: TYPES.DELETE_CLASS_REQUEST,
});
export const deleteClassSuccessed = deleteResponse => ({
  type: TYPES.DELETE_CLASS_SUCCESSED,
  payload: deleteResponse
});
export const deleteClassFailed = error => ({
  type: TYPES.DELETE_CLASS_FAILED,
  payload: error
});

export const createCollectionRequest = collectionData => ({
  type: TYPES.CREATE_COLLECTION_REQUEST,
  payload: collectionData
});
export const createCollectionSuccessed = createResponse => ({
  type: TYPES.CREATE_COLLECTION_SUCCESSED,
  payload: createResponse
});
export const createCollectionFailed = error => ({
  type: TYPES.CREATE_COLLECTION_FAILED,
  payload: error
});

export const getCollectionsRequest = () => ({
  type: TYPES.GET_COLLECTIONS_REQUEST,
});
export const getCollectionsSuccessed = collectionsList => ({
  type: TYPES.GET_COLLECTIONS_SUCCESSED,
  payload: collectionsList
});
export const getCollectionsFailed = error => ({
  type: TYPES.GET_COLLECTIONS_FAILED,
  payload: error
});

export const updateCollectionRequest = () => ({
  type: TYPES.UPDATE_COLLECTION_REQUEST,
});
export const updateCollectionSuccessed = updateResponse => ({
  type: TYPES.UPDATE_COLLECTION_SUCCESSED,
  payload: updateResponse
});
export const updateCollectionFailed = error => ({
  type: TYPES.UPDATE_COLLECTION_FAILED,
  payload: error
});
