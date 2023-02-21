import React, { useState, useMemo, useRef } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Box, Typography } from '@mui/material';

import './styles.css';

// eslint-disable-next-line react/prop-types
const RenderTime = ({ remainingTime }) => {
    const currentTime = useRef(remainingTime);
    const prevTime = useRef(null);
    const isNewTimeFirstTick = useRef(false);
    const [, setOneLastRerender] = useState(0);

    if (currentTime.current !== remainingTime) {
        isNewTimeFirstTick.current = true;
        prevTime.current = currentTime.current;
        currentTime.current = remainingTime;
    } else {
        isNewTimeFirstTick.current = false;
    }

    // force one last re-render when the time is over to tirgger the last animation
    if (remainingTime === 0) {
        setTimeout(() => {
            setOneLastRerender((val) => val + 1);
        }, 20);
    }

    const isTimeUp = isNewTimeFirstTick.current;

    return (
        <Box className="time-wrapper">
            <Box key={remainingTime} className={`time ${isTimeUp ? 'up' : ''}`}>
                {remainingTime}
            </Box>
            {prevTime.current !== null && (
                <Box key={prevTime.current} className={`time ${!isTimeUp ? 'down' : ''}`}>
                    {prevTime.current}
                </Box>
            )}
        </Box>
    );
};

const CountDown = () => {
    const [timeIsUp, setTimeIsUp] = useState(false);

    const flexAttr = useMemo(
        () => ({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            height: 'calc(80vh -  24px)'
        }),
        []
    );

    const onComplete = () => {
        setTimeIsUp(true);
        console.log('[DEBUG]: time is up');
        return { shouldRepeat: false, delay: 1 };
    };
    return (
        <Box style={flexAttr}>
            <Typography variant="h3">CountdownCircleTimer React Component</Typography>
            <Box>
                {timeIsUp ? (
                    <Typography variant="h5" color="#FF0000">
                        Time is up
                    </Typography>
                ) : (
                    <CountdownCircleTimer
                        isPlaying
                        duration={10}
                        size={80}
                        strokeWidth={8}
                        colors={['#004777', '#F7B801', '#A30000', '#FF0000']}
                        colorsTime={[10, 7, 3, 0]}
                        onComplete={onComplete}
                    >
                        {RenderTime}
                    </CountdownCircleTimer>
                )}
            </Box>
            <Typography variant="p">
                Change component properties in the code filed on the right to try difference functionalities
            </Typography>
        </Box>
    );
};

export default CountDown;
