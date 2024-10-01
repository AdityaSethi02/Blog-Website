import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    id: number;
    title: string;
    content: string;
    authorId: number;
    author: {
        name: string;
    };
    publishedAt: string;
}

export const useBlog = ({ id }: { id: string }) => {
    const[loading, setLoading] = useState(true);
    const[blog, setBlog] = useState<Blog>();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }
        axios.get(`${BACKEND_URL}/api/v1/blog/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
        }, [id])

    return { loading, blog };
}

export const useBlogs = ({page=1, pageSize=5}) => {
    const[loading, setLoading] = useState(true);
    const[blogs, setBlogs] = useState<Blog[]>([]);
    const[totalPages, setTotalPages] = useState(1);
    const[currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/blog/bulk?page=${currentPage}&pageSize=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setBlogs(response.data.blogs);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching blogs: ", error);
            setLoading(false);
        });
    }, [currentPage, pageSize]);

    return { loading, blogs, totalPages, currentPage, setCurrentPage };
}