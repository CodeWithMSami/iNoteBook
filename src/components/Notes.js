import React, { useContext, useState, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItems from "./NoteItems";

export default function Notes(props) {
  const { notes, updateNotes, fetch_notes } = useContext(noteContext);
  useEffect(() => {
    fetch_notes();
  }, []);
  const ref = useRef(null);
  const refclose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updatenote = (e) => {
    ref.current.click();
    setNote({
      id: e._id,
      etitle: e.title,
      edescription: e.description,
      etag: e.tag,
    });
  };
  const handelclick = (e) => {
    updateNotes(note.id, note.etitle, note.edescription, note.etag);
    refclose.current.click();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#updateModal"
        ref={ref}
      >
        Launch Update Modal
      </button>
      <div className="modal" id="updateModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Note</h5>
            </div>
            <form>
              <div className="modal-body text-start">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    onChange={onChange}
                    minLength={3}
                    value={note.etitle}
                    name="etitle"
                    className="form-control"
                    id="etitle"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    onChange={onChange}
                    minLength={3}
                    value={note.edescription}
                    name="edescription"
                    className="form-control"
                    id="edescription"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag&#40;optional&#41;
                  </label>
                  <input
                    type="text"
                    onChange={onChange}
                    value={note.etag}
                    name="etag"
                    className="form-control"
                    id="etag"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  ref={refclose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={handelclick}
                  type="button"
                  className="btn btn-primary"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container text-center my-3">
        <h1 className="my-3">Notes</h1>
        <div className="container ">
          {notes.length === 0 &&
            "You did not have notes.Please add notes procede."}
        </div>
        <div className="row row-gap-4 justify-content-evenly">
          {notes.map((e) => {
            return <NoteItems key={e._id} updateNote={updatenote} note={e} />;
          })}
        </div>
      </div>
    </>
  );
}
