import NationalPage from '@/app/(home)/national/page';
import Home from './Home';
import ArticleList from '@/components/pages/Article/ArticleList';

const HomePage: React.FC = () => {
  return (
    <>
      <Home />
      <ArticleList />
         <NationalPage />
    </>
  );
};

export default HomePage;
