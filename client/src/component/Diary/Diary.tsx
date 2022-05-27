import background from '../../../src/img/diaryBackground.png';
import axios from 'axios';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

// const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//   // Preventing the page from reloading
//   e.preventDefault();
//   const formData = new FormData();
//   formData.append('file', e.target.files[0]);
// };

// const [files, setFiles] = React.useState<string>();

// const onLoadFile = (e: any) => {
//   const file: any = e.target.files;
//   console.log(file);
//   setFiles(file);
// };

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

// ---- style components ----
const wrapperStyle = styled.article`
  height: 670px;
  width: 600px;
  padding: 3.8rem 2rem;
  border-radius: 1rem;
  background-color: var(--color-white);
`;

/*
  Right
    Title
    Date
    Mood
    Lock
    Content
    Button
*/

const LeftWrapper = styled(wrapperStyle)`
  box-shadow: 1px 4px 10px var(--color-shadow);
`;

const RightWrapper = styled(wrapperStyle)`
  box-shadow: 15px 4px 8px var(--color-shadow);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  /* Wrapper (Date, Mood, Lock) */
  article.input-select {
    display: inline-flex;
    select.moods {
    }
  }

  /* 기본 input css */
  input.diary,
  select.moods,
  button.diary,
  textarea.diary {
    width: 100%;
    height: 50px;
    box-shadow: 1px 1px 4px var(--color-shadow);
    background-color: var(--color-input);
    border-radius: 1rem;
    font-size: 18px;
    padding: 1rem;
  }
  /* content */
  textarea.diary-content {
    height: 500px;
  }

  /* save button */
  article.save-btns {
    display: flex;
    flex-direction: row;
    gap: 1.2rem;

    button.save-btn {
      &:hover {
        background-color: var(--color-input);
      }
    }
  }
`;
// const config = {
//   'Content-Type': 'application/json',
// };

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

// const submitHandler = (data) => {};

const Diary = () => {
  return (
    <>
      <Container>
        <LeftWrapper>
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
          <input
            type="text"
            className="diary"
            placeholder="제목을 입력해 주세요."
          />
          <article className="input-select">
            <input type="date" className="diary" />

            <select name="mood" className="moods">
              <option value="1">행복</option>
              <option value="2">좋음</option>
              <option value="3">보통</option>
              <option value="4">우울</option>
              <option value="5">화남</option>
            </select>
          </article>
          <textarea
            className="diary diary-content"
            placeholder="내용을 입력해 주세요."
          />
          <article className="save-btns">
            <button className="diary save-btn">취소</button>
            <button className="diary save-btn">저장</button>
          </article>
        </RightWrapper>
      </Container>
    </>
  );
};

export default Diary;
