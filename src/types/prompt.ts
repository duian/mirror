import svgMasterContent from '../prompts/svg-master.md?raw'
import gitCommitMessageContent from '../prompts/git-commit-message.md?raw'

export interface Prompt {
  id?: string;
  title: string;
  tags: string[];
  intro: string;
  content: string;
}

const defaultPrompt: Prompt[] = [
  // 默认数据
  {
    id: "1",
    title: "generate commit message",
    tags: ["git", "commit", "tool", "work"],
    intro: "generate commit message",
    content: gitCommitMessageContent,
  },
  {
    id: "2",
    title: "svg master",
    tags: ["svg", "绘图"],
    intro: "根据你的 prompt， 生成 svg 代码",
    content: svgMasterContent,
  }
];

export default defaultPrompt;