import axiosClient from './axiosClient';

export const getAllAuctions = () => axiosClient.get('/auctions').then(res => res.data);
export const getAuctionById = (id) => axiosClient.get(`/auctions/${id}`).then(res => res.data);