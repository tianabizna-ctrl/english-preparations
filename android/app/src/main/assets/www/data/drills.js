/**
 * Easy English — Drills & Practice Exercises for Malagasy learners
 *
 * Three types of drills:
 *   fill-gap   — Complete the sentence with the correct word
 *   correction — Find and fix the mistake in the sentence
 *   reorder    — Put the words in the correct order to form a sentence
 */

const DRILLS = {

  // ─── FILL IN THE GAP ───────────────────────────────────────────────
  fillGap: [
    {
      id: 'gap-1',
      level: 'Beginner',
      topic: 'Present Simple',
      sentence: 'I ___ to school every day.',
      answer: 'go',
      options: ['go', 'goes', 'going', 'went'],
      hint: 'Use the base form of the verb after "I".',
    },
    {
      id: 'gap-2',
      level: 'Beginner',
      topic: 'Present Simple',
      sentence: 'She ___ rice for lunch.',
      answer: 'eats',
      options: ['eat', 'eats', 'eating', 'ate'],
      hint: 'He/she/it needs -s on the verb.',
    },
    {
      id: 'gap-3',
      level: 'Beginner',
      topic: 'Articles',
      sentence: 'I saw ___ elephant at the zoo.',
      answer: 'an',
      options: ['a', 'an', 'the', '—'],
      hint: '"Elephant" starts with a vowel sound.',
    },
    {
      id: 'gap-4',
      level: 'Elementary',
      topic: 'Past Simple',
      sentence: 'Yesterday, we ___ to the market.',
      answer: 'went',
      options: ['go', 'goes', 'going', 'went'],
      hint: 'This is an irregular verb in the past.',
    },
    {
      id: 'gap-5',
      level: 'Elementary',
      topic: 'Present Continuous',
      sentence: 'Look! It ___ outside right now.',
      answer: 'is raining',
      options: ['rains', 'is raining', 'rained', 'will rain'],
      hint: 'Something happening right now needs present continuous.',
    },
    {
      id: 'gap-6',
      level: 'Elementary',
      topic: 'Prepositions',
      sentence: 'The book is ___ the table.',
      answer: 'on',
      options: ['in', 'on', 'at', 'under'],
      hint: 'When something is resting above a surface, we say ___ the table.',
    },
    {
      id: 'gap-7',
      level: 'Elementary',
      topic: 'Adjectives',
      sentence: 'She is very ___. She always helps people.',
      answer: 'kind',
      options: ['kind', 'angry', 'tall', 'fast'],
      hint: 'What word describes someone who helps others?',
    },
    {
      id: 'gap-8',
      level: 'Elementary',
      topic: 'Modals',
      sentence: 'You ___ brush your teeth every day.',
      answer: 'should',
      options: ['should', 'can', 'mustn\'t', 'could'],
      hint: 'This word is used for giving advice.',
    },
    {
      id: 'gap-9',
      level: 'Pre-Intermediate',
      topic: 'Future',
      sentence: 'I am going to ___ my grandmother tomorrow.',
      answer: 'visit',
      options: ['visit', 'visiting', 'visited', 'visits'],
      hint: 'After "going to", use the base form of the verb.',
    },
    {
      id: 'gap-10',
      level: 'Pre-Intermediate',
      topic: 'Conditionals',
      sentence: 'If it rains, I ___ stay at home.',
      answer: 'will',
      options: ['will', 'would', 'am', 'was'],
      hint: 'First conditional: if + present, ___ + verb.',
    },
    {
      id: 'gap-11',
      level: 'Pre-Intermediate',
      topic: 'Passive Voice',
      sentence: 'Rice ___ grown in Madagascar.',
      answer: 'is',
      options: ['is', 'are', 'was', 'be'],
      hint: 'Present passive: am / is / are + past participle.',
    },
    {
      id: 'gap-12',
      level: 'Beginner',
      topic: 'Verb to be',
      sentence: 'They ___ happy with the gift.',
      answer: 'are',
      options: ['am', 'is', 'are', 'were'],
      hint: '"They" always uses "are" in the present.',
    },
    {
      id: 'gap-13',
      level: 'Pre-Intermediate',
      topic: 'Reported Speech',
      sentence: 'She said that she ___ tired.',
      answer: 'was',
      options: ['is', 'was', 'am', 'were'],
      hint: 'In reported speech, present becomes past.',
    },
    {
      id: 'gap-14',
      level: 'Elementary',
      topic: 'Comparatives',
      sentence: 'This book is ___ than that one.',
      answer: 'better',
      options: ['good', 'better', 'best', 'more good'],
      hint: '"Good" is irregular — it changes completely in the comparative.',
    },
    {
      id: 'gap-15',
      level: 'Intermediate',
      topic: 'Present Perfect',
      sentence: 'She ___ the report already.',
      answer: 'has finished',
      options: ['has finished', 'finished', 'is finish', 'have finish'],
      hint: 'Use has + past participle for he, she and it.',
    },
    {
      id: 'gap-16',
      level: 'Advanced',
      topic: 'Inversion',
      sentence: 'Rarely ___ we see such a beautiful sunset.',
      answer: 'do',
      options: ['do', 'are', 'have', 'did'],
      hint: 'Negative or limiting adverbs at the beginning can use auxiliary inversion.',
    },
    {
      id: 'gap-17', level: 'Intermediate', topic: 'Relative Clauses',
      sentence: 'This is the book ___ I recommended.', answer: 'that',
      options: ['who', 'that', 'where', 'when'], hint: 'Use that or which for a thing.'
    },
    {
      id: 'gap-18', level: 'Intermediate', topic: 'Modal Possibility',
      sentence: 'The lights are on; someone ___ be home.', answer: 'must',
      options: ['must', 'shouldn’t', 'wouldn’t', 'needn’t'], hint: 'Use must for a strong deduction.'
    },
    {
      id: 'gap-19', level: 'Intermediate', topic: 'Cohesion',
      sentence: 'The road was closed. ___, we chose another route.', answer: 'Therefore',
      options: ['Although', 'Therefore', 'Unless', 'Despite'], hint: 'Choose the connector showing a result.'
    },
    {
      id: 'gap-20', level: 'Intermediate', topic: 'Passive Voice',
      sentence: 'The results ___ published yesterday.', answer: 'were',
      options: ['was', 'were', 'have', 'did'], hint: 'Results is plural; use were + past participle.'
    },
    {
      id: 'gap-21', level: 'Advanced', topic: 'Mixed Conditionals',
      sentence: 'If I had studied medicine, I ___ work in a hospital now.', answer: 'would',
      options: ['will', 'would', 'had', 'have'], hint: 'A past condition has a present result: would + base verb.'
    },
    {
      id: 'gap-22', level: 'Advanced', topic: 'Inversion',
      sentence: 'Rarely ___ we see such careful work.', answer: 'do',
      options: ['do', 'are', 'have', 'did'], hint: 'Put the auxiliary before the subject.'
    },
    {
      id: 'gap-23', level: 'Advanced', topic: 'Formal Register',
      sentence: 'The committee recommended that the policy ___ revised.', answer: 'be',
      options: ['is', 'be', 'was', 'being'], hint: 'Formal recommendations can use the subjunctive base form.'
    },
    {
      id: 'gap-24', level: 'Advanced', topic: 'Hedging',
      sentence: 'The evidence is ___ limited to support that claim.', answer: 'too',
      options: ['very', 'too', 'enough', 'such'], hint: 'Use too + adjective when something is more than is useful or possible.'
    },
  ],

  // ─── ERROR CORRECTION ──────────────────────────────────────────────
  correction: [
    {
      id: 'corr-1',
      level: 'Beginner',
      topic: 'Subject-Verb Agreement',
      wrong: 'She go to school every day.',
      right: 'She goes to school every day.',
      explanation: 'He/she/it needs an -s on the verb in present simple.',
    },
    {
      id: 'corr-2',
      level: 'Beginner',
      topic: 'Verb to be',
      wrong: 'I is a student.',
      right: 'I am a student.',
      explanation: 'With "I", we use "am", not "is".',
    },
    {
      id: 'corr-3',
      level: 'Beginner',
      topic: 'Articles',
      wrong: 'I have a apple.',
      right: 'I have an apple.',
      explanation: '"Apple" starts with a vowel sound, so we use "an".',
    },
    {
      id: 'corr-4',
      level: 'Elementary',
      topic: 'Past Tense',
      wrong: 'Yesterday I go to the market.',
      right: 'Yesterday I went to the market.',
      explanation: 'For past actions, use the past form: go → went.',
    },
    {
      id: 'corr-5',
      level: 'Elementary',
      topic: 'Negatives',
      wrong: 'I not like coffee.',
      right: 'I do not like coffee.',
      explanation: 'We need "do not" (don\'t) to make negatives with most verbs.',
    },
    {
      id: 'corr-6',
      level: 'Elementary',
      topic: 'Present Continuous',
      wrong: 'She is read a book now.',
      right: 'She is reading a book now.',
      explanation: 'Present continuous needs verb-ing: am/is/are + verb-ing.',
    },
    {
      id: 'corr-7',
      level: 'Elementary',
      topic: 'Prepositions',
      wrong: 'I go to school in Monday.',
      right: 'I go to school on Monday.',
      explanation: 'Use "on" for days (Monday, Tuesday...) and "in" for months or years.',
    },
    {
      id: 'corr-8',
      level: 'Pre-Intermediate',
      topic: 'Modal Verbs',
      wrong: 'I can to swim very well.',
      right: 'I can swim very well.',
      explanation: 'After "can", use the base verb WITHOUT "to".',
    },
    {
      id: 'corr-9',
      level: 'Pre-Intermediate',
      topic: 'Conditionals',
      wrong: 'If I will have money, I will buy a car.',
      right: 'If I have money, I will buy a car.',
      explanation: 'After "if" in first conditional, use present simple, NOT "will".',
    },
    {
      id: 'corr-10',
      level: 'Pre-Intermediate',
      topic: 'Comparatives',
      wrong: 'She is more taller than me.',
      right: 'She is taller than me.',
      explanation: 'Short adjectives add -er. Do not use "more" with -er.',
    },
    {
      id: 'corr-11',
      level: 'Beginner',
      topic: 'Plurals',
      wrong: 'I have two childs.',
      right: 'I have two children.',
      explanation: '"Child" is irregular in the plural: child → children.',
    },
    {
      id: 'corr-12',
      level: 'Elementary',
      topic: 'Word Order',
      wrong: 'I like very much football.',
      right: 'I like football very much.',
      explanation: 'In English, the object comes right after the verb, before adverbs.',
    },
    {
      id: 'corr-13',
      level: 'Intermediate',
      topic: 'Perfect Tenses',
      wrong: 'I have saw that film twice.',
      right: 'I have seen that film twice.',
      explanation: 'After have or has, use the past participle: see → saw → seen.',
    },
    {
      id: 'corr-14',
      level: 'Advanced',
      topic: 'Conditionals',
      wrong: 'If I would have known, I would have helped.',
      right: 'If I had known, I would have helped.',
      explanation: 'In the third conditional, use past perfect after if.',
    },
    {
      id: 'corr-15', level: 'Intermediate', topic: 'Relative Clauses',
      wrong: 'The woman which helped us was a nurse.', right: 'The woman who helped us was a nurse.',
      explanation: 'Use who for people and which for things.'
    },
    {
      id: 'corr-16', level: 'Intermediate', topic: 'Reported Speech',
      wrong: 'She asked me where was the station.', right: 'She asked me where the station was.',
      explanation: 'Indirect questions use statement word order after the question word.'
    },
    {
      id: 'corr-17', level: 'Intermediate', topic: 'Cohesion',
      wrong: 'The plan is affordable. However it needs more volunteers.', right: 'The plan is affordable. However, it needs more volunteers.',
      explanation: 'Use a comma after a sentence-opening discourse marker such as However.'
    },
    {
      id: 'corr-18', level: 'Intermediate', topic: 'Modal Deduction',
      wrong: 'She must to be at home.', right: 'She must be at home.',
      explanation: 'A modal verb is followed by the base verb without to.'
    },
    {
      id: 'corr-19', level: 'Advanced', topic: 'Inversion',
      wrong: 'Never before I have seen such a view.', right: 'Never before have I seen such a view.',
      explanation: 'A negative fronted expression requires auxiliary inversion.'
    },
    {
      id: 'corr-20', level: 'Advanced', topic: 'Formal Register',
      wrong: 'The report says the project is kinda expensive.', right: 'The report states that the project is rather expensive.',
      explanation: 'Replace informal wording with a precise formal alternative.'
    },
    {
      id: 'corr-21', level: 'Advanced', topic: 'Participle Clauses',
      wrong: 'Having forgot the key, I returned home.', right: 'Having forgotten the key, I returned home.',
      explanation: 'After having, use the past participle: forgotten.'
    },
    {
      id: 'corr-22', level: 'Advanced', topic: 'Punctuation',
      wrong: 'The proposal has three aims to reduce waste improve access and build trust.', right: 'The proposal has three aims: to reduce waste, improve access, and build trust.',
      explanation: 'Use a colon before the list and commas between list items.'
    },
  ],

  // ─── SENTENCE REORDER ──────────────────────────────────────────────
  reorder: [
    {
      id: 'ord-1',
      level: 'Beginner',
      topic: 'Simple Sentence',
      words: ['I', 'to', 'school', 'every day', 'go'],
      correct: 'I go to school every day.',
    },
    {
      id: 'ord-2',
      level: 'Beginner',
      topic: 'Verb to be',
      words: ['She', 'is', 'a', 'kind', 'teacher'],
      correct: 'She is a kind teacher.',
    },
    {
      id: 'ord-3',
      level: 'Beginner',
      topic: 'Question',
      words: ['are', 'you', 'How', '?'],
      correct: 'How are you?',
    },
    {
      id: 'ord-4',
      level: 'Elementary',
      topic: 'Present Continuous',
      words: ['is', 'The baby', 'sleeping', 'now'],
      correct: 'The baby is sleeping now.',
    },
    {
      id: 'ord-5',
      level: 'Elementary',
      topic: 'Adverbs of Frequency',
      words: ['always', 'I', 'early', 'wake up'],
      correct: 'I always wake up early.',
      hint: 'Adverbs of frequency come BEFORE the main verb.',
    },
    {
      id: 'ord-6',
      level: 'Pre-Intermediate',
      topic: 'Negatives',
      words: ['does not', 'She', 'like', 'coffee'],
      correct: 'She does not like coffee.',
    },
    {
      id: 'ord-7',
      level: 'Pre-Intermediate',
      topic: 'Conditional',
      words: ['If', 'it rains', 'will stay', 'we', 'at home'],
      correct: 'If it rains, we will stay at home.',
    },
    {
      id: 'ord-8',
      level: 'Elementary',
      topic: 'Past Tense',
      words: ['yesterday', 'They', 'visited', 'grandparents', 'their'],
      correct: 'They visited their grandparents yesterday.',
    },
    {
      id: 'ord-9',
      level: 'Pre-Intermediate',
      topic: 'Passive',
      words: ['is', 'in', 'English', 'spoken', 'many countries'],
      correct: 'English is spoken in many countries.',
    },
    {
      id: 'ord-10',
      level: 'Elementary',
      topic: 'Prepositions',
      words: ['The cat', 'is', 'under', 'the table'],
      correct: 'The cat is under the table.',
    },
    {
      id: 'ord-11',
      level: 'Intermediate',
      topic: 'Indirect Questions',
      words: ['Could', 'you', 'tell me', 'where', 'the station', 'is', '?'],
      correct: 'Could you tell me where the station is?',
    },
    {
      id: 'ord-12',
      level: 'Advanced',
      topic: 'Although',
      words: ['Although', 'it was raining', 'we', 'continued', 'the journey'],
      correct: 'Although it was raining, we continued the journey.',
    },
    {
      id: 'ord-13', level: 'Intermediate', topic: 'Relative Clause',
      words: ['The village', 'where', 'my family lives', 'is', 'near the river', '.'],
      correct: 'The village where my family lives is near the river.'
    },
    {
      id: 'ord-14', level: 'Intermediate', topic: 'Cohesion',
      words: ['The evidence', 'was limited', ';', 'therefore', ',', 'we', 'need', 'more research', '.'],
      correct: 'The evidence was limited; therefore, we need more research.'
    },
    {
      id: 'ord-15', level: 'Intermediate', topic: 'Passive Report',
      words: ['The final report', 'will be', 'published', 'next week', '.'],
      correct: 'The final report will be published next week.'
    },
    {
      id: 'ord-16', level: 'Intermediate', topic: 'Question Tag',
      words: ['You have', 'finished', ',', 'haven’t', 'you', '?'],
      correct: 'You have finished, haven’t you?'
    },
    {
      id: 'ord-17', level: 'Advanced', topic: 'Inversion',
      words: ['Not only', 'did she', 'finish early', ',', 'but she also', 'helped others', '.'],
      correct: 'Not only did she finish early, but she also helped others.'
    },
    {
      id: 'ord-18', level: 'Advanced', topic: 'Mixed Conditional',
      words: ['If I had planned better', ',', 'the project', 'would be', 'easier', 'now', '.'],
      correct: 'If I had planned better, the project would be easier now.'
    },
    {
      id: 'ord-19', level: 'Advanced', topic: 'Formal Subjunctive',
      words: ['The committee recommended', 'that', 'the policy', 'be revised', '.'],
      correct: 'The committee recommended that the policy be revised.'
    },
    {
      id: 'ord-20', level: 'Advanced', topic: 'Professional Register',
      words: ['Would you be willing', 'to reconsider', 'the proposal', 'in light of', 'the evidence', '?'],
      correct: 'Would you be willing to reconsider the proposal in light of the evidence?'
    },
  ],
};
