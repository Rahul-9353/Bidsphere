import React, { useEffect, useState } from 'react'

export function useCountdown(endTime) {
    const [timeLeft, setTimeLeft] = useState(() => calculate(endTime));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculate(endTime));
        }, 1000);
        return () => clearInterval(interval);
    }, [endTime]);

    return timeLeft; 
}

function calculate(endTime) {
    if (!endTime) {
        return { label: '-', ended: false, urgent: false };
    }

    const diffMs = new Date(endTime) - new Date();
    if (diffMs <= 0) {
        return { label: 'Ended', ended: true, urgent: false };
    }

    const days = Math.floor(diffMs/ (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);

    const urgent = diffMs < 60 * 60 * 1000;

    let label;
    if (days > 0) {
        label = `${days}d ${hours}h left`;
    }
    else if (hours > 0) {
        label = `${hours}h ${minutes}m left`;
    }
    else {
        label = `${minutes}m ${seconds}s left`;
    }

    return { label, ended: false, urgent };
}
