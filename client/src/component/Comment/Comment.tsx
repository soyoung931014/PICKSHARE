/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import styled from 'styled-components';
import { BiPencil } from 'react-icons/bi';
import { CgTrash } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { AnyAaaaRecord, AnyARecord } from 'node:dns';

const Wrapper = styled.div`
  border: solid red 2px;
  display: flex;
  //justify-content: center;
  align-items: center;
`;
const UserInfo = styled.div`
  border: solid teal 1px;
  display: flex;
`;
const Content = styled.div`
  width: 40%;
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
function Comment(props: any) {
  console.log(props, 'props');
  const { userEmail, setUpdateComment, updateComment } = props;
  const { email, nickname, userImage } = props.userInfo; //email
  const { id, text, updated_at } = props.comment; //id
  const date: any = updated_at.slice(0, 10);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateText, setUpdateText] = useState({ text: text });

  const updatecheck = async () => {
    console.log('업뎃체크', id);
    await axios
      .patch(`http://localhost:3001/comment/1`, {
        comment_id: id,
        text: updateText.text,
      })
      .then((res) => {
        console.log(res);
        setOpenUpdate(!openUpdate);
        setUpdateComment(!updateComment);
      });
  };
  const deleteComment = async () => {
    console.log('삭제', id);
    try {
      await axios
        .delete(`http://localhost:3001/comment/1`, {
          data: { comment_id: id },
        })
        .then((res) => {
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
        <div>{userImage}</div>
        <div>
          <div>{nickname}</div>
          <div>{date}</div>
        </div>
      </UserInfo>
      {!openUpdate ? (
        <>
          <Content>{text}</Content>
          {userEmail === email ? (
            <>
              <Update onClick={() => setOpenUpdate(!openUpdate)}>
                <BiPencil />
              </Update>
              <Delete onClick={deleteComment}>
                <CgTrash />
              </Delete>
            </>
          ) : null}
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder={text}
            name="text"
            onChange={(e: any) =>
              setUpdateText({ ...updateText, [e.target.name]: e.target.value })
            }
          />
          <FaCheck onClick={updatecheck} />
        </>
      )}
    </Wrapper>
  );
}

export default Comment;
