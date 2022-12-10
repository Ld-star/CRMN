import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowBackSharp } from "react-icons/io5";
import { getAccountDetailsData } from "../redux/actions/main/index";
import Notifications, { notify } from "react-notify-toast";
import { lightIconColor } from "./utils/HelperFunctions";
import { updateCustomer } from "../redux/actions/main/index";
import "../assets/css/profile.scss";

const EditProfile = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.main);

  const [userInfo, setUserInfo] = useState({
    FirstName: "",
    LastName: "",
    MobileNumber: null,
    AddressOne: "",
    AddressTwo: "",
    City: null,
    State: "",
    ZipCode: null,
  });

  // useEffect(() => {
  //   if (store && store.hub) {
  //     dispatch(getAccountDetailsData(store.hub.EmailAddress));
  //   }
  // }, []);

  useEffect(() => {
    if (store.user) {
      const data = store.user;
      setUserInfo({
        FirstName: data.FirstName,
        LastName: data.LastName,
        MobileNumber: data.MobileNumber,
        EmailAddress: data.EmailAddress,
        // CodeRedeemedDate: data.CodeRedeemedDate,
        // RegCode: data.RegCode,
        AddressOne: data.AddressOne,
        AddressTwo: data.AddressTwo,
        City: data.City,
        State: data.State,
        ZipCode: data.ZipCode,
      });
    }
  }, []);

  const onChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (userInfo.FirstName && userInfo.LastName) {
      dispatch(updateCustomer(userInfo));
      notify.show("Saved Changes", "success", 3000);
      props.history.push({
        pathname: "/profile",
      });
    } else {
      notify.show("User details are incomplete!", "error", 3000);
    }
  };

  return (
    <div className="profile-page-section">
      <Notifications options={{ top: "10px" }} />
      <Row className="justify-content-center row-margin">
        <Col xs="12" sm="12" md="8" lg="8" xl="8">
          <div className="card-main">
            <div className="card-main-header">
              <IoArrowBackSharp
                onClick={() => props.history.goBack()}
                size={22}
                color={lightIconColor}
                id="edit-profile-icon"
              />
              <span id="edit-profile-span">Account Details</span>
            </div>
            <div className="card-main-body">
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
                        value={userInfo.FirstName}
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
                        value={userInfo.LastName}
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
                      <Form.Label className="common-form-label">
                        Phone
                      </Form.Label>
                      <Form.Control
                        className="common-form-input"
                        type="text"
                        placeholder="Phone"
                        name="MobileNumber"
                        value={userInfo.MobileNumber}
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
                        value={userInfo.AddressOne}
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
                        value={userInfo.AddressTwo}
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
                      <Form.Label className="common-form-label">
                        City
                      </Form.Label>
                      <Form.Control
                        className="common-form-input"
                        type="text"
                        placeholder="City"
                        name="City"
                        value={userInfo.City}
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
                        State
                      </Form.Label>
                      <Form.Control
                        className="common-form-input"
                        type="text"
                        placeholder="State"
                        name="State"
                        value={userInfo.State}
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
                        ZipCode
                      </Form.Label>
                      <Form.Control
                        className="common-form-input"
                        type="text"
                        placeholder="ZipCode"
                        name="ZipCode"
                        value={userInfo.ZipCode}
                        onChange={onChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <div className="card-main-footer-btns">
                      <Button
                        id="custom-cancel-btn"
                        variant="secondary"
                        onClick={() =>
                          props.history.push({
                            pathname: "/profile",
                            state: store,
                          })
                        }
                      >
                        Cancel
                      </Button>
                      <Button id="custom-select-btn " type="submit">
                        Save
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EditProfile;
