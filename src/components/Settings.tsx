import { useState, useEffect } from 'react'
import type { AppConfig } from '../types/config'
import { defaultConfig } from '../types/config'
import { configService } from '../services/configService'

export default function Settings() {
  const [config, setConfig] = useState<AppConfig>(() => configService.getConfig())

  useEffect(() => {
    configService.saveConfig(config)
  }, [config])

  const handleShortcutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({
      ...prev,
      shortcut: {
        ...prev.shortcut,
        toggleApp: e.target.value
      }
    }))
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConfig(prev => ({
      ...prev,
      language: e.target.value as 'zh' | 'en'
    }))
  }

  const handleAutoUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({
      ...prev,
      autoUpdate: e.target.checked
    }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">应用设置</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            唤起快捷键
          </label>
          <input
            type="text"
            value={config.shortcut.toggleApp}
            onChange={handleShortcutChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            语言
          </label>
          <select
            value={config.language}
            onChange={handleLanguageChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={config.autoUpdate}
            onChange={handleAutoUpdateChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label className="ml-2 block text-sm text-gray-900">
            自动更新
          </label>
        </div>
      </div>
    </div>
  )
} 