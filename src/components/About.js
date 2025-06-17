import React,{ useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function About(){
  const auth = localStorage.getItem('inotebook_tocken')
  const navigation = useNavigate();
  useEffect(() => {
    if (!auth) {
     navigation('/login')
    }
  }, [])
  return (
    <div>
      This is about. 
    </div>
  );
};

export default About;
