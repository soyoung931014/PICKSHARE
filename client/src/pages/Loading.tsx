/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUserInfo } from '../redux/actions';

function Loading(props: any) {
  const { userInfoToStore } = props;
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      void axios
        .get('http://localhost:5000/user/kakao', {
          headers: { authCode: window.location.search },
        })
        .then((res) => {
          console.log(res);
          const { accessToken, data, nickname } = res.data;
          void userInfoToStore(data, accessToken);
          if (nickname === '') {
            alert('닉네임을 설정해주세요');
            return navigate('/mypage', { replace: true });
          }
          navigate('/', { replace: true });
        });
    }, 1000);
  }, []);

  return (
    <div>
      <h1>로딩중...</h1>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    userInfoToStore: (userInfo: object, token: string) => {
      dispatch(addUserInfo(userInfo, token));
    },
  };
};
export default connect(null, mapDispatchToProps)(Loading);
