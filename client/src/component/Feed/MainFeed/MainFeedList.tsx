/*eslint-disable*/
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// export {};
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BsSuitHeart } from "react-icons/bs";
import { BsSuitHeartFill } from "react-icons/bs";
import feedApi from '../../../api/feed';
import { useSelector } from 'react-redux';
import { auth } from '../../../redux/reducers/userReducer/userReducer';

const Div = styled.div`
`
const ImgDiv = styled.div`
`
const Img = styled.img``
const ContentDiv = styled.div`
  border: red solid 1px;
`
const ContentRightDiv = styled.div``
const UserImg = styled.img``
const UserNickname =  styled.div``
const DateDiv = styled.div``
const ContentLeftDiv = styled.div``
const HeartDiv = styled.div``
const Content = styled.div``

export default function MainFeedList(props: any) {
  const{ isLogin, accessToken, userInfo } = useSelector((userReducer: auth) => userReducer);
 
  const postHeart = async () => {
    console.log('이벤트', props.id)
    console.log('유저인포', userInfo)

    return await feedApi.postHeart(userInfo, props.id)
      .then(()=>{
        props.setHeart(1)
      }
    )
  }
  console.log('로그인',isLogin)

  useEffect(() => {

  })

  return (
    <Div>
      <ImgDiv>
        <Img src={props.contentImg} />
      </ImgDiv>
      <ContentDiv>
        <ContentRightDiv>
          <UserImg src={props.userImage}/>
          <UserNickname>{props.nickname}</UserNickname>
          <DateDiv>{props.date}</DateDiv>
        </ContentRightDiv>
        <ContentLeftDiv>
          <HeartDiv>
              <BsSuitHeart />
            {isLogin === false || undefined ? (
              <div> 로그인이 필요한 서비스 입니다</div>
            ) : (
              <div> 로그인 중</div>
            )}
            {/* { isLogin === false ? (
                <div>로그인이 필요한 서비스입니다</div>
              ) : props.heart === 1 ? (
                <button>
                  <BsSuitHeartFill />
                </button>
              ) : (
              <button>
                <BsSuitHeart onClick={postHeart}/>
              </button>
              )
            } */}
            <Content>{props.heartNum}</Content>
          </HeartDiv>
          <Content>댓글숫자</Content>
        </ContentLeftDiv>
      </ContentDiv>
    </Div>
  )
}


