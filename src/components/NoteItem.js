import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3 my-3">
      {note.tag && (
        <div className="px-3 py-1 fw-bolder rounded-top position-relative top-0 start-0 bg-warning d-inline-block ">
          {note.tag}
        </div>
      )}
      <div className="card shadow-lg p-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Note deleted successfully", "success");
                }}
              ></i>
              <i
                className="fa-sharp fa-solid fa-pen-to-square mx-2"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
