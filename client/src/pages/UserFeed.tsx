/*eslint-disable*/
/* eslint-disable @typescript-eslint/no-loss-of-precision */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Nav from '../component/Nav/Nav';
import feedBG from '../img/feedBG.jpg';
// import sampleImg from '../img/selfie4.jpg';
// import sampleImg2 from '../img/instafeed3.jpg';
import feedApi from '../api/feed';
import MainFeedList from '../component/Feed/MainFeed/MainFeedList';
import { useDispatch } from 'react-redux';
// import { followAction, unfollowAction } from '../redux/actions';
import { follow } from '../redux/reducers/follow/followReducer';

const UserWapper = styled.div`
  width: 100vw;
  height: 100% + 150px;
  background-image: url(${feedBG});
  background-size: cover;
  background-attachment: scroll;
`;
const Div = styled.div`
  margin: 150px;
  border: blue dotted 3px;
  /* min-width: 35rem; */
  min-width: 21rem;
`;
const User = styled.div`
  border: red solid 1px;
  display: grid;
  margin: 0.6rem 4.5rem;
  margin-right: 4.5rem;
  grid-template-columns: 1fr 1fr 1fr;
`;

const UserDiv = styled.div`
  border: green solid 1px;
`;

const UserImg = styled.img`
  border: #020f0f solid 3px;
  position: relative;
  border-radius: 100%;
  width: 178px;
  height: 178px;
  box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.25);
`;
const UserFollow = styled.div`
  border: orangered dotted 1px;
  background-color: white;
  position: absolute;
  border-radius: 20px;
  box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.25);
  width: 94px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  left: 21rem;
  top: 25.5rem;
`;
const UserInfo = styled.div``;
const UserDescribe = styled.div`
  border: peachpuff solid 1.5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 1rem;
  box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.25);
  width: 261px;
  height: 40px;
  background-color: white;
  margin: 1rem;
`;
const Content = styled.div`
  margin: 0.5rem;
  margin-left: 1rem;
`;
const UserFollowInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Feed = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, auto));
`;
export default function UserFeed() {
  const dispatch = useDispatch();
  const [userfeedlist, setUserFeedlist]: any[] = useState({
    id: '',
    contentImg: '',
    date: '',
    nickname: '',
    userImage: '',
    heartNum: 0,
    locked: '',
  });

  const [userlist, setUserlist]: any[] = useState({
    nickname: '',
    userImage: '',
    statusMessage: '',
  });

  const [userRender, setUserRender] = useState(false);
  const [follow, setFollow] = useState(false);
  const { isLogin, accessToken, userInfo } = useSelector(
    (userReducer: any) => userReducer.userInfo
  );
  const { isFollow } = useSelector((followReducer: follow) => followReducer);
  const [counts, setCounts] = useState({
    totalCount: 0,
    totalByDay: [],
  });

  const searchShareHandler = (value: {}) => {
    if (!value) {
      setUserFeedlist([]);
      return;
    }
  };

  const handleFollow = async () => {
    if (isLogin === false) {
      alert('로그인이 필요한 서비스입니다');
    }
    return await feedApi.postFollow( userlist.nickname, accessToken)
      .then(() => {
        setFollow(true)
      })
  }

  // const handleUnFollow = async() => {
  //   if(isLogin === false){
  //     alert('로그인이 필요한 서비스입니다')
  //   }
  //   console.log('이름',userlist.nickname)
  //   return await feedApi.
  // }

  useEffect(() => {
    let path = window.location.pathname.split('/')[2];
    console.log('path', path);

    const userfeedinfo = async () => {
      return await feedApi.userInfo(path)
      .then(result => {
        setUserlist(result.data.data)
      })
    }

    userfeedinfo();

    const userPage = async () => {
      return await feedApi.getUserFeed(path)
      .then(result => {
        setUserFeedlist(result.data)
      })
    }
    userPage();

    if(isLogin === true){
      console.log('닉네임', path)
      feedApi.searchFollow(path, accessToken)
      .then((result) => {
        if(result.data){
          setFollow(true);
        }
      });
    }
  }, [userRender, follow]);

  return (
    <UserWapper>
      <Nav />
      <Div>
        <div>UserFeed</div>
        <User>
          <div>
            <UserDiv>
              <UserImg src={userlist.userImage} />
              {isLogin === true ? (
                follow === true ? (
                  <UserFollow>unfollow</UserFollow>
                ) : (
                  <UserFollow onClick={handleFollow}>follow</UserFollow>
                )
              ) : (
                <UserFollow onClick={handleFollow}>follow</UserFollow>
              )}
            </UserDiv>
          </div>
          <UserInfo>
            <UserDescribe>
              <Content>닉네임{userlist.nickname}</Content>
            </UserDescribe>
            <UserDescribe>
              <Content>상메{userlist.statusMessage}</Content>
            </UserDescribe>
            <UserDescribe>
              <div>
                <UserFollowInfo>게시물</UserFollowInfo>
                <UserFollowInfo>게시물 수</UserFollowInfo>
              </div>
              <div>
                <UserFollowInfo>팔로잉</UserFollowInfo>
                <UserFollowInfo>팔로잉 수</UserFollowInfo>
              </div>
              <div>
                <UserFollowInfo>팔로워</UserFollowInfo>
                <UserFollowInfo>팔로워 수</UserFollowInfo>
              </div>
            </UserDescribe>
          </UserInfo>
        </User>
        <Feed>
          {userfeedlist.id === ''
            ? `${userlist.nickname}님의 피드가 없습니다`
            : userfeedlist.map((el: any) => (
                <MainFeedList
                  {...el}
                  key={el.id}
                  userRender={userRender}
                  setUserRender={setUserRender}
                />
              ))}
        </Feed>
      </Div>
    </UserWapper>
  );
}
