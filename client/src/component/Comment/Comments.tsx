/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import commentApi from '../../api/comment';

const Wrapper = styled.div`
  padding: 1rem;
  box-shadow: 10px 5px 8px #3c4a5645;
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

// 🚀 위 컴포넌트에서 게시글 번호 받아오기
function CommentSection({ user, boardId }: any) {
  const { isLogin, accessToken } = user;
  const { email } = user.userInfo;
  const inputComment: any = useRef();
  const navigate = useNavigate();
  const [commentdata, setCommentdata] = useState([]);
  const [sendComment, setSendComment] = useState({
    text: '',
  });
  const [updatecomment, setUpdateComment] = useState(false);

  useEffect(() => {
    commentApi.findAllComment(boardId).then((res) => {
      setCommentdata(res.data.data);
    });
  }, [updatecomment]);

  const send = async () => {
    const { text } = sendComment;
    try {
      await commentApi.PostComment(boardId, text, accessToken).then((res) => {
        if (res.status === 201) {
          setUpdateComment(!updatecomment);
          inputComment.current.value = '';
        } else {
          return;
        }
      });
    } catch (error) {
      return error;
    }
  };
  return (
    <Wrapper>
      <CommentsListBox>
        {commentdata === undefined ? (
          <></>
        ) : (
          commentdata.map((el: any) => (
            <Comment
              boardId={boardId}
              {...el}
              key={el.comment.id}
              userEmail={email}
              setUpdateComment={setUpdateComment}
              updateComment={updatecomment}
            />
          ))
        )}
      </CommentsListBox>
      <CommentBox>
        <Input
          type="text"
          ref={inputComment}
          name="text"
          placeholder="댓글을 작성하세요"
          onChange={(e: any) => {
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

const mapStateToProps = (state: any) => {
  return {
    user: state.userInfo,
  };
};
export default connect(mapStateToProps, null)(CommentSection);
