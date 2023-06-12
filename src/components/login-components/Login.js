import "../../css/login-register.css";
import { useState, useRef, useEffect, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { logInSubmission } from "../../connection/requests.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function LogIn() {
  const { setAuth, logInAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    logInAuth(email, pwd);
  };

  return (
    <div className="login-register__container">
      <Toaster position="bottom-center" reverseOrder={false}></Toaster>
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
