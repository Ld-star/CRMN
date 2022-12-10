import "../assets/css/customer-search.scss";
import SearchParticles from "../assets/particles/SearchParticles";
import { userSearch } from "../services/userService";
import React, { Component } from "react";
import Notifications, { notify } from "react-notify-toast";
import logo from "../assets/img/logo.svg";
import LoadingOverlay from "gasparesganga-jquery-loading-overlay";
import $ from "jquery";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWord: "",
      showPlaceholder: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    $.LoadingOverlay("show", {
      imageColor: "#13477D",
      size: "30",
    });

    userSearch(this.state.keyWord)
      .then((results) => {
        $.LoadingOverlay("hide");
        if (results[0]) {
          this.props.history.push({
            pathname: "/searchResults",
            state: results,
          });
        } else {
          notify.show("No record found  ! ", "custom", 5000, {
            background: "#13477D",
            text: "#FFFFFF",
          });
        }
      })
      .catch((e) => {
        notify.show(e.message);
        $.LoadingOverlay("hide");
      });
  };

  render() {
    return (
      <div>
        <SearchParticles />
        <Notifications />
        <div className="SearchBackground"></div>

        <div className="main-area">
          <img className="SearchLogo" src={logo} />

          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group has-search">
              <input
                type="text"
                id="input-area"
                className="form-control"
                placeholder={"Search by Last Name, Email or Mac Address"}
                name="keyWord"
                value={this.state.keyWord}
                onChange={this.onChange}
              />
            </div>
            {/* <div className="search-page-button">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-animate col-md-5 col-sm-5"
                      id="main-primary-btn"
                    >
                      Search
                    </button>
                  </div> */}
          </form>
          <form noValidate onSubmit={this.onCreate}></form>
        </div>
      </div>
    );
  }
}

export default Profile;
