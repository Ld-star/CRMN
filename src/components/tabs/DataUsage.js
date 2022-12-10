import React from "react";
import DataUsageGraph from "../utils/DataUsageGraph";
import { formatSizeUnits } from "../utils/HelperFunctions";
import Moment from "react-moment";
import { Row, Col, Table } from "react-bootstrap";

const DataUsageTab = ({ dataUsage, themeColor, sim }) => {
  return (
    <div className="data-usage-tab-section">
      <Row>
        <Col xs="12">
          <div className="common-table-heading" id="data-usage-title">
            <h5>Data Usage</h5>
          </div>
        </Col>
        <Col xs="12" className="data-usage-graph">
          {dataUsage instanceof Array && dataUsage.length > 0 ? (
            <DataUsageGraph data={dataUsage} themeColor={themeColor} />
          ) : sim ? (
            "Checking Data Usage..."
          ) : (
            "There is no sim Assigned to this hub"
          )}
        </Col>

        <Col xs="12">
          <div className="common-main-table" id="data-usage-table">
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Transmitted</th>
                  <th>Received</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {dataUsage === undefined
                  ? "Updating Data Usage..."
                  : dataUsage.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Moment
                            format="hh:mm A MM/DD/YYYY"
                            date={item?.period?.start_time}
                          />
                        </td>
                        <td>{formatSizeUnits(item?.data_upload)}</td>
                        <td>{formatSizeUnits(item?.data_download)}</td>
                        <td>
                          {formatSizeUnits(
                            item?.data_download + item?.data_upload
                          )}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DataUsageTab;
