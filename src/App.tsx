import './globals.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* 页面内容 */}
            <h1>Hello World</h1>
          </div>
        </div>
      </main>
    </>
  )
}

export default App