import React from 'react';
import newsData from '@/data/homeNews.json'; // Adjust the path as necessary

const News11: React.FC = () => {
    return (
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-10">
                {/* Main Article */}
                <div className="sm:col-span-6 lg:col-span-5">
                    <a href="#">
                        <div
                            className="h-56 bg-cover text-center overflow-hidden"
                            style={{
                                backgroundImage: `url('${newsData.news[0].imageUrl}')`,
                            }}
                            title={newsData.news[0].title}
                        ></div>
                    </a>
                    <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                        <div className="lg:pl-16">
                            <a
                                href="#"
                                className="text-xs text-indigo-600 uppercase font-medium mb-3 flex items-center hover:text-gray-900 transition duration-500 ease-in-out"
                            >
                                {newsData.news[0].category}
                            </a>
                            <a
                                href="#"
                                className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 transition duration-500 ease-in-out"
                            >
                                {newsData.news[0].title}
                            </a>
                            <p className="text-gray-700 text-xs mt-2">
                                {newsData.news[0].description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Secondary Articles */}
                <div className="sm:col-span-6 lg:col-span-4">
                    {newsData.news.slice(1).map((article, index) => (
                        <div className="flex items-start mb-3 pb-3" key={index}>
                            <a href="#" className="inline-block mr-3">
                                <div
                                    className="w-20 h-20 bg-cover bg-center"
                                    style={{ backgroundImage: `url('${article.imageUrl}')` }}
                                ></div>
                            </a>
                            <div className="text-sm">
                                <p className="text-gray-600 text-xs">{article.location}</p>
                                <a
                                    href="#"
                                    className="text-gray-900 font-medium hover:text-indigo-600 leading-none"
                                >
                                    {article.title}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar */}
                <div className="sm:col-span-12 lg:col-span-3">
                    <a href="#">
                        <div
                            className="h-56 bg-cover text-center overflow-hidden"
                            style={{
                                backgroundImage: `url('${newsData.news[0].imageUrl}')`,
                            }}
                            title={newsData.news[0].title}
                        ></div>
                    </a>
                    <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                        <div>
                            <a
                                href="#"
                                className="text-xs text-indigo-600 uppercase font-medium flex items-center hover:text-gray-900 transition duration-500 ease-in-out"
                            >
                                {newsData.news[0].category}
                            </a>
                            <a
                                href="#"
                                className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 transition duration-500 ease-in-out"
                            >
                                {newsData.news[0].title}
                            </a>
                            <p className="text-gray-700 text-xs mt-2">
                                {newsData.news[0].content}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News11;
