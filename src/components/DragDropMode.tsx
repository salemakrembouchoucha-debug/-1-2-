import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { DRAG_DROP_ACTIVITIES } from '../data/curriculumData';
import { DragDropActivity, DragItem } from '../types';
import { playSuccessSound, playErrorSound, playVictorySound, playClickSound } from '../utils/audio';
import { CheckCircle2, RotateCcw, Sparkles, Award, ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';

interface DragDropModeProps {
  onUpdateScore: (points: number) => void;
}

export const DragDropMode: React.FC<DragDropModeProps> = ({ onUpdateScore }) => {
  const [currentActivityIdx, setCurrentActivityIdx] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, string>>({}); // itemId -> categoryId
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [activityScores, setActivityScores] = useState<Record<number, number>>({});

  const activity: DragDropActivity = DRAG_DROP_ACTIVITIES[currentActivityIdx];

  // Unplaced items
  const unplacedItems = activity.items.filter((item) => !placements[item.id]);

  // Handle Drag Start
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
  };

  // Handle Drag Over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle Drop into category
  const handleDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId) {
      placeItem(itemId, categoryId);
    }
  };

  // Place item function (works for drag or tap)
  const placeItem = (itemId: string, categoryId: string) => {
    if (isEvaluated) return;
    playClickSound();
    setPlacements((prev) => ({
      ...prev,
      [itemId]: categoryId,
    }));
    setSelectedItemId(null);
  };

  // Click on unplaced item to select for tap-to-place
  const handleTapItem = (itemId: string) => {
    if (isEvaluated) return;
    playClickSound();
    setSelectedItemId((prev) => (prev === itemId ? null : itemId));
  };

  // Click on category container to place selected item
  const handleTapCategory = (categoryId: string) => {
    if (selectedItemId) {
      placeItem(selectedItemId, categoryId);
    }
  };

  // Remove an item back to the pool
  const handleRemoveFromCategory = (itemId: string) => {
    if (isEvaluated) return;
    playClickSound();
    setPlacements((prev) => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
  };

  // Check answers
  const handleEvaluate = () => {
    if (Object.keys(placements).length < activity.items.length) {
      alert('يرجى تصنيف جميع العناصر قبل التحقق!');
      return;
    }

    setIsEvaluated(true);
    let correctCount = 0;
    activity.items.forEach((item) => {
      if (placements[item.id] === item.category) {
        correctCount += 1;
      }
    });

    const isAllCorrect = correctCount === activity.items.length;
    if (isAllCorrect) {
      playVictorySound();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });
      const points = correctCount * 15;
      onUpdateScore(points);
      setActivityScores((prev) => ({ ...prev, [currentActivityIdx]: points }));
    } else {
      playErrorSound();
      const points = correctCount * 8;
      onUpdateScore(points);
      setActivityScores((prev) => ({ ...prev, [currentActivityIdx]: points }));
    }
  };

  const handleResetCurrent = () => {
    playClickSound();
    setPlacements({});
    setIsEvaluated(false);
    setSelectedItemId(null);
  };

  const handleNextActivity = () => {
    playClickSound();
    if (currentActivityIdx + 1 < DRAG_DROP_ACTIVITIES.length) {
      setCurrentActivityIdx((prev) => prev + 1);
      setPlacements({});
      setIsEvaluated(false);
      setSelectedItemId(null);
    }
  };

  const handlePrevActivity = () => {
    playClickSound();
    if (currentActivityIdx > 0) {
      setCurrentActivityIdx((prev) => prev - 1);
      setPlacements({});
      setIsEvaluated(false);
      setSelectedItemId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6" dir="rtl">
      {/* Activity Navigation Selector */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 p-4 shadow-xs mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div>
            <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              أنشطة السحب والإدراج والتصنيف التفاعلية
            </span>
            <h2 className="text-xl font-black text-slate-800">{activity.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevActivity}
              disabled={currentActivityIdx === 0}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 cursor-pointer ${
                currentActivityIdx === 0
                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  : 'bg-white hover:bg-amber-100 border-amber-300 text-slate-800'
              }`}
            >
              <ArrowRight className="w-4 h-4" />
              <span>النشاط السابق</span>
            </button>

            <button
              onClick={handleNextActivity}
              disabled={currentActivityIdx === DRAG_DROP_ACTIVITIES.length - 1}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 cursor-pointer ${
                currentActivityIdx === DRAG_DROP_ACTIVITIES.length - 1
                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-600 text-amber-950 border-amber-600'
              }`}
            >
              <span>النشاط التالي</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Instructions & Tip */}
        <div className="bg-amber-50/70 border border-amber-300/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-950 font-semibold">
          <HelpCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-black text-amber-900">{activity.instructions} </span>
            <span className="text-slate-600">
              (يمكنك سحب العنصر وإسقاطه في الصندوق، أو النقر على العنصر أولاً ثم النقر على الصندوق المخصص لتسهيل العمل على الشاشات اللمسية والأجهزة اللوحية).
            </span>
          </div>
        </div>
      </div>

      {/* Main Sorting Arena */}
      <div className="bg-white rounded-3xl border-3 border-amber-400 p-6 sm:p-8 shadow-lg">
        {/* Pool of Available (Unplaced) Items */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="font-extrabold text-sm text-slate-800">
              العناصر المتاحة للتصنيف ({unplacedItems.length} متبقية):
            </span>
            {selectedItemId && (
              <span className="text-xs font-bold text-amber-700 animate-pulse">
                العنصر محدد - انقر الآن على الصندوق المراد وضعه فيه ⬇️
              </span>
            )}
          </div>

          <div className="min-h-[90px] p-4 bg-gradient-to-b from-amber-50/50 to-white border-2 border-dashed border-amber-300 rounded-2xl flex flex-wrap gap-2.5 items-center justify-center">
            {unplacedItems.length === 0 ? (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                تم إدراج جميع العناصر في الصناديق بنجاح! اضغط على &quot;التحقق من صحة التصنيف&quot; بالأسفل.
              </span>
            ) : (
              unplacedItems.map((item) => {
                const isSelected = selectedItemId === item.id;
                return (
                  <div
                    key={item.id}
                    draggable={!isEvaluated}
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onClick={() => handleTapItem(item.id)}
                    className={`px-4 py-2 rounded-xl border-2 font-bold text-sm shadow-xs transition-all select-none cursor-grab active:cursor-grabbing ${
                      isSelected
                        ? 'bg-amber-400 border-amber-600 text-amber-950 scale-105 ring-2 ring-amber-500'
                        : 'bg-white hover:bg-amber-100/60 border-slate-300 text-slate-800 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-black text-amber-950">{item.label}</span>
                      {item.formula && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-sans">
                          {item.formula}
                        </span>
                      )}
                    </div>
                    {item.subLabel && (
                      <div className="text-[10px] text-slate-500 mt-0.5 font-normal">{item.subLabel}</div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Categories Drop Zones Grid */}
        <div className={`grid grid-cols-1 ${activity.categories.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'} gap-4 mb-8`}>
          {activity.categories.map((cat) => {
            const itemsInCat = activity.items.filter((item) => placements[item.id] === cat.id);

            return (
              <div
                key={cat.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, cat.id)}
                onClick={() => handleTapCategory(cat.id)}
                className={`rounded-2xl border-2 p-4 transition-all min-h-[220px] flex flex-col justify-between cursor-pointer ${cat.color} ${
                  selectedItemId ? 'ring-2 ring-amber-400 ring-offset-2' : ''
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-current/20 pb-2 mb-3">
                    <h3 className="font-black text-base">{cat.label}</h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/80 border border-current/20">
                      {itemsInCat.length}
                    </span>
                  </div>
                  {cat.description && (
                    <p className="text-[11px] font-medium opacity-85 mb-3">{cat.description}</p>
                  )}

                  {/* Items placed inside category */}
                  <div className="space-y-2">
                    {itemsInCat.map((item) => {
                      const isCorrect = item.category === cat.id;

                      let itemStyle = 'bg-white text-slate-800 border border-slate-300';
                      if (isEvaluated) {
                        itemStyle = isCorrect
                          ? 'bg-emerald-100 border-2 border-emerald-500 text-emerald-950 font-bold'
                          : 'bg-rose-100 border-2 border-rose-500 text-rose-950 line-through';
                      }

                      return (
                        <div
                          key={item.id}
                          className={`p-2.5 rounded-xl text-xs flex items-center justify-between shadow-xs transition-all ${itemStyle}`}
                        >
                          <div>
                            <span className="font-extrabold">{item.label}</span>
                            {item.formula && (
                              <span className="mr-1.5 text-[10px] text-slate-600 font-sans">
                                ({item.formula})
                              </span>
                            )}
                          </div>

                          {!isEvaluated ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFromCategory(item.id);
                              }}
                              className="text-slate-400 hover:text-rose-600 text-xs px-1.5 py-0.5 rounded-md hover:bg-slate-100 cursor-pointer"
                              title="إلغاء وضع هذا العنصر"
                            >
                              ✕
                            </button>
                          ) : (
                            <span>{isCorrect ? '✅' : '❌'}</span>
                          )}
                        </div>
                      );
                    })}

                    {itemsInCat.length === 0 && (
                      <div className="h-28 flex items-center justify-center border border-dashed border-current/30 rounded-xl text-xs font-bold opacity-60">
                        اسحب العناصر أو انقر هنا للوضع
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Evaluation Banner */}
        {isEvaluated && (
          <div className="p-4 rounded-2xl mb-6 bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 border-2 border-amber-400 text-center text-amber-950">
            <div className="flex items-center justify-center gap-2 font-black text-base mb-1">
              <Award className="w-5 h-5 text-amber-700" />
              <span>تم التقييم ورصد النقاط للنشاط!</span>
            </div>
            <p className="text-xs font-bold text-slate-700">
              راجع العناصر الخضراء (الصحيحة) وتأكد من موضع العناصر الحمراء وفق ما ورد بأوراق المراجعة الرسمية.
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={handleResetCurrent}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة تعيين النشاط</span>
          </button>

          {!isEvaluated ? (
            <button
              id="evaluate-drag-drop-btn"
              onClick={handleEvaluate}
              disabled={Object.keys(placements).length === 0}
              className={`px-7 py-2.5 rounded-2xl font-black text-sm shadow-md transition-all cursor-pointer ${
                Object.keys(placements).length > 0
                  ? 'bg-amber-500 hover:bg-amber-600 text-amber-950 scale-102'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              التحقق من صحة التصنيف
            </button>
          ) : (
            <button
              onClick={handleNextActivity}
              disabled={currentActivityIdx === DRAG_DROP_ACTIVITIES.length - 1}
              className="px-7 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-sm shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>الانتقال للنشاط التالي</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
