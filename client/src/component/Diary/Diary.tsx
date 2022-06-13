/* eslint-disable */
import background from '../img/diaryBackground.png';
import axios from 'axios';
import { connect } from 'react-redux'; 
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useRef, useState } from 'react';
import { addBoardInfo } from '../../redux/actions';
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
const LeftWrapper = styled(wrapperStyle)`
  box-shadow: 1px 4px 10px var(--color-shadow);
  display: flex;
  flex-direction: column;
  justify-content: center;
  input.img-input {
    width: 100%;
    height: 500px;
    background-color: grey;
  }
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

const Diary = () => {
  // const { boardInfoToStore } = props;
  // // const file: string = useRef();
  // // console.log(file.current.value);

  // // const imageFile = e.target.files[0];
  // type FormValues = {
  //   title: string;
  //   picture: string;
  //   pictureMethod: number;
  //   mood: number;
  //   lock: string;
  //   content: string;
  //   date: string;
  // };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormValues>();

  // const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
  // const [boardInfo, setBoardInfo] = useState<FormValues>({
  //   title: '',
  //   picture: '',
  //   pictureMethod: 1,
  //   mood: 0,
  //   lock: 'UNLOCK',
  //   content: '',
  //   date: '',
  // });

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

  return (
    <>
      <Container>
        <LeftWrapper>
          {/* <label htmlFor="up-file">파일 찾기</label>
          <input
            type="file"
            name="file"
            className="img-input"
            id="up-file"
            accept="image/*"
          />
          <button className=""></button> */}
          {/* <form>
            <Input
            // ref={}
            onChange={onLoadFile}
              type="file"
              name="file"
              accept="image/*"
              />
            </form> */}
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
              <button className="diary save-btn">취소</button>
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

// const mapStateToProps = (state: object) => {
//   console.log('a', state);

//   return {
//     boardInfo: state,
//   };
// };
// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     boardInfoToStore: (boardInfo: object, token: string) => {
//       dispatch(addBoardInfo(boardInfo, token));
//     },
//   };
// };

export default Diary;
