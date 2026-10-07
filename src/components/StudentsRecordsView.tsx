import React, { useState } from 'react';
import { StudentSubmission, StudentProfile } from '../types';
import {
  exportSubmissionsToCSV,
  deleteSubmission,
  resetSubmissionsToDefault,
  clearAllSubmissions,
  saveNewSubmission,
} from '../utils/studentStorage';
import {
  Users,
  Search,
  Download,
  Printer,
  Copy,
  Plus,
  Trash2,
  Eye,
  Award,
  CheckCircle,
  FileSpreadsheet,
  AlertCircle,
  TrendingUp,
  GraduationCap,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
  Check,
} from 'lucide-react';
import { CertificateModal } from './CertificateModal';

interface StudentsRecordsViewProps {
  submissions: StudentSubmission[];
  onRefreshSubmissions: () => void;
  onNavigateToAssessment: () => void;
}

export const StudentsRecordsView: React.FC<StudentsRecordsViewProps> = ({
  submissions,
  onRefreshSubmissions,
  onNavigateToAssessment,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState('all');
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [inspectStudent, setInspectStudent] = useState<StudentSubmission | null>(null);
  const [certStudent, setCertStudent] = useState<StudentSubmission | null>(null);

  // New Student Manual Entry Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSection, setNewSection] = useState('الصف الثامن / 1');
  const [newScore, setNewScore] = useState(300);
  const [newTotal, setNewTotal] = useState(320);
  const [newActivity, setNewActivity] = useState('محاكاة التقييم الإلكتروني الشامل (الوحدة 1 و 2)');

  // Filter submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.section.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection =
      selectedSection === 'all' || sub.section === selectedSection;
    const matchesActivity =
      selectedActivity === 'all' ||
      (selectedActivity === 'assessment' && sub.activityType === 'assessment') ||
      (selectedActivity === 'adventure' && sub.activityType === 'adventure');
    return matchesSearch && matchesSection && matchesActivity;
  });

  // Unique sections list
  const availableSections = Array.from(
    new Set(submissions.map((s) => s.section).filter(Boolean))
  );

  // Stats calculation
  const totalStudents = submissions.length;
  const avgPercentage =
    totalStudents > 0
      ? Math.round(
          submissions.reduce((acc, curr) => acc + curr.percentage, 0) /
            totalStudents
        )
      : 0;
  const highestScore =
    totalStudents > 0
      ? Math.max(...submissions.map((s) => s.percentage))
      : 0;
  const excellentCount = submissions.filter((s) => s.percentage >= 90).length;

  const handleExportCSV = () => {
    exportSubmissionsToCSV(filteredSubmissions);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyTable = () => {
    const textRows = [
      'م\tاسم الطالب\tالصف والشعبة\tالنشاط\tالدرجة\tالنسبة %\tالتقدير\tتاريخ الحل',
      ...filteredSubmissions.map(
        (s, i) =>
          `${i + 1}\t${s.studentName}\t${s.section}\t${s.activityTitle}\t${s.score}/${s.maxScore}\t${s.percentage}%\t${s.status}\t${s.formattedDate}`
      ),
    ].join('\n');

    navigator.clipboard.writeText(textRows).then(() => {
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من حذف سجل الطالب "${name}"؟`)) {
      deleteSubmission(id);
      onRefreshSubmissions();
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('هل تريد استعادة القائمة النموذجية للطلبة؟')) {
      resetSubmissionsToDefault();
      onRefreshSubmissions();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('تحذير: هل أنت متأكد من مسح جميع سجلات الطلبة؟')) {
      clearAllSubmissions();
      onRefreshSubmissions();
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const percentage = Math.round((newScore / newTotal) * 100);
    let status: StudentSubmission['status'] = 'ممتاز';
    if (percentage < 50) status = 'بحاجة لمتابعة';
    else if (percentage < 70) status = 'مقبول';
    else if (percentage < 80) status = 'جيد';
    else if (percentage < 90) status = 'جيد جداً';

    saveNewSubmission({
      studentName: newName.trim(),
      section: newSection,
      activityType: 'assessment',
      activityTitle: newActivity,
      score: newScore,
      maxScore: newTotal,
      percentage,
      correctCount: Math.round(newScore / 10),
      totalQuestions: Math.round(newTotal / 10),
      status,
      timeSpentMinutes: 20,
    });

    onRefreshSubmissions();
    setShowAddModal(false);
    setNewName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6" dir="rtl">
      {/* Top Title & Header */}
      <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 shadow-sm mb-6 print:border-none print:shadow-none print:p-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200/80 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-amber-800 mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>مدرسة الريان الخاصة • قسم العلوم (الصف الثامن)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
              <Users className="w-7 h-7 text-amber-600 inline" />
              قائمة وسجل الطلبة الذين قاموا بحل الأسئلة
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              كشف درجات التقييم الإلكتروني وأنشطة مراجعة العلوم المعتمدة لمناهج دولة قطر
            </p>
          </div>

          {/* Quick Action Tools */}
          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
              title="تصدير النتائج إلى ملف Excel / CSV"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>تصدير إلى Excel (CSV)</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
              title="طباعة التقرير"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة التقرير</span>
            </button>

            <button
              onClick={handleCopyTable}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
              title="نسخ بيانات الجدول للحافظة"
            >
              {copiedSuccess ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSuccess ? 'تم النسخ!' : 'نسخ القائمة'}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold text-xs border border-amber-300 transition-colors cursor-pointer"
              title="إضافة درجة طالب يدوياً"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة طالب</span>
            </button>
          </div>
        </div>

        {/* Dashboard Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 print:grid-cols-4">
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-amber-800 mb-1">
              <span className="text-xs font-bold">إجمالي الطلبة</span>
              <Users className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-amber-950">{totalStudents}</div>
            <div className="text-[10px] text-amber-700 font-semibold">قاموا بحل الأسئلة</div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-emerald-800 mb-1">
              <span className="text-xs font-bold">متوسط الدرجات</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-950">{avgPercentage}%</div>
            <div className="text-[10px] text-emerald-700 font-semibold">المستوى العام للصف الثامن</div>
          </div>

          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-blue-800 mb-1">
              <span className="text-xs font-bold">أعلى نتيجة</span>
              <Award className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-blue-950">{highestScore}%</div>
            <div className="text-[10px] text-blue-700 font-semibold">الدرجة القصوى المحققة</div>
          </div>

          <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-purple-800 mb-1">
              <span className="text-xs font-bold">المتفوقون (90%+)</span>
              <GraduationCap className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-purple-950">{excellentCount}</div>
            <div className="text-[10px] text-purple-700 font-semibold">طالباً بتصنيف ممتاز</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-amber-200 p-4 shadow-2xs mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="البحث باسم الطالب أو الشعبة..."
              className="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:border-amber-400 focus:outline-hidden"
            />
          </div>

          {/* Section Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600">الشعبة:</span>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="all">جميع الشُّعب</option>
              {availableSections.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          {/* Activity Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600">النشاط:</span>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="all">جميع الأنشطة</option>
              <option value="assessment">التقييم الإلكتروني الشامل</option>
              <option value="adventure">لعبة التحدي العلمي</option>
            </select>
          </div>
        </div>

        {/* Reset / Clear links */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={handleResetToDefault}
            className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 cursor-pointer"
            title="استعادة قائمة الطلبة النموذجية"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>استعادة النموذج</span>
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={handleClearAll}
            className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
            title="تفريغ السجلات"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>تفريغ السجل</span>
          </button>
        </div>
      </div>

      {/* Main Students Table */}
      <div className="bg-white rounded-3xl border-2 border-amber-300 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-amber-100/80 border-b border-amber-300 text-amber-950 text-xs font-black">
                <th className="py-3.5 px-4 text-center w-12">#</th>
                <th className="py-3.5 px-4">اسم الطالب</th>
                <th className="py-3.5 px-4">الصف والشعبة</th>
                <th className="py-3.5 px-4">نوع الاختبار / النشاط</th>
                <th className="py-3.5 px-4 text-center">الدرجة</th>
                <th className="py-3.5 px-4 text-center">النسبة المئوية</th>
                <th className="py-3.5 px-4 text-center">التقدير</th>
                <th className="py-3.5 px-4">تاريخ ووقت الحل</th>
                <th className="py-3.5 px-4 text-center print:hidden">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <div className="font-bold text-sm">لا توجد نتائج مطابقة للبحث أو التصفية</div>
                    <p className="text-xs text-slate-400 mt-1">
                      يمكنك خوض التقييم الإلكتروني الآن لتسجيل أول اسم في القائمة!
                    </p>
                    <button
                      onClick={onNavigateToAssessment}
                      className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 rounded-xl font-black text-xs cursor-pointer shadow-xs"
                    >
                      بدء التقييم الإلكتروني الآن 📝
                    </button>
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub, index) => {
                  let badgeColor =
                    sub.percentage >= 90
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : sub.percentage >= 80
                      ? 'bg-blue-100 text-blue-800 border-blue-300'
                      : sub.percentage >= 70
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-rose-100 text-rose-800 border-rose-300';

                  return (
                    <tr
                      key={sub.id}
                      className="hover:bg-amber-50/50 transition-colors border-b border-slate-100"
                    >
                      <td className="py-3.5 px-4 text-center text-slate-400 font-bold text-xs">
                        {index + 1}
                      </td>

                      <td className="py-3.5 px-4 font-black text-slate-900">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-xs flex-shrink-0">
                            {sub.studentName.charAt(0)}
                          </div>
                          <span>{sub.studentName}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-800 font-bold">
                        <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs">
                          {sub.section}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 text-xs font-bold">
                        {sub.activityTitle}
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900">
                        {sub.score} <span className="text-slate-400 font-normal">/ {sub.maxScore}</span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-mono font-black text-sm text-slate-900">
                            {sub.percentage}%
                          </span>
                          <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                sub.percentage >= 90
                                  ? 'bg-emerald-500'
                                  : sub.percentage >= 80
                                  ? 'bg-blue-500'
                                  : sub.percentage >= 70
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${sub.percentage}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-black border ${badgeColor}`}
                        >
                          {sub.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-slate-500 font-semibold whitespace-nowrap">
                        {sub.formattedDate}
                      </td>

                      <td className="py-3.5 px-4 text-center print:hidden">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Print Certificate for this student */}
                          <button
                            onClick={() => setCertStudent(sub)}
                            className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors cursor-pointer"
                            title="إصدار وطباعة شهادة الطالب"
                          >
                            <Award className="w-4 h-4 text-amber-700" />
                          </button>

                          {/* Inspect Details */}
                          {sub.details && sub.details.length > 0 && (
                            <button
                              onClick={() => setInspectStudent(sub)}
                              className="p-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-900 transition-colors cursor-pointer"
                              title="عرض تفاصيل إجابات الطالب"
                            >
                              <Eye className="w-4 h-4 text-blue-700" />
                            </button>
                          )}

                          {/* Delete row */}
                          <button
                            onClick={() => handleDelete(sub.id, sub.studentName)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                            title="حذف هذا السجل"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-amber-50/50 border-t border-amber-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-600">
          <div>
            عرض <span className="font-black text-amber-950">{filteredSubmissions.length}</span> من أصل{' '}
            <span className="font-black text-amber-950">{submissions.length}</span> طالب مسجل
          </div>
          <div className="text-amber-900 font-black">
            قسم العلوم • مدرسة الريان الخاصة • دولة قطر
          </div>
        </div>
      </div>

      {/* Manual Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg border-2 border-amber-400 shadow-xl" dir="rtl">
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-600" />
              إضافة نتيجة طالب يدوياً إلى السجل
            </h3>
            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">اسم الطالب الرباعي:</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="مثال: ناصر سالم الهاجري"
                  className="w-full px-3 py-2 border-2 border-amber-300 rounded-xl font-bold text-slate-900 focus:outline-hidden focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">الصف والشعبة:</label>
                  <select
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-amber-300 rounded-xl font-bold text-slate-900 focus:outline-hidden"
                  >
                    <option value="الصف الثامن / 1">الصف الثامن / 1</option>
                    <option value="الصف الثامن / 2">الصف الثامن / 2</option>
                    <option value="الصف الثامن / 3">الصف الثامن / 3</option>
                    <option value="الصف الثامن / 4">الصف الثامن / 4</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">النشاط:</label>
                  <select
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-amber-300 rounded-xl font-bold text-slate-900 focus:outline-hidden"
                  >
                    <option value="محاكاة التقييم الإلكتروني الشامل (الوحدة 1 و 2)">
                      محاكاة التقييم الإلكتروني الشامل
                    </option>
                    <option value="لعبة التحدي العلمي (المراحل الأربعة)">
                      لعبة التحدي العلمي
                    </option>
                    <option value="بنك أسئلة الاختيار من متعدد">
                      بنك أسئلة الاختيار من متعدد
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">الدرجة المحققة:</label>
                  <input
                    type="number"
                    value={newScore}
                    onChange={(e) => setNewScore(Number(e.target.value))}
                    className="w-full px-3 py-2 border-2 border-amber-300 rounded-xl font-bold text-slate-900 focus:outline-hidden"
                    min={0}
                    max={newTotal}
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">الدرجة الكلية:</label>
                  <input
                    type="number"
                    value={newTotal}
                    onChange={(e) => setNewTotal(Number(e.target.value))}
                    className="w-full px-3 py-2 border-2 border-amber-300 rounded-xl font-bold text-slate-900 focus:outline-hidden"
                    min={10}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-black cursor-pointer shadow-sm"
                >
                  إضافة وحفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Student Answers Breakdown Modal */}
      {inspectStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-2xl max-h-[85vh] flex flex-col border-2 border-amber-400 shadow-xl" dir="rtl">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  تفاصيل إجابات الطالب: {inspectStudent.studentName}
                </h3>
                <div className="text-xs text-slate-600 font-bold">
                  {inspectStudent.section} • الدرجة: {inspectStudent.score}/{inspectStudent.maxScore} ({inspectStudent.percentage}%)
                </div>
              </div>
              <button
                onClick={() => setInspectStudent(null)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs cursor-pointer"
              >
                إغلاق
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {inspectStudent.details && inspectStudent.details.length > 0 ? (
                inspectStudent.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border ${
                      detail.isCorrect
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : 'bg-rose-50/70 border-rose-200 text-rose-950'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span>السؤال {detail.questionNumber || idx + 1}: {detail.questionText}</span>
                      <span className="font-black">
                        {detail.isCorrect ? '✅ صحيحة' : '❌ خاطئة'}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-700">
                      إجابة الطالب: <span className="font-bold">{detail.studentAnswer}</span> | الإجابة النموذجية: <span className="font-bold text-emerald-800">{detail.correctAnswer}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-500 font-bold">
                  لا توجد تفاصيل تفكيكية مسجلة لهذا الاختبار
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal for Student from Table */}
      {certStudent && (
        <CertificateModal
          isOpen={true}
          onClose={() => setCertStudent(null)}
          student={{
            name: certStudent.studentName,
            section: certStudent.section,
            score: certStudent.score,
          }}
          score={certStudent.correctCount}
          totalQuestions={certStudent.totalQuestions}
          percentage={certStudent.percentage}
        />
      )}
    </div>
  );
};
