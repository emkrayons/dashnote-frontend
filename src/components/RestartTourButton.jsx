// frontend/src/components/RestartTourButton.jsx
const RestartTourButton = () => {
  const handleRestartTour = () => {
    // Remove the tour completion flag
    localStorage.removeItem('dashnote_tour_completed');
    
    // Reload the page to start tour
    window.location.reload();
  };

  return (
    <button
      onClick={handleRestartTour}
      className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-all"
      title="Restart tour"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
  );
};

export default RestartTourButton;
