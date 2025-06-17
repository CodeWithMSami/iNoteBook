import React, { useState, useEffect } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const [notes, setnotes] = useState([]);
  const authtoken = localStorage.getItem('inotebook_tocken')
  
  // fetch all notes**********************************************************************************
  useEffect(async () => {
    const fetch_notes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/auth/notes/fetchalluser",
          {
            method: "GET",
            headers: {
              "Auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0NmIyNWI1YWM1NjUzOTc1ODVlNzEzIn0sImlhdCI6MTc0OTQ2NjI0NH0.SIbFnKB_tibpyzrXUpri7kG3AskjIJVUGGLs3qQpSsw",
            },
          }
        );
        const data = await response.json();
        setnotes(data);
      } catch {
        // alert('Notes not found!')
      }
      
    };

    fetch_notes();
  }, []);
  // Get all notes***********************************************************************
  const fetch_notes = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/auth/notes/fetchalluser",
        {
          method: "GET",
          headers: {
            "Auth-token":authtoken
          },
        }
      );
      const data = await response.json();
      setnotes(data);
    } catch {
      // alert('Notes not found!')
    }

  }
  // Add a note**************************************************************************
    const addNotes =async (title,description,tag)=>{
      try {
        const request_add = await fetch('http://localhost:5000/auth/notes/addnote',{
            method: "POST",
            headers: {
              "Auth-token":authtoken,
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
              title: title,
              description: description,
              tag: tag
            })
        })
        const data = await request_add.json();
        const new_data = notes.concat(data)
        setnotes(new_data);
      } catch  {
        alert('Note cannot be add.Please try again...')
      }
    }
    // Delete a note ***************************************************************
    const deleteNote = async (id) => { 
      try {
        const response = await fetch(
          `http://localhost:5000/auth/notes/deletenote/${id}`,
          {
            method: "DELETE",
            headers: {
              "Auth-token":authtoken
            },
          }
        );
        const data = await response.json();
        const new_data = notes.filter((item) => {return item._id !== id})
        setnotes(new_data)
      } catch (error) {
        alert('Note has not been deleted.')
      }
     }
     // UpDate a note ******************************************************************************
     const updateNotes = async (id,title,description,tag) => {
       try {
        const response = await fetch(
          `http://localhost:5000/auth/notes/updatenote/${id}`,
          {
            method: "PUT",
            headers: {
              "Auth-token":authtoken,
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
              title: title,
              description: description,
              tag: tag
            })
          }
        );
        const data = await response.json();
        const new_data = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < new_data.length; index++) {
          const element = new_data[index];
          if(element._id === id){
            new_data[index].title = title,
            new_data[index].description = description,
            new_data[index].tag = tag
            break;
          }
          
        }
        setnotes(new_data)
       } catch  {
        alert("Failed to updaate note!")
       }
     }
  
     
 
  return (
    <noteContext.Provider value={{ notes, setnotes, addNotes, deleteNote, updateNotes, fetch_notes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
