import { get, post, put, destroy, authHeader } from '../util/axios';

const ReviewService = {
  getUsersReviews: (userId) => get(`/users/${userId}/reviews`),
  getProductReviews: (teaId) => get(`/tea/${teaId}/reviews`),
  getReview: (reviewId) => get(`/reviews/${reviewId}`),
  addReview: (teaId) => post(`/tea/${teaId}/reviews`),
  updateReview: (teaId) => put(`/tea/${teaId}/reviews`),
  deleteReview: (teaId) => destroy(`/tea/${teaId}/reviews`)
};

export default ReviewService;