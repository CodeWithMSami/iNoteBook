import React,{ useEffect } from "react";
import AddNotes from "./AddNotes";
import Notes from "./Notes";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const auth = localStorage.getItem('inotebook_tocken')
  const navigation = useNavigate();
  useEffect(() => {
    if (!auth) {
     navigation('/login')
    }
  }, [])
  
  
  return (
    <>
    
      <AddNotes />
      <Notes />
    </>
  );
}
