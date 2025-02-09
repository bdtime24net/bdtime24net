import { getAllArticle } from "@/hooks/article/getAllArticle";
import Link from "next/link";

export default async function ArticlePage() {
  // Set default values for page and pageSize
  const page = 1;      // You can change this to any desired page
  const pageSize = 10; // Set how many articles you want to show per page

  // Call the getAllArticle function with page and pageSize arguments
  const newsData = await getAllArticle(page, pageSize);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mt-24 mb-8">Latest News</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsData.articles.length > 0 ? (
          newsData.articles.map((article: any) => (
            <div key={article.headline} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <picture>
                <img
                  src={article.urlToImage?.[0] || "/default-image.jpg"}
                  alt={article.headline}
                  className="w-full h-56 object-cover"
                />
              </picture>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 truncate">{article.headline}</h2>
                <p className="text-gray-600 mt-2 text-sm truncate">{article.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <Link href={`/latest/${article.id}`} className="text-blue-500 text-sm font-medium">
                    Read More
                  </Link>
                  <span className="text-gray-400 text-sm">
                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500 col-span-3">No articles available</p>
        )}
      </div>
    </div>
  );
}
