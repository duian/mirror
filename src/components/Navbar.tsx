export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* 左侧 Logo 或标题 */}
          <div className="font-semibold text-gray-800">
            您的网站名称
          </div>
          
          {/* 右侧导航链接 */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">首页</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">关于</a>
            {/* 添加更多导航链接 */}
          </div>
        </div>
      </div>
    </nav>
  )
} 