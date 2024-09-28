import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { Link } from "react-router-dom";

interface Blog {
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
        console.log("User Blogs:", response.data.blogs, typeof response.data.blogs); // this is returning an object
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
                <BlogCard key={blog.id} id={blog.id} authorName={blog.author.name} title={blog.title} content={blog.content} publishedDate={formatDate(new Date())} />
            ))}
        </div>
    </div>
  )
}


export function formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const day = date.getDate();

    const suffix = day % 10 === 1 && day !== 11 ? 'st' :
                   day % 10 === 2 && day !== 12 ? 'nd' :
                   day % 10 === 3 && day !== 13 ? 'rd' : 'th';

    return `${day}${suffix} ${formattedDate.split(' ')[0]} ${formattedDate.split(' ')[2]}`;
}
