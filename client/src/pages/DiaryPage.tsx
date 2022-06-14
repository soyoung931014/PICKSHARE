/* eslint-disable */
import background from '../img/feedBG.jpg';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useEffect, useRef, useState } from 'react';
import { addBoardInfo } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import bookmarkPink from '../img/bookmark-pink.png';
import bookmarkYellow from '../img/bookmark-yellow.png';
import Photo from '../component/Diary/Photo';
import Drawing from '../component/Diary/Drawing';
import { debounce } from 'debounce';
import { GrLock, GrUnlock } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import boardApi from '../api/board';
import { board } from '../redux/reducers/boardReducer/boardReducer';
import { edit } from '../redux/reducers/editReducer/editReducer';

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
  display: flex;
  flex-direction: column;
  &:hover {
    cursor: pointer;
  }
`
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
`
const Img = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`
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

 export interface FormValues {
  title: string;
  picture: string;
  pictureMethod: number;
  mood: number;
  lock: string;
  content: string;
  date: string;
};

const DiaryPage = () => {
  const navigate = useNavigate();
  const [pickWay, setPickWay] = useState(0); //책갈피 선택 0: 그림 / 1: 사진
  const [ lockBtn, setLockBtn ] = useState(false);
  const file: any = useRef();
  const { boardInfo } = useSelector((boardReducer: any) => boardReducer.boardInfo)
  console.log('제발',boardInfo)
  console.log('제발제목', boardInfo.title)
  const { accessToken } = useSelector((userReducer: any) => userReducer.userInfo)
  const { isEditOn } = useSelector((editReducer: edit) => editReducer)
  console.log(isEditOn)
  const [boardInput, setBoardInput] = useState<FormValues>({
    title: '',
    picture: '',
    pictureMethod: 0,
    mood: 0,
    lock: 'UNLOCK',
    content: '',
    date: '',
  });
  
  const pickPicture = () => {
    setPickWay(1);
    setBoardInput({...boardInput, ["pictureMethod"]: 1, ["picture"]: ''});
  };

  const pickDrowing =() => {
    setPickWay(0);
    setBoardInput({...boardInput, ["pictureMethod"]: 0, ["picture"]: ''});
  };
  const cancelButton = (): void => {
    setBoardInput({
      title: '',
      picture: '',
      pictureMethod: 1,
      mood: 0,
      lock: 'UNLOCK',
      content: '',
      date: '',
    });
    navigate('/mainfeed');
  }

  const handleBoardInputValue = debounce(async (e:any) => {
    const { name, value } = e.target;
    setBoardInput({...boardInput, [name]: value})
    console.log('보드 정보는?',boardInput)
  });

  const boardLockHandler = () => {
    setLockBtn(!lockBtn);
    if(lockBtn){
      setBoardInput({...boardInput, ["lock"]: "LOCK"})
    } else {
      setBoardInput({...boardInput,["lock"]: "UNLOCK"})
    }
    console.log('보드?',boardInput)
  };

  const boardMoodHandler = (e:any) => {
    console.log('무드', e.target.value);
    setBoardInput({...boardInput, ["mood"]: e.target.value});
    console.log("무드 바뀜?", boardInput)
  }

  const handleSaveBoard = () => {
    const {title, picture, content, date} = boardInput;
    if(
      title === '' ||
      picture === '' ||
      content === '' ||
      date === ''
    ){
      return alert('내용을 작성해주세요')
    }
    boardApi.createBoard(boardInput, accessToken)
    .then((result) => {
      console.log('잘 저장됐나요?',result)
      alert('저장되었습니다');
      navigate('/mainfeed')
    })
  }
  useEffect(() => {
    if(boardInfo.title !== ''){
      setPickWay(boardInfo.pictureMethod);
      setBoardInput({
        title: boardInfo.title,
        picture: boardInfo.picture,
        pictureMethod: boardInfo.pictureMethod,
        mood: boardInfo.mood,
        lock: boardInfo.lock,
        content: boardInfo.content,
        date: boardInfo.date,
      })
      console.log('보드인포', boardInfo.title)
      console.log('들어갔나?', boardInput)
    }
  }, [])
  return (
    <>
      <Container>
        <BookMark>
          <button onClick={pickPicture}>사진</button>
          <button onClick={pickDrowing}>그림</button>
        </BookMark>
        <LeftWrapper>
          {
            pickWay === 1 
            ? (
              <ImgDiv>
                <Photo boardInput={boardInput} setBoardInput={setBoardInput}/>
              </ImgDiv>
            ) : (
              <Drawing 
                boardInput={boardInput}
                setBoardInput={setBoardInput}
                // DrawingHandler={DrawingHandler}
                // SaveDrawingHandler={SaveDrawingHandler}
                // drawingImg={drawingImg}
              />
            )
          }
        </LeftWrapper>
        <RightWrapper>
          <form id='writeDiary'>
            <input
              type="text"
              name='title'
              className="diary"
              placeholder="제목을 입력해 주세요."
              onChange={handleBoardInputValue}
              value={boardInfo.title}
            />
            <article className="select-wrapper">
              <input
                type="date"
                className="diary dates"
                name='date'
                onChange={handleBoardInputValue}
                value={boardInput.date}
              />

              <select
                className="moods"
                onClick={boardMoodHandler}
              >
                <option value="0">행복</option>
                <option value="1">좋음</option>
                <option value="2">보통</option>
                <option value="3">우울</option>
                <option value="4">화남</option>
              </select>
              <div
                className="diary lock"
                onClick={boardLockHandler}
              >
                {boardInput.lock === "UNLOCK" 
                  ? <GrLock />
                  : <GrUnlock />
                }
              </div>
            </article>
            <textarea
              name='content'
              className="diary diary-content"
              placeholder="내용을 입력해 주세요."
              onChange={handleBoardInputValue}
              value={boardInput.content}
            />
            <article className="save-btns">
              <button className="diary save-btn" onClick={cancelButton}>취소</button>
              <button
                type="submit"
                className="diary save-btn"
                onClick={handleSaveBoard}
              >
                저장
              </button>
            </article>
          </form>
        </RightWrapper>
      </Container>
    </>
  );
};

export default DiaryPage;
