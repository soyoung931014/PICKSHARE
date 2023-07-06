import React, { Dispatch, SetStateAction, useEffect } from 'react';
import InfiniteScroll from '../../common/InfiniteScroll/InfiniteScroll';
import { Feedlist } from '../../types/feedType';
import MainFeedList from '../Feed/MainFeed/MainFeedList';

interface LatestPostProps {
  dataFetch: (io: IntersectionObserver) => boolean | void | (() => void);
  list: Feedlist[] | null;
  target: React.RefObject<HTMLDivElement>;
  setTargetLoading: (par: boolean) => void;
}
const LatestPost = ({
  dataFetch,
  list,
  target,
  setTargetLoading,
}: LatestPostProps) => {
  useEffect(() => {
    return InfiniteScroll(dataFetch, target, setTargetLoading);
  }, [target]);
  return (
    <>
      {list.map((el) => (
        <MainFeedList {...el} key={Math.random() * 100} isRender />
      ))}
    </>
  );
};

export default LatestPost;
