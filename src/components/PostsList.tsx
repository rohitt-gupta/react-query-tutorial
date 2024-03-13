/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { addPost, fetchPosts, fetchTags } from '../api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const PostsList = () => {

  const { data: postsData, isLoading, status, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })
  const { data: tagsData, status: tagsFetchStatus } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags
  })

  const queryClient = useQueryClient();

  const { mutate, isError: isPostError, isPending, error: postError, reset } = useMutation({
    mutationFn: addPost,
    onMutate: () => {
      return { id: 0 };
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact: true,
      })
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    console.log("formData.keys()", formData.keys());

    const title = formData.get('title');
    const tags = Array.from(formData.keys()).filter(
      (key) => formData.get(key) === 'on'
    )

    if (!title || !tags) return;
    // console.log("title ", title);
    // console.log("tags ", tags);
    mutate({ id: postsData.length + 1, title, tags });
    // @ts-ignore
    e.target.reset();
  }


  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Enter you post...'
          name='title'
          className='postbox'
        />
        {tagsFetchStatus === 'success' && (
          <div className='tags'>
            {tagsData.map((tag: string) => (
              <div>
                <input type="checkbox" name={tag} id={tag} />
                <label htmlFor={tag}>{tag}</label>
              </div>

            ))}
          </div>
        )}

        <button type='submit' style={{ "width": "fit-content" }}>Post</button>
      </form>


      <div style={{ 'color': 'olivedrab', marginTop: '100px' }}>Posts List</div>
      {isLoading && <p style={{ 'color': 'yellow' }}>Loading...</p>}
      {error && <p style={{ 'color': 'red' }} >{error.message}</p>}
      {status === 'success' && (
        <div>
          {postsData.map((post: { id: number, tags: string[], title: string }) => {
            const { id, tags, title } = post;
            return (
              <div key={id} className='post'>
                <div>{title}</div>
                {tags.map(tag => <span>{`${tag} `}</span>)}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default PostsList