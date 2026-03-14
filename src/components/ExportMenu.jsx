import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import { logExport } from "../utils/analytics"; // ⭐ ADD THIS IMPORT

const ExportMenu = ({ note, notes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(true);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const isAllNotesMode = !note && notes && notes.length > 0;

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceAbove = buttonRect.top;
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      setOpenUpward(spaceAbove > spaceBelow);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const cleanMarkdown = (text) => {
    if (!text) return '';
    return text.replace(/\*\*\*(.+?)\*\*\*/g, '$1').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/__(.+?)__/g, '$1').replace(/_(.+?)_/g, '$1').replace(/~~(.+?)~~/g, '$1').replace(/`(.+?)`/g, '$1').replace(/^#{1,6}\s+(.+)$/gm, '$1').replace(/^>\s+(.+)$/gm, '$1').replace(/\[(.+?)\]\(.+?\)/g, '$1').replace(/!\[.+?\]\(.+?\)/g, '').replace(/^\s*[-*+]\s+/gm, '• ').replace(/^\s*\d+\.\s+/gm, '').replace(/^[-*_]{3,}$/gm, '').replace(/\n{3,}/g, '\n\n').trim();
  };

  const exportAsPDF = (singleNote) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);
      let y = margin;

      if (singleNote) {
        doc.setFontSize(18);
        doc.setFont(undefined, 'bold');
        const titleLines = doc.splitTextToSize(singleNote.title, maxWidth);
        doc.text(titleLines, margin, y);
        y += titleLines.length * 10 + 5;
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
        y += 10;
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        const cleanContent = cleanMarkdown(singleNote.content);
        const contentLines = doc.splitTextToSize(cleanContent, maxWidth);
        contentLines.forEach(line => {
          if (y > pageHeight - margin) { doc.addPage(); y = margin; }
          doc.text(line, margin, y);
          y += 7;
        });
        y += 10;
        if (y > pageHeight - margin - 20) { doc.addPage(); y = margin; }
        doc.setFontSize(9);
        doc.setTextColor(128, 128, 128);
        doc.text(`Created: ${new Date(singleNote.createdAt).toLocaleDateString()}`, margin, y);
        doc.text(`Updated: ${new Date(singleNote.updatedAt).toLocaleDateString()}`, margin, y + 6);
        doc.save(`${singleNote.title}.pdf`);
        
        // ⭐ TRACK SINGLE NOTE PDF EXPORT
        logExport('PDF - Single Note');
      } else if (notes && notes.length > 0) {
        notes.forEach((n, index) => {
          if (index > 0) { doc.addPage(); y = margin; }
          doc.setFontSize(16);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(0, 0, 0);
          const titleLines = doc.splitTextToSize(n.title, maxWidth);
          doc.text(titleLines, margin, y);
          y += titleLines.length * 9 + 5;
          doc.setLineWidth(0.5);
          doc.line(margin, y, pageWidth - margin, y);
          y += 8;
          doc.setFontSize(10);
          doc.setFont(undefined, 'normal');
          const cleanContent = cleanMarkdown(n.content);
          const contentLines = doc.splitTextToSize(cleanContent, maxWidth);
          contentLines.forEach(line => {
            if (y > pageHeight - margin - 20) { doc.addPage(); y = margin; }
            doc.text(line, margin, y);
            y += 6;
          });
          y += 5;
          if (y > pageHeight - margin - 15) { doc.addPage(); y = margin; }
          doc.setFontSize(8);
          doc.setTextColor(128, 128, 128);
          doc.text(`Created: ${new Date(n.createdAt).toLocaleDateString()} | Updated: ${new Date(n.updatedAt).toLocaleDateString()}`, margin, y);
        });
        doc.save(`dashnote-export-${Date.now()}.pdf`);
        
        // ⭐ TRACK ALL NOTES PDF EXPORT
        logExport(`PDF - All Notes (${notes.length} notes)`);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("Failed to export PDF. Please try again.");
    }
  };

  const exportAsText = (singleNote) => {
    if (singleNote) {
      const cleanContent = cleanMarkdown(singleNote.content);
      const text = `${singleNote.title}\n${'='.repeat(singleNote.title.length)}\n\n${cleanContent}\n\n---\nCreated: ${new Date(singleNote.createdAt).toLocaleDateString()}\nUpdated: ${new Date(singleNote.updatedAt).toLocaleDateString()}`;
      downloadFile(text, `${singleNote.title}.txt`, 'text/plain');
      
      // ⭐ TRACK SINGLE NOTE TXT EXPORT
      logExport('TXT - Single Note');
    } else if (notes && notes.length > 0) {
      const text = notes.map(n => {
        const cleanContent = cleanMarkdown(n.content);
        return `${n.title}\n${'='.repeat(n.title.length)}\n\n${cleanContent}\n\n---\nCreated: ${new Date(n.createdAt).toLocaleDateString()} | Updated: ${new Date(n.updatedAt).toLocaleDateString()}\n\n\n`;
      }).join('\n');
      downloadFile(text, `dashnote-export-${Date.now()}.txt`, 'text/plain');
      
      // ⭐ TRACK ALL NOTES TXT EXPORT
      logExport(`TXT - All Notes (${notes.length} notes)`);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button ref={buttonRef} type="button" onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200" title="Export">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        <span className="hidden sm:inline">Export</span>
      </button>
      {isOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-end sm:items-center justify-center p-4" onClick={() => setIsOpen(false)}>
            <div className="bg-white dark:bg-neutral-800 rounded-t-2xl sm:rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 w-full max-w-sm" style={{ animation: 'slideUp 0.3s ease-out' }} onClick={(e) => e.stopPropagation()}>
              <style>{`@keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; }}`}</style>
              <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700"><h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Export Options</h3><button onClick={() => setIsOpen(false)} className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
              <div className="p-2">{note && (<><div className="px-3 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Current Note</div><button type="button" onClick={() => exportAsPDF(note)} className="w-full text-left px-4 py-3 text-base flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors rounded-lg"><svg className="w-6 h-6 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg><div><div className="font-medium">PDF Document</div><div className="text-xs text-neutral-500 dark:text-neutral-400">.pdf format</div></div></button><button type="button" onClick={() => exportAsText(note)} className="w-full text-left px-4 py-3 text-base flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors rounded-lg"><svg className="w-6 h-6 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><div><div className="font-medium">Text Document</div><div className="text-xs text-neutral-500 dark:text-neutral-400">.txt format</div></div></button></>)}{notes && notes.length > 0 && (<>{note && <div className="border-t border-neutral-200 dark:border-neutral-700 my-2"></div>}<div className="px-3 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">All Notes ({notes.length})</div><button type="button" onClick={() => exportAsPDF(null)} className="w-full text-left px-4 py-3 text-base flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors rounded-lg"><svg className="w-6 h-6 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg><div><div className="font-medium">All as PDF</div><div className="text-xs text-neutral-500 dark:text-neutral-400">Export {notes.length} notes</div></div></button><button type="button" onClick={() => exportAsText(null)} className="w-full text-left px-4 py-3 text-base flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors rounded-lg"><svg className="w-6 h-6 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><div><div className="font-medium">All as Text</div><div className="text-xs text-neutral-500 dark:text-neutral-400">Export {notes.length} notes</div></div></button></>)}</div>
            </div>
          </div>
          <div className={`hidden md:block absolute w-64 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 py-2 z-200 ${isAllNotesMode ? 'right-0' : 'left-0'} ${openUpward ? 'bottom-full mb-2' : 'top-full mt-2'}`} onClick={(e) => e.stopPropagation()}>
            <div className="px-4 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Export Format</div>
            {note && (<><div className="px-4 py-1 text-xs text-neutral-400 dark:text-neutral-600">Current Note</div><button type="button" onClick={() => exportAsPDF(note)} className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"><svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>PDF Document (.pdf)</button><button type="button" onClick={() => exportAsText(note)} className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"><svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>Text Document (.txt)</button></>)}{notes && notes.length > 0 && (<>{note && <div className="border-t border-neutral-200 dark:border-neutral-700 my-2"></div>}<div className="px-4 py-1 text-xs text-neutral-400 dark:text-neutral-600">All Notes ({notes.length})</div><button type="button" onClick={() => exportAsPDF(null)} className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"><svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>All as PDF</button><button type="button" onClick={() => exportAsText(null)} className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"><svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>All as Text</button></>)}</div>
        </>
      )}
    </div>
  );
};

export default ExportMenu;
