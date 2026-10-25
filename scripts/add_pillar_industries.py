import json

with open('src/data/industries.ts', 'r', encoding='utf-8') as f:
    content = f.read()

pillar_industries = [
    {
        "slug": "plumbers-hvac-trades",
        "name": "Plumbers, HVAC & Trade Businesses",
        "metaTitle": "AI Receptionist for Plumbers & HVAC Trades",
        "metaDescription": "Never lose a call-out again. Deploy 24/7 AI answering for plumbers, HVAC, and trades that triages emergencies, captures addresses, and books site visits.",
        "category": "Home Services & Contractors",
        "headline": "You're under a sink or up a ladder when the phone rings. We make sure the job lands in your diary, not a competitor's.",
        "summary": "Trade customers call in a crisis and ring until someone answers. DigitalX equips trade businesses with an AI receptionist that answers every call in under 500ms, screens emergencies, collects job addresses, and syncs directly with ServiceTitan, Jobber, or Google Calendar.",
        "niches": [
            "Emergency Plumbing & Drainage",
            "Residential & Commercial HVAC",
            "Electrical Contractors",
            "Hot Water System Specialists",
            "Roofing & Storm Damage Repairs"
        ],
        "painPoints": [
            "Losing $1,500+ emergency hot water and sewer repairs because hands are on tools",
            "Voicemails left after hours that go unlistened to while callers book the next tradie in Google",
            "Wasting technician billable time answering phone calls about service areas or pricing estimates",
            "Double-booking or missed technician dispatch details due to handwritten carbon notes in the van"
        ],
        "playbook": [
            "Sub-500ms streaming neural voice answers inbound calls in an authentic Aussie or US trade tone",
            "Intelligent emergency triage: active flooding or gas leaks escalate instantly to the on-call technician",
            "Automated address, job scope, and gate code capture with instant SMS upload link for job photos",
            "Direct calendar and dispatch sync into Jobber, ServiceTitan, Housecall Pro, or GoHighLevel",
            "Instant missed-call text-back triggers in under 30 seconds for any dropped or busy call"
        ],
        "relatedSolutionSlugs": [
            "ai-voice-receptionists",
            "missed-call-text-back",
            "gohighlevel-implementation",
            "n8n-workflow-automation"
        ],
        "intakeArchitecture": {
            "emergencyCriteria": "Burst pipes with active flooding, gas odors, no hot water in winter, or complete air conditioning condenser failure during heatwaves (>35°C / 95°F).",
            "dispatchProtocol": "Immediate ring-group transfer to on-call duty plumber mobile. If unanswered within 18 seconds, sends high-priority SMS alert with caller audio, transcription, and GPS address pin.",
            "intakeSteps": [
                {
                    "name": "Instant Sub-500ms Telephony Pickup",
                    "text": "Call connects immediately without robotic hold chimes. AI greets caller with company name and confirms service location."
                },
                {
                    "name": "Emergency Triage & Safety Guidance",
                    "text": "Detects emergency keywords (e.g. 'water leaking through ceiling') and advises caller on main water shutoff while alerting on-call tech."
                },
                {
                    "name": "Job Scope & Address Extraction",
                    "text": "Captures customer full name, street address, problem description, and sends automated SMS photo-upload link."
                },
                {
                    "name": "Live Dispatch Sync & Confirmation SMS",
                    "text": "Inserts unassigned job ticket into ServiceTitan or Jobber and texts caller confirmation with 2-hour arrival window."
                }
            ]
        },
        "softwareIntegrations": {
            "primaryCrms": ["GoHighLevel", "ServiceTitan", "Jobber", "Housecall Pro", "Fergus"],
            "fieldSoftware": ["ServiceM8", "SimPRO", "Tradify", "Buildxact"],
            "telephony": ["Twilio SIP Trunking", "Telstra / Optus Number Forwarding", "Verizon / AT&T Call Forwarding"]
        },
        "complianceAndStandards": {
            "usRegulations": "FCC TCPA and CTIA 10DLC A2P compliant messaging with immediate opt-out keywords (STOP/UNSUBSCRIBE).",
            "auRegulations": "Australian Privacy Principles (Privacy Act 1988) compliant; call recording disclosure enabled per state surveillance devices acts.",
            "dataHandling": "End-to-end encrypted TLS 1.3 telephony audio streams, zero customer data resale, and role-based dispatch access."
        },
        "unitEconomics": {
            "averageJobValue": "$650 - $3,200",
            "monthlyMissedCallsEst": "25 - 60 calls",
            "recoveredRevenueModel": "Recovering just 5 missed emergency jobs per month generates $6,500 - $16,000 in net new monthly revenue.",
            "roiMultiple": "4.8x - 12x return on investment"
        },
        "faqs": [
            {
                "question": "Can the AI handle urgent emergency plumbing call-outs after hours?",
                "answer": "Yes. The AI voice agent distinguishes active emergencies (such as burst water mains or gas leaks) from routine requests (like quoting a mixer tap replacement). When an emergency is detected, it asks the caller for safety status, collects their exact address, and immediately warm-transfers to your on-call plumber's mobile or fires a high-priority SMS alert with the recording attached."
            },
            {
                "question": "Does it integrate with ServiceTitan or Jobber?",
                "answer": "Yes. We connect the AI voice agent directly to ServiceTitan, Jobber, Housecall Pro, or Fergus via native APIs. As soon as the call ends, a new customer record, service address, and unassigned work order appear on your dispatch board without manual double-entry."
            },
            {
                "question": "Do I need to change my current business phone number on my vans and website?",
                "answer": "No. You keep your existing business telephone number. We configure carrier call forwarding so your phone rings on your mobile first, and if you are on the tools or unavailable after 3 rings, the call seamlessly forwards to your AI receptionist."
            },
            {
                "question": "What if the customer wants to speak to a real person?",
                "answer": "If a caller says 'I want to speak to a person' or asks for you by name, the AI politely confirms their inquiry and attempts a warm live transfer to your mobile, or notes their urgent request and texts you their contact details instantly."
            }
        ]
    },
    {
        "slug": "medical-dental-clinics",
        "name": "Medical & Dental Clinics",
        "metaTitle": "AI Receptionist for Dentists & Medical Clinics",
        "metaDescription": "24/7 patient booking and after-hours emergency triage for dental and healthcare clinics. Connects to Cliniko, Dentrix, and Google Calendar across AU & USA.",
        "category": "Healthcare & Medical",
        "headline": "While your front desk checks in patients and handles claims, phones ring off the hook. We capture every patient booking 24/7.",
        "summary": "Medical and dental practices lose thousands in patient lifetime value when prospective patients hit busy signals or after-hours voicemail. DigitalX deploys compliant AI receptionists that answer inquiries in natural professional tones, triage dental emergencies, and book appointments directly into practice management systems.",
        "niches": [
            "General & Cosmetic Dentistry",
            "Orthodontic Practices",
            "Allied Health & Physiotherapy",
            "Medical Centers & GP Clinics",
            "Dermatology & Skin Clinics"
        ],
        "painPoints": [
            "Front desk staff overwhelmed during 8:00 AM - 10:30 AM morning arrival rushes",
            "Losing high-value implant, cosmetic, and orthodontic inquiries to voicemail after 5:00 PM",
            "High patient no-show rates due to lack of automated SMS reminders and confirmation workflows",
            "Patient frustration when trying to reschedule or check opening hours over the weekend"
        ],
        "playbook": [
            "Empathetic professional neural voice answers patient calls 24/7 with zero hold times",
            "Clinical triage: distinguishes acute severe toothaches or post-op complications from routine cleanings",
            "Direct calendar integration into Cliniko, Dentrix, or practice booking systems",
            "Automated pre-appointment SMS confirmations and new patient digital intake forms",
            "Two-way SMS text-back recovering missed calls within 30 seconds"
        ],
        "relatedSolutionSlugs": [
            "ai-voice-receptionists",
            "missed-call-text-back",
            "gohighlevel-implementation",
            "hubspot-automation"
        ],
        "intakeArchitecture": {
            "emergencyCriteria": "Severe acute facial swelling, trauma with knocked-out teeth, uncontrolled bleeding post-extraction, or difficulty swallowing/breathing.",
            "dispatchProtocol": "Instructs caller to contact local emergency services (000 in AU / 911 in US) if breathing is compromised, or transfers immediately to clinic emergency on-call practitioner line.",
            "intakeSteps": [
                {
                    "name": "Professional Greeting & Practice Intake",
                    "text": "Warmly greets the patient, identifies existing vs new patient status, and confirms preferred dentist or clinic location."
                },
                {
                    "name": "Symptom Triage & Urgency Check",
                    "text": "Asks clinical triage questions regarding pain level (1-10), duration, swelling, and recent dental procedures."
                },
                {
                    "name": "Real-Time Appointment Slot Booking",
                    "text": "Checks live chair availability, offers earliest matching morning/afternoon slots, and locks the appointment time."
                },
                {
                    "name": "Intake SMS & Calendar Notification",
                    "text": "Sends instant patient SMS confirmation with clinic address, parking notes, and medical history digital intake link."
                }
            ]
        },
        "softwareIntegrations": {
            "primaryCrms": ["Cliniko", "Dentrix", "Curve Dental", "GoHighLevel", "Halaxy"],
            "fieldSoftware": ["PracticePanther", "CorePlus", "Nookal", "Titanium"],
            "telephony": ["Twilio Voice", "GoToConnect", "RingCentral Healthcare", "3CX"]
        },
        "complianceAndStandards": {
            "usRegulations": "HIPAA-compliant data handling architecture with Business Associate Agreement (BAA) safeguards and TLS encrypted call records.",
            "auRegulations": "Adheres strictly to the Australian Privacy Principles (APPs) and Privacy Act 1988 for sensitive health record management.",
            "dataHandling": "Audio recordings stored in regional Australian or US AWS/GCP data centers with automated redaction of payment card details."
        },
        "unitEconomics": {
            "averageJobValue": "$350 - $4,500 (Cleanings up to Full Arch Implants)",
            "monthlyMissedCallsEst": "40 - 90 patient calls",
            "recoveredRevenueModel": "Recovering 12 missed new patient appointments per month adds $18,000 - $35,000 in patient lifetime value.",
            "roiMultiple": "6x - 15x return on monthly retainer"
        },
        "faqs": [
            {
                "question": "Is the AI receptionist compliant with Australian Privacy Principles and US HIPAA?",
                "answer": "Yes. Our telephony and AI infrastructure encrypts all in-transit and at-rest voice data, operates under strict regional data residency rules (Australia or US), and redacts sensitive financial information. We ensure all patient intake complies with the Privacy Act 1988 in Australia and HIPAA standards in the United States."
            },
            {
                "question": "Can the AI book directly into Cliniko or our dental practice software?",
                "answer": "Yes. We integrate directly with Cliniko, Dentrix, Halaxy, and web booking portals. The AI queries chair and practitioner availability in real time, reserves the exact appointment duration, and inputs new patient details without double-booking."
            },
            {
                "question": "How does the AI handle patient dental emergencies?",
                "answer": "The AI is programmed with specific clinical triage protocols. If a caller reports acute facial swelling, severe trauma, or bleeding, it flags the call as high-urgency, offers safety instructions, and immediately routes the patient to your on-call emergency line or advises emergency room care."
            },
            {
                "question": "Can it answer common questions about health funds and private health insurance?",
                "answer": "Yes. We train the AI on your exact accepted health funds (e.g. Bupa, Medibank, HCF in Australia or Delta Dental, MetLife, Cigna in the US), standard payment plans (Afterpay, Zip, SuperCare), and clinic parking or opening hours."
            }
        ]
    },
    {
        "slug": "automotive-workshops",
        "name": "Automotive Workshops & Mechanics",
        "metaTitle": "AI Receptionist for Auto Repair Shops & Mechanics",
        "metaDescription": "Automate auto repair bookings, rego lookups, and missed-call recovery. Hands-free AI phone answering for mechanical workshops and body shops.",
        "category": "Automotive",
        "headline": "Technicians under hoists with grease on their hands can't grab ringing phones. We capture every mechanic booking automatically.",
        "summary": "Independent mechanical workshops and auto repair centers lose valuable logbook services, brake repairs, and diagnostic jobs when phones ring unanswered. DigitalX installs AI receptionists that capture vehicle details, explain diagnostic check-in procedures, reserve bay time, and text customers back under 30 seconds.",
        "niches": [
            "Independent Mechanical Workshops",
            "Auto Body & Smash Repairs",
            "Brake & Transmission Specialists",
            "European & Luxury Auto Specialists",
            "Tyre & Suspension Centers"
        ],
        "painPoints": [
            "Mechanics stopping active vehicle repairs to wipe hands and answer repetitive phone calls",
            "Phone tag trying to obtain vehicle year, make, model, and registration plate numbers",
            "Losing emergency towing or sudden breakdown repair inquiries to competing workshops",
            "Unclear diagnostic expectations causing disputes when customers drop off vehicles"
        ],
        "playbook": [
            "Conversational voice agent answers workshop calls in under 500ms without background hold music",
            "Vehicle intake screening: automatically captures registration, year, make, model, and engine issue description",
            "Diagnostic fee disclosure upfront, setting clear payment expectations before the car arrives at the workshop",
            "Calendar and bay booking into Workshop Software, MechanicDesk, or Google Calendar",
            "Missed-call SMS text-back with direct digital service booking link"
        ],
        "relatedSolutionSlugs": [
            "ai-voice-receptionists",
            "missed-call-text-back",
            "gohighlevel-implementation",
            "n8n-workflow-automation"
        ],
        "intakeArchitecture": {
            "emergencyCriteria": "Vehicle broken down on roadside requiring towing, sudden brake failure, or vehicle smoking/overheating.",
            "dispatchProtocol": "Provides preferred partner towing phone number and texts vehicle drop-off instructions with key-drop box details.",
            "intakeSteps": [
                {
                    "name": "Immediate Workshop Greeting",
                    "text": "Answers caller with shop name and inquires whether they need routine logbook servicing, mechanical repair, or roadside help."
                },
                {
                    "name": "Vehicle Profile & Rego Capture",
                    "text": "Collects vehicle registration/license plate, make, model, year, and specific warning lights or symptoms."
                },
                {
                    "name": "Service Bay Scheduling & Drop-Off Window",
                    "text": "Offers available morning drop-off slots (e.g. 7:30 AM - 8:30 AM) and confirms loan car availability if required."
                },
                {
                    "name": "Automated Booking SMS & Work Order Sync",
                    "text": "Creates work order draft in workshop CRM and texts customer shop address, check-in instructions, and key-drop info."
                }
            ]
        },
        "softwareIntegrations": {
            "primaryCrms": ["GoHighLevel", "Workshop Software", "MechanicDesk", "AutoLeap", "Shop-Ware"],
            "fieldSoftware": ["Mitchell 1", "Tekmetric", "Torq", "ALLDATA"],
            "telephony": ["Twilio Voice", "RingCentral", "Vonage Business", "Cloud PBX"]
        },
        "complianceAndStandards": {
            "usRegulations": "Automotive service disclosure laws and TCPA compliant SMS dispatch with instant opt-out functionality.",
            "auRegulations": "Australian Consumer Law (ACL) quotation standards and Privacy Act 1988 compliance for vehicle and owner details.",
            "dataHandling": "Secure encrypted database synchronization with automated customer record deduplication by phone number."
        },
        "unitEconomics": {
            "averageJobValue": "$450 - $2,800 (Minor service up to transmission rebuild)",
            "monthlyMissedCallsEst": "30 - 70 calls",
            "recoveredRevenueModel": "Recovering 8 mechanical repair jobs per month adds $5,000 - $14,000 in gross workshop billings.",
            "roiMultiple": "4x - 10x ROI"
        },
        "faqs": [
            {
                "question": "Can the AI ask for vehicle registration, make, and model?",
                "answer": "Yes. The AI voice agent systematically asks callers for their vehicle's registration plate (or license plate in the US), make, model, and year, along with a description of any warning lights or strange noises. This information is instantly transcribed into your workshop management system before the car arrives."
            },
            {
                "question": "Can it explain our diagnostic inspection fee so customers aren't surprised?",
                "answer": "Yes. We configure the AI to state your standard initial diagnostic or inspection fee (e.g. '$140 diagnostic fee which goes toward repair work if approved') so expectations are established upfront."
            },
            {
                "question": "What happens if a customer needs an emergency tow after hours?",
                "answer": "The AI recognizes emergency breakdown keywords, provides your preferred local towing partner's contact details, and texts the caller your workshop address and night key-drop box instructions."
            },
            {
                "question": "Will it integrate with Workshop Software or MechanicDesk?",
                "answer": "Yes. We connect the AI to Workshop Software, MechanicDesk, AutoLeap, or GoHighLevel via webhooks and REST APIs so booking slots and customer details populate automatically."
            }
        ]
    },
    {
        "slug": "beauty-wellness",
        "name": "Salons, Spas & Wellness Clinics",
        "metaTitle": "AI Receptionist for Salons, Spas & Wellness",
        "metaDescription": "Capture 24/7 salon appointments while stylists are with clients. 24/7 AI phone booking and missed-call recovery for hair salons, med spas, and wellness centers.",
        "category": "Beauty, Fitness & Wellness",
        "headline": "When stylists' hands are in foil or therapists are in treatment, the phone goes to voicemail. We book every appointment automatically.",
        "summary": "Salons, med spas, and wellness centers operate in high-touch environments where staff cannot step away from treatments to answer phone calls. DigitalX installs conversational AI receptionists that handle booking requests, answer pricing questions, check stylist availability, and send booking deposit links 24/7.",
        "niches": [
            "Hair Salons & Color Specialists",
            "Medical Spas & Aesthetic Clinics",
            "Day Spas & Massage Therapy",
            "Skin Care & Laser Clinics",
            "Wellness & Holistic Centers"
        ],
        "painPoints": [
            "Front desk staff unable to keep up during peak morning and lunch phone surges",
            "Losing high-ticket balayage, filler, or package bookings to competitors after 6:00 PM",
            "Clients abandoning online booking forms because they want to speak with someone first",
            "Late cancellations and no-shows burning prime chair and treatment room time"
        ],
        "playbook": [
            "Warm, polished conversational AI answers inquiries 24/7 in an elegant salon tone",
            "Service selection & stylist matching: checks preferred practitioner, hair length, and treatment duration",
            "Automated patch-test and consultation reminders for chemical or cosmetic treatments",
            "Integration with Timely, Fresha, Phorest, or Mindbody for live calendar locking",
            "Instant missed-call text-back with direct calendar booking and deposit links"
        ],
        "relatedSolutionSlugs": [
            "ai-voice-receptionists",
            "missed-call-text-back",
            "gohighlevel-implementation",
            "lead-generation"
        ],
        "intakeArchitecture": {
            "emergencyCriteria": "Allergic reaction to hair dye or cosmetic treatment, acute post-laser swelling, or urgent same-day cancellation.",
            "dispatchProtocol": "Advises immediate medical guidance if allergic reaction is present and alerts salon manager mobile via high-priority SMS.",
            "intakeSteps": [
                {
                    "name": "Polished Salon Answering",
                    "text": "Greets client warmly, identifying whether they want to book hair, skin, aesthetics, or massage treatments."
                },
                {
                    "name": "Stylist & Service Specification",
                    "text": "Captures specific service details (e.g. half head highlights vs full restyle), confirms stylist preference, and checks time requirements."
                },
                {
                    "name": "Real-Time Chair & Room Booking",
                    "text": "Checks live salon software availability, reserves the exact time slot, and reserves the stylist's schedule."
                },
                {
                    "name": "SMS Booking Confirmation & Deposit Link",
                    "text": "Texts client instant booking summary with salon address, parking guidance, and secure Stripe deposit link if required."
                }
            ]
        },
        "softwareIntegrations": {
            "primaryCrms": ["Timely", "Fresha", "Phorest", "Mindbody", "GoHighLevel"],
            "fieldSoftware": ["Square Appointments", "Vagaro", "Zenoti", "Boulevard"],
            "telephony": ["Twilio Voice", "Cloud PBX", "RingCentral", "Telstra / Verizon Business"]
        },
        "complianceAndStandards": {
            "usRegulations": "TCPA compliant SMS text confirmations and PCI-DSS compliant credit card deposit handling via secure hosted links.",
            "auRegulations": "Australian Privacy Principles (Privacy Act 1988) compliance and ACL cancellation deposit disclosure standards.",
            "dataHandling": "Encrypted client records with automated duplicate customer detection by mobile number."
        },
        "unitEconomics": {
            "averageJobValue": "$180 - $950 (Cut & Color up to Med Spa Packages)",
            "monthlyMissedCallsEst": "35 - 80 calls",
            "recoveredRevenueModel": "Recovering 15 salon bookings per month generates $3,500 - $12,000 in monthly service revenue.",
            "roiMultiple": "4.5x - 11x return on investment"
        },
        "faqs": [
            {
                "question": "Can the AI take booking deposits to prevent no-shows?",
                "answer": "Yes. Once the AI agrees on a booking slot with the caller, it reserves the chair in your booking calendar and immediately sends an SMS containing a secure payment link (via Stripe or your booking software) to collect the required deposit."
            },
            {
                "question": "Does it integrate with Timely, Fresha, or Phorest?",
                "answer": "Yes. We integrate with Timely, Fresha, Phorest, Mindbody, and GoHighLevel. The AI checks real-time stylist availability, avoids double-bookings, and schedules buffer times for cleanup."
            },
            {
                "question": "What if a client needs a patch test before a hair color or laser service?",
                "answer": "The AI is configured to recognize chemical and laser treatments that require 48-hour allergy patch tests, informing the client of the requirement and scheduling the quick patch test prior to their main service."
            },
            {
                "question": "Can callers ask about service pricing and package inclusions?",
                "answer": "Yes. We program the AI with your exact service menu, starting price points (e.g. 'Balayage packages start from $280 depending on hair length and toner requirements'), and retail product offerings."
            }
        ]
    },
    {
        "slug": "professional-services",
        "name": "Law Firms & Accounting Practices",
        "metaTitle": "AI Phone Answering for Law Firms & Accountants",
        "metaDescription": "Confidential, 24/7 AI client intake and phone answering for legal and accounting firms. Filter tire-kickers and book consultations into Clio & HubSpot.",
        "category": "Professional & Financial Services",
        "headline": "When attorneys and accountants are in court or client meetings, new client inquiries go to voicemail. We qualify and book them 24/7.",
        "summary": "High-value corporate, family, personal injury law firms, and CPA practices lose tens of thousands in retainer fees when urgent legal or tax inquiries reach answering machines. DigitalX deploys discreet, confidential AI receptionists that conduct intake triage, screen for practice area fit, and schedule billable consultations.",
        "niches": [
            "Family & Divorce Law Practices",
            "Personal Injury & Litigation Firms",
            "Commercial & Corporate Law",
            "Chartered Accounting & CPA Firms",
            "Wealth Management & Financial Advisory"
        ],
        "painPoints": [
            "Attorneys and partners interrupted during billable client advisory sessions by reception calls",
            "Unqualified inquiries and tire-kickers consuming expensive staff intake time",
            "Urgent legal inquiries calling competing law firms after business hours",
            "Manual data entry of caller details into practice management systems causing intake lag"
        ],
        "playbook": [
            "Discreet, authoritative conversational voice model answers in under 500ms with complete professionalism",
            "Practice area qualification: confirms matter type (e.g. family law, estate planning, corporate restructuring)",
            "Conflict of interest pre-screening: collects opposing party names before scheduling consultation calls",
            "Direct calendar sync into Clio, PracticePanther, HubSpot, or Google Calendar",
            "Missed-call SMS text-back with secure intake questionnaire links"
        ],
        "relatedSolutionSlugs": [
            "ai-voice-receptionists",
            "missed-call-text-back",
            "hubspot-automation",
            "gohighlevel-implementation"
        ],
        "intakeArchitecture": {
            "emergencyCriteria": "Arrests, urgent bail hearings, upcoming court filing deadlines within 24 hours, or active police interviews.",
            "dispatchProtocol": "Transfers call immediately to principal attorney mobile or sends high-priority SMS alert marked 'URGENT LEGAL MATTER'.",
            "intakeSteps": [
                {
                    "name": "Confidential Professional Greeting",
                    "text": "Welcomes caller, states firm name, and inquires regarding the general nature of their legal or accounting matter."
                },
                {
                    "name": "Matter Categorization & Conflict Pre-Screen",
                    "text": "Identifies legal practice area, collects adverse party details for conflict check, and confirms consultation fee requirements."
                },
                {
                    "name": "Consultation Calendar Scheduling",
                    "text": "Queries partner availability, schedules 30 or 60 minute initial advisory consultation, and locks the calendar slot."
                },
                {
                    "name": "Intake Confirmation & Secure Document Link",
                    "text": "Sends client SMS confirmation with consultation details, video meeting link, and secure portal link for supporting documents."
                }
            ]
        },
        "softwareIntegrations": {
            "primaryCrms": ["Clio", "PracticePanther", "HubSpot", "GoHighLevel", "MyCase"],
            "fieldSoftware": ["Actionstep", "Smokeball", "Xero Practice Manager", "LEAP Legal"],
            "telephony": ["Twilio SIP Trunking", "RingCentral", "8x8", "Teams Phone System"]
        },
        "complianceAndStandards": {
            "usRegulations": "Adheres to ABA Model Rules of Professional Conduct regarding client confidentiality and advertising disclosures.",
            "auRegulations": "Legal Profession Uniform Law (NSW/VIC) and Australian Privacy Principles (APPs) compliant data security standards.",
            "dataHandling": "Strict zero-retention voice policy options, dedicated database tenancy, and SOC 2 Type II compliant storage."
        },
        "unitEconomics": {
            "averageJobValue": "$2,500 - $15,000+ (Retainers and case fees)",
            "monthlyMissedCallsEst": "20 - 50 intake calls",
            "recoveredRevenueModel": "Signing just 2 additional retained matters per month adds $8,000 - $30,000 in monthly practice revenue.",
            "roiMultiple": "5x - 14x ROI"
        },
        "faqs": [
            {
                "question": "Can the AI conduct initial conflict of interest checks?",
                "answer": "Yes. The AI collects the caller's full legal name, the name of their company or opposing party, and the matter jurisdiction, and logs this directly into your CRM or practice management software for conflict clearance before the consultation begins."
            },
            {
                "question": "Does it integrate with legal practice management systems like Clio or Smokeball?",
                "answer": "Yes. We integrate with Clio, PracticePanther, Smokeball, Actionstep, and HubSpot. As soon as the call ends, a new matter record and calendar appointment are created automatically."
            },
            {
                "question": "How does it protect client confidentiality and attorney-client privilege?",
                "answer": "All voice data streams over encrypted TLS 1.3 connections and at-rest databases are encrypted with AES-256. We sign comprehensive Business Associate and data protection agreements, with zero sharing or training on third-party public AI models."
            },
            {
                "question": "Can the AI explain consultation fees upfront so we don't waste time with free-advice seekers?",
                "answer": "Yes. We configure the AI to state your initial consultation policy clearly (e.g. '$350 plus GST for an initial 45-minute strategy conference') and can collect payment before confirming the consultation."
            }
        ]
    },
    {
        "slug": "events-hospitality",
        "name": "Event Venues & Hospitality",
        "metaTitle": "AI Booking Agent for Event Venues & Hospitality",
        "metaDescription": "24/7 event venue booking, private dining inquiries, and missed-call recovery. Answer guest inquiries instantly and sync bookings to SevenRooms & OpenTable.",
        "category": "Events & Hospitality",
        "headline": "Floor staff managing service and dining rooms can't answer complex function calls. We handle venue inquiries and book tours 24/7.",
        "summary": "Wedding venues, corporate event spaces, boutique hotels, and premium dining establishments lose lucrative private dining and function bookings when inquiries hit busy lines. DigitalX installs AI booking receptionists that qualify guest counts, explain minimum spend requirements, send digital function packages, and schedule venue walkthroughs.",
        "niches": [
            "Wedding & Reception Venues",
            "Private Dining & Fine Restaurants",
            "Corporate Conference Venues",
            "Boutique Hotels & Event Spaces",
            "Catering & Hospitality Companies"
        ],
        "painPoints": [
            "Floor managers interrupted during busy dinner service to answer function inquiries",
            "Prospective corporate and wedding clients calling after hours to check available dates",
            "Staff spending hours repeatedly emailing function PDFs and packages to unqualified tire-kickers",
            "Double-booking venue spaces or losing track of high-value lead inquiries in paper logbooks"
        ],
        "playbook": [
            "Welcoming, sophisticated voice agent greets event planners and diners 24/7 with zero waiting",
            "Event qualification: captures target date, guest count, event type (wedding, corporate, birthday), and budget",
            "Minimum spend guidance: transparently communicates seasonal food & beverage minimums",
            "Direct calendar sync for venue walkthrough tours and tasting reservations",
            "Instant missed-call text-back with link to download digital event brochure and function packages"
        ],
        "relatedSolutionSlugs": [
            "ai-voice-receptionists",
            "missed-call-text-back",
            "gohighlevel-implementation",
            "lead-generation"
        ],
        "intakeArchitecture": {
            "emergencyCriteria": "Same-day booking cancellations, lost venue access codes, or active wedding day vendor delivery issues.",
            "dispatchProtocol": "Transfers call immediately to the on-duty floor manager or wedding coordinator mobile line.",
            "intakeSteps": [
                {
                    "name": "Warm Hospitality Answering",
                    "text": "Greets guest, states venue name, and determines whether they need general table reservations or private function hire."
                },
                {
                    "name": "Function Scope & Date Feasibility",
                    "text": "Collects event date, alternative dates, estimated guest count, style of event (cocktail vs seated), and audio-visual requirements."
                },
                {
                    "name": "Venue Tour Scheduling & Brochure SMS",
                    "text": "Schedules an in-person venue inspection with the event coordinator and sends a digital function package PDF via SMS."
                },
                {
                    "name": "CRM Deal Pipeline Sync",
                    "text": "Creates a high-value opportunity in GoHighLevel or event CRM with estimated food & beverage revenue."
                }
            ]
        },
        "softwareIntegrations": {
            "primaryCrms": ["GoHighLevel", "SevenRooms", "Tripleseat", "Event Temple", "HubSpot"],
            "fieldSoftware": ["OpenTable", "Resy", "Toast POS", "Lightspeed"],
            "telephony": ["Twilio Voice", "Cloud PBX", "RingCentral Hospitality", "Vonage"]
        },
        "complianceAndStandards": {
            "usRegulations": "TCPA compliant SMS event confirmation with instant opt-out functionality.",
            "auRegulations": "Australian Consumer Law (ACL) deposit and cancellation disclosure standards and Privacy Act 1988 compliance.",
            "dataHandling": "Encrypted guest contact data with PCI-DSS compliant credit card deposit capture."
        },
        "unitEconomics": {
            "averageJobValue": "$3,500 - $35,000 (Private dinners up to full wedding buyouts)",
            "monthlyMissedCallsEst": "25 - 60 venue calls",
            "recoveredRevenueModel": "Recovering 3 additional private event bookings per month generates $12,000 - $45,000 in high-margin venue revenue.",
            "roiMultiple": "6x - 18x return on investment"
        },
        "faqs": [
            {
                "question": "Can the AI send our function pack or wedding brochure to callers via SMS?",
                "answer": "Yes. While on the call, the AI confirms the caller's mobile number and automatically sends a direct download link to your latest function brochure, seasonal menu packages, and pricing guides via SMS."
            },
            {
                "question": "Can it check available dates and schedule in-person venue tours?",
                "answer": "Yes. The AI connects to your event calendar (such as Tripleseat, Event Temple, or Google Calendar) to verify open dates and schedule in-person walkthrough tours with your event sales director."
            },
            {
                "question": "Does it integrate with SevenRooms or OpenTable?",
                "answer": "Yes. For dining reservations, the AI can check table availability and book guests directly via SevenRooms, OpenTable, or Resy, while routing private event inquiries into your sales pipeline."
            },
            {
                "question": "Can the AI communicate food and beverage minimum spend requirements?",
                "answer": "Yes. We train the AI on your exact peak and off-peak minimum spends (e.g. '$5,000 minimum spend for Friday evening private dining room hire') so prospective guests are pre-qualified before tours."
            }
        ]
    }
]

# Prepend the pillar industries right after export const industries: Industry[] = [
marker = 'export const industries: Industry[] = [\n'
if marker in content:
    # Convert pillar industries to formatted JS object string
    pillars_str = ''
    for ind in pillar_industries:
        pillars_str += '  ' + json.dumps(ind, indent=2).replace('\n', '\n  ') + ',\n'
    content = content.replace(marker, marker + pillars_str)
    with open('src/data/industries.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully added 6 pillar industries to src/data/industries.ts")
else:
    print("Could not find marker in src/data/industries.ts")
