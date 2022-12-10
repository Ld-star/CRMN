import React, { Fragment, useState, useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { AiOutlineSend } from "react-icons/ai";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/notes.scss";
import { addNewNote } from "../../redux/actions/main";
import store from "../../Data/UserData.json";

const Notes = ({ notify, homeID, user }) => {
  const [addNote, setAddNote] = useState("");
  const [scroll, setScroll] = useState(true);
  const dispatch = useDispatch();
  //const store = useSelector((state) => state.main);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (scroll) {
      try {
        messagesEndRef.current.scrollIntoView({ behavior: "auto" });
      } catch (e) {}
    }
  };

  useEffect(() => scrollToBottom, [store.allNotes]);

  const handleAddNote = () => {
    if (addNote) {
      const textInput = addNote.trim();
      if (textInput.length > 0) {
        dispatch(addNewNote(addNote, homeID, user));
        setAddNote("");
        try {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        } catch (e) {}

        setScroll(true);
        //notify.show("Note is added successfully", "success", 3000);
      } else {
        notify.show("Empty note", "error", 3000);
      }
    } else {
      notify.show("Empty note", "error", 3000);
    }
  };

  return (
    <Fragment>
      <Row className="justify-content-center">
        <Col xs="12">
          <div className="common-table-heading" id="sensors-tab-heading">
            <h5>Notes</h5>
          </div>
        </Col>
        <Col xs="12" sm="12" md="10" lg="10" xl="10">
          <div className="notes-tab-section">
            <div className="show-all-notes" onScroll={() => setScroll(false)}>
              {store &&
                store.allNotes instanceof Array &&
                store.allNotes.length > 0 && (
                  <Fragment>
                    <div>
                      {store.allNotes.map((note, index) => {
                        return (
                          <div className="note-item" key={index}>
                            <div className="note-item-user">{note.User}</div>
                            <div className="note-item-content">
                              <span>{note.Note}</span>
                              <span className="note-item-time">
                                <Moment
                                  format="MM/DD/YYYY hh:mm A"
                                  date={note.Date}
                                />
                              </span>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </Fragment>
                )}
            </div>
            <div className="add-note-heading">
              <Form.Control
                as="textarea"
                placeholder="Add Note"
                value={addNote}
                onChange={(e) => setAddNote(e.target.value)}
              />
              <Button
                variant="primary"
                id="main-primary-btn"
                onClick={() => handleAddNote()}
              >
                <div className="add-note-icon">
                  <AiOutlineSend />
                </div>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Notes;
