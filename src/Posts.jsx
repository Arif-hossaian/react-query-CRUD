/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AddNewPost from './AddNewPost';
import { deletePost, fetchPosts } from './api';

const Posts = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const cache = useQueryClient();
  const pageID = parseInt(id);

  const prevRouteChange = () => {
    let path = `/${pageID - 1}`;
    navigate(path);
  };
  const nextRouteChange = () => {
    let path = `/${pageID + 1}`;
    navigate(path);
  };
  const { data, isLoading, isError, error } = useQuery(
    ['posts', pageID],
    () => fetchPosts(pageID),
    {
      keepPreviousData: true,
    }
  );
  const { mutateAsync } = useMutation('deletePost', deletePost, {
    onError: (error) => {
      <p>{error.message}</p>;
    },
    onSuccess: () => {
      cache.invalidateQueries('posts');
    },
  });
  // const handleDeletePost = async (post) => {
  //   await mutateAsync({
  //     id: post.id,
  //   });
  // };
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <svg
          role="status"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }
  if (isError) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-screen-lg px-4 py-16 mx-auto space-y-8">
      <AddNewPost />
      {data?.length === 0 ? (
        <p className="text-center">No post</p>
      ) : (
        <div>
          <button
            className="inline-flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-blue-600 disabled:border-gray-100 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={prevRouteChange}
            disabled={pageID === 1}
          >
            Previous
          </button>
          <span className="px-3">{pageID}</span>
          <button
            className="inline-flex cursor-pointer items-center py-2 px-4  text-sm font-medium text-gray-500 bg-white rounded-lg border border-blue-600 disabled:border-gray-100 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={nextRouteChange}
            disabled={pageID === 55}
          >
            Next
          </button>
          {data?.map((post, i) => (
            <div
              className="p-1 mt-5 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl"
              key={i}
            >
              <button
                className=" cursor-pointer items-center py-2 px-4  text-sm font-medium text-gray-500 bg-white rounded-lg border border-blue-600 disabled:border-gray-100 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={async () => {
                  await mutateAsync({ id: post.id });
                }}
              >
                Delete
              </button>
              <Link to={`/post/${post.id}`}>
                <div className="block p-6 bg-white sm:p-8 rounded-xl">
                  <div className="sm:pr-8">
                    <p className="mt-2 text-sm text-gray-500">{post.id}</p>

                    <h5 className="text-xl font-bold text-gray-900">
                      {post.title}
                    </h5>
                    <p className="mt-2 text-sm text-gray-500">{post.body}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
