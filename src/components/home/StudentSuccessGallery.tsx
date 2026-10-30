import React, { useState } from 'react';
import { REAL_PHOTO_GALLERY, RealPhotoItem } from '../../data/mockData';
import { Award, ShieldCheck, Eye, X, Calendar, MapPin, ZoomIn, CheckCircle } from 'lucide-react';

export const StudentSuccessGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalPhoto, setActiveModalPhoto] = useState<RealPhotoItem | null>(null);

  const categories = [
    { id: 'all', label: 'جميع الصور الحقيقية' },
    { id: 'ceremony', label: 'حفلات التخرج والتكريم' },
    { id: 'certificate', label: 'شهادات الطلاب المعتمدة' },
    { id: 'lab', label: 'قاعات التدريب والمختبرات' },
    { id: 'kids', label: 'برامج الناشئة والشباب' },
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? REAL_PHOTO_GALLERY
    : REAL_PHOTO_GALLERY.filter(p => p.category === selectedCategory);

  return (
    <section className="py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-100 text-[#C62828] text-xs font-bold mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>معرض صور حقيقي 100% · قصص نجاح موثقة</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              شركاء النجاح وخريجو SmartTech
            </h2>
            <p className="mt-3 text-slate-600 text-base max-w-2xl leading-relaxed">
              لحظات حقيقية من حفلات تسليم الشهادات الدولية المعتمدة من Certiport وMicrosoft ومختبرات المركز التدريبي مع دكتورة شيماء العجمي.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>توثيق رسمي من مركز سمارت تك المنصورة</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
              {cat.id === 'all' && (
                <span className="mr-1.5 px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                  {REAL_PHOTO_GALLERY.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Responsive Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActiveModalPhoto(photo)}
              className="group relative bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              {/* Photo Frame */}
              <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="p-2 bg-white/90 rounded-full text-slate-800 shadow-sm">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>
                <div className="absolute top-2 right-2 bg-slate-900/70 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-mono">
                  {photo.id}
                </div>
              </div>

              {/* Caption Card */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs line-clamp-1 mb-1">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>{photo.location}</span>
                  </div>
                  <span>{photo.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Accreditation Banner Showcase */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xs">
          <div className="w-full md:w-1/3 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
            <img
              src="/assets/aistudio/507969552_1133338408840702_2352352951463986138_n_31c3f353.jpg"
              alt="بانر الاعتمادات الرسمية لمركز سمارت تك"
              className="w-full h-44 object-cover object-center"
            />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>مركز اختبارات دولي معتمد (Certiport Authorized Testing Center)</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              اعتمادات دولية في مكان واحد: MOS وICDL وبرمجة Python وAdobe
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
              يمكنك حضور التدريب أونلاين أو داخل مقر المركز بالمنصورة، والتقدم للاختبارات الدولية والحصول على شهادة معتمدة موثقة دولياً من شركة مايكروسوفت وسيرتيبورت.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                هاتف واستفسارات المقر: <span className="ltr-text font-mono font-bold text-slate-900">01227811948</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                المنصورة · شارع الجمهورية
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / High Res Image Modal */}
      {activeModalPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveModalPhoto(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-700 animate-in fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalPhoto(null)}
              className="absolute top-4 left-4 z-10 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[65vh] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={activeModalPhoto.src}
                alt={activeModalPhoto.title}
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#C62828] bg-red-50 px-2.5 py-1 rounded">
                  صورة أصلية موثقة · SmartTech Center
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activeModalPhoto.date}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {activeModalPhoto.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                {activeModalPhoto.caption}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {activeModalPhoto.location}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">
                  الملف المصدري: {activeModalPhoto.src.split('/').pop()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
