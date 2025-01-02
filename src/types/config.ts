export interface AppConfig {
  shortcut: {
    toggleApp: string;  // 应用唤起快捷键
  };
  language: 'zh' | 'en';  // 语言设置
  autoUpdate: boolean;    // 是否自动更新
}

export const defaultConfig: AppConfig = {
  shortcut: {
    toggleApp: 'CommandOrControl+Shift+C',  // 默认快捷键
  },
  language: 'zh',
  autoUpdate: true,
} 