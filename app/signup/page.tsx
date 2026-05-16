'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react'

const SignupPage = () => {
  return (
    <div className='min-h-screen relative flex flex-col items-center justify-center px-4 pt-20 pb-10'>
      {/* Background Glows */}
      <div className='absolute top-1/4 -z-10 right-1/4 size-72 bg-pink-600 blur-[300px] opacity-40'></div>
      <div className='absolute bottom-1/4 -z-10 left-1/4 size-72 bg-pink-600 blur-[300px] opacity-20'></div>

      <div className='w-full max-w-[480px] p-8 sm:p-10 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl shadow-2xl space-y-8'>
        <div className='text-center space-y-2'>
          <h1 className='text-3xl font-bold text-white tracking-tight'>Create Account</h1>
          <p className='text-zinc-400 text-sm'>Join Thumblify and start generating thumbnails</p>
        </div>

        <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-zinc-300 ml-1'>Full Name</label>
            <div className='relative group'>
              <User className='absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-500 group-focus-within:text-pink-500 transition-colors' />
              <input
                type='text'
                placeholder='John Doe'
                className='w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all'
                required
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-zinc-300 ml-1'>Email Address</label>
            <div className='relative group'>
              <Mail className='absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-500 group-focus-within:text-pink-500 transition-colors' />
              <input
                type='email'
                placeholder='name@example.com'
                className='w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all'
                required
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-zinc-300 ml-1'>Password</label>
            <div className='relative group'>
              <Lock className='absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-500 group-focus-within:text-pink-500 transition-colors' />
              <input
                type='password'
                placeholder='••••••••'
                className='w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all'
                required
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-zinc-300 ml-1'>Confirm Password</label>
            <div className='relative group'>
              <Lock className='absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-500 group-focus-within:text-pink-500 transition-colors' />
              <input
                type='password'
                placeholder='••••••••'
                className='w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all'
                required
              />
            </div>
          </div>

          <button
            type='submit'
            className='w-full py-4 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-lg shadow-lg shadow-pink-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-6'
          >
            Create Account
            <ArrowRight size={20} />
          </button>
        </form>

        <div className='relative py-2'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-white/5'></div>
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-zinc-900/50 px-4 text-zinc-500'>Or register with</span>
          </div>
        </div>

        <button className='w-full py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center justify-center gap-3'>
          <Github size={20} />
          GitHub
        </button>

        <p className='text-center text-zinc-400 text-sm'>
          Already have an account?{' '}
          <Link href='/login' className='text-pink-500 hover:text-pink-400 font-bold transition-colors'>
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage