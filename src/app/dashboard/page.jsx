"use client"
import { useEffect, useState } from 'react';
import { getMarketPrediction, getSentimentAnalysis } from '../../lib/gemini';
import { db } from '../../lib/firebaseConfig'; // Import Firebase if needed
import { collection, getDocs } from 'firebase/firestore'; // Firebase Firestore methods

const CryptoDashboard = () => {
  const [predictions, setPredictions] = useState([]);
  const [sentiment, setSentiment] = useState([]);
  const [userPortfolioData, setUserPortfolioData] = useState([]);
  const [marketNews, setMarketNews] = useState([]);

  // Function to fetch user's portfolio data (from Firebase or MongoDB)
  const fetchUserPortfolio = async () => {
    try {
      // Example: Fetching data from Firebase Firestore
      const querySnapshot = await getDocs(collection(db, 'portfolios'));
      const portfolios = [];
      querySnapshot.forEach((doc) => {
        portfolios.push(doc.data());
      });
      setUserPortfolioData(portfolios);
    } catch (error) {
      console.error("Error fetching user portfolio data:", error);
    }
  };

  // Function to fetch market news (placeholder)
  const fetchMarketNews = async () => {
    // Example data, you can replace this with an actual news API integration
    const news = [
      { title: "Bitcoin surges to new highs!", description: "Bitcoin has crossed $60k..." },
      { title: "Ethereum network upgrades", description: "Upcoming upgrades in Ethereum..." }
    ];
    setMarketNews(news);
  };

  useEffect(() => {
    // Fetch user portfolio and market news initially
    fetchUserPortfolio();
    fetchMarketNews();

    const fetchInsights = async () => {
      if (userPortfolioData.length > 0) {
        const marketPrediction = await getMarketPrediction(userPortfolioData);
        const sentimentAnalysis = await getSentimentAnalysis(marketNews);
        
        if (marketPrediction) setPredictions(marketPrediction);
        if (sentimentAnalysis) setSentiment(sentimentAnalysis);
      }
    };

    // Ensure data is fetched before calling Gemini AI functions
    if (userPortfolioData.length && marketNews.length) {
      fetchInsights();
    }
  }, [userPortfolioData, marketNews]);

  return (
    <div className="dashboard">
      <h2>Market Predictions</h2>
      <div>
        {predictions.map((pred, index) => (
          <p key={index}>{pred.insight}</p>
        ))}
      </div>
      <h2>Sentiment Analysis</h2>
      <div>
        {sentiment.map((sent, index) => (
          <p key={index}>{sent.overview}</p>
        ))}
      </div>
    </div>
  );
};

export default CryptoDashboard;
