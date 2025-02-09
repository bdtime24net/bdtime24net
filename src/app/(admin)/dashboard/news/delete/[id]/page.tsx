import React from 'react';
import DeleteArticle from '@/components/molecules/v2/DeleteArticle';

interface DeleteArticlePageProps {
  params: {
    id: string;
  };
}

const DeleteArticlePage: React.FC<DeleteArticlePageProps> = ({ params }) => {
  const { id } = params;

  return (
    <div className="container mx-auto p-4">
      <DeleteArticle articleId={id} />
    </div>
  );
};

export default DeleteArticlePage;
