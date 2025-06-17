import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function NoteItems(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { updateNote, note } = props;
  
  const delicon = (e) => {
    e.preventDefault();
    deleteNote(note._id);
  };
  

  return (
    <>
      
      <div className="card col-md-3" style={{ width: "22rem" }}>
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-between">
            {note.title}
            <div className="d-flex ">
              <i
                onClick={() => {
                  updateNote(note)
                }
                }
                className="fa-solid fa-file-pen mx-3"
              ></i>
              <i onClick={delicon} className="fa-solid fa-trash-can"></i>
            </div>
          </h5>
          <p className="card-text text-start">{note.description}</p>
        </div>
      </div>
    </>
  );
}
