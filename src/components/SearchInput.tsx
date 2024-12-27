import { useState, useEffect } from 'react'

interface SearchResult {
  id: string
  title: string
  tags: string[]
}

// 示例数据，实际应该从您的数据源获取
const mockData: SearchResult[] = [
  { id: '1', title: '示例文档1', tags: ['文档', '教程'] },
  { id: '2', title: '示例文档2', tags: ['笔记', '教程'] },
  // ... 更多数据
]

export default function SearchInput() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    // 搜索逻辑
    const filtered = mockData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
    setResults(filtered)
  }, [query])

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 text-lg rounded-lg border-0 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500"
          placeholder="搜索文档或标签..."
          autoFocus
        />
      </div>

      {results.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <div
              key={result.id}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900">{result.title}</div>
              <div className="mt-1 flex gap-2">
                {result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 