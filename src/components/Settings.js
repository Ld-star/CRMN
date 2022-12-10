import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineSetting } from "react-icons/ai";
import Switch from "react-switch";
import { lightIconColor, switchOptions } from "./utils/HelperFunctions";
import { ThemeContext } from "../assets/theme/ThemeContext";
import { IoArrowBackSharp } from "react-icons/io5";
import "../assets/css/settings.scss";

const Settings = (props) => {
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [toggle3, setToggle3] = useState(true);
  const [toggle4, setToggle4] = useState(true);
  const [toggle5, setToggle5] = useState(true);

  const { themeColor } = useContext(ThemeContext);
  const [switchColor, setSwitchColor] = useState();

  useEffect(() => {
    setSwitchColor(themeColor === "dark" ? "#27bb86" : "#61dafb");
  }, [themeColor]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="12" sm="12" md="7" lg="7" xl="7">
          <div className="common-card-main" id="settings-card">
            <div className="common-card-header">
              <IoArrowBackSharp
                size={21}
                color={lightIconColor}
                className="back-icon"
                onClick={() => props.history.goBack()}
              />

              <AiOutlineSetting size={20} color={lightIconColor} />
              <span>Settings</span>
            </div>
            <div className="common-card-body">
              <div className="all-settings-div">
                <div className="setting-item">
                  <div className="setting-item-title">
                    <p>Security</p>
                    <span>
                      Safe Browsing (protection from dangerous sites) and other
                      security settings
                    </span>
                  </div>
                  <div className="setting-item-toggle">
                    <Switch
                      checked={toggle1}
                      onChange={() => setToggle1(!toggle1)}
                      onColor={switchColor}
                      {...switchOptions}
                    />
                  </div>
                </div>
                <div className="setting-item">
                  <div className="setting-item-title">
                    <p>Show Home button</p>
                    <span>Disabled</span>
                  </div>
                  <div className="setting-item-toggle">
                    <Switch
                      checked={toggle2}
                      onColor={switchColor}
                      onChange={() => setToggle2(!toggle2)}
                      {...switchOptions}
                    />
                  </div>
                </div>
                <div className="setting-item">
                  <div className="setting-item-title">
                    <p>Manage your Notifications</p>
                    <span>Open</span>
                  </div>
                  <div className="setting-item-toggle">
                    <Switch
                      checked={toggle3}
                      onColor={switchColor}
                      onChange={() => setToggle3(!toggle3)}
                      {...switchOptions}
                    />
                  </div>
                </div>
                <div className="setting-item">
                  <div className="setting-item-title">
                    <p>Theme</p>
                    <span>Open Chrome Web Store</span>
                  </div>
                  <div className="setting-item-toggle">
                    <Switch
                      checked={toggle4}
                      onColor={switchColor}
                      onChange={() => setToggle4(!toggle4)}
                      {...switchOptions}
                    />
                  </div>
                </div>
                <div className="setting-item">
                  <div className="setting-item-title">
                    <p>Other</p>
                  </div>
                  <div className="setting-item-toggle">
                    <Switch
                      checked={toggle5}
                      onColor={switchColor}
                      onChange={() => setToggle5(!toggle5)}
                      {...switchOptions}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
