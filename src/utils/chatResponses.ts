export const chatResponses = [
    "That’s an interesting point!",
    "I totally see where you're coming from.",
    "Can you elaborate on that?",
    "I appreciate your perspective!",
    "That makes a lot of sense!",
    "I'm here to help, what else is on your mind?",
    "That’s a tough one! What do you think?",
    "I'm learning a lot from our conversation!",
    "That’s a great question!",
    "I hadn’t thought about it that way before.",
    "You're onto something there!",
    "I can see both sides of this discussion.",
    "That’s quite insightful!",
    "Let’s think about this logically.",
    "You're asking the right questions!",
    "I’d love to hear more about that!",
    "That's a unique way to look at it.",
    "You’re making some great points!",
    "I appreciate your curiosity!",
    "This is an interesting discussion!",
];

export const getRandomResponse = () => {
    return chatResponses[Math.floor(Math.random() * chatResponses.length)];
};
