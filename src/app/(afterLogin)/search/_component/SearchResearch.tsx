'use client';

import { useQuery } from '@tanstack/react-query';
import { Post as IPost } from '@/model/Post';
import Post from '../../_component/Post';
import { getSearchResults } from '../_lib/getSearchResults';

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

export default function SearchResult({ searchParams }: Props) {
  const { data } = useQuery<
    //네번째 자리가 key에 대한 타입..
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, Props['searchParams']]
  >({
    queryKey: ['posts', 'search', searchParams],
    queryFn: getSearchResults,
    staleTime: 1 * 1000,
    gcTime: 300 * 1000,
  });

  console.log(`검색어 데이터 :`, data);

  return data?.map((post) => {
    return <Post key={post.postId} post={post} />;
  });
}
