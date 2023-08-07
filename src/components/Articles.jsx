import { useContext } from "react";
import { AppContext } from "../context/context";
import Loader from "./Loader";

function Articles() {
  const { hits, isLoading, deleteArticle } = useContext(AppContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {hits.map((article) => {
        const { title, author, num_comments, url, objectID } = article;
        return (
          <div className="article-card">
            <h2 className="article-title">{title}</h2>
            <div className="article-meta">
              <p className="article-author">
                Written by : <span>{author}</span>{" "}
              </p>
              <p className="divider"> | </p>
              <p className="article-comments">
                Comments - <span>{num_comments}</span>
              </p>
            </div>
            <div className="cta-btns">
              <a className="article-url" target="_blank" href={url}>
                Read More
              </a>
              <button onClick={() => deleteArticle(objectID)}>Delete</button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Articles;
