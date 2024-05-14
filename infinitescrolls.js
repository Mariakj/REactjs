**InfiniteScroll.js**
```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const InfiniteScroll = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${currentPage}`);
      const newArticles = response.data;
      setArticles([...articles, ...newArticles]);
      if (newArticles.length < 10) {
        setHasMore(false);
      } else {
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = () => {
    if (hasMore && window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      fetchArticles();
    }
  };

  const handleLike = (id) => {
    setLikes((prevLikes) => ({ ...prevLikes, [id]: (prevLikes[id] || 0) + 1 }));
  };

  return (
    <div className="photo-gallery">
      {articles.map((article) => (
        <div key={article.id} className="photo-item">
          <img src={article.download_url} alt={article.author} />
          <div className="like-button">
            <FontAwesomeIcon icon={faThumbsUp} onClick={() => handleLike(article.id)} />
            <span>{likes[article.id] || 0}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfiniteScroll;
