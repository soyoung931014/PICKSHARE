/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import feedApi from '../../../api/feed';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: center;
  justify-content: center;
`;
const UserImage = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 100%;
  overflow: hidden;
`;
const UserNick = styled.div``;

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
