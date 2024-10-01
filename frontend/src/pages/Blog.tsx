import { useParams } from "react-router-dom"
import { useBlog } from "../hooks/useBlog";
import { AppBar } from "../components/AppBar";
import { Spinner } from "../components/Spinner";
import { FullBlog } from "../components/FullBlog";
import { useLoggedIn } from "../hooks/useLoggedIn";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });

    useLoggedIn();

    if (loading || !blog)
    {
        return (
            <div>
                <AppBar />

                <div className="h-screen flex flex-col justify-center">
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <FullBlog blog={blog} />
        </div>
    )
}