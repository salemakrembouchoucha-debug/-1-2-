import React from 'react';
import { AlrayyanLogo, QatarMoELogo } from './Logos';
import { Award, Printer, X, CheckCircle2, Star } from 'lucide-react';
import { StudentProfile } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentMinutes?: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  student,
  score,
  totalQuestions,
  percentage,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getEvaluationTitle = () => {
    if (percentage >= 90) return 'تفوق باهر وامتياز علمي مستحق';
    if (percentage >= 80) return 'إتقان علمي متميز جداً';
    if (percentage >= 70) return 'مستوى جيد جداً وجاهزية عالية';
    if (percentage >= 50) return 'اجتياز ناجح مع التوصية بالمراجعة';
    return 'محاولة شجاعة وبحاجة لتكثيف المراجعة';
  };

  const todayDate = new Intl.DateTimeFormat('ar-QA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-400">
        {/* Actions bar */}
        <div className="bg-amber-500 px-6 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-amber-950 font-black text-base">
            <Award className="w-6 h-6" />
            <span>شهادة اجتياز التقييم الإلكتروني في مادة العلوم</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-white rounded-xl text-slate-800 hover:bg-amber-100 font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-700" />
              <span>طباعة / حفظ PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-amber-600/30 hover:bg-amber-600/60 text-amber-950 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Content */}
        <div
          id="printable-certificate"
          className="p-8 sm:p-12 text-center bg-gradient-to-b from-amber-50/50 via-white to-yellow-50/40 relative select-none"
          dir="rtl"
        >
          {/* Certificate Decorative Border */}
          <div className="absolute inset-3 border-2 border-amber-300 rounded-2xl pointer-events-none" />
          <div className="absolute inset-5 border border-dashed border-amber-400/70 rounded-xl pointer-events-none" />

          {/* Top Names Row (No logos, names only) */}
          <div className="flex items-center justify-between gap-4 mb-6 border-b border-amber-200/80 pb-4">
            <QatarMoELogo variant="compact" />
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-amber-950 text-xs font-black">
                قسم العلوم - مدرسة الريان الخاصة
              </span>
            </div>
            <AlrayyanLogo variant="compact" />
          </div>

          {/* Certificate Heading */}
          <div className="my-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1 tracking-tight">
              شهادة تفـوق واجتيـاز إلكتروني
            </h2>
            <p className="text-sm font-bold text-amber-800">
              في المراجعة الشاملة للوحدتين الأولى والثانية - مادة العلوم (الصف الثامن)
            </p>
          </div>

          {/* Student Praise Text */}
          <p className="text-sm text-slate-600 mt-4 leading-relaxed">
            يشهد قسم العلوم بمدرسة الريان الخاصة بأن الطالب / الطالبة المتميز:
          </p>

          <div className="my-4 inline-block px-8 py-3 bg-amber-400/20 border-b-4 border-amber-500 rounded-2xl shadow-xs">
            <h3 className="text-2xl sm:text-3xl font-black text-amber-950 font-['Cairo',sans-serif]">
              {student.name}
            </h3>
            <span className="text-xs font-bold text-slate-600 block mt-1">
              {student.section}
            </span>
          </div>

          <p className="text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
            قد اجتاز بنجاح واقتدار محاكاة التقييم الإلكتروني في موضوعات:
            <span className="font-bold text-slate-900">
              {' '}(تطور النماذج الذرية، مكونات الذرة، العناصر والمركبات، تفاعلات التعادل والأكسدة والتفكك الحراري والاحتراق، والمعادلات الكيميائية اللفظية){' '}
            </span>
            بمعدل نجاح:
          </p>

          {/* Score & Stars Display */}
          <div className="flex items-center justify-center gap-6 my-5">
            <div className="px-6 py-2 rounded-2xl bg-amber-500 text-amber-950 font-black text-2xl shadow-sm border border-amber-600">
              {percentage}%
            </div>
            <div className="text-right">
              <div className="text-sm font-extrabold text-slate-800">
                النتيجة: {score} من {totalQuestions} درجة
              </div>
              <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>التقدير: {getEvaluationTitle()}</span>
              </div>
            </div>
          </div>

          {/* 5 Stars */}
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${i < Math.round((percentage / 100) * 5) ? 'fill-amber-400 text-amber-500' : 'text-slate-300'}`}
              />
            ))}
          </div>

          {/* Footer signatures & Date */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-200/80 text-xs">
            <div className="text-right">
              <div className="font-bold text-slate-600">تاريخ الإنجاز:</div>
              <div className="font-extrabold text-slate-900 mt-1">{todayDate}</div>
            </div>

            <div className="flex flex-col items-center justify-center">
              {/* Golden Stamp Badge */}
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-600 flex flex-col items-center justify-center bg-amber-100 text-amber-900 p-1">
                <span className="text-[9px] font-black leading-tight text-center">معتمد إلكترونياً</span>
                <span className="text-[8px] font-bold text-amber-700">قسم العلوم</span>
              </div>
            </div>

            <div className="text-left">
              <div className="font-bold text-slate-600">منسق مادة العلوم:</div>
              <div className="font-extrabold text-slate-900 mt-1">مدرسة الريان الخاصة</div>
              <div className="text-[10px] text-amber-800 font-medium">أخلاق • إنضباط • تفوق</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
