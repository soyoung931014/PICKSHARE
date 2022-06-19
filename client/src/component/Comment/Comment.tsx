/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import styled from 'styled-components';
import { BiPencil } from 'react-icons/bi';
import { CgTrash } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';
import commentApi from '../../api/comment';
//const AWS = require('aws-sdk/dist/aws-sdk-react-native');
import defaultprofileImg from '../../img/profileImg.png';
const Wrapper = styled.div`
  //border: solid red 2px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;
const UserInfo = styled.div`
  //border: solid teal 1px;
  display: flex;
`;
const Content = styled.div`
  //border: solid teal 2px;
  width: 50%;
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0.8;
  margin-right: 1rem;
  margin-left: 0.5rem;
`;
const Update = styled.div`
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
  }
`;
const Delete = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img<{ User?: any }>`
  //border: solid brown 1px;
  width: 2rem;
  padding: ${(props) => (props.User ? '2px' : '')};
  height: 10%;
  border-radius: 100%;
`;
const Nickname = styled.div`
  font-size: 0.9rem;
  font-weight: bolder;
  margin-top: 1px;
  opacity: 0.7;
`;

const Time = styled.div`
  font-size: 0.6rem;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  //align-items: center;
  margin-left: 8px;
  margin-right: 5px;
`;
const Input = styled.input`
  width: 50%;
  height: 2rem;
  margin-left: 0.7rem;
`;
const Check = styled.div`
  &:hover {
    cursor: pointer;
  }
  margin-left: 1rem;
`;
function Comment(props: any) {
  // console.log(props, 'props');
  const { userEmail, setUpdateComment, updateComment, boardId } = props;
  const { email, nickname, userImage } = props.userInfo; //email
  const { id, text, updated_at } = props.comment; //id
  const date: any = updated_at.slice(0, 10);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateText, setUpdateText] = useState({ text: text });

  /* AWS.config.update({
    region: `${process.env.REACT_APP_AWS_REGION}`, // congito IdentityPoolId 리전을 문자열로 입력하기. 아래 확인 (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: `${process.env.REACT_APP_AWS_IMG_ID}`, // cognito 인증 풀에서 받아온 키를 문자열로 입력하기. (Ex. "ap-northeast-2...")
    }),
  }); */

  const updatecheck = async () => {
    console.log('업뎃체크', id);
    try {
      const { text } = updateText;
      await commentApi.PatchComment(boardId, id, text).then((res) => {
        console.log(res);
        setOpenUpdate(!openUpdate);
        setUpdateComment(!updateComment);
      });
    } catch (error) {
      return error;
    }
  };
  const deleteComment = async () => {
    console.log('삭제', id);
    try {
      await commentApi.DeleteComment(boardId, id).then((res) => {
        console.log(res);
        setUpdateComment(!updateComment);
      });
    } catch (error) {
      return error;
    }
  };
  return (
    <Wrapper>
      <UserInfo>
        {userImage === 'nothing' ? (
          <>
            <Img src={defaultprofileImg} />
          </>
        ) : (
          <>
            <Img User src={userImage} />
          </>
        )}

        <Div>
          <Nickname>{nickname}</Nickname>
          <Time>{date}</Time>
        </Div>
      </UserInfo>
      {!openUpdate ? (
        <>
          <Content>{text}</Content>
          {userEmail === email ? (
            <>
              <Update onClick={() => setOpenUpdate(!openUpdate)}>
                <BiPencil style={{ color: '#d06be0', fontSize: '1.1rem' }} />
              </Update>
              <Delete onClick={deleteComment}>
                <CgTrash style={{ color: '#d06be0', fontSize: '1.1rem' }} />
              </Delete>
            </>
          ) : null}
        </>
      ) : (
        <>
          <Input
            type="text"
            placeholder={text}
            //value={text}
            name="text"
            onChange={(e: any) => {
              setUpdateText({ ...updateText, [e.target.name]: e.target.value });
              //console.log(e.target.value);
            }}
          />
          <Check>
            <FaCheck onClick={updatecheck} style={{ color: '#d06be0' }} />
          </Check>
        </>
      )}
    </Wrapper>
  );
}

export default Comment;
