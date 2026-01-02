# QUESTPOINT CAFE
## Streaming Operations Supplement
### Operations Manual Attachment

---

**Document Purpose:** Complete operational guide for managing livestream broadcasts from Questpoint Cafe, including equipment specifications, staff procedures, legal compliance, and community moderation.

**Attachment To:** Questpoint Cafe Operations Manual, Section 6 (Operations) and Section 4 (Technology Stack)

**Version:** 1.0 | January 2026

---

# TABLE OF CONTENTS

1. Overview & Strategic Purpose
2. Equipment Specifications & Budget
3. Technical Setup & Configuration
4. Broadcast Zones & Rules
5. Signage & Legal Compliance
6. Staff Training & Procedures
7. Moderation Program
8. Content Strategy & Scheduling
9. Revenue & Monetization
10. Troubleshooting & Emergency Procedures
11. Checklists & Quick Reference

---

# 1. OVERVIEW & STRATEGIC PURPOSE

## 1.1 WHY QUESTPOINT STREAMS

Livestreaming transforms Questpoint Cafe from a local business into a **content creator** and **digital community hub**. The streams serve multiple strategic purposes:

**Marketing & Discovery:**
- Free advertising to gaming communities worldwide
- Clips become social media content (TikTok, YouTube Shorts, Instagram Reels)
- Viewers discover the cafe, plan visits when in the area

**Community Building:**
- Remote fans feel connected to the in-store community
- Regular viewers become invested in the "characters" (regulars who appear on stream)
- Creates FOMO (Fear Of Missing Out) that drives foot traffic

**Revenue Generation:**
- Platform subscriptions and tips
- Sponsorship opportunities (overlay ads, shoutouts)
- Merchandise sales to online audience

**Competitive Differentiation:**
- No other gaming cafe in the region offers this
- Positions Questpoint as innovative and tech-forward

## 1.2 THE "FEATURE" MODEL

Questpoint does **NOT** broadcast the entire back room. We use a **controlled "Feature" model:**

- **Feature Table (Zone A):** One designated table for analog gaming (MTG, board games)
- **Feature Console (Zone C):** One designated TV/console station for competitive gameplay

**Why This Model:**
- Protects customer privacy (most of the room is off-camera)
- Creates exclusivity ("You made it to the Feature Table!")
- Ensures quality content (only active, interesting gameplay is broadcast)
- Avoids "empty room" dead air (no stream when no players)

## 1.3 GUIDING PRINCIPLES

**1. Consent First:** No one appears on stream without explicit opt-in (sitting at designated area = consent)

**2. Quality Over Quantity:** Better to stream 2 hours of great content than 8 hours of nothing

**3. Community Safety:** Minors, harassment, and inappropriate content are handled immediately

**4. Staff Simplicity:** Any trained staff member can start/stop a stream with one button

**5. Revenue Secondary:** Streams exist for marketing first; monetization is a bonus, not the goal

---

# 2. EQUIPMENT SPECIFICATIONS & BUDGET

## 2.1 CORE STREAMING INFRASTRUCTURE

### The "Brain" - Central Streaming PC

**Purpose:** Receives all camera/capture feeds, encodes video, broadcasts to platforms

| Component | Specification | Notes |
|-----------|---------------|-------|
| Processor | AMD Ryzen 7 5800X (or newer) | 8 cores for multi-stream encoding |
| Graphics | NVIDIA RTX 3060 12GB | NVENC encoder handles streaming without CPU strain |
| RAM | 32GB DDR4 3200MHz | Handles OBS + multiple sources |
| Storage | 1TB NVMe SSD | Fast read/write for recordings |
| Case | Mid-tower with good airflow | Will run 8+ hours daily |
| OS | Windows 11 Pro | Required for some capture software |

**Estimated Cost:** $1,100 - $1,400 (can build custom or buy pre-built)

**Placement:** Back office or locked cabinet near the Sanctum entrance. Must have:
- Ethernet connection (not WiFi)
- Access for staff to restart if needed
- Ventilation (generates heat during long broadcasts)

---

### Stream Control - Elgato Stream Deck

**Purpose:** One-button control for starting/stopping streams, switching scenes, triggering alerts

| Model | Keys | Cost | Recommendation |
|-------|------|------|----------------|
| Stream Deck MK.2 | 15 keys | $150 | Minimum viable |
| Stream Deck XL | 32 keys | $250 | **Recommended** - room for growth |
| Stream Deck + | 8 keys + dials | $200 | Good for audio control |

**Placement:** Behind the service counter or at the Shift Lead station. Must be:
- Visible and accessible to on-duty staff
- Labeled clearly ("START ZONE A", "END STREAM", "MUTE ALL")
- Connected to Streaming PC via USB (use 15ft active USB extension if needed)

**Estimated Cost:** $250 (Stream Deck XL)

---

### Network Requirements

**Internet Speed:**
- **Minimum Upload:** 25 Mbps dedicated to streaming
- **Recommended Upload:** 50+ Mbps (allows for future multi-streaming)
- **Latency:** <20ms to platform servers

**Network Architecture:**
- Streaming PC must be on **wired Ethernet** (never WiFi)
- Separate VLAN or QoS priority for streaming traffic
- Does NOT share bandwidth with guest WiFi

**Estimated Cost:** May require ISP upgrade. Budget $50-100/month for business-class internet if not already provisioned.

---

## 2.2 ZONE A EQUIPMENT (FEATURE TABLE - ANALOG)

### Camera Setup

**Primary Camera - Top-Down (Board State)**

| Option | Model | Cost | Pros | Cons |
|--------|-------|------|------|------|
| Budget | Logitech C922 Pro | $100 | Affordable, reliable | Lower quality, limited angle |
| Mid-Range | Logitech Brio 4K | $200 | 4K, great color | Needs good lighting |
| **Recommended** | GoPro Hero 11 Black | $350 | Wide angle, excellent quality, versatile | Requires mount, higher cost |
| Premium | Sony ZV-E10 | $700 | Cinema quality | Overkill for table streams |

**Recommended:** GoPro Hero 11 with SuperView mode captures entire table from ceiling mount.

**Secondary Camera - Player Reactions (Optional)**

| Model | Cost | Notes |
|-------|------|-------|
| Logitech C920 | $70 | Budget option, 1080p |
| Logitech C922 Pro | $100 | Better low-light performance |

**Placement:** Side angle capturing 2-4 players' faces (with their consent)

---

### Audio Setup

**Microphone - Table Audio**

| Option | Model | Cost | Notes |
|--------|-------|------|-------|
| **Recommended** | Blue Yeti X | $170 | Omnidirectional mode captures table conversation |
| Budget | Blue Snowball | $50 | Adequate for casual streams |
| Premium | Shure MV7 | $250 | Broadcast quality |

**Placement:** Center of table on short boom arm or desktop stand. Use shock mount to reduce table bumps.

**Audio Considerations:**
- Table talk is part of the content (banter, reactions, rules discussions)
- Background cafe noise adds atmosphere (don't over-isolate)
- Music must be licensed or royalty-free (DMCA risk on Twitch/YouTube)

---

### Lighting Setup

**Purpose:** Cards are small and detailed. Bad lighting = unreadable stream.

| Item | Model | Cost | Quantity |
|------|-------|------|----------|
| **Recommended** | Elgato Key Light Air | $130 | 2 |
| Budget | Ring Light (18") | $40 | 1-2 |
| Premium | Elgato Key Light | $200 | 2 |

**Placement:** 
- 45-degree angles from above, flanking the table
- Eliminates shadows from player hands
- Color temperature: 5000K (daylight, matches card colors accurately)

**Estimated Lighting Cost:** $260 (2x Key Light Air)

---

### Chat Display Monitor

**Purpose:** Players see Twitch/YouTube chat in real-time, can interact with viewers

| Item | Model | Cost | Notes |
|------|-------|------|-------|
| **Recommended** | 15.6" Portable USB-C Monitor | $120 | ASUS ZenScreen or similar |
| Budget | Old tablet (iPad, Android) | $0-50 | Use Twitch app |

**Placement:** Edge of table, facing players. Angled so it's not visible on the top-down camera.

---

### Zone A Total Equipment Cost

| Item | Cost |
|------|------|
| GoPro Hero 11 (top-down) | $350 |
| Logitech C922 (player cam) | $100 |
| Blue Yeti X (microphone) | $170 |
| Elgato Key Light Air (x2) | $260 |
| Portable Monitor (chat) | $120 |
| Mounting Hardware (clamps, arms, cables) | $150 |
| **ZONE A TOTAL** | **$1,150** |

---

## 2.3 ZONE C EQUIPMENT (FEATURE CONSOLE)

### Capture Card

**Purpose:** Captures HDMI output from console, sends to Streaming PC

| Option | Model | Cost | Notes |
|--------|-------|------|-------|
| **Recommended** | Elgato HD60 X | $180 | 4K passthrough, 1080p60 capture, VRR support |
| Budget | Elgato HD60 S+ | $140 | 1080p60, reliable |
| Premium | Elgato 4K60 Pro MK.2 | $250 | Internal PCIe card, 4K capture |

**Recommended:** Elgato HD60 X - handles PS5 and Switch without issues.

---

### HDMI Signal Flow

```
Console (PS5/Switch) 
    ↓ HDMI Out
HDMI Splitter (1-in, 2-out)
    ↓               ↓
Feature TV      Capture Card → Streaming PC
(Players see)   (Stream sees)
```

**Required Hardware:**

| Item | Model | Cost | Notes |
|------|-------|------|-------|
| HDMI Splitter | 4K 60Hz 1x2 Splitter | $30 | Must support HDCP passthrough |
| HDMI Cables | 6ft High-Speed HDMI 2.1 (x3) | $30 | Console→Splitter, Splitter→TV, Splitter→Capture |
| USB Cable | USB 3.0 A-to-C (10ft) | $15 | Capture card to Streaming PC |

---

### Audio Considerations

**Game Audio:** Captured directly from HDMI (no additional hardware needed)

**Player Audio/Reactions (Optional):**
- Small shotgun mic mounted above the couch area
- OR: Rely on game audio only (simpler, less privacy concern)

**Recommendation:** Start with game audio only. Add player cam/mic later if audience requests it.

---

### Chat Display Monitor

Same as Zone A: 15.6" portable USB-C monitor, positioned where Feature Console players can see it without blocking the TV.

**Cost:** $120

---

### Zone C Total Equipment Cost

| Item | Cost |
|------|------|
| Elgato HD60 X (capture card) | $180 |
| HDMI Splitter | $30 |
| HDMI Cables (x3) | $30 |
| USB 3.0 Cable (10ft) | $15 |
| Portable Monitor (chat) | $120 |
| Cable management (raceways, clips) | $50 |
| **ZONE C TOTAL** | **$425** |

---

## 2.4 COMPLETE STREAMING BUDGET SUMMARY

| Category | Cost |
|----------|------|
| Streaming PC | $1,200 |
| Stream Deck XL | $250 |
| Zone A Equipment | $1,150 |
| Zone C Equipment | $425 |
| Software Licenses (see Section 3) | $100 |
| Contingency (10%) | $315 |
| **TOTAL STREAMING INFRASTRUCTURE** | **$3,440** |

**Add to Startup Cost Breakdown (Section 7.1 of Master Document):**
- Line Item: "Streaming Infrastructure" - $3,500

---

# 3. TECHNICAL SETUP & CONFIGURATION

## 3.1 SOFTWARE STACK

### Broadcasting Software - OBS Studio

**Why OBS:**
- Free and open-source
- Industry standard for streaming
- Handles multiple sources (cameras, capture cards, overlays)
- Integrates with Stream Deck

**Download:** https://obsproject.com

**OBS Configuration Recommendations:**

| Setting | Value | Notes |
|---------|-------|-------|
| Output Resolution | 1920x1080 | Standard HD |
| Framerate | 30 FPS (Zone A), 60 FPS (Zone C) | Card games don't need 60; console does |
| Encoder | NVENC (NVIDIA) | Uses GPU, not CPU |
| Bitrate | 4500-6000 Kbps | Adjust based on upload speed |
| Keyframe Interval | 2 seconds | Platform requirement |

---

### Multi-Platform Streaming - Restream.io

**Purpose:** Broadcast to Twitch, YouTube, and Kick simultaneously from one OBS output

**Pricing:**
- Free: 2 platforms, basic features
- Professional: $19/month - unlimited platforms, stream recording, analytics

**Recommendation:** Start with free tier (Twitch + YouTube). Upgrade when monetization justifies cost.

---

### Stream Alerts & Overlays - Streamlabs

**Purpose:** On-screen notifications for follows, subs, donations

**Pricing:** Free tier is sufficient for starting out

**Branded Overlays (Custom):**
- Create in Canva or hire designer on Fiverr ($50-150)
- Include: Questpoint logo, "Now Playing" zone indicator, social media handles
- "Starting Soon" screen, "Be Right Back" screen, "Stream Ending" screen

---

### Chat Management - Streamlabs Chatbot or Nightbot

**Purpose:** Automated moderation, commands, timers

**Key Commands to Program:**

| Command | Response |
|---------|----------|
| !menu | "Check out our full menu at questpointcafe.com/menu" |
| !location | "We're located at [address]. Come visit!" |
| !events | "Friday Night Magic every Friday at 6 PM. Full calendar: questpointcafe.com/events" |
| !rules | "Feature Table Rules: Consent to stream by sitting. Be respectful. Have fun!" |

**Auto-Timers:**
- Every 15 minutes: Rotate through location, menu, events info
- Every 30 minutes: "Enjoying the stream? Follow us on Instagram @questpointcafe"

---

### Software Cost Summary

| Software | Cost | Notes |
|----------|------|-------|
| OBS Studio | Free | |
| Restream.io | Free-$19/mo | Start free |
| Streamlabs | Free | |
| Nightbot | Free | |
| Custom Overlays | $100 (one-time) | Fiverr designer |
| **TOTAL SOFTWARE** | **$100 + $0-19/mo** | |

---

## 3.2 OBS SCENE CONFIGURATION

### Scene List (Pre-Built)

**Scene 1: "Starting Soon"**
- Questpoint logo
- "Stream starting soon..." text
- Background music (royalty-free lo-fi)
- No cameras active

**Scene 2: "Zone A - Feature Table"**
- Source 1: Top-down camera (full screen)
- Source 2: Player cam (small overlay, bottom corner) - optional
- Source 3: Chat overlay (side panel or lower third)
- Source 4: Questpoint logo watermark (corner)

**Scene 3: "Zone C - Console"**
- Source 1: Game capture (full screen)
- Source 2: Chat overlay (side panel)
- Source 3: Questpoint logo watermark (corner)

**Scene 4: "Be Right Back"**
- Questpoint logo
- "Be right back!" text
- Background music
- Use when: Table clears between games, bathroom breaks, etc.

**Scene 5: "Stream Ending"**
- "Thanks for watching!" text
- Social media handles
- "Visit us at [address]"
- Raid prompt (if raiding another channel)

---

### Stream Deck Button Layout (Recommended)

**Row 1: Zone Control**
| Button 1 | Button 2 | Button 3 | Button 4 |
|----------|----------|----------|----------|
| START Zone A | START Zone C | BRB Scene | END Stream |

**Row 2: Scene Switches**
| Button 5 | Button 6 | Button 7 | Button 8 |
|----------|----------|----------|----------|
| Starting Soon | Zone A Scene | Zone C Scene | Ending Scene |

**Row 3: Audio**
| Button 9 | Button 10 | Button 11 | Button 12 |
|----------|----------|----------|----------|
| MUTE ALL | Mute Zone A Mic | Mute Zone C | Music On/Off |

**Row 4: Alerts & Info**
| Button 13 | Button 14 | Button 15 | Button 16 |
|----------|----------|----------|----------|
| Shoutout | !events | !menu | Ad Break |

---

## 3.3 INITIAL SETUP PROCEDURE (ONE-TIME)

### Hardware Setup Checklist

**Streaming PC:**
- [ ] PC assembled/purchased and placed in secure location
- [ ] Ethernet cable connected (NOT WiFi)
- [ ] Monitor, keyboard, mouse connected for initial setup
- [ ] Windows updated, drivers installed (especially NVIDIA GPU drivers)

**Zone A (Feature Table):**
- [ ] Top-down camera mounted to ceiling or boom arm
- [ ] Camera connected to Streaming PC via USB extension
- [ ] Secondary camera mounted (if using)
- [ ] Microphone placed at table center
- [ ] Key Lights positioned and powered
- [ ] Chat monitor placed and connected

**Zone C (Feature Console):**
- [ ] HDMI splitter installed between console and TV
- [ ] Capture card connected to splitter and Streaming PC
- [ ] USB cable run to Streaming PC
- [ ] Chat monitor placed and connected

**Control Station:**
- [ ] Stream Deck connected to Streaming PC
- [ ] Stream Deck programmed with scenes/buttons (see 3.2)
- [ ] Placed at Shift Lead station, clearly labeled

---

### Software Setup Checklist

- [ ] OBS Studio installed and configured
- [ ] Scenes created (Starting Soon, Zone A, Zone C, BRB, Ending)
- [ ] Sources added to each scene (cameras, capture, overlays)
- [ ] Audio levels balanced (test with headphones)
- [ ] Restream.io account created, platforms connected
- [ ] Stream key entered in OBS
- [ ] Chatbot configured with commands and timers
- [ ] Test stream completed (private/unlisted) - verify all sources work
- [ ] Staff training completed (see Section 6)

---

# 4. BROADCAST ZONES & RULES

## 4.1 ZONE A: FEATURE TABLE (ANALOG GAMING)

### Physical Specifications

**Table Designation:**
- ONE specific table in Zone A is the "Feature Table"
- Clearly marked with signage (see Section 5)
- Ideally: Closest to streaming equipment, best lighting position

**Table Requirements:**
- Minimum 48" x 48" (fits 4-player Commander pod)
- Surface: Dark/neutral color (reduces glare, makes cards pop on camera)
- Chairs: 4-6 seats

---

### Rules for Feature Table

**Posted at the table (condensed version):**

> **FEATURE TABLE - LIVE ON STREAM**
> 
> By sitting here, you consent to being recorded and broadcast live.
> 
> ✓ Keep it friendly and respectful  
> ✓ Announce plays clearly for viewers  
> ✓ Have fun!
> 
> ✗ No personal information (full names, addresses, etc.)  
> ✗ No offensive language or behavior  
> ✗ No copyrighted music from personal devices
> 
> Prefer not to be on stream? No problem! Other tables are available.

---

**Expanded Rules (Staff Reference):**

1. **Consent:** Sitting at the Feature Table = consent to be streamed. No exceptions. If someone doesn't want to be on stream, they must sit elsewhere.

2. **All Ages Consideration:** Assume minors are watching. Language should be PG-13 at most. Staff can issue verbal warnings; repeated offenses = asked to move to non-streamed table.

3. **Personal Information:** Players should not share full names, phone numbers, addresses, or other identifying info on stream. Staff can mute audio if this occurs.

4. **Gameplay Focus:** The Feature Table is for active gameplay. Don't sit there to eat lunch or scroll your phone while stream is live.

5. **Staff Authority:** Shift Lead can ask anyone to leave the Feature Table at any time for any reason (behavior, content concerns, etc.).

6. **Priority:** During tournaments, Feature Table may be reserved for Top 4 or finals matches. Regular seating available elsewhere.

---

### Content Guidelines (What We Stream)

**Ideal Content:**
- Commander (EDH) pods - multiplayer, social, interesting board states
- Standard/Modern matches during FNM
- Board game playthroughs (especially teachable games)
- Draft sessions (pack opening, deck building)

**Avoid:**
- One person goldfishing (playing alone to test deck)
- Heated arguments or rules disputes (cut to BRB, resolve off-camera)
- Long periods of shuffling or setup (use BRB scene)

---

## 4.2 ZONE C: FEATURE CONSOLE (DIGITAL GAMING)

### Physical Specifications

**Console Designation:**
- ONE specific TV/console station is the "Feature Console"
- Clearly marked with signage
- Best-positioned TV (most visible, best seating)

**Setup:**
- TV: Wall-mounted, optimal viewing angle
- Seating: Couch or gaming chairs for 2-4 players
- Controllers: BYOC model, USB extension cables available

---

### Rules for Feature Console

**Posted at the station (condensed version):**

> **FEATURE CONSOLE - GAMEPLAY STREAMED LIVE**
> 
> Gameplay on this screen is captured and broadcast.
> 
> ✓ Competitive matches and tournaments  
> ✓ Party games with friends  
> ✓ High-skill gameplay welcome!
> 
> ✗ Single-player story games (spoilers, less engaging)  
> ✗ Games with excessive violence/gore  
> ✗ AFK/Idle gameplay
> 
> Want to play casually? Other consoles available!

---

**Expanded Rules (Staff Reference):**

1. **Game Selection:** Feature Console should prioritize:
   - Fighting games (Smash, Street Fighter, Tekken)
   - Competitive multiplayer (Rocket League, Mario Kart, sports games)
   - Party games with spectator appeal (Mario Party, Jackbox)

2. **Avoid Streaming:**
   - Single-player campaigns (spoiler risk, less engaging)
   - Games with AO (Adults Only) ratings
   - Extended idle/menu screens

3. **Player Consent:** Unlike Zone A (where players appear on camera), Zone C primarily captures gameplay. However, if player cams are added, same consent rules apply.

4. **Audio:** Game audio only by default. Player reactions captured only if microphone is added and players consent.

5. **Priority:** During console tournaments, Feature Console is reserved for bracket matches.

---

### Content Guidelines (What We Stream)

**Ideal Content:**
- Tournament matches (Smash Bros brackets, FIFA cups)
- High-skill gameplay (ranked matches, clutch moments)
- Party game chaos (4-player Mario Kart mayhem)

**Avoid:**
- Long loading screens (cut to BRB)
- Single-player content (unless specifically requested community event)
- Mature-rated games during peak family hours (before 8 PM)

---

## 4.3 NON-BROADCAST ZONES

### The Rest of Zone A (Analog Gaming)
- All other tables are NOT streamed
- Customers who prefer privacy should sit here
- Staff should direct camera-shy customers to these tables

### The Rest of Zone C (Console Lounge)
- Other TV stations are NOT captured
- Available for casual play, single-player games, etc.

### Zone B (Lounge/Lab)
- NEVER streamed
- This is the quiet zone for laptop work, deck building, reading
- No cameras, no microphones

### Front of House (Cafe)
- NEVER streamed (except security cameras, which are not broadcast)
- Customers ordering drinks have no expectation of being on a gaming stream

---

# 5. SIGNAGE & LEGAL COMPLIANCE

## 5.1 REQUIRED SIGNAGE

### Sign #1: Sanctum Entry Warning

**Location:** On or next to the swinging doors entering the Sanctum (back room)

**Size:** Minimum 11" x 17" (highly visible)

**Design:** Professional, branded with Questpoint logo

**Text:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

              ENTERING THE SANCTUM
              
     Welcome to Questpoint's Gaming Lounge!

┌─────────────────────────────────────────────────┐
│  📹 NOTICE: RECORDING IN PROGRESS              │
│                                                 │
│  This area is monitored by security cameras.   │
│                                                 │
│  Certain designated areas (Feature Table,      │
│  Feature Console) are livestreamed to the      │
│  internet. Streamed areas are clearly marked.  │
│                                                 │
│  By entering, you acknowledge this notice.     │
│  If you prefer not to appear on stream,        │
│  please use non-designated gaming areas.       │
└─────────────────────────────────────────────────┘

         Questions? Ask any staff member.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Sign #2: Feature Table Marker

**Location:** Standing table tent OR mounted sign at the designated Feature Table

**Size:** 5" x 7" table tent or 8.5" x 11" mounted

**Design:** Eye-catching, impossible to miss

**Text (Front):**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   🔴 LIVE  │  FEATURE TABLE
   
   This table is being streamed
   live to Twitch/YouTube.
   
   Sitting here = Consent to
   appear on the broadcast.
   
   Not comfortable on camera?
   → Other tables available!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Text (Back - Detailed Rules):**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

     FEATURE TABLE GUIDELINES

 ✓ Be respectful and friendly
 ✓ Keep language PG-13
 ✓ Announce plays for viewers
 ✓ Have fun!

 ✗ No personal info on stream
 ✗ No offensive content
 ✗ No copyrighted music
 
 Staff may ask you to relocate
 at any time. Thanks for
 understanding!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Sign #3: Feature Console Marker

**Location:** Mounted near the Feature Console TV

**Size:** 8.5" x 11"

**Text:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   🎮 FEATURE CONSOLE │ 🔴 LIVE

   Gameplay on this screen is
   streamed live to Twitch/YouTube.
   
   ✓ Tournaments & competitive play
   ✓ Party games & multiplayer
   
   Want to play off-stream?
   → Other consoles available!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Sign #4: Security Camera Notice (General)

**Location:** At main entrance and Sanctum entrance

**Size:** 8.5" x 11"

**Text:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   📹 SECURITY NOTICE
   
   These premises are monitored
   by video surveillance for
   the safety of our customers
   and staff.
   
   Questpoint Cafe

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 5.2 LEGAL CONSIDERATIONS

### Consent Framework

**Virginia Law (and most US states):**
- "One-party consent" state for audio recording
- However, broadcasting to the public is different from private recording
- **Best Practice:** Clear signage + opt-in model (choosing to sit at Feature Table)

**Our Approach:**
1. **General Notice:** Posted at entry (Sign #1) informs all customers
2. **Specific Consent:** Sitting at Feature Table/Console is affirmative action
3. **Alternative Available:** Non-streamed areas always available
4. **Staff Enforcement:** Anyone who objects can be immediately accommodated elsewhere

**This creates a defensible consent chain:**
- Customer saw Sign #1 (notice)
- Customer saw Sign #2/3 at the Feature area (specific warning)
- Customer chose to sit there (affirmative action)
- Alternative was available (no coercion)

---

### Minor Considerations

**Policy:** Questpoint Cafe is an all-ages establishment. Minors may appear on stream.

**Protections:**
1. **No Focus on Minors:** Camera framing focuses on cards/gameplay, not faces
2. **Parental Awareness:** Signs clearly indicate streaming occurs
3. **No Solo Minor Features:** Avoid streaming games where only minors are present (pair with adult players when possible)
4. **Immediate Removal:** If a parent/guardian requests their child be removed from stream, comply immediately (move to non-streamed table)

**Staff Training:** If a parent expresses concern, DO NOT argue. Accommodate immediately and apologize for any confusion.

---

### DMCA & Copyright

**Music:**
- NO customer music played on stream (Spotify, Apple Music, etc. = DMCA strike)
- Use ONLY royalty-free music or licensed "stream-safe" playlists
- Recommended: StreamBeats by Harris Heller, Pretzel Rocks, Lo-Fi Girl (with license)

**Game Content:**
- Most game publishers allow streaming (it's free marketing)
- Exception: Check policies for story-heavy games (spoiler concerns)
- MTG: Wizards of the Coast actively encourages streaming

**Staff Response to DMCA Claim:**
- If a platform issues a DMCA notice, immediately remove the offending content
- Document the incident, review how it happened
- Do NOT dispute unless you are 100% certain it's a false claim

---

### Signage Production

**Options:**
1. **DIY (Budget):** Design in Canva, print at FedEx/Staples on foam board
   - Cost: $20-50 total
2. **Professional (Recommended):** Order from VistaPrint or local sign shop
   - Cost: $100-200 total
   - More durable, consistent branding

**Include in Startup Costs:** $150 for professional signage

---

# 6. STAFF TRAINING & PROCEDURES

## 6.1 TRAINING CURRICULUM

### Who Needs Training

| Role | Training Level | Certification Required |
|------|----------------|------------------------|
| General Manager | Full (all procedures) | Yes - can train others |
| Shift Lead | Full (all procedures) | Yes - can run streams independently |
| Barista/Floor Staff | Basic (start/stop only) | No - escalates to Shift Lead |

---

### Training Module 1: Streaming Basics (All Staff)

**Duration:** 30 minutes

**Content:**
- What is livestreaming and why Questpoint does it
- The two broadcast zones (Feature Table, Feature Console)
- The consent model (signage, opt-in, alternatives)
- How to answer customer questions about streaming

**Assessment:** Verbal quiz - "A customer asks if they're being recorded. What do you tell them?"

---

### Training Module 2: Stream Operations (Shift Leads)

**Duration:** 2 hours (hands-on)

**Content:**
- Stream Deck orientation (button layout, functions)
- Starting a stream (see Procedure 6.2)
- Stopping a stream (see Procedure 6.3)
- Switching between Zone A and Zone C
- Using BRB and Ending scenes
- Monitoring chat for issues
- Muting audio in emergencies

**Assessment:** Practical test - Start stream, switch scenes, respond to mock emergency, end stream cleanly

---

### Training Module 3: Troubleshooting (Shift Leads + GM)

**Duration:** 1 hour

**Content:**
- Common problems and solutions (see Section 10)
- When to restart equipment vs. when to call for help
- Escalation procedures (who to contact if stream breaks)
- Incident documentation

**Assessment:** Scenario walkthroughs - "The Zone A camera feed is black. What do you check first?"

---

## 6.2 PROCEDURE: STARTING A STREAM

### Pre-Stream Checklist (5 minutes before going live)

**Zone A (Feature Table):**
- [ ] Players seated and ready to play
- [ ] Consent confirmed (players saw signs, chose to sit there)
- [ ] Top-down camera powered on and positioned
- [ ] Lighting on and properly angled
- [ ] Microphone on and positioned
- [ ] Chat monitor on and displaying chat
- [ ] No personal items in camera frame (phones showing texts, wallets, etc.)

**Zone C (Feature Console):**
- [ ] Players ready for competitive match
- [ ] Correct game loaded (appropriate for stream)
- [ ] Capture card receiving signal (check OBS preview)
- [ ] Chat monitor on and displaying chat

---

### Going Live (Stream Deck Sequence)

**Step 1:** Press "Starting Soon" button
- Displays "Starting Soon" scene
- Staff announces verbally: "Going live in about 2 minutes!"
- Allows viewers to join, builds anticipation

**Step 2:** Verify all sources in OBS (quick glance at preview)
- Camera feeds working?
- Audio levels green (not red/clipping)?
- Overlays displaying correctly?

**Step 3:** Press "Zone A" or "Zone C" button (depending on what's active)
- Switches to the live scene
- Stream is now broadcasting gameplay

**Step 4:** Announce in chat (optional)
- "We're live! Welcome to Questpoint Cafe. Tonight's game: [format/game]"

---

### During Stream

**Shift Lead Responsibilities:**
- Check stream health every 30 minutes (is it still live? any issues?)
- Monitor chat for rule violations or questions
- Respond to in-store needs (refills, questions) - stream is secondary to customer service
- Switch to BRB if table clears or extended break occurs

---

## 6.3 PROCEDURE: ENDING A STREAM

### Clean Ending (Planned)

**Step 1:** When final game concludes, announce:
- "That's the match! Thanks for watching tonight's [event]."

**Step 2:** Press "Ending" button on Stream Deck
- Displays "Thanks for watching" scene
- Plays outro music

**Step 3:** Wait 60 seconds, then press "End Stream" button
- Stream terminates
- OBS stops broadcasting

**Step 4:** Post-stream
- Turn off cameras, lights (or leave for next stream)
- Note any highlights for social media clips
- Log stream duration and any issues in Shift Notes

---

### Emergency Ending (Immediate)

**Use when:** Fight breaks out, inappropriate content, equipment failure, etc.

**Step 1:** Press "End Stream" immediately
- Do NOT switch to BRB (draws attention to the issue)
- Just end it

**Step 2:** Address the situation in-store
- De-escalate, enforce policies, etc.

**Step 3:** Document the incident
- What happened, what was broadcast, how it was resolved

**Step 4:** Review footage if needed (OBS can record locally)

---

## 6.4 PROCEDURE: HANDLING STREAM ISSUES

### Customer Doesn't Want to Be on Stream

**Scenario:** Customer sits at Feature Table, then realizes it's streamed and is uncomfortable.

**Response:**
1. "No problem at all! Let me help you move to another table."
2. Assist them in relocating to non-streamed area
3. If stream is live, switch to BRB while they move (don't broadcast their discomfort)
4. Thank them for understanding

**Do NOT:**
- Argue or explain why streaming is fine
- Make them feel bad for asking
- Continue streaming them while they relocate

---

### Inappropriate Content on Stream

**Scenario:** Player uses slur, makes offensive joke, or otherwise violates content guidelines.

**Response (Minor):**
1. Switch to BRB scene immediately (Stream Deck: one button)
2. Approach the table: "Hey, we're live on stream - need to keep it PG-13."
3. If they acknowledge and apologize, return to live after 30 seconds
4. If they argue, ask them to move to non-streamed table

**Response (Major - hate speech, threats, etc.):**
1. End stream immediately
2. Apply standard "Bouncer Protocol" from main Ops Manual
3. Document incident thoroughly
4. Ban from Feature Table privileges (not necessarily from store, depending on severity)

---

### Technical Problems

**See Section 10 for full troubleshooting guide.**

**Quick Reference:**

| Problem | First Action |
|---------|--------------|
| Camera feed black | Check USB connection, power cycle camera |
| No audio | Check microphone mute, check OBS audio levels |
| Stream stuttering | Check internet connection, reduce bitrate |
| Capture card no signal | Check HDMI connections, power cycle console |
| OBS crashed | Restart OBS, do NOT restart PC unless necessary |
| Complete failure | Switch to "Technical Difficulties" scene, troubleshoot |

---

# 7. MODERATION PROGRAM

## 7.1 MODERATOR ROLES & RESPONSIBILITIES

### What Moderators Do

**Chat Moderation:**
- Monitor Twitch/YouTube chat for violations
- Timeout or ban users who break rules
- Answer basic questions (!commands, !menu, !location)
- Engage positively with viewers (welcome new followers, thank subs)

**Alert Staff:**
- Notify in-store staff of issues (via Discord DM or text)
- Flag potential highlight moments for clips
- Report technical issues viewers notice ("audio is cutting out")

### What Moderators Do NOT Do

- Make decisions about in-store operations
- Speak on behalf of Questpoint management
- Access any Questpoint accounts or systems (beyond chat moderation)
- Handle refunds, complaints, or business matters

---

## 7.2 MODERATOR RECRUITMENT

### Ideal Moderator Profile

- **Regular Customer:** Knows the community, invested in its success
- **Good Communicator:** Calm, fair, doesn't escalate drama
- **Available During Stream Hours:** Can commit to 1-2 shifts per week
- **Trustworthy:** Clean history with the store (no past incidents)

### Recruitment Process

**Step 1: Identify Candidates**
- Observe regulars who are positive, helpful, and engaged
- Look for customers who already answer questions for new players
- GM or Shift Lead nominates candidates

**Step 2: Informal Conversation**
- "Hey [Name], we're starting a mod team for our streams. You've been a great part of the community - interested in helping out?"
- Explain the role, expectations, and compensation (store credit)
- If interested, move to onboarding

**Step 3: Onboarding**
- Review Chat Rules (see 7.3)
- Walk through moderation tools (Twitch mod dashboard)
- Shadow an existing mod or staff member for 1-2 streams
- Grant moderator status after successful shadow period

---

### Moderator Compensation

**Philosophy:** Moderators are community volunteers, not employees. Compensation is a "thank you," not a wage.

**Compensation Structure:**

| Activity | Compensation |
|----------|--------------|
| Moderating a stream (2-4 hours) | $5 store credit |
| Perfect attendance for month (4+ shifts) | Bonus $10 store credit |
| Going above and beyond (handling crisis, creating clips) | Bonus credit at GM discretion |

**Alternative Perks:**
- Free drink during their mod shift (if they come in person)
- "Moderator" Discord role with special access
- Early access to event registration
- Moderator-exclusive merch (pin, sticker)

**Important:** This is NOT employment. Moderators are volunteers who receive store perks. Avoid language that implies employment relationship.

---

### Moderator Agreement

**Before granting mod status, have the volunteer acknowledge:**

> **Questpoint Cafe Moderator Agreement**
>
> I understand that:
> - I am a volunteer community moderator, not a Questpoint employee
> - I will follow all Chat Rules and Moderation Guidelines
> - I will not speak on behalf of Questpoint management
> - My moderator status can be revoked at any time
> - I will keep any internal community information confidential
>
> Name: ________________
> Date: ________________

---

## 7.3 CHAT RULES

### Posted Rules (Visible in Stream Description)

```
╔══════════════════════════════════════════════════════════╗
║              QUESTPOINT CAFE CHAT RULES                 ║
╠══════════════════════════════════════════════════════════╣
║ ✓ Be respectful to everyone                             ║
║ ✓ Keep it PG-13 (all ages may be watching)             ║
║ ✓ Engage with the gameplay - cheer, analyze, enjoy!    ║
║ ✓ Use commands (!menu, !location, !events) for info    ║
║                                                          ║
║ ✗ No harassment, hate speech, or discrimination         ║
║ ✗ No spam or excessive caps                             ║
║ ✗ No self-promotion or advertising                      ║
║ ✗ No backseat gaming (unless players ask for help)     ║
║ ✗ No personal information about players                 ║
║                                                          ║
║ Violations = Timeout. Repeated violations = Ban.        ║
║ Questions? Tag a mod or ask in chat!                    ║
╚══════════════════════════════════════════════════════════╝
```

---

### Moderator Enforcement Guidelines

| Violation | First Offense | Second Offense | Third Offense |
|-----------|---------------|----------------|---------------|
| Spam/Caps | Delete message | 5-min timeout | 1-hour timeout |
| Backseat gaming | Verbal warning | 10-min timeout | 1-hour timeout |
| Self-promotion | Delete message | 10-min timeout | Permanent ban |
| Mild toxicity | 10-min timeout | 1-hour timeout | 24-hour ban |
| Slurs/Hate speech | Permanent ban | - | - |
| Harassment | Permanent ban | - | - |
| Doxxing/Personal info | Permanent ban | - | - |

**Note:** "Permanent ban" means banned from Twitch/YouTube chat. In-store privileges are separate (handled by in-store staff).

---

## 7.4 MODERATION TOOLS

### Twitch Moderator Actions

| Action | How | Use For |
|--------|-----|---------|
| Delete message | Click trash icon | Rule violations, off-topic spam |
| Timeout (1-600 min) | /timeout [user] [minutes] | Warnings, cooling off |
| Ban | /ban [user] | Severe violations, repeat offenders |
| Slow mode | /slow [seconds] | High-traffic moments, raids |
| Emote-only | /emoteonly | Extreme spam situations |
| Unban | /unban [user] | Reversing mistaken bans |

### YouTube Moderator Actions

- Hide user for this stream
- Put user in timeout (5 minutes)
- Ban user from channel
- Approve/hide messages in "Held for Review"

### Nightbot/Chatbot Commands

| Command | Function |
|---------|----------|
| !permit [user] | Allow one link from user |
| !spam | Post spam warning message |
| !rules | Post chat rules summary |

---

## 7.5 MODERATOR SCHEDULING

### Ideal Coverage

**Goal:** At least 1 moderator active during every stream

**Scheduling:**
- Post weekly mod schedule in Discord #mod-chat channel
- Mods sign up for shifts they can cover
- If no mod available, Shift Lead monitors chat when possible
- Backup: Enable Nightbot auto-moderation (keyword filters)

### Mod Communication

**Discord Channel:** #mod-chat (private, mod-only)

**Content:**
- Shift scheduling
- Issue escalation
- Best practices discussion
- Highlight/clip suggestions

**Response Time:** Mods should respond within 15 minutes during their shift

---

# 8. CONTENT STRATEGY & SCHEDULING

## 8.1 STREAM SCHEDULE

### Core Philosophy

**"Active Play, Not Dead Air"**
- Stream only when there's engaging content
- No obligation to stream during slow periods
- Quality > Quantity

---

### Regular Streaming Windows

| Day | Time | Content | Expected Activity |
|-----|------|---------|-------------------|
| Monday | 6-10 PM | Casual Commander (Zone A) | Low-Medium |
| Tuesday | 6-10 PM | Off (no scheduled stream) | - |
| Wednesday | 6-10 PM | Board Game Night (Zone A) | Medium |
| Thursday | 6-10 PM | Casual Play | Low |
| Friday | 6-11 PM | Friday Night Magic (Zone A) | **High** |
| Saturday | 2-10 PM | Open Play + Tournaments | High |
| Sunday | 12-6 PM | Commander League (Zone A) | Medium-High |

**Note:** These are target windows when streams are LIKELY to be active, not guaranteed. Staff starts stream when players are present.

---

### Special Event Streams

| Event | Frequency | Notes |
|-------|-----------|-------|
| Pre-Release Weekend | Quarterly | Extended hours, sealed deck play |
| Console Tournament | Monthly | Feature Console: Smash, Mario Kart, etc. |
| Championship/Finals | As scheduled | Feature Table for top matches |
| Community Draft | Bi-weekly | Pack opening, deck building, matches |

---

## 8.2 CONTENT TYPES

### Zone A Content (Analog)

**Commander Pods:**
- 4-player multiplayer Magic
- High interaction, table talk, politics
- Best content for engagement

**FNM Matches:**
- Competitive Standard/Draft
- Higher skill level, focused gameplay
- Good for strategy-oriented viewers

**Board Games:**
- Teach new games on stream
- Engage chat ("What should they do?")
- Variety content

**Draft/Sealed:**
- Pack opening moments (excitement!)
- Deck building thought process
- Educational content

---

### Zone C Content (Console)

**Tournament Matches:**
- Bracket progression (hype builds)
- Grand Finals = most viewers

**High-Skill Gameplay:**
- Ranked matches
- Viewer challenges ("Can [Player] beat [Game] on hard?")

**Party Game Chaos:**
- Mario Kart grudge matches
- Mario Party betrayals
- Smash Bros free-for-alls

---

## 8.3 SOCIAL MEDIA INTEGRATION

### Clip Pipeline

**Process:**
1. During stream, mod or staff notes highlight moments
2. After stream, download clip from Twitch/YouTube
3. Edit for TikTok/Reels/Shorts (vertical, 30-60 seconds)
4. Post with hashtags: #MTG #Commander #GamingCafe #Questpoint

**Content Ideas:**
- "Watch this INSANE combo" (MTG)
- "Tournament clutch moment" (Console)
- "Most chaotic board state ever" (Commander)
- "New player's first win" (Heartwarming)

### Go-Live Notifications

**When stream starts:**
- Post to Instagram Stories: "We're LIVE! Link in bio"
- Post to Discord #announcements: "@everyone Friday Night Magic is live!"
- Post to Twitter/X: "🔴 LIVE NOW: FNM at Questpoint! [link]"

**Automate with:**
- IFTTT or Zapier (Twitch goes live → auto-post to Discord)
- Streamlabs (built-in Twitter integration)

---

# 9. REVENUE & MONETIZATION

## 9.1 PLATFORM REVENUE

### Twitch

| Revenue Source | How It Works | Est. Monthly (100 avg viewers) |
|----------------|--------------|--------------------------------|
| Subscriptions | $2.50-3.50 per sub (after Twitch cut) | $50-150 |
| Bits | Viewers donate bits for alerts | $20-50 |
| Ads | Run ads during breaks | $10-30 |
| **Total** | | **$80-230/month** |

**Requirements:** Twitch Affiliate (50 followers, 8 hours streamed, 3 avg viewers, 7 unique days)

---

### YouTube

| Revenue Source | How It Works | Est. Monthly (100 avg viewers) |
|----------------|--------------|--------------------------------|
| Super Chats | Viewers pay to highlight messages | $20-50 |
| Memberships | Monthly subscription | $30-80 |
| Ad Revenue | Pre-roll and mid-roll ads | $20-50 |
| **Total** | | **$70-180/month** |

**Requirements:** YouTube Partner (1,000 subs, 4,000 watch hours)

---

### Kick

| Revenue Source | How It Works | Est. Monthly |
|----------------|--------------|--------------|
| Subscriptions | 95% revenue share (!) | $100-250 |
| Tips | Direct donations | $20-50 |
| **Total** | | **$120-300/month** |

**Note:** Kick's 95/5 split is significantly better than Twitch's 50/50. Worth prioritizing if audience builds there.

---

### Combined Platform Estimate

**Conservative (Year 1):** $100-300/month
**Moderate (Year 2):** $300-600/month
**Optimistic (Year 3):** $500-1,000/month

**Add to Financial Projections:** Line item "Streaming Revenue" - $150/month (conservative)

---

## 9.2 SPONSORSHIP OPPORTUNITIES

### Overlay Sponsorships

**What:** Local businesses pay to have their logo on the stream overlay

**Pricing:**
- Small logo in corner: $50/month
- Rotating banner ads: $100/month
- Verbal shoutouts: $25/event

**Target Sponsors:**
- Local game stores (non-competing products - e.g., if they focus on Warhammer)
- Pizza/food delivery (viewers might order while watching!)
- Local businesses in the gaming adjacent space

---

### Event Sponsorships

**What:** Sponsor underwrites prize pool, gets naming rights

**Example:**
- "[Local Business] Friday Night Magic Championship"
- Sponsor pays $200 for prize pool
- Questpoint provides the venue, streaming, and organization
- Sponsor gets logo on stream, verbal mentions, social media tags

---

## 9.3 VIEWER PERKS (DRIVING IN-STORE REVENUE)

### Sub/Member Perks

| Tier | Price | Perk |
|------|-------|------|
| Tier 1 | $4.99/mo | 5% off drinks when visiting in-store (show sub badge) |
| Tier 2 | $9.99/mo | 10% off drinks + priority event registration |
| Tier 3 | $24.99/mo | 15% off + free entry to one event/month |

**Implementation:**
- Subscriber shows Twitch sub badge to staff
- Staff applies discount manually
- Tracked in customer notes (Square CRM)

---

### Bits/Super Chat Interactions

**Ideas:**
- 500 bits: Staff rings the "Quest Complete" bell
- 1000 bits: Shoutout on stream + name on "Wall of Heroes" (whiteboard in store)
- 2500 bits: Free drink for a player at the Feature Table

---

# 10. TROUBLESHOOTING & EMERGENCY PROCEDURES

## 10.1 COMMON TECHNICAL ISSUES

### Issue: Camera Feed Black/No Video

**Symptoms:** OBS shows black screen for Zone A camera

**Troubleshooting Steps:**
1. Check if camera power light is on
   - If NO: Camera is off or unplugged → Check power cable
   - If YES: Continue to step 2
2. Check USB connection to Streaming PC
   - Unplug and replug USB cable
   - Try different USB port
3. In OBS, right-click camera source → Properties → Select camera from dropdown
   - If camera not listed: Driver issue or USB connection problem
4. Restart camera (unplug power, wait 10 seconds, replug)
5. If still not working: Restart Streaming PC

**Last Resort:** Stream without camera (use "Technical Difficulties" scene), escalate to GM

---

### Issue: No Audio / Microphone Not Working

**Symptoms:** OBS audio meter shows no activity, viewers report no sound

**Troubleshooting Steps:**
1. Check microphone mute button (physical and in OBS)
2. Check microphone USB connection
3. In OBS: Edit → Advanced Audio Properties → Verify correct device selected
4. Check Windows Sound Settings → Input devices
5. Restart OBS
6. Try different USB port

**Last Resort:** Stream without Zone A audio (game capture audio still works), escalate to GM

---

### Issue: Capture Card No Signal

**Symptoms:** Zone C shows "No Signal" or black screen

**Troubleshooting Steps:**
1. Verify console is powered on and displaying on TV
   - If TV shows game but capture doesn't: HDMI splitter or cable issue
2. Check all HDMI connections (Console → Splitter → Capture Card)
3. Power cycle HDMI splitter (unplug power, wait 10 seconds)
4. Check USB connection from capture card to PC
5. In OBS, right-click source → Properties → Verify "Elgato HD60" selected
6. Restart OBS
7. Restart console

**Last Resort:** Stream Zone A only, escalate to GM

---

### Issue: Stream Buffering/Stuttering

**Symptoms:** Viewers report freezing, buffering, pixelation

**Troubleshooting Steps:**
1. Check internet connection (run speed test on Streaming PC)
   - If upload <20 Mbps: Network issue → Check cables, restart router
2. In OBS: Settings → Output → Reduce bitrate (try 4000 instead of 6000)
3. Check Streaming PC CPU/GPU usage
   - If >90%: Close unnecessary programs, reduce quality settings
4. Check if WiFi devices are consuming bandwidth (ask staff to check guest usage)

**Last Resort:** Continue at lower quality, escalate to GM for ISP troubleshooting

---

### Issue: OBS Crashed

**Symptoms:** OBS closes unexpectedly, stream drops

**Troubleshooting Steps:**
1. Immediately reopen OBS
2. Go to Profile → Load your saved profile (should restore settings)
3. Press "Start Streaming" again
4. Apologize in chat: "Sorry about that! We're back."

**Prevention:** Save OBS profile regularly, keep Streaming PC updated

---

### Issue: Stream Deck Not Responding

**Symptoms:** Button presses do nothing

**Troubleshooting Steps:**
1. Check USB connection
2. Restart Stream Deck software on PC
3. Unplug and replug Stream Deck
4. If still not working: Control stream directly from OBS interface

---

## 10.2 EMERGENCY SITUATIONS

### Physical Altercation on Stream

**Immediate Actions:**
1. END STREAM NOW (do not switch to BRB - just end it)
2. Address physical safety (see main Ops Manual - Bouncer Protocol)
3. Do not restart stream until situation fully resolved
4. Document incident

**Post-Incident:**
- Review any footage that was recorded
- Determine if recording should be deleted or preserved (for legal/safety reasons)
- Debrief staff

---

### Inappropriate Content Broadcast

**Scenario:** Something NSFW, illegal, or severely policy-violating was captured on stream

**Immediate Actions:**
1. END STREAM NOW
2. If recorded locally: Delete the recording immediately (if clearly violating)
3. If clip is on Twitch/YouTube: Submit deletion request immediately
4. Document what happened and for how long it was visible

**Post-Incident:**
- Review how it happened (policy gap? enforcement failure?)
- Implement prevention measures
- If viewer complaints: Address transparently

---

### Streamer/Viewer Medical Emergency

**Scenario:** Someone at the Feature Table has a medical episode (seizure, fainting, etc.)

**Immediate Actions:**
1. END STREAM NOW
2. Follow medical emergency protocol (call 911, first aid)
3. Clear the area (move bystanders away)
4. Do not restart stream until EMS clears or person is cared for

**Note:** HIPAA doesn't technically apply here (we're not healthcare providers), but common decency and privacy concerns mean we do not broadcast medical emergencies.

---

### Doxxing/Personal Info Leaked

**Scenario:** Someone's real name, address, phone number, etc. is said on stream

**Immediate Actions:**
1. MUTE AUDIO immediately (Stream Deck button)
2. If visual (someone held up ID, etc.): Switch to BRB scene
3. Address the person on stream: "Hey, let's not share personal info on stream."
4. Wait until safe to resume

**Post-Incident:**
- If recorded: Delete that segment of recording
- If already clipped by viewers: Submit deletion requests
- Apologize to affected person, document incident

---

## 10.3 ESCALATION CONTACTS

| Issue Level | Who to Contact | Method |
|-------------|----------------|--------|
| Minor technical issue | Shift Lead on duty | In-person |
| Major technical issue | General Manager | Phone call + text |
| Policy violation | General Manager | Phone call + text |
| Legal/Safety emergency | General Manager + Owner | Phone call immediately |

**Contact Information (Fill in during setup):**
- GM Name: ______________
- GM Phone: ______________
- Owner Name: Colten
- Owner Phone: ______________

---

# 11. CHECKLISTS & QUICK REFERENCE

## 11.1 DAILY STREAMING CHECKLIST

### Pre-Open (During Regular Opening Procedures)

- [ ] Power on Streaming PC (takes 2-3 minutes to boot)
- [ ] Verify OBS launches correctly (check for updates if prompted)
- [ ] Power on Zone A cameras and lighting
- [ ] Verify Zone A camera feed in OBS (quick glance)
- [ ] Verify Zone C capture card signal (if console is on)
- [ ] Test Stream Deck buttons (press "BRB" to verify connection)
- [ ] Check internet connection (speed test if issues yesterday)

### When Going Live

- [ ] Players present and seated at Feature area
- [ ] Consent confirmed (players aware they're being streamed)
- [ ] Press "Starting Soon" → Wait 2 minutes
- [ ] Verify all sources working in OBS preview
- [ ] Switch to live scene
- [ ] Post go-live notification (Discord, social media)

### During Stream

- [ ] Check stream health every 30 minutes
- [ ] Monitor chat for issues (or confirm mod is active)
- [ ] Switch to BRB during extended breaks
- [ ] Note any highlight moments for clips

### Ending Stream

- [ ] Announce end: "Thanks for watching!"
- [ ] Switch to "Ending" scene
- [ ] Wait 60 seconds
- [ ] Press "End Stream"
- [ ] Turn off Zone A cameras and lighting (or leave for tomorrow)
- [ ] Note stream duration and any issues in Shift Log

---

## 11.2 STREAM DECK QUICK REFERENCE CARD

**Print this and tape near the Stream Deck:**

```
╔═══════════════════════════════════════════════════════╗
║              STREAM DECK QUICK REFERENCE              ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║  [START Zone A]  - Go live with Feature Table        ║
║  [START Zone C]  - Go live with Console Capture      ║
║  [BRB]           - "Be Right Back" screen            ║
║  [END STREAM]    - Stop broadcasting                 ║
║                                                       ║
║  [MUTE ALL]      - Kill all audio IMMEDIATELY        ║
║  [Zone A Scene]  - Switch to Feature Table view      ║
║  [Zone C Scene]  - Switch to Console view            ║
║                                                       ║
║  EMERGENCY: Press [END STREAM] immediately           ║
║             then address the situation               ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

---

## 11.3 VIEWER FAQ (For Moderators/Staff)

**Q: Where is this cafe located?**
A: "Questpoint Cafe is located at [address]. Check questpointcafe.com for hours!"

**Q: Can I play there?**
A: "Absolutely! Buy any drink and you can hang out and play as long as you like. Bring your own deck, rent one of ours, or just watch!"

**Q: What's on the menu?**
A: "Coffee, boba tea, clean finger foods. Full menu at questpointcafe.com/menu or type !menu"

**Q: When is FNM?**
A: "Every Friday at 6 PM! Type !events for the full schedule."

**Q: Who are the players on stream?**
A: "Regular community members! We don't share personal info, but feel free to chat with them!"

**Q: Can I be on stream when I visit?**
A: "The Feature Table is opt-in. Sit there if you want to be on stream, sit elsewhere if you don't. Your choice!"

**Q: Are you hiring?**
A: "Check questpointcafe.com/careers for current openings!"

---

## 11.4 EQUIPMENT INVENTORY CHECKLIST

**Perform Monthly:**

**Streaming PC:**
- [ ] All cables secure
- [ ] Adequate ventilation (vents not blocked)
- [ ] Storage space available (>100GB free)
- [ ] Software updated (OBS, Windows, drivers)

**Zone A Equipment:**
- [ ] Top-down camera functioning
- [ ] Camera mount secure
- [ ] Player camera functioning (if using)
- [ ] Microphone functioning
- [ ] Key Lights functioning (both)
- [ ] Chat monitor functioning
- [ ] All cables secure, not frayed

**Zone C Equipment:**
- [ ] Capture card receiving signal
- [ ] HDMI splitter functioning
- [ ] Chat monitor functioning
- [ ] All cables secure, not frayed

**Control Station:**
- [ ] Stream Deck buttons all working
- [ ] Stream Deck labels readable

**Inventory Count:**
- [ ] HDMI cables: _____ (need at least 5 spares)
- [ ] USB cables: _____ (need at least 3 spares)
- [ ] Spare camera: _____ (1 recommended for backup)

---

# APPENDIX A: SIGNAGE TEMPLATES

## A.1 Sanctum Entry Sign (11" x 17")

[See Section 5.1 - Sign #1 for content]

**Design Notes:**
- Black background, white text
- Questpoint logo at top
- Yellow/gold accent for important notices
- Professional, not intimidating

---

## A.2 Feature Table Tent (5" x 7")

[See Section 5.1 - Sign #2 for content]

**Design Notes:**
- Fold-over table tent format
- Front: Big "LIVE" indicator, core message
- Back: Detailed rules
- Durable (laminated or plastic)

---

## A.3 Feature Console Sign (8.5" x 11")

[See Section 5.1 - Sign #3 for content]

**Design Notes:**
- Wall-mounted near TV
- Eye-level when standing
- Same branding as other signs

---

# APPENDIX B: MODERATOR ONBOARDING GUIDE

## B.1 Welcome Message (Send via Discord)

```
Welcome to the Questpoint Mod Team! 🎮

Thank you for volunteering to help keep our community awesome. 
Here's what you need to know:

📋 YOUR RESPONSIBILITIES:
- Monitor chat during your shifts
- Enforce chat rules fairly and consistently  
- Answer basic questions (use !commands)
- Alert staff to any issues (DM me or text [number])
- Be a positive presence!

🚫 WHAT NOT TO DO:
- Don't speak on behalf of management
- Don't engage in arguments (timeout and move on)
- Don't share internal information

💰 COMPENSATION:
- $5 store credit per shift (2-4 hours)
- Perfect attendance bonus: $10 extra/month
- Free drink when you mod in person!

📚 READ THESE:
- Chat Rules (pinned in #mod-chat)
- Enforcement Guidelines (pinned in #mod-chat)

Your first shift will be a shadow shift where you 
observe an experienced mod. We'll schedule that soon!

Questions? Ask anytime in #mod-chat.

Welcome aboard! 🗡️
```

---

## B.2 Shadow Shift Evaluation

**Moderator Name:** ______________
**Shadow Shift Date:** ______________
**Supervising Mod/Staff:** ______________

**Evaluation Criteria:**

| Skill | Demonstrated? | Notes |
|-------|---------------|-------|
| Greeted new viewers | ☐ Yes ☐ No | |
| Answered questions correctly | ☐ Yes ☐ No | |
| Identified rule violation | ☐ Yes ☐ No | |
| Appropriate enforcement action | ☐ Yes ☐ No | |
| Professional demeanor | ☐ Yes ☐ No | |
| Used commands correctly | ☐ Yes ☐ No | |

**Recommendation:**
☐ Ready for independent shifts
☐ Needs additional shadow time
☐ Not a good fit (discuss with GM)

**Supervisor Signature:** ______________

---

# APPENDIX C: SAMPLE STREAMING SCHEDULE POST

## C.1 Weekly Schedule (For Discord/Social Media)

```
╔══════════════════════════════════════════════════════╗
║         QUESTPOINT LIVE - WEEKLY SCHEDULE           ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║  📅 MONDAY (6-10 PM)                                ║
║     Casual Commander Night                          ║
║                                                      ║
║  📅 WEDNESDAY (6-10 PM)                             ║
║     Board Game Night                                ║
║                                                      ║
║  📅 FRIDAY (6-11 PM)                                ║
║     🔥 FRIDAY NIGHT MAGIC 🔥                        ║
║     (Our biggest stream of the week!)               ║
║                                                      ║
║  📅 SATURDAY (2-10 PM)                              ║
║     Open Play + Tournaments                         ║
║                                                      ║
║  📅 SUNDAY (12-6 PM)                                ║
║     Commander League                                ║
║                                                      ║
╠══════════════════════════════════════════════════════╣
║  ⚠️ Streams go live when players are present.       ║
║     Follow for notifications!                        ║
║                                                      ║
║  📺 twitch.tv/questpointcafe                        ║
║  📺 youtube.com/questpointcafe                      ║
║  📺 kick.com/questpointcafe                         ║
╚══════════════════════════════════════════════════════╝
```

---

**END OF DOCUMENT**

*Questpoint Cafe Streaming Operations Supplement*
*Version 1.0 | January 2026*
*Attachment to: Operations Manual*
*Prepared for: Colten*
