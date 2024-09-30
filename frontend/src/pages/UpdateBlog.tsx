import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";

export const UpdateBlog = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { blog } = response.data;
            setTitle(blog.title);
            setDescription(blog.content);
        };
        fetchBlog();
    }, [id]);

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");

        try {
            await axios.put(`${BACKEND_URL}/api/v1/blog/update/${id}`, {
                id,
                title,
                content: description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate(`/blog/${id}`);
        } catch (error) {
            console.error("Error updating blog: ", error);
        }
    };

    return (
        <div>
            <AppBar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Title"
                    />

                    <TextEditor onChange={(e) => setDescription(e.target.value)} value={description} />

                    <button onClick={handleUpdate} className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Update Blog
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange, value }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void; value: string }) {
    return (
        <div>
            <div className="mt-2">
                <div className="w-full mb-4">
                    <div className="flex items-center justify-between border">
                        <div className="my-2 bg-white rounded-b-lg w-full">
                            <label className="sr-only">
                                Update Post
                            </label>
                            <textarea
                                value={value}
                                onChange={onChange}
                                id="editor"
                                rows={8}
                                className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
                                placeholder="Write an article..."
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}