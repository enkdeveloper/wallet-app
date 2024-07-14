import React, { FC, ReactNode } from 'react';
import { Button, Box } from '@mui/material';

interface PhantomWalletProviderProps {
    children: ReactNode;
}

const PhantomWalletProvider: FC<PhantomWalletProviderProps> = ({ children }) => {
    return (
        <Box>
            <Button variant="contained" color="secondary" style={{ backgroundColor: '#673ab7', color: '#ffffff', marginBottom: '16px' }} disabled>
                Connect Wallet (Disabled)
            </Button>
            {children}
        </Box>
    );
};

export default PhantomWalletProvider;
