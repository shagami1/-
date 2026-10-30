import React from 'react';
import { INSTRUCTOR_PROFILE, REAL_PHOTO_GALLERY } from '../data/mockData';
import { Award, GraduationCap, Building2, Phone, MapPin, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Section */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold text-red-400 bg-red-600/20 px-3 py-1 rounded inline-block mb-3 border border-red-500/30">
                من نحن · رحلة التميز والاحتراف
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                احترف ببساطة مع دكتورة شيماء
              </h1>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                منصة تعليمية متكاملة تقدم أحدث مناهج تحليل البيانات، وإتقان برامج إكسيل المتقدمة، وعلوم البرمجة التطبيقية، مدعومة بخبرة 15 عاماً من التدريب الاحترافي في مصر والوطن العربي تحت مظلة مركز SmartTech Training Center بالمنصورة.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-500" />
                  <span>الاتصال المباشر: <b className="text-white font-mono ltr-text">01227811948</b></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>مقر المركز: المنصورة · مصر</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>مركز اختبارات Certiport معتمد</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-red-500/40 shadow-2xl w-64 h-80 sm:w-72 sm:h-96">
                <img
                  src={INSTRUCTOR_PROFILE.photoFull}
                  alt={INSTRUCTOR_PROFILE.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Credentials & Methodology */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#C62828]" />
              <span>السيرة المهنية والأكاديمية</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
              {INSTRUCTOR_PROFILE.bio}
            </p>

            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              الاعتمادات والرخص الدولية
            </h4>
            <div className="space-y-2.5">
              {INSTRUCTOR_PROFILE.credentials.map((cred, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{cred}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#C62828]" />
              <span>عن مركز SmartTech Training Center</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
              تأسس مركز سمارت تك ليكون منارة تعليمية في قلب الدلتا، وتطور ليصبح من أبرز مراكز الاختبارات والتدريب المعتمدة دولياً. يتميز المركز بقاعات حاسب آلي متطورة، وشبكة اختبارات مؤمنة، ومناهج معتمدة تؤهل الطلاب والكوادر لاجتياز الشهادات العالمية بأعلى النسب.
            </p>

            <div className="rounded-xl overflow-hidden border border-slate-200 mb-4">
              <img
                src="/assets/aistudio/507969552_1133338408840702_2352352951463986138_n_31c3f353.jpg"
                alt="بانر مركز سمارت تك"
                className="w-full h-40 object-cover"
              />
            </div>

            <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs text-slate-700">
              <b>العنوان الرسمي والتواصل:</b> المنصورة، جمهورية مصر العربية. للاستعلام والتسجيل في الاختبارات الدولية: <b>01227811948</b>
            </div>
          </div>
        </div>

        {/* Real Classroom & Ceremony Photo Showcase */}
        <div>
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#C62828] bg-red-50 px-3 py-1 rounded inline-block mb-2">
              توثيق مرئي حقيقي
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              أجواء التدريب والتكريم داخل المركز
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {REAL_PHOTO_GALLERY.slice(0, 8).map((photo) => (
              <div
                key={photo.id}
                className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs group"
              >
                <div className="aspect-4/3 bg-slate-100 overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-slate-900 text-xs truncate">{photo.title}</h4>
                  <div className="text-[11px] text-slate-500 mt-1">{photo.location} · {photo.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
