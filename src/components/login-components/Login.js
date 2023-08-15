import "../../css/login-register.css";
import { React, ReactDOM } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState, useRef, useEffect, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { socialLogIn } from "../../connection/requests";

function LogIn() {
  const { logInAuth, setAuth } = useAuth();

  const userRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    logInAuth(email, pwd);
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      let accessToken = tokenResponse.access_token;
      let socialCredentials = {
        access_token: accessToken,
      };
      toast.promise(socialLogIn(socialCredentials), {
        loading: "Logging In...",
        success: (response) => {
          const accessToken = response.data.access_token;

          setAuth({ accessToken });

          return <b>Successfuly logged in!</b>;
        },
        error: (error) => {
          return (
            <span>
              The next error happened while making loggin :{" "}
              {error?.response?.data?.errors}
            </span>
          );
        },
      });
    },
  });

  return (
    <div className="login-register__container">
      <div className="login-register__body">
        <section className="login-register__section">
          <p
            ref={errorRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Log In</h1>
          <btn className="google-button" onClick={() => login()}>
            Sign in with Google 🚀{" "}
          </btn>
          <form className="login-register__form" onSubmit={handleSubmit}>
            <label className="login-register__label" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label className="login-register__label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button className="login-register__submitbutton">Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <Link className="login-register__link" to="/register">
                Sign Up
              </Link>
            </span>
          </p>
        </section>
      </div>
    </div>
  );
}

export default LogIn;
