import React from 'react';
import HomeLayout from '@/layouts/HomeLayout';
const Home: React.FC = () => {
  return (
    <HomeLayout>
      <section className="text-center py-20  mt-16">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our Website</h1>
        <p className="text-xl text-gray-600 mb-6">
          Discover amazing content and explore the world of possibilities.
        </p>
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300">
          Get Started
        </button>
      </section>

      <section className="py-10">
        <p className="text-9xl text-justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ut nihil quibusdam voluptate ducimus aspernatur doloribus quo voluptatum modi! Hic, ipsa fuga pariatur tempore similique eum perferendis delectus ea corrupti iste earum, alias tempora ipsum facilis beatae exercitationem aliquid sapiente. Natus, voluptatibus quae. Adipisci cupiditate rem ea! Ipsum neque magni, labore nam mollitia architecto odio soluta est vel, aliquid autem cumque? Tempora quibusdam molestiae odit a doloribus repellendus voluptatum cupiditate. Consequuntur alias ratione neque, inventore nostrum similique perspiciatis, laudantium reiciendis eligendi, minus sint. Doloremque nobis eaque ut cum labore id, alias dolor dolore tenetur voluptatem quasi dolores officia, repellendus sit.
        </p>
      </section>
    </HomeLayout>
  );
};

export default Home;
