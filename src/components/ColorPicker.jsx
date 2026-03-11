import { useState } from "react";

const ColorPicker = ({ selectedColor, onColorChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    { name: 'None', value: null, class: 'bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700' },
    { name: 'Red', value: 'red', class: 'bg-red-50 dark:bg-red-950 border-2 border-red-200 dark:border-red-800' },
    { name: 'Orange', value: 'orange', class: 'bg-orange-50 dark:bg-orange-950 border-2 border-orange-200 dark:border-orange-800' },
    { name: 'Yellow', value: 'yellow', class: 'bg-yellow-50 dark:bg-yellow-950 border-2 border-yellow-200 dark:border-yellow-800' },
    { name: 'Green', value: 'green', class: 'bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800' },
    { name: 'Blue', value: 'blue', class: 'bg-blue-50 dark:bg-blue-950 border-2 border-blue-200 dark:border-blue-800' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-50 dark:bg-purple-950 border-2 border-purple-200 dark:border-purple-800' },
    { name: 'Pink', value: 'pink', class: 'bg-pink-50 dark:bg-pink-950 border-2 border-pink-200 dark:border-pink-800' },
  ];

  const currentColor = colors.find(c => c.value === selectedColor) || colors[0];

  const handleColorSelect = (colorValue) => {
    onColorChange(colorValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
        title="Note color"
      >
        <div className={`w-5 h-5 rounded-full ${currentColor.class} flex items-center justify-center`}>
          {selectedColor && (
            <svg className="w-3 h-3 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className="hidden sm:inline">{currentColor.name}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-10 md:hidden" 
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Dropdown */}
          <div className="absolute left-0 md:right-0 mt-2 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-3 z-20 min-w-50">
            <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2 px-1">
              Note Color
            </div>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <button
                  key={color.value || 'none'}
                  onClick={() => handleColorSelect(color.value)}
                  className={`relative w-12 h-12 rounded-lg ${color.class} hover:scale-110 transition-transform duration-200 flex items-center justify-center group`}
                  title={color.name}
                >
                  {selectedColor === color.value && (
                    <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {/* Tooltip */}
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ColorPicker;
