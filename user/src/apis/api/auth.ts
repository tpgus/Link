import { firebaseAuthAPI } from "../config";

const header = { "Content-Type": "application/json" };
const query = `key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

interface ParamsType {
  email: string;
  password: string;
}

interface ResponseType {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

export const authAPI = {
  signUp: async ({ email, password }: ParamsType) => {
    const response = await firebaseAuthAPI.post<ResponseType>(
      `accounts:signUp?${query}`,
      { email, password, returnSecureToken: true },
      { headers: header }
    );
    return response.data;
  },

  signIn: async ({ email, password }: ParamsType) => {
    const response = await firebaseAuthAPI.post<ResponseType>(
      `accounts:signInWithPassword?${query}`,
      {
        email,
        password,
        returnSecureToken: true,
      },
      { headers: header }
    );
    return response;
  },
};
