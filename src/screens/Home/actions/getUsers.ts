import axios from 'axios';
import { GET_USERS } from '../../../constants/endpoints';
import { User } from '../../../types/User';

type GetUsersResponseType = User[];

export const getUsers = async () => {
  try {
    const data = await axios.get<GetUsersResponseType>(GET_USERS);
    return data.data;
  } catch (error) {
    return null;
  }
};
