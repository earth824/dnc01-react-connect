import { axios } from '../config/axios';

const register = (data: unknown) => axios.post('/auth/register', data);
const login = (data: unknown) => axios.post('/auth/login', data);

export const authAPI = { register, login };
