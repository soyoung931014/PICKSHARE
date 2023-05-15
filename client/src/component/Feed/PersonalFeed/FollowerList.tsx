// /*eslint-disable*/
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import feedApi from '../../../api/feed';
import { UserInfoData, followerListProps } from '../../../types/feedType';

export default function FollowerList({
  followerNickname,
  setFollow,
}: followerListProps) {
  const [userlist, setUserlist] = useState({
    id: 0,
    nickname: '',
    userImage: '',
    statusMessage: '',
  });

  useEffect(() => {
    const findFollow = async () => {
      await feedApi
        .userInfo(followerNickname)
        .then(({ data }: UserInfoData) => {
          setUserlist(data.data);
        });
    };
    findFollow().catch((err) => console.log(err));
  }, []);

  return (
    <Wrapper>
      <UserImage src={userlist.userImage} />
      <UserNick>{userlist.nickname}</UserNick>
    </Wrapper>
  );
}

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
