/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import feedApi from '../../../api/feed';

export default function FollowerList(props: any) {
  const [userlist, setUserlist]: any[] = useState({
    nickname: '',
    userImage: '',
  });

  useEffect(() => {
    const findFollow = async () => {
      await feedApi.userInfo(props.followerNickname).then((result) => {
        setUserlist(result.data.data);
      });
    };
    findFollow();
  }, []);
  return (
    <Wrapper>
      <UserImage src={userlist.userImage} />
      <UserNick>{userlist.nickname}</UserNick>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
`;
const UserImage = styled.img`
  width: 50px;
  height: 46px;
  border-radius: 100%;
  overflow: auto;
`;
const UserNick = styled.div`
  width: 100px;
  font-size: 1rem;
  text-align: left;
`;
