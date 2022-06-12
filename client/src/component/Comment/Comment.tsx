/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import styled from 'styled-components';
import { BiPencil } from 'react-icons/bi';
import { CgTrash } from 'react-icons/cg';
import axios from 'axios';

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
  const update = () => {
    console.log('업뎃', id);
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
      <Content>{text}</Content>
      {userEmail === email ? (
        <>
          <Update onClick={update}>
            <BiPencil />
          </Update>
          <Delete onClick={deleteComment}>
            <CgTrash />
          </Delete>
        </>
      ) : null}
    </Wrapper>
  );
}

export default Comment;
