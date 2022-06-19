/* eslint-disable */
import background from '../img/feedBG.jpg';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { addBoardInfo, deleteBoardInfo, editOnAction } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import bookmarkPink from '../img/bookmark-pink.png';
import bookmarkYellow from '../img/bookmark-yellow.png';
import Photo from '../component/Diary/Photo';
import Drawing from '../component/Diary/Drawing';
import { debounce } from 'debounce';
import { GrLock, GrUnlock } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import boardApi from '../api/board';
import feedApi from '../api/feed';
import { board } from '../redux/reducers/boardReducer/boardReducer';
import { edit } from '../redux/reducers/editReducer/editReducer';
import { useDispatch } from 'react-redux';
import Comments from '../component/Comment/Comments';
import { render } from '@testing-library/react';

const AWS = require('aws-sdk/dist/aws-sdk-react-native');
/*
Container
  Left
    Drawing
      Board
      Palette
    Photo
  Right
    Title
    Date
    Mood
    Lock
    Content
    Button
*/

const Container = styled.section`
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-attachment: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ---- 일기장 Wrapper CSS ----
const wrapperStyle = styled.article`
  height: 670px;
  width: 600px;
  padding: 3.8rem 2rem;
  border-radius: 1.5rem;
  background-color: var(--color-white);
`;
// ---- ----
const BookMark = styled.div`
  border: 1px solid black;
  display: grid;
  row-gap: 1rem;
  position: relative;
  top: -230px;

  img {
    width: 83px;
    height: 41px;
    &:hover {
      cursor: pointer;
      transform: scale(1.2, 0) translate(-9px, 0px);
    }
  }
  div.Tag {
    position: relative;
  }
  div.TagName {
    position: absolute;
    top: 35%;
    left: 50%;
  }
  /* button.yellow{
    background-image: url(${bookmarkYellow});
    background-size: cover;
  }

  button.pink{
    background-image: url(${bookmarkPink});
  } */
`;
const LeftWrapper = styled(wrapperStyle)`
  border: red solid 1px;
  box-shadow: 1px 4px 10px var(--color-shadow);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* input.img-input {
    width: 100%;
    height: 500px;
    background-color: grey;
  } */
`;
const ImgDiv = styled.div`
  border: blue solid 1px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* //::backdropmargin: 1rem; */
  width: 90%;
  height: 90%;
`;
const Img = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;
const RightWrapper = styled(wrapperStyle)`
  box-shadow: 15px 4px 10px var(--color-shadow);
  form.form-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  /* input 기본 css / 감정 / 잠금 / 내용 / 저장 버튼 */
  input.diary,
  select.moods,
  textarea.diary,
  div.lock,
  button.diary {
    width: 100%;
    height: 50px;
    box-shadow: 1px 1px 4px var(--color-shadow);
    background-color: var(--color-input);
    border-radius: 1rem;
    font-size: 18px;
    padding: 1rem;
  }
  /* Wrapper (Date, Mood, Lock) */
  article.select-wrapper {
    display: flex;
    flex-direction: row;
    gap: 1.2rem;

    input.dates {
    }
    select.moods {
      width: 4rem;
    }
    div.lock {
      width: 5rem;
    }
  }

  /* 내용 */
  textarea.diary-content {
    height: 500px;
  }

  /* Wrapper 저장  */
  article.save-btns {
    display: flex;
    flex-direction: row;
    gap: 1.2rem;

    /* 저장 버튼 */
    button.save-btn {
      padding: 0;

      &:hover {
        background-color: var(--color-hover);
        transition: 0.4s;
      }
    }
  }
`;
const LeftSide = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr;
  width: 100%;
  height: 100%;
  overflow: hidden;
  row-gap: 0.4rem;
  img {
    box-sizing: border-box;
    aspect-ratio: 262 / 252.46;
    width: 100%;
    height: 100%;
  }
`;

const LeftInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  justify-content: center;
  align-items: center;
  border: red 1px solid;
  row-gap: 1rem;
  column-gap: 0.3rem;
`;
const UserImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 100%;
`;
const WordInfo = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 1rem;
  div {
    /* display: flex;
    justify-content: center; */
    text-align: center;
    border: red 1px solid;
    border-radius: 1rem;
    padding: 0.5rem;
    box-shadow: 1px 1px 4px var(--color-shadow);
    background-color: #fbedfa;
    font-size: 20px;
  }
`;
const ImoInfo = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 1rem;
  div {
    display: flex;
    justify-content: center;
    border: red 1px solid;
    border-radius: 1rem;
    padding: 0.5rem;
    box-shadow: 1px 1px 4px var(--color-shadow);
    background-color: #fbedfa;
    font-size: 20px;
  }
`;
const RightSide = styled.div`
  border: 1px red solid;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 4fr 6fr;
  row-gap: 1rem;

  div {
    border-radius: 1rem;
    background-color: #fbedfa;
    text-indent: 10px;
  }
  div.write_content {
    padding: 0.7rem;
  }
`;

export interface FormValues {
  title: string;
  picture: string;
  pictureMethod: number;
  mood: number;
  lock: string;
  content: string;
  date: string;
}

const DiaryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rendering, reRendering] = useState(false);
  const [pickWay, setPickWay] = useState(0); //책갈피 선택 0: 그림 / 1: 사진
  const [lockBtn, setLockBtn] = useState(false);
  const file: any = useRef();
  const { boardInfo } = useSelector(
    (boardReducer: any) => boardReducer.boardInfo
  );

  const { userInfo, accessToken } = useSelector(
    (userReducer: any) => userReducer.userInfo
  );
  const { isEditOn } = useSelector((editReducer: any) => editReducer.editInfo);
  const [clickDrawing, setClickDrawing] = useState(false);
  const [drawingImg, setDrawingImg] = useState('');
  const [userImg, setUserImg] = useState('');
  const [boardInput, setBoardInput] = useState<FormValues>({
    title: '',
    picture: '',
    pictureMethod: 0,
    mood: 0,
    lock: 'UNLOCK',
    content: '',
    date: '',
  });

  const editModeHandler = () => {
    dispatch(editOnAction);
    reRendering(!rendering);
  };

  const pickPicture = () => {
    setPickWay(1);
    setBoardInput({ ...boardInput, ['pictureMethod']: 1, ['picture']: '' });
  };

  const pickDrowing = () => {
    setPickWay(0);
    setBoardInput({ ...boardInput, ['pictureMethod']: 0, ['picture']: '' });
  };
  const cancelButton = (): void => {
    setBoardInput({
      title: '',
      picture: '',
      pictureMethod: 0,
      mood: 0,
      lock: 'UNLOCK',
      content: '',
      date: '',
    });
    dispatch(deleteBoardInfo());
    navigate('/mainfeed');
  };

  const handleBoardInputValue = debounce(async (e: any) => {
    const { name, value } = e.target;
    setBoardInput({ ...boardInput, [name]: value });
    console.log('보드 정보는?', boardInput);
  });

  const boardLockHandler = () => {
    setLockBtn(!lockBtn);
    if (lockBtn) {
      setBoardInput({ ...boardInput, ['lock']: 'LOCK' });
    } else {
      setBoardInput({ ...boardInput, ['lock']: 'UNLOCK' });
    }
    console.log('보드?', boardInput);
  };

  const boardMoodHandler = (e: any) => {
    console.log('무드', e.target.value);
    setBoardInput({ ...boardInput, ['mood']: e.target.value });
    console.log('무드 바뀜?', boardInput);
  };

  const handleSaveBoard = () => {
    const { title, picture, content, date } = boardInput;

    if (title === '' || picture === '' || content === '' || date === '') {
      alert('내용을 작성해주세요');
      return;
    }
    if (boardInfo.title !== '' && boardInfo.content !== '') {
      boardApi
        .editBoard(boardInfo.id, boardInput, accessToken)
        .then((result) => {
          //dispatch(addBoardInfo(result.data[0]))
          console.log('리졸트', result);
          console.log('리졸트데이터', result.data);
          console.log('리졸트데이터데이터', result.data.data);
          dispatch(deleteBoardInfo());
        });
    } else {
      boardApi.createBoard(boardInput, accessToken).then((result) => {
        console.log('잘 저장됐나요?', result);
        alert('저장되었습니다');
        navigate('/mainfeed');
      });
    }
  };

  const DrawingHandler = () => {
    setClickDrawing(!clickDrawing);
  };
  const SaveDrawingHandler = (url: string) => {
    setDrawingImg(url);
  };
  const deleteWriting = () => {
    console.log('보드인풋', boardInput);
    console.log('보드인포', boardInfo.id);

    boardApi.deleteBoard(boardInfo.id, accessToken);
    window.history.back();
  };

  useMemo(() => {
    if (boardInfo.title !== '') {
      setPickWay(boardInfo.pictureMethod);
      setBoardInput({
        title: boardInfo.title,
        picture: boardInfo.picture,
        pictureMethod: boardInfo.picktureMethod,
        mood: boardInfo.mood,
        lock: boardInfo.lock,
        content: boardInfo.content,
        date: boardInfo.date,
      });

      feedApi.userInfo(boardInfo.nickname).then((result) => {
        setUserImg(result.data.data.userImage);
        console.log(userImg);
      });
    }

    console.log('유저인포', userInfo);
  }, []);

  useEffect(() => {
    console.log('rerender', rendering);
    console.log('수정모드', isEditOn);
  }, [rendering, isEditOn]);

  return (
    <>
      {
        // 일단 클릭시 보여지는 페이지-> 클릭 가능: 메인피드리스트
        // 유저아이디 같으면 수정버튼보여야함
        // 수정버튼 누르면 수정페이지로
      }
      <Container>
        {
          //새로 만들기
          isEditOn ? (
            <BookMark>
              <div className="Tag">
                <img src={bookmarkYellow} />
                <div className="TagName" onClick={pickPicture}>
                  사진
                </div>
              </div>
              <div className="Tag">
                <img src={bookmarkPink} />
                <div className="TagName" onClick={pickDrowing}>
                  그림
                </div>
              </div>
            </BookMark>
          ) : userInfo.nickname === boardInfo.nickname ? (
            <BookMark>
              <div className="Tag">
                <img src={bookmarkYellow} onClick={editModeHandler} />
                <div className="TagName">수정</div>
              </div>
              <div className="Tag">
                <img src={bookmarkPink} />
                <div className="TagName" onClick={deleteWriting}>
                  삭제
                </div>
              </div>
              {/* <button onClick={editModeHandler} >수정</button> */}
            </BookMark>
          ) : null
        }
        <LeftWrapper>
          {isEditOn ? (
            pickWay === 1 ? (
              <ImgDiv>
                <Photo boardInput={boardInput} setBoardInput={setBoardInput} />
              </ImgDiv>
            ) : (
              <Drawing
                boardInput={boardInput}
                setBoardInput={setBoardInput}
                DrawingHandler={DrawingHandler}
                SaveDrawingHandler={SaveDrawingHandler}
                drawingImg={drawingImg}
              />
            )
          ) : (
            <LeftSide>
              <LeftInfo>
                <UserImg src={userImg} />
                <WordInfo>
                  <div>{boardInfo.nickname}</div>
                  <div>{boardInput.date}</div>
                </WordInfo>
                <ImoInfo>
                  {userInfo.nickname === boardInfo.nickname ? (
                    boardInput.lock === 'UNLOCK' ? (
                      <div>
                        <GrUnlock />
                      </div>
                    ) : (
                      <div>
                        <GrLock />
                      </div>
                    )
                  ) : null}
                  <div>
                    {boardInput.mood === 0
                      ? '행복'
                      : boardInput.mood === 1
                      ? '좋음'
                      : boardInput.mood === 2
                      ? '보통'
                      : boardInput.mood === 3
                      ? '우울'
                      : '화남'}
                  </div>
                </ImoInfo>
              </LeftInfo>
              <img src={boardInput.picture} />
            </LeftSide>
          )}
        </LeftWrapper>
        <RightWrapper>
          {isEditOn ? (
            <form id="writeDiary">
              <input
                name="title"
                type="text"
                className="diary"
                placeholder="제목을 입력해 주세요."
                onChange={handleBoardInputValue}
                defaultValue={boardInfo.title}
              />
              <article className="select-wrapper">
                <input
                  type="date"
                  className="diary dates"
                  name="date"
                  onChange={handleBoardInputValue}
                  defaultValue={boardInput.date}
                />
                <select className="moods" onClick={boardMoodHandler}>
                  <option value="0">행복</option>
                  <option value="1">좋음</option>
                  <option value="2">보통</option>
                  <option value="3">우울</option>
                  <option value="4">화남</option>
                </select>
                <div className="diary lock" onClick={boardLockHandler}>
                  {boardInput.lock === 'UNLOCK' ? <GrUnlock /> : <GrLock />}
                </div>
              </article>
              <textarea
                name="content"
                className="diary diary-content"
                placeholder="내용을 입력해 주세요."
                onChange={handleBoardInputValue}
                defaultValue={boardInput.content}
              />
              <article className="save-btns">
                <button className="diary save-btn" onClick={cancelButton}>
                  취소
                </button>
                <button
                  type="submit"
                  className="diary save-btn"
                  onClick={handleSaveBoard}
                >
                  저장
                </button>
              </article>
            </form>
          ) : (
            <RightSide>
              <div className="write_content">{boardInput.title}</div>
              <div className="write_content">{boardInput.content}</div>
              <Comments boardId={boardInfo.id} />
            </RightSide>
          )}
        </RightWrapper>
      </Container>
    </>
  );
};

export default DiaryPage;
