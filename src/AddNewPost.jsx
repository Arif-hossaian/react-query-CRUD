import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { postData, updatePostData } from './api';

const AddNewPost = ({ isUpdate, id }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data, isLoading, mutateAsync } = useMutation(
    isUpdate ? 'updatePost' : 'newPost',
    isUpdate ? updatePostData : postData,
    {
      onSuccess: () => {
        isUpdate
          ? cache.invalidateQueries(['post', id])
          : cache.invalidateQueries('posts');
      },
    }
  );
  const cache = useQueryClient();
  const onSubmit = async (data) => {
    isUpdate
      ? await mutateAsync({
          title: data.title,
          body: data.body,
          id,
        })
      : await mutateAsync({
          title: data.title,
          body: data.body,
        });

    reset();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid xl:grid-cols-3 xl:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            {...register('title', { required: true })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          {errors.title?.type === 'required' && 'Title is required'}
          <label
            htmlFor="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Title
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            {...register('body', { required: true })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          {errors.body?.type === 'required' && 'body is required'}
          <label
            htmlFor="floating_last_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter body
          </label>
        </div>
        <div>
          <button
            className="block w-full cursor-pointer items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-blue-600 disabled:border-gray-100 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            type="submit"
          >
            {isUpdate ? 'Update Post' : 'Add Post'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddNewPost;
