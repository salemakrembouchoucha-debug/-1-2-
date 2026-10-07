import React, { useState } from 'react';
import { AlrayyanLogo, QatarMoELogo } from './Logos';
import { Volume2, VolumeX, Sparkles, Award, User, RefreshCw, Users } from 'lucide-react';
import { getAudioMute, toggleAudioMute, playClickSound } from '../utils/audio';
import { AppMode, StudentProfile } from '../types';

interface HeaderProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  student: StudentProfile;
  onUpdateStudent: (updated: Partial<StudentProfile>) => void;
  onResetProgress: () => void;
  studentsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  student,
  onUpdateStudent,
  onResetProgress,
  studentsCount = 0,
}) => {
  const [muted, setMuted] = useState(getAudioMute());
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [tempName, setTempName] = useState(student.name);
  const [tempSection, setTempSection] = useState(student.section);

  const handleMuteToggle = () => {
    const isNowMuted = toggleAudioMute();
    setMuted(isNowMuted);
    playClickSound();
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStudent({
      name: tempName.trim() || 'طالب الريان المتميز',
      section: tempSection.trim() || 'الصف الثامن / 1',
    });
    setShowEditProfile(false);
  };

  return (
    <header className="bg-white border-b-2 border-amber-300 shadow-sm sticky top-0 z-40">
      {/* Top Banner: School and Ministry Names (No Logos/Emblems, Names Only) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Qatar Ministry of Education - Text Name Only */}
        <div className="order-1 flex items-center">
          <QatarMoELogo variant="full" />
        </div>

        {/* Center Tagline with Yellow Accent */}
        <div className="order-3 md:order-2 w-full md:w-auto text-center py-1 px-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border border-amber-300/60">
          <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-amber-950">
            <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>التقييم الإلكتروني لمادة العلوم - الصف الثامن (منهج دولة قطر)</span>
          </div>
          <div className="text-[11px] font-semibold text-amber-800">
            الوحدة الأولى: طبيعة المادة ومكوناتها • الوحدة الثانية: التغيرات الكيميائية
          </div>
        </div>

        {/* Alrayyan Private Schools - Text Name Only */}
        <div className="order-2 md:order-3 flex items-center">
          <AlrayyanLogo variant="full" />
        </div>
      </div>

      {/* Secondary Bar: Student Stats & Navigation Modes */}
      <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 border-t border-amber-200 px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Student Badge & Quick Edit & Student Records shortcut */}
          <div className="flex items-center gap-2.5">
            <button
              id="student-profile-button"
              onClick={() => setShowEditProfile(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-amber-300 hover:border-amber-500 shadow-xs transition-all text-right group cursor-pointer"
              title="انقر لتعديل اسم الطالب والشعبة"
            >
              <div className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-black text-sm group-hover:scale-105 transition-transform">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-amber-700">
                  {student.name}
                </div>
                <div className="text-[10px] font-semibold text-amber-800">
                  {student.section}
                </div>
              </div>
            </button>

            {/* Score Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400/30 rounded-lg border border-amber-400 text-amber-950 font-bold text-xs">
              <Award className="w-4 h-4 text-amber-700" />
              <span>النقاط: {student.score}</span>
            </div>

            {/* Quick Students List Button */}
            <button
              onClick={() => {
                playClickSound();
                onSelectMode('students_list');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold text-xs transition-all cursor-pointer ${
                currentMode === 'students_list'
                  ? 'bg-amber-500 text-amber-950 border-amber-600 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-amber-100 border-amber-300'
              }`}
              title="عرض قائمة وسجل الطلبة الذين حلوا الأسئلة"
            >
              <Users className="w-4 h-4 text-amber-700" />
              <span className="hidden sm:inline">سجل الطلبة</span>
              <span className="px-1.5 py-0.2 bg-amber-200 text-amber-900 rounded-full text-[10px] font-black">
                {studentsCount}
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              id="sound-toggle-button"
              onClick={handleMuteToggle}
              className="p-2 rounded-lg bg-white border border-amber-300 text-slate-700 hover:text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
              title={muted ? 'تشغيل الصوت' : 'كتم الصوت'}
            >
              {muted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>

            <button
              id="reset-progress-button"
              onClick={onResetProgress}
              className="p-2 rounded-lg bg-white border border-amber-300 text-slate-500 hover:text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer text-xs flex items-center gap-1"
              title="إعادة تعيين التقدم والبدء من جديد"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">إعادة</span>
            </button>
          </div>

          {/* Mode Navigation Tabs */}
          <nav className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
            {[
              { id: 'students_list', label: '👥 قائمة وسجل الطلبة' },
              { id: 'assessment', label: '📝 محاكاة التقييم الإلكتروني' },
              { id: 'adventure', label: '🎮 لعبة التحدي' },
              { id: 'drag_drop', label: '🧲 سحب وإدراج' },
              { id: 'practice_essay', label: '✍️ الأسئلة المقالية' },
              { id: 'practice_mcq', label: '📋 بنك الاختيار من متعدد' },
              { id: 'summary', label: '💡 المراجعة الذهبية' },
            ].map((tab) => {
              const active = currentMode === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => {
                    playClickSound();
                    onSelectMode(tab.id as AppMode);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-500 text-amber-950 shadow-sm border border-amber-600 scale-[1.02]'
                      : 'bg-white/80 text-slate-700 hover:bg-amber-200/70 border border-amber-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border-2 border-amber-400 shadow-xl" dir="rtl">
            <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-amber-600" />
              بيانات الطالب للاختبار والشهادة
            </h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم الطالب الرباعي:</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="مثال: سالم محمد علي"
                  className="w-full px-3 py-2 border-2 border-amber-300 rounded-xl focus:border-amber-500 focus:outline-hidden font-bold text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الصف والشعبة:</label>
                <input
                  type="text"
                  value={tempSection}
                  onChange={(e) => setTempSection(e.target.value)}
                  placeholder="مثال: الصف الثامن / 1"
                  className="w-full px-3 py-2 border-2 border-amber-300 rounded-xl focus:border-amber-500 focus:outline-hidden font-bold text-slate-800"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-sm shadow-sm cursor-pointer"
                >
                  حفظ وتأكيد
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
