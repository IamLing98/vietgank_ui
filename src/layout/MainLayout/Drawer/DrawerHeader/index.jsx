/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Chip } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'assets/images/logo.png';
import styled from '@emotion/styled';

// ==============================|| DRAWER HEADER ||============================== //
const StyledLogo = styled.img((prop) => ({
    width: '3rem',
    height: '3rem',
    borderRadius: '5%'
}));

const LogoDiv = styled.div((prop) => ({}));

const DrawerHeader = ({ open }) => {
    const theme = useTheme();

    return (
        // only available in paid version
        <DrawerHeaderStyled theme={theme} open={open}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                <LogoDiv>
                    <StyledLogo src={Logo} />
                </LogoDiv>
                <span style={{fontSize:"20px"}}>Vietgangz</span>
                <Chip
                    label={process.env.REACT_APP_VERSION}
                    size="small"
                    sx={{ height: 16, '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 } }}
                    component="a"
                    href="/dashboard/default"
                    target="_blank"
                    clickable
                /> 
            </Stack>
        </DrawerHeaderStyled>
    );
};

DrawerHeader.propTypes = {
    open: PropTypes.bool
};

export default DrawerHeader;
