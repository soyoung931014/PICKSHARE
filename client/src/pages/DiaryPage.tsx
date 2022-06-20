/* eslint-disable */
import background from '../img/feedBG.jpg';
import styled from 'styled-components';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { addBoardInfo, deleteBoardInfo, diaryOffAction, editOffAction, editOnAction } from '../redux/actions';
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
import { useDispatch } from 'react-redux';
import Comments from '../component/Comment/Comments';
import { BsEmojiAngry, BsEmojiFrown, BsEmojiLaughing, BsEmojiNeutral, BsEmojiSmile } from 'react-icons/bs';
import { AnyMap } from 'immer/dist/internal';
import { CostExplorer } from 'aws-sdk';

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
  height: 100%;
  background-image: url(${background});
  background-size: cover;
  background-attachment: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

// ---- 일기장 Wrapper CSS ----
const wrapperStyle = styled.div`
  border: purple 1px solid;
  height: 699px;
  width: 38rem;
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

  @media screen and (max-width: 900px) {
    top: 0px;
    left: -300px;
  }
`
const Book = styled.button<{ Yellow?: any }>`
  background-image: ${(props) => (
    props.Yellow 
    ? `url(${bookmarkYellow})` 
    : `url(${bookmarkPink})`
  )};
  background-color: transparent;
  background-size: cover;
  width: 83px;
  height: 41px;
  &:hover {
      cursor: pointer;
      /* transform: scale(1.3, 0) translate(-9px, 0px) */
    }
`
const LeftWrapper = styled(wrapperStyle)`
  border: red solid 1px;
  box-shadow: 1px 4px 10px var(--color-shadow);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  div.select-wrapper {
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
  div.save-btns {
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
  row-gap:0.4rem;
  img {
    box-sizing: border-box;
    aspect-ratio: 262 / 252.46;
    width: 100%;
    height: 100%;
  }
`

const LeftInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  justify-content: center;
  align-items: center;
  border: red 1px solid;
  row-gap: 1rem;
  column-gap: 0.3rem;
`
const UserImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 100%;
`
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
    background-color: #FBEDFA;
    font-size: 20px;
  }
`
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
    background-color: #FBEDFA;
    font-size: 20px;
  }
`
const RightSide = styled.div`
  border: 1px red solid;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 4fr 6fr;
  row-gap: 1rem;
  
  div{
    border-radius: 1rem;
    background-color:#FBEDFA;
    text-indent: 10px;
  }
  div.write_content{
    padding:0.7rem;
  }

`

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
  const dispatch = useDispatch();
  const [rendering, setRendering] = useState(false)
  const [pickWay, setPickWay] = useState(0); //책갈피 선택 0: 그림 / 1: 사진
  const [ lockBtn, setLockBtn ] = useState(false);
  const file: any = useRef();
  const { boardInfo } = useSelector((boardReducer: any) => boardReducer.boardInfo);
  const { userInfo, accessToken } = useSelector((userReducer: any) => userReducer.userInfo);
  const { isEditOn } = useSelector((editReducer: any) => editReducer.editInfo);
  const { isDiaryOn } = useSelector((diaryReducer: any) => diaryReducer.diaryInfo);
  const { isModalOn } = useSelector((modalReducer: any) => modalReducer.modalInfo);
  const [ userImg, setUserImg ] = useState('');
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
  }
  
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
      pictureMethod: 0,
      mood: 0,
      lock: 'UNLOCK',
      content: '',
      date: '',
    });
    dispatch(deleteBoardInfo());
    navigate('/mainfeed');
  };

  const handleBoardInputValue = debounce(async (e:any) => {
    const { name, value } = e.target;
    setBoardInput({...boardInput, [name]: value})
  });

  const boardLockHandler = () => {
    setLockBtn(!lockBtn);
    if(lockBtn){
      setBoardInput({...boardInput, ["lock"]: "LOCK"})
    } else {
      setBoardInput({...boardInput,["lock"]: "UNLOCK"})
    }
  };

  const boardMoodHandler = (e:any) => {
    setBoardInput({...boardInput, ["mood"]: e.target.value});
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
    }else {
      dispatch(addBoardInfo(boardInput))
      boardApi.createBoard(boardInput, accessToken)
      .then((result) => {

        dispatch(addBoardInfo(result.data))
        console.log('다이어리온',isDiaryOn)
        // navigate('/mainfeed')
        dispatch(diaryOffAction)
        console.log('다이어리온',isDiaryOn)
      })
    }
  };

  const handleEditBoard = () => {
    const {title, picture, content, date} = boardInput;
    if(
      title === '' ||
      picture === '' ||
      content === '' ||
      date === ''
    ){
      return alert('내용을 작성해주세요')
    }
    console.log('수정모드')

    boardApi.editBoard(boardInfo.id, boardInput, accessToken)
    .then((result) => {

      dispatch(addBoardInfo(result.data))
      dispatch(editOffAction)
    })
  };

  const deleteWriting = () => {
    boardApi.deleteBoard(boardInfo.id, accessToken)
    window.history.back();
  };

  const handleConfirm = (e:any) => {
    console.log('e는?',e)
    let text = e.target.name
    let result: any = confirm(`게시글을 ${text} 하시겠습니끼?`);

    if(text === '삭제') {
      if(result){
        alert(`${text}되었습니다.`)
        return deleteWriting();
      }{
        alert('취소되었습니다.')
      }
    } else if(text === '저장') {
      if(result){
        alert(`${text}되었습니다.`)
        return handleSaveBoard();
      }{
        alert('취소되었습니다.')
      }
    } else {
      if(result){
        alert(`${text}되었습니다.`)
        return handleEditBoard();
      }{
        alert('취소되었습니다.')
      }
    }
  }

  useEffect(()=>{
    if(boardInfo.title !== undefined || ''){
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

      console.log('리덕스 후', boardInfo.pictureMethod)

      feedApi.userInfo(boardInfo.nickname)
      .then((result) => {
        setUserImg(result.data.data.userImage);
      })
    }
  },[])

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
          isEditOn || isDiaryOn ?
          (
            <BookMark>
                <Book Yellow onClick={pickPicture}>사진</Book>
                <Book onClick={pickDrowing}>그림</Book>
            </BookMark>
          ) : (
            userInfo.nickname === boardInfo.nickname ?
            (
              <BookMark>
                <Book Yellow onClick={editModeHandler} >수정</Book>
                <Book name='삭제' onClick={(e) => handleConfirm(e)} >삭제</Book>
              </BookMark>
            ) : null
          ) 
        }
        <LeftWrapper>
          {
            isEditOn || isDiaryOn ? //수정모드
            (
              pickWay === 1 
              ? (
                <ImgDiv>
                  <Photo boardInput={boardInput} setBoardInput={setBoardInput}/>
                </ImgDiv>
              ) : (
                <Drawing 
                  boardInput={boardInput}
                  setBoardInput={setBoardInput}
                  setPickWay={setPickWay}
                />
              )
            ) : (
              <LeftSide>
                <LeftInfo>
                  <UserImg src={userImg}/>
                  <WordInfo>
                    <div>{boardInfo.nickname}</div>
                    <div>{boardInput.date}</div>
                  </WordInfo>
                  <ImoInfo>
                      {
                        userInfo.nickname === boardInfo.nickname ? 
                        (
                          boardInput.lock === "UNLOCK" 
                          ? <div >
                              <GrUnlock />
                            </div>
                          : <div >
                              <GrLock />
                            </div>
                        ) : null
                      }
                    <div>
                      {
                        boardInput.mood === 0 ? <BsEmojiLaughing />
                        : boardInput.mood === 1 ? <BsEmojiSmile />
                        : boardInput.mood === 2 ? <BsEmojiNeutral />
                        : boardInput.mood === 3 ? <BsEmojiFrown />
                        : <BsEmojiAngry />
                      }
                    </div>
                  </ImoInfo>
                </LeftInfo>
                <img src={boardInput.picture} />
              </LeftSide>
            )
          }
        </LeftWrapper>
        <RightWrapper>
          {
            isEditOn || isDiaryOn ?
            (
            <form id='writeDiary'>
              <input
                name='title'
                type="text"
                className="diary"
                placeholder="제목을 입력해 주세요."
                onChange={handleBoardInputValue}
                defaultValue={boardInfo.title}
              />
              <div className="select-wrapper">
                <input
                  type="date"
                  className="diary dates"
                  name='date'
                  onChange={handleBoardInputValue}
                  defaultValue={boardInput.date}
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
                    ? <GrUnlock /> 
                    : <GrLock />
                  }
                </div>
              </div>
              <textarea
                name='content'
                className="diary diary-content"
                placeholder="내용을 입력해 주세요."
                onChange={handleBoardInputValue}
                defaultValue={boardInput.content}
              />
              <div className="save-btns">
                <button className="diary save-btn" onClick={cancelButton}>취소</button>
                {
                  isDiaryOn ? (
                    <button
                    type="button"
                    className="diary save-btn"
                    name='저장'
                    onClick={(e) => handleConfirm(e)}
                  >
                    저장
                  </button>
                  ) : isEditOn ? (
                    <button
                    type="button"
                    className="diary save-btn"
                    name='수정'
                    onClick={(e) => handleConfirm(e)}
                  >
                    수정
                  </button>
                  ): null
                }
              </div>
            </form>
            ):(
              <RightSide>
                <div className="write_content">{boardInput.title}</div>
                <div className="write_content">{boardInput.content}</div>
                <Comments />
              </RightSide>
            )
          }
        </RightWrapper>
      </Container>
    </>
  );
};

export default DiaryPage;
