/**
 * ═══════════════════════════════════════════════════════════════
 * VALENTINE SITE — EDITABLE CONFIG
 * Change all text, images, and messages here. No complex code.
 * ═══════════════════════════════════════════════════════════════
 */

const VALENTINE_CONFIG = {
  // ─── Opening scene ─────────────────────────────────────────
  opening: {
    tagline: "Welcome to Iniya's World",
    mainLine: "Iniya, this world exists because you quietly changed mine.",
    // Name that animates letter-by-letter (used in intro)
    herName: "Iniya",
  },

  // ─── Our Story — Edit these messages (add/remove items) ─────
  ourStory: [
    "The day we met, something quietly shifted.",
    "What we share grew naturally — without force or fear.",
    "With you, life feels more grounded and meaningful.",
    "This is our story — still unfolding, still becoming.",
  ],

  // ─── Memories Gallery — Add your image paths (10–20 supported) ─
  // Use: "images/photo1.jpg", "images/photo2.jpg", etc.
  galleryImages: [
    "images/memory1.jpg",
    "images/memory2.jpg",
    "images/memory3.jpg",
    "images/memory4.jpg",
    "images/memory5.jpg",
    "images/memory6.jpg",
    "images/memory7.jpg",
    "images/memory8.jpg",
    "images/memory9.jpg",
    "images/memory10.jpg",
  ],

  // ─── Special Notes — Clickable hearts; each opens this message ─
  loveNotes: [
    "You bring calm into my chaos.",
    "You inspire me more than you know.",
    "With you, I feel grounded.",
    "I admire your strength and your softness.",
    "You make life feel lighter.",
    "Being with you feels natural.",
    "I'm grateful for you.",
    "I like us — just as we are.",
  ],

  // ─── Why I Like You — Reasons (add/remove as you like) ───────
  whyILoveYou: [
    "Your strength, even on difficult days",
    "The way you handle life with quiet confidence",
    "Your kindness — especially when no one is watching",
    "How you motivate people just by being yourself",
    "Your ability to lead and still care deeply",
    "The calm energy you bring into my life",
    "Your courage to dream bigger",
    "Your honesty and emotional depth",
    "The way you inspire growth",
    "Simply being you",
  ],

  // ─── Letter in envelope (tap envelope to open and read) ─────
  letter: `Iniya,

Valentine's Day often comes with expectations — big words, grand gestures, and labels that try to define what love should look like.

But when I think of you, I don't feel the need to define anything.
I just feel grateful.

Grateful for the way you entered my life quietly, without force.
Grateful for the strength you carry so naturally.
Grateful for the calm, motivation, and inspiration you bring into my world simply by being you.

I admire the way you handle your life — your responsibilities, your career, your dreams — all with a grace that never asks for applause. Watching you grow, lead, and still dream bigger reminds me how powerful steady strength can be.

You've supported me in ways I'll never take lightly. You believed in me during uncertain moments, stood beside me when things were heavy, and helped not because you had to — but because you cared. That kind of support leaves a mark. It changed me.

What I feel for you isn't rushed or loud. It's calm, grounded, and real.
It's respect mixed with attraction.
Admiration mixed with comfort.
I don't need to name it to know it matters.

I like who I am when I'm with you.
I feel more focused.
More motivated.
More alive.

I believe in myself.
I believe in you.
And I believe in the idea of growing — side by side — without pressure, without timelines, just with honesty and intention.

This Valentine's Day, I just want you to know this:
You matter to me.
Your presence matters to me.
And I'm grateful that it's you.

Always yours, in my own way,
Arul`,

  // ─── Final scene ───────────────────────────────────────────
  final: {
    message: "Happy Valentine's Day, Iniya",
    buttonText: "This Is Just the Beginning",
  },

  // ─── Optional: background music (set path or null to disable) ─
  music: {
    enabled: true,
    src: "audio/background.mp3", // Add your file to /audio/
  },

  // ─── Late Night Thoughts (tap to reveal a thought) ──────────
  lateNightThoughts: [
    "Sometimes I wonder if you know how much you changed my life — quietly.",
    "I like the version of me that appears when you're around.",
    "Not every good thing needs a label. Some things just are.",
    "I thought about you today. More than once. (Okay, a lot.)",
    "Your calm is contagious. In a good way.",
    "Some nights I just sit with the fact that we exist in the same world.",
  ],

  // ─── If We Were Here Together (scenario cards: title → scene) ─
  ifWeWereHereTogether: [
    { title: "A café at 2am", scene: "You're half-asleep. I'm pretending I'm not. The coffee's cold. We're still talking. Neither of us wants to leave first." },
    { title: "A train ride with no destination", scene: "We don't know where we're going. We have snacks. We have time. That's enough." },
    { title: "Rain outside, silence inside", scene: "We don't have to say anything. The rain says it. You're here. I'm here. That's the whole scene." },
    { title: "A park bench at golden hour", scene: "The light makes everything soft. You're telling me something small. I'm storing it somewhere safe." },
    { title: "A kitchen, something cooking", scene: "One of us is stirring. One of us is in the way. We're both laughing. It doesn't matter what we're making." },
  ],

  // ─── Things I Never Say Out Loud (shown one by one, randomized) ─
  thingsINeverSay: [
    "I act calm, but I get a little nervous before seeing you.",
    "I notice when you're tired. I don't always say it.",
    "Your laugh is my favorite sound. I've never told you that.",
    "I save small things you say and think about them later.",
    "I'm proud of you more often than I say.",
    "Sometimes I just want to sit next to you and do nothing. That's it.",
    "I deleted this sentence five times. (This is the sixth.)",
    "You make ordinary moments feel like they matter. I don't know how.",
  ],

  // ─── Closure page: "This doesn't end here" ──────────────────
  closure: {
    line: "Some things are still being written.",
    subline: "Thank you for being part of the story.",
  },

  // ─── Humor & self-aware (soft, human) ───────────────────────
  humor: {
    loadingCourage: "Loading courage…",
    buttonSigh: "…",
    fakeErrorTitle: "Something went wrong",
    fakeErrorMessage: "Just kidding. You're doing great. Here's a love note instead.",
    hiddenNote: "Yes, I was smiling while building this.",
    warning: "Warning: May cause quiet smiling.",
    overthought: "This part took longer because I overthought it.",
  },

  // ─── Easter eggs (hidden rewards) ───────────────────────────
  easterEggs: {
    longPressName: "You found the quiet part. Hi. You're seen.",
    hundredHearts: "100 hearts. You stayed. That means something.",
    caughtHeart: "You caught it. Keep it.",
    slowScrollHint: "You scroll like someone who reads. Thank you.",
    nightMessage: "It's late. Rest when you can. You're still on my mind.",
  },
};

// Make config available globally for app
window.VALENTINE_CONFIG = VALENTINE_CONFIG;
