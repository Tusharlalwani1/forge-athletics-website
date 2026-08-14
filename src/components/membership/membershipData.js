// TODO(Module 8): tier pricing should ideally be centrally managed (CMS or
// config) so staff can update prices without a code deploy. For now this is
// the single source of truth the whole page reads from.

export const TIERS = [
  {
    id: 'drop-in',
    name: 'Drop-In',
    tagline: 'Single session pass for visiting athletes and travelers.',
    monthlyPrice: 25,
    annualPrice: 25,
    period: '/class',
    isPerClass: true,
    featured: false,
    ctaText: 'Buy Drop-In Pass',
    features: [
      { label: 'Class Access', value: 'Single class access' },
      { label: 'Open Gym Access', value: false },
      { label: 'Guest Passes', value: false },
      { label: 'Nutrition Coaching', value: false },
      { label: 'Priority Booking', value: false },
      { label: 'Freeze / Pause Policy', value: false },
      { label: 'Contract Length', value: 'No contract' },
    ],
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    tagline: 'Full access for dedicated athletes & daily grinders.',
    monthlyPrice: 179,
    annualPrice: 149,
    period: '/mo',
    isPerClass: false,
    featured: true,
    badgeText: 'Most Popular',
    ctaText: 'Join Unlimited',
    features: [
      { label: 'Class Access', value: 'Unlimited classes' },
      { label: 'Open Gym Access', value: 'Full floor access' },
      { label: 'Guest Passes', value: '1 pass / month' },
      { label: 'Nutrition Coaching', value: 'Monthly check-in' },
      { label: 'Priority Booking', value: 'Standard (3-day)' },
      { label: 'Freeze / Pause Policy', value: 'Pause anytime' },
      { label: 'Contract Length', value: 'No contract' },
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'Total performance package with 1-on-1 coaching & recovery.',
    monthlyPrice: 249,
    annualPrice: 209,
    period: '/mo',
    isPerClass: false,
    featured: false,
    badgeText: 'Best Value',
    ctaText: 'Join Elite Track',
    features: [
      { label: 'Class Access', value: 'Unlimited classes' },
      { label: 'Open Gym Access', value: 'Full floor + keycard' },
      { label: 'Guest Passes', value: '3 passes / month' },
      { label: 'Nutrition Coaching', value: 'Custom macros & weekly audit' },
      { label: 'Priority Booking', value: 'VIP (7-day advance)' },
      { label: 'Freeze / Pause Policy', value: 'Unlimited pause' },
      { label: 'Contract Length', value: 'No contract' },
    ],
  },
];

export const ADD_ONS = [
  {
    id: 'pt-pack',
    name: 'Personal Training Pack',
    price: '$280',
    period: '/ 4 sessions',
    description: '4 x 60-minute 1-on-1 technical sessions focused on barbell mechanics, mobility, or competition prep.',
    iconName: 'Dumbbell',
  },
  {
    id: 'nutrition-coaching',
    name: 'Nutrition Coaching (Standalone)',
    price: '$89',
    period: '/ month',
    description: 'Personalized macro targets, weekly check-ins, and body composition tracking without a full gym membership.',
    iconName: 'Salad',
  },
  {
    id: 'recovery-lounge',
    name: 'Recovery Lounge Access',
    price: '$49',
    period: '/ month',
    description: 'Unlimited access to infrared sauna, cold plunge tubs, and Normatec compression gear.',
    iconName: 'Sparkles',
  },
];

export const FAQS = [
  {
    id: 'faq-cancel',
    question: 'Can I cancel or pause my membership at any time?',
    answer: 'Absolutely. All Forge Athletics memberships operate on a transparent month-to-month basis with zero long-term contracts. You can pause or cancel your membership with 7 days’ written notice prior to your next billing date.',
  },
  {
    id: 'faq-experience',
    question: 'Do I need previous CrossFit or weightlifting experience to join?',
    answer: 'Not at all. Every class workout is scalable to your current fitness level and coached in real time. If you are brand new to barbell training, our Foundations track ensures you learn movement mechanics safely and comfortably.',
  },
  {
    id: 'faq-annual',
    question: 'How does annual billing work and what are the savings?',
    answer: 'Choosing annual billing locks in a discounted monthly rate (~15-20% off the standard monthly price) billed upfront as an annual payment. You enjoy full membership privileges and price lock protection.',
  },
  {
    id: 'faq-dropin',
    question: 'What is your drop-in policy for out-of-town visitors?',
    answer: 'Traveling athletes are always welcome! You can purchase a $25 single drop-in pass online. Pass is valid for any scheduled class slot on the timetable within 30 days of purchase.',
  },
  {
    id: 'faq-trial',
    question: 'Can I try a class before buying a membership?',
    answer: 'Yes! First-time local residents can claim a 100% free trial class. Click "Claim Free Trial" anywhere on the site to pick your day and time.',
  },
];
