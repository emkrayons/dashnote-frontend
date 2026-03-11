import { useEffect, useRef, useState } from 'react';

/**
 * Auto-save hook
 * Automatically saves note after user stops typing
 * Shows visual feedback
 */
const useAutoSave = (data, onSave, delay = 3000) => {
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saving' | 'saved' | 'error'
  const timeoutRef = useRef(null);
  const previousDataRef = useRef(data);

  useEffect(() => {
    // Don't auto-save if data hasn't changed
    if (JSON.stringify(data) === JSON.stringify(previousDataRef.current)) {
      return;
    }

    // Don't auto-save if title or content is empty
    if (!data.title?.trim() || !data.content?.trim()) {
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set status to saving
    setSaveStatus('typing');

    // Set new timeout
    timeoutRef.current = setTimeout(async () => {
      setSaveStatus('saving');
      
      try {
        await onSave(data);
        setSaveStatus('saved');
        previousDataRef.current = data;
        
        // Reset to neutral after 2 seconds
        setTimeout(() => {
          setSaveStatus('saved');
        }, 2000);
      } catch (error) {
        console.error('Auto-save failed:', error);
        setSaveStatus('error');
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, onSave, delay]);

  return saveStatus;
};

// Auto-save status indicator component
export const AutoSaveIndicator = ({ status }) => {
  if (status === 'saved') return null;

  const statusConfig = {
    typing: {
      icon: '✏️',
      text: 'Typing...',
      color: 'text-neutral-400 dark:text-neutral-600',
    },
    saving: {
      icon: '💾',
      text: 'Saving...',
      color: 'text-blue-500 dark:text-blue-400',
    },
    error: {
      icon: '⚠️',
      text: 'Save failed',
      color: 'text-red-500 dark:text-red-400',
    },
  };

  const config = statusConfig[status];
  if (!config) return null;

  return (
    <div className={`flex items-center gap-2 text-xs ${config.color} animate-fadeIn`}>
      <span>{config.icon}</span>
      <span>{config.text}</span>
      {status === 'saving' && (
        <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
    </div>
  );
};

export default useAutoSave;