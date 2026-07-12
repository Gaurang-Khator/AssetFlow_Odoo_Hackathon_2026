"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // TODO: BACKEND_INTEGRATION
    // Replace this setTimeout block with your FastAPI endpoint: POST /api/v1/auth/signup
    // Ensure the payload structure matches your Pydantic schema: { name, email, password }
    // Note: Per AssetFlow logic, this should automatically default the user role to 'Employee'.
    setTimeout(() => {
      setLoading(false);
      setMessage('Account created successfully as an Employee! Please log in.');
      setFormData({ name: '', email: '', password: '' });
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Join AssetFlow to track and manage organizational tools.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:bg-zinc-700 dark:text-white"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:bg-zinc-700 dark:text-white"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:bg-zinc-700 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          {message && (
            <div className="p-3 text-sm rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
              {message}
            </div>
          )}

          <div>
            <Button type="submit" className="w-full justify-center" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-zinc-950 dark:text-white hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}