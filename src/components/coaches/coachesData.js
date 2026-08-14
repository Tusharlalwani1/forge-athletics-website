// TODO(Module 9): coach bios/photos should be editable via CMS/admin panel
// without a code deploy, per the SRS (Section 4.3). This static array is the
// placeholder source until that's wired up.

export const COACHES = [
  {
    id: 'marcus-lee',
    name: 'Marcus Lee',
    role: 'Head Coach & Programming Director',
    initials: 'ML',
    specialties: ['CrossFit', 'Strength & Conditioning', 'Competition Prep'],
    certifications: [
      'CrossFit Level 3 Trainer',
      'NSCA-CSCS (Certified Strength & Conditioning Specialist)',
      'USA Weightlifting Club Coach',
      'CPR/AED Certified',
    ],
    bio: 'CrossFit L3 with 10+ years coaching competitive lifters across all levels \u2014 from first-timers to national qualifiers.',
    fullBio:
      "Marcus built Forge Athletics from the ground up after spending nearly a decade as a competitive CrossFit athlete and regional coach. His programming is known for its intelligent periodisation \u2014 balancing intensity with longevity so athletes keep improving year after year without burning out. He's trained hundreds of first-timers and guided a dozen athletes to sanctioned competition.",
    philosophy: '"Hard work compounds. Show up consistently and the results become inevitable."',
    instagramHandle: '@marcuslee_forge',
    // Classes taught: Forge WOD (all weekday mornings + PM slots)
    classTypeIds: ['forge-wod'],
  },
  {
    id: 'sara-diaz',
    name: 'Sara Diaz',
    role: 'Olympic Lifting Coach',
    initials: 'SD',
    specialties: ['Olympic Weightlifting', 'Barbell Technique', 'CrossFit'],
    certifications: [
      'USAW Level 2 Sports Performance Coach',
      'CrossFit Level 2 Trainer',
      'CrossFit Weightlifting Certificate',
      'CPR/AED Certified',
    ],
    bio: 'Former collegiate weightlifter and USAW L2 coach with a deep focus on snatch and clean & jerk positional work.',
    fullBio:
      'Sara competed in collegiate and open division Olympic weightlifting for seven years before pivoting to coaching. Her technical eye for barbell mechanics \u2014 particularly the catch position and pull timing \u2014 has helped athletes of all builds dramatically improve their lifts. She coaches both the Olympic Lifting specialty class and general WOD sessions, bringing that technical precision to every movement she cues.',
    philosophy: '"Technique is the multiplier. Add load after the movement is honest."',
    instagramHandle: '@sara_diaz_lifts',
    // Classes taught: Olympic Lifting + Forge WOD (Wed/Thu/Fri PM)
    classTypeIds: ['olympic-lifting', 'forge-wod'],
  },
  {
    id: 'jamie-cho',
    name: 'Jamie Cho',
    role: 'Foundations & Movement Coach',
    initials: 'JC',
    specialties: ['Beginner Onboarding', 'Movement Safety', 'Endurance'],
    certifications: [
      'CrossFit Level 2 Trainer',
      'CrossFit Scaling Course',
      'NASM Certified Personal Trainer (CPT)',
      'CPR/AED Certified',
    ],
    bio: "Ultramarathoner turned CrossFit coach \u2014 Jamie's superpower is making beginners feel capable and confident from day one.",
    fullBio:
      "Jamie ran his first ultramarathon in 2018 and immediately became obsessed with how structured conditioning work carries over to every sport and daily life. He joined Forge as a Foundations specialist, designing the onboarding curriculum that's helped hundreds of brand-new athletes make the leap from 'never lifted a barbell' to competing in local throwdowns. His patient coaching style and deep focus on movement safety make him the first coach most new members meet.",
    philosophy: '"You don\'t need to be fit to start \u2014 you start in order to get fit."',
    instagramHandle: '@jamiecho_run',
    // Classes taught: Foundations (Mon/Tue/Wed/Thu/Sun mornings)
    classTypeIds: ['foundations'],
  },
  {
    id: 'alex-vance',
    name: 'Alex Vance',
    role: 'Endurance & Conditioning Coach',
    initials: 'AV',
    specialties: ['Aerobic Conditioning', 'Rowing & SkiErg', 'Interval Training'],
    certifications: [
      'CrossFit Level 1 Trainer',
      'CrossFit Endurance Certificate',
      'USATF Level 1 Certified',
      'CPR/AED Certified',
    ],
    bio: 'Competitive rower and triathlete who brings aerobic science into every conditioning session \u2014 interval design is his art form.',
    fullBio:
      "Alex spent six years racing in competitive rowing and triathlon circuits before channeling that endurance engine into coaching. He designs Forge's Endurance programming with a meticulous eye on heart-rate zones, work-to-rest ratios, and progressive overload \u2014 ensuring every session builds real aerobic capacity rather than just producing sweat. He's also the go-to coach for anyone training for obstacle course races, running events, or simply wanting to stop gassing out mid-WOD.",
    philosophy: '"Aerobic capacity is the base all other performance is built on."',
    instagramHandle: '@alexvance_endurance',
    // Classes taught: Endurance (Mon/Tue/Thu/Fri/Sat)
    classTypeIds: ['endurance'],
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Mobility & Recovery Coach',
    initials: 'ER',
    specialties: ['Mobility & Flexibility', 'Recovery Protocols', 'Injury Prevention'],
    certifications: [
      'FRC Mobility Specialist (FRCms)',
      'NASM Corrective Exercise Specialist (CES)',
      'CrossFit Level 1 Trainer',
      'Precision Nutrition Level 1',
    ],
    bio: 'Certified mobility specialist and former physio assistant \u2014 Elena bridges the gap between performance and longevity.',
    fullBio:
      "Elena trained as a physiotherapy assistant before discovering functional range conditioning and bringing its principles into the CrossFit world. She leads Forge's Mobility & Recovery sessions, creating guided protocols that address the specific movement restrictions athletes develop from heavy lifting, high-volume training, and sedentary work days. Her classes are the antidote to the aches and asymmetries that build up over a hard training block \u2014 and a reason members rarely miss them.",
    philosophy: '"Mobility isn\'t the warmup. It\'s the work that makes every other work better."',
    instagramHandle: null,
    // Classes taught: Mobility & Recovery (Tue/Wed/Fri/Sun)
    classTypeIds: ['mobility-recovery'],
  },
  {
    id: 'dana-west',
    name: 'Dana West',
    role: 'Strength Coach & Open Gym Supervisor',
    initials: 'DW',
    specialties: ['Powerlifting', 'Open Gym Programming', 'Nutrition Coaching'],
    certifications: [
      'CrossFit Level 2 Trainer',
      'Precision Nutrition Level 1 Coach',
      'NSCA-CPT (Certified Personal Trainer)',
      'CPR/AED Certified',
    ],
    bio: 'Powerlifting background meets nutrition science \u2014 Dana helps members build sustainable strength habits that outlast any program.',
    fullBio:
      "Dana comes from a powerlifting background with three national-level raw total PRs before shifting focus to everyday athlete coaching. As the Open Gym supervisor and a Precision Nutrition coach, she bridges two worlds that rarely talk to each other: structured barbell work and sustainable nutrition habits. She's the person you'll find on the floor during open sessions, quietly adjusting deadlift setups and answering questions about protein targets at the same time. She's also available for standalone nutrition check-ins outside of class.",
    philosophy: '"Strength built on good food and good sleep outlasts every supplement."',
    instagramHandle: '@danawest_strength',
    // Classes taught: Open Gym supervision + Forge WOD coverage
    classTypeIds: ['open-gym', 'forge-wod'],
  },
];

// Derive all distinct specialty tags from the roster for filtering
export const ALL_SPECIALTIES = [
  ...new Set(COACHES.flatMap((c) => c.specialties)),
].sort();
