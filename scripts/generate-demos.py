import asyncio
import edge_tts
import os

OUTPUT_DIR = r"d:\Aautomatex\Digital X Solution\public\demos"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Warm, natural female voice
VOICE = "en-US-JennyNeural"

DENTIST_SCRIPT = """Thanks for calling Smile Dental, this is Maya speaking! How can I help you today?
... 
Oh, you'd like to book a teeth whitening appointment? Absolutely! We'd love to get you in. 
Umm, let me check our availability real quick...
Okay, so we have openings next Tuesday. Does a morning slot work for you, say around 10 AM?
...
Perfect! I've got you down for teeth whitening, next Tuesday at 10 AM. 
Can I grab your name and a good number to reach you at?
...
Got it, Sarah! You're all set. We'll send you a confirmation text shortly. See you Tuesday!"""

SALON_SCRIPT = """Hey there, thanks for calling Luxe Salon! This is Ava. What can I do for you?
...
A haircut and blowout with Jessica? Ooh, great choice, she's amazing. 
Let me pull up her schedule... 
Hmm, so she's actually booked at 2, but I do have her available at 3:15. Would that work for you?
...
Awesome! So that's a haircut and blowout with Jessica, this Saturday at 3:15. 
I'll send you a reminder the day before.
Can I get your name?
...
You're all booked, Emily! We'll see you Saturday. Have a great day!"""

async def generate():
    print("Generating dentist demo...")
    communicate = edge_tts.Communicate(DENTIST_SCRIPT, VOICE, rate="-5%", pitch="+2Hz")
    await communicate.save(os.path.join(OUTPUT_DIR, "dentist-demo.mp3"))
    print("✓ dentist-demo.mp3 saved")

    print("Generating salon demo...")
    communicate = edge_tts.Communicate(SALON_SCRIPT, VOICE, rate="-3%", pitch="+4Hz")
    await communicate.save(os.path.join(OUTPUT_DIR, "salon-demo.mp3"))
    print("✓ salon-demo.mp3 saved")

asyncio.run(generate())
print("Done!")
