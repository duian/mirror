import './globals.css'
import SearchInput, { SearchInputRef } from './components/SearchInput'
import { getCurrentWindow, PhysicalPosition } from '@tauri-apps/api/window'
import { useEffect, useRef } from 'react'
import { register, unregister } from '@tauri-apps/plugin-global-shortcut';
import { configService } from './services/configService'


function App() {
  const isDraggingRef = useRef(false)
  const windowRef = useRef<Awaited<ReturnType<typeof getCurrentWindow>>>()
  const searchInputRef = useRef<SearchInputRef>(null);

  useEffect(() => {
    // 初始化时获取窗口实例和配置
    const init = async () => {
      windowRef.current = await getCurrentWindow()
      const config = configService.getConfig()
      
      // 注册全局快捷键
      try {
        await register(config.shortcut.toggleApp, async (event) => {
          if (event.state === 'Pressed') {
            console.log('toggleApp');
            const window = await getCurrentWindow()
            const isVisible = await window.isVisible()
            if (isVisible) {
              await window.hide()
            } else {
              await window.show()
              await window.setFocus()
              searchInputRef.current?.focus();
            }
          }
        })
      } catch (err) {
        console.error('快捷键注册失败:', err)
      }
    }
    
    init()

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

    // 添加全局 ESC 键处理
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const window = await getCurrentWindow();
        await window.hide();
      }
    };

    // 添加全局键盘事件监听
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousemove', handleMouseMove)
      // 清理快捷键
      const config = configService.getConfig()
      unregister(config.shortcut.toggleApp).catch(console.error)
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto pt-2 px-4">
        <div className="flex items-center gap-1.5">
          <div className="w-[640px]">
            <SearchInput ref={searchInputRef} />
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