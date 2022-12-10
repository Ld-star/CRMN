import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import Moment from "react-moment";
import "../../assets/css/common.scss";

const ErrorLog = ({ errorLog }) => {
  return (
    <>
      <div className="common-table-section">
        <Row>
          <Col xs="12">
            <div className="common-table-heading" id="common-border">
              <h5>Logs</h5>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <div className="common-main-table" id="logs-tab-table">
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Source</th>
                    <th>Function</th>
                    <th>Error</th>
                  </tr>
                </thead>
                <tbody>
                  {errorLog == null
                    ? "Checking hub logs..."
                    : errorLog.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Moment
                              format="hh:mm A MM/DD/YYYY"
                              date={item.DateString}
                            />
                          </td>
                          <td>{item.Source}</td>
                          <td>{item.Function}</td>
                          <td>{item.Error}</td>
                        </tr>
                      ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ErrorLog;
