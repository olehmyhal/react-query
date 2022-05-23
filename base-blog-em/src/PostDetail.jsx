import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isError, error, isLoading } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id)
  );

  const deleteMutation = useMutation((id) => deletePost(id));
  const updateMutation = useMutation(() => updatePost(post.id));

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <p>{error.toString()}</p>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>Error deleting post</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>Loading deleting post...</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>Successed deleting post...</p>
      )}
      <button onClick={() => updateMutation.mutate()}>Update title</button>
      {updateMutation.isError && (
        <p style={{ color: "red" }}>Error updating post</p>
      )}
      {updateMutation.isLoading && (
        <p style={{ color: "purple" }}>Loading updating post...</p>
      )}
      {updateMutation.isSuccess && (
        <p style={{ color: "green" }}>Successed updating post...</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
