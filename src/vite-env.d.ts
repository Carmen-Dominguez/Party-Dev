/// <reference types="vite/client" />

// Allow importing SCSS files
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
