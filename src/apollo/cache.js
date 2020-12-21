import { makeVar } from "@apollo/client";

export const isLoggedIn = makeVar(Boolean(localStorage.getItem) || false);

export const logIn = (token) => {
  localStorage.setItem("token", token);
  isLoggedIn(true);
};

export const logOut = () => {
  localStorage.removeItem("token");
  isLoggedIn(false);
  window.location.reload();
};
