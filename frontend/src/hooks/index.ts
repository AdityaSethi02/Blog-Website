import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    id: number;
    title: string;
    content: string;
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
            console.log("No token found");
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

export const useBlogs = () => {
    const[loading, setLoading] = useState(true);
    const[blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.log("No token found");
            setLoading(false);
            return;
        }
        // console.log(token);
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            // console.log("This is the token: ", localStorage.getItem("token"))
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            // console.log(response.data);
            if (response.data && Array.isArray(response.data)) {
                setBlogs(response.data);
            } else {
                console.error("Blogs data is not an array:", response.data);
            }
            setLoading(false);
        })
    }, [])

    return { loading, blogs };
}