import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { Link } from "react-router-dom";
import useFormatDate from "../hooks/useFormatDate";

export interface Blog {
    id: number;
    title: string;
    content: string;
    author: {
        name: string;
    };
    publishedAt: string;
}

export const MyBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const formatDate = useFormatDate(new Date());

  useEffect(() => {
    const fetchMyBlogs = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/my-blogs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(Array.isArray(response.data.blogs) ? response.data.blogs : []);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);

  if (loading) {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <AppBar />
            <div className="flex-1 flex items-center justify-center text-lg font-semibold"> Loading... </div>
        </div>
    )
  }

  if (blogs.length === 0) {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <AppBar />
            <div className="flex-1 flex flex-col items-center justify-center text-lg font-semibold">
                <div>No Blogs Found!</div>
                <Link to={`/publish`}>
                    <button
                        type="button"
                        className="mt-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                    >
                        Publish New
                    </button>
                </Link>
            </div>
        </div>
    );
}

  return (
    <div>
        <AppBar />
        <div className="flex flex-col items-center justify-center">
            {blogs.map((blog) => (
                <BlogCard key={blog.id} id={blog.id} authorName={blog.author.name} title={blog.title} content={blog.content} publishedAt={formatDate} />
            ))}
        </div>
    </div>
  )
}

