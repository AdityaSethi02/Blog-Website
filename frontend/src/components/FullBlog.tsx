import { Blog } from "../hooks/useBlog"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"
import { jwtDecode } from "jwt-decode";
import useDeleteBlog from "../hooks/useDeleteBlog";
import useFormatDate from "../utils/formatDate";
import { Link, useNavigate } from "react-router-dom";

export const FullBlog = ({ blog }: {blog: Blog}) => {
    const token = localStorage.getItem("token");
    const formatDate = useFormatDate(new Date());
    const navigate = useNavigate();
    const {handleDelete} = useDeleteBlog();
    interface DecodedToken {
        id: number;

    }

    const decoded: DecodedToken | null = token ? jwtDecode<DecodedToken>(token) : null;
    const loggedInUser = decoded ? decoded.id : null;

    return <div>
        <AppBar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on {formatDate}
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                            {loggedInUser === blog.authorId && (
                                <div className="justify-center">
                                    <div className="pt-4">
                                        <button onClick={() => handleDelete(blog.id)} className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
                                            Delete
                                        </button>
                                    </div>
                                    <div className="pt-4">
                                        <Link to={`/update/${blog.id}`}>
                                            <button onClick={() => navigate(`/update/${blog.id}`)} className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                                Update
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}