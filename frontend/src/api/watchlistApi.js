import axiosClient from "./axiosClient";

export const addToWatchlist = (auctionId) => axiosClient.post(`/watchlist/${auctionId}`);
export const removeFromWatchlist = (auctionId) => axiosClient.delete(`/watchlist/${auctionId}`);
export const getWatchlistStatus = (auctionId) => axiosClient.get(`/watchlist/status/${auctionId}`).then(res => res.data);
export const getMyWatchlist = () => axiosClient.get('/watchlist').then(res => res.data);