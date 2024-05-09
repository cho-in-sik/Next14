'use client';

import { signOut } from 'next-auth/react';
import style from './logoutButton.module.css';
import { useRouter } from 'next/navigation';
import { Session } from '@auth/core/types';

type Props = {
  me: Session | null;
};

export default function LogoutButton({ me }: Props) {
  //useSession으로 내정보 불러오기(지금 로그인중)

  const router = useRouter();

  const onLogout = async () => {
    await signOut({ redirect: false }).then(() => {
      router.replace('/');
    });
  };

  if (!me?.user) return;

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image!} alt={me.user?.email!} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}
