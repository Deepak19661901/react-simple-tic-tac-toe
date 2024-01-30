import React, { useState, useEffect } from 'react';

const CoverPage = ({ onStartGame }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      onStartGame();
    }
  }, [countdown, onStartGame]);

  return (
    <div className="cover-page" >
      <h1 className='coverHeading' style={{textAlign:"center"}} >Welcome to Tic tac toe Game</h1>
      <p style={{color:"white",fontSize:"22px"}}>Your game wIll start soon</p>
      <p style={{color:"white", fontSize:"4vw"}}>{countdown}</p>
    </div>
  );
};

export default CoverPage;
