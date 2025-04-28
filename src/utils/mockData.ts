
// Types
export type Sentiment = 'positive' | 'negative' | 'neutral';

export interface SentimentDataPoint {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}

export interface WordFrequency {
  word: string;
  frequency: number;
  sentiment: Sentiment;
}

export interface SubredditSentiment {
  subreddit: string;
  positive: number;
  negative: number;
  neutral: number;
}

export interface AuthorSentiment {
  author: string;
  sentiment: number; // -1 to 1 scale
  posts: number;
}

export interface TopicSentiment {
  topic: string;
  positive: number;
  negative: number;
  neutral: number;
}

export interface PostInteraction {
  id: string;
  sentiment: number; // -1 to 1 scale
  interactions: number; // likes + comments
  title: string;
}

// Mock data generators
export const generateTimeSeriesData = (days = 30): SentimentDataPoint[] => {
  const data: SentimentDataPoint[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    data.push({
      date: date.toISOString().split('T')[0],
      positive: Math.random() * 50 + 20,
      negative: Math.random() * 30 + 10,
      neutral: Math.random() * 20 + 5,
    });
  }
  
  return data;
};

export const generateTopWords = (): WordFrequency[] => {
  const positiveWords = [
    'amazing', 'excellent', 'good', 'great', 'love',
    'awesome', 'fantastic', 'helpful', 'impressive', 'wonderful'
  ];
  
  const negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'disappointing',
    'useless', 'hate', 'poor', 'wrong', 'frustrating'
  ];
  
  const neutralWords = [
    'okay', 'average', 'fine', 'normal', 'standard'
  ];
  
  const results: WordFrequency[] = [];
  
  positiveWords.forEach(word => {
    results.push({
      word,
      frequency: Math.floor(Math.random() * 100) + 50,
      sentiment: 'positive'
    });
  });
  
  negativeWords.forEach(word => {
    results.push({
      word,
      frequency: Math.floor(Math.random() * 80) + 20,
      sentiment: 'negative'
    });
  });
  
  neutralWords.forEach(word => {
    results.push({
      word,
      frequency: Math.floor(Math.random() * 60) + 10,
      sentiment: 'neutral'
    });
  });
  
  return results.sort((a, b) => b.frequency - a.frequency).slice(0, 10);
};

export const generateSubredditSentiments = (): SubredditSentiment[] => {
  const subreddits = [
    'technology', 'science', 'worldnews', 'politics', 
    'movies', 'gaming', 'music', 'books', 'food', 'sports'
  ];
  
  return subreddits.map(subreddit => ({
    subreddit,
    positive: Math.random() * 100,
    negative: Math.random() * 100,
    neutral: Math.random() * 50,
  }));
};

export const generateSentimentDistribution = () => {
  const positive = Math.random() * 50 + 20;
  const negative = Math.random() * 30 + 10;
  const neutral = 100 - positive - negative;
  
  return [
    { name: 'Positive', value: positive, color: '#1EAEDB' },
    { name: 'Negative', value: negative, color: '#F97316' },
    { name: 'Neutral', value: neutral, color: '#8E9196' }
  ];
};

// Get mock data for all visualizations
export const mockData = {
  timeSeriesData: generateTimeSeriesData(),
  topWords: generateTopWords(),
  subredditSentiments: generateSubredditSentiments(),
  sentimentDistribution: generateSentimentDistribution()
};
