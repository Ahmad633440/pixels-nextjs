'use client'
import { ThumbnailStyle, AspectRatio, colorSchemes, IThumbnail } from '@/assets/data';
import AspectRatioSelector from '@/components/AspectRatioSelector';
import ColorSchemeSelector from '@/components/ColorSchemeSelector';
import PreviewPanel from '@/components/PreviewPanel';
import StyleSelector from '@/components/StyleSelector';
import { ArrowRightIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react'
import { generateThumbnailAction } from '@/lib/actions/thumbnail';

const Generate = () => {
  const params = useParams()
  const thumbnailId = params.id as string | undefined
  const [title, setTitle] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9')
  const [style, setStyle] = useState<ThumbnailStyle>('Bold & Graphic')
  const [styleDropdownOpen, setstyleDropdownOpen] = useState(false)
  const [colorSchemeId, setColorSchemeId] = useState<string>(colorSchemes[0].id)
  const [loading, setLoading] = useState(false)
  const [generatedThumbnail, setGeneratedThumbnail] = useState<IThumbnail | null>(null)

  const handleGenerate = async () => {
    setLoading(true)

    try {
      const result = await generateThumbnailAction({
        title,
        prompt: additionalDetails,
        style,
        aspect_ratio: aspectRatio,
        color_scheme: colorSchemeId,
        text_overlay: false
      });

      if (result.success && result.data) {
        const thumbnailData: IThumbnail = {
          id: result.data._id || '',
          title: result.data.title || '',
          image_url: result.data.image_url || '',
          style: result.data.style || 'Bold & Graphic',
          aspect_ratio: result.data.aspect_ratio || '16:9',
          color_scheme: result.data.color_scheme || 'Default',
          created_at: result.data.createdAt || new Date().toISOString(),
          prompt_used: result.data.prompt_used || '',
        }
        setGeneratedThumbnail(thumbnailData);
      } else {
        alert(result.message || 'Failed to generate thumbnail');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='relative min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-40'>

      {/* BACKGROUND BLUR */}
      <div className='absolute top-32 -z-10 left-1/4 size-72 bg-pink-600 blur-[300px] opacity-40 pointer-events-none' />

      <div className='mx-auto max-w-6xl flex flex-col gap-8'>

        {/* TOP BANNER — Recreate section */}
        <div className='p-5 rounded-2xl bg-white/5 border border-white/10 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <div className='space-y-1.5'>
            <h2 className='text-xl sm:text-2xl font-bold'>Recreate Thumbnails with AI</h2>
            <p className='text-sm text-zinc-400 max-w-md'>
              Upload a thumbnail or paste a URL, add your changes, and get a similar AI-recreated version instantly.
            </p>
          </div>
          <a href='/recreate'>
            <button className='shrink-0 flex items-center gap-2 bg-pink-500 hover:bg-pink-400 transition-colors rounded-3xl py-2 px-5 text-sm font-medium whitespace-nowrap'>
              Try Now <ArrowRightIcon className='size-4' />
            </button>
          </a>
        </div>

        {/* MAIN GRID: Form + Preview */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start'>

          {/* LEFT PANEL — Form */}
          <div className='lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl space-y-6'>
            <div>
              <h2 className='text-xl sm:text-2xl font-bold text-zinc-100'>Create your thumbnail</h2>
              <p className='text-sm text-zinc-400 mt-1'>Describe your vision and let AI bring it to life</p>
            </div>

            <form className='space-y-6' onSubmit={(e) => e.preventDefault()}>

              {/* TITLE */}
              <div className='space-y-1.5'>
                <label htmlFor='title' className='block text-sm font-medium text-zinc-200'>
                  Title or Topic
                </label>
                <input
                  id='title'
                  type='text'
                  value={title}
                  className='input-primary'
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                  placeholder='e.g., 10 JavaScript Tips You Must Know'
                />
                <div className='flex justify-end'>
                  <span className='text-xs text-zinc-500'>{title.length}/100</span>
                </div>
              </div>

              {/* ASPECT RATIO SELECTOR */}
              <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />

              {/* STYLE SELECTOR */}
              <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} setIsOpen={setstyleDropdownOpen} />

              {/* COLOR SCHEME SELECTOR */}
              <ColorSchemeSelector value={colorSchemeId} onChange={setColorSchemeId} />

              {/* ADDITIONAL DETAILS */}
              <div className='space-y-1.5'>
                <label htmlFor='additionalDetails' className='block text-sm font-medium text-zinc-200'>
                  Additional Details <span className='text-zinc-500 text-xs font-normal'>(optional)</span>
                </label>
                <textarea
                  id='additionalDetails'
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  placeholder='Add any specific elements, mood, or style preferences...'
                  className='input-primary min-h-[100px] resize-none'
                  maxLength={200}
                />
                <div className='flex justify-end'>
                  <span className='text-xs text-zinc-500'>{additionalDetails.length}/200</span>
                </div>
              </div>

              {/* GENERATE BUTTON */}
              {!thumbnailId && (
                <button
                  type='button'
                  onClick={handleGenerate}
                  disabled={loading || !title.trim()}
                  className='w-full py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-b from-pink-500 to-pink-600 hover:from-pink-400 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-pink-900/30'
                >
                  {loading ? 'Generating...' : 'Generate Thumbnail'}
                </button>
              )}
            </form>
          </div>

          {/* RIGHT PANEL — Preview */}
          <div className='lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl'>
            <h2 className='text-base font-semibold text-zinc-100 mb-4'>Preview</h2>
            <PreviewPanel thumbnail={generatedThumbnail} isLoading={loading} aspectRatio={aspectRatio} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Generate
