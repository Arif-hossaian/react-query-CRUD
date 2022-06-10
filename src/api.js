import axios from 'axios';

const api = axios.create({
  baseURL: `https://gorest.co.in/public/v2`,
  headers: {
    Authorization:
      'Bearer 0a692a454ff983db20a9143093fcee6dd52e920cd2f09f3794be3b6f1c134985',
  },
});

export const fetchPosts = async (id) => {
  //return await api.get(`users/6274/posts?page=${id}`);
  try {
    const { data } = await api.get(`users/6274/posts?page=${id}`);

    return data;
  } catch (error) {
    throw Error('Unable to fetch Posts');
  }
};
export const fetchPost = async (id) => {
  try {
    const { data } = await api.get(`posts/${id}`);

    return data;
  } catch (error) {
    throw Error('Unable to fetch Post');
  }
};

export const postData = async ({ title, body }) => {
  try {
    const { data } = api.post(
      `users/6274/posts`,
      {
        title,
        body,
      },
      {
        headers: {
          Authorization:
            'Bearer 0a692a454ff983db20a9143093fcee6dd52e920cd2f09f3794be3b6f1c134985',
        },
      }
    );
    return data;
  } catch (error) {
    throw Error(error.response?.statusText);
  }
};

export const updatePostData = async ({ title, body, id }) => {
  try {
    const { data } = api.patch(
      `posts/${id}`,
      {
        title,
        body,
      },
      {
        headers: {
          Authorization:
            'Bearer 0a692a454ff983db20a9143093fcee6dd52e920cd2f09f3794be3b6f1c134985',
        },
      }
    );
    return data;
  } catch (error) {
    throw Error(error.response?.statusText);
  }
};

export const deletePost = async ({ id }) => {
  try {
    const { data } = api.delete(`posts/${id}`, {
      headers: {
        Authorization:
          'Bearer 0a692a454ff983db20a9143093fcee6dd52e920cd2f09f3794be3b6f1c134985',
      },
    });
    return data;
  } catch (error) {
    throw Error(error.response?.statusText);
  }
};
