/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Nav from '../component/Nav/Nav';
import feedBG from '../img/feedBG.jpg';
import sampleImg from '../img/selfie4.jpg'
import sampleImg2 from '../img/instafeed3.jpg'
import Heatmap from '../component/Feed/PersonalFeed/Heatmap/Heatmap';
import feedApi from '../api/feed';
import { useParams } from 'react-router-dom';
import MainFeedList from '../component/Feed/MainFeed/MainFeedList';

const UserWapper = styled.div`
  width: 100vw;
  height: 100% + 150px;
  background-image: url(${feedBG});
  background-size: cover;
  background-attachment: scroll;
  `
const Div = styled.div`
  margin: 150px;
  border: blue dotted 3px;
  min-width: 35rem;
`
const User = styled.div`
  border: red solid 1px;
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;
`
const UserImg = styled.img`
  border: paleturquoise solid 3px;
  border-radius: 100%;
  margin: 0.6rem 1rem;
  margin-left: 3rem;
  width: 178px;
  height: 178px;
`
const UserInfo = styled.div``
const UserDiv = styled.div`
  border: peachpuff solid 1.5px;
  border-radius: 1rem;
  width: 261px;
  height: 40px;
  background-color: white;
  margin : 1rem;
`
const Content = styled.div`
  margin: 0.5rem;
  margin-left: 1rem;
`
const Feed = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, auto));
`
export default function UserFeed() {
  const [ userfeedlist, setUserFeedlist ]: any[] = useState({
    id: '',
    contentImg: '',
    date: '',
    nickname: '',
    userImage: '',
    heartNum: 0,
    locked: ''
  });
  const [userlist, setUserlist]: any[] = useState({
    nickname: '',
    userImage: '',
    statusMessage: ''
  })
  const [ userRender, setUserRender ] = useState(false);
  const { isLogin, accessToken, userInfo } = useSelector((userReducer: any) => userReducer.userInfo);
  const [ counts, setCounts ] = useState({
    totalCount: 0,
    totalByDay: [],
  });

  const searchShareHandler = (value: {}) => {
    if(!value) {
      setUserFeedlist([]);
      return; 
    }
  }
  useEffect(() => {
    let path = window.location.pathname.split("/")[2]
    console.log(path)

    const userfeedinfo = async () => {
      return await feedApi.userInfo(path)
      .then(result => {
        console.log(result,"유저 인포 리스트")
        setUserlist(result.data.data)
      })
    }

    userfeedinfo();

    const userPage = async () => {
      return await feedApi.getUserFeed(path)
      .then(result => {
        console.log(result)
        setUserFeedlist(result.data)
      })
    }
    userPage();

  }, [userRender])

  return (
    <UserWapper>
      <Nav />
      <Div>
        <div>UserFeed</div>
          <User>
            <UserImg src={userlist.userImage}/>
            <UserInfo>
              <UserDiv>
                <Content>
                  {userlist.nickname}
                </Content>
              </UserDiv>
              <UserDiv>
                <Content>
                  {userlist.statusMessage}
                </Content>
              </UserDiv>
              <UserDiv>
              </UserDiv>
            </UserInfo>
          </User>
          <Feed>
            {userfeedlist.id === ''
            ? `${userlist.nickname}님의 피드가 없습니다`
            : userfeedlist.map((el: any) => (<MainFeedList {...el} key={el.id} userRender={userRender} setUserRender={setUserRender} />))}
          </Feed>
      </Div>
    </UserWapper>
  )
}

