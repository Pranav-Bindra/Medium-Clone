import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if (loading) {
        return <div className="mt-24 ml-48">
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
        </div>
    }

    return <div>
        <AppBar></AppBar>
        <div className="flex justify-center p-4">
            <div>
                {blogs.map(blog => 
                <BlogCard id = {blog.id} 
                authorName={blog.author.name || "Anonymous"}
                title = {blog.title}
                content={blog.content}
                publishedDate={"2nd Feb 2024"}></BlogCard>
                )}
            </div>
        </div>
    </div>
}