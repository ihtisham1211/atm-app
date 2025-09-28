declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';

interface ImportMetaEnv {
  readonly VITE_APP?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
