'use client';

import { useRouter } from 'next/navigation';
import Main from '@/app/(beforeLogin)/_component/Main';
import { useSession } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const session = useSession();
  router.replace('/i/flow/login');

  if (session) {
    router.replace('/home');
    return null;
  }
  return <Main />;
}

//router.push 와 router.replace의 차이는 뒤로가기를 했을때 발생.
//router.replace 는 바로 뒤가 아니라 전의 전 주소로 이동.

//만약 우리가 이 프로젝트에서 push 를 써버리면 local/login 으로 가는데 여기로 가봤자 다시 i/flow/login으로 이동하기에 벗어날 수가 없다.
