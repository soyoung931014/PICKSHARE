/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import feedApi from '../api/feed';
import MainFeedList from '../component/Feed/MainFeed/MainFeedList';
import Nav from '../component/Nav/Nav';
import feedBG from '../img/feedBG.jpg';
import { BiSearch } from 'react-icons/bi';
import { debounce } from 'debounce';

const Wrapper = styled.div`
  width: 100vw;
  background-image: url(${feedBG});
  background-size: cover;
  background-attachment: scroll;
`
const Div = styled.div`  
  margin: 150px;
  border: blue dotted 3px;
  min-width: 21rem;
`
const UpperDiv = styled.div `
  display: flex;
  justify-content: space-between;
`
const ButtonDiv = styled.div`
  border: green dotted 1px;
  display: flex;
`

const Button = styled.button`
  margin-right: 0.5rem;
  &:hover{
    cursor: pointer;
  }
`
const SearchBar = styled.div`
  border: green solid 1px;
  border-radius: 30rem;
  display: flex;
  box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.25);
  overflow: hidden;
  background-color: white;
`
const SearchInput = styled.input`
  &::placeholder{
    font-style: italic;
    text-align: center;
  }
`

const SearchIcon = styled.button`
  border: orchid solid 1px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  &:hover{
    cursor: pointer;
  }
`

const Feed = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, auto));
`
//https://studiomeal.com/archives/533
export default function MainFeed() {
  const [ render, setRender ] = useState(false);
  const [ feedlist, setFeedlist ]: any[] = useState({ 
    id: '',
    contentImg: '',
    date: '',
    nickname: '',
    userImage: '',
    heartNum: ''
  });
  const [ searchInput, setSearchInput ] = useState('')

  const handleSearchInput = debounce(async(e: any) => {
    // const { name, value } = e.target;
    setSearchInput(e.target.value)
  }, 300);
  
  const getMainFeedCon = async () => {
    return await feedApi.getMainFeed()
    .then(result => {
      
      setFeedlist(result.data)
    })      
  }
  useEffect(() => {
    console.log('유저검색인풋',searchInput)
    if(searchInput === ''){
      getMainFeedCon();
    }


  }, [render, searchInput]);

  console.log(feedlist,'피드리스트 ')
  return (
      <Wrapper>
        <Nav />
        <Div>
          <UpperDiv>
            <ButtonDiv>
                <Button>최신순</Button>
                <Button>인기순</Button>
            </ButtonDiv>
            <SearchBar>
              <SearchInput 
                name='searchBar'
                type={'text'}
                placeholder='유저 검색'
                onChange={handleSearchInput}
              />
              <SearchIcon>
                <BiSearch size={'1.7rem'}/>
              </SearchIcon>
            </SearchBar>
          </UpperDiv>
          <Feed>
            {feedlist.id === ''
            ? '피드가 없습니다'
            : feedlist.map((el: any) => (<MainFeedList {...el} key={el.id} render={render} setRender={setRender}/>))
            }
          </Feed>
        </Div>
      </Wrapper>
  )
}
