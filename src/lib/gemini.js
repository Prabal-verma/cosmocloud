import axios from 'axios';

const geminiAPI = axios.create({
  baseURL: 'https://gemini.googleapis.com/v1', // Hypothetical URL, replace with actual if different
  headers: {
    'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const getMarketPrediction = async (cryptoData) => {
  try {
    const response = await geminiAPI.post('/market/predict', {
      data: cryptoData,
    });
    return response.data;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return null;
  }
};

export const getSentimentAnalysis = async (newsArticles) => {
  try {
    const response = await geminiAPI.post('/news/analyze', {
      articles: newsArticles,
    });
    return response.data;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return null;
  }
};
