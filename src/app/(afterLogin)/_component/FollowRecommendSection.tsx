'use client';

import { useQuery } from '@tanstack/react-query';
import FollowRecommend from './FollowRecommend';
import { User } from '@/model/User';
import { getFollowRecommends } from '../_lib/getFollowRecommends';

export default function FollowRecommendSection() {
  const { data } = useQuery<User[]>({
    queryKey: ['users', 'followRecommends'],
    queryFn: getFollowRecommends,
    staleTime: 10 * 1000,
    gcTime: 300 * 1000,
  });
  return data?.map((user) => <FollowRecommend user={user} key={user.id} />);
}
