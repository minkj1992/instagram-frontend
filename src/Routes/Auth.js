import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { logIn } from "../apollo/cache";

const animation = keyframes`
  0%, 10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
            transform: perspective(140px) rotateX(-180deg);
    opacity: 0; 
  } 25%, 75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
            transform: perspective(140px) rotateX(0deg);
    opacity: 1; 
  } 90%, 100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
            transform: perspective(140px) rotateY(180deg);
    opacity: 0; 
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 60px);
  & span {
    margin-top: 10px;
  }
`;

const Box = styled.div`
  position: relative;
  margin: 20px auto;
  width: 45px;
  height: 45px;
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
  & .sk-cube {
    float: left;
    width: 50%;
    height: 50%;
    position: relative;
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
  & .sk-cube:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.black};
    -webkit-animation: ${animation} 2.4s infinite linear both;
    animation: ${animation} 2.4s infinite linear both;
    -webkit-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
  }
  & .sk-cube2 {
    -webkit-transform: scale(1.1) rotateZ(90deg);
    transform: scale(1.1) rotateZ(90deg);
  }
  & .sk-cube3 {
    -webkit-transform: scale(1.1) rotateZ(180deg);
    transform: scale(1.1) rotateZ(180deg);
  }
  & .sk-cube4 {
    -webkit-transform: scale(1.1) rotateZ(270deg);
    transform: scale(1.1) rotateZ(270deg);
  }
  & .sk-cube2:before {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  & .sk-cube3:before {
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
  & .sk-cube4:before {
    -webkit-animation-delay: 0.9s;
    animation-delay: 0.9s;
  }
`;

const Auth = () => {
  const { search } = useLocation();
  const code = search.split("?code=")[1];

  useEffect(() => {
    async function getToken() {
      const { token } = await fetch(
        process.env.NODE_ENV === "production"
          ? `${process.env.REACT_APP_PROD_API_URL}/auth/github?code=${code}`
          : `${process.env.REACT_APP_DEV_API_URL}/auth/github?code=${code}`,
        {
          method: "POST",
        }
      ).then((res) => res.json());
      logIn(token);
    }
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Box>
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </Box>
      <span>로그인 중 입니다.</span>
    </Container>
  );
};

export default Auth;
