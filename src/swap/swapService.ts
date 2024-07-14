export const getSwapRate = async (fromAsset: string, toAsset: string): Promise<number> => {
    try {
        const fromResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${fromAsset}&vs_currencies=usd`);
        const toResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${toAsset}&vs_currencies=usd`);

        if (!fromResponse.ok || !toResponse.ok) {
            throw new Error('Failed to fetch price data from CoinGecko API');
        }

        const fromData = await fromResponse.json();
        const toData = await toResponse.json();

        const fromPrice = fromData[fromAsset]?.usd;
        const toPrice = toData[toAsset]?.usd;

        if (fromPrice && toPrice) {
            return toPrice / fromPrice;
        } else {
            throw new Error('Price data not found for the given assets');
        }
    } catch (error) {
        console.error('Error fetching swap rate:', error);
        throw error;
    }
};
