/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import commentApi from '../../api/comment';

const Wrapper = styled.div`
  border: solid black 2px;
  padding: 1rem;
`;
const CommentsListBox = styled.div`
  //border: dotted black 2px;
  height: 50vh;
`;
const CommentBox = styled.div`
  //border: dotted black 2px;
  height: 2.2rem;
  margin-top: 13px;
`;

const Input = styled.input`
  border: solid #a396f8 2px;
  border-radius: 5px;
  width: 80vw;
  height: 1rem;
  font-size: 1rem;
  padding: 0.8rem;
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
function CommentSection({ user }: any) {
  console.log(user);
  const { isLogin, accessToken } = user;
  const { email } = user.userInfo;
  //console.log(isLogin);
  const inputComment: any = useRef();
  const navigate = useNavigate();
  const [commentdata, setCommentdata] = useState([]);
  const [sendComment, setSendComment] = useState({
    text: '',
  });
  const [updatecomment, setUpdateComment] = useState(false);
  useEffect(() => {
    void commentApi.findAllComment().then((res) => {
      setCommentdata(res.data.data);
    });
  }, [updatecomment]);

  const send = async () => {
    try {
      await axios
        .post(
          `http://localhost:5000/comment`,
          {
            text: sendComment.text,
            board_id: 1,
          },
          {
            headers: { authorization: `Bearer ${accessToken}` },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            setUpdateComment(!updatecomment);
            inputComment.current.value = '';
            console.log(res);
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
        {commentdata === [] ? (
          <></>
        ) : (
          commentdata.map((el: any) => (
            <Comment
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
