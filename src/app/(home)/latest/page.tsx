// app/article/page.tsx
import { getAllArticle } from "@/hooks/article/useAeticle";
import Link from "next/link";

export default async function ArticlePage() {
  const newsData = await getAllArticle();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mt-24 mb-8">Latest News</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsData.articles.length > 0 ? (
          newsData.articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
             <picture>
             <img
                src={article.urlToImage[0]}
                alt={article.headline}
                className="w-full h-56 object-cover"
              />
             </picture>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 truncate">{article.headline}</h2>
                <p className="text-gray-600 mt-2 text-sm truncate">{article.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    href={`/latest/${article.id}`}
                    className="text-blue-500 text-sm font-medium"
                  >
                    Read More
                  </Link>
                  <span className="text-gray-400 text-sm">
                    {new Date(article.categoryId).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No articles available</p>
        )}
      </div>
    </div>
  );
}
