import React from "react";

interface Post {
  title: string;

  content: string;
  image?: string; // Thêm dòng này
}

interface EduCardsUserProps {
  posts: Post[];
}

const EduCardsUser: React.FC<EduCardsUserProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
      {posts.map((post, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
        >
          <div className="w-full h-70 bg-gray-200 flex items-center justify-center mb-4 rounded overflow-hidden">
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400">Ảnh</span>
            )}
          </div>
          <h2 className="font-bold">{post.title}</h2>

          <div className="flex items-center mb-3">
            <span className="text-gray-400">{post.content}</span>
          </div>
          <button className="w-30 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Đọc thêm
          </button>
        </div>
      ))}
    </div>
  );
};

export default EduCardsUser;
