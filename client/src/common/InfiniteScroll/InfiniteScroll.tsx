import React, { MutableRefObject } from 'react';
import { Feedlist, IOptions } from '../../types/feedType';

const InfiniteScroll = (
  dataFetchFunction: (
    io: IntersectionObserver
  ) => boolean | void | (() => void),
  target: React.RefObject<HTMLDivElement>,
  setTargetLoading: (par: boolean) => void
) => {
  if (target) {
    const options: IOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('여기 찍히나요???');
          setTargetLoading(entry.isIntersecting);
          setTimeout(() => {
            dataFetchFunction(io);
            setTargetLoading(false);
          }, 100);
        }
      });
    }, options);

    if (target.current) {
      io.observe(target.current);
    }
    return () => {
      io.disconnect();
    };
    /*  return () => {
      io && target && target.current && io.unobserve(target.current);
    }; */
  }
};

export default InfiniteScroll;