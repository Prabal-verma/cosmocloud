import { CosmocloudClient } from 'cosmocloud-sdk';

const cosmocloud = new CosmocloudClient({
  accessKey: process.env.COSMOCLOUD_ACCESS_KEY,
  secretKey: process.env.COSMOCLOUD_SECRET_KEY,
  region: "us-east-1"
});

export const getUserPortfolio = async () => {
  try {
    const data = await cosmocloud.getObject('portfolios', 'user-portfolio.json');
    return JSON.parse(data.Body.toString());
  } catch (error) {
    console.error("Error fetching portfolio:", error);
  }
};

export const saveUserPortfolio = async (portfolio) => {
  try {
    await cosmocloud.putObject('portfolios', 'user-portfolio.json', JSON.stringify(portfolio));
  } catch (error) {
    console.error("Error saving portfolio:", error);
  }
};
