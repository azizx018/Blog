import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import { useState, useEffect } from "react";


const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes:0, comments: [] });

    useEffect(() => {
        setArticleInfo({ upvotes: 3, comments: []})
    });

    const params = useParams();
    const articleId = params.articleId;
    const article = articles.find(article => article.name === articleId);

    if (!article) {
        return <NotFoundPage/>

    }

    return (
        <>
        <h1>{article.title}</h1>
        <p>This article has {articleInfo.upvotes} upvotes!</p>
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))};
        
        </>
        
    );
}

export default ArticlePage;