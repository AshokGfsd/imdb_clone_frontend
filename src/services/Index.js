import requests from "./httpServices";
export const LoginUser = async (data) => {
  return await requests.post(`auth/login`, data);
};
export const RegisterUser = async (data) => {
  return await requests.post(`auth/register`, data);
};

// ================== producers  page start ================
export const GetProducers = async (data) => {
  return await requests.post(`producers/get-all`, data);
};
export const CreateProducer = async (data) => {
  return await requests.post(`producers`, data);
};
export const UpdateProducer = async (id, data) => {
  return await requests.put(`producers/${id}`, data);
};

export const DeleteProducer = async (id) => {
  return await requests.delete(`/producers/${id}`);
};
// ================== User page start================
export const GetActor = async (data) => {
  return await requests.post(`actors/get-all`, data);
};
export const CreateActor = async (data) => {
  return await requests.post(`actors`, data);
};
export const UpdateActor = async (id, data) => {
  return await requests.put(`actors/${id}`, data);
};
export const DeleteActor = async (id) => {
  return await requests.delete(`/actors/${id}`);
};

// ================ Movie =====================
export const GetMovie = async (data) => {
  return await requests.post(`movies/get-all`, data);
};
export const CreateMovie = async (formData) => {
  return await requests.post("/movies/", formData);
};

export const DeleteMovie = async (id) => {
  return await requests.delete(`/movies/${id}`);
};
export const UpdateMovie = async (id, formData) => {
  return await requests.put(`movies/${id}`, formData);
};
