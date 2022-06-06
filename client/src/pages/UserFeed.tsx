/*eslint-disable*/
/* eslint-disable @typescript-eslint/no-loss-of-precision */

import React, { useEffect, useMemo, useState } from 'react';
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
import FollowingList from '../component/Feed/PersonalFeed/FollowingList';
import Modal from '../component/Modal/Modal';
import FollowerList from '../component/Feed/PersonalFeed/FollowerList';

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
const UserFollow = styled.button`
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
  font-size: 20px;
  font-weight: 600;
  left: 21rem;
  top: 25.5rem;
  &:hover{
    cursor: pointer;
  }
`;
const UserInfo = styled.div`
  margin-left: 0.7rem;
`;
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
  border: paleturquoise solid 1px;
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
    commentNum: 0,
    locked: '',
  });

  const [userlist, setUserlist]: any[] = useState({
    nickname: '',
    userImage: '',
    statusMessage: '',
  });

  const [render, setRender] = useState(false);

  const [follow, setFollow] = useState(false);
  const { isLogin, accessToken, userInfo } = useSelector(
    (userReducer: any) => userReducer.userInfo
  );
  const [counts, setCounts] = useState(0);
  
  let path = window.location.pathname.split('/')[2];

  const [following, setFollowing]: any[] = useState({
    id: '',
    followingNickname: '',
    followerNickname: ''
  })

  const [follower, setFollower]: any[] = useState({
    id: '',
    user_id: '',
    followerNickname: ''
  })

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
        setFollow(true);
        setRender(!render);
      })
  }

  const handleUnFollow = async() => {
    if(isLogin === false){
      alert('로그인이 필요한 서비스입니다')
    }
    return await feedApi.deleteFollow(userlist.nickname, accessToken)
      .then(() => {
        setFollow(false);
        setRender(!render);
      })
  }
  
  useMemo(() => {
      
    const userfeedinfo = async () => {
      return await feedApi.userInfo(path)
      .then(result => {
        setUserlist(result.data.data)
      })
    }

    userfeedinfo();

    if(isLogin === true){
      feedApi.searchFollow(path, accessToken)
      .then((result) => {
        if(result.data){
          setFollow(true);
        }
      });
    };
    
    const getFollowingList = async () => {
      return await feedApi.getFollowingList(path)
      .then((result) => {
        setFollowing(result.data)
      })
    };
    
    getFollowingList();

    const getFollowerList = async () => {
      return await feedApi.getFollowerList(path)
      .then((result) => {
        setFollower(result.data)
      })
    }
    getFollowerList();
    
    const countFeed = () => {
      return setCounts(userfeedlist.length)
    }
    countFeed();
    
  },[follow]);

  useEffect(() => {
    const userPage = async () => {
      return await feedApi.getUserFeed(path)
      .then(result => {
        setUserFeedlist(result.data)
      })
    };
    userPage();
  },[
    render
  ])
  
  
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
                //로그인o 내계정o
                userInfo.nickname === path ? (
                  null
                ) : (
                  follow === true ? (
                    //로그인o 팔로우o
                    <UserFollow onClick={handleUnFollow}>unfollow</UserFollow>
                  ) : (
                    //로그인o 팔로우x
                    <UserFollow onClick={handleFollow}>follow</UserFollow>
                  )
                )
              ) : (
                //로그인x
                <UserFollow onClick={handleFollow}>follow</UserFollow>
              )}
            </UserDiv>
          </div>
          <UserInfo>
            <UserDescribe>
              <Content>{userlist.nickname}</Content>
            </UserDescribe>
            <UserDescribe>
              <Content>{userlist.statusMessage}</Content>
            </UserDescribe>
            <UserDescribe>
              <div>
                <UserFollowInfo>게시물</UserFollowInfo>
                <UserFollowInfo>{counts}</UserFollowInfo>
              </div>
              <div>
                <UserFollowInfo>팔로잉</UserFollowInfo>
                <UserFollowInfo>{following.length}</UserFollowInfo>
              </div>
              <div>
                <UserFollowInfo>팔로워</UserFollowInfo>
                <UserFollowInfo>{follower.length}</UserFollowInfo>
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
                render={render}
                setRender={setRender}
                />
              ))}
        </Feed>
        <div>
          팔로잉
          {following.id === ''
          ? `${following}이 없습니다`
          : following.map((el: any) => (
            <FollowingList 
              {...el}
              key={el.id}
              follow={follow}
              setFollow={setFollow}
              // render={render}
              // setRender={setRender}
            />
          ))}
        </div>
        <div>
          팔로워
          {follower.id === ''
          ? (
            <>
            `없습니다`
            </>
          ) : (
            follower.map((el: any) => (
            <FollowerList
              {...el}
              key={el.id}
              follow={follow}
              setFollow={setFollow}
              // render={render}
              // setRender={setRender}
            />
          ))
          )
          }
        </div>
      </Div>
    </UserWapper>
  );
}
