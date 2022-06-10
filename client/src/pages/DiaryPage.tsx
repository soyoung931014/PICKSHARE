/* eslint-disable */
import background from '../img/diaryBackground.png';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useRef, useState } from 'react';
import { addBoardInfo } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import bookmarkPink from '../img/bookmark-pink.png';
import bookmarkYellow from '../img/bookmark-yellow.png';

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
    button.lock {
      width: 5rem;
      padding: 0;
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

type FormValues = {
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
  // const [pickImg, setPickImg] = useState(null); //이미지파일 url  
  
  const file: any = useRef();
  const [boardInput, setBoardInput] = useState<FormValues>({
    title: '',
    picture: '',
    pictureMethod: 0,
    mood: 0,
    lock: 'UNLOCK',
    content: '',
    date: '',
  });
  
  AWS.config.update({
    region: 'us-east-1', // congito IdentityPoolId 리전을 문자열로 입력하기. 아래 확인 (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:156ae187-f9d1-49d9-86f7-ad7f49675cbd', // cognito 인증 풀에서 받아온 키를 문자열로 입력하기. (Ex. "ap-northeast-2...")
    }),
  });

  const pickImgHandle = async(e: React.ChangeEvent<HTMLInputElement>) => {
    //const target = e.target as HTMLInputElement
    const imgFile = e.target.files[0];
    /* 개체가 null인 것 같습니다 에러 없애기 위해
      1. e: any로 타입지정
      2. tsconfig.json에서 "sstrictNullChecks":"false"설정
      3. 유니온타입설정
    */
    if(!imgFile){
      return setBoardInput({
        ...boardInput,
        [e.target.name]: '',
      });
    }
    setBoardInput({
      ...boardInput,
      [e.target.name]: imgFile
    })
    const uploadImg = new AWS.S3.ManagedUpload({
      params:{
        Bucket: 'profileimage-pickshare',
        Key: imgFile.name,
        Body: imgFile,
      },
    });

    const promise = uploadImg.promise();

    await promise.then(
      (data: { Location: any }) => {
        setBoardInput({
          ...boardInput,
          [e.target.name]: data.Location
        });
      },
      (err: any) => {
        console.log(err)
      }
    );
  };
  

  // const PostingHandler = (e: any) => {
  //   e.preventDefault();
  //   console.log(boardInfo);
  //   if (boardInfo) {
  //     axios
  //       .post(`http://localhost:5000/post`, boardInfo)
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  // const goToStore = async (boardInfo: any) => {
  //   await boardInfoToStore(boardInfo);
  // };


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

  return (
    <>
      <Container>
        <BookMark>
          <img src={bookmarkPink} />
          <img src={bookmarkYellow} />
        </BookMark>
        <LeftWrapper>
          <ImgDiv>
            <label htmlFor="pick-file"></label>
            <form>        
              <input
                type="file"
                id="pickFile"
                ref={file}
                accept="image/*"
                onChange={pickImgHandle}
                name="picture"
              />
              {boardInput.picture !== '' ? <Img src={boardInput.picture} alt= 'picture' /> : 'Pick the PickShare'}
            </form>
          </ImgDiv>
        </LeftWrapper>
        <RightWrapper>
          <form className="form-wrapper">
            <input
              type="text"
              className="diary"
              placeholder="제목을 입력해 주세요."
              //{...register('title')}
            />
            <article className="select-wrapper">
              <input
                type="date"
                className="diary dates"
                //{...register('date')}
              />

              <select
                className="moods"
                //{...register('mood')}
              >
                <option value="0">행복</option>
                <option value="1">좋음</option>
                <option value="2">보통</option>
                <option value="3">우울</option>
                <option value="4">화남</option>
              </select>
              <button
                className="diary lock"
                //</article>{...register('lock')}
              >
                잠금
              </button>
            </article>
            <textarea
              className="diary diary-content"
              placeholder="내용을 입력해 주세요."
              // {...register('content')}
            />
            <article className="save-btns">
              <button className="diary save-btn" onClick={cancelButton}>취소</button>
              <button
                //onClick={PostingHandler}
                type="submit"
                className="diary save-btn"
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
