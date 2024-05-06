export async function getUser() {
  const res = await fetch(`http://localhost:9090/api/users/:userId`, {
    next: {
      tags: ['user'],
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
