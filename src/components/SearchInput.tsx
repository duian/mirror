import { useState, useEffect, KeyboardEvent, useRef, useImperativeHandle, forwardRef } from "react";
import defaultPrompt, { type Prompt } from "../types/prompt";

interface SearchResult extends Prompt {}

// 示例数据，实际应该从您的数据源获取
const localData: Prompt[] = defaultPrompt;

// 添加组件 ref 类型定义
export interface SearchInputRef {
  focus: () => void;
}

// 修改组件定义为 forwardRef
const SearchInput = forwardRef<SearchInputRef, {}>((_, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 暴露 focus 方法给父组件
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // 搜索逻辑
    const filtered = localData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setResults(filtered);
    setActiveIndex(-1); // 重置选中项
  }, [query]);

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault(); // 防止光标移动
      setActiveIndex((prevIndex) =>
        prevIndex >= results.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex <= 0 ? results.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter" && activeIndex !== -1) {
      e.preventDefault();
      const selectedPrompt = results[activeIndex].content;
      try {
        await navigator.clipboard.writeText(selectedPrompt);
        setCopySuccess(true);
        // 清空搜索框和结果列表
        setQuery("");
        setResults([]);
        setActiveIndex(-1);
        // 2秒后隐藏提示
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error("复制失败:", err);
      }
    }
  };

  // 添加处理点击的函数
  const handleResultClick = async (result: SearchResult) => {
    try {
      await navigator.clipboard.writeText(result.content);
      setCopySuccess(true);
      // 清空搜索框和结果列表
      setQuery("");
      setResults([]);
      setActiveIndex(-1);
      // 2秒后隐藏提示
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 text-lg rounded-lg border-0 bg-white/90 backdrop-blur-sm shadow-lg ring-1 ring-inset ring-gray-300/50 placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500"
          placeholder="搜索文档或标签..."
          autoFocus
        />
        {copySuccess && (
          <div className="absolute right-0 top-0 mt-3 mr-3 text-sm text-green-600">
            已复制到剪贴板
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute w-full mt-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={result.id}
              className={`p-4 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                index === activeIndex
                  ? "bg-indigo-50 hover:bg-indigo-50"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleResultClick(result)}
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
  );
});

export async function search(keyword: string): Promise<SearchResult[]> {
  // 1. 先从本地数据搜索
  const localResults = localData.filter(item => 
    item.title.toLowerCase().includes(keyword.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
  );

  // 2. 如果本地有结果，直接返回
  if (localResults.length > 0) {
    return localResults;
  }

  // 3. 本地没有结果，请求服务端
  try {
    const response = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`);
    if (!response.ok) {
      throw new Error('Search request failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

export default SearchInput;
