import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Avatar from '../Avatar';
import { getSession, getUserRole, getCurrentUser } from '../auth';
import { getBlogById, deleteBlog } from '../storage';

export default function ReadBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate('/login');
      return;
    }
    setCurrentUser(getCurrentUser());
    if (!id) {
      setError('Invalid blog ID.');
      setLoading(false);
      return;
    }
    try {
      const foundBlog = getBlogById(id);
      if (!foundBlog) {
        setError('Blog post not found.');
      } else {
        setBlog(foundBlog);
      }
    } catch (err) {
      setError('Failed to load blog post.');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Delete this blog post?')) {
      try {
        deleteBlog(id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete blog post.');
      }
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-lg text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      </div>
    );
  }

  const canEdit =
    currentUser &&
    (getUserRole() === 'admin' || currentUser.id === blog.author.id);

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow p-8">
        <div className="flex items-center mb-6">
          <Avatar user={blog.author} size={48} />
          <div className="ml-4">
            <div className="font-semibold text-lg">{blog.author.name}</div>
            <div className="text-sm text-gray-500">{blog.createdAt}</div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="prose mb-8">{blog.content}</div>
        {canEdit && (
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}