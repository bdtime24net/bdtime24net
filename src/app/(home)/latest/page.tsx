import { getAllArticle } from "@/hooks/article/getAllArticle";
import Link from "next/link";
import { format } from "date-fns";
import { bn } from "date-fns/locale";

export default async function ArticlePage() {
  const page = 1;
  const pageSize = 7; // Fetching 7 articles to fit the layout
  const newsData = await getAllArticle(page, pageSize);

  if (!newsData.articles || newsData.articles.length === 0) {
    return <p className="text-center text-red-500">No articles available</p>;
  }

  const mainArticle = newsData.articles[0];
  const subArticles = newsData.articles.slice(1, 7); // Next 6 articles

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
        {/* Main Article - Left Side */}
        <div className="sm:col-span-7">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Link href={`/latest/${mainArticle.id}`}>
              <picture>
              <img
                src={mainArticle.urlToImage?.[0] || "/default-image.jpg"}
                alt={mainArticle.headline}
                className="w-full h-72 object-cover"
              />
              </picture>
            </Link>
            <div className="p-5">
              <h2 className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition">
                <Link href={`/latest/${mainArticle.id}`}>{mainArticle.headline}</Link>
              </h2>
              <p className="text-gray-600 mt-2 text-sm truncate">{mainArticle.description}</p>
              <div className="text-gray-700 text-sm mt-2 flex justify-between">
                <Link href={`/latest/${mainArticle.id}`} className="text-blue-500 font-medium">
                  Read More
                </Link>
                <span className="text-gray-400">
                  {mainArticle.publishedAt ? format(new Date(mainArticle.publishedAt), "PPP p", { locale: bn }) : "N/A"}
                </span>
              </div>
              <div className="text-gray-500 text-xs mt-2">সংবাদদাতা: {mainArticle.reporter}</div>
            </div>
          </div>
        </div>
        
        {/* Sub Articles - Right Side Grid */}
        <div className="sm:col-span-5 grid grid-cols-2 lg:grid-cols-3 gap-5">
          {subArticles.map((article) => (
            <div key={article.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <Link href={`/latest/${article.id}`}>
               <picture>
               <img
                  src={article.urlToImage?.[0] || "/default-image.jpg"}
                  alt={article.headline}
                  className="w-full h-40 object-cover"
                />
               </picture>
              </Link>
              <div className="p-3">
                <h3 className="text-md font-semibold text-gray-900 hover:text-indigo-600 transition">
                  <Link href={`/latest/${article.id}`}>{article.headline}</Link>
                </h3>
                <div className="text-gray-500 text-xs mt-1">{format(new Date(article.publishedAt), "PPP p", { locale: bn })}</div>
              </div>
              <p className="text-xs">{
                  article.keywords
                }</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
