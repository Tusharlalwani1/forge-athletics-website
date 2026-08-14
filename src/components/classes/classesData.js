// TODO(Module 8): replace both exports with live data from Mindbody/Glofox/Wodify.
// Keep this exact shape so the swap is a data-source change, not a UI rewrite.

export const CLASS_TYPES = [
  {
    id: 'forge-wod',
    name: 'Forge WOD',
    description: 'High-intensity functional fitness combining gymnastics, weightlifting, and metabolic conditioning. Scalable to all fitness levels.',
    duration: 60,
    difficulty: 'intermediate',
    iconName: 'Dumbbell'
  },
  {
    id: 'foundations',
    name: 'Foundations',
    description: 'Essential barbell mechanics, gymnastics fundamentals, and movement safety designed specifically for new athletes.',
    duration: 60,
    difficulty: 'beginner',
    iconName: 'ShieldCheck'
  },
  {
    id: 'olympic-lifting',
    name: 'Olympic Lifting',
    description: 'Technical mastery of the snatch and clean & jerk. Focuses on position work, strength speed, and movement precision.',
    duration: 75,
    difficulty: 'advanced',
    iconName: 'Flame'
  },
  {
    id: 'endurance',
    name: 'Endurance',
    description: 'Aerobic capacity building through interval training, rowing, SkiErg, assault bike, and light bodyweight work.',
    duration: 60,
    difficulty: 'intermediate',
    iconName: 'Activity'
  },
  {
    id: 'open-gym',
    name: 'Open Gym',
    description: 'Unstructured access to floor equipment, rigs, and lifting platforms to work on skill, recovery, or custom programming.',
    duration: 120,
    difficulty: 'beginner',
    iconName: 'Unlock'
  },
  {
    id: 'mobility-recovery',
    name: 'Mobility & Recovery',
    description: 'Guided joint mobilization, active recovery protocols, and tissue work aimed at improving range of motion and reducing soreness.',
    duration: 45,
    difficulty: 'beginner',
    iconName: 'HeartPulse'
  }
];

export const TIMETABLE = [
  // Monday
  {
    id: 'mon-0600',
    day: 'Mon',
    startTime: '06:00 AM',
    durationMins: 60,
    classTypeId: 'forge-wod',
    coachName: 'Marcus Lee',
    spotsTotal: 12,
    spotsBooked: 9,
    status: 'scheduled'
  },
  {
    id: 'mon-0730',
    day: 'Mon',
    startTime: '07:30 AM',
    durationMins: 60,
    classTypeId: 'foundations',
    coachName: 'Jamie Cho',
    spotsTotal: 8,
    spotsBooked: 5,
    status: 'scheduled'
  },
  {
    id: 'mon-0900',
    day: 'Mon',
    startTime: '09:00 AM',
    durationMins: 75,
    classTypeId: 'olympic-lifting',
    coachName: 'Sara Diaz',
    spotsTotal: 10,
    spotsBooked: 8,
    status: 'scheduled'
  },
  {
    id: 'mon-1200',
    day: 'Mon',
    startTime: '12:00 PM',
    durationMins: 120,
    classTypeId: 'open-gym',
    coachName: 'Floor Staff',
    spotsTotal: 20,
    spotsBooked: 6,
    status: 'scheduled'
  },
  {
    id: 'mon-1730',
    day: 'Mon',
    startTime: '05:30 PM',
    durationMins: 60,
    classTypeId: 'forge-wod',
    coachName: 'Marcus Lee',
    spotsTotal: 14,
    spotsBooked: 14,
    status: 'scheduled'
  },
  {
    id: 'mon-1845',
    day: 'Mon',
    startTime: '06:45 PM',
    durationMins: 60,
    classTypeId: 'endurance',
    coachName: 'Alex Vance',
    spotsTotal: 12,
    spotsBooked: 7,
    status: 'scheduled'
  },

  // Tuesday
  {
    id: 'tue-0600',
    day: 'Tue',
    startTime: '06:00 AM',
    durationMins: 60,
    classTypeId: 'forge-wod',
    coachName: 'Sara Diaz',
    spotsTotal: 12,
    spotsBooked: 11,
    status: 'substitute',
    substituteNote: 'Sub: Elena Rostova'
  },
  {
    id: 'tue-0730',
    day: 'Tue',
    startTime: '07:30 AM',
    durationMins: 45,
    classTypeId: 'mobility-recovery',
    coachName: 'Elena Rostova',
    spotsTotal: 10,
    spotsBooked: 4,
    status: 'scheduled'
  },
  {
    id: 'tue-0900',
    day: 'Tue',
    startTime: '09:00 AM',
    durationMins: 60,
    classTypeId: 'endurance',
    coachName: 'Alex Vance',
    spotsTotal: 12,
    spotsBooked: 6,
    status: 'scheduled'
  },
  {
    id: 'tue-1730',
    day: 'Tue',
    startTime: '05:30 PM',
    durationMins: 60,
    classTypeId: 'forge-wod',
    coachName: 'Marcus Lee',
    spotsTotal: 14,
    spotsBooked: 10,
    status: 'scheduled'
  },
  {
    id: 'tue-1845',
    day: 'Tue',
    startTime: '06:45 PM',
    durationMins: 60,
    classTypeId: 'foundations',
    coachName: 'Jamie Cho',
    spotsTotal: 8,
    spotsBooked: 3,
    status: 'scheduled'
  },

  // Wednesday
  {
    id: 'wed-0600',
    day: 'Wed',
    startTime: '06:00 AM',
    durationMins: 60,
    classTypeId: 'forge-wod',
    coachName: 'Marcus Lee',
    spotsTotal: 12,
    spotsBooked: 8,
    status: 'scheduled'
  },
  {
    id: 'wed-0730',
    day: 'Wed',
    startTime: '07:30 AM',
    durationMins: 60,
    classTypeId: 'foundations',
    coachName: 'Jamie Cho',
    spotsTotal: 8,
    spotsBooked: 6,
    status: 'scheduled'
  },
  {
    id: 'wed-0900',
    day: 'Wed',
    startTime: '09:00 AM',
    durationMins: 75,
    classTypeId: 'olympic-lifting',
    coachName: 'Sara Diaz',
    spotsTotal: 10,
    spotsBooked: 10,
    status: 'scheduled'
  },
  {
    id: 'wed-1200',
    day: 'Wed',
    startTime: '12:00 PM',
    durationMins: 120,
    classTypeId: 'open-gym',
    coachName: 'Floor Staff',
    spotsTotal: 20,
    spotsBooked: 4,
    status: 'scheduled'
  },
  {
    id: 'wed-1730',
    day: 'Wed',
    startTime: '05:30 PM',
    durationMins: 60,
    classTypeId: 'forge-wod',
    coachName: 'Sara Diaz',
    spotsTotal: 14,
    spotsBooked: 14,
    status: 'cancelled'
  },
  {
    id: 'wed-1845',
    day: 'Wed',
    startTime: '06:45 PM',
    durationMins: 45,
    classTypeId: 'mobility-recovery',
    coachName: 'Elena Rostova',
    spotsTotal: 10,
    spotsBooked: 3,
    status: 'scheduled'
  },

  // Thursday
  {
    id: 'thu-0600',
    day: 'Thu',
    startTime: '06:00 AM',
    durationMins: 60,
    classTypeId: 'endurance',
    coachName: 'Alex Vance',
    spotsTotal: 12,
    spotsBooked: 9,
    status: 'scheduled'
  },
  {
    id: 'thu-0730',
    day: 'Thu',
    startTime: '07:30 AM',
    durationMins: 60,
    classTypeId: 'foundations',
    coachName: 'Jamie Cho',
    spotsTotal: 8,
    spotsBooked: 4,
    status: 'scheduled'
  },
  {
    id: 'thu-0900',
    day: 'Thu',
    startTime: '09:00 AM',
    durationMins: 60,
    classTypeId: 'forge-wod',
    coachName: 'Marcus Lee',
    spotsTotal: 12,
    spotsBooked: 10,
    status: 'scheduled'
  },
  {
    id: 'thu-1730',
    day: 'Thu',
    startTime: '05:30 PM',
    durationMins: 60,
    classTypeId: 'forge-wod',
    coachName: 'Sara Diaz',
    spotsTotal: 14,
    spotsBooked: 8,
    status: 'scheduled'
  },
  {
    id: 'thu-1845',
    day: 'Thu',
    startTime: '06:45 PM',
    durationMins: 75,
    classTypeId: 'olympic-lifting',
    coachName: 'Sara Diaz',
    spotsTotal: 10,
    spotsBooked: 7,
    status: 'scheduled'
  },

  // Friday
  {
    id: 'fri-0600',
    day: 'Fri',
    startTime: '06:00 AM',
    durationMins: 60,
    classTypeId: 'forge-wod',
    coachName: 'Marcus Lee',
    spotsTotal: 12,
    spotsBooked: 11,
    status: 'scheduled'
  },
  {
    id: 'fri-0730',
    day: 'Fri',
    startTime: '07:30 AM',
    durationMins: 45,
    classTypeId: 'mobility-recovery',
    coachName: 'Elena Rostova',
    spotsTotal: 10,
    spotsBooked: 5,
    status: 'scheduled'
  },
  {
    id: 'fri-0900',
    day: 'Fri',
    startTime: '09:00 AM',
    durationMins: 60,
    classTypeId: 'endurance',
    coachName: 'Alex Vance',
    spotsTotal: 12,
    spotsBooked: 8,
    status: 'scheduled'
  },
  {
    id: 'fri-1200',
    day: 'Fri',
    startTime: '12:00 PM',
    durationMins: 120,
    classTypeId: 'open-gym',
    coachName: 'Floor Staff',
    spotsTotal: 20,
    spotsBooked: 8,
    status: 'scheduled'
  },
  {
    id: 'fri-1730',
    day: 'Fri',
    startTime: '05:30 PM',
    durationMins: 60,
    classTypeId: 'forge-wod',
    coachName: 'Sara Diaz',
    spotsTotal: 14,
    spotsBooked: 12,
    status: 'scheduled'
  },

  // Saturday
  {
    id: 'sat-0800',
    day: 'Sat',
    startTime: '08:00 AM',
    durationMins: 60,
    classTypeId: 'forge-wod',
    coachName: 'Marcus Lee',
    spotsTotal: 16,
    spotsBooked: 15,
    status: 'scheduled'
  },
  {
    id: 'sat-0915',
    day: 'Sat',
    startTime: '09:15 AM',
    durationMins: 75,
    classTypeId: 'olympic-lifting',
    coachName: 'Sara Diaz',
    spotsTotal: 12,
    spotsBooked: 10,
    status: 'scheduled'
  },
  {
    id: 'sat-1045',
    day: 'Sat',
    startTime: '10:45 AM',
    durationMins: 60,
    classTypeId: 'endurance',
    coachName: 'Alex Vance',
    spotsTotal: 14,
    spotsBooked: 9,
    status: 'scheduled'
  },
  {
    id: 'sat-1200',
    day: 'Sat',
    startTime: '12:00 PM',
    durationMins: 180,
    classTypeId: 'open-gym',
    coachName: 'Floor Staff',
    spotsTotal: 25,
    spotsBooked: 10,
    status: 'scheduled'
  },

  // Sunday
  {
    id: 'sun-0900',
    day: 'Sun',
    startTime: '09:00 AM',
    durationMins: 60,
    classTypeId: 'foundations',
    coachName: 'Jamie Cho',
    spotsTotal: 10,
    spotsBooked: 4,
    status: 'scheduled'
  },
  {
    id: 'sun-1015',
    day: 'Sun',
    startTime: '10:15 AM',
    durationMins: 45,
    classTypeId: 'mobility-recovery',
    coachName: 'Elena Rostova',
    spotsTotal: 12,
    spotsBooked: 8,
    status: 'scheduled'
  },
  {
    id: 'sun-1115',
    day: 'Sun',
    startTime: '11:15 AM',
    durationMins: 180,
    classTypeId: 'open-gym',
    coachName: 'Floor Staff',
    spotsTotal: 25,
    spotsBooked: 12,
    status: 'scheduled'
  }
];
