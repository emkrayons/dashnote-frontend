import { useEffect } from 'react';

/**
 * Custom hook for keyboard shortcuts
 * Provides shortcuts for common actions
 * Mobile: Uses touch gestures and UI buttons instead
 */
const useKeyboardShortcuts = (callbacks) => {
  useEffect(() => {
    // Only enable on desktop (not mobile)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) return;

    const handleKeyDown = (e) => {
      // Ctrl/Cmd + S: Save note
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        callbacks.onSave?.();
      }

      // Ctrl/Cmd + N: New note
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        callbacks.onNew?.();
      }

      // Ctrl/Cmd + F: Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        callbacks.onSearch?.();
      }

      // Ctrl/Cmd + B: Bold (when editing)
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        const activeElement = document.activeElement;
        if (activeElement?.id === 'note-content' || activeElement?.id === 'note-title') {
          e.preventDefault();
          callbacks.onBold?.();
        }
      }

      // Ctrl/Cmd + I: Italic (when editing)
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        const activeElement = document.activeElement;
        if (activeElement?.id === 'note-content' || activeElement?.id === 'note-title') {
          e.preventDefault();
          callbacks.onItalic?.();
        }
      }

      // Ctrl/Cmd + K: Toggle favorite
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        callbacks.onToggleFavorite?.();
      }

      // Escape: Cancel/Close
      if (e.key === 'Escape') {
        callbacks.onCancel?.();
      }

      // Ctrl/Cmd + /: Show shortcuts help
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        callbacks.onShowHelp?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callbacks]);
};

// Keyboard shortcuts help modal component
export const KeyboardShortcutsHelp = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { keys: ['Ctrl', 'S'], action: 'Save note', mac: ['⌘', 'S'] },
    { keys: ['Ctrl', 'N'], action: 'New note', mac: ['⌘', 'N'] },
    { keys: ['Ctrl', 'F'], action: 'Search notes', mac: ['⌘', 'F'] },
    { keys: ['Ctrl', 'B'], action: 'Bold text', mac: ['⌘', 'B'] },
    { keys: ['Ctrl', 'I'], action: 'Italic text', mac: ['⌘', 'I'] },
    { keys: ['Ctrl', 'K'], action: 'Toggle favorite', mac: ['⌘', 'K'] },
    { keys: ['Esc'], action: 'Cancel/Close', mac: ['Esc'] },
    { keys: ['Ctrl', '/'], action: 'Show shortcuts', mac: ['⌘', '/'] },
  ];

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            ⌨️ Keyboard Shortcuts
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-2">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
            >
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {shortcut.action}
              </span>
              <div className="flex items-center gap-1">
                {(isMac ? shortcut.mac : shortcut.keys).map((key, i) => (
                  <kbd
                    key={i}
                    className="px-2 py-1 text-xs font-semibold text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded shadow-sm"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-xs text-blue-600 dark:text-blue-400">
            💡 <strong>Tip:</strong> On mobile, use the toolbar buttons instead of keyboard shortcuts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default useKeyboardShortcuts;