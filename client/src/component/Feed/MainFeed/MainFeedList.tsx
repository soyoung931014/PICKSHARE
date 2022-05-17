/*eslint-disable*/
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// export {};
import React from 'react';
import styled from 'styled-components';
import { BsSuitHeart } from "react-icons/bs";
import { BsSuitHeartFill } from "react-icons/bs";
const Div = styled.div`
`
const ImgDiv = styled.div`
`
const Img = styled.img``
const ContentDiv = styled.div``
const ContentRightDiv = styled.div``
const UserImg = styled.img``
const UserNickname =  styled.div``
const DateDiv = styled.div``
const ContentLeftDiv = styled.div``
const HeartDiv = styled.div``
const Content = styled.div``
export default function MainFeedList(props: any) {
  return (
    <Div>
      <ImgDiv>
        <Img src={props.contentImg} />
      </ImgDiv>
      <ContentDiv>
        <ContentRightDiv>
          {/* <UserImg src={props.userImg}/> */}
          <UserNickname>{props.nickname}</UserNickname>
          <DateDiv>{props.date}</DateDiv>
        </ContentRightDiv>
        <ContentLeftDiv>
          {/* <HeartDiv>
            { props.heart === 1 
            ? <BsSuitHeartFill/>
            : <BsSuitHeart/>
            }
            <Content>하트숫자</Content>
          </HeartDiv> */}
          <Content>댓글숫자</Content>
        </ContentLeftDiv>
      </ContentDiv>
    </Div>
  )
}


