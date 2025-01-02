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
    content: `Now, please generate a commit message with Chinese.
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
    intro: "示例文档2的prompt",
    content: "示例文档2的prompt"
  }
];

export default defaultPrompt;