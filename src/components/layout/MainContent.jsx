
import '@/app/globals.css'

function MainContent({children}) {
  return (
    <div className='w-full overflow-y-scroll custom-scrollbar'>
     
        {children}
    </div>
  )
}

export default MainContent
