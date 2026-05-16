'use client'
import { ThumbnailStyle, AspectRatio, colorSchemes, aspectRatios, IThumbnail } from '@/assets/data';
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
const [title,setTitle] = useState('');
const [additionalDetails,setAdditionalDetails] = useState('');

const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9')

const [style, setStyle] = useState<ThumbnailStyle>('Bold & Graphic')
const [styleDropdownOpen, setstyleDropdownOpen] = useState(false)
const [colorSchemeId, setColorSchemeId] = useState<string>(colorSchemes[0].id)
const [loading, setLoading] = useState(false)
const [generatedThumbnail, setGeneratedThumbnail] = useState<IThumbnail | null>(null)

// we have to store the values of generated thumbnail in url code and fetch it into code 
const handleGenerate = async () => {
  setLoading(true)
  
  try {
    const result = await generateThumbnailAction({
      title,
      prompt: additionalDetails,
      style,
      aspect_ratio: aspectRatio,
      color_scheme: colorSchemeId,
      text_overlay: false // or add a checkbox for this
    });

    if (result.success) {
      setGeneratedThumbnail(result.data);
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong');
  } finally {
    setLoading(false);
  }
}



  return (
    <div className='relative flex flex-col items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 2xl:px-48 min-h-screen pt-28'>
    {/* BACKGROUND BLUR THEME */}
    <div className='absolute top-30 -z-10 left-1/4 size-72 bg-pink-600 blur-[300px]'></div>
   
  <main className='mx-auto max-w-6xl px-8 pb-28 flex flex-col gap-12'>
  
  <div className='p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-5 flex  justify-between items-center gap-4'>

 {/* Top HEADING */}
  <div className='max-w-md px-5 space-y-3 '> 
    <h2 className='text-2xl font-bold'>Recreate Thumbnails with AI</h2>
    <p className='line-clamp-2 text-zinc-400'>
      Upload a thumbnail or paste a URL, add your changes, and get a similar AI-recreated version instantly.
    </p>
  </div>

  <button className='shrink-0 gap-2 flex bg-pink-500 rounded-3xl p-2 px-4 text-md whitespace-nowrap hover:bg-pink-400'>
    Try Now <ArrowRightIcon className='size-5 '/>
  </button>
</div>
{/* GRID SECTION */}
  <div className='grid gap-8 lg:grid-cols-12'>
  
{/* LEFT PANEL */}
  <div className='lg:col-span-7 p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6'>
   <div className=''>
    <h2 className='text-2xl text-zinc-100 font-bold'>Create your thumbnail</h2>
    <p className='line-clamp-2 text-sm text-zinc-400'>Describe your vision and let AI bring it to life</p>

  
    <form className='space-y-5' onSubmit={(e) => { e.preventDefault(); /* Handle thumbnail generation */ }}>
      {/* TITLE */}
      <label htmlFor="title" className='block text-sm font-medium mt-2.5  mb-1'>Title or Topic</label>
      <input type="text" value={title} className='input-primary' onChange={(e) => setTitle(e.target.value)}  maxLength={100} placeholder='e.g., 10'/>
      <div className='flex -mt-3.5 justify-end-safe'>
        <span className='text-sm text-zinc-300 '>{title.length}/100</span>
      </div>


  {/* ASPECT RATIO SELECTOR */}
   <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio}/>
  {/* STYLE SELECTOR */}
  <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} setIsOpen={setstyleDropdownOpen}/>
  {/* COLOR SCHEME SELECTOR */}
  <ColorSchemeSelector value={colorSchemeId} onChange={setColorSchemeId}/>
  {/* MODEL */}

  {/* ADDITIONAL PROMPTS(OPTIONAL) DETAILS */}
  <div className='space-y-2'>
   <label htmlFor="additionalDetails" className='block text-sm font-medium'>Additional Prompts <span className='text-zinc-400 text-xs'>(optional)</span></label>
   <textarea value={additionalDetails} onChange={(e) =>setAdditionalDetails(e.target.value)} placeholder='Add any specific elements, mood, or style preferneces...' className='input-primary'/>
    <div className='flex -mt-2.5 justify-end-safe mb-10'>
        <span className='text-sm text-zinc-300 '>{additionalDetails.length}/200</span>
    </div>
  </div>


  </form>

{/* GENERATE THUMBNAIL BUTTON */}
  {!thumbnailId && (
    <button type='button' onClick={handleGenerate} disabled={loading} className='text-[15px] w-full py-3.5 rounded-xl font-medium bg-linear-to-b from-pink-500 to-pink-600 hover:from-pink-700 disabled:cursor-not-allowed transition-colors'>{loading ? 'Generating...' : 'Generate Thumbnail'}</button>
  )}
</div>

</div>


{/* RIGHT PANEL (PREVIEW PANEL)*/}
  <div className='lg:col-span-5'>
    <div className='p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl h-full'>
      <h2 className='text-lg font-semibold text-zinc-100 mb-4'>Preview</h2>
      <div className='w-full h-[350px] sm:h-[420px] md:h-[500px] lg:h-[650px]'>
        <PreviewPanel thumbnail={generatedThumbnail} isLoading={loading} aspectRatio={aspectRatio} />
      </div>
    </div>
  </div>




  </div>
  </main>  
  </div>
  )
}
export default Generate



