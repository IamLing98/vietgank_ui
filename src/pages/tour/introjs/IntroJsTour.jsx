import React, { useState } from 'react';
import KanBan from 'pages/kanban/KanBan';
import { Box, Button } from '@mui/material';
import { Steps } from 'intro.js-react';
import steps from './steps';
import 'intro.js/introjs.css';
// import 'intro.js/themes/introjs-nassim.css';

const IntroJsTour = () => {
    const [stepsEnabled, setStepsEnabled] = useState(false);

    return (
        <Box>
            <Steps
                options={{
                    // showStepNumbers: true,
                    showProgress: true,
                    showBullets: true
                }}
                enabled={stepsEnabled}
                steps={steps}
                initialStep={0}
                onExit={() => setStepsEnabled(false)}
            />

            <Button size="small" color="warning" variant="contained" onClick={() => setStepsEnabled(true)}>
                Start tour
            </Button>
            <Box>
                <KanBan />
            </Box>
        </Box>
    );
};

export default IntroJsTour;
