import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../api/users";

function LoginForm() {
  let history = useHistory();
  useEffect(() => {
    localStorage.getItem("USER_KEY");
  }, []);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const req = await loginUser(userName, password);
    const ROLE = req.data.user.role;

    if (req.status === 200) {
      localStorage.setItem("USER_KEY", req.data.token);
      if (ROLE === 1) {
        localStorage.setItem("ROLE", "Admin_Role");
        console.log('vamos a admin',ROLE)
        history.push("/dashboard");
      }
      if (ROLE === 2) {
        localStorage.setItem("ROLE", "Cashier_Role");
        console.log('vamos a cajero',ROLE)
        history.push("/cashier");
      }
      if (ROLE === 3) {
        localStorage.setItem("ROLE", "Storehouse_Role");
        console.log('vamos a almacen',ROLE)
        history.push("/storehouse");
      }
    }
  };

  return (
    <div>
      <div className="login-root">
        <div
          className="box-root flex-flex flex-direction--column"
          style={{ minHeight: "100vh", flexGrow: 1 }}
        >
          <div className="loginbackground box-background--white padding-top--64">
            <div className="loginbackground-gridContainer">
              <div
                className="box-root flex-flex"
                style={{ gridArea: "top / start / 8 / end" }}
              >
                <div
                  className="box-root"
                  style={{
                    backgroundImage:
                      "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                    flexGrow: 1,
                  }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "4 / 2 / auto / 5" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "6 / start / auto / 2" }}
              >
                <div
                  className="box-root box-background--blue800"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "7 / start / auto / 4" }}
              >
                <div
                  className="box-root box-background--blue animationLeftRight"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "8 / 4 / auto / 6" }}
              >
                <div
                  className="box-root box-background--gray100 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "2 / 15 / auto / end" }}
              >
                <div
                  className="box-root box-background--red animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "3 / 14 / auto / end" }}
              >
                <div
                  className="box-root box-background--blue animationRightLeft"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "4 / 17 / auto / 20" }}
              >
                <div
                  className="box-root box-background--gray100 animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "5 / 14 / auto / 17" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                  style={{ flexGrow: 1 }}
                />
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "6 / start / auto / 4" }}
              >
                <div
                  className="box-root box-background--red animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                />
              </div>
              {/* <div className="box-root flex-flex" style={{ gridArea: '8 / 4 / auto / start' }}>
                                <div className="box-root box-background--red animationRightLeft tans4s" style={{ flexGrow: 1 }} />
                            </div> */}
            </div>
          </div>
          <div
            className="box-root padding-top--24 flex-flex flex-direction--column"
            style={{ flexGrow: 1, zIndex: 9 }}
          >
            <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
              <h1>
                <a href="/">MarthaCoffee</a>
              </h1>
            </div>
            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  <span className="padding-bottom--15">
                    Iniciar sesión en su cuenta
                  </span>
                  <div className="field padding-bottom--24">
                    <label htmlFor="text">Usuario</label>
                    <input
                      type="text"
                      name="user"
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="field padding-bottom--24">
                    <div className="grid--50-50">
                      <label htmlFor="password">Contraseña</label>
                      {/* <div className="reset-pass">
                                                    <a href="#">Olvidaste tu Contraseña?</a>
                                                </div> */}
                    </div>
                    <input
                      type="password"
                      name="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                    <label htmlFor="checkbox">
                      <input type="checkbox" name="checkbox" disabled />{" "}
                      Recuérdame
                    </label>
                  </div>
                  <div className="field padding-bottom--24">
                    <input
                      className="button"
                      type="submit"
                      name="submit"
                      onClick={() => handleLogin()}
                    />
                  </div>
                </div>
              </div>
              <div className="footer-link padding-top--24">
                <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                  <span>
                    <a href="/">© Brand New Technology</a>
                  </span>
                  <span>
                    <a href="/">Contact</a>
                  </span>
                  <span>
                    <a href="/">Privacy &amp; terms</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
