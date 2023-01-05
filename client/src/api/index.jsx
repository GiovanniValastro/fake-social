import axios from 'axios';

const API = axios.create({baseURL: 'https://gv-fake-social-api.onrender.com/api'});

API.interceptors.request.use(req => {
  if(localStorage.getItem('auth')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth')).result.token}`;
  }
  return req;
})

export const signUp = formData => API.post('/auth/signup', formData);
export const signIn = formData => API.post('/auth/signin', formData);

export const fetchUsers = () => API.get('/users');
export const fetchUser = id => API.get(`/users/${id}`);
export const updateFriendsList = id => API.patch(`/users/friends/${id}`)
export const updateUser = ({id, user}) => API.patch(`/users/${id}`, user);
export const deleteUser = id => API.delete(`/users/${id}`);

export const fetchPosts = () => API.get('/posts');
export const fetchPost = id => API.get(`/posts/${id}`);
export const fetchPostByCreator = id => API.get(`/posts/creator?creator=${id}`);
export const fetchPostByTag = tag => API.get(`/posts/tags?tag=${tag}`);
export const fetchPostByLike = id => API.get(`posts/user?user=${id}`)
export const createPost = newPost => API.post('/posts', newPost); 
export const likePost = id => API.patch(`/posts/${id}/likePost`);
export const updatePost = ({id, post}) => API.patch(`/posts/${id}`, post);
export const deletePost = id => API.delete(`/posts/${id}`);

export const createComment = newComment => API.post('/comments', newComment); 
export const likeComment = id => API.patch(`/comments/${id}/likeComment`);
export const updateComment = ({id, comment}) => API.patch(`/comments/${id}`, comment);
export const deleteComment = id => API.delete(`/comments/${id}`);

export const fetchNotifications = () => API.get(`/notifications`);
export const createNotification = notifications => API.post('/notifications', notifications);
export const updateNotification = () => API.patch(`/notifications/`);
export const deleteAllNotifications = () => API.delete(`/notifications`);
export const deleteNotification = id => API.delete(`/notifications/${id}`);

export const fetchMessages = recipient => API.get(`/messages/user?user=${recipient}`);
export const createMessages = newMessage => API.post('/messages', newMessage); 
export const updateMessages = ({id, message}) => API.patch(`/messages/${id}`, message);
export const deleteMessages = id => API.delete(`/messages/${id}`);

