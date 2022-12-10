import React, { useEffect, useState } from "react";
import Notifications, { notify } from "react-notify-toast";
import { Col, Row, Modal, Button, Table, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import {
  clearError,
  getHubsList,
  getAllOrdersData,
} from "../../redux/actions/main/index";
import "../../assets/css/firmwareSettings.scss";

const Orders = (props) => {
  const [orderList, setOrderList] = useState([]);
  const [newOrder, setNewOrder] = useState(false);
  const [targetdVersion, setTargetdVersion] = useState(null);
  const dispatch = useDispatch();
  const store = useSelector((state) => state.main);
  const [orderInfo, setOrderInfo] = useState({
    FirstName: "",
    LastName: "",
    MobileNumber: null,
    AddressOne: "",
    AddressTwo: "",
    City: null,
    State: "",
    ZipCode: null,
  });

  dispatch(clearError());

  useEffect(() => {
    dispatch(getAllOrdersData());
    setOrderList(store.allOrders);
  }, []);

  const viewOrder = (e) => {
    props.history.push({
      pathname: "/order/" + e.ID,
      state: e,
    });
  };

  const filter = (filter) => {
    if (filter === "Filter by") {
      setOrderList(store.allOrders);
    } else
      setOrderList(store.allOrders.filter((order) => order.Status === filter));
  };

  const handleCloseModal = () => {
    setNewOrder(false);
  };

  const onChange = (event) => {
    setOrderInfo({
      ...orderInfo,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (e) => {
    if (
      orderInfo.FirstName &&
      orderInfo.LastName &&
      orderInfo.MobileNumber &&
      orderInfo.AddressOne &&
      orderInfo.City &&
      orderInfo.State &&
      orderInfo.ZipCode
    ) {
      //dispatch();
      notify.show("Saved Changes", "success", 3000);
    } else {
      notify.show("Order details are incomplete!", "error", 3000);
    }
  };

  return (
    <div className="firmware-settings-container">
      <select
        className={
          targetdVersion && targetdVersion !== "Firmware"
            ? "firmware-settings-dropDown-selected"
            : "firmware-settings-dropDown"
        }
        onChange={(e) => filter(e.target.value)}
      >
        <option value={null}>Filter by</option>
        {["Processing", "Shipped", "Complete"].map((filter) => (
          <option value={filter}>{filter}</option>
        ))}
      </select>
      <Button
        id="active-btn"
        variant="primary"
        onClick={() => setNewOrder(true)}
      >
        Create Order
      </Button>
      <Row className="mt-5">
        <Col xs="12">
          <div className="common-main-table" id="orders-table">
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Source</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orderList === null
                  ? "Checking Orders..."
                  : orderList?.map((order, index) => (
                      <tr key={index} onClick={() => viewOrder(order)}>
                        <td>{order.ID}</td>
                        <td>
                          <Moment format="MM/DD/YYYY" date={order.Date} />
                        </td>
                        <td>{order.Name}</td>
                        <td>{order.Source}</td>
                        <td>{order.Type}</td>
                        <td>{order.Status}</td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <Modal
        className="BLEDevices-tab-modal"
        size="lg"
        show={newOrder}
        onHide={() => handleCloseModal()}
      >
        <Notifications options={{ top: "10px" }} />
        <Modal.Header closeButton>
          <Modal.Title>Create Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Row>
              <Col xs="12" sm="6" md="6" lg="4" xl="4">
                <Form.Group
                  controlId="formBasicEmail"
                  className="common-form-group"
                >
                  <Form.Label className="common-form-label">
                    First Name
                  </Form.Label>
                  <Form.Control
                    className="common-form-input"
                    type="text"
                    placeholder="First Name"
                    name="FirstName"
                    value={orderInfo.FirstName}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>
              <Col xs="12" sm="6" md="6" lg="4" xl="4">
                <Form.Group
                  controlId="formBasicEmail"
                  className="common-form-group"
                >
                  <Form.Label className="common-form-label">
                    Last Name
                  </Form.Label>
                  <Form.Control
                    className="common-form-input"
                    type="text"
                    placeholder="Last Name"
                    name="LastName"
                    value={orderInfo.LastName}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6" md="6" lg="4" xl="4">
                <Form.Group
                  controlId="formBasicEmail"
                  className="common-form-group"
                >
                  <Form.Label className="common-form-label">Phone</Form.Label>
                  <Form.Control
                    className="common-form-input"
                    type="text"
                    placeholder="Phone"
                    name="MobileNumber"
                    value={orderInfo.MobileNumber}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6" md="6" lg="6" xl="6">
                <Form.Group
                  controlId="formBasicEmail"
                  className="common-form-group"
                >
                  <Form.Label className="common-form-label">
                    Address One
                  </Form.Label>
                  <Form.Control
                    className="common-form-input"
                    type="text"
                    placeholder="Address One"
                    name="AddressOne"
                    value={orderInfo.AddressOne}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>
              <Col xs="12" sm="6" md="6" lg="6" xl="6">
                <Form.Group
                  controlId="formBasicEmail"
                  className="common-form-group"
                >
                  <Form.Label className="common-form-label">
                    Address Two
                  </Form.Label>
                  <Form.Control
                    className="common-form-input"
                    type="text"
                    placeholder="Address Two"
                    name="AddressTwo"
                    value={orderInfo.AddressTwo}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6" md="6" lg="4" xl="4">
                <Form.Group
                  controlId="formBasicEmail"
                  className="common-form-group"
                >
                  <Form.Label className="common-form-label">City</Form.Label>
                  <Form.Control
                    className="common-form-input"
                    type="text"
                    placeholder="City"
                    name="City"
                    value={orderInfo.City}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>
              <Col xs="12" sm="6" md="6" lg="4" xl="4">
                <Form.Group
                  controlId="formBasicEmail"
                  className="common-form-group"
                >
                  <Form.Label className="common-form-label">State</Form.Label>
                  <Form.Control
                    className="common-form-input"
                    type="text"
                    placeholder="State"
                    name="State"
                    value={orderInfo.State}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>
              <Col xs="12" sm="6" md="6" lg="4" xl="4">
                <Form.Group
                  controlId="formBasicEmail"
                  className="common-form-group"
                >
                  <Form.Label className="common-form-label">ZipCode</Form.Label>
                  <Form.Control
                    className="common-form-input"
                    type="text"
                    placeholder="ZipCode"
                    name="ZipCode"
                    value={orderInfo.ZipCode}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="custom-cancel-btn"
            variant="secondary"
            onClick={() => handleCloseModal()}
          >
            Cancel
          </Button>
          <Button
            id="main-primary-btn"
            variant="primary"
            onClick={() => onSubmit()}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
