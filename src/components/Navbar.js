import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Container, Dropdown, Nav } from "react-bootstrap";
import { BsMoon } from "react-icons/bs";
import { FiSun, FiFileText, FiShoppingBag } from "react-icons/fi";
import Switch from "react-switch";
import {
  navdarkToggleColor,
  navlightToggleColor,
} from "./utils/HelperFunctions";
import {
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineAppstoreAdd,
  AiOutlineCloudSync,
} from "react-icons/ai";
import "../assets/css/navbar.scss";
import { ThemeContext } from "../assets/theme/ThemeContext";
import { clearStore } from "./../redux/actions/main/index";

class NavBar extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      on:
        localStorage.getItem("api") &&
        localStorage.getItem("api").toString() === "true"
          ? true
          : false,
    };
  }

  componentDidMount() {
    this.setState({
      on:
        localStorage.getItem("api") &&
        localStorage.getItem("api").toString() === "true"
          ? true
          : false,
    });
  }

  handleChange = (on) => {
    this.setState({ on: !on });
    localStorage.setItem("api", !on);
    this.props.clearStore();
  };

  render() {
    const { on } = this.state;
    const { className = "" } = this.props;
    const btnClassName = [
      className,
      "toggle-btn",
      on ? "toggle-btn-on" : "toggle-btn-off",
    ]
      .filter(Boolean)
      .join(" ");

    const loginRegLink = (
      <ul className="navbar-nav  ml-auto">
        <li className="nav-item">
          <Link to="/search" className="nav-link">
            Search
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link"></Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Home
          </Link>
        </li>
      </ul>
    );

    const currentTheme = localStorage.getItem("dark");
    const currentApi = this.state.on ? "Prod Api" : "Test Api";
    const userName = localStorage.getItem("username");

    const { themeColor, handleThemeColor } = this.context;

    return (
      <Navbar collapseOnSelect expand="lg" bg="lg" style={{ zIndex: 10 }}>
        <Container style={{ maxWidth: "100%" }}>
          <Navbar.Brand href="/search">
            {/* <img
              src={logo}
              className="logo"
              alt=""
            /> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="space-between-class"
            id="responsive-navbar-nav"
          >
            <Nav className="me-auto">
              <Nav.Link href="/search">
                <div className="search-link">
                  <AiOutlineSearch size={18} />
                  <span>Search</span>
                </div>
              </Nav.Link>
              {userName === "admin" && (
                <Nav.Link href="/firmware">
                  <div className="search-link">
                    <AiOutlineCloudSync size={18} />
                    <span>Firmware Settings</span>
                  </div>
                </Nav.Link>
              )}

              <Nav.Link href="/orders">
                <div className="search-link">
                  <FiShoppingBag size={18} />
                  <span>Orders</span>
                </div>
              </Nav.Link>

              {userName === "admin" && (
                <Nav.Link href="/reports">
                  <div className="search-link">
                    <FiFileText size={18} />
                    <span>Reports</span>
                  </div>
                </Nav.Link>
              )}
            </Nav>

            <Nav className="navbar-actions-div">
              <Dropdown className="navbar-user-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {userName ? userName : "User"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/profile" className="user-title-item">
                    {userName ? userName : "User"}
                  </Dropdown.Item>
                  <Dropdown.Item href="/settings" className="user-icon-item">
                    <div className="user-icon-item-div">
                      <AiOutlineSetting />
                      <span>Account Settings</span>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.ItemText className="user-icon-item">
                    {themeColor === "dark" ? (
                      <div
                        className="user-icon-item-div"
                        id="theme-toggle-btn"
                        onClick={() => handleThemeColor("light")}
                      >
                        <FiSun className="navbar-theme-toggler" />
                        <span>Light Mode</span>
                      </div>
                    ) : (
                      <div
                        className="user-icon-item-div"
                        id="theme-toggle-btn"
                        onClick={() => handleThemeColor("dark")}
                      >
                        <BsMoon className="navbar-theme-toggler" />
                        <span>Dark Mode</span>
                      </div>
                    )}
                  </Dropdown.ItemText>

                  <Dropdown.ItemText>
                    <div className="user-icon-item-div" id="api-switch-div">
                      <AiOutlineAppstoreAdd />

                      <label
                        htmlFor="material-switch"
                        className="navbar-toggler-label"
                      >
                        <span>{currentApi}</span>
                        <Switch
                          checked={this.state.on}
                          onChange={() => this.handleChange(this.state.on)}
                          onColor={
                            themeColor === "dark"
                              ? navdarkToggleColor
                              : navlightToggleColor
                          }
                          onHandleColor="#ffffff"
                          handleDiameter={22}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                          height={18}
                          width={42}
                          className="ml-3 react-switch"
                          id="material-switch"
                        />
                      </label>
                    </div>
                  </Dropdown.ItemText>

                  <Dropdown.Item
                    href="/login"
                    className="user-icon-item"
                    onClick={() => {
                      localStorage.removeItem("tokenKey");
                    }}
                  >
                    <div className="user-icon-item-div">
                      <AiOutlineLogout />
                      <span>Logout</span>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
export default withRouter(NavBar);
