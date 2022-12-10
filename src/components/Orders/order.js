import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { Row, Col, Table, Button } from "react-bootstrap";
import "../../assets/css/order.scss";

const Order = (props) => {
  const [order] = useState(props.location.state);
  const store = useSelector((state) => state.main);

  return (
    <Fragment>
      <div className="header-section">
        <div>
          <Row className="header">
            <h5>Order </h5>
            <h5>Order Date</h5>
            <h5>Status</h5>
            <h5>Amount</h5>
          </Row>
          <Row className="header">
            <h6>{order.ID}</h6>
            <h6>
              <Moment format="MM/DD/YYYY" date={order.Date} />
            </h6>
            <h6>{order.Status}</h6>
            <h6>${order.Amount}</h6>
          </Row>
        </div>
        <Button
          id="custom-cancel-btn"
          variant="secondary"
          //onClick={() => handleCloseModal()}
        >
          Cancel
        </Button>
        <Button
          id="main-primary-btn"
          variant="primary"
          //onClick={() => onSubmit()}
        >
          Mark Shipped
        </Button>
      </div>
      <div className="order-section">
        <Col xs="12" sm="12" md="12" lg="4" xl="4">
          <Table>
            <tbody>
              <tr>
                <th>Order Number</th>
                <td>{order.ID}</td>
              </tr>
              <tr>
                <th>Account Name</th>
                <td>{order.Name}</td>
              </tr>
              <tr>
                <th>Order Type</th>
                <td>{order.Type}</td>
              </tr>
              <tr>
                <th>Billing Email Address</th>
                <td>{order.Email}</td>
              </tr>
              <tr>
                <th>Billing Address</th>
                <td>{order.Billing_Address}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col xs="12" sm="12" md="12" lg="4" xl="4">
          <Table>
            <tbody>
              <tr>
                <th>Status</th>
                <td>{order.Status}</td>
              </tr>
              <tr>
                <th>Order Amount</th>
                <td>${order.Amount}</td>
              </tr>
              <tr>
                <th>Order Source</th>
                <td>{order.Source}</td>
              </tr>
              <tr>
                <th>Billing Phone Number</th>
                <td>{order.Billing_Phone}</td>
              </tr>
              <tr>
                <th>Shipping Name</th>
                <td>{order.Shipping_Name}</td>
              </tr>
              <tr>
                <th>Shipping Address</th>
                <td>{order.Shipping_Address}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <div className="fulfillment-card-body">
          <input type="checkbox" id="title1" />
          <label htmlFor="title1">Fulfillment Details</label>

          <div className="content">
            <p>
              {" "}
              Porcess Date:{" "}
              <Moment format="MM/DD/YYYY" date={order.Process_Date} />
            </p>
            <p>
              {" "}
              Shipped Date:{" "}
              <Moment format="MM/DD/YYYY" date={order.Shipped_Date} />
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Order;
