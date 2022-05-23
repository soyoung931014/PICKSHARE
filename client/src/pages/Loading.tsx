/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Loading() {
  console.log(window.location.search);
  useEffect(() => {
    setTimeout(() => {
      void axios
        .get('http://localhost:5000/user/kakao', {
          headers: { authCode: window.location.search },
        })
        .then((res) => console.log(res));
    }, 1000);
  }, []);

  return (
    <div>
      <h1>로딩중...</h1>
    </div>
  );
}

export default Loading;
