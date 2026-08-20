import { Client } from '@stomp/stompjs';
import React, { createContext, useContext, useEffect, useState } from 'react'
import SockJS from 'sockjs-client';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export default function NotificationProvider({ children }) {

    const { user, isAuthenticated } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (!isAuthenticated || !user?.username) {
            return;
        }

        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8084/websocket'),
            reconnectDelay: 5000,
            onConnect: () => {
                // Subscribes to the specific user's private notification channel
                client.subscribe(`/user/${user.username}/queue/notifications`, (message) => {
                    const event = JSON.parse(message.body);
                    const notification = {
                        id: Date.now(),
                        ...event,
                        read: false,
                        receivedAt: new Date(). toISOString(),
                    };
                    setNotifications((prev) => [notification, ...prev]);
                    setToast(notification);
                });
            },
        });

        client.activate();
        return () => client.deactivate();
    }, [isAuthenticated, user?.username]);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true})));
    };

    const dismissToast = () => setToast(null);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllRead, toast, dismissToast }}>
        {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
    return useContext(NotificationContext);
}
