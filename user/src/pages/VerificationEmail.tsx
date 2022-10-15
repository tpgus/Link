import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/redux-hook";
import { useLocation, useSearchParams } from "react-router-dom";
import { setCode } from "../store/verification-slice";
import { auth } from "../lib/firebase";
import { applyActionCode } from "firebase/auth";

const VerificationEmail = () => {
  const [time, setTime] = useState(3);
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const continueUrl = searchParams.get("continueUrl");
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    switch (mode) {
      case "verifyEmail":
        handleVerifyEmail(auth, oobCode!, continueUrl!);
    }
  }, [continueUrl, mode, oobCode]);

  useEffect(() => {
    // console.log(auth.currentUser);
  }, []);

  const handleVerifyEmail = (
    auth: any,
    oobCode: string,
    continueUrl: string
  ) => {
    applyActionCode(auth, oobCode)
      .then((response) => {})
      .catch((error) => {});
  };
  return (
    <div>{`이메일 인증이 완료되었습니다. ${time}초 후에 창이 저절로 닫힙니다.`}</div>
  );
};

export default VerificationEmail;
