import React, { useEffect } from 'react'
import authenticationService from '../../services/authentication.service';

const HomePage = () => {

  useEffect(() => {
    authenticationService.checkAuth()
      .then((response) => {
        console.log(response);
        
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 407) {
          console.log(error);
        } else {
          console.log("Unexpected error occurred.");
        }
      });
  
    
  }, [])
  
  return (
    <div>
      <h1>Home </h1>
    </div>
  )
}

export default HomePage