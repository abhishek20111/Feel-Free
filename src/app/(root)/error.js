'use client'
 
import { useEffect } from 'react'
 
export default function Error({ error,reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <h1 className='m-3 text-xl font-semibold'>{error.message}</h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}