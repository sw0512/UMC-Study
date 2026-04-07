import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b12] text-white">
      <nav className="border-b border-white/10 bg-black/30 px-6 py-4 backdrop-blur-sm">
        내브바
      </nav>
      <main className='flex-1'>
        <Outlet />
      </main>
      <footer className="border-t border-white/10 bg-black/30 px-6 py-4 text-sm text-white/60">
        푸터
      </footer>
    </div>
  )
}

export default HomeLayout
