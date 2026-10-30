import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { LearningJourneySection } from '../components/home/LearningJourneySection';
import { FeaturedCoursesSection } from '../components/home/FeaturedCoursesSection';
import { ExcelLabPreviewSection } from '../components/home/ExcelLabPreviewSection';
import { StudentSuccessGallery } from '../components/home/StudentSuccessGallery';
import { InstructorBioSection } from '../components/home/InstructorBioSection';
import { CorporateTrainingSection } from '../components/home/CorporateTrainingSection';
import { FAQSection } from '../components/home/FAQSection';

export const HomeView: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <LearningJourneySection />
      <FeaturedCoursesSection />
      <ExcelLabPreviewSection />
      <StudentSuccessGallery />
      <InstructorBioSection />
      <CorporateTrainingSection />
      <FAQSection />
    </div>
  );
};
