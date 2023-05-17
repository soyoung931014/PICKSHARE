import React, { useEffect, useState, Ref, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import commentApi from '../../api/comment';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import Comment from './Comment';

import { RootState } from '../../redux';
import { comInfoData, commentDataArr } from '../../types/commentType';

export interface CommentSectionProps {
  boardId?: number;
}

function CommentSection({ boardId }: CommentSectionProps) {
  const {
    isLogin,
    userInfo: { email },
    accessToken,
  } = useSelector((selector: RootState) => selector.userInfo);

  const navigate = useNavigate();

  const inputComment: Ref<HTMLInputElement> = useRef();
  const [commentdata, setCommentdata] = useState<comInfoData[]>([]);
  const [sendComment, setSendComment] = useState({
    text: '',
  });
  const [updatecomment, setUpdateComment] = useState(false);

  useEffect(() => {
    commentApi
      .findAllComment(boardId)
      .then((res: commentDataArr) => {
        setCommentdata(res.data.data);
      })
      .catch((error) => console.log(error));
  }, [updatecomment]);

  const send = async () => {
    const { text } = sendComment;
    try {
      await commentApi.PostComment(boardId, text, accessToken).then((res) => {
        if (res.status === 201) {
          setUpdateComment(!updatecomment);
          inputComment.current.value = '';
        } else return;
      });
    } catch (error) {
      return error;
    }
  };
  return (
    <Wrapper>
      <CommentsListBox>
        {!commentdata
          ? null
          : commentdata.map(({ comment, userInfo }: comInfoData) => (
              <Comment
                boardId={boardId}
                comment={comment}
                userInfo={userInfo}
                key={comment.id}
                userEmail={email}
                setUpdateComment={setUpdateComment}
                updateComment={updatecomment}
              />
            ))}
      </CommentsListBox>
      <CommentBox>
        <Input
          type="text"
          ref={inputComment}
          name="text"
          placeholder="댓글을 작성하세요"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSendComment({
              ...sendComment,
              [e.target.name]: e.target.value,
            });
          }}
        />

        {isLogin ? (
          <Button onClick={send}>send</Button>
        ) : (
          <Button
            onClick={() => {
              alert('로그인해야 이용가능한 서비스입니다.');
              navigate('/login', { replace: true });
            }}
          >
            send
          </Button>
        )}
      </CommentBox>
    </Wrapper>
  );
}

export default CommentSection;

const Wrapper = styled.div`
  padding: 1rem;
  box-shadow: 10px 5px 8px #3c4a5645;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const CommentsListBox = styled.div`
  height: 90%;
  width: 100%;
  overflow-y: scroll;
  border: solid 2px #e7dbdb;
  padding: 10px;
  margin-bottom: 10px;
`;
const CommentBox = styled.div`
  height: 2.2rem;
  padding: 1px;
  width: 32rem;
  display: flex;
`;

const Input = styled.input`
  border: solid #a396f8 2px;
  border-radius: 5px;
  height: 1rem;
  font-size: 1rem;
  padding: 0.8rem;
  color: #3a3939;
  margin-left: 5px;
  width: 87%;
  @media screen and (max-width: 607px) {
    flex: 1 auto;
  }
`;
const Button = styled.button`
  font-size: 1rem;
  width: 3rem;
  height: 2rem;
  margin-left: 8px;
  color: white;
  border-radius: 5px;
  background: linear-gradient(to right, #a396f8, #d06be0, #fd40c8);
  &:hover {
    cursor: pointer;
  }
`;
