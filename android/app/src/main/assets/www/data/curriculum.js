/**
 * Easy English — level-owned guided curriculum.
 *
 * Practice lessons are deliberately stored separately from the general
 * vocabulary catalogue. This prevents an Intermediate or Advanced learner
 * from being sent back to a Beginner category when choosing a lesson.
 */
const CURRICULUM_LESSONS = [
  // ─── BEGINNER ─────────────────────────────────────────────────────────
  { id: 'beginner-greetings', level: 'beginner', label: 'Greetings and introductions', mg: 'Fiarahabana sy fampahafantarana', goal: 'Say hello, give your name, and ask how someone feels.', grammar: 'I am / You are', words: [
    { id: 'cur-bg-hello', word: 'hello', malagasy: 'salama / manao ahoana', example: 'Hello, my name is Rina.', emoji: '👋' },
    { id: 'cur-bg-name', word: 'name', malagasy: 'anarana', example: 'My name is Rina.', emoji: '🏷️' },
    { id: 'cur-bg-fine', word: 'fine', malagasy: 'tsara', example: 'I am fine, thank you.', emoji: '🙂' },
    { id: 'cur-bg-meet', word: 'meet', malagasy: 'mihaona', example: 'Nice to meet you.', emoji: '🤝' },
  ] },
  { id: 'beginner-family', level: 'beginner', label: 'My family', mg: 'Ny fianakaviako', goal: 'Name people in your family and say who they are.', grammar: 'My / your / his / her', words: [
    { id: 'cur-bf-mother', word: 'mother', malagasy: 'reny', example: 'This is my mother.', emoji: '👩' },
    { id: 'cur-bf-father', word: 'father', malagasy: 'ray', example: 'My father is kind.', emoji: '👨' },
    { id: 'cur-bf-sister', word: 'sister', malagasy: 'anabavy / rahavavy', example: 'I have one sister.', emoji: '👧' },
    { id: 'cur-bf-brother', word: 'brother', malagasy: 'rahalahy', example: 'My brother is ten.', emoji: '👦' },
  ] },
  { id: 'beginner-school', level: 'beginner', label: 'My school day', mg: 'Ny androko any an-tsekoly', goal: 'Talk about school objects, subjects, and simple actions.', grammar: 'This is / These are', words: [
    { id: 'cur-bs-book', word: 'book', malagasy: 'boky', example: 'This is my English book.', emoji: '📘' },
    { id: 'cur-bs-pen', word: 'pen', malagasy: 'penina', example: 'I have a blue pen.', emoji: '🖊️' },
    { id: 'cur-bs-teacher', word: 'teacher', malagasy: 'mpampianatra', example: 'Our teacher is helpful.', emoji: '🧑‍🏫' },
    { id: 'cur-bs-read', word: 'read', malagasy: 'mamaky', example: 'We read a story.', emoji: '📖' },
  ] },
  { id: 'beginner-numbers', level: 'beginner', label: 'Numbers, colours and shapes', mg: 'Isa, loko ary endrika', goal: 'Count, identify colours, and describe simple objects.', grammar: 'It is / They are', words: [
    { id: 'cur-bn-red', word: 'red', malagasy: 'mena', example: 'The apple is red.', emoji: '🔴' },
    { id: 'cur-bn-round', word: 'round', malagasy: 'boribory', example: 'The ball is round.', emoji: '⚽' },
    { id: 'cur-bn-five', word: 'five', malagasy: 'dimy', example: 'I have five pencils.', emoji: '5️⃣' },
    { id: 'cur-bn-small', word: 'small', malagasy: 'kely', example: 'The box is small.', emoji: '📦' },
  ] },
  { id: 'beginner-routine', level: 'beginner', label: 'My daily routine', mg: 'Ny fahazarako isanandro', goal: 'Say what you do in the morning, afternoon, and evening.', grammar: 'Present Simple: I + verb', words: [
    { id: 'cur-br-wake', word: 'wake up', malagasy: 'mifoha', example: 'I wake up at six.', emoji: '🌅' },
    { id: 'cur-br-eat', word: 'eat', malagasy: 'mihinana', example: 'I eat breakfast.', emoji: '🍚' },
    { id: 'cur-br-go', word: 'go', malagasy: 'mandeha', example: 'I go to school.', emoji: '🚶' },
    { id: 'cur-br-sleep', word: 'sleep', malagasy: 'matory', example: 'I sleep at eight.', emoji: '😴' },
  ] },
  { id: 'beginner-food', level: 'beginner', label: 'Food and polite requests', mg: 'Sakafo sy fangatahana amim-panajana', goal: 'Name food and ask politely for what you need.', grammar: 'I like / I would like', words: [
    { id: 'cur-bd-rice', word: 'rice', malagasy: 'vary', example: 'I like rice.', emoji: '🍚' },
    { id: 'cur-bd-water', word: 'water', malagasy: 'rano', example: 'I would like some water.', emoji: '💧' },
    { id: 'cur-bd-bread', word: 'bread', malagasy: 'mofo', example: 'Please give me bread.', emoji: '🍞' },
    { id: 'cur-bd-please', word: 'please', malagasy: 'azafady', example: 'Please help me.', emoji: '🙏' },
  ] },

  // ─── ELEMENTARY ──────────────────────────────────────────────────────
  { id: 'elementary-past', level: 'elementary', label: 'Yesterday and the past', mg: 'Omaly sy ny lasa', goal: 'Describe finished actions with regular and irregular verbs.', grammar: 'Past Simple: played / went / ate', words: [
    { id: 'cur-ep-yesterday', word: 'yesterday', malagasy: 'omaly', example: 'Yesterday, I visited my aunt.', emoji: '📅' },
    { id: 'cur-ep-visited', word: 'visited', malagasy: 'nitsidika', example: 'We visited the market.', emoji: '🏘️' },
    { id: 'cur-ep-went', word: 'went', malagasy: 'nandeha', example: 'She went home early.', emoji: '🚶' },
    { id: 'cur-ep-bought', word: 'bought', malagasy: 'nividy', example: 'They bought bananas.', emoji: '🛒' },
  ] },
  { id: 'elementary-present-continuous', level: 'elementary', label: 'What is happening now?', mg: 'Inona no mitranga izao?', goal: 'Describe actions happening at this moment.', grammar: 'am / is / are + verb-ing', words: [
    { id: 'cur-ec-now', word: 'now', malagasy: 'izao', example: 'I am studying now.', emoji: '⏱️' },
    { id: 'cur-ec-writing', word: 'writing', malagasy: 'manoratra', example: 'She is writing a letter.', emoji: '✍️' },
    { id: 'cur-ec-cooking', word: 'cooking', malagasy: 'mahandro', example: 'They are cooking rice.', emoji: '🍲' },
    { id: 'cur-ec-playing', word: 'playing', malagasy: 'milalao', example: 'The children are playing.', emoji: '⚽' },
  ] },
  { id: 'elementary-wh', level: 'elementary', label: 'WH questions', mg: 'Fanontaniana WH', goal: 'Ask for people, places, things, times, reasons, and amounts.', grammar: 'Who / What / Where / When / Why / How', words: [
    { id: 'cur-ew-who', word: 'who', malagasy: 'iza', example: 'Who is your teacher?', emoji: '👤' },
    { id: 'cur-ew-where', word: 'where', malagasy: 'aiza', example: 'Where do you live?', emoji: '📍' },
    { id: 'cur-ew-when', word: 'when', malagasy: 'rahoviana', example: 'When does school start?', emoji: '🕘' },
    { id: 'cur-ew-why', word: 'why', malagasy: 'nahoana', example: 'Why are you happy?', emoji: '❓' },
  ] },
  { id: 'elementary-home', level: 'elementary', label: 'Home and places', mg: 'Trano sy toerana', goal: 'Describe where objects and people are.', grammar: 'There is / There are + prepositions', words: [
    { id: 'cur-eh-kitchen', word: 'kitchen', malagasy: 'lakozia', example: 'There is a table in the kitchen.', emoji: '🍳' },
    { id: 'cur-eh-behind', word: 'behind', malagasy: 'ao ambadika', example: 'The bag is behind the chair.', emoji: '↩️' },
    { id: 'cur-eh-between', word: 'between', malagasy: 'eo anelanelan’ny', example: 'The school is between two roads.', emoji: '↔️' },
    { id: 'cur-eh-near', word: 'near', malagasy: 'akaiky', example: 'The shop is near my home.', emoji: '📌' },
  ] },
  { id: 'elementary-future', level: 'elementary', label: 'Plans and predictions', mg: 'Drafitra sy vinavina', goal: 'Talk about future plans and simple predictions.', grammar: 'going to / will', words: [
    { id: 'cur-ef-tomorrow', word: 'tomorrow', malagasy: 'rahampitso', example: 'Tomorrow, I am going to study.', emoji: '🌤️' },
    { id: 'cur-ef-plan', word: 'plan', malagasy: 'drafitra', example: 'Our plan is simple.', emoji: '🗓️' },
    { id: 'cur-ef-visit', word: 'visit', malagasy: 'mitsidika', example: 'We are going to visit Grandma.', emoji: '🏠' },
    { id: 'cur-ef-probably', word: 'probably', malagasy: 'angamba / azo inoana', example: 'It will probably rain.', emoji: '🌧️' },
  ] },
  { id: 'elementary-paragraph', level: 'elementary', label: 'Build a clear paragraph', mg: 'Manorata andalana mazava', goal: 'Join ideas and write a short paragraph about daily life.', grammar: 'and / but / because / so', words: [
    { id: 'cur-ea-first', word: 'first', malagasy: 'voalohany', example: 'First, I wash my face.', emoji: '1️⃣' },
    { id: 'cur-ea-then', word: 'then', malagasy: 'avy eo', example: 'Then, I eat breakfast.', emoji: '➡️' },
    { id: 'cur-ea-because', word: 'because', malagasy: 'satria', example: 'I stayed home because I was ill.', emoji: '💭' },
    { id: 'cur-ea-finally', word: 'finally', malagasy: 'farany', example: 'Finally, I went to bed.', emoji: '🏁' },
  ] },

  // ─── PRE-INTERMEDIATE ────────────────────────────────────────────────
  { id: 'preintermediate-experience', level: 'pre-intermediate', label: 'Life experiences', mg: 'Traikefa eo amin’ny fiainana', goal: 'Talk about experiences and actions connected to the present.', grammar: 'Present Perfect: have / has + participle', words: [
    { id: 'cur-pp-ever', word: 'ever', malagasy: 'efa ve', example: 'Have you ever seen the sea?', emoji: '🌊' },
    { id: 'cur-pp-never', word: 'never', malagasy: 'tsy mbola', example: 'I have never flown in a plane.', emoji: '✈️' },
    { id: 'cur-pp-already', word: 'already', malagasy: 'efa', example: 'She has already finished her work.', emoji: '✅' },
    { id: 'cur-pp-yet', word: 'yet', malagasy: 'mbola / hatramin’izao', example: 'We have not eaten yet.', emoji: '⌛' },
  ] },
  { id: 'preintermediate-comparison', level: 'pre-intermediate', label: 'Compare people and places', mg: 'Mampitaha olona sy toerana', goal: 'Compare size, quality, distance, and ability.', grammar: 'comparative / superlative forms', words: [
    { id: 'cur-pc-cheaper', word: 'cheaper', malagasy: 'mora kokoa', example: 'This market is cheaper than that one.', emoji: '💰' },
    { id: 'cur-pc-better', word: 'better', malagasy: 'tsara kokoa', example: 'Practice makes your English better.', emoji: '📈' },
    { id: 'cur-pc-farthest', word: 'farthest', malagasy: 'lavitra indrindra', example: 'That is the farthest village.', emoji: '🔭' },
    { id: 'cur-pc-similar', word: 'similar', malagasy: 'mitovy', example: 'The two ideas are similar.', emoji: '🟰' },
  ] },
  { id: 'preintermediate-modals', level: 'pre-intermediate', label: 'Advice, ability and obligation', mg: 'Torohevitra, fahaizana ary adidy', goal: 'Give advice, ask permission, and explain what is necessary.', grammar: 'can / could / should / must / have to', words: [
    { id: 'cur-pm-advice', word: 'advice', malagasy: 'torohevitra', example: 'My teacher gave me good advice.', emoji: '💡' },
    { id: 'cur-pm-permission', word: 'permission', malagasy: 'fahazoan-dalana', example: 'May I have permission to leave?', emoji: '🙋' },
    { id: 'cur-pm-necessary', word: 'necessary', malagasy: 'ilaina', example: 'It is necessary to practise.', emoji: '📌' },
    { id: 'cur-pm-possible', word: 'possible', malagasy: 'azo atao', example: 'Is it possible to change the plan?', emoji: '🔓' },
  ] },
  { id: 'preintermediate-conditionals', level: 'pre-intermediate', label: 'Conditions and results', mg: 'Fepetra sy vokatra', goal: 'Explain facts, possibilities, and likely results.', grammar: 'zero and first conditional', words: [
    { id: 'cur-pc-if', word: 'if', malagasy: 'raha', example: 'If it rains, we will stay inside.', emoji: '🔀' },
    { id: 'cur-pc-result', word: 'result', malagasy: 'vokatra', example: 'Every action has a result.', emoji: '🎯' },
    { id: 'cur-pc-protect', word: 'protect', malagasy: 'miaro', example: 'If we protect trees, the soil stays strong.', emoji: '🌳' },
    { id: 'cur-pc-unless', word: 'unless', malagasy: 'raha tsy', example: 'We will go unless the road is closed.', emoji: '🚧' },
  ] },
  { id: 'preintermediate-stories', level: 'pre-intermediate', label: 'Tell a story clearly', mg: 'Mitantara mazava', goal: 'Order events and describe what happened in a longer story.', grammar: 'past simple / past continuous', words: [
    { id: 'cur-ps-while', word: 'while', malagasy: 'raha / mandritra ny', example: 'I was reading while my sister cooked.', emoji: '⏳' },
    { id: 'cur-ps-suddenly', word: 'suddenly', malagasy: 'tampoka teo', example: 'Suddenly, the lights went out.', emoji: '⚡' },
    { id: 'cur-ps-finally', word: 'eventually', malagasy: 'tamin’ny farany', example: 'Eventually, we found the right path.', emoji: '🛤️' },
    { id: 'cur-ps-realise', word: 'realise', malagasy: 'mahatsapa', example: 'I realised that I had forgotten my book.', emoji: '💭' },
  ] },
  { id: 'preintermediate-opinions', level: 'pre-intermediate', label: 'Opinions and reasons', mg: 'Hevitra sy antony', goal: 'Give an opinion, support it, and respond politely.', grammar: 'I think / In my opinion / however', words: [
    { id: 'cur-po-opinion', word: 'opinion', malagasy: 'hevitra', example: 'In my opinion, reading is important.', emoji: '💬' },
    { id: 'cur-po-reason', word: 'reason', malagasy: 'antony', example: 'Give one reason for your answer.', emoji: '❓' },
    { id: 'cur-po-agree', word: 'agree', malagasy: 'manaiky', example: 'I agree with your idea.', emoji: '👍' },
    { id: 'cur-po-however', word: 'however', malagasy: 'na izany aza', example: 'However, we need more time.', emoji: '↔️' },
  ] },

  // ─── INTERMEDIATE ────────────────────────────────────────────────────
  { id: 'intermediate-tense-control', level: 'intermediate', label: 'Control the tense', goal: 'Choose accurately between simple, continuous, and perfect forms.', grammar: 'tense contrast and time markers', words: [
    { id: 'cur-it-recently', word: 'recently', malagasy: '', example: 'I have recently started a new project.', emoji: '🕒' },
    { id: 'cur-it-currently', word: 'currently', malagasy: '', example: 'She is currently studying science.', emoji: '📚' },
    { id: 'cur-it-by', word: 'by the time', malagasy: '', example: 'By the time we arrived, the lesson had begun.', emoji: '⏰' },
    { id: 'cur-it-since', word: 'since', malagasy: '', example: 'He has lived here since 2020.', emoji: '📍' },
  ] },
  { id: 'intermediate-complex-questions', level: 'intermediate', label: 'Complex and indirect questions', goal: 'Ask precise questions politely in study and public situations.', grammar: 'indirect questions and question tags', words: [
    { id: 'cur-iq-whether', word: 'whether', malagasy: '', example: 'Could you tell me whether the office is open?', emoji: '❔' },
    { id: 'cur-iq-clarify', word: 'clarify', malagasy: '', example: 'Could you clarify the last point?', emoji: '🔍' },
    { id: 'cur-iq-appropriate', word: 'appropriate', malagasy: '', example: 'Is this an appropriate question?', emoji: '✅' },
    { id: 'cur-iq-confirm', word: 'confirm', malagasy: '', example: 'Could you confirm the meeting time?', emoji: '📅' },
  ] },
  { id: 'intermediate-relative-clauses', level: 'intermediate', label: 'Add detail with clauses', goal: 'Join information naturally and describe people, places, and things.', grammar: 'who / which / that / where', words: [
    { id: 'cur-ir-which', word: 'which', malagasy: '', example: 'This is the book which I recommended.', emoji: '📘' },
    { id: 'cur-ir-where', word: 'where', malagasy: '', example: 'This is the village where my family lives.', emoji: '🏘️' },
    { id: 'cur-ir-refer', word: 'refer to', malagasy: '', example: 'The chart refers to last year’s results.', emoji: '📊' },
    { id: 'cur-ir-detail', word: 'detail', malagasy: '', example: 'Add one useful detail to your explanation.', emoji: '🔎' },
  ] },
  { id: 'intermediate-cause-effect', level: 'intermediate', label: 'Cause, effect and solutions', goal: 'Explain problems and propose practical solutions.', grammar: 'because / therefore / consequently', words: [
    { id: 'cur-ic-cause', word: 'cause', malagasy: '', example: 'What caused the problem?', emoji: '🔗' },
    { id: 'cur-ic-consequence', word: 'consequence', malagasy: '', example: 'Every choice has a consequence.', emoji: '➡️' },
    { id: 'cur-ic-solution', word: 'solution', malagasy: '', example: 'The group suggested a practical solution.', emoji: '🧩' },
    { id: 'cur-ic-approach', word: 'approach', malagasy: '', example: 'We need a different approach.', emoji: '🛤️' },
  ] },
  { id: 'intermediate-study-skills', level: 'intermediate', label: 'Study and academic language', goal: 'Discuss sources, evidence, projects, and learning strategies.', grammar: 'reporting verbs and academic collocations', words: [
    { id: 'cur-is-source', word: 'source', malagasy: '', example: 'Check the source before quoting it.', emoji: '📚' },
    { id: 'cur-is-evidence', word: 'evidence', malagasy: '', example: 'The evidence supports the conclusion.', emoji: '🔎' },
    { id: 'cur-is-reliable', word: 'reliable', malagasy: '', example: 'Use a reliable dictionary.', emoji: '✅' },
    { id: 'cur-is-summarise', word: 'summarise', malagasy: '', example: 'Summarise the main idea in two sentences.', emoji: '📝' },
  ] },
  { id: 'intermediate-discussion', level: 'intermediate', label: 'Discussion and presentation', goal: 'Present an idea, handle questions, and disagree respectfully.', grammar: 'signposting and polite hedging', words: [
    { id: 'cur-id-point', word: 'point', malagasy: '', example: 'I would like to make one important point.', emoji: '📌' },
    { id: 'cur-id-suggest', word: 'suggest', malagasy: '', example: 'I suggest that we begin with the problem.', emoji: '💡' },
    { id: 'cur-id-although', word: 'although', malagasy: '', example: 'Although the task is difficult, it is possible.', emoji: '↔️' },
    { id: 'cur-id-respond', word: 'respond', malagasy: '', example: 'Take a moment before you respond.', emoji: '💬' },
  ] },

  // ─── ADVANCED ────────────────────────────────────────────────────────
  { id: 'advanced-register', level: 'advanced', label: 'Formal and academic register', goal: 'Choose precise language for reports, applications, and formal presentations.', grammar: 'nominalisation and formal linking', words: [
    { id: 'cur-af-implement', word: 'implement', malagasy: '', example: 'The school will implement the new policy.', emoji: '⚙️' },
    { id: 'cur-af-evaluate', word: 'evaluate', malagasy: '', example: 'We must evaluate the results carefully.', emoji: '📊' },
    { id: 'cur-af-substantial', word: 'substantial', malagasy: '', example: 'The project made substantial progress.', emoji: '📈' },
    { id: 'cur-af-nevertheless', word: 'nevertheless', malagasy: '', example: 'Nevertheless, the evidence remains limited.', emoji: '🛤️' },
  ] },
  { id: 'advanced-argument', level: 'advanced', label: 'Argument and counterargument', goal: 'Build a persuasive position and answer an opposing view.', grammar: 'concession, contrast, and emphasis', words: [
    { id: 'cur-aa-claim', word: 'claim', malagasy: '', example: 'The article makes a strong claim.', emoji: '📣' },
    { id: 'cur-aa-counterargument', word: 'counterargument', malagasy: '', example: 'A good essay addresses a counterargument.', emoji: '⚖️' },
    { id: 'cur-aa-despite', word: 'despite', malagasy: '', example: 'Despite the difficulty, the team continued.', emoji: '💪' },
    { id: 'cur-aa-convincing', word: 'convincing', malagasy: '', example: 'The final example was convincing.', emoji: '🎯' },
  ] },
  { id: 'advanced-critical-reading', level: 'advanced', label: 'Critical reading and bias', goal: 'Identify assumptions, tone, evidence, and the purpose of a text.', grammar: 'inference and qualifying language', words: [
    { id: 'cur-ar-assumption', word: 'assumption', malagasy: '', example: 'The argument is based on an assumption.', emoji: '🧠' },
    { id: 'cur-ar-bias', word: 'bias', malagasy: '', example: 'Look for possible bias in the report.', emoji: '⚖️' },
    { id: 'cur-ar-imply', word: 'imply', malagasy: '', example: 'The writer seems to imply that change is necessary.', emoji: '🔍' },
    { id: 'cur-ar-relevant', word: 'relevant', malagasy: '', example: 'Choose evidence that is relevant to the question.', emoji: '📌' },
  ] },
  { id: 'advanced-conditionals', level: 'advanced', label: 'Advanced conditionals and inversion', goal: 'Express regret, hypothetical situations, and emphasis precisely.', grammar: 'third/mixed conditionals and inversion', words: [
    { id: 'cur-ac-had', word: 'had it not been', malagasy: '', example: 'Had it not been for your help, we would have failed.', emoji: '🔀' },
    { id: 'cur-ac-provided', word: 'provided that', malagasy: '', example: 'You may join provided that you register first.', emoji: '✅' },
    { id: 'cur-ac-regret', word: 'regret', malagasy: '', example: 'She regrets not asking earlier.', emoji: '↩️' },
    { id: 'cur-ac-otherwise', word: 'otherwise', malagasy: '', example: 'Leave now; otherwise, you may miss the bus.', emoji: '🚌' },
  ] },
  { id: 'advanced-professional', level: 'advanced', label: 'Professional communication', goal: 'Negotiate, solve problems, and make proposals in formal situations.', grammar: 'softening, modality, and diplomacy', words: [
    { id: 'cur-ap-negotiate', word: 'negotiate', malagasy: '', example: 'The two groups negotiated a fair agreement.', emoji: '🤝' },
    { id: 'cur-ap-priority', word: 'priority', malagasy: '', example: 'Safety must remain our first priority.', emoji: '⭐' },
    { id: 'cur-ap-feasible', word: 'feasible', malagasy: '', example: 'Is this plan financially feasible?', emoji: '🧭' },
    { id: 'cur-ap-collaborate', word: 'collaborate', malagasy: '', example: 'Several schools collaborated on the project.', emoji: '👥' },
  ] },
  { id: 'advanced-independent-project', level: 'advanced', label: 'Independent English project', goal: 'Plan, research, present, and reflect on a meaningful project.', grammar: 'cohesion, reference, and revision', words: [
    { id: 'cur-ax-objective', word: 'objective', malagasy: '', example: 'The objective of this project is clear.', emoji: '🎯' },
    { id: 'cur-ax-method', word: 'method', malagasy: '', example: 'Explain the method you used.', emoji: '🧪' },
    { id: 'cur-ax-outcome', word: 'outcome', malagasy: '', example: 'The outcome was better than expected.', emoji: '🏁' },
    { id: 'cur-ax-reflect', word: 'reflect', malagasy: '', example: 'Reflect on what you learned.', emoji: '🪞' },
  ] },
];
