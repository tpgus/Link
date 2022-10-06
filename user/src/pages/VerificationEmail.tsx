import React, { useEffect, useState } from "react";

const VerificationEmail = () => {
  const [time, setTime] = useState(3);
  useEffect(() => {
    setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
  }, []);

  if (time === -1) {
    window.close();
  }
  return (
    <div>{`이메일 인증이 완료되었습니다. ${time}초 후에 창이 저절로 닫힙니다.`}</div>
  );
};

export default VerificationEmail;
