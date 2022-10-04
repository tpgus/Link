const commonError = (errorType: string) => {
  if (errorType.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
    return "너무 많은 요청을 시도했습니다. 잠시 후에 다시 시도해 주세요.";
  }
  switch (errorType) {
    default:
      return `알 수 없는 에러가 발생했습니다. errorType : ${errorType}`;
  }
};

export const getErrorMessage = {
  signUp: (errorType: string) => {
    switch (errorType) {
      case "EMAIL_EXISTS":
        return "이미 존재하는 이메일입니다.";

      default:
        return commonError(errorType);
    }
  },

  signIn: (errorType: string) => {
    switch (errorType) {
      case "EMAIL_NOT_FOUND":
        return "해당 아이디가 존재하지 않습니다.";

      case "INVALID_EMAIL":
        return "이메일 형식의 아이디를 입력해 주세요.";

      case "INVALID_PASSWORD":
        return "아이디 또는 비밀번호를 확인해 주세요.";

      case "USER_DISABLED":
        return "관리자가 사용자 계정을 비활성화했습니다. 관리자에게 문의하세요.";

      case "WEAK_PASSWORD":
        return "비밀번호는 숫자, 영문 포함 8글자 이상이어야 합니다.";

      default:
        return commonError(errorType);
    }
  },
};
