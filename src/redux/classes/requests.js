import { axiosInstance } from '../../utils/axios';

export const createClass = classData => axiosInstance.post('/v1/trainer/class_sessions', classData);
export const getAllClasses = () => axiosInstance.get('/v1/trainer/class_sessions');

export const updateClass = (updateData) => {
  axiosInstance.put(`/v1/trainer/class_sessions/${updateData.id}`, updateData.newData);
};

export const deleteClass = id => axiosInstance.put(`/v1/trainer/class_sessions/${id}`);
export const createCollection = collectionData => axiosInstance.post('/v1/trainer/collections', collectionData);
export const getAllCollections = () => axiosInstance.get('/v1/trainer/collections');

export const updateCollection = classesList => axiosInstance.put(`/v1/trainer/collections/${classesList.collectionId}`, { title: classesList.collectionId, class_sessions: classesList.class_sessions });
