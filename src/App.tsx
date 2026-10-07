/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AdventureMode } from './components/AdventureMode';
import { AssessmentMode } from './components/AssessmentMode';
import { DragDropMode } from './components/DragDropMode';
import { EssayMode } from './components/EssayMode';
import { MCQBankMode } from './components/MCQBankMode';
import { SummaryMode } from './components/SummaryMode';
import { AppMode, StudentProfile } from './types';
import { AlrayyanLogo, QatarMoELogo } from './components/Logos';
import { playSuccessSound } from './utils/audio';

const STORAGE_KEY_STUDENT = 'alrayyan_science_student_v1';

export default function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('adventure');

  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENT);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.section === 'string' && parsed.section.includes('السابع')) {
          parsed.section = parsed.section.replace('السابع', 'الثامن');
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return {
      name: 'سالم أكرم بوشوشة',
      section: 'الصف الثامن / 1',
      score: 310,
    };
  });

  // Persist student data
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(student));
    } catch {
      // ignore
    }
  }, [student]);

  const handleUpdateScore = (points: number) => {
    setStudent((prev) => ({
      ...prev,
      score: Math.max(0, prev.score + points),
    }));
  };

  const handleUpdateStudent = (updated: Partial<StudentProfile>) => {
    setStudent((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إعادة تعيين النقاط والبدء من جديد؟')) {
      setStudent((prev) => ({
        ...prev,
        score: 0,
      }));
      playSuccessSound();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-yellow-50/40 to-slate-100 flex flex-col font-['Cairo',sans-serif] text-slate-800" dir="rtl">
      {/* Universal Top Header with Qatar & Al-Rayyan Names Only (No Logos) */}
      <Header
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        student={student}
        onUpdateStudent={handleUpdateStudent}
        onResetProgress={handleResetProgress}
      />

      {/* Main Content Area based on Mode */}
      <main className="flex-1 w-full pb-12">
        {currentMode === 'assessment' && (
          <AssessmentMode
            student={student}
            onUpdateScore={handleUpdateScore}
          />
        )}

        {currentMode === 'adventure' && (
          <AdventureMode student={student} onUpdateScore={handleUpdateScore} />
        )}

        {currentMode === 'drag_drop' && (
          <DragDropMode onUpdateScore={handleUpdateScore} />
        )}

        {currentMode === 'practice_essay' && (
          <EssayMode onUpdateScore={handleUpdateScore} />
        )}

        {currentMode === 'practice_mcq' && (
          <MCQBankMode onUpdateScore={handleUpdateScore} />
        )}

        {currentMode === 'summary' && <SummaryMode />}
      </main>

      {/* Bottom Footer - Names Only (No Graphic Logos) */}
      <footer className="bg-white border-t-2 border-amber-300 py-6 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
          <div className="flex items-center gap-3">
            <AlrayyanLogo variant="compact" />
          </div>

          <div className="text-center text-xs text-slate-500 font-bold">
            <span className="text-amber-700 font-black">أخلاق • إنضباط • تفوق</span>
            <span className="mx-2">•</span>
            <span>استعداداً للتقييم الإلكتروني لقسم العلوم</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <QatarMoELogo variant="compact" />
          </div>
        </div>
      </footer>
    </div>
  );
}
