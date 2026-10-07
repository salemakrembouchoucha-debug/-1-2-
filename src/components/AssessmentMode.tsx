import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ALL_MCQS } from '../data/curriculumData';
import { StudentProfile } from '../types';
import { DiagramRenderer } from './DiagramRenderer';
import { CertificateModal } from './CertificateModal';
import {
  playSuccessSound,
  playVictorySound,
  playClickSound,
  playTimerTick,
} from '../utils/audio';
import {
  Clock,
  Bookmark,
  Send,
  RotateCcw,
  Award,
  ChevronRight,
  ChevronLeft,
  FileCheck,
  Sparkles,
} from 'lucide-react';

interface AssessmentModeProps {
  student: StudentProfile;
  onUpdateScore: (points: number) => void;
}

export const AssessmentMode: React.FC<AssessmentModeProps> = ({
  student,
  onUpdateScore,
}) => {
  // Test set: All 32 MCQs from both units
  const questions = ALL_MCQS;
  const totalQuestions = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // 25 minutes timer
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    if (isSubmitted || !isTimerRunning) return;

    if (totalSecondsLeft <= 0) {
      handleSubmitAssessment();
      return;
    }

    const interval = setInterval(() => {
      setTotalSecondsLeft((prev) => {
        if (prev <= 10 && prev > 1) {
          playTimerTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [totalSecondsLeft, isSubmitted, isTimerRunning]);

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (optId: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    playClickSound();
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optId,
    }));
  };

  const handleToggleFlag = (idx: number) => {
    playClickSound();
    setFlagged((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleClearAnswer = () => {
    if (isSubmitted) return;
    playClickSound();
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentIndex];
      return copy;
    });
  };

  const answeredCount = Object.keys(answers).length;

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmitAssessment = () => {
    setShowConfirmModal(false);
    setIsSubmitted(true);
    setIsTimerRunning(false);

    const correctCount = calculateScore();
    const finalScore = correctCount * 10;
    onUpdateScore(finalScore);

    playVictorySound();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleRestartTest = () => {
    setAnswers({});
    setFlagged({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setTotalSecondsLeft(25 * 60);
    setIsTimerRunning(true);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6" dir="rtl">
      {/* Assessment Header Bar */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 p-4 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            نظام التقييم الإلكتروني - قسم العلوم (مدرسة الريان الخاصة)
          </span>
          <h2 className="text-lg font-black text-slate-800">
            التقييم الشامل: الوحدة الأولى (طبيعة المادة ومكوناتها) وجزء من الوحدة الثانية (التغيرات الكيميائية)
          </h2>
          <div className="text-xs font-semibold text-slate-500 mt-0.5">
            الطالب: <span className="font-bold text-slate-800">{student.name}</span> | الشعبة: <span className="font-bold text-slate-800">{student.section}</span>
          </div>
        </div>

        {/* Timer Display */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-mono font-black text-sm border-2 ${
              totalSecondsLeft <= 300
                ? 'bg-rose-50 border-rose-400 text-rose-700 animate-pulse'
                : 'bg-amber-50 border-amber-400 text-amber-950'
            }`}
          >
            <Clock className="w-5 h-5 text-amber-700" />
            <span>الوقت المتبقي: {formatTimer(totalSecondsLeft)}</span>
          </div>

          {!isSubmitted && (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>تسليم التقييم</span>
            </button>
          )}
        </div>
      </div>

      {/* Results View if Submitted */}
      {isSubmitted && (
        <div className="bg-white rounded-3xl border-3 border-amber-400 p-6 sm:p-8 shadow-lg mb-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-3 shadow-xs">
            <Award className="w-10 h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-1">
            تم رصد نتيجة التقييم الإلكتروني بنجاح
          </h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
            مبارك يا بطل! أتممت التقييم الإلكتروني المعتمد لقسم العلوم بمدرسة الريان الخاصة.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 my-6">
            <div className="px-6 py-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-center">
              <span className="text-xs font-bold text-slate-500 block">الدرجة المستحقة</span>
              <span className="text-3xl font-black text-amber-950">{score} / {totalQuestions}</span>
            </div>
            <div className="px-6 py-4 rounded-2xl bg-amber-500 text-amber-950 text-center shadow-sm">
              <span className="text-xs font-bold text-amber-900 block">النسبة المئوية</span>
              <span className="text-3xl font-black">{percentage}%</span>
            </div>
            <div className="px-6 py-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center">
              <span className="text-xs font-bold text-emerald-800 block">التقدير العلمي</span>
              <span className="text-2xl font-black text-emerald-900">
                {percentage >= 85 ? 'ممتاز متفوق' : percentage >= 70 ? 'جيد جداً' : percentage >= 50 ? 'ناجح' : 'يحتاج مراجعة'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              id="view-certificate-btn"
              onClick={() => {
                playSuccessSound();
                setShowCertificate(true);
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-sm shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>عرض وطباعة شهادة التفوق</span>
            </button>
            <button
              onClick={handleRestartTest}
              className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة الاختبار</span>
            </button>
          </div>
        </div>
      )}

      {/* Grid: Navigator Sidebar (Left in Arabic / Order) & Main Question Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Palette / Navigator */}
        <div className="order-2 lg:order-1 bg-white rounded-2xl border-2 border-amber-300 p-4 shadow-xs h-fit">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200">
            <span className="font-extrabold text-sm text-slate-800">لوحة الأسئلة</span>
            <span className="text-xs font-bold text-slate-500">
              أجبت عن {answeredCount} من {totalQuestions}
            </span>
          </div>

          {/* Palette Grid */}
          <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-4 gap-1.5 max-h-[420px] overflow-y-auto p-1">
            {questions.map((q, idx) => {
              const isAnswered = answers[idx] !== undefined;
              const isFlagged = flagged[idx];
              const isCurrent = currentIndex === idx;

              let btnBg = 'bg-white border-slate-200 text-slate-700 hover:border-amber-400';

              if (isAnswered) {
                btnBg = 'bg-amber-200 border-amber-400 text-amber-950 font-bold';
              }

              if (isSubmitted) {
                if (answers[idx] === q.correctAnswer) {
                  btnBg = 'bg-emerald-500 border-emerald-600 text-white font-bold';
                } else {
                  btnBg = 'bg-rose-500 border-rose-600 text-white font-bold';
                }
              }

              if (isCurrent) {
                btnBg += ' ring-2 ring-amber-600 ring-offset-1 font-black';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    playClickSound();
                    setCurrentIndex(idx);
                  }}
                  className={`h-9 rounded-lg border text-xs flex items-center justify-center relative transition-all cursor-pointer ${btnBg}`}
                >
                  <span>{idx + 1}</span>
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border border-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-amber-200 text-[11px] space-y-1.5 text-slate-600 font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-amber-200 border border-amber-400 rounded-xs" />
              <span>تمت الإجابة</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-white border border-slate-300 rounded-xs" />
              <span>لم تتم الإجابة بعد</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-white border border-slate-300 rounded-xs relative">
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-500 rounded-full" />
              </span>
              <span>مميز للمراجعة</span>
            </div>
          </div>
        </div>

        {/* Main Question Display */}
        <div className="order-1 lg:order-2 lg:col-span-3 bg-white rounded-3xl border-3 border-amber-400 p-6 sm:p-8 shadow-md">
          {/* Question Meta Bar */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-200">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-500 text-amber-950 font-black text-xs rounded-lg">
                السؤال رقم {currentIndex + 1}
              </span>
              <span className="text-xs font-bold text-slate-500">
                {currentQ.unitTitle} (صفحة {currentQ.sourcePage})
              </span>
            </div>

            <button
              onClick={() => handleToggleFlag(currentIndex)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                flagged[currentIndex]
                  ? 'bg-orange-100 text-orange-800 border border-orange-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${flagged[currentIndex] ? 'fill-orange-600 text-orange-600' : ''}`} />
              <span>{flagged[currentIndex] ? 'تم التمييز' : 'تمييز للمراجعة'}</span>
            </button>
          </div>

          {/* Question Text */}
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-4">
            {currentQ.text}
          </h3>

          {/* Diagram render if present */}
          {currentQ.diagramType && (
            <div className="my-5 bg-gradient-to-b from-amber-50/40 to-white p-4 rounded-2xl border border-amber-200 flex justify-center">
              <DiagramRenderer type={currentQ.diagramType} />
            </div>
          )}

          {/* Multiple Choice Options */}
          <div className="space-y-3 my-6">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentIndex] === opt.id;
              const isCorrect = opt.id === currentQ.correctAnswer;

              let style = 'bg-white border-2 border-slate-200 hover:border-amber-400 text-slate-800';

              if (isSelected) {
                style = 'bg-amber-100 border-2 border-amber-500 text-amber-950 shadow-xs';
              }

              if (isSubmitted) {
                if (isCorrect) {
                  style = 'bg-emerald-100 border-2 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-100 border-2 border-rose-500 text-rose-950 line-through';
                } else {
                  style = 'bg-slate-50 border border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectAnswer(opt.id)}
                  disabled={isSubmitted}
                  className={`w-full p-4 rounded-2xl flex items-center gap-3 text-right font-bold text-sm sm:text-base transition-all cursor-pointer ${style}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 ${
                      isSelected ? 'bg-amber-500 text-amber-950' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {opt.id}
                  </div>
                  <span className="flex-1">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Review Model Answer (if submitted) */}
          {isSubmitted && (
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-xs text-amber-950 font-semibold mb-6">
              <div className="font-black text-amber-900 mb-1 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>نموذج الإجابة المعتمد:</span>
              </div>
              <p className="leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Bottom Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
                disabled={currentIndex === 0}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer ${
                  currentIndex === 0
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
                <span>السابق</span>
              </button>

              <button
                onClick={() => setCurrentIndex((idx) => Math.min(totalQuestions - 1, idx + 1))}
                disabled={currentIndex === totalQuestions - 1}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer ${
                  currentIndex === totalQuestions - 1
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>التالي</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {!isSubmitted && (
              <button
                onClick={handleClearAnswer}
                disabled={answers[currentIndex] === undefined}
                className="text-xs text-slate-500 hover:text-rose-600 font-bold px-3 py-1 cursor-pointer"
              >
                مسح اختياري لهذا السؤال
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal before Submit */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-4 border-amber-400 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mx-auto mb-4">
              <Send className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">تأكيد تسليم التقييم الإلكتروني</h3>
            <p className="text-slate-600 text-xs font-bold leading-relaxed mb-6">
              لقد قمت بالإجابة عن <span className="text-amber-800 font-black">{answeredCount}</span> من أصل{' '}
              <span className="text-slate-900 font-black">{totalQuestions}</span> سؤالاً.
              {answeredCount < totalQuestions && (
                <span className="block text-rose-600 mt-1 font-bold">
                  تنبيه: هناك {totalQuestions - answeredCount} أسئلة لم تقم بالإجابة عنها بعد!
                </span>
              )}
              هل أنت متأكد من رغبتك في إنهاء التقييم واحتساب النتيجة؟
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                العودة للأسئلة
              </button>
              <button
                onClick={handleSubmitAssessment}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs shadow-sm cursor-pointer"
              >
                نعم، تسليم الاختبار
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        student={student}
        score={score}
        totalQuestions={totalQuestions}
        percentage={percentage}
      />
    </div>
  );
};
