/*eslint-disable*/
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Nav from '../component/Nav/Nav';
import feedBG from '../img/feedBG.jpg';
import profileImg from '../img/profileImg.png'
import feedApi from '../api/feed';
import MainFeedList from '../component/Feed/MainFeed/MainFeedList';
import { useDispatch } from 'react-redux';
import Modal from '../component/Modal/Modal';
import { deleteBoardInfo, diaryOnAction, modalOnAction } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/Footer/Footer';
import { Feedlist } from './MainFeed';

export interface Userlist {
  nickname: string | undefined;
  userImage: string | undefined;
  statusMessage: string | undefined;
}

export default function UserFeed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userfeedlist, setUserFeedlist] = useState<Feedlist[]|null>([]);
  const [userlist, setUserlist] = useState<Userlist[]|null>();
  const [render, setRender] = useState(false);
  const [orderingH, setOrderingH] = useState(false);
  const [follow, setFollow] = useState(false); //팔로우
  let start = 0;
  let end = 8;
  const { isModalOn } = useSelector(
    (modalReducer: any) => modalReducer.modalInfo
  );
  const { isLogin, accessToken, userInfo } = useSelector(
    (userReducer: any) => userReducer.userInfo
  );
  const path = window.location.pathname.split('/')[2];
  const [following, setFollowing]: any[] = useState({
    id: '',
    followingNickname: '',
    followerNickname: '',
  });
  const [follower, setFollower]: any[] = useState({
    id: '',
    user_id: '',
    followerNickname: '',
  });

  const searchShareHandler = (value: {}) => {
    if (!value) {
      setUserFeedlist([]);
      return;
    }
  };
  const writeNewDiary = () => {
    //새로 만들기
    dispatch(deleteBoardInfo());
    dispatch(diaryOnAction);
    navigate('/diary');
  };
  const handleFollow = async () => {
    if (isLogin === false) {
      alert('로그인이 필요한 서비스입니다');
    }
    return await feedApi.postFollow(userlist[0].nickname, accessToken).then(() => {
      setFollow(true);
      setRender(!render);
    });
  };

  const handleUnFollow = async () => {
    if (isLogin === false) {
      alert('로그인이 필요한 서비스입니다');
    }
    return await feedApi
      .deleteFollow(userlist[0].nickname, accessToken)
      .then(() => {
        setFollow(false);
        setRender(!render);
      });
  };

  const handleModalOn = () => {
    dispatch(modalOnAction);
  };

  useMemo(async () => {
    const userfeedinfo = async () => {
      return await feedApi.userInfo(path).then((result) => {
        setUserlist(result.data.data);
      });
    };

    await userfeedinfo();

    if (isLogin === true) {
      feedApi.searchFollow(path, accessToken).then((result) => {
        if (result.data) {
          setFollow(true);
        }
      });
    }

    const getFollowingList = async () => {
      return await feedApi.getFollowingList(path).then((result) => {
        setFollowing(result.data);
      });
    };

    await getFollowingList();

    const getFollowerList = async () => {
      return await feedApi.getFollowerList(path).then((result) => {
        setFollower(result.data);
      });
    };
    await getFollowerList();

  }, [follow, render]);

  useEffect(() => {
    //내 피드가져오기
    const myFeed = async () => {
      return await feedApi.getMyFeed(accessToken, start, end).then((result) => {
        // setUserFeedlist(result.data);
        setUserFeedlist((prev) => prev.concat(result.data));
        start += 8;
        end += 8;
      });
    };

    //유저들의 피드
    const userPage = async () => {
      return await feedApi.getUserFeed(path, start, end).then((result) => {
        // setUserFeedlist(result.data);
        setUserFeedlist((prev) => prev.concat(result.data));
        start += 8;
        end += 8;
      });
    };
    if (userInfo.nickname === path) {
      myFeed();
    } else {
      userPage();
    }
  }, [render]);

  return (
    <UserWapper>
      <Nav setRender={setRender} render={render} />
      <Div>
        <User>
          <div>
            <UserDiv>
              <>
                {
                  !userlist || userlist[0].userImage === 'nothing'
                  ? <UserImg src={profileImg} />
                  : <UserImg src={userlist[0].userImage} />
                } 
              </>
              <>
                {isLogin === true ? (
                  //내 피드이면 안보이기
                  userInfo.nickname === path ? null : follow === true ? (
                    //로그인o 팔로우o
                    <UserFollow onClick={handleUnFollow}>unfollow</UserFollow>
                  ) : (
                    //로그인o 팔로우x
                    <UserFollow onClick={handleFollow}>follow</UserFollow>
                  )
                ) : (
                  //로그인x
                  <UserFollow onClick={handleFollow}>follow</UserFollow>
                )}
              </>
            </UserDiv>
          </div>
          <UserInfo>
            <UserDescribe>
              <Content>{userlist[0].nickname}</Content>
            </UserDescribe>
            <UserDescribe>
              <Content>{userlist[0].statusMessage}</Content>
            </UserDescribe>
            <UserDescribe>
              <div>
                <UserFollowInfo>게시물</UserFollowInfo>
                <UserFollowInfo>{userfeedlist.length}</UserFollowInfo>
              </div>
              <div>
                <UserFollowInfo onClick={handleModalOn}>팔로잉</UserFollowInfo>
                <UserFollowInfo>{following.length}</UserFollowInfo>
              </div>
              <div>
                <UserFollowInfo onClick={handleModalOn}>팔로워</UserFollowInfo>
                <UserFollowInfo>{follower.length}</UserFollowInfo>
              </div>
            </UserDescribe>
          </UserInfo>
        </User>
        {
          userInfo.nickname === path
          ?(
            <PlusButton>
              <button onClick={writeNewDiary}> + </button>
            </PlusButton>
          ) : (
            <PlusButton Hidden >
              <button > + </button>
            </PlusButton>
          )
        }
        <Feed>
          {userfeedlist.length === 0
            ? `${userlist[0].nickname}님의 피드가 없습니다`
            : userfeedlist.map((el: any) => (
                <MainFeedList
                  {...el}
                  key={el.id}
                  render={render}
                  setRender={setRender}
                />
              ))}
        </Feed>
        {isModalOn ? (
          <Modal
            follower={follower}
            following={following}
            follow={follow}
            setFollow={setFollow}
          />
        ) : null}
      </Div>
      <FooterDiv>
        <Footer />
      </FooterDiv>
    </UserWapper>
  );
}

  const UserWapper = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${feedBG});
    background-size: cover;
    background-attachment: scroll;
  `;
  const Div = styled.div`
    margin: 150px;
    min-width: 21rem;
  `;
  const User = styled.div`
    display: flex;
    column-gap: 7rem;
  
    @media screen and (max-width: 947px) {
      flex-direction: column;
      margin: 0 auto;
    }
  `;
  
  const UserDiv = styled.div`
    @media screen and (max-width: 947px) {
      display: flex;
      justify-content: center;
    }
  `;
  
  const UserImg = styled.img`
    position: relative;
    border-radius: 100%;
    width: 178px;
    height: 178px;
    box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.25);
  `;
  const UserFollow = styled.button`
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
    left: 17rem;
    top: 23.7rem;
    &:hover {
      cursor: pointer;
    }
    @media screen and (max-width: 947px) {
      left: 21rem;
    }
  `;
  const UserInfo = styled.div`
    @media screen and (max-width: 947px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `;
  const UserDescribe = styled.div`
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
    width: 200px;
    padding-top: 7px;
    font-weight: 700;
    color: #494949;
  `;
  const UserFollowInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 4px;
    font-weight: 700;
    color: #494949;
    &:hover {
      cursor: pointer;
    }
  `;
  const Feed = styled.div`
    display: grid;
    column-gap: 5rem;
    row-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(20rem, auto));
    justify-content: start;
  `;
  const PlusButton = styled.div<{ Hidden?: any }>`
    visibility: ${(props) => (
      props.Hidden ? 'hidden' : 'visible'
    )};
    display: flex;
    justify-content: right;
    margin: 1rem 0;
    button {
      background-color: #c4c4c4;
      border-radius: 100%;
      width: 2rem;
      height: 2rem;
      margin-left: 0.3rem;
      font-size: 1.8rem;
      text-align: center;
      font-weight: 400;
      &:hover {
        cursor: pointer;
      }
    }
  `;
  const FooterDiv = styled.div`
    padding-left: 25px;
    padding-top: 10px;
    border-top: solid gray 1px;
  `;