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
import { useDispatch } from 'react-redux';
import { deleteBoardInfo, diaryOnAction } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/Footer/Footer';

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  background-image: url(${feedBG});
  background-size: cover;
  background-attachment: scroll;
`;
const Div = styled.div`
  margin: 150px;
  min-width: 21rem;
`;
const UpperDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ButtonDiv = styled.div`
  display: flex;
`;

const Button = styled.button`
  background-color: transparent;
  margin-right: 0.5rem;
  font-size: 1rem;
  color: #615b5b;
  text-align: center;
  font-weight: 400;
  outline: 0;
  &:hover {
    cursor: pointer;
  }
`;
const UpperRightDiv = styled.div`
  display: flex;
  margin: 0.5rem 0;
`;
const SearchBar = styled.div`
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
  padding-left: 15px;
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
  column-gap: 5rem;
  row-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, auto));
`;
const FooterDiv = styled.div`
  padding-left: 25px;
  padding-top: 10px;
  border-top: solid gray 1px;
`;
export interface Feed {
  commentNum: string | undefined;
  contentImg: string | undefined;
  createdAt: string | undefined;
  date: string | undefined;
  heartNum: string | undefined;
  id: number | undefined;
  locked: boolean | undefined;
  nickname: string | undefined;
}
export default function MainFeed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [render, setRender] = useState(false);
  useState<Feed|null>
  const [feedlist, setFeedlist] = useState<Feed[]|null>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchOn, setSearchOn] = useState(false);
  const [orderingH, setOrderingH] = useState(false);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsloaded] = useState(false);
  const [list, setList] = useState<Feed[]|null>([]);
  let page = 0;
  const { userInfo } = useSelector((userReducer: any) => userReducer.userInfo);
  const handleSearchInput = debounce(async (e: any) => {
    setSearchOn(true);
    setSearchInput(e.target.value);
  }, 300);

  const writeNewDiary = () => {
    //새로 만들기
    dispatch(deleteBoardInfo());
    dispatch(diaryOnAction);
    navigate('/diary');
  };

  const selectFeed = () => {
    setRender(!render);
  };
  const sortFeedByRecent = () => {
    setOrderingH(false);
    setRender(!render);
  };

  const sortFeedByHeart = () => {
    setOrderingH(true);
    setRender(!render);
  };

  const getUserFeed = async (searchNickname: string) => {
    return await feedApi.getUserFeed(searchNickname, page).then((result) => {
      setFeedlist(result.data);
    });
  };

  const getUserFeedH = async (searchNickname: string) => {
    return await feedApi.getUserFeed(searchNickname, page).then((result) => {
      result.data.sort((a: any, b: any) => {
        return b.heartNum - a.heartNum;
      });
      setFeedlist(result.data);
    });
  };

  const getMainFeedH = async () => {
    return await feedApi.getMainFeed(page).then((result) => {
      result.data.sort((a: any, b: any) => {
        return b.heartNum - a.heartNum;
      });
      setFeedlist(result.data);
    });
  };

  const getMainFeed = async () => {
    return await feedApi.getMainFeed(page).then((result) => {
      setFeedlist((prev) => prev.concat(result.data));
      // setFeedlist(result.data);
      // console.log(typeof feedlist, Array.isArray(feedlist))

    });
  };
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (orderingH === false && searchOn === false) {
            getMainFeed();
          } else if (orderingH === true && searchOn === false) {
            getMainFeedH();
          } else if (orderingH === false && searchOn === true) {
            getUserFeed(searchInput);
          } else {
            getUserFeedH(searchInput);
          }
        }
        page += 8;
      })
    })
    if (target) {
      io.observe(target);
      console.log('콘솔을 해보자',page)
    }
    
    // if (orderingH === false && searchOn === false) {
    //   getMainFeed();
    // } else if (orderingH === true && searchOn === false) {
    //   getMainFeedH();
    // } else if (orderingH === false && searchOn === true) {
    //   getUserFeed(searchInput);
    // } else {
    //   getUserFeedH(searchInput);
    // }
    if (userInfo.nickname === 'nothing') {
      alert('닉네임을 변경해주세요');
      navigate('/mypage');
    }
  }, [render, target]);
  console.log('피드리스트', feedlist, '타겟', target);
  // const onKeyDown = (e: any) => {
  //   console.log(e.key);
  // };
  
  return (
    <>
      <Wrapper>
        <Nav />
        <Div>
          <UpperDiv>
            <ButtonDiv>
              <Button onClick={sortFeedByRecent} className="left">
                최신순 |
              </Button>
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
                  <SearchIcon type="button" onClick={selectFeed}>
                    <BiSearch size={'1.7rem'} />
                  </SearchIcon>
                </SearchBar>
              </form>
              <PlusButton onClick={writeNewDiary}> + </PlusButton>
            </UpperRightDiv>
          </UpperDiv>
          <Feed>
            {feedlist.length === 0
              ? '피드가 없습니다'
              : feedlist.map((el: any) => (
                  <MainFeedList
                    {...el}
                    key={el.id}
                    render={render}
                    setRender={setRender}
                  />
              ))}
            <div ref={setTarget} className='Target-Element'></div>
          </Feed>
        </Div>
        <FooterDiv>
          <Footer />
        </FooterDiv>
      </Wrapper>
    </>
  );
}
