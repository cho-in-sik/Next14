'use client';

import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import Post from '../../_component/Post';
import { Post as IPost } from '@/model/Post';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '@/app/(afterLogin)/home/home.module.css';

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching, isPending, isLoading } =
    useSuspenseInfiniteQuery<
      IPost[],
      Object,
      InfiniteData<IPost[]>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ['posts', 'recommends'],
      queryFn: getPostRecommends,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
      staleTime: 10 * 1000,
      gcTime: 300 * 1000,
    });
  const { ref, inView } = useInView({
    //아래 ref div가 보이고 나서 몇픽셀정도가 호출될건가? -> 보이자마자 호출하기에 0으로 설정
    threshold: 0,
    //아래 ref div가 보이고 나서 몇초후에 이벤트 발생할지
    delay: 0,
  });

  useEffect(() => {
    //처음엔 false 화면에 안보이면 false임, 보이면 true로 변함
    if (inView) {
      //데이터 가져오고 있는데 또 가져오지 않기 위해 isFetching까지
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetching]);

  if (isPending) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg
          className={styles.loader}
          height="100%"
          viewBox="0 0 32 32"
          width={40}
        >
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{ stroke: 'rgb(29, 155, 240)', opacity: 0.2 }}
          ></circle>
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{
              stroke: 'rgb(29, 155, 240)',
              strokeDasharray: 80,
              strokeDashoffset: 60,
            }}
          ></circle>
        </svg>
      </div>
    );
  }

  return (
    <>
      {data?.pages?.map((page, i) => {
        return (
          <Fragment key={i}>
            {page.map((post) => (
              <Post key={post.postId} post={post} />
            ))}
          </Fragment>
        );
      })}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
