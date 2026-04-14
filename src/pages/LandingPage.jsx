import React, { useEffect, useState } from 'react';
import PublicNavbar from '../PublicNavbar';
import BlogCard from '../BlogCard';
import { getAllPosts } from '../storage';

export default function LandingPage() {
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const posts = getAllPosts();
    // Sort by createdAt descending, take 3 latest
    const sorted = posts
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
    setLatestPosts(sorted);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Welcome to <span className="text-indigo-600">WriteSpace</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            A modern, minimalist space to share your thoughts and stories. Join our community of writers and readers.
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why WriteSpace?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 rounded-lg p-6 shadow hover:shadow-md transition">
              <div className="text-indigo-600 text-3xl mb-3">📝</div>
              <h3 className="font-semibold text-lg mb-2">Effortless Writing</h3>
              <p className="text-gray-600">Compose and publish your stories with a distraction-free editor and simple controls.</p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-6 shadow hover:shadow-md transition">
              <div className="text-indigo-600 text-3xl mb-3">🌍</div>
              <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
              <p className="text-gray-600">Read, comment, and connect with other passionate writers and readers.</p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-6 shadow hover:shadow-md transition">
              <div className="text-indigo-600 text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-lg mb-2">Your Space, Your Rules</h3>
              <p className="text-gray-600">You control your content. Edit or delete your posts anytime, with privacy in mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Preview */}
      <section className="py-16 px-4 bg-gray-50 flex-1">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Latest Posts</h2>
          {latestPosts.length === 0 ? (
            <div className="text-center text-gray-500">No posts yet. Be the first to write!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map(post => (
                <BlogCard
                  key={post.id}
                  post={post}
                  showControls={false}
                />
              ))}
            </div>
          )}
          <div className="mt-10 text-center">
            <a
              href="/blogs"
              className="inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              View All Posts
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-12">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} WriteSpace. Made with <span className="text-red-500">♥</span>.
        </div>
      </footer>
    </div>
  );
}