import { data } from 'react-router';
import axiosClient from './axiosClient';

export const getAllAuctions = () => axiosClient.get('/auctions').then(res => res.data);
export const getAuctionById = (id) => axiosClient.get(`/auctions/${id}`).then(res => res.data);
export const createAuction = (data) => axiosClient.post('/auctions', data). then(res => res.data);
export const searchAuctions = (params) => {
    const cleaned = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => 
            value !== '' && value !== undefined && value !== null && !(key === 'category' && value === 'All')
        )
    );
    
    return axiosClient.get('/auctions/search', { params: cleaned }).then (res => res.data);
}

export const getAuctionsBySeller = (username) => 
    axiosClient.get(`/auctions/seller/${username}`).then(res => res.data);
    
    