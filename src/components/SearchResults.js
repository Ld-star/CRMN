import React, { useEffect } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import "../assets/css/search-results.scss";
import { useDispatch } from "react-redux";
import { clearStore } from "../redux/actions/main";

const Search = (props) => {
  const userAccess = 1;

  const handleNext = (e) => {
    props.history.push({
      pathname: "/hub/" + e.ID,
      state: e,
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearStore());
  });

  return (
    <div className="search-results-section">
      {/* Heading Section */}

      <Row>
        <Col xs="12">
          <div className="search-results-heading">
            <h5>Customers:</h5>
          </div>
        </Col>
      </Row>
      {/* Table Section */}
      <Row>
        <Col xs="12">
          <div className="common-main-table" id="search-results-table">
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Home Id</th>
                  <th>User</th>
                  <th>Resident</th>
                  <th>Mobile Number</th>

                  <th>
                    {props.location.state[0].EmailAddress
                      ? "Email Address"
                      : "Mac Address"}
                  </th>

                  <th>Zip Codes</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.location.state instanceof Array &&
                  props.location.state.length > 0 &&
                  props.location.state.map(function (item, key) {
                    if (userAccess > 0 || item.HomeID < 0)
                      return (
                        <tr key={key}>
                          <td>{item.HomeID}</td>
                          <td>
                            {item.FirstName} {item.LastName}
                          </td>
                          <td>
                            {item.Resident_FirstName} {item.Resident_LastName}
                          </td>

                          <td>{item.MobileNumber}</td>
                          <td>
                            {item.EmailAddress
                              ? item.EmailAddress
                              : item.MacAddress}
                          </td>
                          <td>{item.ZipCode}</td>
                          <td>
                            <Button
                              variant="primary"
                              onClick={() => handleNext(item)}
                              id="main-primary-btn"
                              className="search-result-btn"
                            >
                              show
                            </Button>{" "}
                          </td>
                        </tr>
                      );
                  })}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Search;
