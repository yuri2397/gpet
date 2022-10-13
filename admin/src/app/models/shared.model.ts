export interface Notification {
  title: string;
  content: string;
  type: 'success' | 'error' | 'info' | 'warn';
}
