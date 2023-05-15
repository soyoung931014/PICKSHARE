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
import { boardI } from '../../../redux/reducers/boardReducer/boardReducer';
import {
  addBoardInfo,
  deleteBoardInfo,
  renderAction,
} from '../../../redux/actions';
import profileImg from '../../../img/profileImg.png';
import { RootState } from '../../../redux';
import { MainFeedListProps } from '../../../types/feedType';

export default function MainFeedList({
  id,
  contentImg,
  userImage,
  nickname,
  date,
  heartNum,
  commentNum,
  title,
}: MainFeedListProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, accessToken, userInfo } = useSelector(
    (userReducer: RootState) => userReducer.userInfo
  );
  const { isRender } = useSelector(
    (renderReducer: RootState) => renderReducer.renderInfo
  );
  const { boardInfo } = useSelector((boardReducer: boardI) => boardReducer);
  const [heart, setHeart] = useState(false);
  const postHeart = async () => {
    return await feedApi.postHeart(userInfo, id, accessToken).then(() => {
      setHeart(true);
      dispatch(renderAction);
    });
  };

  const deleteHeart = async () => {
    return await feedApi.deleteHeart(userInfo, id, accessToken).then(() => {
      setHeart(false);
      dispatch(renderAction);
    });
  };

  const moveToUsersFeed = (e: string) => {
    navigate(`/feed/${e}`);
  };

  const clickWithOutLoggedin = () => {
    alert('로그인이 필요한 서비스 입니다');
    navigate('/login');
  };

  const moveToViewBoard = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    dispatch(deleteBoardInfo());
    const target = e.target as HTMLImageElement;

    const targetId = target.id;
    console.log('이이이잉', targetId, typeof targetId);
    await boardApi.getBoardById(Number(targetId)).then((result) => {
      dispatch(addBoardInfo(result.data));
      navigate('/diary');
    });
  };

  useMemo(() => {
    if (isLogin) {
      const getHeart = async () => {
        //하트 기록이 있는지 서치, 하트가 있으면, 하트 트루, 없 false
        return await feedApi.getHeart(id, accessToken).then((result) => {
          result.data === 1 ? setHeart(true) : setHeart(false);
        });
      };
      getHeart().catch((err) => console.log(err));
    }
  }, []);

  const urlSlice = window.location.pathname.split('/')[2];

  useEffect(() => {
    return;
  }, [isRender]);

  return (
    <Div>
      <ImgDiv id={`${id}`} onClick={(e) => moveToViewBoard(e)}>
        <Img id={`${id}`} src={contentImg} />
      </ImgDiv>
      <ContentDiv>
        <ContentRightDiv>
          {userImage === 'nothing' ? (
            <UserImg src={profileImg} />
          ) : (
            <UserImg src={userImage} />
          )}
          <UserDiv>
            {isLogin && userInfo.nickname === urlSlice ? (
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
            )}
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

const Div = styled.div`
  border: solid 1px red;
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
