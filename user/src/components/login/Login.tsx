import { useEffect } from "react";
import kakao from "../../assets/kakao_login_medium.png";
import { ModalBackdrop, LoginModal } from "./css/style-Login";

interface PropsType {
  onClose: () => void;
}

const Login = ({ onClose: closeModal }: PropsType) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      closeModal();
      document.body.style.overflow = "overlay";
    };
  }, [closeModal]);

  return (
    <>
      <ModalBackdrop onClick={closeModal} />
      <LoginModal>
        <button onClick={() => alert("카카오 로그인")}>
          <img src={kakao} alt="kakao-login" />
        </button>
      </LoginModal>
    </>
  );
};

export default Login;
