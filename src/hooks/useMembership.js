import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { TIERS as FALLBACK_TIERS, ADD_ONS as FALLBACK_ADD_ONS, FAQS as FALLBACK_FAQS } from '../components/membership/membershipData';

export function useMembership() {
  const [tiers, setTiers] = useState(FALLBACK_TIERS);
  const [addOns, setAddOns] = useState(FALLBACK_ADD_ONS);
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMembershipData() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data: tiersData, error: tiersError } = await supabase
          .from('membership_tiers')
          .select('*');

        const { data: addOnsData, error: addOnsError } = await supabase
          .from('add_ons')
          .select('*');

        const { data: faqsData, error: faqsError } = await supabase
          .from('faqs')
          .select('*');

        if (tiersError) console.warn('Supabase membership_tiers fetch notice:', tiersError.message);
        if (addOnsError) console.warn('Supabase add_ons fetch notice:', addOnsError.message);
        if (faqsError) console.warn('Supabase faqs fetch notice:', faqsError.message);

        if (tiersData && tiersData.length > 0) {
          setTiers(tiersData.map(t => ({
            id: t.id,
            name: t.name,
            tagline: t.tagline,
            monthlyPrice: t.monthly_price ?? t.monthlyPrice,
            annualPrice: t.annual_price ?? t.annualPrice,
            period: t.period,
            isPerClass: t.is_per_class ?? t.isPerClass,
            featured: t.featured,
            badgeText: t.badge_text ?? t.badgeText,
            ctaText: t.cta_text ?? t.ctaText,
            features: t.features || [],
          })));
        }

        if (addOnsData && addOnsData.length > 0) {
          setAddOns(addOnsData.map(a => ({
            id: a.id,
            name: a.name,
            price: a.price,
            period: a.period,
            description: a.description,
            iconName: a.icon_name || a.iconName,
          })));
        }

        if (faqsData && faqsData.length > 0) {
          setFaqs(faqsData.map(f => ({
            id: f.id,
            question: f.question,
            answer: f.answer,
          })));
        }
      } catch (err) {
        console.error('Error fetching membership data from Supabase:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMembershipData();
  }, []);

  return { tiers, addOns, faqs, loading, error };
}
