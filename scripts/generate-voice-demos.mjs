// One-time generator for voice-agent demo MP3s.
// Run: node scripts/generate-voice-demos.mjs
//
// Output layout:
//   public/demos/<industry-slug>/turn-0.mp3 ... turn-8.mp3
//
// Voices (Microsoft Edge multilingual neural — free, no API key):
//   - Agent  -> en-US-AvaMultilingualNeural    (warm female)
//   - Caller -> en-US-AndrewMultilingualNeural (natural male)
//
// IMPORTANT: The seeds and turn template below MUST match
// src/data/voice-demos.ts. If you change the script copy there, re-run this.

import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { createWriteStream, existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDemosDir = resolve(__dirname, "../public/demos");

const VOICES = {
  agent: "en-US-AvaMultilingualNeural",
  caller: "en-US-AndrewMultilingualNeural",
};

// Mirrors src/data/voice-demos.ts build() exactly.
function buildTurns(s) {
  const agent = s.agent || "Ava";
  return [
    { speaker: "agent",  text: `Hi, thank you for calling ${s.biz}! This is ${agent}, how can I help you today?` },
    { speaker: "caller", text: s.callerOpener },
    { speaker: "agent",  text: `Absolutely, I can help with that. ${s.reason}` },
    { speaker: "caller", text: s.detail },
    { speaker: "agent",  text: `Got it. ${s.bookLine}` },
    { speaker: "caller", text: "That works, yeah let's do that." },
    { speaker: "agent",  text: `Perfect, you're all set! ${s.closeLine} Is there anything else I can help with?` },
    { speaker: "caller", text: "No, that's everything. Thanks!" },
    { speaker: "agent",  text: "You're welcome! Have a great day. Goodbye!" },
  ];
}

// Mirrors seeds in src/data/voice-demos.ts — keep in sync.
const seeds = {
  "hvac-companies": { biz: "CoolAir HVAC", callerOpener: "Hey, my AC just stopped working and it's like 95 degrees in here.", reason: "Let me get a few details so we can get a technician out to you as quickly as possible. What's the make and model of your unit if you know it?", detail: "Uh, it's a Carrier unit, maybe 8 years old? It's just blowing warm air.", bookLine: "That sounds like it could be a refrigerant or compressor issue. I have a technician available tomorrow morning between 8 and 10 AM. I'll also send you a text confirmation right now.", closeLine: "I've booked your appointment and you'll get a confirmation text shortly." },
  "roofing-companies": { biz: "Summit Roofing", callerOpener: "Hi, we had a bad storm last night and I think my roof has some damage.", reason: "I'm sorry to hear that. Let me schedule a free inspection for you. Can I get your address?", detail: "Sure, it's 142 Oak Street. I can see some shingles in the yard.", bookLine: "We can have an inspector out tomorrow afternoon. We also work directly with insurance companies if you need to file a claim.", closeLine: "Your inspection is confirmed for tomorrow between 1 and 3 PM." },
  "plumbing-companies": { biz: "Harbor Plumbing", callerOpener: "I've got a pipe leaking under my kitchen sink, it's dripping pretty bad.", reason: "Let's get that taken care of before it causes more damage. Is the water currently shut off to that area?", detail: "No, I'm not sure how to shut it off actually.", bookLine: "No worries — I'd recommend turning the valve under the sink clockwise to stop the flow. I have a plumber available this afternoon between 2 and 4 PM.", closeLine: "You're booked for today between 2 and 4 PM. I've texted you the details." },
  "electricians": { biz: "SparkPro Electric", callerOpener: "A few outlets in my living room stopped working and I'm not sure why.", reason: "That could be a tripped breaker or a wiring issue. Have you checked your breaker panel?", detail: "Yeah, I tried flipping them but nothing changed.", bookLine: "It might be a deeper wiring issue then. I can get an electrician out tomorrow morning at 9 AM for a diagnostic.", closeLine: "Your appointment is set for 9 AM tomorrow." },
  "pest-control-companies": { biz: "ShieldGuard Pest Control", callerOpener: "I'm seeing a lot of ants in my kitchen and they're getting worse.", reason: "I understand how frustrating that is. Can you tell me — are they small black ants or larger ones?", detail: "Small black ones, they seem to be coming from near the window.", bookLine: "That's likely a sugar ant colony. I can schedule a treatment visit for Thursday morning. We'll also do a perimeter inspection.", closeLine: "You're booked for Thursday at 9 AM." },
  "landscaping-businesses": { biz: "GreenScape Landscaping", callerOpener: "I'm looking to get my front yard redesigned with some low maintenance plants.", reason: "We'd love to help with that. We do free design consultations. What's your approximate yard size?", detail: "It's maybe 800 square feet. I want something that looks good but doesn't need constant watering.", bookLine: "Perfect — drought tolerant designs are our specialty. I can schedule a consultation for Saturday morning at 10.", closeLine: "Your design consultation is confirmed for Saturday at 10 AM." },
  "pool-service-companies": { biz: "ClearWave Pools", callerOpener: "I need to schedule my pool opening for the season.", reason: "Great timing — we're booking spring openings now. What type of pool do you have?", detail: "It's an in ground vinyl, about 20 by 40.", bookLine: "I have availability next Wednesday. We'll remove the cover, check the equipment, balance the chemicals, and get it swim ready.", closeLine: "Your pool opening is set for next Wednesday morning." },
  "moving-companies": { biz: "SwiftMove Co.", callerOpener: "I need a quote for moving a 2-bedroom apartment across town.", reason: "I can help with that. When are you looking to move?", detail: "May 15th ideally. It's a second floor walk up, no elevator.", bookLine: "Got it. Based on a 2-bedroom walk up, local moves typically run between $600 and $900. I can schedule an in person estimate for this Friday to give you an exact quote.", closeLine: "Your estimate visit is booked for Friday at 11 AM." },
  "flooring-contractors": { biz: "Premier Floors", callerOpener: "I'm interested in getting hardwood floors installed in my living room.", reason: "We'd be happy to help. Do you have a preference on wood type — oak, maple, or engineered?", detail: "I'm thinking engineered hardwood. The room is about 400 square feet.", bookLine: "Engineered is a great choice for durability. I can schedule a free measurement and consultation for this Saturday.", closeLine: "Your consultation is set for Saturday at 2 PM." },
  "window-door-companies": { biz: "ClearView Windows", callerOpener: "I need to replace about 8 windows in my house. They're old and drafty.", reason: "We can definitely help with that. Are these standard size double hung windows?", detail: "Yes, mostly. A couple are bay windows though.", bookLine: "I can schedule a free in home measurement and estimate. Our consultant can show you energy efficient options that'll lower your bills too.", closeLine: "Your in home consultation is scheduled for next Tuesday at 10 AM." },
  "solar-installers": { biz: "SunPeak Solar", callerOpener: "I'm curious about getting solar panels. My electric bill is over $300 a month.", reason: "With that usage, you're a great candidate for solar. Do you own your home and know your roof age?", detail: "Yes, I own it. Roof is about 5 years old, south facing.", bookLine: "Perfect setup. I can schedule a free site survey where we'll design your system and show you the exact savings and payback period.", closeLine: "Your free site survey is booked for next Monday at 1 PM." },
  "home-remodeling-companies": { biz: "Atlas Remodeling", callerOpener: "I want to remodel my kitchen. Looking for new cabinets, countertops, the works.", reason: "Kitchen remodels are our specialty. Do you have a rough budget range in mind?", detail: "Somewhere around $40K to $50K. I want quartz counters and soft close cabinets.", bookLine: "That's a great budget for a full kitchen transformation. I can set up a design consultation where we'll walk through materials, layout options, and timeline.", closeLine: "Your design consultation is scheduled for Saturday at 11 AM." },
  "painting-contractors": { biz: "FreshCoat Painting", callerOpener: "I need the exterior of my house painted. It's a two story colonial.", reason: "We do a lot of exterior work. When were you hoping to have it done?", detail: "Before summer if possible. The paint is peeling in a few spots.", bookLine: "We can fit you in this month. I'll schedule a free estimate where we'll assess prep work needed and go over color options.", closeLine: "Your estimate is booked for this Thursday at 3 PM." },
  "cleaning-services": { biz: "SparkleClean Services", callerOpener: "I need a deep cleaning for my house. We're hosting a party next weekend.", reason: "We can absolutely help with that! How many bedrooms and bathrooms?", detail: "It's a 4-bed, 3-bath. About 2,500 square feet.", bookLine: "For a deep clean of that size, I can schedule a team for next Thursday so everything is spotless before your party.", closeLine: "Your deep cleaning is booked for Thursday at 9 AM." },
  "dental-clinics": { biz: "Riverstone Dental", callerOpener: "I need to schedule a cleaning. I think I'm overdue by a few months.", reason: "No problem at all, let's get you back on track! Are you an existing patient with us?", detail: "Yes, my last visit was about 8 months ago. Name is Sarah Mitchell.", bookLine: "Hi Sarah! I can see your file. I have openings next Tuesday at 10 AM or Wednesday at 2 PM. Which works better?", closeLine: "You're all set for Tuesday at 10 AM. We'll send you a reminder the day before." },
  "med-spas": { biz: "Glow Med Spa", callerOpener: "Hi, I'm interested in Botox. I've never had it done before.", reason: "Welcome! A lot of our first time clients start with a complimentary consultation so we can assess your goals. Would you like to schedule one?", detail: "Yes please. I'm mainly concerned about my forehead lines.", bookLine: "Our aesthetician can go over all options during the consultation. I have availability this Friday at 11 AM.", closeLine: "Your consultation is confirmed for Friday at 11 AM. I'll text you some pre visit info." },
  "chiropractic-offices": { biz: "AlignWell Chiropractic", callerOpener: "My lower back has been killing me for about two weeks now.", reason: "I'm sorry to hear that. Have you seen a chiropractor before, or would this be your first visit?", detail: "First time. I think it might be from sitting at my desk all day.", bookLine: "That's very common. Our new patient visit includes a full assessment and your first adjustment. I can get you in tomorrow at 4 PM.", closeLine: "You're booked for tomorrow at 4 PM. Please arrive 10 minutes early to fill out intake forms." },
  "plastic-surgery-centers": { biz: "Elevate Aesthetics", callerOpener: "I'm considering a rhinoplasty and wanted to learn about the process.", reason: "Of course. Our board certified surgeon does complimentary consultations where you can discuss your goals and see digital imaging of potential results.", detail: "That sounds great. How long is the typical recovery?", bookLine: "Most patients are back to normal activities in about 10 to 14 days. I can schedule your consultation for next Wednesday.", closeLine: "Your consultation with Dr. Chen is set for next Wednesday at 2 PM." },
  "physical-therapy-clinics": { biz: "ActiveMotion PT", callerOpener: "I just had knee surgery and my doctor referred me for physical therapy.", reason: "Congratulations on getting the surgery done! We specialize in post surgical rehab. Do you have your referral and insurance info handy?", detail: "Yes, I have Blue Cross. My surgeon is Dr. Williams.", bookLine: "We're in network with Blue Cross. I can start your evaluation this Thursday at 9 AM so we can get your recovery moving.", closeLine: "Your initial evaluation is scheduled for Thursday at 9 AM." },
  "urgent-care-clinics": { biz: "QuickCare Clinic", callerOpener: "My daughter fell at school and her wrist is really swollen. Can we come in?", reason: "Absolutely, we can see her right away. We have X-ray capabilities on site. How old is she?", detail: "She's 9. It happened about an hour ago.", bookLine: "Bring her in now — our current wait time is about 15 minutes. I'll let the team know you're coming.", closeLine: "We're expecting you shortly. The clinic is open until 8 PM tonight." },
  "optometry-offices": { biz: "VisionFirst Eye Care", callerOpener: "I think I need a new glasses prescription. Things are getting blurry at night.", reason: "Night vision changes can definitely indicate a prescription update. When was your last eye exam?", detail: "Probably two years ago. I also want to try contact lenses this time.", bookLine: "We can do a comprehensive exam and contact lens fitting in the same visit. How about next Monday at 3 PM?", closeLine: "You're booked for Monday at 3 PM. Bring your current glasses if you can." },
  "pharmacy-chains": { biz: "WellRx Pharmacy", callerOpener: "I need to transfer a prescription from another pharmacy.", reason: "I can help with that! Do you have the prescription number or the name and dosage of the medication?", detail: "It's Lisinopril, 10mg. Currently at CVS on Main Street.", bookLine: "I'll start the transfer now. It usually takes about 2 to 4 hours. I'll text you when it's ready for pickup.", closeLine: "The transfer is in progress. You'll get a text when it's ready." },
  "orthodontic-offices": { biz: "SmileLine Orthodontics", callerOpener: "My son is 12 and his dentist recommended he see an orthodontist.", reason: "That's a great age to start! We offer a complimentary initial evaluation with digital scanning — no messy impressions. Would you like to schedule?", detail: "Yes, please. He's nervous about getting braces.", bookLine: "Totally normal! We also offer clear aligners for teens. The evaluation will help us recommend the best option. How about next Tuesday after school, at 3:30?", closeLine: "His evaluation is set for Tuesday at 3:30 PM." },
  "law-firms": { biz: "Hartwell Law Group", callerOpener: "I was in a car accident last week and I think I need a lawyer.", reason: "I'm sorry to hear about your accident. We offer free case consultations. Were you the driver, and was anyone else injured?", detail: "Yes, I was driving. I have some back pain and the other driver was at fault.", bookLine: "That's definitely something our personal injury team can evaluate. I can schedule a free consultation with an attorney for tomorrow at 2 PM.", closeLine: "Your free consultation is booked for tomorrow at 2 PM. Bring any police reports or medical records you have." },
  "real-estate-agencies": { biz: "Keystone Realty", callerOpener: "I'm looking to buy a 3-bedroom house in the downtown area.", reason: "Great choice — downtown inventory has been moving fast. Do you have pre approval yet?", detail: "Yes, I'm pre approved up to $450K. I need a yard for my dog.", bookLine: "I have a few properties that match. I can schedule you with one of our agents for a showing tour this Saturday.", closeLine: "Your showing tour is confirmed for Saturday at 10 AM with agent Michael Torres." },
  "mortgage-brokers": { biz: "PrimeRate Mortgage", callerOpener: "I want to refinance my home. My current rate is 6.5%.", reason: "With current rates, you could potentially save significantly. Do you know your approximate home value and remaining balance?", detail: "Home is worth about $380K, I owe around $280K.", bookLine: "With that equity position, you have great options. I can run the numbers and have a loan officer call you with scenarios. When's a good time?", closeLine: "Your callback is scheduled for tomorrow at 11 AM with our senior loan officer." },
  "insurance-agencies": { biz: "ShieldPoint Insurance", callerOpener: "I just bought a new car and need to add it to my policy.", reason: "Congratulations on the new car! I can update your policy right now. What's the year, make, and model?", detail: "It's a 2025 Honda CR-V. I picked it up yesterday.", bookLine: "Nice choice! I'll add it to your policy effective yesterday. Your premium will adjust by about $45 per month. I'll send the updated declaration page to your email.", closeLine: "Your policy is updated and the new declaration page is on its way to your email." },
  "accounting-firms": { biz: "Precision Accounting", callerOpener: "I need help filing my business taxes. I have an LLC.", reason: "We work with a lot of LLC owners. Is this for the current tax year, and do you have your books up to date?", detail: "Current year. My bookkeeping is mostly done in QuickBooks but I need someone to review it.", bookLine: "We can do a review and file for you. I'll set up a meeting with one of our CPAs who specializes in small business returns.", closeLine: "Your meeting is scheduled for Monday at 10 AM with CPA Jennifer Walsh." },
  "tax-preparation-firms": { biz: "TaxReady Pro", callerOpener: "I need to file my taxes. I have W-2s and some freelance income.", reason: "Having both W-2 and freelance income means we can likely find you some good deductions. Do you have your 1099s ready?", detail: "Yes, I have two 1099s and some business expense receipts.", bookLine: "Great, bring everything in and we'll make sure you maximize your return. I have an appointment this Thursday at 5 PM.", closeLine: "You're set for Thursday at 5 PM. I'll email you a checklist of documents to bring." },
  "title-companies": { biz: "Cornerstone Title", callerOpener: "I'm a real estate agent and I need to order title for a closing next month.", reason: "I'd be happy to help. Can you provide the property address and expected closing date?", detail: "Sure, it's 88 Elm Drive. Closing is set for May 20th.", bookLine: "I'll start the title search today. We can typically have the commitment ready within 5 to 7 business days. I'll keep you updated via email.", closeLine: "Title search is initiated. You'll receive the commitment by next Wednesday." },
  "staffing-agencies": { biz: "TalentBridge Staffing", callerOpener: "I need to fill three warehouse positions ASAP.", reason: "We can move quickly on warehouse roles. Are these temp, temp to hire, or direct placement?", detail: "Temp to-hire. Need forklift certified if possible.", bookLine: "We have several forklift certified candidates ready. I can send profiles over today and have people starting by Monday if approved.", closeLine: "I'll email you three candidate profiles by end of day today." },
  "nail-salons": { biz: "LuxeNails Studio", callerOpener: "Hi, I want to book a gel manicure for Saturday.", reason: "Of course! Do you have a preferred time and technician?", detail: "Anytime in the morning. I usually see Kim.", bookLine: "Kim has a 10:30 AM slot available on Saturday. Should I book that for you?", closeLine: "You're booked with Kim for Saturday at 10:30 AM." },
  "hair-salons": { biz: "Blush Hair Studio", callerOpener: "I need a cut and color. My roots are really showing.", reason: "We can get you looking fresh! Do you have a stylist you usually see, or would you like a recommendation?", detail: "I'm new — just moved to the area. I have medium length hair and want a balayage.", bookLine: "I'd recommend our stylist Mia — she's amazing with balayage. She has an opening Wednesday at 1 PM.", closeLine: "You're booked with Mia for Wednesday at 1 PM. Welcome to the neighborhood!" },
  "tattoo-studios": { biz: "InkCraft Studio", callerOpener: "I want to get a half sleeve tattoo. Do you do consultations?", reason: "Absolutely! Our artists do free consultations to discuss your vision, placement, and style. Do you have any reference images?", detail: "Yeah, I want a Japanese style koi fish and waves. I have some Pinterest ideas.", bookLine: "Perfect — our artist Kai specializes in Japanese traditional. I can book your consultation for this Friday at 4 PM. Bring your reference images.", closeLine: "Your consultation with Kai is set for Friday at 4 PM." },
  "gyms-fitness-studios": { biz: "Apex Fitness", callerOpener: "I'm interested in joining. Do you offer trial memberships?", reason: "We do! We offer a free 7-day trial pass so you can try our classes and equipment. Would you like to schedule an intro tour?", detail: "Yes, I'm mainly interested in weight training and maybe some group classes.", bookLine: "We have a great strength program and our group classes include HIIT, spin, and yoga. I can schedule your tour and trial start for tomorrow at 6 PM.", closeLine: "Your tour is set for tomorrow at 6 PM. I'll text you directions and what to bring." },
  "spa-wellness-centers": { biz: "Serenity Day Spa", callerOpener: "I'd like to book a couples massage for our anniversary.", reason: "How lovely! Happy anniversary! We have 60-minute and 90-minute couples sessions available. Any preference?", detail: "The 90-minute one sounds perfect. We'd like it next Saturday.", bookLine: "I have a 2 PM slot available next Saturday for the 90-minute couples massage. It includes aromatherapy and hot towels.", closeLine: "Your couples massage is booked for Saturday at 2 PM. Would you like to add a champagne package?" },
  "restaurants": { biz: "The Olive Table", callerOpener: "I'd like to make a reservation for 6 people this Friday night.", reason: "Friday is popular but let me check! Do you have a preferred time?", detail: "Around 7:30 if possible. And one person has a gluten allergy.", bookLine: "I have a 7:30 table available on the patio or indoors. I'll note the gluten allergy so the chef can prepare accordingly.", closeLine: "Your reservation for 6 is confirmed for Friday at 7:30 PM. We'll have gluten free options ready." },
  "wedding-planners": { biz: "Bliss Wedding Co.", callerOpener: "We just got engaged and we're looking for a wedding planner.", reason: "Congratulations! We'd love to help make your day perfect. Do you have a date or venue in mind yet?", detail: "We're thinking next October. Maybe 120 guests. We don't have a venue yet.", bookLine: "October is beautiful for weddings. I'd love to set up a free consultation to discuss your vision, budget, and venue options.", closeLine: "Your consultation is booked for this Sunday at 11 AM. Congratulations again!" },
  "photography-studios": { biz: "LensCraft Studios", callerOpener: "I need a family portrait session. We want outdoor shots.", reason: "Family sessions are one of our favorites! How many people will be in the shoot?", detail: "Five of us — two adults, three kids under 10.", bookLine: "We have a gorgeous park location we love for families. Golden hour sessions look amazing. How about next Sunday at 5 PM?", closeLine: "Your family session is booked for Sunday at 5 PM. I'll send styling tips and location details." },
  "event-venues": { biz: "The Grand Hall", callerOpener: "I'm looking for a venue for a corporate holiday party. About 200 people.", reason: "We host corporate events regularly and can accommodate 200 easily. Do you have a date in mind?", detail: "December 14th, ideally. We'd need catering and a bar setup too.", bookLine: "December 14th is currently open! We offer full service event packages including catering and bar. I'd love to schedule a venue tour.", closeLine: "Your venue tour is booked for this Thursday at 2 PM." },
  "catering-companies": { biz: "Savory Events Catering", callerOpener: "I need catering for a company retreat. About 75 people.", reason: "We'd love to help! Is this a full day event, or just lunch service?", detail: "Full day — breakfast, lunch, and afternoon snacks. Some vegetarian and vegan guests too.", bookLine: "We have great all day packages with dietary accommodations built in. I can email you a custom proposal today and set up a tasting.", closeLine: "I'll have the proposal in your inbox by end of day. Your tasting is set for next Monday." },
  "auto-dealerships": { biz: "Premier Auto Group", callerOpener: "I'm interested in the 2025 Civic you have listed online.", reason: "Great choice! That one is still available. Are you looking to buy or lease?", detail: "Probably finance. I've got about $5K for a down payment.", bookLine: "With $5K down, you'd be looking at very competitive monthly payments. I can schedule a test drive and have our finance team run numbers for you.", closeLine: "Your test drive is set for tomorrow at 4 PM. Ask for sales advisor Derek." },
  "car-rental-agencies": { biz: "DriveNow Rentals", callerOpener: "I need to rent an SUV for a week starting next Monday.", reason: "Let me check availability. Will this be for local driving or are you traveling out of state?", detail: "Road trip up the coast. I'll need unlimited mileage.", bookLine: "I have a 2025 Toyota RAV4 available with unlimited mileage at $59 per day. Would you like to add insurance coverage?", closeLine: "Your SUV rental is confirmed for next Monday. Pick up anytime after 8 AM." },
  "auto-body-shops": { biz: "ProFinish Auto Body", callerOpener: "Someone hit my car in a parking lot. I need the rear bumper and taillight fixed.", reason: "Sorry to hear that. Do you have the other driver's insurance info, or will this go through yours?", detail: "I have their info. They left a note thankfully.", bookLine: "That makes it easier. Bring the car in for a free estimate and we'll handle the insurance coordination for you.", closeLine: "Your estimate appointment is set for tomorrow at 9 AM. Bring the insurance info and photos if you have them." },
  "veterinary-clinics": { biz: "Pawsome Vet Clinic", callerOpener: "My dog has been limping since yesterday. Can I bring him in?", reason: "Of course, let's get him checked out. Has he been eating and drinking normally?", detail: "Yeah, eating fine. He just won't put weight on his front right paw.", bookLine: "It could be a sprain or something in the paw pad. We can see him today at 3 PM for an exam.", closeLine: "Your appointment is confirmed for 3 PM today. We'll take great care of him." },
  "tutoring-centers": { biz: "BrightMinds Tutoring", callerOpener: "My daughter is struggling with algebra and has a test next week.", reason: "We can definitely help! What grade is she in, and is she currently taking Algebra 1 or 2?", detail: "8th grade, Algebra 1. She's having trouble with equations.", bookLine: "Our math specialist Sarah is excellent with Algebra 1 foundations. I can schedule two sessions before her test — tomorrow and Thursday.", closeLine: "Both sessions are booked. Tomorrow at 4 PM and Thursday at 4 PM with Sarah." },
  "daycare-centers": { biz: "Sunshine Daycare", callerOpener: "I'm looking for full time daycare for my 2-year old.", reason: "We have a wonderful toddler program! Our class sizes are small with a 4-to-1 child to teacher ratio. Would you like to schedule a tour?", detail: "Yes, and I'd need to start in about 3 weeks. Do you have openings?", bookLine: "We do have one spot opening up in our toddler room! I'd recommend touring this week to secure it.", closeLine: "Your tour is scheduled for Wednesday at 10 AM. I'll have an enrollment packet ready for you." },
  "senior-care-facilities": { biz: "Golden Oaks Senior Living", agent: "Grace", callerOpener: "I'm looking into assisted living options for my mother. She's 82.", reason: "I understand, and I'm here to help you find the right fit. Is your mother currently living independently?", detail: "She is, but she's had a couple of falls recently and we're worried about her safety.", bookLine: "Your mother's safety is our top priority too. We'd love to have you and your mother visit for a tour so she can see the community and meet our care team.", closeLine: "Your tour is scheduled for Saturday at 11 AM. Take your time — there's no pressure." },
  "dog-grooming-boarding": { biz: "Happy Tails Grooming", callerOpener: "I need to book grooming for my golden retriever. He's really matted.", reason: "Poor guy! We'll get him looking great. How long has it been since his last grooming?", detail: "Probably 4 months. He needs a bath, cut, and nail trim.", bookLine: "For a golden that matted, I'd recommend our full spa package which includes deshedding. I have an opening Thursday at 11 AM.", closeLine: "He's booked for Thursday at 11 AM. Please make sure his vaccinations are current — just email us the records." },
  "funeral-homes": { biz: "Evergreen Memorial", agent: "Grace", callerOpener: "I... I need to make arrangements for my father. He passed this morning.", reason: "I'm so sorry for your loss. Please know we're here to support you through every step. Would you like to come in today to begin making arrangements?", detail: "Yes, if possible. My sister will be with me.", bookLine: "Of course. I have our director available at 2 PM today. We'll guide you through everything at your pace.", closeLine: "We'll see you and your sister at 2 PM. Please don't hesitate to call if you need anything at all before then." },
};

async function synth(voice, text, outPath, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const tts = new MsEdgeTTS();
    try {
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(text);
      await new Promise((resolveP, rejectP) => {
        const file = createWriteStream(outPath);
        audioStream.on("data", (chunk) => file.write(chunk));
        audioStream.on("end", () => { file.end(); resolveP(); });
        audioStream.on("error", (err) => { file.end(); rejectP(err); });
      });
      tts.close();
      return;
    } catch (err) {
      try { tts.close(); } catch {}
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
}

async function pool(items, concurrency, worker) {
  const queue = items.slice();
  const running = new Set();
  let completed = 0;
  const total = items.length;

  const next = () => {
    if (queue.length === 0) return null;
    const item = queue.shift();
    const p = (async () => {
      try {
        await worker(item);
      } finally {
        completed++;
        if (completed % 20 === 0 || completed === total) {
          process.stdout.write(`  progress: ${completed}/${total}\n`);
        }
        running.delete(p);
      }
    })();
    running.add(p);
    return p;
  };

  while (queue.length > 0 || running.size > 0) {
    while (running.size < concurrency && queue.length > 0) next();
    if (running.size > 0) await Promise.race(running);
  }
}

async function main() {
  const slugs = Object.keys(seeds);
  console.log(`Building task list for ${slugs.length} industries...`);

  const tasks = [];
  for (const slug of slugs) {
    const turns = buildTurns(seeds[slug]);
    const dir = resolve(publicDemosDir, slug);
    await mkdir(dir, { recursive: true });
    turns.forEach((t, i) => {
      const outPath = resolve(dir, `turn-${i}.mp3`);
      if (existsSync(outPath)) return; // skip if already generated
      tasks.push({
        outPath,
        voice: t.speaker === "agent" ? VOICES.agent : VOICES.caller,
        text: t.text,
        slug,
        turnIndex: i,
      });
    });
  }

  console.log(`Generating ${tasks.length} audio files (concurrency 4)...`);
  const start = Date.now();
  await pool(tasks, 4, async (task) => {
    try {
      await synth(task.voice, task.text, task.outPath);
    } catch (err) {
      console.error(`  FAILED ${task.slug}/turn-${task.turnIndex}: ${err.message}`);
    }
  });
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\nDone in ${elapsed}s. Output: ${publicDemosDir}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
