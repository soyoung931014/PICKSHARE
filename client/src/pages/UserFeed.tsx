import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import feedApi from '../api/feed';
import MainFeedList from '../component/Feed/MainFeed/MainFeedList';
import { useDispatch } from 'react-redux';
import Modal from '../component/Modal/Modal';
import {
  deleteBoardInfo,
  diaryOnAction,
  modalOnAction,
} from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { defaultProfile } from '../img/Img';

import { RootState } from '../redux';
import {
  Feedlist,
  FollowerListType,
  FollowingListType,
  IOptions,
  UserInfoData,
} from '../types/feedType';
import { renderAction } from '../redux/actions';
export default function UserFeed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userfeedlist, setUserFeedlist] = useState<Feedlist[] | null>([]);
  const [userlist, setUserlist] = useState({
    id: 0,
    nickname: '',
    userImage: '',
    statusMessage: '',
  });
  const target = useRef<HTMLDivElement>(null);
  let start = 0;
  let end = 8;
  const [follow, setFollow] = useState(false); //팔로우
  const { isModalOn } = useSelector(
    (modalReducer: RootState) => modalReducer.modalInfo
  );
  const { isRender } = useSelector(
    (renderReducer: RootState) => renderReducer.renderInfo
  );
  const { isLogin, accessToken, userInfo } = useSelector(
    (userReducer: RootState) => userReducer.userInfo
  );
  const path = window.location.pathname.split('/')[2];
  const [following, setFollowing] = useState<FollowingListType[]>([]);
  const [follower, setFollower] = useState<FollowerListType[]>([]);

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
    await feedApi.postFollow(userlist.nickname, accessToken).then(() => {
      setFollow(true);
      dispatch(renderAction);
    });
  };

  const handleUnFollow = async () => {
    if (isLogin === false) {
      alert('로그인이 필요한 서비스입니다');
    }
    return await feedApi.deleteFollow(path, accessToken).then(() => {
      setFollow(false);
      dispatch(renderAction);
    });
  };

  const handleModalOn = () => {
    dispatch(modalOnAction);
  };

  const userfeedinfo = async () => {
    return feedApi.userInfo(path).then(({ data }: UserInfoData) => {
      setUserlist(data.data);
    });
  };

  //유저가 팔로우하고 있는 다른 유저들의 목록 리턴
  const getFollowingList = async () => {
    await feedApi.getFollowingList(path).then((result) => {
      setFollowing(result.data);
    });
  };

  //유저를 팔로우하고 있는 다른 유저 목록 리턴
  const getFollowerList = async () => {
    await feedApi.getFollowerList(path).then((result) => {
      setFollower(result.data);
    });
  };

  //유저가 특정 닉네임을 팔로우하고있는지 아닌지 판별
  const searchFollower = async () => {
    await feedApi.searchFollow(path, accessToken).then((result) => {
      if (result.data) {
        setFollow(true);
      }
    });
  };

  useMemo(() => {
    userfeedinfo().catch((err) => console.log(err));
    if (isLogin === true) {
      searchFollower().catch((err) => console.log(err));
    }
    getFollowingList().catch((err) => console.log(err));
    getFollowerList().catch((err) => console.log(err));
  }, [follow]);

  //내 피드가져오기
  const myFeed = async () => {
    await feedApi.getMyFeed(accessToken, start, end).then((result) => {
      setUserFeedlist((prev) => prev.concat(result.data));
      start += 8;
      end += 8;
    });
  };

  //유저들의 피드
  const userPage = async () => {
    await feedApi.getUserFeed(path, start, end).then((result) => {
      setUserFeedlist((prev) => prev.concat(result.data));
      start += 8;
      end += 8;
    });
  };

  useEffect(() => {
    const options: IOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (userInfo.nickname === path) {
              myFeed().catch((err) => console.log(err));
            } else {
              userPage().catch((err) => console.log(err));
            }
          }, 1000);
        }
      });
    }, options);

    if (target.current) {
      io.observe(target.current);
    }
  }, [path, isRender, target]);
  return (
    <UserWapper>
      <Div>
        <User>
          <div>
            <UserDiv>
              <>
                {userlist.userImage === 'nothing' ? (
                  <UserImg src={defaultProfile} />
                ) : (
                  <UserImg src={userlist.userImage} />
                )}
              </>
              {isLogin === true ? (
                //내 피드이면 안보이기
                userInfo.nickname === path ? (
                  <Block></Block>
                ) : follow === true ? (
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
                <UserFollowInfo>{userfeedlist.length}</UserFollowInfo>
              </div>
              <FolWrapper onClick={handleModalOn}>
                <UserFollowInfo>팔로잉</UserFollowInfo>
                <UserFollowInfo>{following.length}</UserFollowInfo>
              </FolWrapper>
              <FolWrapper onClick={handleModalOn}>
                <UserFollowInfo>팔로워</UserFollowInfo>
                <UserFollowInfo>{follower.length}</UserFollowInfo>
              </FolWrapper>
            </UserDescribe>
          </UserInfo>
        </User>
        {userInfo.nickname === path ? (
          <PlusButton>
            <button onClick={writeNewDiary}> + </button>
          </PlusButton>
        ) : (
          <PlusButton Hidden>
            <button> + </button>
          </PlusButton>
        )}
        <Feed>
          {userfeedlist.length === 0
            ? `${userlist.nickname}님의 피드가 없습니다`
            : userfeedlist.map((el) => (
                <MainFeedList {...el} key={el.id} isRender personalFeed />
              ))}
          <div ref={target} className="Target-Element"></div>
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
    </UserWapper>
  );
}
const UserWapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Div = styled.div`
  padding: 10rem;
  @media screen and (max-width: 947px) {
    padding: 10rem 2rem;
  }
`;
const User = styled.div`
  display: flex;
  column-gap: 6rem;

  @media screen and (max-width: 947px) {
    flex-direction: column;
    margin: 0 auto;
  }
`;

const UserDiv = styled.div`
  margin-left: 15px;
  @media screen and (max-width: 947px) {
    margin-left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const UserImg = styled.img`
  position: relative;
  border-radius: 100%;
  width: 178px;
  height: 178px;
  box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.25);
  @media screen and (max-width: 947px) {
    margin-bottom: 30px;
    width: 200px;
    height: 200px;
    left: 30px;
    flex-shrink: 0;
  }
  @media screen and (max-width: 370px) {
    left: 10px;
  }
`;
const UserFollow = styled.button`
  background-color: white;
  position: relative;
  border-radius: 20px;
  box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.25);
  width: 94px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  top: -50px;
  left: 6em;
  &:hover {
    cursor: pointer;
    background: #fee7f4;
  }
  @media screen and (max-width: 947px) {
    top: 4rem;
    left: -3rem;
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
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 840px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
`;
const PlusButton = styled.div<{ Hidden?: any }>`
  visibility: ${(props) => (props.Hidden ? 'hidden' : 'visible')};
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
      background: #fee7f4;
    }
  }
`;
const FolWrapper = styled.div`
  &:hover {
    background: #fee7f4;
    cursor: pointer;
    border-radius: 20px;
    scale: 1.1;
  }
`;
const Block = styled.div`
  @media screen and (max-width: 947px) {
    width: 57px;
  }
`;
