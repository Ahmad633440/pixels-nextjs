import { AspectRatio, IThumbnail } from '@/assets/data';
import { DownloadIcon, ImageIcon, Loader2Icon } from 'lucide-react';
import React from 'react'

const PreviewPanel = ({thumbnail, isLoading, aspectRatio} : {thumbnail: IThumbnail | null; isLoading: boolean; aspectRatio: AspectRatio  }) => {

// Map aspect ratio to Tailwind classes applied only to the inner preview box
const aspectClasses: Record<AspectRatio, string> = {
  '16:9' : 'aspect-video',
  '1:1'  : 'aspect-square',
  '9:16' : 'aspect-[9/16]',
}

// download button for downloading generated thumbnail
const onDownload = async () => {
  if (!thumbnail?.image_url) return

  try {
    const fileName = `${thumbnail.title?.trim().replace(/[^a-zA-Z0-9-_\.]/g, '_') || 'thumbnail'}`
    const imageUrl = thumbnail.image_url

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

  return (
    // Outer wrapper fills the panel — no aspect ratio here
    <div className='w-full flex flex-col items-center justify-start gap-4'>
      {/* Inner preview box: ONLY this gets the aspect ratio class */}
      <div className={`relative w-full overflow-hidden rounded-xl bg-black/20 ${aspectClasses[aspectRatio]}`}>

        {/* LOADING STATE */}
        {isLoading && (
          <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40'>
            <Loader2Icon className='size-8 animate-spin text-pink-400'/>
            <div className='text-center'>
              <p className='text-sm font-medium text-zinc-200'>Generating Image...</p>
              <p className='mt-1 text-xs text-zinc-400'>This may take 10–20 seconds</p>
            </div>
          </div>
        )}

        {/* Thumbnail ready */}
        {!isLoading && thumbnail?.image_url && (
          <div className='group relative h-full w-full'>
            <img
              src={thumbnail.image_url}
              alt={thumbnail.title}
              className='h-full w-full object-cover'
            />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !thumbnail?.image_url && (
          <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-white/20 bg-black/30 p-4 text-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-white/10'>
              <ImageIcon className='h-8 w-8 text-white opacity-40'/>
            </div>
            <div className='px-4 text-center'>
              <p className='font-medium text-zinc-200'>Generate your first thumbnail</p>
              <p className='mt-1 text-xs text-zinc-400'>Fill out the form and click Generate</p>
            </div>
          </div>
        )}
      </div>

      {/* Download button below the preview box */}
      {!isLoading && thumbnail?.image_url && (
        <button type='button' className='button-style' onClick={onDownload}>
          <DownloadIcon className='size-4'/>
          Download Thumbnail
        </button>
      )}
    </div>
  )
}

export default PreviewPanel