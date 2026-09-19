import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ALL_MCQS } from '../data/curriculumData';
import { MCQQuestion, StudentProfile } from '../types';
import { DiagramRenderer } from './DiagramRenderer';
import {
  playSuccessSound,
  playErrorSound,
  playVictorySound,
  playClickSound,
  playTimerTick,
} from '../utils/audio';
import {
  Zap,
  HelpCircle,
  Clock,
  RotateCcw,
  Sparkles,
  CheckCircle,
  XCircle,
  Flame,
  ArrowLeft,
  Trophy,
} from 'lucide-react';

interface AdventureModeProps {
  student: StudentProfile;
  onUpdateScore: (points: number) => void;
}

const STAGES = [
  {
    id: 1,
    title: 'المرحلة 1: أسرار النماذج الذرية',
    desc: 'اكتشافات دالتون، طومسون، رذرفورد، وبور',
    questionIndices: [0, 1, 2, 3, 4, 5],
  },
  {
    id: 2,
    title: 'المرحلة 2: مكونات الذرة ونماذج الجزيئات',
    desc: 'البروتونات، النيوترونات، الإلكترونات، جزيء الماء والأمونيا',
    questionIndices: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
  },
  {
    id: 3,
    title: 'المرحلة 3: دلائل التغيرات الكيميائية',
    desc: 'كربونات الكالسيوم، ماء الجير، تغير اللون والحرارة والضوء',
    questionIndices: [22, 23, 24, 25, 26, 27],
  },
  {
    id: 4,
    title: 'المرحلة 4: أنواع التفاعلات والمعادلات',
    desc: 'التعادل، الأكسدة، التفكك الحراري، والاحتراق',
    questionIndices: [28, 29, 30, 31],
  },
];

export const AdventureMode: React.FC<AdventureModeProps> = ({ onUpdateScore }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [stageQuestionIdx, setStageQuestionIdx] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<('A' | 'B' | 'C' | 'D')[]>([]);
  const [hintShown, setHintShown] = useState(false);
  const [stageComplete, setStageComplete] = useState(false);

  // Lifelines
  const [has5050, setHas5050] = useState(true);
  const [hasHint, setHasHint] = useState(true);
  const [hasExtraTime, setHasExtraTime] = useState(true);

  // Timer per question (30 seconds)
  const [timeLeft, setTimeLeft] = useState(35);
  const [timerActive, setTimerActive] = useState(true);

  const currentStage = STAGES[currentStageIdx];
  const currentQIndex = currentStage.questionIndices[stageQuestionIdx];
  const question: MCQQuestion = ALL_MCQS[currentQIndex];

  // Timer interval
  useEffect(() => {
    if (!timerActive || isAnswerChecked || stageComplete) return;

    if (timeLeft <= 0) {
      handleTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 6 && prev > 1) {
          playTimerTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, timerActive, isAnswerChecked, stageComplete]);

  const handleTimeOut = () => {
    setIsAnswerChecked(true);
    setStreak(0);
    playErrorSound();
  };

  const handleSelectOption = (optId: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswerChecked || eliminatedOptions.includes(optId)) return;
    playClickSound();
    setSelectedOption(optId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswerChecked) return;

    setIsAnswerChecked(true);
    const isCorrect = selectedOption === question.correctAnswer;

    if (isCorrect) {
      playSuccessSound();
      const newStreak = streak + 1;
      setStreak(newStreak);

      // Points calculation with streak bonus
      const basePoints = 20;
      const streakMultiplier = newStreak >= 5 ? 2.0 : newStreak >= 3 ? 1.5 : 1.0;
      const earned = Math.round(basePoints * streakMultiplier);
      onUpdateScore(earned);

      if (newStreak === 3 || newStreak === 5) {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.8 },
        });
      }
    } else {
      playErrorSound();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    playClickSound();
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setEliminatedOptions([]);
    setHintShown(false);
    setTimeLeft(35);

    if (stageQuestionIdx + 1 < currentStage.questionIndices.length) {
      setStageQuestionIdx((prev) => prev + 1);
    } else {
      // Stage completed!
      playVictorySound();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
      setStageComplete(true);
    }
  };

  const handleNextStage = () => {
    if (currentStageIdx + 1 < STAGES.length) {
      setCurrentStageIdx((prev) => prev + 1);
      setStageQuestionIdx(0);
      setStageComplete(false);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setEliminatedOptions([]);
      setHintShown(false);
      setTimeLeft(35);
    }
  };

  const handleRestartGame = () => {
    setCurrentStageIdx(0);
    setStageQuestionIdx(0);
    setStreak(0);
    setStageComplete(false);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setEliminatedOptions([]);
    setHintShown(false);
    setHas5050(true);
    setHasHint(true);
    setHasExtraTime(true);
    setTimeLeft(35);
  };

  // 50:50 Lifeline
  const handleUse5050 = () => {
    if (!has5050 || isAnswerChecked) return;
    playClickSound();
    setHas5050(false);
    const wrongOptions = question.options
      .map((o) => o.id)
      .filter((id) => id !== question.correctAnswer);
    // Shuffle and pick 2
    const toEliminate = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
    setEliminatedOptions(toEliminate);
  };

  // Hint Lifeline
  const handleUseHint = () => {
    if (!hasHint || isAnswerChecked) return;
    playClickSound();
    setHasHint(false);
    setHintShown(true);
  };

  // Extra Time Lifeline
  const handleUseExtraTime = () => {
    if (!hasExtraTime || isAnswerChecked) return;
    playClickSound();
    setHasExtraTime(false);
    setTimeLeft((prev) => prev + 30);
  };

  if (stageComplete) {
    const isFinalStage = currentStageIdx === STAGES.length - 1;
    return (
      <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-3xl border-4 border-amber-400 shadow-xl text-center" dir="rtl">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-amber-950 mb-4 shadow-md">
          <Trophy className="w-12 h-12 animate-bounce" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">
          {isFinalStage ? 'مبارك! أنهيت جميع مراحل التحدي بنجاح باهر!' : `أحسنت! أكملت ${currentStage.title}`}
        </h2>
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
          {isFinalStage
            ? 'لقد استوعبت جميع الأسئلة والمفاهيم المقررة في المرفقات، وأصبحت الآن مستعداً تماماً لاجتياز التقييم الإلكتروني لقسم العلوم بمدرسة الريان الخاصة!'
            : 'أظهرت تفوقاً وفهماً عميقاً، استمر في التقدم للمرحلة التالية لمواصلة حصد النقاط والجاهزية للاختبار.'}
        </p>

        <div className="flex items-center justify-center gap-3">
          {isFinalStage ? (
            <button
              onClick={handleRestartGame}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black rounded-2xl shadow-md transition-all cursor-pointer"
            >
              إعادة جولة التحدي
            </button>
          ) : (
            <button
              onClick={handleNextStage}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>الانتقال للمرحلة التالية</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6" dir="rtl">
      {/* Stage Progress Bar & Stats */}
      <div className="bg-white rounded-2xl p-4 border-2 border-amber-300 shadow-xs mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{currentStage.title}</span>
            </div>
            <h2 className="text-lg font-black text-slate-800">{currentStage.desc}</h2>
          </div>

          {/* Streak Counter & Multiplier */}
          <div className="flex items-center gap-4">
            {streak > 1 && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-100 border border-orange-300 rounded-full text-orange-800 font-black text-xs animate-pulse">
                <Flame className="w-4 h-4 text-orange-600" />
                <span>سلسلة تفوق x{streak >= 5 ? '2.0' : '1.5'} ({streak})</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar within Stage */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-amber-500 h-full transition-all duration-300 rounded-full"
            style={{
              width: `${((stageQuestionIdx + 1) / currentStage.questionIndices.length) * 100}%`,
            }}
          />
        </div>
        <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 mt-1.5">
          <span>السؤال {stageQuestionIdx + 1} من {currentStage.questionIndices.length} في هذه المرحلة</span>
          <span>صفحة المرفق: {question.sourcePage}</span>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border-3 border-amber-400 p-6 sm:p-8 shadow-lg relative overflow-hidden">
        {/* Timer Bar & Lifelines Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-amber-200">
          {/* Circular/Pill Timer */}
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-black text-xs transition-all ${
                timeLeft <= 7
                  ? 'bg-rose-100 text-rose-700 border-2 border-rose-400 animate-bounce'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>المؤقت: {timeLeft} ثانية</span>
            </div>
            <button
              onClick={() => setTimerActive((t) => !t)}
              className="text-[11px] font-bold text-slate-500 hover:text-amber-800 px-2 py-1 bg-slate-100 rounded-md cursor-pointer"
            >
              {timerActive ? 'إيقاف مؤقت' : 'استئناف'}
            </button>
          </div>

          {/* Lifelines Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleUse5050}
              disabled={!has5050 || isAnswerChecked}
              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${
                has5050 && !isAnswerChecked
                  ? 'bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-xs'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              title="حذف إجابتين غير صحيحتين"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>50 : 50</span>
            </button>

            <button
              onClick={handleUseHint}
              disabled={!hasHint || isAnswerChecked}
              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${
                hasHint && !isAnswerChecked
                  ? 'bg-yellow-300 hover:bg-yellow-400 text-amber-950 shadow-xs'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              title="تلميح علمي من المرفق"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>إضاءة علمية</span>
            </button>

            <button
              onClick={handleUseExtraTime}
              disabled={!hasExtraTime || isAnswerChecked}
              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${
                hasExtraTime && !isAnswerChecked
                  ? 'bg-amber-200 hover:bg-amber-300 text-amber-950 shadow-xs'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              title="زيادة 30 ثانية للوقت"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>+30 ث</span>
            </button>
          </div>
        </div>

        {/* Hint Callout if used */}
        {hintShown && (
          <div className="mb-5 p-3.5 rounded-2xl bg-yellow-50 border-2 border-yellow-300 text-amber-950 text-xs font-bold flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-black text-amber-800 block mb-0.5">تلميح من ملخص الدرس:</span>
              <span>{question.explanation}</span>
            </div>
          </div>
        )}

        {/* Question Text & Diagram */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-md bg-amber-100 text-amber-900 font-extrabold text-xs mb-3">
            سؤال رقم {question.questionNumber} - {question.unitTitle}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            {question.text}
          </h3>

          {/* Diagram render if applicable */}
          {question.diagramType && (
            <div className="my-5 bg-gradient-to-b from-amber-50/40 to-white p-4 rounded-2xl border border-amber-200 flex justify-center">
              <DiagramRenderer type={question.diagramType} />
            </div>
          )}
        </div>

        {/* MCQ Options List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {question.options.map((opt) => {
            const isEliminated = eliminatedOptions.includes(opt.id);
            const isSelected = selectedOption === opt.id;
            const isCorrect = opt.id === question.correctAnswer;

            let btnStyle = 'bg-white border-2 border-slate-200 hover:border-amber-400 text-slate-800';

            if (isSelected) {
              btnStyle = 'bg-amber-100 border-2 border-amber-500 text-amber-950 shadow-sm';
            }

            if (isAnswerChecked) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-100 border-2 border-emerald-500 text-emerald-950 font-bold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-100 border-2 border-rose-500 text-rose-950 line-through';
              } else {
                btnStyle = 'bg-slate-50 border border-slate-200 text-slate-400 opacity-60';
              }
            }

            if (isEliminated) {
              btnStyle = 'bg-slate-100 border border-slate-200 text-slate-300 line-through opacity-40 cursor-not-allowed';
            }

            return (
              <button
                key={opt.id}
                id={`mcq-option-${opt.id}`}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isAnswerChecked || isEliminated}
                className={`p-4 rounded-2xl flex items-center gap-3 text-right font-bold text-sm sm:text-base transition-all cursor-pointer ${btnStyle}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 ${
                    isAnswerChecked && isCorrect
                      ? 'bg-emerald-500 text-white'
                      : isAnswerChecked && isSelected && !isCorrect
                      ? 'bg-rose-500 text-white'
                      : isSelected
                      ? 'bg-amber-500 text-amber-950'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {opt.id}
                </div>
                <span className="flex-1">{opt.text}</span>

                {isAnswerChecked && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
                {isAnswerChecked && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Feedback Explanation Banner */}
        {isAnswerChecked && (
          <div
            className={`p-4 rounded-2xl mb-6 border-2 flex items-start gap-3 ${
              selectedOption === question.correctAnswer
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}
          >
            {selectedOption === question.correctAnswer ? (
              <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-black text-sm mb-1">
                {selectedOption === question.correctAnswer
                  ? 'إجابة صحيحة وممتازة! 🌟'
                  : `إجابة غير دقيقة - الإجابة النموذجية هي: (${question.correctAnswer})`}
              </div>
              <p className="text-xs font-semibold leading-relaxed opacity-90">{question.explanation}</p>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-3">
          <div className="text-xs font-bold text-slate-500">
            مدرسة الريان الخاصة • قسم العلوم
          </div>

          {!isAnswerChecked ? (
            <button
              id="submit-answer-btn"
              onClick={handleCheckAnswer}
              disabled={!selectedOption}
              className={`px-7 py-3 rounded-2xl font-black text-sm transition-all cursor-pointer ${
                selectedOption
                  ? 'bg-amber-500 hover:bg-amber-600 text-amber-950 shadow-md scale-102'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              تأكيد الإجابة
            </button>
          ) : (
            <button
              id="next-question-btn"
              onClick={handleNextQuestion}
              className="px-7 py-3 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>السؤال التالي</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
