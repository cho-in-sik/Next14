export async function getFollowRecommends() {
  const res = await fetch(`http://localhost:9090/api/users/followRecommends`, {
    next: {
      tags: ['users', 'followRecommends'],
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
