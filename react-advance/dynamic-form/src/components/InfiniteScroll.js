import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const InfiniteScroll = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Pagination
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);
  const perPage = 20; // Har request me 20 posts load karo

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: { _limit: perPage, _page: page },
      });
      // Agar aur data ho to append karo, warna na karo
      if (res.data.length > 0) {
        setPosts((prev) => [...prev, ...res.data]);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Infinite Scroll Demo</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '10px' }}>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {loading && <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Loading more posts...</p>}
      <div ref={loaderRef}></div>
    </div>
  );
};

export default InfiniteScroll;
