import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { COACHES as FALLBACK_COACHES, ALL_SPECIALTIES as FALLBACK_SPECIALTIES } from '../components/coaches/coachesData';

export function useCoaches() {
  const [coaches, setCoaches] = useState(FALLBACK_COACHES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCoachesData() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: fetchErr } = await supabase
          .from('coaches')
          .select('*');

        if (fetchErr) console.warn('Supabase coaches fetch notice:', fetchErr.message);

        if (data && data.length > 0) {
          setCoaches(data.map(item => ({
            id: item.id,
            name: item.name,
            role: item.role,
            initials: item.initials,
            specialties: item.specialties || [],
            certifications: item.certifications || [],
            bio: item.bio,
            fullBio: item.full_bio || item.fullBio,
            philosophy: item.philosophy,
            instagramHandle: item.instagram_handle || item.instagramHandle,
            classTypeIds: item.class_type_ids || item.classTypeIds || [],
          })));
        }
      } catch (err) {
        console.error('Error fetching coaches from Supabase:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCoachesData();
  }, []);

  const specialties = useMemo(() => {
    if (!coaches || coaches.length === 0) return FALLBACK_SPECIALTIES;
    return [...new Set(coaches.flatMap((c) => c.specialties || []))].sort();
  }, [coaches]);

  return { coaches, specialties, loading, error };
}
