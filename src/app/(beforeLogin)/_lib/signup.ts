'use server';

import { redirect } from 'next/navigation';

export const onSubmit = async (formData: FormData) => {
  'use server';

  if (!formData.get('id')) {
    return { message: 'no_id' };
  }
  if (!formData.get('name')) {
    return { message: 'no_name' };
  }
  if (!formData.get('password')) {
    return { message: 'no_password' };
  }
  if (!formData.get('image')) {
    return { message: 'no_image' };
  }
  let shouldRedirect = false;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      { method: 'post', body: formData, credentials: 'include' },
    );
    console.log(await response.json());
    if (response.status === 403) {
      return { message: 'user_exists' };
    }
    shouldRedirect = true;
  } catch (error) {
    console.log(1);
    console.error(error);
    return;
  }
  if (shouldRedirect) {
    redirect('/home'); // redirect는 try catch 안에서 사용불가
  }
};
