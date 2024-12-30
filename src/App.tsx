import './globals.css'
import SearchInput from './components/SearchInput'

function App() {
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