import { StudentSubmission } from '../types';

const STORAGE_KEY = 'alrayyan_students_submissions_v2';

// Realistic sample submissions for Grade 8 at Al-Rayyan Private School
const DEFAULT_SUBMISSIONS: StudentSubmission[] = [
  {
    id: 'sub-001',
    studentName: 'سالم أكرم بوشوشة',
    section: 'الصف الثامن / 1',
    activityType: 'assessment',
    activityTitle: 'محاكاة التقييم الإلكتروني الشامل (الوحدة 1 و 2)',
    score: 310,
    maxScore: 320,
    percentage: 97,
    correctCount: 31,
    totalQuestions: 32,
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    formattedDate: 'اليوم، 10:20 ص',
    timeSpentMinutes: 18,
    status: 'ممتاز',
  },
  {
    id: 'sub-002',
    studentName: 'عبدالله محمد الكواري',
    section: 'الصف الثامن / 1',
    activityType: 'assessment',
    activityTitle: 'محاكاة التقييم الإلكتروني الشامل (الوحدة 1 و 2)',
    score: 300,
    maxScore: 320,
    percentage: 94,
    correctCount: 30,
    totalQuestions: 32,
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    formattedDate: 'اليوم، 09:15 ص',
    timeSpentMinutes: 21,
    status: 'ممتاز',
  },
  {
    id: 'sub-003',
    studentName: 'راشد خالد الهاجري',
    section: 'الصف الثامن / 2',
    activityType: 'assessment',
    activityTitle: 'محاكاة التقييم الإلكتروني الشامل (الوحدة 1 و 2)',
    score: 280,
    maxScore: 320,
    percentage: 88,
    correctCount: 28,
    totalQuestions: 32,
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    formattedDate: 'اليوم، 08:30 ص',
    timeSpentMinutes: 22,
    status: 'جيد جداً',
  },
  {
    id: 'sub-004',
    studentName: 'عمر أحمد المنصوري',
    section: 'الصف الثامن / 3',
    activityType: 'assessment',
    activityTitle: 'محاكاة التقييم الإلكتروني الشامل (الوحدة 1 و 2)',
    score: 320,
    maxScore: 320,
    percentage: 100,
    correctCount: 32,
    totalQuestions: 32,
    timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    formattedDate: 'اليوم، 08:00 ص',
    timeSpentMinutes: 16,
    status: 'ممتاز',
  },
  {
    id: 'sub-005',
    studentName: 'فهد ناصر المري',
    section: 'الصف الثامن / 1',
    activityType: 'adventure',
    activityTitle: 'لعبة التحدي العلمي (المراحل الأربعة)',
    score: 260,
    maxScore: 320,
    percentage: 81,
    correctCount: 26,
    totalQuestions: 32,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    formattedDate: 'أمس، 04:15 م',
    timeSpentMinutes: 25,
    status: 'جيد جداً',
  },
  {
    id: 'sub-006',
    studentName: 'حمد جاسم السليطي',
    section: 'الصف الثامن / 2',
    activityType: 'assessment',
    activityTitle: 'محاكاة التقييم الإلكتروني الشامل (الوحدة 1 و 2)',
    score: 290,
    maxScore: 320,
    percentage: 91,
    correctCount: 29,
    totalQuestions: 32,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    formattedDate: 'أمس، 02:45 م',
    timeSpentMinutes: 19,
    status: 'ممتاز',
  },
  {
    id: 'sub-007',
    studentName: 'يوسف إبراهيم فخرو',
    section: 'الصف الثامن / 3',
    activityType: 'assessment',
    activityTitle: 'محاكاة التقييم الإلكتروني الشامل (الوحدة 1 و 2)',
    score: 240,
    maxScore: 320,
    percentage: 75,
    correctCount: 24,
    totalQuestions: 32,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    formattedDate: 'منذ يومين، 11:10 ص',
    timeSpentMinutes: 24,
    status: 'جيد',
  },
];

export function getStoredSubmissions(): StudentSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SUBMISSIONS));
      return DEFAULT_SUBMISSIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_SUBMISSIONS;
  } catch (e) {
    console.error('Failed to load student submissions:', e);
    return DEFAULT_SUBMISSIONS;
  }
}

export function saveNewSubmission(
  subData: Omit<StudentSubmission, 'id' | 'timestamp' | 'formattedDate'>
): StudentSubmission {
  const current = getStoredSubmissions();
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat('ar-QA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(now);

  const newSubmission: StudentSubmission = {
    ...subData,
    id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    timestamp: now.toISOString(),
    formattedDate,
  };

  const updated = [newSubmission, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save student submission:', e);
  }

  return newSubmission;
}

export function deleteSubmission(id: string): StudentSubmission[] {
  const current = getStoredSubmissions();
  const filtered = current.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to delete submission:', e);
  }
  return filtered;
}

export function resetSubmissionsToDefault(): StudentSubmission[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SUBMISSIONS));
  } catch (e) {
    console.error('Failed to reset submissions:', e);
  }
  return DEFAULT_SUBMISSIONS;
}

export function clearAllSubmissions(): StudentSubmission[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (e) {
    console.error('Failed to clear submissions:', e);
  }
  return [];
}

export function exportSubmissionsToCSV(submissions: StudentSubmission[]): void {
  const headers = [
    'م',
    'اسم الطالب',
    'الصف والشعبة',
    'النشاط / الاختبار',
    'الدرجة المحققة',
    'الدرجة الكلية',
    'النسبة المئوية %',
    'عدد الأسئلة الصحيحة',
    'إجمالي الأسئلة',
    'التقدير العلمي',
    'تاريخ وتوقيت الحل',
  ];

  const rows = submissions.map((sub, idx) => [
    idx + 1,
    `"${(sub.studentName || '').replace(/"/g, '""')}"`,
    `"${(sub.section || '').replace(/"/g, '""')}"`,
    `"${(sub.activityTitle || '').replace(/"/g, '""')}"`,
    sub.score,
    sub.maxScore,
    `${sub.percentage}%`,
    sub.correctCount,
    sub.totalQuestions,
    `"${(sub.status || '').replace(/"/g, '""')}"`,
    `"${(sub.formattedDate || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent =
    '\uFEFF' +
    [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const dateStr = new Date().toISOString().slice(0, 10);
  link.setAttribute('download', `قائمة_الطلبة_الذين_حلوا_الاسئلة_مدرسة_الريان_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
