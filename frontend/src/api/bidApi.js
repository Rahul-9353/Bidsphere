import axiosClient from './axiosClient';

export const placeBid = (auctionId, amount) => 
    axiosClient.post('/bids', { auctionId, amount }). then(res => res.data);

export const getBidsForAuction = (auctionId) => 
    axiosClient.get(`/bids/auction/${auctionId}`).then(res => res.data);

export const getBidsByUser = (username) => 
    axiosClient.get(`/bids/user/${username}`).then(res => res.data);