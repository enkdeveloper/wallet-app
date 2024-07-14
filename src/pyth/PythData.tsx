import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Paper, Avatar } from '@mui/material';

const cryptoOptions = [
    { label: 'Solana (SOL)', value: 'solana' },
    { label: 'USD Coin (USDC)', value: 'usd-coin' },
    { label: 'Bitcoin (BTC)', value: 'bitcoin' },
    { label: 'Ethereum (ETH)', value: 'ethereum' }
];

const PythData = () => {
    const [priceData, setPriceData] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(cryptoOptions.map(option => 
                    fetch(`https://api.coingecko.com/api/v3/coins/${option.value}`)
                ));
                const data = await Promise.all(responses.map(res => res.json()));
                const formattedData = data.reduce((acc, curr) => {
                    acc[curr.id] = curr;
                    return acc;
                }, {});
                setPriceData(formattedData);
            } catch (err) {
                setError('Failed to fetch price data.');
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div" color="secondary" gutterBottom>
                    Cryptocurrency Prices
                </Typography>
                {error ? (
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                ) : priceData ? (
                    <Grid container spacing={2}>
                        {cryptoOptions.map((option) => (
                            <Grid item xs={12} sm={6} key={option.value}>
                                <Paper elevation={3} style={{ padding: '16px', textAlign: 'center', backgroundColor: '#424242' }}>
                                    <Avatar 
                                        src={priceData[option.value].image.small} 
                                        alt={option.label} 
                                        style={{ margin: '0 auto 16px', width: '50px', height: '50px' }}
                                    />
                                    <Typography variant="h6" component="div" color="primary">
                                        {option.label}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        Current Price: ${priceData[option.value].market_data.current_price.usd.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        24h High: ${priceData[option.value].market_data.high_24h.usd.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        24h Low: ${priceData[option.value].market_data.low_24h.usd.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        24h Change: {priceData[option.value].market_data.price_change_percentage_24h.toFixed(2)}%
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        Loading...
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default PythData;
