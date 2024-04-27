import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextResponse } from 'next/server';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  //pages 는 로그인창 어디 페이지에 적용을 할지. 원래 Authjs 를 쓰면 로그인하는 버튼이있는 페이지를 만들어주지만 우리는 만들어둔 페이지가 있기에 이렇게 사용하기
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
  //세션이 없다면 여기로 리다이렉트
  // callbacks: {
  //   async authorized({ request, auth }) {
  //     if (!auth) {
  //       return NextResponse.redirect('http://localhost:3000/i/flow/login');
  //     }
  //     return true;
  //   },
  // },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: credentials.username,
              password: credentials.password,
            }),
          },
        );

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();
        console.log('user', user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
  ],
});
