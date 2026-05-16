'use client'

import React, { useState } from 'react'
import { Upload, Link as LinkIcon, Image as ImageIcon, ArrowRight } from 'lucide-react'
import AspectRatioSelector from '@/components/AspectRatioSelector'
import PreviewPanel from '@/components/PreviewPanel'
import { AspectRatio } from '@/assets/data'

const RecreatePage = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload')
  const [imageUrl, setImageUrl] = useState('')
  const [prompt, setPrompt] = useState('')
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9')
  const [loading, setLoading] = useState(false)
  const [generatedThumbnail, setGeneratedThumbnail] = useState(null)

  const handleGenerate = async () => {
    // Logic for generating thumbnail will go here
    setLoading(true)
    // Simulate generation
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <div className='relative flex flex-col items-center px-4 md:px-16 lg:px-24 xl:px-32 2xl:px-48 min-h-screen pt-28 pb-20'>
      {/* Background Glow */}
      <div className='absolute top-40 -z-10 left-1/4 size-72 bg-pink-600 blur-[300px]'></div>
      <div className='absolute bottom-40 -z-10 right-1/4 size-72 bg-pink-600 blur-[300px] opacity-20'></div>

      <main className='mx-auto max-w-7xl w-full flex flex-col lg:flex-row gap-12 items-start'>
        {/* Left Panel: Form */}
        <div className='w-full lg:w-[550px] p-6 sm:p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl shadow-2xl space-y-8'>
          <div>
            <h1 className='text-3xl font-bold text-white mb-2'>AI Thumbnail Copy Maker</h1>
            <p className='text-zinc-400'>Upload an image or paste a URL and describe your changes</p>
          </div>

          {/* Tabs */}
          <div className='flex gap-2 p-1 bg-zinc-800/50 rounded-xl border border-white/5'>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'upload' ? 'bg-pink-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Upload size={18} />
              Upload
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'url' ? 'bg-pink-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LinkIcon size={18} />
              Image URL
            </button>
          </div>

          {/* Upload / URL Content */}
          <div className='space-y-4'>
            {activeTab === 'upload' ? (
              <div className='group relative cursor-pointer'>
                <div className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 hover:border-pink-500/50 transition-all'>
                  <div className='flex flex-col items-center justify-center pt-5 pb-6 text-zinc-400 group-hover:text-pink-400'>
                    <ImageIcon size={32} className='mb-2' />
                    <p className='text-sm'>Click to upload image</p>
                  </div>
                  <input type='file' className='hidden' />
                </div>
              </div>
            ) : (
              <div className='space-y-2'>
                <label className='text-sm font-medium text-zinc-300'>Paste Image URL</label>
                <input
                  type='text'
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder='https://example.com/thumbnail.png'
                  className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all'
                />
              </div>
            )}
          </div>

          {/* Change Description */}
          <div className='space-y-3'>
            <label className='text-sm font-medium text-zinc-300'>What do you want to change?</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='Change text, colors, expressions, style...'
              rows={4}
              className='w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all resize-none'
            />
          </div>

          {/* Aspect Ratio */}
          <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />

          {/* Credit Info */}
          <div className='text-center'>
            <p className='text-xs text-zinc-500 uppercase tracking-widest'>10 Credits / per thumbnail generation</p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className='w-full py-4 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-lg shadow-lg shadow-pink-600/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {loading ? (
              <span className='animate-pulse'>Generating...</span>
            ) : (
              <>
                Recreate Thumbnail
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>

        {/* Right Panel: Preview */}
        <div className='flex-1 w-full space-y-6'>
          <div className='p-6 sm:p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl shadow-2xl min-h-[500px] flex flex-col'>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-2xl font-bold text-white'>Preview</h2>
              <div className='flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-white/5'>
                <div className='size-2 rounded-full bg-pink-500 animate-pulse'></div>
                <span className='text-[10px] text-zinc-400 font-medium uppercase tracking-tighter'>Live Rendering</span>
              </div>
            </div>

            <div className='flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl bg-black/20 p-8'>
              <PreviewPanel thumbnail={generatedThumbnail} isLoading={loading} aspectRatio={aspectRatio} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RecreatePage