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


const Div = styled.div`
  border: red solid 1px;
  aspect-ratio: 262 / 302;
  background-color: white;
  box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.25);
  display: grid;
  grid-template-rows: 262fr 49fr;
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
  display: grid;
  grid-template-columns: 3fr 2fr;
`;
const ContentRightDiv = styled.div`
  border: purple solid 6px;
  display: flex;
`;
const UserImg = styled.img`
  border-radius: 100%;
  margin: 0.6rem 1rem;
  width: 3rem;
  height: 3rem;
`;
const UserDiv = styled.div`
  border: blue dotted 3px;
  /* margin: 0.2rem; */
  /* display: grid; */
  /* grid-template-rows: 2fr 1fr; */
`;
const UserNickname = styled.div`
  border: pink dotted 3px;
  font-size: 28px;
  font-weight: 400;
  &:hover {
    cursor: pointer;
  }
`;
const DateDiv = styled.div`
  border: red dotted 3px;
`;
const ContentLeftDiv = styled.div`
  border: salmon solid 3px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  align-items: center;
  font-size: 27px;
`;
const HeartDiv = styled.div`
  display: flex;
  /* grid-template-columns: 1fr 1fr; */
  border: green solid 1px;
  column-gap: 3px;
  margin: 1rem;
`;
const Button = styled.button`
  border: purple solid 1px;
  /* margin-top: 0.2rem; */
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
  render,
  setRender,
}: MainFeedListProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, accessToken, userInfo } = useSelector(
    (userReducer: any) => userReducer.userInfo
  );
  const { boardInfo } = useSelector((boardReducer: board) => boardReducer)
  const [heart, setHeart] = useState(false);

  const postHeart = async () => {
    return await feedApi.postHeart(userInfo, id, accessToken).then(() => {
      setHeart(true);
      setRender(!render);
      console.log('하트넣기-리스트', render);
    });
  };

  const deleteHeart = async () => {
    return await feedApi.deleteHeart(userInfo, id, accessToken).then(() => {
      setHeart(false);
      setRender(!render);
      console.log('하트삭제-리스트', render);
    });
  };

  const moveToUsersFeed = (e: any) => {
    console.log(e, '이벤트 타겟');
    navigate(`/feed/${e}`);
  };

  const clickWithOutLoggedin = () => {
    alert('로그인이 필요한 서비스 입니다');
    navigate('/login');
  };

  const moveToViewBoard = (e: any) => {
    // console.log("e.target", e.target.id)
    dispatch(deleteBoardInfo());
    // console.log('지워졌나?',boardInfo);
    let id = Number(e.target.id)
    boardApi.getBoardById(id)
    .then((result) => {
      // console.log('아이디로 결과찾기', result.data);
      dispatch(addBoardInfo(result.data));
      // console.log('리덕스 잘 됐니', boardInfo);
      navigate('/diary');
    })
  }

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

  useEffect(() => {

  }, [render]);
  return (
    <Div>
      <ImgDiv>
        <Img src={contentImg} id={`${id}`} onClick={(e) => moveToViewBoard(e)}/>
      </ImgDiv>
      <ContentDiv>
        <ContentRightDiv>
          <UserImg src={userImage} />
          <UserDiv>
            <UserNickname
              className="nickname"
              onClick={() => moveToUsersFeed(nickname)}
            >
              {nickname}
            </UserNickname>
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