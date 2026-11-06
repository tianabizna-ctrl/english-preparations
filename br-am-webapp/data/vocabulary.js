// British–American English vocabulary data
// Each entry: { british, american, category, exampleBr, exampleAm }

const VOCABULARY = [
  // --- Spelling differences ---
  { british: 'colour', american: 'color', category: 'spelling', exampleBr: 'What is your favourite colour?', exampleAm: 'What is your favorite color?' },
  { british: 'favourite', american: 'favorite', category: 'spelling', exampleBr: 'My favourite subject is maths.', exampleAm: 'My favorite subject is math.' },
  { british: 'honour', american: 'honor', category: 'spelling', exampleBr: 'It is an honour to meet you.', exampleAm: 'It is an honor to meet you.' },
  { british: 'behaviour', american: 'behavior', category: 'spelling', exampleBr: 'His behaviour was excellent.', exampleAm: 'His behavior was excellent.' },
  { british: 'neighbour', american: 'neighbor', category: 'spelling', exampleBr: 'Our neighbour moved away.', exampleAm: 'Our neighbor moved away.' },
  { british: 'centre', american: 'center', category: 'spelling', exampleBr: 'The town centre is busy.', exampleAm: 'The town center is busy.' },
  { british: 'theatre', american: 'theater', category: 'spelling', exampleBr: 'We went to the theatre.', exampleAm: 'We went to the theater.' },
  { british: 'metre', american: 'meter', category: 'spelling', exampleBr: 'It is three metres long.', exampleAm: 'It is three meters long.' },
  { british: 'litre', american: 'liter', category: 'spelling', exampleBr: 'A litre of milk, please.', exampleAm: 'A liter of milk, please.' },
  { british: 'realise', american: 'realize', category: 'spelling', exampleBr: 'I did not realise that.', exampleAm: 'I did not realize that.' },
  { british: 'organise', american: 'organize', category: 'spelling', exampleBr: 'Let us organise the event.', exampleAm: 'Let us organize the event.' },
  { british: 'recognise', american: 'recognize', category: 'spelling', exampleBr: 'I recognise this place.', exampleAm: 'I recognize this place.' },
  { british: 'analyse', american: 'analyze', category: 'spelling', exampleBr: 'We need to analyse the data.', exampleAm: 'We need to analyze the data.' },
  { british: 'travelled', american: 'traveled', category: 'spelling', exampleBr: 'She travelled by train.', exampleAm: 'She traveled by train.' },
  { british: 'cancelled', american: 'canceled', category: 'spelling', exampleBr: 'The flight was cancelled.', exampleAm: 'The flight was canceled.' },
  { british: 'programme', american: 'program', category: 'spelling', exampleBr: 'What is on the programme?', exampleAm: 'What is on the program?' },
  { british: 'catalogue', american: 'catalog', category: 'spelling', exampleBr: 'Browse the catalogue online.', exampleAm: 'Browse the catalog online.' },
  { british: 'defence', american: 'defense', category: 'spelling', exampleBr: 'The defence played well.', exampleAm: 'The defense played well.' },
  { british: 'licence', american: 'license', category: 'spelling', exampleBr: 'May I see your driving licence?', exampleAm: 'May I see your driver\'s license?' },
  { british: 'practise', american: 'practice', category: 'spelling', exampleBr: 'You must practise every day.', exampleAm: 'You must practice every day.' },

  // --- Vocabulary differences ---
  { british: 'lift', american: 'elevator', category: 'vocabulary', exampleBr: 'Take the lift to the third floor.', exampleAm: 'Take the elevator to the third floor.' },
  { british: 'torch', american: 'flashlight', category: 'vocabulary', exampleBr: 'Have you got a torch?', exampleAm: 'Do you have a flashlight?' },
  { british: 'rubber', american: 'eraser', category: 'vocabulary', exampleBr: 'Use a rubber to correct it.', exampleAm: 'Use an eraser to fix it.' },
  { british: 'pavement', american: 'sidewalk', category: 'vocabulary', exampleBr: 'Walk on the pavement.', exampleAm: 'Walk on the sidewalk.' },
  { british: 'lorry', american: 'truck', category: 'vocabulary', exampleBr: 'A lorry delivered the goods.', exampleAm: 'A truck delivered the goods.' },
  { british: 'flat', american: 'apartment', category: 'vocabulary', exampleBr: 'She lives in a flat.', exampleAm: 'She lives in an apartment.' },
  { british: 'biscuit', american: 'cookie', category: 'vocabulary', exampleBr: 'Would you like a biscuit?', exampleAm: 'Would you like a cookie?' },
  { british: 'holiday', american: 'vacation', category: 'vocabulary', exampleBr: 'We are on holiday.', exampleAm: 'We are on vacation.' },
  { british: 'petrol', american: 'gasoline', category: 'vocabulary', exampleBr: 'The car needs petrol.', exampleAm: 'The car needs gasoline.' },
  { british: 'boot', american: 'trunk', category: 'vocabulary', exampleBr: 'Put the bags in the boot.', exampleAm: 'Put the bags in the trunk.' },
  { british: 'bonnet', american: 'hood', category: 'vocabulary', exampleBr: 'Open the bonnet, please.', exampleAm: 'Open the hood, please.' },
  { british: 'rubbish', american: 'trash', category: 'vocabulary', exampleBr: 'Throw the rubbish away.', exampleAm: 'Throw the trash away.' },
  { british: 'dustbin', american: 'trash can', category: 'vocabulary', exampleBr: 'Put it in the dustbin.', exampleAm: 'Put it in the trash can.' },
  { british: 'chemist', american: 'pharmacy', category: 'vocabulary', exampleBr: 'Go to the chemist.', exampleAm: 'Go to the pharmacy.' },
  { british: 'mum', american: 'mom', category: 'vocabulary', exampleBr: 'My mum is cooking.', exampleAm: 'My mom is cooking.' },
  { british: 'trousers', american: 'pants', category: 'vocabulary', exampleBr: 'Those trousers look smart.', exampleAm: 'Those pants look nice.' },
  { british: 'jumper', american: 'sweater', category: 'vocabulary', exampleBr: 'Wear a warm jumper.', exampleAm: 'Wear a warm sweater.' },
  { british: 'trainers', american: 'sneakers', category: 'vocabulary', exampleBr: 'New trainers for running.', exampleAm: 'New sneakers for running.' },
  { british: 'crisps', american: 'chips', category: 'vocabulary', exampleBr: 'A packet of crisps.', exampleAm: 'A bag of chips.' },
  { british: 'chips', american: 'fries', category: 'vocabulary', exampleBr: 'Fish and chips, please.', exampleAm: 'Fish and fries, please.' },
  { british: 'sweets', american: 'candy', category: 'vocabulary', exampleBr: 'Children love sweets.', exampleAm: 'Children love candy.' },
  { british: 'tin', american: 'can', category: 'vocabulary', exampleBr: 'A tin of beans.', exampleAm: 'A can of beans.' },
  { british: 'postbox', american: 'mailbox', category: 'vocabulary', exampleBr: 'Drop it in the postbox.', exampleAm: 'Drop it in the mailbox.' },
  { british: 'queue', american: 'line', category: 'vocabulary', exampleBr: 'Join the queue here.', exampleAm: 'Get in line here.' },
  { british: 'maths', american: 'math', category: 'vocabulary', exampleBr: 'Maths is my best subject.', exampleAm: 'Math is my best subject.' },
  { british: 'autumn', american: 'fall', category: 'vocabulary', exampleBr: 'Leaves fall in autumn.', exampleAm: 'Leaves change colour in fall.' },
  { british: 'nappy', american: 'diaper', category: 'vocabulary', exampleBr: 'Change the baby\'s nappy.', exampleAm: 'Change the baby\'s diaper.' },
  { british: 'dummy', american: 'pacifier', category: 'vocabulary', exampleBr: 'Give the baby a dummy.', exampleAm: 'Give the baby a pacifier.' },
  { british: 'plaster', american: 'band-aid', category: 'vocabulary', exampleBr: 'Put a plaster on it.', exampleAm: 'Put a band-aid on it.' },
  { british: 'tap', american: 'faucet', category: 'vocabulary', exampleBr: 'Turn off the tap.', exampleAm: 'Turn off the faucet.' },

  // --- Grammar differences ---
  { british: 'have got', american: 'have', category: 'grammar', exampleBr: 'I have got a pen.', exampleAm: 'I have a pen.' },
  { british: 'at the weekend', american: 'on the weekend', category: 'grammar', exampleBr: 'See you at the weekend.', exampleAm: 'See you on the weekend.' },
  { british: 'in hospital', american: 'in the hospital', category: 'grammar', exampleBr: 'She is in hospital.', exampleAm: 'She is in the hospital.' },
  { british: 'to university', american: 'to college', category: 'grammar', exampleBr: 'He goes to university.', exampleAm: 'He goes to college.' },
  { british: 'just (present perfect)', american: 'just (past simple)', category: 'grammar', exampleBr: 'I have just eaten.', exampleAm: 'I just ate.' },
  { british: 'already (present perfect)', american: 'already (past simple)', category: 'grammar', exampleBr: 'I have already finished.', exampleAm: 'I already finished.' },
  { british: 'shall', american: 'should / will', category: 'grammar', exampleBr: 'Shall we go?', exampleAm: 'Should we go?' },
  { british: 'needn\'t', american: 'don\'t need to', category: 'grammar', exampleBr: 'You needn\'t worry.', exampleAm: 'You don\'t need to worry.' },
  { british: 'different from', american: 'different than', category: 'grammar', exampleBr: 'This is different from that.', exampleAm: 'This is different than that.' },
  { british: 'write to me', american: 'write me', category: 'grammar', exampleBr: 'Please write to me soon.', exampleAm: 'Please write me soon.' },
];

// Conversation scenarios for fluency practice
const CONVERSATIONS = [
  {
    id: 'cafe',
    title: 'At the Café',
    dialect: 'british',
    lines: [
      { speaker: 'Waiter', text: 'Good afternoon! What would you like?' },
      { speaker: 'Customer', text: 'I\'ll have a cup of tea and a biscuit, please.' },
      { speaker: 'Waiter', text: 'Of course. Would you like anything else?' },
      { speaker: 'Customer', text: 'No, thank you. Could I get the bill when I\'m ready?' },
      { speaker: 'Waiter', text: 'Certainly. Take your time.' },
    ],
    questions: [
      { q: 'What did the customer order?', a: 'A cup of tea and a biscuit' },
      { q: 'What word does British English use instead of "cookie"?', a: 'Biscuit' },
      { q: 'How does the customer ask for the check?', a: 'Could I get the bill' },
    ]
  },
  {
    id: 'directions',
    title: 'Asking for Directions',
    dialect: 'american',
    lines: [
      { speaker: 'Tourist', text: 'Excuse me, where is the nearest gas station?' },
      { speaker: 'Local', text: 'Go straight two blocks, then turn left.' },
      { speaker: 'Tourist', text: 'Is it far? Should I take the elevator in that building?' },
      { speaker: 'Local', text: 'No, it\'s right on the sidewalk. You can walk there.' },
      { speaker: 'Tourist', text: 'Thanks! I\'ll put my flashlight back in my trunk.' },
    ],
    questions: [
      { q: 'What American word is used for "petrol station"?', a: 'Gas station' },
      { q: 'What is the British word for "sidewalk"?', a: 'Pavement' },
      { q: 'What is the British word for "trunk"?', a: 'Boot' },
    ]
  },
  {
    id: 'shopping',
    title: 'Shopping for Clothes',
    dialect: 'british',
    lines: [
      { speaker: 'Assistant', text: 'Can I help you find something?' },
      { speaker: 'Shopper', text: 'Yes, I\'m looking for a jumper and some new trainers.' },
      { speaker: 'Assistant', text: 'The jumpers are on the first floor. Take the lift up.' },
      { speaker: 'Shopper', text: 'Brilliant. And do you sell trousers here too?' },
      { speaker: 'Assistant', text: 'Of course. Right next to the jumpers.' },
    ],
    questions: [
      { q: 'What is a "jumper" in American English?', a: 'Sweater' },
      { q: 'What are "trainers" called in American English?', a: 'Sneakers' },
      { q: 'What word is used instead of "elevator"?', a: 'Lift' },
    ]
  },
  {
    id: 'school',
    title: 'At School',
    dialect: 'american',
    lines: [
      { speaker: 'Teacher', text: 'Good morning, class. Take out your math books.' },
      { speaker: 'Student', text: 'Can I use an eraser? I made a mistake.' },
      { speaker: 'Teacher', text: 'Sure. And remember, homework is due on the weekend.' },
      { speaker: 'Student', text: 'Got it. Can I go to the trash can to throw this away?' },
      { speaker: 'Teacher', text: 'Yes, and then get back in line for lunch.' },
    ],
    questions: [
      { q: 'What is "math" called in British English?', a: 'Maths' },
      { q: 'What is an "eraser" in British English?', a: 'Rubber' },
      { q: 'What preposition does British English use with "weekend"?', a: 'At (at the weekend)' },
    ]
  },
];

// Speed drill pairs — quick-fire BrE ↔ AmE conversion
const SPEED_PAIRS = VOCABULARY.map(v => ({
  british: v.british,
  american: v.american,
  category: v.category,
}));
