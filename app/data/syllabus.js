/**
 * Easy English — app-wide English learning syllabus.
 * Each level is a clear route through the available practice screens.
 */
const ENGLISH_SYLLABUS = [
  {
    id: 'beginner', label: 'Beginner', mg: 'Vao manomboka', goal: 'Understand and use your first everyday English sentences.',
    units: [
      { title: 'Meet and greet', focus: 'Hello, names, feelings and polite words', view: 'conversations' },
      { title: 'People and family', focus: 'I am, you are, my family and simple descriptions', view: 'vocabulary' },
      { title: 'Numbers, colours and classroom', focus: 'Count, describe and follow simple school instructions', view: 'classroom' },
      { title: 'Present Simple foundations', focus: 'Talk about routines and facts', view: 'grammar' },
      { title: 'Read and write short sentences', focus: 'Read a short school text and write about yourself', view: 'reading' },
      { title: 'First review', focus: 'Listen, speak and practise the words you know', view: 'drills' },
    ],
  },
  {
    id: 'elementary', label: 'Elementary', mg: 'Fototra', goal: 'Build longer sentences and talk about daily life with confidence.',
    units: [
      { title: 'Past and present actions', focus: 'Present Continuous and Past Simple', view: 'grammar' },
      { title: 'Questions and answers', focus: 'Do, does, did and useful WH questions', view: 'grammar' },
      { title: 'Home, food and the market', focus: 'Describe places, people and things you need', view: 'vocabulary' },
      { title: 'Time and plans', focus: 'Say when things happen and talk about the future', view: 'alphabet' },
      { title: 'Everyday conversations', focus: 'Shop, ask for directions and order food', view: 'conversations' },
      { title: 'A clear paragraph', focus: 'Connect sentences with and, but, because and so', view: 'writing' },
    ],
  },
  {
    id: 'pre-intermediate', label: 'Pre-Intermediate', mg: 'Alohan’ny antonony', goal: 'Explain ideas, compare things and manage longer conversations.',
    units: [
      { title: 'Irregular verbs', focus: 'Learn the most common past and participle forms', view: 'irregular-verbs' },
      { title: 'Perfect and future meaning', focus: 'Present Perfect, will and going to', view: 'grammar' },
      { title: 'Describe and compare', focus: 'Adjectives, adverbs, comparisons and detail', view: 'grammar' },
      { title: 'Village, travel and work', focus: 'Useful language for real Malagasy life', view: 'vocabulary' },
      { title: 'Reading for information', focus: 'Find the main idea and important details', view: 'reading' },
      { title: 'Speak in longer turns', focus: 'Tell a story and give a reason for your opinion', view: 'speaking' },
    ],
  },
  {
    id: 'intermediate', label: 'Intermediate', goal: 'Communicate independently and understand more complex English.',
    units: [
      { title: 'Tense control', focus: 'Choose the correct tense and show time clearly', view: 'grammar' },
      { title: 'Complex questions', focus: 'Indirect questions, question tags and polite requests', view: 'grammar' },
      { title: 'Ideas and evidence', focus: 'Explain, compare, justify and give examples', view: 'writing' },
      { title: 'Read between the lines', focus: 'Infer meaning, attitude and purpose in a text', view: 'reading' },
      { title: 'Natural conversation', focus: 'Agree, disagree, clarify and keep a conversation going', view: 'conversations' },
      { title: 'Pronunciation and fluency', focus: 'Stress, linking and clear connected speech', view: 'listening' },
    ],
  },
  {
    id: 'advanced', label: 'Advanced', goal: 'Use precise, flexible English for study, work and formal communication.',
    units: [
      { title: 'Advanced grammar choices', focus: 'Conditionals, passive voice and reported speech', view: 'grammar' },
      { title: 'Academic vocabulary', focus: 'Collocations, register and precise word choice', view: 'vocabulary' },
      { title: 'Argument and opinion', focus: 'Write a clear argument with reasons and evidence', view: 'writing' },
      { title: 'Critical reading', focus: 'Evaluate claims, tone, bias and supporting detail', view: 'reading' },
      { title: 'Professional communication', focus: 'Present ideas, negotiate and solve problems', view: 'conversations' },
      { title: 'Independent review', focus: 'Choose your weak area and practise deliberately', view: 'drills' },
    ],
  },
];
