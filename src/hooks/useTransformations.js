import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { TRANSFORMATIONS as FALLBACK_TRANSFORMATIONS, WRITTEN_TESTIMONIALS as FALLBACK_TESTIMONIALS } from '../components/transformations/transformationsData';

export function useTransformations() {
  const [transformations, setTransformations] = useState(FALLBACK_TRANSFORMATIONS);
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransformationsData() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data: transData, error: transError } = await supabase
          .from('transformations')
          .select('*');

        const { data: testData, error: testError } = await supabase
          .from('testimonials')
          .select('*');

        if (transError) console.warn('Supabase transformations fetch notice:', transError.message);
        if (testError) console.warn('Supabase testimonials fetch notice:', testError.message);

        if (transData && transData.length > 0) {
          setTransformations(transData.map(item => ({
            id: item.id,
            name: item.name,
            goalType: item.goal_type || item.goalType,
            timeframeWeeks: item.timeframe_weeks || item.timeframeWeeks,
            quote: item.quote,
            fullStory: item.full_story || item.fullStory,
            startStat: item.start_stat || item.startStat,
            endStat: item.end_stat || item.endStat,
          })));
        }

        if (testData && testData.length > 0) {
          setTestimonials(testData.map(item => ({
            id: item.id,
            name: item.name,
            quote: item.quote,
          })));
        }
      } catch (err) {
        console.error('Error fetching transformations from Supabase:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTransformationsData();
  }, []);

  return { transformations, testimonials, loading, error };
}
