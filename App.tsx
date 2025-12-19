import React, { useState, useEffect } from 'react';
import { NOTES, CHROMATIC_SCALE, INSTRUMENTS } from './constants';
import { NoteDefinition } from './types';
import Saxophone3D from './components/Saxophone3D';
import { ChevronRight, ArrowRightLeft, Music, Eye } from 'lucide-react';

// Custom Saxophone Icon Component
const SaxophoneIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 3h2v1" />
    <path d="M8 4h1a2 2 0 0 1 2 2v7a4 4 0 0 0 4 4h1a4 4 0 0 0 4-4v-2l2-2" />
    <line x1="11" y1="8" x2="12" y2="8" />
    <line x1="11" y1="10" x2="12" y2="10" />
    <line x1="11" y1="12" x2="12" y2="12" />
  </svg>
);

const App: React.FC = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'fingering' | 'transpose'>('fingering');
  
  // Mobile View State: 'list' (controls) or 'view' (3D sax)
  const [mobileView, setMobileView] = useState<'list' | 'view'>('list');

  // Check if mobile for auto-switching
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Fingering State
  const [selectedNote, setSelectedNote] = useState<NoteDefinition>(NOTES[16]); 
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  // Transposition State
  const [sourceInstIndex, setSourceInstIndex] = useState(0); // Default Piano
  const [targetInstIndex, setTargetInstIndex] = useState(2); // Default Tenor/Soprano (Bb)
  const [sourceNoteIndex, setSourceNoteIndex] = useState(0); // Default C
  
  // Calculate Transposition
  const getTransposedNoteIndex = () => {
     const sourceOffset = INSTRUMENTS[sourceInstIndex].offset;
     const targetOffset = INSTRUMENTS[targetInstIndex].offset;
     const diff = targetOffset - sourceOffset;
     let result = (sourceNoteIndex + diff) % 12;
     if (result < 0) result += 12;
     return result;
  };

  const transposedNoteIndex = getTransposedNoteIndex();
  const transposedNoteName = CHROMATIC_SCALE[transposedNoteIndex].name;

  // Find the NoteDefinition for the transposed note to display its fingering
  const getTransposedNoteDef = () => {
    // 0=C, 1=C#, 2=D, 3=Eb, 4=E, 5=F, 6=F#, 7=G, 8=G#, 9=A, 10=Bb, 11=B
    const noteIdMap: Record<number, string> = {
        0: 'mid_c',       // C5
        1: 'mid_c_sharp', // C#5
        2: 'high_d',      // D5
        3: 'high_eb',     // Eb5
        4: 'high_e',      // E5
        5: 'high_f',      // F5
        6: 'high_f_sharp',// F#5
        7: 'low_g',       // G4 (easier reading than G5)
        8: 'low_g_sharp', // G#4
        9: 'mid_a',       // A4
        10: 'mid_bb',     // Bb4
        11: 'mid_b'       // B4
    };

    const targetId = noteIdMap[transposedNoteIndex];
    return NOTES.find(n => n.id === targetId) || NOTES[0];
  };

  const transposedNoteDef = getTransposedNoteDef();

  // Reset variant when note changes
  useEffect(() => {
    setSelectedVariantIndex(0);
  }, [selectedNote]);

  const currentVariant = selectedNote.variants[selectedVariantIndex];
  
  // Group notes for better UI
  const groupedNotes = NOTES.reduce((acc, note) => {
    if (!acc[note.group]) acc[note.group] = [];
    acc[note.group].push(note);
    return acc;
  }, {} as Record<string, NoteDefinition[]>);

  const groups = ['Grave', 'Médium', 'Aigu', 'Sur-aigu'];

  const handleNoteSelect = (note: NoteDefinition) => {
    setSelectedNote(note);
    // On mobile, automatically switch to view mode when a note is picked
    if (window.innerWidth < 768) {
      setMobileView('view');
    }
  };

  return (
    <div className="h-[100dvh] bg-[#f8fafc] text-slate-800 flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* SIDEBAR: Navigation & Note Selection */}
      {/* Mobile: Hidden if in 'view' mode. Desktop: Always visible. */}
      <aside className={`
        flex-col bg-white border-r border-slate-200 shadow-xl z-20 
        md:w-80 lg:w-96 md:flex md:relative
        ${mobileView === 'list' ? 'flex w-full h-full absolute inset-0 md:static' : 'hidden'}
      `}>
        <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-white shrink-0">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-amber-200 shrink-0">
             <SaxophoneIcon size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 serif-font">SaxGuide</h1>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">L'outil du saxophoniste</p>
          </div>
        </div>

        {/* Desktop Tabs - Hidden on Mobile because we use Bottom Nav */}
        <div className="hidden md:flex border-b border-slate-100">
            <button 
                onClick={() => setActiveTab('fingering')}
                className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'fingering' ? 'text-amber-600 border-b-2 border-amber-500 bg-amber-50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
            >
                <Music size={16} />
                Doigtés
            </button>
            <button 
                onClick={() => setActiveTab('transpose')}
                className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'transpose' ? 'text-amber-600 border-b-2 border-amber-500 bg-amber-50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
            >
                <ArrowRightLeft size={16} />
                Transposer
            </button>
        </div>

        {/* Sidebar Content Based on Tab */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 md:bg-white pb-24 md:pb-0">
          {activeTab === 'fingering' ? (
              <div className="p-4 space-y-6">
              {groups.map(groupName => (
                <div key={groupName}>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    {groupName}
                  </h3>
                  <div className="grid grid-cols-1 gap-1">
                    {groupedNotes[groupName]?.map(note => (
                      <button
                        key={note.id}
                        onClick={() => handleNoteSelect(note)}
                        className={`
                          w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-all duration-200 group
                          ${selectedNote.id === note.id 
                            ? 'bg-slate-900 text-white shadow-md transform scale-[1.02]' 
                            : 'bg-white md:bg-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-900 shadow-sm md:shadow-none border md:border-none border-slate-100'}
                        `}
                      >
                        <div>
                          <span className={`font-bold text-lg ${selectedNote.id === note.id ? 'text-amber-400' : ''}`}>{note.name}</span>
                          <span className={`ml-2 text-sm ${selectedNote.id === note.id ? 'text-slate-400' : 'text-slate-400'}`}>{note.scientificName}</span>
                        </div>
                        {selectedNote.id === note.id && <ChevronRight size={16} className="text-amber-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
              <div className="p-6 flex flex-col justify-start">
                  <div className="space-y-6">
                      <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Instrument d'origine</label>
                          <select 
                              className="w-full p-3 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
                              value={sourceInstIndex}
                              onChange={(e) => setSourceInstIndex(Number(e.target.value))}
                          >
                              {INSTRUMENTS.map((inst, idx) => (
                                  <option key={idx} value={idx}>{inst.name}</option>
                              ))}
                          </select>
                      </div>

                      <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Note jouée (Orale)</label>
                          <div className="grid grid-cols-4 gap-2">
                              {CHROMATIC_SCALE.map((note, idx) => (
                                  <button
                                      key={idx}
                                      onClick={() => setSourceNoteIndex(idx)}
                                      className={`
                                          p-2 rounded-lg text-xs font-bold transition-all border min-h-[40px]
                                          ${sourceNoteIndex === idx 
                                              ? 'bg-slate-800 text-white border-slate-800 shadow-md transform scale-105' 
                                              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                                      `}
                                  >
                                      {note.name.split(' / ')[0]}
                                  </button>
                              ))}
                          </div>
                      </div>

                      <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Instrument de destination</label>
                          <select 
                              className="w-full p-3 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
                              value={targetInstIndex}
                              onChange={(e) => setTargetInstIndex(Number(e.target.value))}
                          >
                              {INSTRUMENTS.map((inst, idx) => (
                                  <option key={idx} value={idx}>{inst.name}</option>
                              ))}
                          </select>
                      </div>

                      <div className="pt-4 border-t border-slate-200">
                          <div className="bg-amber-100/50 border border-amber-200 rounded-xl p-4 text-center">
                              <span className="text-xs uppercase text-amber-700/60 font-bold tracking-wider">Résultat (Saxophone)</span>
                              <div className="text-4xl font-bold text-amber-600 serif-font mt-1">
                                  {transposedNoteName}
                              </div>
                              <div className="text-sm text-amber-700/50 font-medium mt-1">
                                  {transposedNoteDef.scientificName}
                              </div>
                              {/* Mobile only hint */}
                              <div className="md:hidden mt-3">
                                <button 
                                  onClick={() => setMobileView('view')}
                                  className="text-xs bg-amber-200 text-amber-800 px-3 py-1 rounded-full font-bold uppercase tracking-wide"
                                >
                                  Voir le doigté
                                </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      {/* Mobile: Hidden if in 'list' mode. Desktop: Always visible. */}
      <main className={`
        flex-col relative bg-gradient-to-br from-slate-50 via-orange-50/50 to-amber-100/40 overflow-hidden
        flex-1 md:h-screen md:flex
        ${mobileView === 'view' ? 'flex h-full' : 'hidden'}
      `}>
        
        {/* Abstract Background Blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-3xl opacity-60 pointer-events-none" />


        {/* --- VIEW: FINGERING CHART --- */}
        {activeTab === 'fingering' && (
            <>
                {/* Note Info Header */}
                <div className="absolute top-0 left-0 right-0 p-4 md:p-8 z-10 pointer-events-none flex justify-center md:justify-start">
                    <div className="bg-white/80 backdrop-blur-xl p-4 md:p-6 rounded-2xl shadow-sm border border-white/50 w-full max-w-md pointer-events-auto transition-all duration-300 hover:bg-white/90 flex flex-col gap-2 md:gap-4 mt-2 md:mt-0">
                        <div className="flex justify-between items-start">
                          <div>
                              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 serif-font mb-1 flex items-baseline gap-3">
                              {selectedNote.name}
                              <span className="text-lg md:text-xl text-slate-400 font-sans font-medium">{selectedNote.scientificName}</span>
                              </h2>
                          </div>
                          {/* Back button for mobile only inside the card */}
                          <button 
                            onClick={() => setMobileView('list')}
                            className="md:hidden p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full"
                          >
                            <ArrowRightLeft size={16} />
                          </button>
                        </div>

                        <p className="text-slate-600 leading-relaxed text-sm">
                          {currentVariant.description || selectedNote.description}
                        </p>
                        
                        {selectedNote.variants.length > 1 && (
                            <div className="flex flex-wrap gap-2 mt-1">
                            {selectedNote.variants.map((variant, idx) => (
                                <button
                                key={idx}
                                onClick={() => setSelectedVariantIndex(idx)}
                                className={`
                                    px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all
                                    ${selectedVariantIndex === idx 
                                    ? 'bg-amber-500 text-white shadow-md' 
                                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}
                                `}
                                >
                                {variant.label}
                                </button>
                            ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Saxophone Visual */}
                <div className="relative w-full h-full flex items-center justify-center pt-32 md:pt-32 pb-24 md:pb-8 z-0">
                    <Saxophone3D activeKeys={currentVariant.keys} />
                </div>
            </>
        )}

        {/* --- VIEW: TRANSPOSE CHART --- */}
        {activeTab === 'transpose' && (
             <>
                <div className="absolute top-0 left-0 right-0 p-4 md:p-8 z-10 pointer-events-none flex justify-center md:justify-start">
                    <div className="bg-white/80 backdrop-blur-xl px-4 py-3 md:px-6 md:py-4 rounded-2xl shadow-sm border border-white/50 pointer-events-auto flex items-center justify-between w-full md:w-auto mt-2 md:mt-0">
                         <div>
                           <span className="text-xs uppercase text-slate-400 font-bold tracking-widest mr-3 block md:inline">Doigté pour</span>
                           <span className="text-2xl font-bold text-slate-900 serif-font">{transposedNoteName}</span>
                         </div>
                          <button 
                            onClick={() => setMobileView('list')}
                            className="md:hidden p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full"
                          >
                            <ArrowRightLeft size={16} />
                          </button>
                    </div>
                </div>

                <div className="relative w-full h-full flex items-center justify-center pt-24 pb-24 md:pb-8 z-0">
                    <Saxophone3D activeKeys={transposedNoteDef.variants[0].keys} />
                </div>
             </>
        )}

        {/* Footer Credit */}
        <div className="absolute bottom-20 md:bottom-4 right-6 text-slate-400 text-[10px] md:text-xs font-medium z-10 pointer-events-none opacity-50">
          Application proposée par Guillaume Sax
        </div>

      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => { setActiveTab('fingering'); setMobileView('list'); }}
          className={`flex flex-col items-center justify-center w-full py-3 gap-1 ${activeTab === 'fingering' && mobileView === 'list' ? 'text-amber-600' : 'text-slate-400'}`}
        >
          <Music size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wide">Doigtés</span>
        </button>

        <button 
          onClick={() => setMobileView('view')}
          className={`flex flex-col items-center justify-center w-full py-3 gap-1 ${mobileView === 'view' ? 'text-amber-600' : 'text-slate-400'}`}
        >
          <Eye size={24} className={mobileView === 'view' ? 'fill-amber-100' : ''} />
          <span className="text-[10px] font-bold uppercase tracking-wide">Saxophone</span>
        </button>

        <button 
          onClick={() => { setActiveTab('transpose'); setMobileView('list'); }}
          className={`flex flex-col items-center justify-center w-full py-3 gap-1 ${activeTab === 'transpose' && mobileView === 'list' ? 'text-amber-600' : 'text-slate-400'}`}
        >
          <ArrowRightLeft size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wide">Transposer</span>
        </button>
      </nav>
    </div>
  );
};

export default App;