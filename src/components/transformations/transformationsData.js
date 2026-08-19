import beginnerGymMan from '../../assets/beginner gym man.png';
import afterGymMan from '../../assets/after gym man.png';
import womanBeginnerGym from '../../assets/woman beginner gym.png';
import strongAthleticWoman from '../../assets/strong athletic woman.png';
import maleAthleteKneeBrace from '../../assets/male athlete knee brace.png';
import fitManPerformingDeep from '../../assets/fit man performing deep.png';
import womanJoggingMorning from '../../assets/woman jogging morning.png';
import athleticFemaleSprinter from '../../assets/athletic female sprinter.png';
import overweightManGym from '../../assets/overweight man gym.png';
import leanFitAthleticMan from '../../assets/lean fit athletic man holding.png';
import femaleJoggerOutdoor from '../../assets/female jogger outdoor road.png';
import femaleAthleteMarathon from '../../assets/female athlete marathon.png';
import manPracticingBarbell from '../../assets/man practicing barbell.png';
import maleCrossfitAthlete from '../../assets/male crossfit athlete.png';
import womanShoulderMobility from '../../assets/woman shoulder mobility.png';
import athleticWomanFullOverhead from '../../assets/athletic woman full overhead.png';

export const TRANSFORMATIONS = [
  {
    id: 'alex-r',
    name: 'Alex R.',
    goalType: 'strength',
    timeframeWeeks: 16,
    beforeImage: beginnerGymMan,
    afterImage: afterGymMan,
    quote: 'Down 30lbs and deadlifting 2x what I started with. The programming just works.',
    fullStory: "Alex came in with a gym background but had never touched a barbell with any real structure. Sixteen weeks of Forge programming changed that completely. The combination of Foundations classes to nail his movement pattern and WOD programming to build conditioning gave him the base he'd been missing for years. He's now one of the strongest athletes in the 6am class and coaching newer members on their first deadlifts.",
    startStat: 'Deadlift: 135 lbs',
    endStat: 'Deadlift: 295 lbs',
  },
  {
    id: 'priya-m',
    name: 'Priya M.',
    goalType: 'strength',
    timeframeWeeks: 12,
    beforeImage: womanBeginnerGym,
    afterImage: strongAthleticWoman,
    quote: 'First pull-up ever, at 41. I genuinely never thought I\'d get here.',
    fullStory: "Priya signed up after her doctor recommended strength training to improve bone density. She had never trained in a gym before and was intimidated by the barbell work. After three months of consistent Foundations and WOD classes, she hit her first unassisted pull-up during a Saturday team workout. She says that moment is still her proudest athletic achievement. She's now working toward five consecutive reps.",
    startStat: 'Pull-ups: 0 (band-assisted)',
    endStat: 'Pull-ups: 3 unassisted',
  },
  {
    id: 'devon-k',
    name: 'Devon K.',
    goalType: 'flexibility',
    timeframeWeeks: 24,
    beforeImage: maleAthleteKneeBrace,
    afterImage: fitManPerformingDeep,
    quote: 'Rebuilt my knee strength after surgery. The coaches scaled everything perfectly — I never felt rushed.',
    fullStory: "Devon returned to training 8 months post ACL reconstruction with a lot of anxiety about re-injury. Elena and Marcus built a 6-month phased approach: the first two months were entirely Mobility & Recovery classes to re-establish joint range and proprioception, then a gradual WOD re-introduction with modified loading. Devon completed his first unmodified WOD in month five and hasn't looked back.",
    startStat: 'Squat depth: parallel only',
    endStat: 'Squat depth: full (below parallel)',
  },
  {
    id: 'lena-t',
    name: 'Lena T.',
    goalType: 'endurance',
    timeframeWeeks: 10,
    beforeImage: womanJoggingMorning,
    afterImage: athleticFemaleSprinter,
    quote: 'More energy at 6am than I had all day before joining. I thought I was just a night person.',
    fullStory: "Lena joined primarily for stress management after a job change — she wasn't expecting the physical transformation. Ten weeks of 4am alarm clocks and 6am classes later, her resting heart rate had dropped 11 bpm, she'd shaved 4 minutes off her mile time, and she was sleeping through the night for the first time in years. She now helps open the gym three mornings a week as a volunteer.",
    startStat: 'Mile time: 11:40',
    endStat: 'Mile time: 7:22',
  },
  {
    id: 'marcus-d',
    name: 'Marcus D.',
    goalType: 'weight-loss',
    timeframeWeeks: 20,
    beforeImage: overweightManGym,
    afterImage: leanFitAthleticMan,
    quote: 'Lost 28lbs without ever feeling like I was on a diet. The nutrition coaching changed how I think about food.',
    fullStory: "Marcus joined on a friend's recommendation with no athletic background whatsoever. He paired two WOD classes per week with Dana's standalone nutrition coaching from month one — not for calorie restriction, but to understand how food fueled his training. The weight loss was almost incidental. What surprised him was the strength gain alongside it: he's now consistently lifting weights he thought were impossible when he started.",
    startStat: null,
    endStat: null,
  },
  {
    id: 'sophie-w',
    name: 'Sophie W.',
    goalType: 'endurance',
    timeframeWeeks: 18,
    beforeImage: femaleJoggerOutdoor,
    afterImage: femaleAthleteMarathon,
    quote: 'Finished my first half-marathon. I started here not being able to run a full kilometre without stopping.',
    fullStory: "Sophie came to Forge specifically to improve her running capacity for a charity half-marathon. Alex's Endurance programming ran alongside two WOD sessions per week for 18 weeks. She finished the half in 2:07 — ahead of her 2:15 target. What she didn't expect was the upper-body strength she built as a byproduct of the WOD programming, which she now credits for helping her posture and running economy in the second half of the race.",
    startStat: 'Half-marathon: DNF (training)',
    endStat: 'Half-marathon: 2:07:34',
  },
  {
    id: 'james-p',
    name: 'James P.',
    goalType: 'strength',
    timeframeWeeks: 30,
    beforeImage: manPracticingBarbell,
    afterImage: maleCrossfitAthlete,
    quote: 'Went from hobbyist to competing in my first local throwdown. The coaching here is genuinely elite.',
    fullStory: "James had been doing CrossFit-style workouts at home for two years but had never been coached on his barbell mechanics. His first Olympic Lifting session with Sara revealed every compensatory pattern he'd built up. Thirty weeks later — with consistent Oly and WOD attendance — he competed in a local affiliate throwdown and placed 14th in the scaled division. He's already targeting the next event in his age group.",
    startStat: 'Clean & Jerk: 65 kg',
    endStat: 'Clean & Jerk: 92 kg',
  },
  {
    id: 'nadia-k',
    name: 'Nadia K.',
    goalType: 'flexibility',
    timeframeWeeks: 14,
    beforeImage: womanShoulderMobility,
    afterImage: athleticWomanFullOverhead,
    quote: 'Chronic shoulder tightness I\'d had for 3 years cleared up inside 2 months. I wish I\'d found this place sooner.',
    fullStory: "Nadia had been managing chronic upper-back and shoulder tightness from a desk job for three years — physiotherapy had helped but the gains always reversed when she stopped going. Elena's Mobility & Recovery classes gave her a daily movement practice she could sustain. Within 8 weeks the tightness had reduced significantly; by week 14 she had full overhead range for the first time since her twenties, and she's now added WOD classes on top of the mobility work.",
    startStat: 'Overhead reach: 80% ROM',
    endStat: 'Overhead reach: Full ROM',
  },
];

export const WRITTEN_TESTIMONIALS = [
  {
    id: 'test-raj',
    name: 'Raj S.',
    quote: "I was 52 and convinced I was too old for this. Marcus told me to come for one class. That was 14 months ago — I haven't stopped. The coaches actually know my name, my weaknesses, and my goals. That doesn't happen at a regular gym.",
  },
  {
    id: 'test-claire',
    name: 'Claire O.',
    quote: "The community here is real, not performative. When I had a bad week and showed up anyway, three different people noticed and checked in. The workouts are great but it's the people that make you come back.",
  },
  {
    id: 'test-tom',
    name: 'Tom H.',
    quote: "I've tried four different gyms in the last six years. Forge is the first one where I've stuck past the 3-month slump. The programming is always fresh, the coaches catch your form before you hurt yourself, and there's no ego in the building.",
  },
  {
    id: 'test-yasmin',
    name: 'Yasmin F.',
    quote: "Joined for the free trial, stayed for 18 months. My blood pressure is down, I sleep better, and I actually look forward to 5:30am now. If you're on the fence, just take the trial class. You'll know immediately.",
  },
];

export const GOAL_TYPE_LABELS = {
  'weight-loss': 'Weight Loss',
  strength: 'Strength',
  flexibility: 'Mobility',
  endurance: 'Endurance',
};
