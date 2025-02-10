import { getAllArticle } from "@/hooks/article/getAllArticle";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { bn } from "date-fns/locale";

export default async function ArticlePage() {
  const page = 1;
  const pageSize = 5; // Fetching 5 articles to fit the layout
  const newsData = await getAllArticle(page, pageSize);

  if (!newsData.articles || newsData.articles.length === 0) {
    return <p className="text-center text-red-500">No articles available</p>;
  }

  const mainArticle = newsData.articles[0];
  const subArticles = newsData.articles.slice(1, 5); // Next 6 articles

  return (
    <div className="">

    <div className="max-w-screen-xl mx-auto p-2 sm:p-2 lg:p-4">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
        {/* Main Article - Large Feature */}
        

        <div className="sm:col-span-7">
           <p className="text-sm bg-purple-300 rounded-sm sm:text-xl md:text-xl lg:text-2xl">আজকের খবর</p>
           <hr className="w-2/2 mx-auto border-t-2 border-gray-600 my-6" />

          <div className="shadow-lg rounded-lg overflow-hidden">
            <Link href={`/latest/${mainArticle.id}`} className="block">
              <picture>
                <img
                  src={mainArticle.urlToImage?.[0] || "/default-image.jpg"}
                  alt={mainArticle.headline}
                  className="w-full aspect-[16/9] object-cover"
                />
              </picture>
            </Link>
            <div className="p-5">
              <h2 className="text-2xl font-bold  hover:text-indigo-600 transition">
                <Link href={`/latest/${mainArticle.id}`}>{mainArticle.headline}</Link>
              </h2>
              <p className=" mt-2 text-sm line-clamp-3">{mainArticle.description}</p>
              <div className="text-gray-700 text-sm mt-2 flex justify-between">
                <Link href={`/latest/${mainArticle.id}`} className="text-blue-500 font-medium">
                আরও বিস্তারিত!
                </Link>
              </div>
              <section className="text-sm text-gray-600 mb-6">
        <span className="text-gray-500">
          {formatDistanceToNow(new Date(mainArticle.publishedAt), { addSuffix: true, locale: bn })}
        </span>
      </section>
            </div>
          </div>
        </div>

        {/* Sub Articles - Right Side */}
        <div className="sm:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {subArticles.map((article) => (
            <div key={article.id} className=" shadow-md rounded-lg overflow-hidden">
              <Link href={`/latest/${article.id}`} className="block">
                <picture>
                  <img
                    src={article.urlToImage?.[0] || "/default-image.jpg"}
                    alt={article.headline}
                    className="w-full aspect-[16/9] object-cover"
                  />
                </picture>
              </Link>
              <div className="p-3">
                <h3 className="text-md font-semibold text-gray-900 hover:text-indigo-600 transition">
                  <Link href={`/latest/${article.id}`}>{article.headline}</Link>
                </h3>
                <p className="text-xs t mt-1">{article.keywords}</p>
                <span className="text-gray-500">
          {formatDistanceToNow(new Date(mainArticle.publishedAt), { addSuffix: true, locale:bn })}
        </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
