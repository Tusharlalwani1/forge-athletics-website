import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CLASS_TYPES as FALLBACK_CLASS_TYPES, TIMETABLE as FALLBACK_TIMETABLE } from '../components/classes/classesData';

export function useClasses() {
  const [classTypes, setClassTypes] = useState(FALLBACK_CLASS_TYPES);
  const [timetable, setTimetable] = useState(FALLBACK_TIMETABLE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClassesData() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch class types
        const { data: typesData, error: typesError } = await supabase
          .from('class_types')
          .select('*');

        // Fetch timetable slots
        const { data: timetableData, error: timetableError } = await supabase
          .from('timetable')
          .select('*');

        if (typesError) console.warn('Supabase class_types fetch notice:', typesError.message);
        if (timetableError) console.warn('Supabase timetable fetch notice:', timetableError.message);

        if (typesData && typesData.length > 0) {
          setClassTypes(typesData.map(item => ({
            id: item.id,
            name: item.name,
            description: item.description,
            duration: item.duration,
            difficulty: item.difficulty,
            iconName: item.icon_name || item.iconName,
          })));
        }

        if (timetableData && timetableData.length > 0) {
          setTimetable(timetableData.map(slot => ({
            id: slot.id,
            day: slot.day,
            startTime: slot.start_time || slot.startTime,
            durationMins: slot.duration_mins || slot.durationMins,
            classTypeId: slot.class_type_id || slot.classTypeId,
            coachName: slot.coach_name || slot.coachName,
            spotsTotal: slot.spots_total || slot.spotsTotal,
            spotsBooked: slot.spots_booked || slot.spotsBooked,
            status: slot.status,
            substituteNote: slot.substitute_note || slot.substituteNote,
          })));
        }
      } catch (err) {
        console.error('Error fetching classes from Supabase:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchClassesData();
  }, []);

  return { classTypes, timetable, loading, error };
}
