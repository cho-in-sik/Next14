import style from './profile.module.css';
import Post from '@/app/(afterLogin)/_component/Post';
import BackButton from '@/app/(afterLogin)/_component/BackButton';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getUser } from './_lib/getUser';
import { getUserPosts } from './_lib/getUserPosts';
import Image from 'next/image';

type Props = {
  params: { username: string };
};

export default async function Profile({ params }: Props) {
  const { username } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['users', username],
    queryFn: getUser,
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'users', username],
    queryFn: getUserPosts,
  });

  const dehydratedState = dehydrate(queryClient);

  const user = {
    id: 'zerohch0',
    nickname: '조인식',
    image: '/5Udwvqim.jpg',
  };

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>{user.nickname}</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}>
            <Image src={user.image} alt={user.id} />
          </div>
          <div className={style.userName}>
            <div>{user.nickname}</div>
            <div>@{user.id}</div>
          </div>
          <button className={style.followButton}>팔로우</button>
        </div>
        <div>
          <Post />
        </div>
      </HydrationBoundary>
    </main>
  );
}
