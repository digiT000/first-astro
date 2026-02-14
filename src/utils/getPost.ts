export async function getPost(limit: number = 10) {
  try {
    const response = await fetch(`https://dummyjson.com/posts?limit=${limit}`);
    const data = await response.json();

    if (!data?.posts) {
      return [];
    }

    const posts = data.posts;

    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
}
