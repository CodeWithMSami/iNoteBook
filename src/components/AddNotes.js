import React,{useContext,useState} from "react";
import noteContext from "../context/notes/noteContext";


const AddNotes = () => {
  
    const context = useContext(noteContext)
    const {addNotes} = context;
    const [note, setNote] = useState({title:'',description:'',tag:''})
    
    const addNote = async (element)=>{
      element.preventDefault();
      addNotes(note.title,note.description,note.tag);
      setNote({title:'',description:'',tag:''});
    }
  const onChange = (e) => {
    setNote({...note,[e.target.name]:e.target.value})
  }
  
  return (
    <>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3" onSubmit={addNote}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" onChange={onChange} minLength={3} value={note.title} name="title" className="form-control" id="title" />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input type="text" onChange={onChange} minLength={3} value={note.description} name="description" className="form-control" id="description" />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag&#40;optional&#41;
            </label>
            <input type="text" onChange={onChange} value={note.tag} name="tag" className="form-control" id="tag" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNotes;
