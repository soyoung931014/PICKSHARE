import React, { useState } from 'react';
import styled from 'styled-components';

import commentApi from '../../api/comment';

import { BiPencil } from 'react-icons/bi';
import { CgTrash } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';
import defaultprofileImg from '../../img/profileImg.png';

import { commentInfo, info } from '../../types/commentType';

export interface CommentProps {
  comment: commentInfo;
  userInfo: info;
  userEmail: string;
  setUpdateComment: (state: boolean) => void;
  updateComment: boolean;
  boardId: number;
}
function Comment({
  comment,
  userInfo,
  userEmail,
  setUpdateComment,
  updateComment,
  boardId,
}: CommentProps) {
  const { email, nickname, userImage } = userInfo; //email
  const { id, text, updated_at } = comment; //id
  const date: any = updated_at.slice(0, 10);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateText, setUpdateText] = useState({ text: text });

  const updatecheck = async () => {
    try {
      const { text } = updateText;
      await commentApi.PatchComment(boardId, id, text).then(() => {
        setOpenUpdate(!openUpdate);
        setUpdateComment(!updateComment);
      });
    } catch (error) {
      return error;
    }
  };
  const deleteComment = async () => {
    try {
      await commentApi.DeleteComment(boardId, id).then(() => {
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
            name="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdateText({ ...updateText, [e.target.name]: e.target.value });
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
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;
const UserInfo = styled.div`
  display: flex;
`;
const Content = styled.div`
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

const Img = styled.img<{ User?: boolean }>`
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
