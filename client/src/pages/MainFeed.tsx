/*eslint-disable*/
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import mainfeedApi from '../api/feed';
import MainFeedList from '../component/Feed/MainFeed/MainFeedList';
import feedBG from '../img/feedBG.jpg'

const Wrapper = styled.div`
	border: red 1px;
  width: 100vw;
  height: 100vw;
  background-image: url(${feedBG});
  background-repeat: no-repeat;
  background-size: cover;
`

const ButtonDiv = styled.div`
`

const Button = styled.button`
`

const Feed = styled.div``

export default function MainFeed() {
  const [feedlist, setFeedlist]: any[] = useState({ 
    id: '',
    contentImg: '',
    nickname: '',
    date: ''
  });
  const [feedheart, setFeedHeart] = useState('');
  const [heart, setHeart] = useState(0);

  useEffect(() => {
    const getMainFeedCon = async () => {
      const resFeedCon =  await mainfeedApi.getMainFeed()
        .then(result => {
          console.log('리졸트.데이터',result.data)
          setFeedlist(result.data)
     
          // for(let i=0; i< feedlist.length; i++){
          //   feedlist[i].heartNum = getMainFeedHeart(feedlist[i].id)
          // }
          // console.log('피드리스트 ',feedlist)
        })
      
    }

    // const getMainFeedHeart = async (id: number) => {
    //   return await mainfeedApi.getHeart(id)
    // }
    getMainFeedCon();
    //getMainFeedHeart();
  }, []);

  console.log(feedlist,'피드리스트')
  return (
      <Wrapper>
          <div>MainFeed</div>
          <ButtonDiv>
              <Button>최신순</Button>
              <Button>인기순</Button>
          </ButtonDiv>
          <Feed>
            {feedlist === [] 
            ? '피드가 없습니다'
            : feedlist.map((el: any) => (<MainFeedList {...el} key={el.id} />))
            }
          </Feed>
      </Wrapper>
  )
}
