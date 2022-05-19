/*eslint-disable*/
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// export {};
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsSuitHeart } from 'react-icons/bs';
import { BsSuitHeartFill } from "react-icons/bs";
import feedApi from '../../../api/feed';
import { useSelector } from 'react-redux';
import { FaRegCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import sampleImg from '../../../img/selfie4.jpg'
import sampleImg2 from '../../../img/instafeed3.jpg'


const Div = styled.div`
  border: red solid 1px;
  aspect-ratio: 262 / 302;
  background-color: white;
  box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.25);
  display: grid;
  grid-template-rows: 262fr 49fr;
  border-radius: 1rem;
`
const ImgDiv = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  aspect-ratio: 262 / 252.46;
  `
const Img = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 1rem 1rem 0 0;
`
const ContentDiv = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
`
const ContentRightDiv = styled.div`
  border: purple solid 6px;
  display: flex;
`
const UserImg = styled.img`
  border-radius: 100%;
  margin: 0.6rem 1rem;
  width: 3rem;
  height: 3rem;
`
const UserDiv = styled.div`
  border: blue dotted 3px;
  /* margin: 0.2rem; */
  /* display: grid; */
  /* grid-template-rows: 2fr 1fr; */
`
const UserNickname =  styled.div`
  border: pink dotted 3px;
  font-size: 28px;
  font-weight: 400;
`
const DateDiv = styled.div`
  border: red dotted 3px;
`
const ContentLeftDiv = styled.div`
  border: salmon solid 3px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  align-items: center;
  font-size: 27px;
`
const HeartDiv = styled.div`
  display: flex;
  /* grid-template-columns: 1fr 1fr; */
  border: green solid 1px;
  column-gap: 3px;
  margin: 1rem;
`
const HeartButton = styled.button`
  border: purple solid 1px;
  margin-top: 0.2rem;
  background-color: white;
  font-size: 20px;
  font-weight: bold;
  &:hover{
    cursor: pointer;
  }
`
const Comment = styled.div`
  border: yellow solid 1px;
  margin: 0.5rem 0;
`

export default function MainFeedList(props: any) {
  const navigate = useNavigate();
  const {isLogin, accessToken, userInfo} = useSelector((userReducer: any) => userReducer.userInfo);
  const [heart, setHeart] = useState(false);

  const postHeart = async () => {
    console.log('엑세스토큰',accessToken)
    return await feedApi.postHeart(userInfo, props.id, accessToken)
    .then(()=>{
      setHeart(true);
      props.setRender(!props.render);
    })
  }

  const deleteHeart = async () => {
    return await feedApi.deleteHeart(userInfo, props.id, accessToken)
    .then(() => {
      setHeart(false);
      props.setRender(!props.render);

    })
  }

  useEffect(()=>{
    // const seartHeart = async () => {
    //   let existOrNot: number = 0;
    //   await feedApi.searchHeart(userInfo, props.id, accessToken)
    //   .then((result) => {
    //     // console.log('서치결과',result)
    //     // console.log('서치결과의 타입',typeof(result))
    //     console.log('서치결과.data',result.data)
    //     console.log('서치결과.data 타입', typeof(result.data))
  
    //     existOrNot = result.data
    //   })
    // }
    // isLogin === true? seartHeart(): null
  },[heart])

  const clickWithOutLoggedin = () => {
    alert('로그인이 필요한 서비스 입니다');
    navigate('/login')
  }

  return (
    <Div>
      <ImgDiv>
        {/* <Img src={props.contentImg} /> */}
        <Img src={sampleImg2} />
      </ImgDiv>
      <ContentDiv>
        <ContentRightDiv>
          {/* <UserImg src={props.userImage}/> */}
          <UserImg src={sampleImg}/>
          <UserDiv>
            <UserNickname>{props.nickname}</UserNickname>
            <DateDiv>{props.date}</DateDiv>
          </UserDiv>
        </ContentRightDiv>
        <ContentLeftDiv>
          {isLogin === false ? (
            <HeartDiv>
              <HeartButton onClick={clickWithOutLoggedin}>
                <BsSuitHeart style={{strokeWidth: 1}} size='25'/>
              </HeartButton>
              <div>
                {props.heartNum} 
              </div>
            </HeartDiv>
          ) : heart === false ?(
            <HeartButton onClick={postHeart}>
              <BsSuitHeart style={{strokeWidth: 1}} size='25'/>
              {props.heartNum}
            </HeartButton>
          ) : (
            <HeartButton onClick={deleteHeart}>
              <BsSuitHeartFill style={{strokeWidth: 1}} size='25'/>
              {props.heartNum}
            </HeartButton>
          )}
          <Comment>
            <FaRegCommentDots />
            <>
              2
            </>
          </Comment>
        </ContentLeftDiv>
      </ContentDiv>
    </Div>
  )
}


