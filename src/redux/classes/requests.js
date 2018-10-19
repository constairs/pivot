import { axiosInstance } from '../../utils/axios';

export const createClass = classData => axiosInstance.post('/v1/trainer/class_sessions', classData);
export const getAllClasses = () => axiosInstance.get('/v1/trainer/class_sessions');
export const updateClass = id => axiosInstance.put(`/v1/trainer/class_sessions/${id}`);
export const deleteClass = id => axiosInstance.put(`/v1/trainer/class_sessions/${id}`);
export const createCollection = collectionData => axiosInstance.post('/v1/trainer/collections', collectionData);
export const getAllCollections = () => axiosInstance.get('/v1/trainer/collections');
export const updateCollection = classesList => axiosInstance.put('/v1/trainer/collections', classesList);
