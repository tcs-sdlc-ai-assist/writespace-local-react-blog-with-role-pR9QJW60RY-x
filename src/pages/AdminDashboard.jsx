import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import StatCard from '../StatCard';
import BlogCard from '../BlogCard';
import { getSession, getUserRole } from '../auth';
import { getAllBlogs, getAllUsers } from '../storage';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    blogs: 0,
    users: 0,
  });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (!session || getUserRole() !== 'admin') {
      navigate('/login');
      return;
    }
    try {
      const blogs = getAllBlogs();
      const users = getAllUsers();
      setStats({
        blogs: blogs.length,
        users: users.length,
      });
      setRecentBlogs(
        blogs
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )
          .slice(0, 5)
      );
    } catch (err) {
      setStats({ blogs: 0, users: 0 });
      setRecentBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

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

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <StatCard label="Total Blogs" value={stats.blogs} />
          <StatCard label="Total Users" value={stats.users} />
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => navigate('/write')}
            >
              Create Blog
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              onClick={() => navigate('/users')}
            >
              Manage Users
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Blogs</h2>
          <div className="space-y-4">
            {recentBlogs.length === 0 ? (
              <div className="text-gray-500">No blogs found.</div>
            ) : (
              recentBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  showControls={false}
                  currentUser={null}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}