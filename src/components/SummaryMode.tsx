import React from 'react';
import { SUMMARY_SHEETS } from '../data/curriculumData';
import {
  DaltonDiagram,
  ThomsonDiagram,
  RutherfordDiagram,
  BohrDiagram,
  HofmannVoltameterDiagram,
  BunsenHeatingDiagram,
  BananaColorChangeDiagram,
  MagnesiumBurningDiagram,
} from './Diagrams';
import { BookOpen, Sparkles, CheckCircle2, FlaskConical, Atom } from 'lucide-react';

export const SummaryMode: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6" dir="rtl">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 p-5 shadow-xs mb-8 text-center sm:text-right flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5 justify-center sm:justify-start">
            <Sparkles className="w-4 h-4 text-amber-600" />
            أوراق المراجعة الذهبية والشاملة (صفحة 1 وصفحة 9 من المرفقات)
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">
            ملخص المفاهيم والتجارب العلمية المقررة للاختبار الإلكتروني
          </h2>
          <p className="text-slate-600 text-xs font-bold mt-1">
            قسم العلوم - مدرسة الريان الخاصة • منهج العلوم المعتمد لدولة قطر (الصف الثامن)
          </p>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center flex-shrink-0 shadow-xs">
          <BookOpen className="w-7 h-7" />
        </div>
      </div>

      {/* Section 1: Atomic Models Timeline (Page 1 in PDF) */}
      <div className="bg-white rounded-3xl border-3 border-amber-400 p-6 sm:p-8 shadow-md mb-8">
        <div className="flex items-center gap-2 mb-2 pb-3 border-b border-amber-200">
          <Atom className="w-6 h-6 text-amber-600" />
          <h3 className="text-xl font-black text-slate-900">
            أولاً: تطور النماذج الذرية (صفحة 1 بالكتاب / ص 8-9)
          </h3>
        </div>

        <p className="text-xs font-bold text-slate-600 mb-6">
          تطورت فكرة بنية الذرة عبر التاريخ بفضل تجارب واكتشافات أربعة من أبرز العلماء:
        </p>

        {/* 4 Models Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Dalton */}
          <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <span className="px-3 py-1 bg-amber-500 text-amber-950 rounded-full font-black text-xs mb-2">
              1803 م
            </span>
            <DaltonDiagram size={100} />
            <h4 className="font-black text-slate-900 text-base mt-2">جون دالتون</h4>
            <p className="text-xs font-semibold text-slate-700 mt-1 leading-relaxed">
              الذرة عبارة عن <span className="font-black text-amber-900">كرة صلبة مصمتة</span> غير قابلة للتجزئة.
            </p>
          </div>

          {/* Thomson */}
          <div className="bg-yellow-50/80 border-2 border-yellow-300 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <span className="px-3 py-1 bg-yellow-400 text-yellow-950 rounded-full font-black text-xs mb-2">
              1897 م
            </span>
            <ThomsonDiagram size={100} />
            <h4 className="font-black text-slate-900 text-base mt-2">طومسون</h4>
            <p className="text-xs font-semibold text-slate-700 mt-1 leading-relaxed">
              الذرة كرة <span className="font-black text-yellow-900">موجبة الشحنة</span> مطمور بداخلها جسيمات سالبة الشحنة (إلكترونات).
            </p>
          </div>

          {/* Rutherford */}
          <div className="bg-orange-50/80 border-2 border-orange-300 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <span className="px-3 py-1 bg-orange-400 text-orange-950 rounded-full font-black text-xs mb-2">
              1911 م
            </span>
            <RutherfordDiagram size={105} />
            <h4 className="font-black text-slate-900 text-base mt-2">رذرفورد</h4>
            <p className="text-xs font-semibold text-slate-700 mt-1 leading-relaxed">
              الذرة <span className="font-black text-orange-950">معظمها فراغ</span>، ومعظم كتلتها تتركز في نواة مركزية موجبة تدور حولها الإلكترونات.
            </p>
          </div>

          {/* Bohr */}
          <div className="bg-lime-50/80 border-2 border-lime-300 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <span className="px-3 py-1 bg-lime-500 text-lime-950 rounded-full font-black text-xs mb-2">
              1913 م
            </span>
            <BohrDiagram size={100} />
            <h4 className="font-black text-slate-900 text-base mt-2">نيلز بور</h4>
            <p className="text-xs font-semibold text-slate-700 mt-1 leading-relaxed">
              تدور الإلكترونات حول النواة في <span className="font-black text-lime-950">مستويات طاقة محددة (مدارات)</span>.
            </p>
          </div>
        </div>

        {/* Elements & Compounds concept (Page 1) */}
        <div className="bg-amber-100/50 rounded-2xl p-5 border border-amber-300">
          <h4 className="font-black text-slate-900 text-sm mb-3">
            تصنيف المادة: العناصر والمركبات (صفحة 1 بالمرفق)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-800">
            <div className="bg-white p-4 rounded-xl border border-amber-300">
              <span className="font-black text-amber-900 text-sm block mb-1">العنصر (Element)</span>
              <p className="text-slate-600 leading-relaxed">
                يتكون العنصر من <span className="text-slate-900 font-bold">نوع واحد فقط</span> من الذرات المتماثلة التي ترتبط ببعضها بروابط كيميائية.
              </p>
              <div className="mt-2 text-[11px] text-amber-800 font-mono">
                أمثلة: الأكسجين (O₂)، المغنيسيوم (Mg).
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-amber-300">
              <span className="font-black text-amber-900 text-sm block mb-1">المركب (Compound)</span>
              <p className="text-slate-600 leading-relaxed">
                يتكون المركب من اتحاد كيميائي بين <span className="text-slate-900 font-bold">ذرات عنصرين مختلفين أو أكثر</span> بنسب وزنية ثابتة.
              </p>
              <div className="mt-2 text-[11px] text-amber-800 font-mono">
                أمثلة: أكسيد المغنيسيوم (MgO)، الماء (H₂O).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Chemical Changes & Reaction Types (Page 9 in PDF) */}
      <div className="bg-white rounded-3xl border-3 border-amber-400 p-6 sm:p-8 shadow-md mb-8">
        <div className="flex items-center gap-2 mb-2 pb-3 border-b border-amber-200">
          <FlaskConical className="w-6 h-6 text-amber-600" />
          <h3 className="text-xl font-black text-slate-900">
            ثانياً: دلائل حدوث التفاعل الكيميائي (صفحة 9 بالمرفق)
          </h3>
        </div>

        <p className="text-xs font-bold text-slate-700 mb-5">
          كيف تعرف حدوث تفاعل كيميائي بين المواد؟ من خلال الأدلة التي تلاحظها على تكوّن مادة جديدة (نواتج):
        </p>

        {/* 5 Evidence Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {[
            { id: 1, title: 'تكون راسب', desc: 'ظهور مادة صلبة في المحلول', icon: '🧪' },
            { id: 2, title: 'تصاعد غاز', desc: 'فقاعات غازية (مثل CO2)', icon: '💨' },
            { id: 3, title: 'انبعاث حرارة', desc: 'ارتفاع درجة حرارة التفاعل', icon: '🔥' },
            { id: 4, title: 'انبعاث ضوء', desc: 'شعلة أو وميض ساطع', icon: '💡' },
            { id: 5, title: 'تغير اللون', desc: 'اسوداد الموز أو صدأ العملات', icon: '🍌' },
          ].map((ev) => (
            <div
              key={ev.id}
              className="p-3.5 bg-amber-50/70 border border-amber-300 rounded-2xl text-center shadow-2xs hover:scale-102 transition-transform"
            >
              <span className="text-2xl mb-1 block">{ev.icon}</span>
              <h5 className="font-black text-slate-900 text-xs sm:text-sm">{ev.title}</h5>
              <p className="text-[11px] font-semibold text-slate-600 mt-0.5">{ev.desc}</p>
            </div>
          ))}
        </div>

        {/* 4 Types of Chemical Reactions */}
        <h4 className="font-black text-slate-900 text-base mb-3">
          أنواع التفاعلات الكيميائية الأربعة المعتمدة:
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Neutralization */}
          <div className="bg-blue-50/70 border-2 border-blue-300 rounded-2xl p-4">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-500 text-white font-black text-xs inline-block mb-1">
              تفاعل التعادل
            </span>
            <h5 className="font-black text-blue-950 text-sm mt-1">حمض + قاعدة ⟶ ملح + ماء</h5>
            <p className="text-xs font-semibold text-blue-900/90 mt-1 leading-relaxed">
              تفاعل يحدث بين حمض وقاعدة لتكوين ملح وماء.
              <br />
              <span className="font-bold">أمثلة:</span> معجون الأسنان لمعادلة حموضة الفم، وتفاعل حمض الهيدروكلوريك مع هيدروكسيد الصوديوم لإنتاج كلوريد الصوديوم والماء.
            </p>
          </div>

          {/* Oxidation */}
          <div className="bg-amber-50/70 border-2 border-amber-400 rounded-2xl p-4">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-amber-950 font-black text-xs inline-block mb-1">
              تفاعل الأكسدة
            </span>
            <h5 className="font-black text-amber-950 text-sm mt-1">مادة + أكسجين ⟶ أكسيد المادة</h5>
            <p className="text-xs font-semibold text-amber-900/90 mt-1 leading-relaxed">
              تفاعل يحدث عندما تتحد مادة مع الأكسجين.
              <br />
              <span className="font-bold">أمثلة:</span> صدأ العملات المعدنية، أكسدة النحاس، واحتراق شريط المغنيسيوم لإنتاج أكسيد المغنيسيوم.
            </p>
          </div>

          {/* Combustion */}
          <div className="bg-red-50/70 border-2 border-red-300 rounded-2xl p-4">
            <span className="px-2.5 py-0.5 rounded-md bg-red-500 text-white font-black text-xs inline-block mb-1">
              تفاعل الاحتراق
            </span>
            <h5 className="font-black text-red-950 text-sm mt-1">وقود + أكسجين + حرارة ⟶ طاقة + نواتج</h5>
            <p className="text-xs font-semibold text-red-900/90 mt-1 leading-relaxed">
              احتراق المادة القابلة للاشتعال بتفاعلها مع الأكسجين في وجود طاقة حرارية مع انبعاث ضوء وحرارة.
              <br />
              <span className="font-bold">أمثلة:</span> حرق الخشب، حرق الورق، اشتعال غاز الهيدروجين، واحتراق غاز الميثان.
            </p>
          </div>

          {/* Thermal Decomposition */}
          <div className="bg-orange-50/70 border-2 border-orange-400 rounded-2xl p-4">
            <span className="px-2.5 py-0.5 rounded-md bg-orange-500 text-white font-black text-xs inline-block mb-1">
              تفاعل التفكك الحراري
            </span>
            <h5 className="font-black text-orange-950 text-sm mt-1">مادة واحدة ──(حرارة)──⟶ مادتين أو أكثر</h5>
            <p className="text-xs font-semibold text-orange-900/90 mt-1 leading-relaxed">
              تفاعل يحدث حين تتفكك مادة واحدة إلى مادتين أو أكثر عند تسخينها.
              <br />
              <span className="font-bold">أمثلة:</span> تسخين كربونات الكالسيوم لتحضير الجير السريع، وتسخين كربونات النحاس وكربونات المغنيسيوم.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Visual Laboratory Demonstrations */}
      <div className="bg-white rounded-3xl border-3 border-amber-400 p-6 sm:p-8 shadow-md">
        <h3 className="text-lg font-black text-slate-900 mb-4 pb-2 border-b border-amber-200">
          تجارب ورسوم المختبر المعتمدة في الامتحان
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-300 text-center">
            <HofmannVoltameterDiagram size={130} />
            <span className="text-[11px] font-extrabold text-slate-700 block mt-1">
              تحليل الماء: هيدروجين + أكسجين (H₂O)
            </span>
          </div>

          <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-300 text-center">
            <BunsenHeatingDiagram size={135} />
            <span className="text-[11px] font-extrabold text-slate-700 block mt-1">
              تسخين كربونات الكالسيوم يعكر ماء الجير (A)
            </span>
          </div>

          <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-300 text-center">
            <BananaColorChangeDiagram size={120} />
            <span className="text-[11px] font-extrabold text-slate-700 block mt-1">
              تغير لون الموز: دليل تغير كيميائي
            </span>
          </div>

          <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-300 text-center">
            <MagnesiumBurningDiagram size={120} />
            <span className="text-[11px] font-extrabold text-slate-700 block mt-1">
              شريط المغنيسيوم: أكسدة وانبعاث ضوء
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
