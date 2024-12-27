import type { AppConfig } from '../types/config'
import { defaultConfig } from '../types/config'

const CONFIG_KEY = 'app_config'

export const configService = {
  getConfig(): AppConfig {
    const stored = localStorage.getItem(CONFIG_KEY)
    if (!stored) return defaultConfig
    try {
      return JSON.parse(stored)
    } catch {
      return defaultConfig
    }
  },

  saveConfig(config: AppConfig): void {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
  }
} 