import { firebaseAuthAPI } from "../config";

const headerConfig = { "Content-Type": "application/json" };
const query = `key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

interface SignupResponseType {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

interface ParamsType {
  email: string;
  password: string;
}

export const authAPI = {
  signUp: async ({ email, password }: ParamsType) => {
    const response = await firebaseAuthAPI.post<SignupResponseType>(
      `accounts:signUp?${query}`,
      { email, password, returnSecureToken: true },
      { headers: headerConfig }
    );
    return response.data;
  },

  signIn: async ({ email, password }: ParamsType) => {
    const response = await firebaseAuthAPI.post<SignupResponseType>(
      `accounts:signInWithPassword?${query}`,
      {
        email,
        password,
        returnSecureToken: true,
      },
      { headers: headerConfig }
    );
    return response.data;
  },

  verifyEmail: async (idToken: string) => {
    const response = await firebaseAuthAPI.post<{ email: string }>(
      `accounts:sendOobCode?${query}`,
      { requestType: "VERIFY_EMAIL", idToken: idToken },
      { headers: headerConfig }
    );
    return response.data;
  },
};
