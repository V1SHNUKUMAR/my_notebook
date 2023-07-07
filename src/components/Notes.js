import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({
    id: "",
    utitle: "",
    udescription: "",
    utag: "",
  });
  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      utitle: currentNote.title,
      udescription: currentNote.description,
      utag: currentNote.tag,
    });
  };

  const handleOnClick = (e) => {
    console.log("updating the note..." + note);
    editNote(note.id, note.utitle, note.udescription, note.utag);
    refClose.current.click();
    props.showAlert("Note updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        type="button"
        className="btn btn-primary"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {" "}
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="utitle"
                    name="utitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.utitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="udescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="udescription"
                    name="udescription"
                    onChange={onChange}
                    value={note.udescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="utag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="utag"
                    name="utag"
                    onChange={onChange}
                    value={note.utag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary fw-bolder"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={
                  note.utitle.length < 5 || note.udescription.length < 5
                }
                type="button"
                className="btn bg-warning fw-bolder"
                onClick={handleOnClick}
              >
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2>Your notes</h2>
        {notes.length === 0 && (
          <div className="d-flex justify-content-center my-5 ">
            No notes to display
          </div>
        )}
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updateNote={updateNote}
              note={note}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
