'use client'
import { IThumbnail } from '@/assets/data'
import { useEffect, useState } from 'react'
import { getThumbnailsAction, deleteThumbnailAction } from '@/lib/actions/thumbnail'

const page = () => {

  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([])
  const [loading, setLoading] = useState(true)

  const fetchThumbnails = async () => {
    setLoading(true)
    try {
      const result = await getThumbnailsAction()
      if (result.success && result.data) {
        const mappedThumbnails: IThumbnail[] = result.data.map((item: any) => ({
          id: item._id,
          title: item.title,
          image_url: item.image_url || '',
          style: item.style || 'Bold & Graphic',
          aspect_ratio: item.aspect_ratio || '16:9',
          color_scheme: item.color_scheme || 'Default',
          created_at: item.createdAt || new Date().toISOString()
        }))
        setThumbnails(mappedThumbnails)
      } else {
        console.error(result.message || 'Failed to fetch thumbnails')
      }
    } catch (error) {
      console.error('Error fetching thumbnails:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (imageUrl: string) => {
    if (!imageUrl) return

    try {
      const fileName = 'thumbnail'

      if (imageUrl.startsWith('data:')) {
        const link = document.createElement('a')
        link.href = imageUrl
        link.download = `${fileName}.png`
        document.body.appendChild(link)
        link.click()
        link.remove()
        return
      }

      const response = await fetch(imageUrl)
      if (!response.ok) throw new Error('Failed to download image')

      const blob = await response.blob()
      const extension = blob.type?.split('/')[1] || 'png'
      const objectUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = objectUrl
      link.download = `${fileName}.${extension}`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(objectUrl)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try again.')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteThumbnailAction(id)
      if (result.success) {
        setThumbnails(prev => prev.filter(t => t.id !== id))
      } else {
        alert('Failed to delete thumbnail')
      }
    } catch (error) {
      console.error('Error deleting thumbnail:', error)
      alert('Error deleting thumbnail')
    }
  }

  useEffect(() => {
    fetchThumbnails()
  },[])


  return (
    <>
      <div className='absolute top-30 -z-10 left-1/4 size-72 bg-pink-600 blur-[300px]'></div>

    <div className='mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32'>
    {/* HEADER */}
    <div className='mb-8'>
        <h1 className='text-2xl font-bold text-zinc-200'>Thumbnail Display</h1>
        <p className='text-sm text-zinc-400 mt-1'>Browse AI-generated thumbnails created by the community and share your own</p>
    </div>
    {/* LOADING */}
     {loading && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
         {Array.from({length: 6}).map((_, i) => (
            <div key={i} className='rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[260px]' />
         ))}
        </div>
     )}

     {/* THUMBNAILS GRID */}
     {!loading && thumbnails.length > 0 && (
       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
         {thumbnails.map((thumbnail) => (
           <div key={thumbnail.id} className='group relative rounded-2xl bg-white/8 border border-white/12 overflow-hidden hover:border-white/20 transition-colors'>
             <div className='aspect-video relative bg-black/20'>
               {thumbnail.image_url ? (
                 <img
                   src={thumbnail.image_url}
                   alt={thumbnail.title}
                   className='w-full h-full object-cover'
                 />
               ) : (
                 <div className='w-full h-full flex items-center justify-center text-zinc-500'>
                   <span className='text-sm'>Image unavailable</span>
                 </div>
               )}
               <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100'>
                 <div className='flex gap-2'>
                   <button
                     onClick={() => handleDownload(thumbnail.image_url)}
                     className='p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors'
                     title='Download'
                   >
                     <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                       <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                     </svg>
                   </button>
                   <button
                     onClick={() => handleDelete(thumbnail.id)}
                     className='p-2 bg-red-500/20 hover:bg-red-500/30 rounded-full text-white transition-colors'
                     title='Delete'
                   >
                     <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                       <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                     </svg>
                   </button>
                 </div>
               </div>
             </div>
             <div className='p-4'>
               <h3 className='font-medium text-zinc-200 truncate'>{thumbnail.title}</h3>
               <div className='flex items-center justify-between mt-2 text-xs text-zinc-400'>
                 <span>{thumbnail.style}</span>
                 <span>{thumbnail.aspect_ratio}</span>
               </div>
             </div>
           </div>
         ))}
       </div>
     )}

     {/* EMPTY STATE */}
     {!loading && thumbnails.length === 0 && (
       <div className='flex flex-col items-center justify-center py-16 text-center'>
         <div className='w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4'>
           <svg className='w-8 h-8 text-zinc-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
             <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
           </svg>
         </div>
         <h3 className='text-lg font-medium text-zinc-200 mb-2'>No thumbnails yet</h3>
         <p className='text-zinc-400'>Generate your first thumbnail to see it here</p>
       </div>
     )}
    </div>
    </>
  )
}

export default page