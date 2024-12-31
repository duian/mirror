import { useState, useEffect, KeyboardEvent } from "react";

interface SearchResult {
  id: string;
  title: string;
  tags: string[];
  prompt: string;
}

// 示例数据，实际应该从您的数据源获取
const mockData: SearchResult[] = [
  {
    id: "1",
    title: "generate commit message",
    tags: ["git", "commit", "tool", "work"],
    prompt: `Now, please generate a commit message with Chinese.
Make sure it includes an accurate and informative subject line that succinctly summarizes the key points of the changes, the response must only have commit message content and must have blank line in message template.

Below is the commit message template:

<type>(<scope>): <subject>
// blank line
<body>
// blank line
<footer>

The Header is mandatory, while the Body and Footer are optional.

Regardless of which part, no line should exceed 72 characters (or 100 characters). This is to avoid automatic line breaks affecting aesthetics.

Below is the type Enum:

- feat: new feature
- fix: bug fix
- docs: documentation
- style: formatting (changes that do not affect code execution)
- refactor: refactoring (code changes that are neither new features nor bug fixes)
- test: adding tests
- chore: changes to the build process or auxiliary tools

The body section is a detailed description of this commit and can be split into multiple lines. Here's an example:

More detailed explanatory text, if necessary. Wrap it to about 72 characters or so. 

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent`
  },
  {
    id: "2",
    title: "示例文档2",
    tags: ["笔记", "教程"],
    prompt: "示例文档2的prompt"
  }
  // ... 更多数据
];

export default function SearchInput() {
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
    const filtered = mockData.filter(
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
      const selectedPrompt = results[activeIndex].prompt;
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

  return (
    <div className="relative">
      <div className="relative">
        <input
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
}
