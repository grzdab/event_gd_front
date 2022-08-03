import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostsExcerpt = ({ postId }) => {
  console.log("post excerpt")
  const post = useSelector(state => selectPostById(state, postId))

    return (
        <article>
            <h2>{post.title}</h2>
            <p className="excerpt">{post.body.substring(0, 75)}...</p>
        </article>
    )
}

export default PostsExcerpt