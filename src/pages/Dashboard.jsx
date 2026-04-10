import { useEffect, useState, useRef } from "react";

import API from "../services/api";
import ThemeToggle from "../components/ThemeToggle";
import TagManager from "../components/TagManager";
import SortDropdown from "../components/SortDropdown";
import ExportMenu from "../components/ExportMenu";
import ColorPicker from "../components/ColorPicker";
import RichTextEditor from "../components/RichTextEditor"; // ⭐ NEW
import useKeyboardShortcuts, { KeyboardShortcutsHelp } from "../utils/useKeyboardShortcuts";
import useAutoSave, { AutoSaveIndicator } from "../utils/useAutoSave";
import { useToast } from "../contexts/ToastContext";

import ProductTour from "../components/ProductTour";

import { logNoteCreated, logExport } from "../utils/analytics";
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

const Dashboard = () => {
  // State management
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [viewingNote, setViewingNote] = useState(null);
  const [color, setColor] = useState(null);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const searchInputRef = useRef(null);

  const { showToast } = useToast();
  
  // New feature states
  const [availableTags, setAvailableTags] = useState([]);
  const [filterTag, setFilterTag] = useState(null);
  const [sortBy, setSortBy] = useState('date-desc');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fetchNotes = async (query = "") => {
    try {
      const res = await API.get(`/api/notes?q=${query}`);
      setNotes(res.data);
      
      // Extract all unique tags
      const allTags = [...new Set(res.data.flatMap(note => note.tags || []))];
      setAvailableTags(allTags);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchNotes(search);
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  // Auto-save functionality
  const autoSaveStatus = useAutoSave(
    { title, content, tags, isFavorite, color },
    async (data) => {
      if (editingId && data.title && data.content) {
        await API.put(`/api/notes/${editingId}`, data);
        await fetchNotes();
      }
    },
    3000
  );

  

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSave: () => {
      const form = document.querySelector('form');
      if (form) form.requestSubmit();
    },
    onNew: () => {
      setEditingId(null);
      setTitle("");
      setContent("");
      setTags([]);
      setIsFavorite(false);
      setColor(null);
      document.getElementById('note-title')?.focus();
    },
    onSearch: () => {
      searchInputRef.current?.focus();
    },
  
    onToggleFavorite: () => setIsFavorite(!isFavorite),
    onCancel: () => {
      if (editingId) {
        setEditingId(null);
        setTitle("");
        setContent("");
        setTags([]);
        setIsFavorite(false);
        setColor(null);
      }
    },
    onShowHelp: () => setShowShortcutsHelp(true),
  });

  // Filter and Sort notes
  useEffect(() => {
    let result = [...notes];

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(note => 
        note.title.toLowerCase().includes(searchLower) ||
        note.content.toLowerCase().includes(searchLower)
      );
    }

    if (filterTag) {
      result = result.filter(note => note.tags && note.tags.includes(filterTag));
    }

    if (showFavoritesOnly) {
      result = result.filter(note => note.isFavorite);
    }

    result.sort((a, b) => {
      switch(sortBy) {
        case 'date-desc':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'date-asc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'updated':
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        default:
          return 0;
      }
    });

    if (!showFavoritesOnly) {
      result.sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return 0;
      });
    }

    setFilteredNotes(result);
  }, [notes, search, filterTag, sortBy, showFavoritesOnly]);

  const submitNote = async (e) => {
    e.preventDefault();

    try {
      const noteData = { title, content, tags, isFavorite, color };

      if (editingId) {
        await API.put(`/api/notes/${editingId}`, noteData);
        showToast('Note updated successfully!', 'success'); 
        setEditingId(null);
      } else {
        await API.post("/api/notes", noteData);
        showToast('Note created successfully!', 'success');
        logNoteCreated(); // ⭐ Track note creation 
      }

      setTitle("");
      setContent("");
      setTags([]);
      setIsFavorite(false);
      setColor(null);
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    const errorMsg = error.response?.data?.error || "Failed to save note";
    showToast(errorMsg, 'error');  
    }
  };

  const toggleFavorite = async (noteId, currentStatus) => {
    try {
      await API.put(`/api/notes/${noteId}`, { isFavorite: !currentStatus });
      fetchNotes();
          showToast(
      !currentStatus ? 'Added to favorites' : 'Removed from favorites', 
      'success'
    );
    } catch (error) {
      console.error("Error toggling favorite:", error);
      showToast('Failed to update favorite', 'error');
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/api/notes/${id}`);
      fetchNotes();
      showToast('Note deleted', 'success');
    } catch (error) {
      console.error("Error deleting note:", error);
      const errorMsg = error.response?.data?.error || "Failed to delete note";
      showToast(errorMsg, 'error');
    }
  };

  const getTagColor = (tag) => {
    const colors = [
      "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800",
    ];
    const hash = tag.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  const getColorClass = (noteColor) => {
    const colorMap = {
      red: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
      orange: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800',
      yellow: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800',
      green: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
      blue: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
      purple: 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800',
      pink: 'bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800',
    };
    return noteColor ? colorMap[noteColor] || '' : '';
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-in;
          }
        `}
      </style>

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* FULL NOTE MODAL */}
      {viewingNote && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
          onClick={() => setViewingNote(null)}
        >
          <div
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-6 md:p-8 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-3xl md:text-4xl font-light text-neutral-900 dark:text-neutral-100 tracking-tight">
                    {viewingNote.title}
                  </h2>
                  {viewingNote.isFavorite && (
                    <svg className="w-6 h-6 text-yellow-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-400 dark:text-neutral-600">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {new Date(viewingNote.updatedAt).toLocaleDateString()} at {new Date(viewingNote.updatedAt).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                  </div>
                  {viewingNote.tags && viewingNote.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {viewingNote.tags.map(tag => (
                        <span key={tag} className={`inline-block px-2 py-0.5 rounded-md text-xs border ${getTagColor(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setViewingNote(null)}
                className="shrink-0 w-10 h-10 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center transition-colors duration-200 text-neutral-400 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
  <div 
    className="prose prose-lg prose-neutral dark:prose-invert max-w-none text-neutral-900 dark:text-neutral-100
      [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-4
      [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:my-3
      [&_h3]:text-xl [&_h3]:font-bold [&_h3]:my-2
      [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-4
      [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-4
      [&_li]:my-1
      [&_blockquote]:border-l-4 [&_blockquote]:border-neutral-300
      [&_blockquote]:dark:border-neutral-700 [&_blockquote]:pl-4
      [&_blockquote]:italic [&_blockquote]:my-4"
    dangerouslySetInnerHTML={{ __html: viewingNote.content }}
  />
</div>

            <div className="flex items-center justify-between gap-3 p-6 md:p-8 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
              <ExportMenu note={viewingNote} />
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingId(viewingNote._id);
                    setTitle(viewingNote.title);
                    setContent(viewingNote.content);
                    setTags(viewingNote.tags || []);
                    setIsFavorite(viewingNote.isFavorite || false);
                    setColor(viewingNote.color || null);
                    setViewingNote(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Edit Note
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this note?")) {
                      deleteNote(viewingNote._id);
                      setViewingNote(null);
                    }
                  }}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:text-white hover:bg-red-500 transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header
        className="relative z-10 border-b border-neutral-200/50 dark:border-neutral-800/50 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-5 flex justify-between items-center">
          <div className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-linear-to-br from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 rounded-lg flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-700 shrink-0">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L8 14M2 8L14 8" stroke="white" className="dark:stroke-neutral-900" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="text-lg md:text-2xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
              Dashnote
            </h1>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setShowShortcutsHelp(true)}
              className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-all"
              title="Keyboard shortcuts"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>

            <ThemeToggle />
            <button
              onClick={logout}
              className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* LEFT COLUMN: Editor */}
          <div
            className="space-y-5"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            {/* Search Bar */}
            <div className="relative" data-tour="search-bar">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 dark:text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input ref={searchInputRef}
               
                type="text"
                placeholder="Search in titles and content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-neutral-100/10 focus:border-neutral-900 dark:focus:border-neutral-100 transition-all duration-300 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
              />
            </div>

            {/* Editor Card */}
            <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-5 md:p-7 shadow-lg">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl md:text-3xl font-light text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {editingId ? "Edit Note" : "New Note"}
                </h2>

                <div className="flex items-center gap-3">
                  <AutoSaveIndicator status={autoSaveStatus} />
                  <button
                    type="button"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    data-tour="favorite-button"
                  >
                    <svg 
                      className={`w-6 h-6 ${isFavorite ? 'text-yellow-500 fill-current' : 'text-neutral-400'}`}
                      fill={isFavorite ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <form onSubmit={submitNote} className="space-y-4">
                <input
                  id="note-title"
                  className="w-full px-0 py-2 text-2xl font-light border-0 border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-neutral-100 focus:outline-none bg-transparent transition-colors duration-300 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-300 dark:placeholder:text-neutral-700"
                  placeholder="Note title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <div data-tour="tag-manager">
                <TagManager
                  selectedTags={tags}
                  availableTags={availableTags}
                  onTagsChange={setTags}
                  onCreateTag={(newTag) => setAvailableTags([...availableTags, newTag])}
                />
                </div>

                <div data-tour="color-picker">
                <ColorPicker
                  selectedColor={color}
                  onColorChange={setColor}
                />
                </div>

               {/* Rich Text Editor */}
<RichTextEditor
  content={content}
  onChange={setContent}
  placeholder="Start writing..."
/>

                <div className="flex gap-3 pt-3">
                  <button
                    type="submit"
                    disabled={!title || !content}
                    className="flex-1 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-6 py-3.5 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg disabled:hover:scale-100"
                  >
                    {editingId ? "Update Note" : "Save Note"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setTitle("");
                        setContent("");
                        setTags([]);
                        setIsFavorite(false);
                        setColor(null);
                      }}
                      className="px-6 py-3.5 rounded-xl font-medium border-2 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-900 dark:hover:border-neutral-100 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Notes List */}
          <div
            className="space-y-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm md:text-base font-medium text-neutral-500 dark:text-neutral-400 tracking-wide uppercase">
                  {showFavoritesOnly ? 'Favorites' : filterTag ? `#${filterTag}` : `Notes`} ({filteredNotes.length})
                </h2>
                
                {availableTags.length > 0 && !filterTag && (
                  <div className="flex flex-wrap gap-1">
                    {availableTags.slice(0, 3).map(tag => (
                      <button
                        key={tag}
                        onClick={() => setFilterTag(tag)}
                        className={`px-2 py-1 rounded-md text-xs border ${getTagColor(tag)} hover:opacity-80 transition-opacity`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
                
                {filterTag && (
                  <button
                    onClick={() => setFilterTag(null)}
                    className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    showFavoritesOnly 
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' 
                      : 'text-neutral-400 dark:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                  title={showFavoritesOnly ? "Show all notes" : "Show favorites only"}
                >
                  <svg className="w-5 h-5" fill={showFavoritesOnly ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                </button>

                <SortDropdown currentSort={sortBy} onSortChange={setSortBy} />
                  <div data-tour="export-menu"> 
                    <ExportMenu notes={filteredNotes} />
                  </div>
              </div>
            </div>

            {filteredNotes.length === 0 && (
              <div className="text-center py-16 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800">
                <svg className="w-16 h-16 mx-auto mb-4 text-neutral-300 dark:text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <p className="text-neutral-400 dark:text-neutral-600 text-lg font-light">
                  {search ? 'No notes found' : filterTag ? `No notes with tag "${filterTag}"` : showFavoritesOnly ? 'No favorite notes yet' : 'No notes yet. Start writing!'}
                </p>
              </div>
            )}

            <div className="space-y-3">
              {filteredNotes.map((note, index) => (
                <div
                  key={note._id}
                  className={`group backdrop-blur-sm border rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 ${
                    note.color 
                      ? getColorClass(note.color)
                      : 'bg-white/70 dark:bg-neutral-900/70 border-neutral-200/80 dark:border-neutral-800/80'
                  } hover:border-neutral-300 dark:hover:border-neutral-700`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + index * 0.08}s`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleFavorite(note._id, note.isFavorite)}
                      className="mt-1 shrink-0 p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <svg 
                        className={`w-5 h-5 ${note.isFavorite ? 'text-yellow-500 fill-current' : 'text-neutral-300 dark:text-neutral-700'}`}
                        fill={note.isFavorite ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                      </svg>
                    </button>

                    <div className="flex-1 min-w-0">
                      <h3 
                        className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors cursor-pointer line-clamp-1"
                        onClick={() => setViewingNote(note)}
                      >
                        {note.title}
                      </h3>

                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {note.tags.map(tag => (
                            <button
                              key={tag}
                              onClick={() => setFilterTag(tag)}
                              className={`inline-block px-2 py-0.5 rounded-md text-xs border ${getTagColor(tag)} hover:opacity-80 transition-opacity`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      )}

                      <div 
  className="prose prose-sm prose-neutral dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2 cursor-pointer"
  onClick={() => setViewingNote(note)}
  dangerouslySetInnerHTML={{ 
    __html: note.content.substring(0, 200) + (note.content.length > 200 ? '...' : '')
  }}
/>

                      {note.content.split('\n').length > 2 && (
                        <button
                          onClick={() => setViewingNote(note)}
                          className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200 mb-2 flex items-center gap-1"
                        >
                          Read more
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                          </svg>
                        </button>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
                        <p className="text-xs text-neutral-400 dark:text-neutral-600 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          {new Date(note.updatedAt).toLocaleDateString()} at {new Date(note.updatedAt).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                        </p>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingId(note._id);
                              setTitle(note.title);
                              setContent(note.content);
                              setTags(note.tags || []);
                              setIsFavorite(note.isFavorite || false);
                              setColor(note.color || null);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200 flex items-center gap-1"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm("Are you sure you want to delete this note?")) {
                                deleteNote(note._id);
                              }
                            }}
                            className="text-xs text-neutral-400 dark:text-neutral-600 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200 flex items-center gap-1"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

              <ProductTour />
      <KeyboardShortcutsHelp 
        isOpen={showShortcutsHelp} 
        onClose={() => setShowShortcutsHelp(false)} 
      />
    </div>
  );
};

export default Dashboard;