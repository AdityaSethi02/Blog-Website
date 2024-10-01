import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import Pagination from "../components/Pagination";
import { useBlogs } from "../hooks/useBlog";
import useFormatDate from "../utils/formatDate";

export interface Blog {
    id: number;
    title: string;
    content: string;
    author: {
        name: string;
    };
    publishedAt: string;
}

export const AllBlogs = () => {
    const { loading, blogs, totalPages, currentPage, setCurrentPage } = useBlogs({ page: 1, pageSize: 5 });
    const formatDate = useFormatDate(new Date());

    if (loading) {
        return (
            <div>
                <AppBar />

                <div className="flex justify-center">
                    <div>
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <AppBar />

            <div className="flex justify-center mt-4">
                <div>
                    {blogs.map(blog => (<BlogCard key={blog.id} id={blog.id} authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} publishedAt={formatDate} />))}
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </div>
    )
}