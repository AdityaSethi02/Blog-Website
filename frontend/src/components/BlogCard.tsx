import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedAt: string,
    id: number
}

export const BlogCard = ({
    id, authorName, title, content, publishedAt
}: BlogCardProps) => {
    console.log("BlogCardProps:", publishedAt); // BlogCardProps: NaNth Invalid undefined
    return (
        <div>
            <Link to={`/blog/${id}`}>
                <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <Avatar name={authorName} />
                            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                                {authorName}
                            </div>
                            <div className="flex justify-center flex-col pl-2">
                                <Circle />
                            </div>
                            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                                {publishedAt}
                            </div>
                        </div>
                        <div className="text-xl font-semibold pt-2">
                            {title}
                        </div>
                        <div className="text-md font-thin pt-2">
                            {content.slice(0, 100) + "..."}
                        </div>
                        <div className="text-slate-500 text-sm font-thin pt-4">
                            {`${Math.ceil(content.length / 100)} minute(s) read`}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export function Circle() {
    return (
        <div>
            <div className="h-1 w-1 rounded-full bg-slate-500">

            </div>
        </div>
    )
}

export function Avatar({ name, size="small"}: { name: string, size?: "small" | "big"}) {
    return (
        <div>
          <div
            className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
              size === "small" ? "w-6 h-6" : "w-10 h-10"
            }`}
          >
            <span
              className={`flex items-center justify-center ${
                size === "small" ? "text-xs" : "text-md"
              } font-extralight text-white`}
            >
              {name[0]}
            </span>
          </div>
        </div>
    );
}