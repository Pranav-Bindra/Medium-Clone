import { BlogDetails } from "../components/BlogDetails";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });


    if (loading) {
        return <div className="ml-24 mt-24">
            <BlogSkeleton></BlogSkeleton>
        </div>
    }

    return <div>
    {blog && <BlogDetails blog = {blog} />}
</div>
}