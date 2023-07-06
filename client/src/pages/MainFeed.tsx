import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import feedApi from '../api/feed';
import MainFeedList from '../component/Feed/MainFeed/MainFeedList';
import { BiSearch } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBoardInfo, diaryOnAction, renderAction } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { feedBG } from '../img/Img';
import { RootState } from '../redux';
import { Feedlist, IOptions } from '../types/feedType';
import FeedCardSkeleton from '../common/skeleton/FeedCardSkeleton';
import { Spinner } from '../common/spinner/Spinner';
import LatestPost from '../component/Category/LatestPost';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';
import { clear } from 'console';

export default function MainFeed() {
  let start = 0;
  let end = 8;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 카드 만들 데이터 저장소
  const [feedlist, setFeedlist] = useState<Feedlist[] | null>([]);
  const [preferencelist, setPreferencelist] = useState<Feedlist[] | null>([]);
  const [searchFeedlist, setSearchFeedlist] = useState<Feedlist[] | null>([]);

  // 서치 데이터
  const [searchOn, setSearchOn] = useState(false);
  const [orderingH, setOrderingH] = useState(false);
  console.log(orderingH, searchOn, 'hihi');
  //setSearchInput 데이터 바뀌는
  const [searchInput, setSearchInput] = useState(''); // searchInput

  const [state, setState] = useState(false);
  const [targetLoading, setTargetLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [storage, setStorage] = useState<Feedlist[] | null>([]);

  const target = useRef<HTMLDivElement>(null);

  // isLoagin부분 뭔가 필요한데 뭔지 까먹음.
  const { userInfo, isLogin } = useSelector(
    (userReducer: RootState) => userReducer.userInfo
  );
  const { isRender } = useSelector(
    (renderReducer: RootState) => renderReducer.renderInfo
  );

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const writeNewDiary = () => {
    //새로 만들기
    dispatch(deleteBoardInfo());
    dispatch(diaryOnAction);
    navigate('/diary');
  };

  const selectFeed = () => {
    // setFeedlist([]);
    // setSearchFeedlist([]);
    setSearchOn(true);
    clearData();
    /*   setState((pre) => !pre); */
  };

  const sortFeedByRecent = () => {
    setOrderingH(false);
    clearData();

    start = 0;
    end = 8;
    /*  dispatch(renderAction); */
  };

  const sortFeedByHeart = () => {
    setOrderingH(true);
    clearData();
    start = 0;
    end = 8;
    /* setFeedlist([]); */
    /*  dispatch(renderAction); */
  };

  const getUserFeed = async (searchNickname: string) => {
    try {
      await feedApi.getUserFeed(searchNickname, 0, 0).then((result) => {
        const initial = result.data.slice(0, 8);
        if (initial) {
          setStorage([...result.data]);
          setSearchFeedlist((prev) => prev.concat(initial));
        }
        start += 8;
        end += 8;
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(storage, 'storage');

  // 무한 스크롤 시, 데이터 페칭함수
  let flag = 0;
  const sliceMainFeed = (io: IntersectionObserver) => {
    console.log('slice데이타');
    if (flag) return io.unobserve(target.current);
    const storageEnd = storage.length - Math.floor(storage.length % 8);
    if (end === storageEnd) {
      const sliceData = storage.slice(end, storage.length);
      setFeedlist((prev) => prev.concat(sliceData));
      flag = 1;
      return;
    }
    start += 8;
    end += 8;
    console.log(start, end, flag, 'startEndStorage🔥');
    const sliceData = storage.slice(start, end);
    setFeedlist((prev) => {
      console.log(prev, 'prev');
      return prev.concat(sliceData);
    });

    return true;
  };

  let sliceFlag = 0;
  const sliceMainFeedH = (io: IntersectionObserver) => {
    if (sliceFlag) return io.unobserve(target.current);
    const storageEnd = storage.length - Math.floor(storage.length % 8);
    if (end === storageEnd) {
      const sliceData = storage.slice(end, storage.length);
      setPreferencelist((prev) => prev.concat(sliceData));
      sliceFlag = 1;
      return;
    }
    start += 8;
    end += 8;
    console.log(start, end, flag, 'startEndStorage🔥');
    const sliceData = storage.slice(start, end);
    setPreferencelist((prev) => {
      return prev.concat(sliceData);
    });
    return true;
  };

  console.log(feedlist, 'feedlist', start, end);
  const getUserFeedH = async (searchNickname: string) => {
    return await feedApi
      .getUserFeed(searchNickname, start, end)
      .then((result) => {
        result.data.sort((a, b) => {
          return b.heartNum - a.heartNum;
        });
        setSearchFeedlist((prev) => prev.concat(result.data));
        start += 8;
        end += 8;
      });
  };
  // 선호순
  const getMainFeedH = async () => {
    console.log(start, end, '인기순 getmainFeedHeart 몇으로 들어왔는지 ');
    try {
      await feedApi.getMainFeedH(start, end).then((result) => {
        const initial = result.data.slice(0, 8);
        if (initial) {
          setStorage([...result.data]);
          setPreferencelist((prev) => prev.concat(initial));
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  // 인기순
  const getMainFeed = async () => {
    try {
      await feedApi.getMainFeed(start, end).then((result) => {
        const initial = result.data.slice(0, 8);
        if (initial) {
          setStorage([...result.data]);
          setFeedlist((prev) => prev.concat(initial));
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const disconnectFetch = (
    result: boolean | void,
    callback: IntersectionObserver
  ) => {
    console.log('✅');
    if (!result) return () => callback.disconnect();
    return;
  };

  if (userInfo?.nickname === 'nothing') {
    alert('닉네임을 변경해주세요');
    navigate('/mypage');
  }
  const clearData = () => {
    if (storage) setStorage([]);
    if (feedlist) setFeedlist([]);
    if (preferencelist) setPreferencelist([]);
    if (searchFeedlist) setSearchFeedlist([]);
    return;
  };

  useEffect(() => {
    setIsLoading(true);
    console.log(start, end, flag);
    if (searchOn && !orderingH) {
      console.log('최신순+서치On');
      getUserFeed(searchInput).catch((err) => console.log(err));
    } else if (searchOn && orderingH) {
      console.log('인기순+서치On');
      getUserFeedH(searchInput).catch((err) => console.log(err));
    } else if (!orderingH) {
      console.log('최신순+서치Off');
      getMainFeed().catch((err) => console.log(err));
    } else {
      console.log('인기순+서치Off');
      console.log('인기순의', start, end);
      getMainFeedH().catch((err) => console.log(err));
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, [searchOn, orderingH]);

  console.log('feedlist', feedlist);
  console.log('prefer', preferencelist);
  return (
    <Container>
      <Wrapper>
        <Div>
          <UpperDiv>
            <ButtonDiv>
              <Button
                onClick={() => sortFeedByRecent()}
                className="left"
                Select={!orderingH}
              >
                최신순
              </Button>
              <Button onClick={() => sortFeedByHeart()} Select={orderingH}>
                인기순
              </Button>
            </ButtonDiv>
            <UpperRightDiv>
              <form onSubmit={selectFeed}>
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
            {!isLoading && !orderingH && !searchOn && (
              <LatestPost
                dataFetch={sliceMainFeed}
                list={feedlist}
                target={target}
                setTargetLoading={setTargetLoading}
              />
            )}
            {!isLoading && orderingH && !searchOn && (
              <LatestPost
                dataFetch={sliceMainFeedH}
                list={preferencelist}
                target={target}
                setTargetLoading={setTargetLoading}
              />
            )}
            {!isLoading &&
              searchFeedlist.length > 0 &&
              searchFeedlist.map((el) => (
                <MainFeedList {...el} key={Math.random() * 100} isRender />
              ))}
            {!isLoading && searchOn && searchFeedlist.length === 0 && (
              <Message>유저 검색 결과가 없습니다.</Message>
            )}
            {isLoading &&
              new Array(8).fill(1).map((_, i) => <FeedCardSkeleton key={i} />)}
            <div
              style={{ width: '100%', height: '20px', border: 'solid red 2px' }}
              ref={target}
              className="Target-Element"
            ></div>
          </Feed>
        </Div>
      </Wrapper>
      {targetLoading ? (
        <TargetContainer>
          <TargetSpinner />
        </TargetContainer>
      ) : null}
    </Container>
  );
}
const TargetContainer = styled.div`
  width: 100%auto;
  height: 10%;
`;
const TargetSpinner = styled(Spinner)``;
const Container = styled.div`
  background-image: url(${feedBG});
  background-size: cover;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Div = styled.div`
  width: 100%;
  margin-top: 3em;
`;
const UpperDiv = styled.div`
  display: flex;
  padding: 0 1%;
  justify-content: space-evenly;
`;
const ButtonDiv = styled.div`
  display: flex;
  width: 120px;
  flex: 1 0 auto;
  text-align: center;
  margin-left: 0.9em;
`;

const Button = styled.button<{ Select?: boolean }>`
  font-family: sans-serif;
  flex-shrink: 0;
  margin-right: 0.5rem;
  font-size: 1rem;
  padding: 1px 7px;
  text-align: center;
  font-weight: 650;
  border-bottom: solid 2px ${(props) => (props.Select ? '#ec86e0' : 'null')};
  background: linear-gradient(to right, #8272eb, #d06be0, #fd40c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  &:hover {
    cursor: pointer;
    border-bottom: solid gray 2px;
  }
`;
const UpperRightDiv = styled.div`
  display: flex;
  margin: 0.5em;
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
  margin-left: 0.5em;
  font-size: 1.8rem;
  text-align: center;
  font-weight: 400;
  &:hover {
    cursor: pointer;
    background-color: #fee9f7;
  }
`;
const Feed = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 12px;
  @media screen and (min-width: 840px) {
    padding: 0px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
`;

const Message = styled.div`
  font-weight: bolder;
  margin: 3vw;
`;
