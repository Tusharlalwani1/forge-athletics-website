import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useTransformations } from '../hooks/useTransformations';
import TransformationFilterBar from '../components/transformations/TransformationFilterBar';
import TransformationGrid from '../components/transformations/TransformationGrid';
import TransformationDetailModal from '../components/transformations/TransformationDetailModal';
import WrittenTestimonials from '../components/transformations/WrittenTestimonials';
import { useTrialModal } from '../components/TrialForm/useTrialModal';
import { fadeUp } from '../lib/motion';

export default function Transformations() {
  const { transformations, testimonials } = useTransformations();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openTrialModal } = useTrialModal();

  const filteredTransformations = useMemo(() => {
    const list = transformations || [];
    if (activeFilter === 'all') return list;
    return list.filter((t) => t.goalType === activeFilter);
  }, [activeFilter, transformations]);

  const handleSelectEntry = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-charcoal text-chalk flex flex-col">
      {/* 1. Hero Header — consistent with Classes, Membership, Coaches */}
      <section className="relative border-b border-charcoal-line bg-charcoal-raised py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-charcoal-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-charcoal-line) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blaze">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" /> Real Results
          </span>
          <h1 className="text-display mt-2 text-4xl sm:text-6xl lg:text-7xl text-chalk">
            MEMBER <span className="text-blaze">TRANSFORMATIONS</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-steel leading-relaxed">
            Specific results from real Forge members — not stock photos, not invented stories.
            Photos are pending member consent as per our privacy policy; stories are real.
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-7xl w-full px-4 py-12 sm:px-6 lg:px-8 flex-1">
        {/* 2. Filter Bar */}
        <TransformationFilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* 3. Transformation Grid */}
        <TransformationGrid
          transformations={filteredTransformations}
          onSelectEntry={handleSelectEntry}
        />

        {/* 5. Written Testimonials */}
        <WrittenTestimonials />
      </main>

      {/* 6. Bottom CTA Band */}
      <section className="relative overflow-hidden border-t border-charcoal-line bg-charcoal-raised">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-charcoal-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-charcoal-line) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-blaze">
            Your story starts here
          </span>
          <h2 className="text-display mt-2 text-3xl text-chalk sm:text-4xl lg:text-5xl">
            YOUR TRANSFORMATION <span className="text-blaze">STARTS HERE.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-steel sm:text-base">
            Every result on this page started with the same first step — claiming a free trial
            class and showing up. The rest is coaching.
          </p>
          <motion.button
            type="button"
            onClick={openTrialModal}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 inline-flex items-center gap-2 bg-blaze px-8 py-4 text-sm font-bold uppercase tracking-wide text-chalk shadow-lg shadow-blaze/20 transition-colors hover:bg-blaze-dim focus-visible:outline-none cursor-pointer"
          >
            Claim Your Free Class →
          </motion.button>
        </motion.div>
      </section>

      {/* 4. Detail Modal — page-level singleton */}
      <TransformationDetailModal
        entry={selectedEntry}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
