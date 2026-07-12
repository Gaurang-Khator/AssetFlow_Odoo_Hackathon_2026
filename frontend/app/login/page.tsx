"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // TODO: BACKEND_INTEGRATION
    // Replace this mock behavior with your FastAPI OAuth2 / JWT authentication endpoint: POST /api/v1/auth/login
    // Expected response should return access token and user role payload (Admin, Asset Manager, Dept Head, Employee)
    setTimeout(() => {
      setLoading(false);
      if (formData.email && formData.password) {
        // Mocking token storage
        localStorage.setItem('token', 'mock_jwt_token_assetflow');
        localStorage.setItem('user_role', 'Employee'); // Dynamic based on what backend returns
        router.push('/');
      } else {
        setError('Invalid credentials supplied.');
      }
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Welcome to AssetFlow
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Sign in to manage physical assets and resources
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
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
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Password
                </label>
                {/* TODO: BACKEND_INTEGRATION: Hook into forgot password route */}
                <a href="#" className="text-xs text-zinc-600 dark:text-zinc-400 hover:underline">Forgot password?</a>
              </div>
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

          {error && (
            <div className="p-3 text-sm rounded bg-destructive/10 text-destructive">
              {error}
            </div>
          )}

          <div>
            <Button type="submit" className="w-full justify-center" disabled={loading}>
              {loading ? 'Validating Session...' : 'Log In'}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Don't have an account?{' '}
          <Link href="/signup" className="font-medium text-zinc-950 dark:text-white hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}