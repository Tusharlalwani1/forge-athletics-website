
-- 1. CLASS TYPES TABLE
CREATE TABLE IF NOT EXISTS public.class_types (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL,
    difficulty TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TIMETABLE SLOTS TABLE
CREATE TABLE IF NOT EXISTS public.timetable (
    id TEXT PRIMARY KEY,
    day TEXT NOT NULL,
    start_time TEXT NOT NULL,
    duration_mins INTEGER NOT NULL,
    class_type_id TEXT REFERENCES public.class_types(id) ON DELETE CASCADE,
    coach_name TEXT NOT NULL,
    spots_total INTEGER NOT NULL,
    spots_booked INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'scheduled',
    substitute_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. COACHES TABLE
CREATE TABLE IF NOT EXISTS public.coaches (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    initials TEXT NOT NULL,
    specialties TEXT[] DEFAULT '{}',
    certifications TEXT[] DEFAULT '{}',
    bio TEXT NOT NULL,
    full_bio TEXT NOT NULL,
    philosophy TEXT NOT NULL,
    instagram_handle TEXT,
    class_type_ids TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. MEMBERSHIP TIERS TABLE
CREATE TABLE IF NOT EXISTS public.membership_tiers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    monthly_price NUMERIC NOT NULL,
    annual_price NUMERIC NOT NULL,
    period TEXT NOT NULL,
    is_per_class BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    badge_text TEXT,
    cta_text TEXT NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ADD-ONS TABLE
CREATE TABLE IF NOT EXISTS public.add_ons (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TRANSFORMATIONS TABLE
CREATE TABLE IF NOT EXISTS public.transformations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    goal_type TEXT NOT NULL,
    timeframe_weeks INTEGER NOT NULL,
    quote TEXT NOT NULL,
    full_story TEXT NOT NULL,
    start_stat TEXT,
    end_stat TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    quote TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) & PUBLIC READ POLICIES
-- ============================================================================

ALTER TABLE public.class_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timetable ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.add_ons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transformations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create Policies for Anon Public Reading
CREATE POLICY "Public Read Class Types" ON public.class_types FOR SELECT USING (true);
CREATE POLICY "Public Read Timetable" ON public.timetable FOR SELECT USING (true);
CREATE POLICY "Public Read Coaches" ON public.coaches FOR SELECT USING (true);
CREATE POLICY "Public Read Membership Tiers" ON public.membership_tiers FOR SELECT USING (true);
CREATE POLICY "Public Read Add Ons" ON public.add_ons FOR SELECT USING (true);
CREATE POLICY "Public Read FAQs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Public Read Transformations" ON public.transformations FOR SELECT USING (true);
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (true);

-- ============================================================================
-- INITIAL SEED DATA INSERTS
-- ============================================================================

-- 1. SEED CLASS TYPES
INSERT INTO public.class_types (id, name, description, duration, difficulty, icon_name) VALUES
('forge-wod', 'Forge WOD', 'High-intensity functional fitness combining gymnastics, weightlifting, and metabolic conditioning. Scalable to all fitness levels.', 60, 'intermediate', 'Dumbbell'),
('foundations', 'Foundations', 'Essential barbell mechanics, gymnastics fundamentals, and movement safety designed specifically for new athletes.', 60, 'beginner', 'ShieldCheck'),
('olympic-lifting', 'Olympic Lifting', 'Technical mastery of the snatch and clean & jerk. Focuses on position work, strength speed, and movement precision.', 75, 'advanced', 'Flame'),
('endurance', 'Endurance', 'Aerobic capacity building through interval training, rowing, SkiErg, assault bike, and light bodyweight work.', 60, 'intermediate', 'Activity'),
('open-gym', 'Open Gym', 'Unstructured access to floor equipment, rigs, and lifting platforms to work on skill, recovery, or custom programming.', 120, 'beginner', 'Unlock'),
('mobility-recovery', 'Mobility & Recovery', 'Guided joint mobilization, active recovery protocols, and tissue work aimed at improving range of motion and reducing soreness.', 45, 'beginner', 'HeartPulse')
ON CONFLICT (id) DO NOTHING;

-- 2. SEED TIMETABLE SLOTS
INSERT INTO public.timetable (id, day, start_time, duration_mins, class_type_id, coach_name, spots_total, spots_booked, status, substitute_note) VALUES
('mon-0600', 'Mon', '06:00 AM', 60, 'forge-wod', 'Marcus Lee', 12, 9, 'scheduled', NULL),
('mon-0730', 'Mon', '07:30 AM', 60, 'foundations', 'Jamie Cho', 8, 5, 'scheduled', NULL),
('mon-0900', 'Mon', '09:00 AM', 75, 'olympic-lifting', 'Sara Diaz', 10, 8, 'scheduled', NULL),
('mon-1200', 'Mon', '12:00 PM', 120, 'open-gym', 'Dana West', 20, 6, 'scheduled', NULL),
('mon-1730', 'Mon', '05:30 PM', 60, 'forge-wod', 'Marcus Lee', 14, 14, 'scheduled', NULL),
('mon-1845', 'Mon', '06:45 PM', 60, 'endurance', 'Alex Vance', 12, 7, 'scheduled', NULL),

('tue-0600', 'Tue', '06:00 AM', 60, 'forge-wod', 'Sara Diaz', 12, 11, 'substitute', 'Sub: Elena Rostova'),
('tue-0730', 'Tue', '07:30 AM', 45, 'mobility-recovery', 'Elena Rostova', 10, 4, 'scheduled', NULL),
('tue-0900', 'Tue', '09:00 AM', 60, 'endurance', 'Alex Vance', 12, 6, 'scheduled', NULL),
('tue-1730', 'Tue', '05:30 PM', 60, 'forge-wod', 'Marcus Lee', 14, 10, 'scheduled', NULL),
('tue-1845', 'Tue', '06:45 PM', 60, 'foundations', 'Jamie Cho', 8, 3, 'scheduled', NULL),

('wed-0600', 'Wed', '06:00 AM', 60, 'forge-wod', 'Marcus Lee', 12, 8, 'scheduled', NULL),
('wed-0730', 'Wed', '07:30 AM', 60, 'foundations', 'Jamie Cho', 8, 6, 'scheduled', NULL),
('wed-0900', 'Wed', '09:00 AM', 75, 'olympic-lifting', 'Sara Diaz', 10, 10, 'scheduled', NULL),
('wed-1200', 'Wed', '12:00 PM', 120, 'open-gym', 'Dana West', 20, 4, 'scheduled', NULL),
('wed-1730', 'Wed', '05:30 PM', 60, 'forge-wod', 'Sara Diaz', 14, 14, 'cancelled', NULL),
('wed-1845', 'Wed', '06:45 PM', 45, 'mobility-recovery', 'Elena Rostova', 10, 3, 'scheduled', NULL),

('thu-0600', 'Thu', '06:00 AM', 60, 'endurance', 'Alex Vance', 12, 9, 'scheduled', NULL),
('thu-0730', 'Thu', '07:30 AM', 60, 'foundations', 'Jamie Cho', 8, 4, 'scheduled', NULL),
('thu-0900', 'Thu', '09:00 AM', 60, 'forge-wod', 'Marcus Lee', 12, 10, 'scheduled', NULL),
('thu-1730', 'Thu', '05:30 PM', 60, 'forge-wod', 'Sara Diaz', 14, 8, 'scheduled', NULL),
('thu-1845', 'Thu', '06:45 PM', 75, 'olympic-lifting', 'Sara Diaz', 10, 7, 'scheduled', NULL),

('fri-0600', 'Fri', '06:00 AM', 60, 'forge-wod', 'Marcus Lee', 12, 11, 'scheduled', NULL),
('fri-0730', 'Fri', '07:30 AM', 45, 'mobility-recovery', 'Elena Rostova', 10, 5, 'scheduled', NULL),
('fri-0900', 'Fri', '09:00 AM', 60, 'endurance', 'Alex Vance', 12, 8, 'scheduled', NULL),
('fri-1200', 'Fri', '12:00 PM', 120, 'open-gym', 'Dana West', 20, 8, 'scheduled', NULL),
('fri-1730', 'Fri', '05:30 PM', 60, 'forge-wod', 'Sara Diaz', 14, 12, 'scheduled', NULL),

('sat-0800', 'Sat', '08:00 AM', 60, 'forge-wod', 'Marcus Lee', 16, 15, 'scheduled', NULL),
('sat-0915', 'Sat', '09:15 AM', 75, 'olympic-lifting', 'Sara Diaz', 12, 10, 'scheduled', NULL),
('sat-1045', 'Sat', '10:45 AM', 60, 'endurance', 'Alex Vance', 14, 9, 'scheduled', NULL),
('sat-1200', 'Sat', '12:00 PM', 180, 'open-gym', 'Dana West', 25, 10, 'scheduled', NULL),

('sun-0900', 'Sun', '09:00 AM', 60, 'foundations', 'Jamie Cho', 10, 4, 'scheduled', NULL),
('sun-1015', 'Sun', '10:15 AM', 45, 'mobility-recovery', 'Elena Rostova', 12, 8, 'scheduled', NULL),
('sun-1115', 'Sun', '11:15 AM', 180, 'open-gym', 'Dana West', 25, 12, 'scheduled', NULL)
ON CONFLICT (id) DO NOTHING;

-- 3. SEED COACHES
INSERT INTO public.coaches (id, name, role, initials, specialties, certifications, bio, full_bio, philosophy, instagram_handle, class_type_ids) VALUES
('marcus-lee', 'Marcus Lee', 'Head Coach & Programming Director', 'ML',
 ARRAY['CrossFit', 'Strength & Conditioning', 'Competition Prep'],
 ARRAY['CrossFit Level 3 Trainer', 'NSCA-CSCS (Certified Strength & Conditioning Specialist)', 'USA Weightlifting Club Coach', 'CPR/AED Certified'],
 'CrossFit L3 with 10+ years coaching competitive lifters across all levels — from first-timers to national qualifiers.',
 'Marcus built Forge Athletics from the ground up after spending nearly a decade as a competitive CrossFit athlete and regional coach. His programming is known for its intelligent periodisation — balancing intensity with longevity so athletes keep improving year after year without burning out. He''s trained hundreds of first-timers and guided a dozen athletes to sanctioned competition.',
 '"Hard work compounds. Show up consistently and the results become inevitable."',
 '@marcuslee_forge',
 ARRAY['forge-wod']),

('sara-diaz', 'Sara Diaz', 'Olympic Lifting Coach', 'SD',
 ARRAY['Olympic Weightlifting', 'Barbell Technique', 'CrossFit'],
 ARRAY['USAW Level 2 Sports Performance Coach', 'CrossFit Level 2 Trainer', 'CrossFit Weightlifting Certificate', 'CPR/AED Certified'],
 'Former collegiate weightlifter and USAW L2 coach with a deep focus on snatch and clean & jerk positional work.',
 'Sara competed in collegiate and open division Olympic weightlifting for seven years before pivoting to coaching. Her technical eye for barbell mechanics — particularly the catch position and pull timing — has helped athletes of all builds dramatically improve their lifts. She coaches both the Olympic Lifting specialty class and general WOD sessions, bringing that technical precision to every movement she cues.',
 '"Technique is the multiplier. Add load after the movement is honest."',
 '@sara_diaz_lifts',
 ARRAY['olympic-lifting', 'forge-wod']),

('jamie-cho', 'Jamie Cho', 'Foundations & Movement Coach', 'JC',
 ARRAY['Beginner Onboarding', 'Movement Safety', 'Endurance'],
 ARRAY['CrossFit Level 2 Trainer', 'CrossFit Scaling Course', 'NASM Certified Personal Trainer (CPT)', 'CPR/AED Certified'],
 'Ultramarathoner turned CrossFit coach — Jamie''s superpower is making beginners feel capable and confident from day one.',
 'Jamie ran his first ultramarathon in 2018 and immediately became obsessed with how structured conditioning work carries over to every sport and daily life. He joined Forge as a Foundations specialist, designing the onboarding curriculum that''s helped hundreds of brand-new athletes make the leap from ''never lifted a barbell'' to competing in local throwdowns. His patient coaching style and deep focus on movement safety make him the first coach most new members meet.',
 '"You don''t need to be fit to start — you start in order to get fit."',
 '@jamiecho_run',
 ARRAY['foundations']),

('alex-vance', 'Alex Vance', 'Endurance & Conditioning Coach', 'AV',
 ARRAY['Aerobic Conditioning', 'Rowing & SkiErg', 'Interval Training'],
 ARRAY['CrossFit Level 1 Trainer', 'CrossFit Endurance Certificate', 'USATF Level 1 Certified', 'CPR/AED Certified'],
 'Competitive rower and triathlete who brings aerobic science into every conditioning session — interval design is his art form.',
 'Alex spent six years racing in competitive rowing and triathlon circuits before channeling that endurance engine into coaching. He designs Forge''s Endurance programming with a meticulous eye on heart-rate zones, work-to-rest ratios, and progressive overload — ensuring every session builds real aerobic capacity rather than just producing sweat. He''s also the go-to coach for anyone training for obstacle course races, running events, or simply wanting to stop gassing out mid-WOD.',
 '"Aerobic capacity is the base all other performance is built on."',
 '@alexvance_endurance',
 ARRAY['endurance']),

('elena-rostova', 'Elena Rostova', 'Mobility & Recovery Coach', 'ER',
 ARRAY['Mobility & Flexibility', 'Recovery Protocols', 'Injury Prevention'],
 ARRAY['FRC Mobility Specialist (FRCms)', 'NASM Corrective Exercise Specialist (CES)', 'CrossFit Level 1 Trainer', 'Precision Nutrition Level 1'],
 'Certified mobility specialist and former physio assistant — Elena bridges the gap between performance and longevity.',
 'Elena trained as a physiotherapy assistant before discovering functional range conditioning and bringing its principles into the CrossFit world. She leads Forge''s Mobility & Recovery sessions, creating guided protocols that address the specific movement restrictions athletes develop from heavy lifting, high-volume training, and sedentary work days. Her classes are the antidote to the aches and asymmetries that build up over a hard training block — and a reason members rarely miss them.',
 '"Mobility isn''t the warmup. It''s the work that makes every other work better."',
 NULL,
 ARRAY['mobility-recovery']),

('dana-west', 'Dana West', 'Strength Coach & Open Gym Supervisor', 'DW',
 ARRAY['Powerlifting', 'Open Gym Programming', 'Nutrition Coaching'],
 ARRAY['CrossFit Level 2 Trainer', 'Precision Nutrition Level 1 Coach', 'NSCA-CPT (Certified Personal Trainer)', 'CPR/AED Certified'],
 'Powerlifting background meets nutrition science — Dana helps members build sustainable strength habits that outlast any program.',
 'Dana comes from a powerlifting background with three national-level raw total PRs before shifting focus to everyday athlete coaching. As the Open Gym supervisor and a Precision Nutrition coach, she bridges two worlds that rarely talk to each other: structured barbell work and sustainable nutrition habits. She''s the person you''ll find on the floor during open sessions, quietly adjusting deadlift setups and answering questions about protein targets at the same time. She''s also available for standalone nutrition check-ins outside of class.',
 '"Strength built on good food and good sleep outlasts every supplement."',
 '@danawest_strength',
 ARRAY['open-gym', 'forge-wod'])
ON CONFLICT (id) DO NOTHING;

-- 4. SEED MEMBERSHIP TIERS
INSERT INTO public.membership_tiers (id, name, tagline, monthly_price, annual_price, period, is_per_class, featured, badge_text, cta_text, features) VALUES
('drop-in', 'Drop-In', 'Single session pass for visiting athletes and travelers.', 25, 25, '/class', true, false, NULL, 'Buy Drop-In Pass',
 '[{"label": "Class Access", "value": "Single class access"}, {"label": "Open Gym Access", "value": false}, {"label": "Guest Passes", "value": false}, {"label": "Nutrition Coaching", "value": false}, {"label": "Priority Booking", "value": false}, {"label": "Freeze / Pause Policy", "value": false}, {"label": "Contract Length", "value": "No contract"}]'::jsonb),

('unlimited', 'Unlimited', 'Full access for dedicated athletes & daily grinders.', 179, 149, '/mo', false, true, 'Most Popular', 'Join Unlimited',
 '[{"label": "Class Access", "value": "Unlimited classes"}, {"label": "Open Gym Access", "value": "Full floor access"}, {"label": "Guest Passes", "value": "1 pass / month"}, {"label": "Nutrition Coaching", "value": "Monthly check-in"}, {"label": "Priority Booking", "value": "Standard (3-day)"}, {"label": "Freeze / Pause Policy", "value": "Pause anytime"}, {"label": "Contract Length", "value": "No contract"}]'::jsonb),

('elite', 'Elite', 'Total performance package with 1-on-1 coaching & recovery.', 249, 209, '/mo', false, false, 'Best Value', 'Join Elite Track',
 '[{"label": "Class Access", "value": "Unlimited classes"}, {"label": "Open Gym Access", "value": "Full floor + keycard"}, {"label": "Guest Passes", "value": "3 passes / month"}, {"label": "Nutrition Coaching", "value": "Custom macros & weekly audit"}, {"label": "Priority Booking", "value": "VIP (7-day advance)"}, {"label": "Freeze / Pause Policy", "value": "Unlimited pause"}, {"label": "Contract Length", "value": "No contract"}]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 5. SEED ADD-ONS
INSERT INTO public.add_ons (id, name, price, period, description, icon_name) VALUES
('pt-pack', 'Personal Training Pack', '$280', '/ 4 sessions', '4 x 60-minute 1-on-1 technical sessions focused on barbell mechanics, mobility, or competition prep.', 'Dumbbell'),
('nutrition-coaching', 'Nutrition Coaching (Standalone)', '$89', '/ month', 'Personalized macro targets, weekly check-ins, and body composition tracking without a full gym membership.', 'Salad'),
('recovery-lounge', 'Recovery Lounge Access', '$49', '/ month', 'Unlimited access to infrared sauna, cold plunge tubs, and Normatec compression gear.', 'Sparkles')
ON CONFLICT (id) DO NOTHING;

-- 6. SEED FAQS
INSERT INTO public.faqs (id, question, answer) VALUES
('faq-cancel', 'Can I cancel or pause my membership at any time?', 'Absolutely. All Forge Athletics memberships operate on a transparent month-to-month basis with zero long-term contracts. You can pause or cancel your membership with 7 days’ written notice prior to your next billing date.'),
('faq-experience', 'Do I need previous CrossFit or weightlifting experience to join?', 'Not at all. Every class workout is scalable to your current fitness level and coached in real time. If you are brand new to barbell training, our Foundations track ensures you learn movement mechanics safely and comfortably.'),
('faq-annual', 'How does annual billing work and what are the savings?', 'Choosing annual billing locks in a discounted monthly rate (~15-20% off the standard monthly price) billed upfront as an annual payment. You enjoy full membership privileges and price lock protection.'),
('faq-dropin', 'What is your drop-in policy for out-of-town visitors?', 'Traveling athletes are always welcome! You can purchase a $25 single drop-in pass online. Pass is valid for any scheduled class slot on the timetable within 30 days of purchase.'),
('faq-trial', 'Can I try a class before buying a membership?', 'Yes! First-time local residents can claim a 100% free trial class. Click "Claim Free Trial" anywhere on the site to pick your day and time.')
ON CONFLICT (id) DO NOTHING;

-- 7. SEED TRANSFORMATIONS
INSERT INTO public.transformations (id, name, goal_type, timeframe_weeks, quote, full_story, start_stat, end_stat) VALUES
('alex-r', 'Alex R.', 'strength', 16, 'Down 30lbs and deadlifting 2x what I started with. The programming just works.', 'Alex came in with a gym background but had never touched a barbell with any real structure. Sixteen weeks of Forge programming changed that completely. The combination of Foundations classes to nail his movement pattern and WOD programming to build conditioning gave him the base he''d been missing for years. He''s now one of the strongest athletes in the 6am class and coaching newer members on their first deadlifts.', 'Deadlift: 135 lbs', 'Deadlift: 295 lbs'),
('priya-m', 'Priya M.', 'strength', 12, 'First pull-up ever, at 41. I genuinely never thought I''d get here.', 'Priya signed up after her doctor recommended strength training to improve bone density. She had never trained in a gym before and was intimidated by the barbell work. After three months of consistent Foundations and WOD classes, she hit her first unassisted pull-up during a Saturday team workout. She says that moment is still her proudest athletic achievement. She''s now working toward five consecutive reps.', 'Pull-ups: 0 (band-assisted)', 'Pull-ups: 3 unassisted'),
('devon-k', 'Devon K.', 'flexibility', 24, 'Rebuilt my knee strength after surgery. The coaches scaled everything perfectly — I never felt rushed.', 'Devon returned to training 8 months post ACL reconstruction with a lot of anxiety about re-injury. Elena and Marcus built a 6-month phased approach: the first two months were entirely Mobility & Recovery classes to re-establish joint range and proprioception, then a gradual WOD re-introduction with modified loading. Devon completed his first unmodified WOD in month five and hasn''t looked back.', 'Squat depth: parallel only', 'Squat depth: full (below parallel)'),
('lena-t', 'Lena T.', 'endurance', 10, 'More energy at 6am than I had all day before joining. I thought I was just a night person.', 'Lena joined primarily for stress management after a job change — she wasn''t expecting the physical transformation. Ten weeks of 4am alarm clocks and 6am classes later, her resting heart rate had dropped 11 bpm, she''d shaved 4 minutes off her mile time, and she was sleeping through the night for the first time in years. She now helps open the gym three mornings a week as a volunteer.', 'Mile time: 11:40', 'Mile time: 7:22'),
('marcus-d', 'Marcus D.', 'weight-loss', 20, 'Lost 28lbs without ever feeling like I was on a diet. The nutrition coaching changed how I think about food.', 'Marcus joined on a friend''s recommendation with no athletic background whatsoever. He paired two WOD classes per week with Dana''s standalone nutrition coaching from month one — not for calorie restriction, but to understand how food fueled his training. The weight loss was almost incidental. What surprised him was the strength gain alongside it: he''s now consistently lifting weights he thought were impossible when he started.', NULL, NULL),
('sophie-w', 'Sophie W.', 'endurance', 18, 'Finished my first half-marathon. I started here not being able to run a full kilometre without stopping.', 'Sophie came to Forge specifically to improve her running capacity for a charity half-marathon. Alex''s Endurance programming ran alongside two WOD sessions per week for 18 weeks. She finished the half in 2:07 — ahead of her 2:15 target. What she didn''t expect was the upper-body strength she built as a byproduct of the WOD programming, which she now credits for helping her posture and running economy in the second half of the race.', 'Half-marathon: DNF (training)', 'Half-marathon: 2:07:34'),
('james-p', 'James P.', 'strength', 30, 'Went from hobbyist to competing in my first local throwdown. The coaching here is genuinely elite.', 'James had been doing CrossFit-style workouts at home for two years but had never been coached on his barbell mechanics. His first Olympic Lifting session with Sara revealed every compensatory pattern he''d built up. Thirty weeks later — with consistent Oly and WOD attendance — he competed in a local affiliate throwdown and placed 14th in the scaled division. He''s already targeting the next event in his age group.', 'Clean & Jerk: 65 kg', 'Clean & Jerk: 92 kg'),
('nadia-k', 'Nadia K.', 'flexibility', 14, 'Chronic shoulder tightness I''d had for 3 years cleared up inside 2 months. I wish I''d found this place sooner.', 'Nadia had been managing chronic upper-back and shoulder tightness from a desk job for three years — physiotherapy had helped but the gains always reversed when she stopped going. Elena''s Mobility & Recovery classes gave her a daily movement practice she could sustain. Within 8 weeks the tightness had reduced significantly; by week 14 she had full overhead range for the first time since her twenties, and she''s now added WOD classes on top of the mobility work.', 'Overhead reach: 80% ROM', 'Overhead reach: Full ROM')
ON CONFLICT (id) DO NOTHING;

-- 8. SEED TESTIMONIALS
INSERT INTO public.testimonials (id, name, quote) VALUES
('test-raj', 'Raj S.', 'I was 52 and convinced I was too old for this. Marcus told me to come for one class. That was 14 months ago — I haven''t stopped. The coaches actually know my name, my weaknesses, and my goals. That doesn''t happen at a regular gym.'),
('test-claire', 'Claire O.', 'The community here is real, not performative. When I had a bad week and showed up anyway, three different people noticed and checked in. The workouts are great but it''s the people that make you come back.'),
('test-tom', 'Tom H.', 'I''ve tried four different gyms in the last six years. Forge is the first one where I''ve stuck past the 3-month slump. The programming is always fresh, the coaches catch your form before you hurt yourself, and there''s no ego in the building.'),
('test-yasmin', 'Yasmin F.', 'Joined for the free trial, stayed for 18 months. My blood pressure is down, I sleep better, and I actually look forward to 5:30am now. If you''re on the fence, just take the trial class. You''ll know immediately.')
ON CONFLICT (id) DO NOTHING;
