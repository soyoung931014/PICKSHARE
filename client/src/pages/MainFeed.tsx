/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import feedApi from '../api/feed';
import MainFeedList from '../component/Feed/MainFeed/MainFeedList';
import feedBG from '../img/feedBG.jpg'
import { auth } from '../redux/reducers/userReducer/userReducer';

const Wrapper = styled.div`
	border: red 1px;
  width: 100vw;
  background-image: url(${feedBG});
  background-size: cover;
  background-attachment: fixed;
  `

const ButtonDiv = styled.div`
`

const Button = styled.button`
`

const Feed = styled.div`
  margin: 150px;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, auto));
`
//https://studiomeal.com/archives/533
export default function MainFeed() {
  const { isLogin, accessToken, userInfo } = useSelector(( state: auth ) => state)
  const [feedlist, setFeedlist]: any[] = useState({ 
    id: '',
    contentImg: '',
    date: '',
    nickname: '',
    userImage: '',
    heartNum: ''
  });

  const [heart, setHeart] = useState(false);
  
  useEffect(() => {
    const getMainFeedCon = async () => {
      return await feedApi.getMainFeed()
        .then(result => {

          setFeedlist(result.data)
        })
      
    }
    getMainFeedCon();

  }, [heart]);

  console.log(feedlist,'피드리스트 ')
  return (
      <Wrapper>
          <div>MainFeed</div>
          <ButtonDiv>
              <Button>최신순</Button>
              <Button>인기순</Button>
          </ButtonDiv>
          <Feed>
            {feedlist.id === ''
            ? '피드가 없습니다'
            : feedlist.map((el: any) => (<MainFeedList {...el} key={el.id} heart={heart} setHeart={setHeart}/>))
            }
          </Feed>
      </Wrapper>
  )
}
