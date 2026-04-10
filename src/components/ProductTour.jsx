// frontend/src/components/ProductTour.jsx
import { useState, useEffect } from 'react';
import { Joyride, STATUS } from 'react-joyride';

const ProductTour = () => {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    // Check if user has seen the tour before
    const hasSeenTour = localStorage.getItem('dashnote_tour_completed');
    
    // Only show tour for first-time users
    if (!hasSeenTour) {
      // Delay tour by 1 second to let page load
      setTimeout(() => {
        setRunTour(true);
      }, 1000);
    }
  }, []);

  const steps = [
    {
      target: 'body',
      content: (
        <div>
          <h2 className="text-2xl font-light mb-3 text-neutral-900 dark:text-neutral-900">
            Welcome to Dashnote! 🎉
          </h2>
          <p className="text-neutral-600 dark:text-neutral-600 leading-relaxed">
            Let's take a quick tour to help you get started. 
            This will only take 30 seconds!
          </p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '#note-title',
      content: (
        <div>
          <h3 className="text-lg font-medium mb-2 text-neutral-900 dark:text-neutral-900">
            📝 Create Your First Note
          </h3>
          <p className="text-neutral-600 dark:text-neutral-600">
            Start by giving your note a descriptive title. 
            Make it easy to find later!
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="tag-manager"]',
      content: (
        <div>
          <h3 className="text-lg font-medium mb-2 text-neutral-900 dark:text-neutral-900">
            🏷️ Organize with Tags
          </h3>
          <p className="text-neutral-600 dark:text-neutral-600">
            Add tags to organize your notes by topic. 
            Try: #work, #personal, #ideas
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="color-picker"]',
      content: (
        <div>
          <h3 className="text-lg font-medium mb-2 text-neutral-900 dark:text-neutral-900">
            🎨 Color Code Your Notes
          </h3>
          <p className="text-neutral-600 dark:text-neutral-600 mb-2">
            Click the colored circles to assign a color to your note. 
            Perfect for visual organization!
          </p>
          <div className="flex gap-1.5 mt-3">
            <div className="w-4 h-4 rounded-full bg-red-200" title="Red"></div>
            <div className="w-4 h-4 rounded-full bg-yellow-200" title="Yellow"></div>
            <div className="w-4 h-4 rounded-full bg-green-200" title="Green"></div>
            <div className="w-4 h-4 rounded-full bg-blue-200" title="Blue"></div>
            <div className="w-4 h-4 rounded-full bg-purple-200" title="Purple"></div>
            <div className="w-4 h-4 rounded-full bg-pink-200" title="Pink"></div>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-3">
            Example: Red for urgent, Blue for personal, Green for completed
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '.ProseMirror',
      content: (
        <div>
          <h3 className="text-lg font-medium mb-2 text-neutral-900 dark:text-neutral-900">
            ✨ Rich Text Editor
          </h3>
          <p className="text-neutral-600 dark:text-neutral-600">
            Use the toolbar above to format your text - just like Microsoft Word! 
            Click <strong>B</strong> for bold, <em>I</em> for italic, and more.
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '[data-tour="favorite-button"]',
      content: (
        <div>
          <h3 className="text-lg font-medium mb-2 text-neutral-900 dark:text-neutral-900">
            ⭐ Star Important Notes
          </h3>
          <p className="text-neutral-600 dark:text-neutral-600">
            Click the star to mark notes as favorites. 
            Access them quickly by filtering favorites!
          </p>
        </div>
      ),
      placement: 'left',
    },
    {
      target: '[data-tour="search-bar"]',
      content: (
        <div>
          <h3 className="text-lg font-medium mb-2 text-neutral-900 dark:text-neutral-900">
            🔍 Search Everything
          </h3>
          <p className="text-neutral-600 dark:text-neutral-600">
            Search across all note titles and content instantly. 
            Never lose a note again!
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="export-menu"]',
      content: (
        <div>
          <h3 className="text-lg font-medium mb-2 text-neutral-900 dark:text-neutral-900">
            📥 Export Your Notes
          </h3>
          <p className="text-neutral-600 dark:text-neutral-600">
            Export individual notes or all notes to PDF or TXT format. 
            Your notes, your format, your way!
          </p>
        </div>
      ),
      placement: 'left',
    },
    {
      target: 'body',
      content: (
        <div>
          <h2 className="text-2xl font-light mb-3 text-neutral-900 dark:text-neutral-900">
            You're All Set! 🚀
          </h2>
          <p className="text-neutral-600 dark:text-neutral-600 mb-4 leading-relaxed">
            You now know the basics of Dashnote. Start creating your first note!
          </p>
          <div className="bg-neutral-50 dark:bg-neutral-50 rounded-lg p-4 border border-neutral-200 dark:border-neutral-800">
            <p className="text-sm text-neutral-500 dark:text-neutral-600 mb-2">
              💡 <strong>Pro tips for productivity:</strong>
            </p>
            <ul className="text-sm text-neutral-600 dark:text-neutral-600 space-y-2">
              <li>• Combine <strong>tags</strong> + <strong>colors</strong> for powerful organization</li>
              <li>• Use the <strong>star</strong> for important notes</li>
              <li>• <strong>Search</strong> works across titles and content</li>
            </ul>
            <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-xs text-neutral-500 dark:text-neutral-600 mb-2">
                ⌨️ Keyboard shortcuts:
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
  <kbd className="px-2 py-1 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded border border-neutral-300 dark:border-neutral-700">
    Ctrl+S
  </kbd> Save

  <kbd className="px-2 py-1 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded border border-neutral-300 dark:border-neutral-700">
    Ctrl+N
  </kbd> New

  <kbd className="px-2 py-1 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded border border-neutral-300 dark:border-neutral-700">
    Ctrl+F
  </kbd> Search
</div>
            </div>
          </div>
        </div>
      ),
      placement: 'center',
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    
    // Tour finished or skipped
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
      
      // Mark tour as completed
      localStorage.setItem('dashnote_tour_completed', 'true');
      
      // Track in Google Analytics
      if (window.gtag) {
        window.gtag('event', 'tour_completed', {
          event_category: 'onboarding',
          event_label: status === STATUS.FINISHED ? 'completed' : 'skipped',
        });
      }
    }
  };

  return (
    <Joyride
      steps={steps}
      run={runTour}
      continuous
      showProgress
      showSkipButton
      scrollToFirstStep
      disableScrolling={false}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          // Primary color (dark neutral)
          primaryColor: '#171717',
          // Text colors
          textColor: '#404040',
          // Spacing
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          // Arrow colors
          arrowColor: '#ffffff',
          // Background
          backgroundColor: '#ffffff',
          // Border radius
          borderRadius: 12,
          // Width
          width: 400,
        },
        tooltip: {
          padding: 24,
          borderRadius: 12,
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        tooltipTitle: {
          fontSize: '1.125rem',
          fontWeight: 500,
          marginBottom: 8,
        },
        tooltipContent: {
          fontSize: '0.9375rem',
          lineHeight: 1.6,
          padding: '8px 0',
        },
        buttonNext: {
          backgroundColor: '#171717',
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: '0.875rem',
          fontWeight: 500,
        },
        buttonBack: {
          color: '#737373',
          marginRight: 8,
        },
        buttonSkip: {
          color: '#737373',
        },
        buttonClose: {
          display: 'none',
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: 'Skip Tour',
      }}
    />
  );
};

export default ProductTour;
