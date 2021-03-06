import { get, post, put, destroy, authHeader } from '../util/axios';

const ReviewService = {
  getUsersReviews: (userId) => get(`/users/${userId}/reviews`),
  getProductReviews: (teaId) => get(`/tea/${teaId}/reviews`),
  getSingle: (reviewId) => get(`/reviews/${reviewId}`),
  create: (data) => {
    const authToken = authHeader();
    const Header = {
      "Authorization": authToken,
    };
    return post(`/tea/${data.teaId}/reviews`, data, { headers: Header });
  },
  update: (data) => put(`/tea/${data.teaId}/reviews`),
  remove: (data) => destroy(`/tea/${data.teaId}/reviews`)
};

export default ReviewService;