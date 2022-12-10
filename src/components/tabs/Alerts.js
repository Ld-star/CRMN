import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AiOutlineSetting } from "react-icons/ai";
import Switch from "react-switch";
import { lightIconColor, switchOptions } from "../utils/HelperFunctions";

import "../../assets/css/Alerts.scss";

const Alerts = (props, alerts) => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="12">
          <div className="common-card-main" id="settings-card">
            <div className="common-card-header">
              <AiOutlineSetting size={20} color={lightIconColor} />
              <span>Alerts Preferences</span>
            </div>
            <div className="common-card-body">
              <div className="all-settings-div">
                {props.alerts?.Preferences.map((alert) => (
                  <div className="setting-item">
                    <div className="setting-item-title">
                      <p>{alert.AlertName}</p>
                      <span>{alert.InfoText}</span>
                    </div>
                    <div className="setting-item-toggle">
                      <Button
                        id={
                          alert.PhoneFl && alert.ActiveFlag
                            ? "custom-alert-btn-active"
                            : "custom-alert-btn-off"
                        }
                      >
                        Phone
                      </Button>
                      <Button
                        id={
                          alert.PushFl && alert.ActiveFlag
                            ? "custom-alert-btn-active"
                            : "custom-alert-btn-off"
                        }
                      >
                        Push
                      </Button>
                      <Button
                        id={
                          alert.SmsFl && alert.ActiveFlag
                            ? "custom-alert-btn-active"
                            : "custom-alert-btn-off"
                        }
                      >
                        Text
                      </Button>
                      {/* <Switch
                        checked={alert.ActiveFlag}
                        onChange={() => setToggle1(!toggle1)}
                        onColor={switchColor}
                        {...switchOptions}
                      /> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Alerts;
