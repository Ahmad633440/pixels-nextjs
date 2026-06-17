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
    window.open(imageUrl, '_blank')
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
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10'>
         {thumbnails.map((thumbnail, index) => {
           // Generate a mock duration (e.g. 10:42, 5:18, etc.)
           const durationMinutes = Math.floor((index * 3 + 4) % 15) + 3;
           const durationSeconds = Math.floor((index * 17) % 60).toString().padStart(2, '0');
           const fakeDuration = `${durationMinutes}:${durationSeconds}`;
           
           // Mock dynamic views
           const viewsArray = ['12K', '85K', '254K', '1.2M', '45K', '320K', '9.8K', '62K'];
           const fakeViews = viewsArray[index % viewsArray.length];
           
           // Mock dynamic upload time
           const timesArray = ['2 hours ago', '1 day ago', '3 days ago', '1 week ago', '2 weeks ago'];
           const fakeTime = timesArray[index % timesArray.length];

           // Mock channel name
           const channelName = 'Creator Studio';
           
           // Unique avatar color based on index
           const avatarColors = ['bg-pink-600', 'bg-blue-600', 'bg-purple-600', 'bg-indigo-600', 'bg-violet-600'];
           const avatarColor = avatarColors[index % avatarColors.length];

           return (
             <div key={thumbnail.id} className='flex flex-col gap-3 group relative'>
               {/* THUMBNAIL CONTAINER */}
               <div className='aspect-video relative rounded-xl overflow-hidden bg-zinc-800/50 border border-white/5 group-hover:border-white/15 transition-all shadow-md'>
                 {thumbnail.image_url ? (
                   <img
                     src={thumbnail.image_url}
                     alt={thumbnail.title}
                     className='w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300'
                   />
                 ) : (
                   <div className='w-full h-full flex items-center justify-center text-zinc-500'>
                     <span className='text-sm'>Image unavailable</span>
                   </div>
                 )}
                 
                 {/* FAKE VIDEO DURATION */}
                 <span className='absolute bottom-2 right-2 bg-black/85 px-1.5 py-0.5 text-[11px] text-white rounded font-medium tracking-wide'>
                   {fakeDuration}
                 </span>

                 {/* HOVER ACTIONS OVERLAY */}
                 <div className='absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                   <div className='flex gap-3 scale-90 group-hover:scale-100 transition-transform duration-200'>
                     <button
                       onClick={() => handleDownload(thumbnail.image_url)}
                       className='p-2.5 bg-white text-zinc-900 hover:bg-zinc-100 active:scale-95 rounded-full shadow-lg transition-all cursor-pointer'
                       title='Download Thumbnail'
                     >
                       <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth={2.5} viewBox='0 0 24 24'>
                         <path strokeLinecap='round' strokeLinejoin='round' d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                       </svg>
                     </button>
                     <button
                       onClick={() => handleDelete(thumbnail.id)}
                       className='p-2.5 bg-red-600 hover:bg-red-500 text-white active:scale-95 rounded-full shadow-lg transition-all cursor-pointer'
                       title='Delete Thumbnail'
                     >
                       <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth={2.5} viewBox='0 0 24 24'>
                         <path strokeLinecap='round' strokeLinejoin='round' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                       </svg>
                     </button>
                   </div>
                 </div>
               </div>

               {/* YOUTUBE STYLE META SECTION */}
               <div className='flex gap-3 px-1'>
                 {/* Channel Avatar Mock */}
                 <div className={`size-9 rounded-full ${avatarColor} flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-inner select-none`}>
                   {thumbnail.title.charAt(0).toUpperCase() || 'C'}
                 </div>
                 {/* Title and stats */}
                 <div className='flex flex-col min-w-0 flex-1'>
                   <h3 className='text-[14px] font-semibold text-zinc-100 line-clamp-2 leading-[20px] mb-0.5 group-hover:text-pink-500 transition-colors' title={thumbnail.title}>
                     {thumbnail.title}
                   </h3>
                   <div className='flex flex-col text-[12px] text-zinc-400 leading-4'>
                     <span className='hover:text-zinc-200 transition-colors cursor-pointer'>{channelName}</span>
                     <span>{fakeViews} views • {fakeTime}</span>
                   </div>
                   {/* Style and Ratio badges */}
                   <div className='flex gap-2 mt-2'>
                     <span className='px-2 py-0.5 text-[10px] font-medium bg-zinc-800/80 text-zinc-300 rounded border border-zinc-700/30'>{thumbnail.style}</span>
                     <span className='px-2 py-0.5 text-[10px] font-medium bg-zinc-800/80 text-zinc-300 rounded border border-zinc-700/30'>{thumbnail.aspect_ratio}</span>
                   </div>
                 </div>
               </div>
             </div>
           );
         })}
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