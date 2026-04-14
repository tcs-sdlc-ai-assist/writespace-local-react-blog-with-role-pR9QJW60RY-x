import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import BlogCard from '../BlogCard';
import { getAllPosts } from '../storage';
import { getSession, getUserRole } from '../auth';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setPosts(getAllPosts());
    setCurrentUser(getSession());
  }, []);

  // Show edit/delete controls if user is admin or author
  const canEditOrDelete = post => {
    if (!currentUser) return false;
    if (getUserRole() === 'admin') return true;
    return post.author && post.author.username === currentUser.username;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Blog Posts</h1>
        {posts.length === 0 ? (
          <div className="text-center text-gray-500">No posts yet. Start writing your first blog!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogCard
                key={post.id}
                post={post}
                showControls={canEditOrDelete(post)}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}