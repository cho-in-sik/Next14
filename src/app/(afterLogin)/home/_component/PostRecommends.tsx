'use client';

import { useQuery } from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import Post from '../../_component/Post';
import { Post as IPost } from '@/model/Post';

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    staleTime: 10 * 1000,
    gcTime: 300 * 1000,
    initialData: () => [],
  });

  return data?.map((post) => {
    return <Post key={post.postId} post={post} />;
  });
}
