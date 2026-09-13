export type FAQ = {
  question: string
  answer: string
}

/**
 * Designathon FAQs, in the order they read best: eligibility and cost first,
 * then what the weekend asks of you, then the application process, then who to
 * ask. The page renders questions with `uppercase`, so they are stored in
 * sentence case — the CSS does the shouting.
 */
export const faqs: FAQ[] = [
  {
    question: 'Who can participate?',
    answer:
      'You must 1) be a student at the undergraduate level or have graduated no earlier than January 2025, and 2) be able to commute to Hamilton, Ontario at your own expense to attend the event. Unfortunately, high school students are unable to participate at this time.',
  },
  {
    question: 'Is it free?',
    answer: 'Yes, the Designathon is completely free for all students.',
  },
  {
    question: "What if I don't know how to use CAD?",
    answer:
      "Don't worry, we will have workshops throughout the competition for students at all skill levels. We also have an enthusiastic and knowledgeable technical team that can help and guide you at every step of the way.",
  },
  {
    question: 'Can I come from a different school?',
    answer:
      'For sure! Please note that this is an overnight event. Make sure to bring your sleeping bag and pillow as we will have a designated sleeping area for anyone who needs a power nap!',
  },
  {
    question: 'Do I apply individually or as a team?',
    answer:
      'Everyone applies individually, as applications are evaluated blindly. After acceptances are sent out, you can start thinking about who you’d like to team up with or find team members at the event!',
  },
  {
    question: 'How will my application be reviewed?',
    answer:
      'Each answer under the “Application Questions” section of the form will be reviewed anonymously and graded against an objective rubric. Multiple reviewers will grade, and an average of their scores will be taken as the final score. Your score will not be published or shared. In your answers, we’re looking for your creativity, desire to learn, and interest in CAD or design!',
  },
  {
    question: 'How will I know if I am accepted?',
    answer:
      'We will be sending emails starting in mid to late December to the provided email address in the form. Applicants will be accepted on a rolling wave basis using an ordered waitlist.',
  },
  {
    question: 'How does the waitlist work?',
    answer:
      'Applications will be sent on a rolling wave basis in mid to late December. Waitlist order will be based on assigned scores during the application review process. Please carefully watch your email to RSVP as if you miss your RSVP deadline, you will be put at the bottom of the waitlist.',
  },
  {
    question: 'Who can I reach out to if I have more application questions?',
    answer:
      'Message @mdlmcmaster on Instagram, or email us at mdlmcmaster@gmail.com.',
  },
]
