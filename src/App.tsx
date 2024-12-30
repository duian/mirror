import './globals.css'
import SearchInput from './components/SearchInput'
import { getCurrentWindow, PhysicalPosition } from '@tauri-apps/api/window'
import { useEffect, useRef } from 'react'


function App() {
  const isDraggingRef = useRef(false)
  const initialMousePosRef = useRef({ x: 0, y: 0 })
  const appWindow = getCurrentWindow();

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true
      initialMousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
    }

    const handleMouseMove = async (e: MouseEvent) => {
      if (!isDraggingRef.current) return

      const deltaX = e.clientX - initialMousePosRef.current.x
      const deltaY = e.clientY - initialMousePosRef.current.y

      // 获取当前窗口位置
      const position = await appWindow.innerPosition()
      
      // 使用 requestAnimationFrame 优化性能
      requestAnimationFrame(() => {
        appWindow.setPosition(new PhysicalPosition(
          position.x + deltaX,
          position.y + deltaY
        ))
      })

      initialMousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    // 添加事件监听器
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