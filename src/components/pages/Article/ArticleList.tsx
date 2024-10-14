'use client'; // Ensures interactivity in the client side
import React, { useEffect, useState } from 'react';

interface Article {
  id: string;
  headline: string;
  sourceName: string;
  url: string;
  urlToImage: string[];
  description: string;
}

const ArticleList: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/article");
        const data = await res.json();
        setNews(data.data); // Use the data array from the API response
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-10">
      {news.length === 0 ? (
        <p>No articles available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article) => (
            <div key={article.id} className="bg-white shadow-lg p-6 rounded-lg">
              <img
                src={article.urlToImage[0] || '/default-image.jpg'}
                alt={article.headline}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-bold mb-2">{article.headline}</h3>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ArticleList;
