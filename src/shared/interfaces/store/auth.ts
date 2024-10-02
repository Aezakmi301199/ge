import { UserResponse } from '../../api/generated-api/api.schemas';

export interface IAuth {
  user: UserResponse | null;

  setToken: (newToken: string) => void;
  getToken: () => string | null;
  fetchUserInfo: () => Promise<void>;
}
