declare module 'toastify' {
  interface ToastOptions {
    position?: string;
    delay?: number;
    speed?: number;
    element?: string;
  }

  interface ToastifyInstance {
    setOption: (key: string, value: any) => void;
    success: (title: string, body?: string | null) => void;
    info: (title: string, body?: string | null) => void;
    warning: (title: string, body?: string | null) => void;
    error: (title: string, body?: string | null) => void;
    default: (title: string, body?: string | null) => void;
  }

  const toast: ToastifyInstance;
  export default toast;
}

