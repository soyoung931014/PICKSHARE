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
            setSendComment({ ...sendComment, [e.target.name]: e.target.value });
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
  border: solid red 2px;
`;
const CommentsListBox = styled.div`
  height: 65%;
`;
const CommentBox = styled.div`
  height: 2.2rem;
  margin-top: 4rem;
`;

const Input = styled.input`
  border: solid #a396f8 2px;
  border-radius: 5px;
  height: 1rem;
  font-size: 1rem;
  padding: 0.8rem;
  width: 27rem;
  color: #3a3939;
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
