import React, { Component } from "react";
import ParticlesBackground from "../assets/particles/ParticlesBackground";
import Notifications, { notify } from "react-notify-toast";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import auth from "../services/authService";
import logo from "../assets/img/logo.svg";
import { BiHide, BiShow } from "react-icons/bi";
import "../assets/css/loginScreen.scss";

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      user: { username: "", password: "" },
      errors: {},
      passwordShown: false,
    };
  }

  onChange = (event) => {
    const newValue = { [event.target.name]: event.target.value };

    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        ...newValue,
      },
    }));
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { user } = this.state;

    if (user.username.length === 0 || user.password.length === 0) {
      notify.show("Insufficient Credentials", "custom", 5000, {
        background: "#e73e46",
        text: "#FFFFFF",
      });
      return;
    }

    $.LoadingOverlay("show", {
      imageColor: "#13477D",
      size: "30",
    });

    try {
      await auth.authenticate(user).then((resp) => {
        if (resp.ok) {
          //window.location = "/search";
          this.props.history.push({
            pathname: "/search",
            state: sessionStorage.getItem("user"),
          });
        } else {
          notify.show(
            `Authentication Unsuccessful  ${resp.status}`,
            "custom",
            5000,
            {
              background: "#e73e46",
              text: "#FFFFFF",
            }
          );
        }
      });
    } catch (e) {
      notify.show("Error Authenticating", "custom", 5000, {
        background: "#e73e46",
        text: "#FFFFFF",
      });
    } finally {
      this.setState(user);
      $.LoadingOverlay("hide");
    }
  };

  render() {
    if (auth.BasicAuth()) return <Redirect to="/search" />;
    return (
      <div>
        <ParticlesBackground />
        <div className="login-area">
          <div
            className="container shadow component rounded col-sm-10 col-md-6 col-lg-3 p-5 my-5"
            id="login-bg-color"
          >
            <Notifications />
            <div className="row">
              <div className="col-md-12 mx-auto">
                <div className="logo-sec2 my-4">
                  <img
                    id="login-screen-img"
                    src={logo}
                    className="logo2"
                    alt=""
                  />
                </div>

                <form noValidate onSubmit={this.onSubmit}>
                  <h1 className="h3 mb-3 font-weight-normal h1 text-center ">
                    SIGN IN
                  </h1>
                  <div className="form-group row center-align">
                    <label htmlFor="username" />
                    <input
                      autoComplete="on"
                      type="username"
                      className="form-control  form-styling col-7 input-lg"
                      name="username"
                      placeholder="Enter username"
                      value={this.state.user.username}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group row center-align">
                    <label htmlFor="password" />
                    <input
                      autoComplete="on"
                      type={this.state.passwordShown ? "text" : "password"}
                      className="form-control form-styling col-7 input-lg"
                      name="password"
                      placeholder="Password"
                      value={this.state.user.password}
                      onChange={this.onChange}
                    />
                    <div className="show-password-div center-align">
                      {this.state.passwordShown ? (
                        <BiHide
                          onClick={() =>
                            this.setState({
                              passwordShown: !this.state.passwordShown,
                            })
                          }
                        />
                      ) : (
                        <BiShow
                          onClick={() =>
                            this.setState({
                              passwordShown: !this.state.passwordShown,
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                  <div className="center-align mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-animate col-md-5 col-sm-5"
                      id="main-primary-btn"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
