import { useParams } from "react-router-dom"; // Assuming you use React Router
import { useBlogPost } from "@/api/blog";
import { LoadingOverlay } from "@/components/loading-overlay";

const BlogPost = () => {
  // Assuming you get the blogId from the URL params, e.g., /blog/:blogId
  const { blogId } = useParams<{ blogId: string }>();
  const id = blogId ? parseInt(blogId, 10) : undefined; // Convert to number

  // If id is not defined, show an error or loading state
  if (id === undefined || isNaN(id)) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        Id bài viết không hợp lệ.
      </div>
    );
  }

  const { data: blog, isLoading, isError, error } = useBlogPost(id);

  if (isLoading) {
    return <LoadingOverlay message="Đang tải" />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        Lỗi khi tải bài viết: {error?.message || "Unknown error"}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        Không tìm thấy bài viết
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-3xl bg-white rounded-lg shadow-xl p-8 md:p-10">
        <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a
                href="/manager/blogs"
                className="text-blue-600 hover:underline"
              >
                Blogs
              </a>
              <svg
                className="fill-current w-3 h-3 mx-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.029c9.373 9.372 9.373 24.568 0 33.942z" />
              </svg>
            </li>
            <li>
              <span className="text-gray-700">{blog.title}</span>
            </li>
          </ol>
        </nav>

        <header className="mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {blog.title}
          </h1>
          <div className="text-gray-600 text-sm md:text-base flex items-center space-x-4">
            <span>
              Đăng bởi{" "}
              <span className="font-semibold text-gray-800">{blog.author}</span>
            </span>
            {/* Optional: Add creation/last updated date if your Blog interface has it */}
            {/* <span>•</span>
            <span>Published on {new Date(blog.createdAt).toLocaleDateString()}</span> */}
          </div>
        </header>

        {/* Optional: Featured Image */}
        {/* {blog.imageUrl && (
          <figure className="mb-8 rounded-lg overflow-hidden">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-auto object-cover max-h-96"
            />
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              A relevant image for {blog.title}
            </figcaption>
          </figure>
        )} */}

        {/* Blog Post Content */}
        <article className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          {/*
            This is where the main content of your blog post will go.
            If 'blog.content' contains HTML (e.g., from a rich text editor),
            you'll need to use dangerouslySetInnerHTML.
            Be extremely cautious with dangerouslySetInnerHTML as it can expose
            you to XSS attacks if the content is not sanitized.
            For production, always sanitize user-generated HTML content on the server-side
            or use a library like 'dompurify' on the client.
          */}
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />

          {/* If your content is plain text, just render it directly: */}
          {/* <p>{blog.content}</p> */}
        </article>

        {/* Separator */}
        <hr className="my-10 border-gray-200" />

        {/* Optional: Author Bio, Related Posts, Comments Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Thanks for reading!
          </h2>
          <p className="text-gray-700">
            Check out more posts or leave a comment below.
          </p>
          {/* Add buttons or links for sharing */}
        </section>
      </div>
    </div>
  );
};

export default BlogPost;
