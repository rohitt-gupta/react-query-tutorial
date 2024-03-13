/* eslint-disable @typescript-eslint/no-explicit-any */

const fetchPosts = async () => {
  const response = await fetch('http://localhost:3000/posts?_sort=-id')

  const postData = await response.json();
  return postData;
};

const fetchTags = async () => {
  const response = await fetch("http://localhost:3000/tags");
  const tagsData = await response.json();
  return tagsData;
};

const addPost = async (post: any) => {
  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  return response.json();
};

export { fetchPosts, fetchTags, addPost };



/**
 * FETCHING DATA USING FETCH
 * // const [posts, setPosts] = useState(null);
  // useEffect(() => {
  //   fetchPosts().then(res => {
  //     setPosts(res)
  //     console.log("res", res);
  //     return res;
  //   })
  // }, [])

  console.log("posts", posts);
 */