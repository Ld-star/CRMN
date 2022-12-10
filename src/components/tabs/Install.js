import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Moment from "react-moment";
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";

import "../../assets/css/install.scss";
import {
  getAccountDetailsData,
  deletePairedSensor,
  getSensorInstallStatus,
  setInstallDate,
} from "../../redux/actions/main";

const Install = ({ sensorList, installData, homeID, hub, emailAddress }) => {
  const dispatch = useDispatch();
  const PairedSensorsData = [];
  const NewSensorsData = [];
  const [sensor, setSensor] = useState(false);
  const [time, setTime] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [sensor_Id, setSensorId] = useState();

  const getPairedSensorsData = () => {
    if (sensorList instanceof Array && sensorList.length > 0) {
      sensorList.map((sl) => {
        installData.map((data) => {
          if (sl.Key === data.sensor) {
            sl.AsOfDate = data.asOfDate;
            sl.HasData = data.HasData;
          }
        });
        PairedSensorsData.push(sl);
      });
    }
  };

  useEffect(() => {
    if (sensor && time) {
      const interval = setInterval(() => {
        dispatch(getSensorInstallStatus(homeID, sensor, time));
        setTime(time - 100);

        if (installData.find((x) => x.sensor === sensor).HasData) {
          setTime(false);
          setSensor(false);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  getPairedSensorsData();
  PairedSensorsData.sort(function (a, b) {
    return a.Key - b.Key;
  });

  const startInstall = (row) => {
    const timeStamp = Math.floor(new Date() / 1000);

    setTime(timeStamp);
    setSensor(row.Key);
    dispatch(getSensorInstallStatus(homeID, row.Key, timeStamp));
  };

  const setClass = (row) => {
    if (row.HasData) {
      return "success-btn";
    }
    return row.AsOfDate & time ? "disabled-btn" : "active-btn";
  };

  const setText = (row) => {
    if (row.HasData) {
      return "Success";
    }
    return row.AsOfDate & time ? "Checking..." : "Install";
  };

  const sensorsCol = [
    {
      dataField: "Key",
      text: "Sensor ID",
      sort: true,
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
    },
    {
      dataField: "Value",
      text: "Sensor Type",
    },
    {
      dataField: "AsOfDate",
      text: "Install",
      formatter: (value, row) => (
        <Button
          className={setClass(row)}
          onClick={() => {
            startInstall(row);
          }}
        >
          {setText(row)}
        </Button>
      ),
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
    // {
    //   dataField: "HasData",
    //   text: "Installed",
    //   formatter: (value, row) =>
    //     value ? (
    //       <i className="fas fa-check-circle text-success mx-3" />
    //     ) : (
    //       <i className="fas fa-times-circle text-danger mx-3">?</i>
    //     ),
    // },
  ];

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

  const handleDeleteSensor = () => {
    dispatch(deletePairedSensor(hub, sensor_Id));
    dispatch(getAccountDetailsData(emailAddress, null));
    setConfirmModal(false);
    setSensorId();
  };

  return (
    <Row>
      <Col xs="12">
        <div className="common-table-heading" id="zwave-sensors-borders">
          <h5>Z-wave Sensors</h5>
          <Button
            id={"assign-active-btn"}
            onClick={() => {
              dispatch(setInstallDate(homeID));
            }}
          >
            Finish Install
          </Button>
        </div>
      </Col>
      <Col xs="12">
        <div className="common-main-table" id="zwave-sensors-table">
          <BootstrapTable
            keyField="Key"
            data={PairedSensorsData}
            columns={sensorsCol}
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
            bordered={false}
            headerClasses="tableheader-class"
          />
        </div>
      </Col>
    </Row>
  );
};

export default Install;
