import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from './BlogCard';
import { useState } from 'react';

export const AppBar = () => {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const navigate = useNavigate();
    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("authorName");
        navigate("/signup");
    };

    const authorName = localStorage.getItem("authorName") || "Guest";

    return (
        <div>
            <div className="border-b flex justify-between items-center px-10 py-4">
                <Link to={`/blogs`} className="flex flex-col justify-center cursor-pointer text-3xl font-bold">
                    Blogssss
                </Link>

                <div className="flex flex-row items-center">
                    <Link to={`/publish`}>
                        <button
                            type="button"
                            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                        >
                            Publish New
                        </button>
                    </Link>

                    <div onClick={() => setDropDownOpen(!dropDownOpen)} className="cursor-pointer">
                        <Avatar size={"big"} name={authorName} />
                    </div>

                    {dropDownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <Link to="/my-blogs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                My Blogs
                            </Link>
                            <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
