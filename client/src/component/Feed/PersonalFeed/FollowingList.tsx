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

export default function FollowingList(props: any) {
  const { isLogin, accessToken, userInfo } = useSelector(
    (userReducer: any) => userReducer.userInfo
  );
  const [userlist, setUserlist]: any[] = useState({
    nickname: '',
    userImage: '',
  });
  const handleUnFollow = async() => {
    if(isLogin === false){
      alert('로그인이 필요한 서비스입니다')
    }
    return await feedApi.deleteFollow(userlist.nickname, accessToken)
      .then(() => {
        props.setFollow(false);
      })
  }

  useEffect(() => {
    const findFollow = async () => {
      await feedApi.userInfo(props.followingNickname)
      .then(result => {
        setUserlist(result.data.data);
      });
    };
    findFollow();
  }, [props.setFollow()]);
  return (
    <Wrapper>
      <UserImage src={userlist.userImage}/>
      <UserNick>{userlist.nickname}</UserNick>
      <FollowButton onClick={handleUnFollow} >unfollow</FollowButton>
    </Wrapper>
  );
}
