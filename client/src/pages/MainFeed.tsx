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
import { AxiosPromise } from 'axios';

export default function MainFeed() {
  let start = 0;
  let end = 8;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [storage, setStorage] = useState<Feedlist[] | null>([]);
  const [feedlist, setFeedlist] = useState<Feedlist[] | null>([]);
  const [preferencelist, setPreferencelist] = useState<Feedlist[] | null>([]);
  const [searchFeedlist, setSearchFeedlist] = useState<Feedlist[] | null>([]);

  const [searchOn, setSearchOn] = useState(false);
  const [orderingH, setOrderingH] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const [targetLoading, setTargetLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const target = useRef<HTMLDivElement>(null);

  const { userInfo } = useSelector(
    (userReducer: RootState) => userReducer.userInfo
  );
  const { isRender } = useSelector(
    (renderReducer: RootState) => renderReducer.renderInfo
  );

  useEffect(() => {
    setIsLoading(true);
    console.log(start, end, flag);
    if (searchOn && !orderingH) {
      console.log('최신순+서치On');
      initialFeedFetch(
        () => feedApi.getUserFeed(searchInput, 0, 0),
        setFeedlist
      ).catch((err) => console.log(err));
    } else if (searchOn && orderingH) {
      console.log('인기순+서치On');
      getUserFeedH(searchInput).catch((err) => console.log(err));
    } else if (!orderingH) {
      console.log('최신순+서치Off');
      initialFeedFetch(
        () => feedApi.getMainFeed(start, end),
        setFeedlist
      ).catch((err) => console.log(err));
    } else {
      console.log('인기순+서치Off');
      initialFeedFetch(
        () => feedApi.getMainFeedH(start, end),
        setPreferencelist
      ).catch((err) => console.log(err));
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, [searchOn, orderingH]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const clearData = () => {
    if (storage) setStorage([]);
    if (feedlist) setFeedlist([]);
    if (preferencelist) setPreferencelist([]);
    if (searchFeedlist) setSearchFeedlist([]);
    return;
  };

  const writeNewDiary = () => {
    dispatch(deleteBoardInfo());
    dispatch(diaryOnAction);
    navigate('/diary');
  };

  const selectFeed = () => {
    setSearchOn(true);
    clearData();
  };

  const sortFeedByRecent = () => {
    if (orderingH) {
      setOrderingH(false);
      clearData();
    }
  };

  const sortFeedByHeart = () => {
    if (!orderingH) {
      setOrderingH(true);
      clearData();
    }
  };

  // const getUserFeed = async (searchNickname: string) => {
  //   try {
  //     await feedApi.getUserFeed(searchNickname, 0, 0).then((result) => {
  //       const initial = result.data.slice(0, 8);
  //       if (initial) {
  //         setStorage([...result.data]);
  //         setSearchFeedlist((prev) => prev.concat(initial));
  //       }
  //       start += 8;
  //       end += 8;
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // 무한 스크롤 시, 데이터 페칭함수
  let flag = 0;
  const sliceMainFeed = (io: IntersectionObserver) => {
    if (flag) return io.unobserve(target.current);
    const storageEnd = storage.length - Math.floor(storage.length % 8);
    if (end === storageEnd) {
      const sliceData = storage.slice(end, storage.length);
      setFeedlist((prev) => prev.concat(sliceData));
      flag = 1;
      console.log(flag, '최신순');
      return;
    }
    start += 8;
    end += 8;
    console.log(start, end, flag, 'start최신순Storage🔥');
    const sliceData = storage.slice(start, end);
    setFeedlist((prev) => prev.concat(sliceData));
    return true;
  };

  const sliceMainFeedH = (io: IntersectionObserver) => {
    if (flag) return io.unobserve(target.current);
    const storageEnd = storage.length - Math.floor(storage.length % 8);
    if (end === storageEnd) {
      const sliceData = storage.slice(end, storage.length);
      setPreferencelist((prev) => prev.concat(sliceData));
      flag = 1;
      console.log(flag, '하트순');
      return;
    }
    start += 8;
    end += 8;
    console.log(start, end, flag, 'start하트순Storage🔥');
    const sliceData = storage.slice(start, end);
    setPreferencelist((prev) => prev.concat(sliceData));
    return true;
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

  // const initialSearchFetch = async (searchNickname: string) => {
  //   return await feedApi
  //     .getUserFeed(searchNickname, start, end)
  //     .then((result) => {
  //       result.data.sort((a, b) => {
  //         return b.heartNum - a.heartNum;
  //       });
  //       setSearchFeedlist((prev) => prev.concat(result.data));
  //       start += 8;
  //       end += 8;
  //     });
  // };

  /*  // 선호순 그리고 최신순 모듈
  const getMainFeedH = async () => {
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

 최신순
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
  }; */
  // 인기순과 선호순을 합친 함수
  const initialFeedFetch = async (
    fun: () => AxiosPromise<Feedlist[]>,
    setState: React.Dispatch<React.SetStateAction<Feedlist[]>>
  ) => {
    try {
      await fun().then((result: { data: Feedlist[] }) => {
        const initial = result.data.slice(0, 8);
        if (initial) {
          setStorage([...result.data]);
          setState((prev) => prev.concat(initial));
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (userInfo?.nickname === 'nothing') {
    alert('닉네임을 변경해주세요');
    navigate('/mypage');
  }

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
            {isLoading &&
              new Array(8).fill(1).map((_, i) => <FeedCardSkeleton key={i} />)}
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
