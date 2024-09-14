import axios from 'axios';
import { getRepository } from 'typeorm';
import { PostEntity, Post } from './entity/Post';

const apiUrl = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async () => {
  const response = await axios.get<Post[]>(`${apiUrl}/posts`);
  const postRepository = getRepository(PostEntity);
  await postRepository.save(response.data);
  return response.data;
};

export const createPost = async (data: Partial<Post>) => {
  const response = await axios.post<Post>(`${apiUrl}/posts`, data);
  const postRepository = getRepository(PostEntity);
  await postRepository.save(response.data);
  return response.data;
};

export const updatePost = async (id: number, data: Partial<Post>) => {
  const response = await axios.put<Post>(`${apiUrl}/posts/${id}`, data);
  const postRepository = getRepository(PostEntity);
  await postRepository.update(id, response.data);
  return response.data;
};

export const patchPost = async (id: number, data: Partial<Post>) => {
  const response = await axios.patch<Post>(`${apiUrl}/posts/${id}`, data);
  const postRepository = getRepository(PostEntity);
  await postRepository.update(id, response.data);
  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await axios.delete(`${apiUrl}/posts/${id}`);
  const postRepository = getRepository(PostEntity);
  await postRepository.delete(id);
  return response.data;
};
