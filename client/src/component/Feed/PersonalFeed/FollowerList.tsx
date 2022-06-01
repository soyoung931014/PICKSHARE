/*eslint-disable*/

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import feedApi from '../../../api/feed';

const Wrapper = styled.div``;
const UserImage = styled.img``;
const UserNick = styled.div``;
const FollowButton = styled.button`
  background-color: white;
  border-radius: 20px;
  width: 94px;
  height: 37px;
  box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.25);
  &:hover{
    cursor: pointer;
  }
`

export default function FollowerList(props: any) {
  console.log('props', props)
  const { isLogin, accessToken } = useSelector(
    (userReducer: any) => userReducer.userInfo
  );
  const [userlist, setUserlist]: any[] = useState({
    nickname: '',
    userImage: '',
  });

  useEffect(() => {
    const findFollow = async () => {
      await feedApi.userInfo(props.followerNickname)
      .then(result => {
        setUserlist(result.data.data);
        console.log('유저리스트',userlist);
      });
    };
    findFollow();
  }, [props.setFollow()]);
  return (
    <Wrapper>
      <UserImage src={userlist.userImage}/>
      <UserNick>{userlist.nickname}</UserNick>
    </Wrapper>
  );
}