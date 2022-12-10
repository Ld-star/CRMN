import React, { Fragment, useState } from "react";
import "../../assets/css/account-details.scss";
import { timeSince } from "../utils/HelperFunctions";
import Moment from "react-moment";
import { Row, Col, Table } from "react-bootstrap";
import { setFirmwareVersion } from "./../../redux/actions/main/index";

const HubTab = ({ handleClick, RebootTimes, checkStatus, hub }) => {
  const [showReboot, setShowReboot] = useState(false);

  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <div className="common-table-heading" id="sensors-tab-heading">
            <h5>Hub Information</h5>
          </div>
        </Col>
        <Col xs="12" sm="12" md="7" lg="7" xl="7">
          <div className="hub-tab-section">
            <Table borderless responsive>
              <tbody>
                <tr>
                  <th>Status</th>
                  <td>
                    {hub.LastActiveTime === null
                      ? ""
                      : checkStatus(hub.LastActiveTime)}
                  </td>
                </tr>

                <tr>
                  <th>Last Active Time </th>
                  <td>
                    {hub.LastActiveTime === null ? (
                      ""
                    ) : (
                      <>
                        <Moment
                          className="textResult"
                          format="hh:mm A MM/DD/YYYY"
                          date={hub.LastActiveTime}
                        />
                        {` ${timeSince(hub.LastActiveTime)} ago`}
                      </>
                    )}
                  </td>
                </tr>

                <tr>
                  <th>Mac Address </th>
                  <td>{`${hub.MacAddress}`.toUpperCase()}</td>
                </tr>

                <tr>
                  <th>IP Addresses </th>
                  <td>{hub.LastIPAddress}</td>
                </tr>

                <tr>
                  <th>Firmware</th>
                  <td>
                    Current {hub.FirmwareVersion} - Target {hub.TargetFirmware}
                  </td>
                </tr>

                <tr>
                  <th>RFZWAVE</th>
                  <td>
                    Current {hub.RfZwaveVersion} - Target {hub.TargetRfVersion}
                  </td>
                </tr>

                <tr>
                  <th>ZWAVECONFIG</th>
                  <td>
                    Current {hub.ZwaveConfigVersion} - Target
                    {hub.TargetZwaveConfigVersion}
                  </td>
                </tr>

                <tr>
                  <th>RFBLE</th>
                  <td>
                    Current {hub.RfBLEVersion} - Target
                    {hub.TargetRfBLEVersion}
                  </td>
                </tr>

                <tr>
                  <th>STOVEFIRMWARE</th>
                  <td>
                    Current {hub.StoveFirmwareVersion} - Target{" "}
                    {hub.TargetStoveFirmwareVersion}
                  </td>
                </tr>

                <tr>
                  <th
                    onClick={() => setShowReboot(!showReboot)}
                    className="add-cursor"
                  >
                    {showReboot ? "▼" : "▶"} Last Reboot{" "}
                  </th>
                  <td>
                    {" "}
                    {RebootTimes[0] === null ? (
                      ""
                    ) : (
                      <>
                        <Moment
                          className="textResult"
                          format="hh:mm A MM/DD/YYYY"
                          date={RebootTimes[0]}
                        />
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      {showReboot ? (
        <Row className="row-margin">
          <Col xs="12" sm="6" md="6" lg="6" xl="6" id="reboot-times-table-col">
            <div className="common-main-table" id="reboot-times-table-div">
              <Table responsive hover bordered>
                <tbody>
                  {RebootTimes instanceof Array && RebootTimes.length > 0 ? (
                    <Fragment>
                      {RebootTimes.map((i, index) => (
                        <tr key={index}>
                          <td>
                            <Moment
                              className="reboot-times-text"
                              format="hh:mm A MM/DD/YYYY"
                              date={i}
                            />
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ) : null}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  );
};

export default HubTab;
