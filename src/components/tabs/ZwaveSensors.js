import React, { Fragment, useState, useRef } from "react";
import { Col, Row, Table, Modal, Button } from "react-bootstrap";
import Moment from "react-moment";
import BootstrapTable from "react-bootstrap-table-next";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deletePairedSensor,
  getAccountDetailsData,
} from "../../redux/actions/main";
import { AiOutlineRight } from "react-icons/ai";

const ZwaveSensors = ({
  handleClick,
  SensorData,
  newSensors,
  pairedSensors,
  hub,
  emailAddress,
  getMoreDate,
}) => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [sensor_Id, setSensorId] = useState();
  const [fetchDate, setFetchDate] = useState();

  const dispatch = useDispatch();

  const PairedSensorsData = [];
  const NewSensorsData = [];

  const prevScrollY = useRef(0);
  const [goingUp, setGoingUp] = useState(false);

  const listInnerRef = useRef();
  //const myRef = useRef(null);

  // const executeScroll = () => listInnerRef.current.scrollIntoView();
  // run this function from an event handler or an effect to execute scroll

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight * 1.5 >= scrollHeight) {
        //getMoreDate(fetchDate);
        //listInnerRef.current.scrollTo(0, clientHeight / 2);
      }
    }
  };

  const getPairedSensorsData = () => {
    if (pairedSensors instanceof Array && pairedSensors.length > 0) {
      pairedSensors.map((ps) => {
        SensorData.map((data) => {
          if (ps.Key === data.SensorID) {
            ps.BatteryPct = data.BatteryPct;
            ps.Events = data.Events;
            ps.LastActiveTime = data.LastActiveTime;
            ps.LastStatus = data.LastStatus;
            ps.SensorID = data.SensorID;
          }
        });
        PairedSensorsData.push(ps);
      });
    }
  };

  const getNewSensorsData = () => {
    if (newSensors instanceof Array && newSensors.length > 0) {
      newSensors.map((ns) => {
        NewSensorsData.push(ns);

        SensorData.map((data) => {
          if (ns.Key === data.SensorID) {
            ns.BatteryPct = data.BatteryPct;
            ns.Events = data.Events;
            ns.LastActiveTime = data.LastActiveTime;
            ns.LastStatus = data.LastStatus;
            ns.SensorID = data.SensorID;
          }
        });
      });
    }
  };

  getPairedSensorsData();
  getNewSensorsData();

  const unPairedSensorsCol = [
    {
      dataField: "Key",
      text: "Sensor ID",
      sort: true,
    },
    {
      dataField: "LastStatus",
      text: "Last Status",
      formatter: (value, row) =>
        value === "ONLINE" ? (
          <i className="fas fa-check-circle text-success mx-3"></i>
        ) : (
          <i className="fas fa-times-circle text-danger mx-3"></i>
        ),
    },
    {
      dataField: "BatteryPct",
      text: "Battery Pct",
      formatter: (value, row) => (value ? <>{value}%</> : null),
    },
    {
      dataField: "LastActiveTime",
      text: "Last Active Time",
      formatter: (value, row) => (
        <Moment format="hh:mm A MM/DD/YYYY" date={value} />
      ),
      sort: true,
      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return new Date(b) - new Date(a);
        }
        return new Date(a) - new Date(b);
      },
    },
    {
      dataField: "Value",
      text: "Sensor Type",
    },
    {
      dataField: "Unpair",
      text: "Unpair",
    },
  ];

  const unPairedSensorsExpandRow = {
    renderer: (row) => {
      return (
        <></>
        // <div className="common-main-table" id="sensor-list-tab-table">
        //   <Table responsive hover>
        //     <thead>
        //       <tr>
        //         <th>State</th>
        //         <th>Date</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {row.Events instanceof Array && row.Events.length > 0 ? (
        //         <Fragment>
        //           {row.Events.map((event) => (
        //             <tr>
        //               <td>{event.State === 0 ? <p>0</p> : <p>1</p>}</td>
        //               <td>
        //                 <Moment format="hh:mm A MM/DD/YYYY" date={event.Date} />
        //               </td>
        //             </tr>
        //           ))}
        //         </Fragment>
        //       ) : null}
        //     </tbody>
        //   </Table>
        // </div>
      );
    },
    showExpandColumn: true,
    expandByColumnOnly: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      return (
        <AiOutlineRight
          className={`keg-status-setting-icon ${isAnyExpands && "active"}`}
        />
      );
    },

    expandColumnRenderer: ({ expanded }) => {
      return (
        <AiOutlineRight
          className={`keg-status-setting-icon ${expanded && "active"}`}
        />
      );
    },
  };

  const getIcon = (value) => {
    if (value === "ONLINE")
      return <i className="fas fa-check-circle text-success mx-3"></i>;
    if (value === "OFFLINE")
      return <i className="fas fa-times-circle mx-3"></i>;
    if (value === null) return <i></i>;
  };

  const pairedSensorsCol = [
    {
      dataField: "Key",
      text: "Sensor ID",
      sort: true,
    },
    {
      dataField: "LastStatus",
      text: "Last Status",
      formatter: (value, row) => getIcon(value),
      // value === "ONLINE" ? (
      //   <i className="fas fa-check-circle text-success mx-3"></i>
      // ) : (
      //   <i className="fas fa-times-circle text-danger mx-3"></i>
      // ),
    },
    {
      dataField: "BatteryPct",
      text: "Battery Pct",
      formatter: (value, row) => (value ? <>{value}%</> : null),
    },
    {
      dataField: "LastActiveTime",
      text: "Last Active Time",
      formatter: (value, row) => (
        <Moment format="hh:mm A MM/DD/YYYY" date={value} />
      ),
      sort: true,
      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return new Date(b) - new Date(a);
        }
        return new Date(a) - new Date(b);
      },
    },
    {
      dataField: "Value",
      text: "Sensor Type",
    },
    {
      dataField: "Unpair",
      text: "Unpair",
      formatter: (value, row) => (
        <MdDelete
          size={22}
          className="add-cursor"
          onClick={() => {
            setConfirmModal(true);
            setSensorId(row.SensorID);
          }}
        />
      ),
    },
  ];

  const pairedSensorExpandRow = {
    renderer: (row) => {
      setFetchDate(row.Events[row.Events.length - 1]?.Date ?? null);

      return (
        <div
          //onScroll={onScroll}
          ref={listInnerRef}
          className="common-main-table"
          id="sensor-list-tab-table"
        >
          <Table>
            <thead>
              <tr>
                <th>State</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {row.Events instanceof Array && row.Events.length > 0 ? (
                <Fragment>
                  {row.Events.map((event) => (
                    <tr>
                      <td>{event.State}</td>
                      <td>
                        <Moment format="hh:mm A MM/DD/YYYY" date={event.Date} />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ) : null}
            </tbody>
          </Table>
        </div>
      );
    },
    showExpandColumn: true,
    expandByColumnOnly: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      return (
        <AiOutlineRight
          className={`keg-status-setting-icon ${isAnyExpands && "active"}`}
        />
      );
    },
    expandColumnRenderer: ({ expanded }) => {
      return (
        <AiOutlineRight
          className={`keg-status-setting-icon ${expanded && "active"}`}
        />
      );
    },
  };

  PairedSensorsData.sort(function (a, b) {
    return a.SensorID - b.SensorID;
  });
  NewSensorsData.sort(function (a, b) {
    return a.SensorID - b.SensorID;
  });

  const handleDeleteSensor = () => {
    dispatch(deletePairedSensor(hub, sensor_Id));
    dispatch(getAccountDetailsData(emailAddress, null));
    setConfirmModal(false);
    setSensorId();
  };

  return (
    <Row className="zwave-tab">
      {/* PairedSensorsData */}
      <Col xs="12">
        <div className="common-table-heading" id="zwave-sensors-borders">
          <h5>Paired Sensors</h5>
        </div>
      </Col>
      <Col xs="12">
        <div className="common-main-table" id="zwave-sensors-table">
          <BootstrapTable
            keyField="Key"
            data={PairedSensorsData}
            columns={pairedSensorsCol}
            expandRow={pairedSensorExpandRow}
            bordered={false}
          />
        </div>
      </Col>

      {/* Unpaired Sensors */}
      <Col xs="12">
        <div className="common-table-heading" id="zwave-sensors-borders">
          <h5>Unpaired Sensors</h5>
        </div>
      </Col>
      <Col xs="12">
        <div className="common-main-table" id="zwave-sensors-table">
          <BootstrapTable
            keyField="Key"
            data={NewSensorsData}
            columns={unPairedSensorsCol}
            expandRow={unPairedSensorsExpandRow}
            bordered={false}
            headerClasses="tableheader-class"
          />
        </div>
      </Col>

      <Modal
        className="BLEDevices-tab-modal"
        show={confirmModal}
        onHide={() => {
          setConfirmModal(false);
          setSensorId();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Sensor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Are you sure you want to delete this sensor?</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="custom-cancel-btn"
            variant="secondary"
            onClick={() => {
              setConfirmModal(false);
              setSensorId();
            }}
          >
            No
          </Button>
          <Button
            variant="primary"
            id="main-primary-btn"
            onClick={() => handleDeleteSensor()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default ZwaveSensors;
