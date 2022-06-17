/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import feedApi from '../api/feed';
import MainFeedList from '../component/Feed/MainFeed/MainFeedList';
import Nav from '../component/Nav/Nav';
import feedBG from '../img/feedBG.jpg';
import { BiSearch } from 'react-icons/bi';
import { debounce } from 'debounce';
import { useSelector } from 'react-redux';
import { feed } from '../redux/reducers/feedReducer/feedReducer';
import { useDispatch } from 'react-redux';
import { deleteBoardInfo, editOnAction, searchUserFeed } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100vw;
  background-image: url(${feedBG});
  background-size: cover;
  background-attachment: scroll;
`;
const Div = styled.div`
  margin: 150px;
  border: blue dotted 3px;
  min-width: 21rem;
`;
const UpperDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ButtonDiv = styled.div`
  border: green dotted 1px;
  display: flex;
`;

const Button = styled.button`
  margin-right: 0.5rem;
  font-size: 1rem;
  text-align: center;
  font-weight: 400;
  &:hover {
    cursor: pointer;
  }
`;
const UpperRightDiv = styled.div`
  display: flex;
  margin: 0.5rem 0;
`;
const SearchBar = styled.div`
  border: green solid 1px;
  border-radius: 30rem;
  display: flex;
  box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.25);
  overflow: hidden;
  background-color: white;
`;
const SearchInput = styled.input`
  outline: none;
  border: 0;
  height: 2rem;
  &::placeholder {
    font-style: italic;
    text-align: center;
  }
`;
const SearchIcon = styled.button`
  background-color: white;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin-left: 0.3rem;
  &:hover {
    cursor: pointer;
  }
`;
const PlusButton = styled.button`
  background-color: #c4c4c4;
  border-radius: 100%;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin-left: 0.3rem;
  font-size: 1.8rem;
  text-align: center;
  font-weight: 400;
  &:hover {
    cursor: pointer;
  }
`;
const Feed = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, auto));
`;
//https://studiomeal.com/archives/533
export default function MainFeed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [render, setRender] = useState(false);
  const [feedlist, setFeedlist]: any[] = useState({
    id: '',
    contentImg: '',
    date: '',
    nickname: '',
    userImage: '',
    heartNum: '0',
    lock: '',
  });
  const [searchInput, setSearchInput] = useState('');
  const [orderingH, setOrderingH] = useState(false);
  const { searchNickname } = useSelector((feedReducer: feed) => feedReducer);
  const { isEditOn } = useSelector((editReducer: any) => editReducer);

  const handleSearchInput = debounce(async (e: any) => {
    setSearchInput(e.target.value);
    dispatch(searchUserFeed(searchInput));
  }, 300);

  const writeNewDiary = () => {
    //새로 만들기
    dispatch(deleteBoardInfo());
    dispatch(editOnAction);
    navigate('/diary')
  };

  const sortFeedByRecent = () => {
    setOrderingH(false);
    setRender(!render);
  };

  const sortFeedByHeart = () => {
    console.log('하트');
    setOrderingH(true);
    setRender(!render);
  };

  const getUserFeed = async (searchNickname: string) => {
    console.log('유저검색인풋', searchInput);
    return await feedApi.getUserFeed(searchNickname).then((result) => {
      setFeedlist(result.data);
      console.log('유저피드', searchNickname);
      console.log('@@@@@@@');
    });
  };

  const getMainFeedH = async () => {
    return await feedApi.getMainFeed().then((result) => {
      result.data.sort((a: any, b: any) => {
        return b.heartNum - a.heartNum;
      });
      setFeedlist(result.data);
    });
  };

  const getMainFeed = async () => {
    return await feedApi.getMainFeed().then((result) => {
      setFeedlist(result.data);
    });
  };
  useEffect(() => {
    if (orderingH === false) {
      getMainFeed();
    } else {
      getMainFeedH();
    }
  }, [render]);

  console.log(feedlist, '피드리스트 ');
  console.log(typeof feedlist, '피드리스트 타입');
  return (
    <Wrapper>
      <Nav />
      <Div>
        <UpperDiv>
          <ButtonDiv>
            <Button onClick={sortFeedByRecent}>최신순</Button>
            <Button onClick={sortFeedByHeart}>인기순</Button>
          </ButtonDiv>
          <UpperRightDiv>
            <form>
              <SearchBar>
                <SearchInput
                  name="searchBar"
                  type={'text'}
                  placeholder="유저 검색"
                  onChange={handleSearchInput}
                />
                <SearchIcon onClick={() => getUserFeed(searchNickname)}>
                  <BiSearch size={'1.7rem'} />
                </SearchIcon>
              </SearchBar>
            </form>
            <PlusButton onClick={writeNewDiary}> + </PlusButton>
          </UpperRightDiv>
        </UpperDiv>
        <Feed>
          {feedlist.id === ''
            ? '피드가 없습니다'
            : feedlist.map((el: any) => (
                <MainFeedList
                  {...el}
                  key={el.id}
                  render={render}
                  setRender={setRender}
                />
              ))}
        </Feed>
      </Div>
    </Wrapper>
  );
}
