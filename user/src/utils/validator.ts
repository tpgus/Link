const digit = /\d/;
const alphabet = /[a-zA-Z]/;
const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const loginValidate = {
  id: (value: string) => {
    if (!emailPattern.test(value) || value.trim().length === 0) {
      return {
        isValid: false,
        errorMessage: "이메일 주소가 올바르지 않습니다.",
      };
    }
    return { isValid: true, errorMessage: null };
  },

  password: (value: string) => {
    if (value.trim().length === 0) {
      return {
        isValid: false,
        errorMessage: "비밀번호를 입력해 주세요",
      };
    }
    return { isValid: true, errorMessage: null };
  },
};

export const signUpValidate = {
  id: (value: string) => {
    if (!emailPattern.test(value) || value.trim().length === 0) {
      return {
        isValid: false,
        errorMessage: "이메일 형식의 아이디를 입력해 주세요",
      };
    }
    return { isValid: true, errorMessage: null };
  },

  password: (value: string) => {
    if (value.trim().length < 8) {
      return {
        isValid: false,
        errorMessage: "비밀번호는 8글자 이상이어야 합니다.",
      };
    }
    if (!digit.test(value)) {
      return {
        isValid: false,
        errorMessage: "비밀번호에 숫자가 적어도 하나 이상 포함되어야 합니다.",
      };
    }
    if (!alphabet.test(value)) {
      return {
        isValid: false,
        errorMessage: "비밀번호에 영문이 적어도 하나 이상 포함되어야 합니다.",
      };
    }

    return {
      isValid: true,
      errorMessage: null,
    };
  },

  checkConfirmPassword: (originPassword: string, confirmPassword: string) => {
    return originPassword === confirmPassword;
  },
};
