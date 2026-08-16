import { useEffect, useRef } from "react";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// Connects bidding-services backend
export function useAuctionSocket(auctionId, onNewBid) {
    const clientRef = useRef(null);

    useEffect(() => {
        if (!auctionId) {
            return
        }

        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8083/ws'),
            reconnectDelay: 5000,
            debug: (str) => console.log('[STOMP]', str),
            
            onConnect: () => {
                console.log('[useAuctionSocket] Connected, subscribing to auction', auctionId);
                
                client.subscribe(`/topic/auction/${auctionId}`, (message) => {
                    console.log('[useAuctionSocket] Recieved message:', message.body);
                    
                    const bid = JSON.parse(message.body);
                    onNewBid(bid);
                });
            },
            onStompError: (frame) => {
                console.log('[useAuctionSocket] STOMP error:', frame);
            },
            onWebSocketError: (event) => {
                console.log('[useAuctionSocket] WebSocket error:', event);
            }
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [auctionId]);
}