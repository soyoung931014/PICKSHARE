/*eslint-disable*/
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { BsSuitHeart } from 'react-icons/bs';
import { BsSuitHeartFill } from 'react-icons/bs';
import feedApi from '../../../api/feed';
import { useSelector } from 'react-redux';
import { FaRegCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import boardApi from '../../../api/board';
import { board } from '../../../redux/reducers/boardReducer/boardReducer';
import { addBoardInfo, deleteBoardInfo } from '../../../redux/actions';
import profileImg from '../../../img/profileImg.png'

const Div = styled.div`
  width: 20rem;
  aspect-ratio: 262 / 302;
  background-color: white;
  box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.25);
  display: grid;
  grid-template-rows: 262fr 48fr; 
  border-radius: 1rem;
`;
const ImgDiv = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  aspect-ratio: 262 / 252.46;
`;
const Img = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 1rem 1rem 0 0;
`;
const ContentDiv = styled.div`
  margin: 0 1rem;
  display: grid;
  grid-template-columns: 4fr 2fr;
`;
const ContentRightDiv = styled.div`
  display: flex;
  overflow: hidden;
  place-items: center;
`;
const UserImg = styled.img`
  border-radius: 100%;
  margin: 0.6rem 0;
  width: 3rem;
  height: 3rem;
`;
const UserDiv = styled.div`
  margin: 0.2rem;
`;
const UserNickname = styled.div`
  font-size: 28px;
  font-weight: normal;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
`;
const DateDiv = styled.div``;
const ContentLeftDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  align-items: center;
  font-size: 27px;
  column-gap: 2px;
`;
const HeartDiv = styled.div`
  display: flex;
  column-gap: 2px;
`;
const Button = styled.button`
  background-color: white;
  display: flex;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;
const Num = styled.div`
  font-size: 25px;
  margin-left: 2px;
`;

type MainFeedListProps = {
  id: number;
  contentImg: string | undefined;
  userImage: string | undefined;
  nickname: string | undefined;
  date: string | undefined;
  heartNum: number;
  commentNum: number;
  title: string;
  render: boolean;
  setRender: (render: boolean) => boolean;
};
export default function MainFeedList({
  id,
  contentImg,
  userImage,
  nickname,
  date,
  heartNum,
  commentNum,
  title,
  render,
  setRender,
}: MainFeedListProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, accessToken, userInfo } = useSelector(
    (userReducer: any) => userReducer.userInfo
  );
  const { boardInfo } = useSelector((boardReducer: board) => boardReducer);
  const [heart, setHeart] = useState(false);

  const postHeart = async () => {
    return await feedApi.postHeart(userInfo, id, accessToken).then(() => {
      setHeart(true);
      setRender(!render);
    });
  };

  const deleteHeart = async () => {
    return await feedApi.deleteHeart(userInfo, id, accessToken).then(() => {
      setHeart(false);
      setRender(!render);
    });
  };

  const moveToUsersFeed = (e: any) => {
    navigate(`/feed/${e}`);
  };

  const clickWithOutLoggedin = () => {
    alert('로그인이 필요한 서비스 입니다');
    navigate('/login');
  };

  const moveToViewBoard = (e: any) => {
    dispatch(deleteBoardInfo());
    const id = Number(e.target.id);
    boardApi.getBoardById(id).then((result) => {
      dispatch(addBoardInfo(result.data));
      navigate('/diary');
    });
  };

  useMemo(() => {
    if (isLogin) {
      const getHeart = async () => {
        //하트 기록이 있는지 서치, 하트가 있으면, 하트 트루, 없 false
        await feedApi.getHeart(id, accessToken).then((result) => {
          result.data === 1 ? setHeart(true) : setHeart(false);
        });
      };
      getHeart();
    }
  }, []);

  let urlSlice = window.location.pathname.split('/')[2];

  useEffect(() => {}, [render]);

  return (
    <Div>
      <ImgDiv>
        <Img
          src={contentImg}
          id={`${id}`}
          onClick={(e) => moveToViewBoard(e)}
        />
      </ImgDiv>
      <ContentDiv>
        <ContentRightDiv>
          {
            userImage === 'nothing'
            ? <UserImg src={profileImg} />
            : <UserImg src={userImage} />
          }
          <UserDiv>
            {
              isLogin &&
              userInfo.nickname === urlSlice ? (
              //로그인 상태인지 아닌지
              //내 피드일 때 타이틀 아닐 때 닉네임
                <Title>{title}</Title>
              ) : (
                <UserNickname
                  className="nickname"
                  onClick={() => moveToUsersFeed(nickname)}
                >
                  {nickname}
                </UserNickname>
              )
            }
            <DateDiv>{date}</DateDiv>
          </UserDiv>
        </ContentRightDiv>
        <ContentLeftDiv>
          {isLogin === false ? (
            <HeartDiv>
              <Button onClick={clickWithOutLoggedin}>
                <BsSuitHeart style={{ strokeWidth: 1 }} size="25" />
              </Button>
              <Num>{heartNum}</Num>
            </HeartDiv>
          ) : heart === false ? (
            <Button onClick={postHeart}>
              <BsSuitHeart style={{ strokeWidth: 1 }} size="25" />
              <Num>{heartNum}</Num>
            </Button>
          ) : (
            <Button onClick={deleteHeart}>
              <BsSuitHeartFill
                style={{ strokeWidth: 1 }}
                size="25"
                color="red"
              />
              <Num>{heartNum}</Num>
            </Button>
          )}
          <Button>
            <FaRegCommentDots style={{ strokeWidth: 1 }} size="27" />
            <Num>{commentNum}</Num>
          </Button>
        </ContentLeftDiv>
      </ContentDiv>
    </Div>
  );
}
