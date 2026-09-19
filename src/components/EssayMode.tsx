import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ESSAY_QUESTIONS } from '../data/curriculumData';
import { EssayQuestion } from '../types';
import { DiagramRenderer } from './DiagramRenderer';
import { playSuccessSound, playVictorySound, playClickSound } from '../utils/audio';
import {
  FileText,
  Sparkles,
  CheckCircle,
  Eye,
  Award,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface EssayModeProps {
  onUpdateScore: (points: number) => void;
}

export const EssayMode: React.FC<EssayModeProps> = ({ onUpdateScore }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [evaluatedQuestions, setEvaluatedQuestions] = useState<Record<string, boolean>>({});

  const essay: EssayQuestion = ESSAY_QUESTIONS[currentIdx];

  const handleInputChange = (subId: string, value: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [subId]: value,
    }));
  };

  const handleToggleReveal = (subId: string) => {
    playClickSound();
    setRevealedAnswers((prev) => ({
      ...prev,
      [subId]: !prev[subId],
    }));
  };

  const handleRevealAllForQuestion = () => {
    playClickSound();
    const updated: Record<string, boolean> = { ...revealedAnswers };
    essay.subQuestions.forEach((sq) => {
      updated[sq.id] = true;
    });
    setRevealedAnswers(updated);
  };

  const handleEvaluateSubQuestion = (subId: string) => {
    const sq = essay.subQuestions.find((s) => s.id === subId);
    if (!sq) return;

    const studentInput = (userAnswers[subId] || '').trim().toLowerCase();
    if (!studentInput) {
      alert('يرجى كتابة إجابتك أولاً في الخانة المخصصة!');
      return;
    }

    // Check if input matches correct answer or accepted keywords
    const isKeywordMatch = sq.acceptedKeywords?.some((kw) =>
      studentInput.includes(kw.toLowerCase())
    );
    const isExactMatch = studentInput === sq.correctAnswer.trim().toLowerCase();

    setEvaluatedQuestions((prev) => ({ ...prev, [subId]: true }));
    // Also reveal model answer
    setRevealedAnswers((prev) => ({ ...prev, [subId]: true }));

    if (isKeywordMatch || isExactMatch) {
      playSuccessSound();
      onUpdateScore(15);
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.8 },
      });
    } else {
      playSuccessSound(); // encouraging sound
      onUpdateScore(5); // partial credit for effort
    }
  };

  // Complete table/card question for the elements Na, Li, Ca from Page 7
  const isTableQuestion = currentIdx === 2; // Can show dedicated table UI

  return (
    <div className="max-w-5xl mx-auto px-4 py-6" dir="rtl">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 p-4 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            قسم الأسئلة المقالية وإكمال الجداول والمعادلات اللفظية
          </span>
          <h2 className="text-xl font-black text-slate-800">{essay.title}</h2>
          <div className="text-xs font-semibold text-slate-500 mt-0.5">
            {essay.unitTitle} • ورقة الاختبار الرسمية: صفحة {essay.sourcePage}
          </div>
        </div>

        {/* Question Selector Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            disabled={currentIdx === 0}
            className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 cursor-pointer ${
              currentIdx === 0
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : 'bg-white hover:bg-amber-100 border-amber-300 text-slate-800'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span>السابق</span>
          </button>

          <span className="text-xs font-black px-3 py-1.5 bg-amber-100 text-amber-950 rounded-xl border border-amber-300">
            {currentIdx + 1} / {ESSAY_QUESTIONS.length}
          </span>

          <button
            onClick={() => setCurrentIdx((i) => Math.min(ESSAY_QUESTIONS.length - 1, i + 1))}
            disabled={currentIdx === ESSAY_QUESTIONS.length - 1}
            className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 cursor-pointer ${
              currentIdx === ESSAY_QUESTIONS.length - 1
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600 text-amber-950 border-amber-600'
            }`}
          >
            <span>التالي</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Question Container */}
      <div className="bg-white rounded-3xl border-3 border-amber-400 p-6 sm:p-8 shadow-lg">
        {/* Scenario & Diagram */}
        <div className="mb-6 border-b border-amber-200 pb-5">
          {essay.scenario && (
            <p className="text-base sm:text-lg font-bold text-slate-800 mb-4 leading-relaxed bg-amber-50/60 p-4 rounded-2xl border border-amber-300/80">
              {essay.scenario}
            </p>
          )}

          {essay.diagramType && (
            <div className="my-4 bg-gradient-to-b from-amber-50/40 to-white p-4 rounded-2xl border border-amber-200 flex justify-center">
              <DiagramRenderer type={essay.diagramType} />
            </div>
          )}

          {/* Table display for Na, Li, Ca if relevant */}
          {essay.id === 'essay_elements_molecules' && (
            <div className="my-4 overflow-x-auto">
              <span className="text-xs font-bold text-slate-600 mb-2 block">
                جدول مقارنة الأعداد الذرية والبروتونات والإلكترونات (صفحة 7 بالمرفق):
              </span>
              <table className="w-full text-right border-collapse border-2 border-amber-300 rounded-xl text-xs sm:text-sm">
                <thead>
                  <tr className="bg-amber-200/80 text-amber-950 font-black">
                    <th className="p-2.5 border border-amber-300">العنصر</th>
                    <th className="p-2.5 border border-amber-300">العدد الذري</th>
                    <th className="p-2.5 border border-amber-300">عدد البروتونات</th>
                    <th className="p-2.5 border border-amber-300">عدد الإلكترونات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-200 font-bold text-slate-800">
                  <tr className="hover:bg-amber-50">
                    <td className="p-2.5 border border-amber-200 font-mono">Na (الصوديوم)</td>
                    <td className="p-2.5 border border-amber-200 font-mono">11</td>
                    <td className="p-2.5 border border-amber-200 font-mono text-emerald-700 bg-emerald-50">11</td>
                    <td className="p-2.5 border border-amber-200 font-mono text-emerald-700 bg-emerald-50">11</td>
                  </tr>
                  <tr className="hover:bg-amber-50">
                    <td className="p-2.5 border border-amber-200 font-mono">Li (الليثيوم)</td>
                    <td className="p-2.5 border border-amber-200 font-mono text-emerald-700 bg-emerald-50">3</td>
                    <td className="p-2.5 border border-amber-200 font-mono">3</td>
                    <td className="p-2.5 border border-amber-200 font-mono text-emerald-700 bg-emerald-50">3</td>
                  </tr>
                  <tr className="hover:bg-amber-50">
                    <td className="p-2.5 border border-amber-200 font-mono">Ca (الكالسيوم)</td>
                    <td className="p-2.5 border border-amber-200 font-mono">20</td>
                    <td className="p-2.5 border border-amber-200 font-mono text-emerald-700 bg-emerald-50">20</td>
                    <td className="p-2.5 border border-amber-200 font-mono">20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-end mt-2">
            <button
              onClick={handleRevealAllForQuestion}
              className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1.5 px-3 py-1 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-amber-700" />
              <span>عرض جميع الإجابات النموذجية لهذا السؤال</span>
            </button>
          </div>
        </div>

        {/* Sub-questions List */}
        <div className="space-y-6">
          {essay.subQuestions.map((sq, idx) => {
            const isRevealed = revealedAnswers[sq.id];
            const isEvaluated = evaluatedQuestions[sq.id];
            const studentInput = userAnswers[sq.id] || '';

            return (
              <div
                key={sq.id}
                className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border-2 border-slate-200 hover:border-amber-300 transition-all"
              >
                {/* Prompt */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-amber-950 flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                    {sq.subNumber || idx + 1}
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                    {sq.prompt}
                  </h4>
                </div>

                {/* Input row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={studentInput}
                      onChange={(e) => handleInputChange(sq.id, e.target.value)}
                      placeholder="اكتب إجابتك هنا..."
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:outline-hidden text-sm font-bold text-slate-800 bg-white shadow-xs"
                    />
                  </div>

                  <button
                    onClick={() => handleEvaluateSubQuestion(sq.id)}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>تحقق</span>
                  </button>

                  <button
                    onClick={() => handleToggleReveal(sq.id)}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-slate-500" />
                    <span>{isRevealed ? 'إخفاء النموذج' : 'النموذج الرسمي'}</span>
                  </button>
                </div>

                {/* Model Answer Drawer */}
                {isRevealed && (
                  <div className="mt-3 p-4 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 animate-fadeIn">
                    <div className="flex items-center gap-1.5 font-black text-xs text-emerald-800 mb-1">
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span>الإجابة النموذجية المعتمدة (باللون الأخضر في أوراق المدرسة):</span>
                    </div>
                    <div className="text-base font-black text-emerald-900 py-1 font-mono">
                      {sq.correctAnswer}
                    </div>
                    {sq.explanation && (
                      <p className="text-xs font-semibold text-emerald-800/90 mt-1">
                        الشرح والتوضيح: {sq.explanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-500">
            مدرسة الريان الخاصة • بنك الأسئلة المقالية
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
              disabled={currentIdx === 0}
              className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                currentIdx === 0 ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              السؤال المقالي السابق
            </button>
            <button
              onClick={() => setCurrentIdx((i) => Math.min(ESSAY_QUESTIONS.length - 1, i + 1))}
              disabled={currentIdx === ESSAY_QUESTIONS.length - 1}
              className={`px-5 py-2 rounded-xl text-xs font-black cursor-pointer ${
                currentIdx === ESSAY_QUESTIONS.length - 1
                  ? 'bg-slate-100 text-slate-400'
                  : 'bg-amber-500 hover:bg-amber-600 text-amber-950'
              }`}
            >
              السؤال المقالي التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
