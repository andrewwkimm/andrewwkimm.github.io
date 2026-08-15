type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
}

function writeStored(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Blocked storage still gets a working toggle for the current page.
  }
}

function prefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function apply(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

function createTheme() {
  let current = $state<Theme>('light');

  return {
    get current(): Theme {
      return current;
    },
    get label(): string {
      return current === 'dark' ? 'Use light mode' : 'Use dark mode';
    },
    sync(): void {
      current = readStored() ?? (prefersDark() ? 'dark' : 'light');
      apply(current);
    },
    toggle(): void {
      current = current === 'dark' ? 'light' : 'dark';
      apply(current);
      writeStored(current);
    }
  };
}

export const theme = createTheme();
