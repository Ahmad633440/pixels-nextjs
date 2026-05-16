'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react'

const ForgotPasswordPage = () => {
  return (
    <div className='min-h-screen relative flex flex-col items-center justify-center px-4'>
      {/* Background Glows */}
      <div className='absolute top-1/4 -z-10 left-1/2 -translate-x-1/2 size-80 bg-pink-600 blur-[300px] opacity-30'></div>

      <div className='w-full max-w-[450px] p-8 sm:p-10 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl shadow-2xl space-y-8'>
        <div className='text-center space-y-2'>
          <h1 className='text-3xl font-bold text-white tracking-tight'>Reset Password</h1>
          <p className='text-zinc-400 text-sm'>Enter your email to receive a password reset link</p>
        </div>

        <form className='space-y-6' onSubmit={(e) => e.preventDefault()}>
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

          <button
            type='submit'
            className='w-full py-4 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-lg shadow-lg shadow-pink-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2'
          >
            Send Reset Link
            <ArrowRight size={20} />
          </button>
        </form>

        <div className='flex justify-center'>
          <Link href='/login' className='flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors group'>
            <ArrowLeft size={16} className='group-hover:-translate-x-1 transition-transform' />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage