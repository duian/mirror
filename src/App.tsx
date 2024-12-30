import './globals.css'
import SearchInput from './components/SearchInput'
import { getCurrentWindow, PhysicalPosition } from '@tauri-apps/api/window'
import { useEffect, useRef } from 'react'


function App() {
  const isDraggingRef = useRef(false)
  const windowRef = useRef<Awaited<ReturnType<typeof getCurrentWindow>>>()

  useEffect(() => {
    // 初始化时获取窗口实例
    windowRef.current = getCurrentWindow()

    const handleMouseDown = () => {
      isDraggingRef.current = true
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
    }

    const handleMouseMove = async (e: MouseEvent) => {
      if (!isDraggingRef.current || !windowRef.current) return
      
      // 直接使用鼠标移动事件的 movementX 和 movementY
      const deltaX = e.movementX
      const deltaY = e.movementY

      const position = await windowRef.current.innerPosition()
      await windowRef.current.setPosition(new PhysicalPosition(
        position.x + deltaX,
        position.y + deltaY
      ))
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto pt-2 px-4">
        <div className="flex items-center gap-1.5">
          <div className="w-[640px]">
            <SearchInput />
          </div>
          <img 
            src="/mirror-logo.png" 
            alt="Mirror Logo" 
            className="h-[44px] w-[44px]"
          />
        </div>
      </div>
    </main>
  )
}

export default App