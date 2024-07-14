import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, MenuItem} from '@mui/material';
import { getSwapRate } from './swapService';

const cryptoOptions = [
    { label: 'Solana (SOL)', value: 'solana' },
    { label: 'USD Coin (USDC)', value: 'usd-coin' },
    { label: 'Bitcoin (BTC)', value: 'bitcoin' },
    { label: 'Ethereum (ETH)', value: 'ethereum' }
];

const Swap = () => {
    const [assetFrom, setAssetFrom] = useState<string>('solana');
    const [assetTo, setAssetTo] = useState<string>('usd-coin');
    const [amount, setAmount] = useState<number>(0);
    const [swappedAmount, setSwappedAmount] = useState<number | null>(null);
    const [rate, setRate] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRate = async () => {
            try {
                const swapRate = await getSwapRate(assetFrom, assetTo);
                setRate(swapRate);
                setError(null);
            } catch (err) {
                setError('Failed to fetch swap rate');
                console.error(err);
            }
        };

        if (assetFrom && assetTo) {
            fetchRate();
        }
    }, [assetFrom, assetTo]);

    const handleSwap = () => {
        if (amount <= 0) {
            setError('Amount must be greater than zero.');
            return;
        }

        if (rate) {
            setSwappedAmount(amount * rate);
            setError(null);
        } else {
            setError('Failed to calculate swapped amount.');
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div" color="secondary" gutterBottom>
                    Swap Cryptocurrencies
                </Typography>
                <Box my={2}>
                    <TextField
                        select
                        label="From Asset"
                        value={assetFrom}
                        onChange={(e) => setAssetFrom(e.target.value)}
                        fullWidth
                    >
                        {cryptoOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box my={2}>
                    <TextField
                        select
                        label="To Asset"
                        value={assetTo}
                        onChange={(e) => setAssetTo(e.target.value)}
                        fullWidth
                    >
                        {cryptoOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box my={2}>
                    <TextField 
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))} 
                        fullWidth
                    />
                </Box>
                <Box my={2} display="flex" justifyContent="center">
                    <Button variant="contained" color="secondary" onClick={handleSwap}>
                        Swap
                    </Button>
                </Box>
                {error && (
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                )}
                {swappedAmount !== null && rate !== null && (
                    <Box my={2} textAlign="center">
                        <Typography variant="h6" color="primary">
                            {amount} {cryptoOptions.find(option => option.value === assetFrom)?.label} is equal to
                        </Typography>
                        <Typography variant="h5" color="secondary">
                            {swappedAmount.toFixed(6)} {cryptoOptions.find(option => option.value === assetTo)?.label}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Swap Rate: 1 {cryptoOptions.find(option => option.value === assetFrom)?.label} = {rate.toFixed(6)} {cryptoOptions.find(option => option.value === assetTo)?.label}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default Swap;

