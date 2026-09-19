import React, { useState } from 'react';
import { ALL_MCQS } from '../data/curriculumData';
import { MCQQuestion } from '../types';
import { DiagramRenderer } from './DiagramRenderer';
import { playSuccessSound, playErrorSound, playClickSound } from '../utils/audio';
import { Search, Filter, CheckCircle2, XCircle, FileText, Check } from 'lucide-react';

interface MCQBankModeProps {
  onUpdateScore: (points: number) => void;
}

export const MCQBankMode: React.FC<MCQBankModeProps> = ({ onUpdateScore }) => {
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const filteredQuestions = ALL_MCQS.filter((q) => {
    const matchesUnit =
      selectedUnit === 'all' ||
      (selectedUnit === 'unit1_matter' && q.unit === 'unit1_matter') ||
      (selectedUnit === 'unit2_reactions' && q.unit === 'unit2_reactions');

    const matchesSearch =
      searchQuery.trim() === '' ||
      q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.options.some((o) => o.text.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.explanation.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesUnit && matchesSearch;
  });

  const handleSelectOption = (questionId: string, optId: 'A' | 'B' | 'C' | 'D', correct: string) => {
    playClickSound();
    setAnswers((prev) => ({ ...prev, [questionId]: optId }));
    setRevealed((prev) => ({ ...prev, [questionId]: true }));

    if (optId === correct) {
      playSuccessSound();
      onUpdateScore(10);
    } else {
      playErrorSound();
    }
  };

  const handleToggleReveal = (questionId: string) => {
    playClickSound();
    setRevealed((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6" dir="rtl">
      {/* Search & Unit Filters Header */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 p-4 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-black text-slate-800">
              بنك أسئلة الاختيار من متعدد الشامل (32 سؤالاً)
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              جميع أسئلة الاختيار من متعدد الواردة في الأوراق الرسمية المرفقة (صفحات 2، 3، 4، 5، 10، 11)
            </p>
          </div>

          {/* Unit Filter Buttons */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            {[
              { id: 'all', label: 'جميع الأسئلة (32)' },
              { id: 'unit1_matter', label: 'الوحدة الأولى (22)' },
              { id: 'unit2_reactions', label: 'الوحدة الثانية (10)' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => {
                  playClickSound();
                  setSelectedUnit(btn.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedUnit === btn.id
                    ? 'bg-amber-500 text-amber-950 font-black shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في نص السؤال، اسم العالم (دالتون، رذرفورد...)، أو المفهوم (ماء الجير، الأكسدة، التعادل)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border-2 border-slate-200 focus:border-amber-400 focus:outline-hidden text-xs sm:text-sm font-bold text-slate-800 bg-slate-50"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-3 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              مسح
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q) => {
          const studentChoice = answers[q.id];
          const isRevealed = revealed[q.id];

          return (
            <div
              key={q.id}
              className="bg-white rounded-3xl border-2 border-amber-300 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-amber-100">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-amber-500 text-amber-950 flex items-center justify-center font-black text-xs">
                    {q.questionNumber}
                  </span>
                  <span className="text-xs font-bold text-slate-600">
                    {q.unitTitle} (المرفق: صفحة {q.sourcePage})
                  </span>
                </div>

                <button
                  onClick={() => handleToggleReveal(q.id)}
                  className="text-xs font-bold text-amber-800 hover:text-amber-950 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 cursor-pointer"
                >
                  {isRevealed ? 'إخفاء الشرح' : 'عرض نموذج الإجابة والشرح'}
                </button>
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug mb-4">
                {q.text}
              </h3>

              {/* Diagram */}
              {q.diagramType && (
                <div className="my-4 bg-gradient-to-b from-amber-50/40 to-white p-3 rounded-2xl border border-amber-200 flex justify-center">
                  <DiagramRenderer type={q.diagramType} />
                </div>
              )}

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
                {q.options.map((opt) => {
                  const isSelected = studentChoice === opt.id;
                  const isCorrect = opt.id === q.correctAnswer;

                  let style = 'bg-slate-50 border border-slate-200 hover:border-amber-400 text-slate-800';

                  if (isRevealed) {
                    if (isCorrect) {
                      style = 'bg-emerald-100 border-2 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isSelected && !isCorrect) {
                      style = 'bg-rose-100 border-2 border-rose-500 text-rose-950 line-through';
                    }
                  } else if (isSelected) {
                    style = 'bg-amber-100 border-2 border-amber-500 text-amber-950 font-bold';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(q.id, opt.id, q.correctAnswer)}
                      className={`p-3 rounded-xl flex items-center gap-2.5 text-right font-bold text-xs sm:text-sm transition-all cursor-pointer ${style}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center font-black text-xs ${
                          isRevealed && isCorrect
                            ? 'bg-emerald-500 text-white'
                            : isSelected
                            ? 'bg-amber-500 text-amber-950'
                            : 'bg-white text-slate-700 border border-slate-300'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="flex-1">{opt.text}</span>
                      {isRevealed && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                      {isRevealed && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Dropdown */}
              {isRevealed && (
                <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950">
                  <div className="font-black text-amber-900 mb-1 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>الإجابة النموذجية المعتمدة: ({q.correctAnswer})</span>
                  </div>
                  <p className="font-semibold leading-relaxed text-slate-700">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-amber-300">
            <p className="text-slate-500 font-bold text-sm">
              لم يتم العثور على أسئلة تطابق بحثك. جرب كلمة بحث أخرى أو أزل التصفية.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
