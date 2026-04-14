import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { getSession, getUserRole, getCurrentUser } from '../auth';
import { getBlogById, saveBlog, updateBlog } from '../storage';

const TITLE_MAX = 100;
const CONTENT_MAX = 5000;

export default function WriteBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    author: null,
    createdAt: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate('/login');
      return;
    }
    const user = getCurrentUser();
    setCurrentUser(user);
    if (id) {
      setIsEdit(true);
      try {
        const foundBlog = getBlogById(id);
        if (!foundBlog) {
          setError('Blog post not found.');
        } else if (
          getUserRole() !== 'admin' &&
          foundBlog.author.id !== user.id
        ) {
          setError('You do not have permission to edit this post.');
        } else {
          setBlog({
            ...foundBlog,
          });
        }
      } catch (err) {
        setError('Failed to load blog post.');
      }
    } else {
      setBlog({
        title: '',
        content: '',
        author: user,
        createdAt: new Date().toLocaleString(),
      });
    }
    setLoading(false);
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!blog.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!blog.content.trim()) {
      setError('Content is required.');
      return;
    }
    if (blog.title.length > TITLE_MAX) {
      setError(`Title must be <= ${TITLE_MAX} characters.`);
      return;
    }
    if (blog.content.length > CONTENT_MAX) {
      setError(`Content must be <= ${CONTENT_MAX} characters.`);
      return;
    }
    try {
      if (isEdit) {
        updateBlog(id, {
          ...blog,
        });
      } else {
        saveBlog({
          ...blog,
          author: currentUser,
          createdAt: new Date().toLocaleString(),
        });
      }
      navigate('/');
    } catch (err) {
      setError('Failed to save blog post.');
    }
  };

  const handleCancel = () => {
    navigate(isEdit ? `/blog/${id}` : '/');
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

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6">
          {isEdit ? 'Edit Blog Post' : 'Create Blog Post'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={blog.title}
              onChange={handleChange}
              maxLength={TITLE_MAX}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <div className="text-xs text-gray-500 mt-1">
              {blog.title.length}/{TITLE_MAX}
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={blog.content}
              onChange={handleChange}
              maxLength={CONTENT_MAX}
              rows={10}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <div className="text-xs text-gray-500 mt-1">
              {blog.content.length}/{CONTENT_MAX}
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {isEdit ? 'Update' : 'Publish'}
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}