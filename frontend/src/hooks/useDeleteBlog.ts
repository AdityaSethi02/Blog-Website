import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';

const useDeleteBlog = () => {
    const navigate = useNavigate();

    const handleDelete = async (blogId: number) => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/my-blogs/:authId");
        } catch (error) {
            console.error("Error deleting blog: ", error);
            alert("Failed to delete blog. Please try again.");
        }
    };

    return { handleDelete };
};

export default useDeleteBlog;
