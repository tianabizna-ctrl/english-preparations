/**
 * Easy English — Classroom language for Malagasy primary-school pupils.
 *
 * "Teny baiko ao anaty classe" — the everyday instructions a teacher gives
 * and the polite phrases pupils use in an English class. Every entry has an
 * English phrase and a Malagasy translation, grouped by situation.
 *
 * Each phrase has:
 *   id       unique key (also used for progress tracking)
 *   group    English group name
 *   groupMg  Malagasy group name
 *   en       the English phrase (British English)
 *   mg       the Malagasy meaning
 *   note     a short usage hint (optional)
 *   emoji    a friendly picture
 */

const CLASSROOM_PHRASES = [
  // ─── 1. GREETINGS & POLITENESS ───────────────────────────────────────
  {
    id: 'cls-01', group: 'Greetings & Politeness', groupMg: 'Fiarahabana sy Fahalalam-pomba',
    en: 'Good morning, teacher!', mg: 'Miarahaba anao, tompoko!',
    note: 'Say this when the lesson begins.', emoji: '🌅',
  },
  {
    id: 'cls-02', group: 'Greetings & Politeness', groupMg: 'Fiarahabana sy Fahalalam-pomba',
    en: 'Good afternoon, class!', mg: 'Miarahaba anareo, ry kilasy!',
    note: 'The teacher greets all the pupils.', emoji: '☀️',
  },
  {
    id: 'cls-03', group: 'Greetings & Politeness', groupMg: 'Fiarahabana sy Fahalalam-pomba',
    en: 'Goodbye, teacher!', mg: 'Veloma, tompoko!',
    note: 'Say this when the lesson ends.', emoji: '👋',
  },
  {
    id: 'cls-04', group: 'Greetings & Politeness', groupMg: 'Fiarahabana sy Fahalalam-pomba',
    en: 'Please', mg: 'Azafady',
    note: 'Use it when you ask for something.', emoji: '🙏',
  },
  {
    id: 'cls-05', group: 'Greetings & Politeness', groupMg: 'Fiarahabana sy Fahalalam-pomba',
    en: 'Thank you', mg: 'Misaotra',
    note: 'Use it when you receive something.', emoji: '😊',
  },
  {
    id: 'cls-06', group: 'Greetings & Politeness', groupMg: 'Fiarahabana sy Fahalalam-pomba',
    en: 'Excuse me', mg: 'Azafady (miala tsiny)',
    note: 'Use it to get attention politely.', emoji: '✋',
  },
  {
    id: 'cls-07', group: 'Greetings & Politeness', groupMg: 'Fiarahabana sy Fahalalam-pomba',
    en: 'Sorry / I am sorry', mg: 'Miala tsiny',
    note: 'Say this when you make a mistake.', emoji: '😔',
  },
  {
    id: 'cls-08', group: 'Greetings & Politeness', groupMg: 'Fiarahabana sy Fahalalam-pomba',
    en: 'Excuses', mg: 'Fialantsiny',
    note: 'You give excuses when you are late or absent.', emoji: '📝',
  },
  {
    id: 'cls-09', group: 'Greetings & Politeness', groupMg: 'Fiarahabana sy Fahalalam-pomba',
    en: 'Yes', mg: 'Eny', note: 'Answer for agreement.', emoji: '👍',
  },
  {
    id: 'cls-10', group: 'Greetings & Politeness', groupMg: 'Fiarahabana sy Fahalalam-pomba',
    en: 'No', mg: 'Tsia', note: 'Answer for refusal.', emoji: '🙅',
  },
  {
    id: 'cls-11', group: 'Greetings & Politeness', groupMg: 'Fiarahabana sy Fahalalam-pomba',
    en: 'May I come in?', mg: 'Afaka miditra ve aho?',
    note: 'Ask this before you enter the classroom.', emoji: '🚪',
  },
  {
    id: 'cls-12', group: 'Greetings & Politeness', groupMg: 'Fiarahabana sy Fahalalam-pomba',
    en: 'May I go out, please?', mg: 'Azafady, afaka mivoaka ve aho?',
    note: 'Ask this before you leave the room.', emoji: '🚶',
  },
  {
    id: 'cls-13', group: 'Greetings & Politeness', groupMg: 'Fiarahabana sy Fahalalam-pomba',
    en: 'May I drink water?', mg: 'Afaka misotro rano ve aho?',
    note: 'Ask politely when you are thirsty.', emoji: '💧',
  },
  {
    id: 'cls-14', group: 'Greetings & Politeness', groupMg: 'Fiarahabana sy Fahalalam-pomba',
    en: 'I am sorry I am late.', mg: 'Miala tsiny aho fa tara.',
    note: 'Say this when you come late.', emoji: '⏰',
  },

  // ─── 2. CLASSROOM COMMANDS ───────────────────────────────────────────
  {
    id: 'cls-15', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Sit down', mg: 'Mipetraha',
    note: 'The teacher asks you to take your seat.', emoji: '🪑',
  },
  {
    id: 'cls-16', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Stand up', mg: 'Mijoroa',
    note: 'The teacher asks you to rise.', emoji: '🧍',
  },
  {
    id: 'cls-17', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Be quiet', mg: 'Manginàna / Aza mitabataba',
    note: 'Stop making noise.', emoji: '🤫',
  },
  {
    id: 'cls-18', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Come here', mg: 'Avia aty',
    note: 'The teacher calls you to the front.', emoji: '👉',
  },
  {
    id: 'cls-19', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Come on!', mg: 'Andao fa!',
    note: 'Said to encourage someone to hurry.', emoji: '🏃',
  },
  {
    id: 'cls-20', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: "Let's go!", mg: 'Andao isika!',
    note: 'Used when the class moves together.', emoji: '🚶‍♂️',
  },
  {
    id: 'cls-21', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Wait', mg: 'Miandrasa / Andraso kely',
    note: 'Wait for a moment.', emoji: '⏳',
  },
  {
    id: 'cls-22', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Look at me', mg: 'Jereo aho',
    note: 'The teacher wants your eyes on them.', emoji: '👀',
  },
  {
    id: 'cls-23', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Look at the board', mg: 'Jereo ny tabilao',
    note: 'Turn your eyes to the blackboard.', emoji: '🖥️',
  },
  {
    id: 'cls-24', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Listen carefully', mg: 'Mihainoa tsara',
    note: 'Open your ears and pay attention.', emoji: '👂',
  },
  {
    id: 'cls-25', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Repeat after me', mg: 'Avereno aorianao aho',
    note: 'Say the words again just like the teacher.', emoji: '🔁',
  },
  {
    id: 'cls-26', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Open your book', mg: 'Sokafy ny bokinao',
    note: 'Use it at the start of a reading.', emoji: '📖',
  },
  {
    id: 'cls-27', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Close your book', mg: 'Hidino ny bokinao',
    note: 'Use it when the reading is finished.', emoji: '📕',
  },
  {
    id: 'cls-28', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Write it down', mg: 'Soraty',
    note: 'Copy the words into your exercise book.', emoji: '✍️',
  },
  {
    id: 'cls-29', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Read aloud', mg: 'Vakio mafy',
    note: 'Read so that everyone can hear.', emoji: '🗣️',
  },
  {
    id: 'cls-30', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Show me', mg: 'Asehoy ahy',
    note: 'Show your work or your book to the teacher.', emoji: '🫴',
  },
  {
    id: 'cls-31', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Clean the board', mg: 'Diovy ny tabilao',
    note: 'Wipe the blackboard clean.', emoji: '🧽',
  },
  {
    id: 'cls-32', group: 'Classroom Commands', groupMg: 'Baiko sy Torolalana',
    en: 'Line up', mg: 'Milahatra',
    note: 'Stand one behind the other in a line.', emoji: '➡️',
  },

  // ─── 3. BEHAVIOUR & GOOD HABITS ──────────────────────────────────────
  {
    id: 'cls-33', group: 'Behaviour & Good Habits', groupMg: 'Fitondran-tena sy Fahazarana Tsara',
    en: 'Go back to your place', mg: 'Miverena any amin\'ny toeranao',
    note: 'Return to your own seat.', emoji: '↩️',
  },
  {
    id: 'cls-34', group: 'Behaviour & Good Habits', groupMg: 'Fitondran-tena sy Fahazarana Tsara',
    en: 'Do your work', mg: 'Ataovy ny asanao',
    note: 'Do your own exercise, not your neighbour\'s.', emoji: '📝',
  },
  {
    id: 'cls-35', group: 'Behaviour & Good Habits', groupMg: 'Fitondran-tena sy Fahazarana Tsara',
    en: 'Do not speak without permission', mg: 'Aza miteny raha tsy mahazo alalana',
    note: 'Wait until the teacher lets you talk.', emoji: '🤐',
  },
  {
    id: 'cls-36', group: 'Behaviour & Good Habits', groupMg: 'Fitondran-tena sy Fahazarana Tsara',
    en: 'Raise your hand before you speak', mg: 'Asandrato ny tananao vao miteny',
    note: 'Put your hand up to ask or answer.', emoji: '🙋',
  },
  {
    id: 'cls-37', group: 'Behaviour & Good Habits', groupMg: 'Fitondran-tena sy Fahazarana Tsara',
    en: 'Put your slate down', mg: 'Apetraho ny vato fisakanao',
    note: 'Lay your slate (ardoisy) on the desk.', emoji: '🪧',
  },
  {
    id: 'cls-38', group: 'Behaviour & Good Habits', groupMg: 'Fitondran-tena sy Fahazarana Tsara',
    en: 'Sit up straight — good posture', mg: 'Mipetraha mahitsy — fitondran-tena tsara',
    note: 'Sit tall so you can read and write well.', emoji: '🧘',
  },
  {
    id: 'cls-39', group: 'Behaviour & Good Habits', groupMg: 'Fitondran-tena sy Fahazarana Tsara',
    en: 'Pay attention', mg: 'Tandremo tsara',
    note: 'Concentrate on the lesson.', emoji: '🎯',
  },
  {
    id: 'cls-40', group: 'Behaviour & Good Habits', groupMg: 'Fitondran-tena sy Fahazarana Tsara',
    en: 'Be careful', mg: 'Mitandrema',
    note: 'Work slowly and safely.', emoji: '⚠️',
  },
  {
    id: 'cls-41', group: 'Behaviour & Good Habits', groupMg: 'Fitondran-tena sy Fahazarana Tsara',
    en: 'Stop talking', mg: 'Atsaharo ny miteny',
    note: 'Stop speaking so the lesson can continue.', emoji: '🛑',
  },
  {
    id: 'cls-42', group: 'Behaviour & Good Habits', groupMg: 'Fitondran-tena sy Fahazarana Tsara',
    en: 'Hands up', mg: 'Asandrato ny tanana',
    note: 'Raise both hands to answer.', emoji: '🙌',
  },

  // ─── 4. QUESTIONS ────────────────────────────────────────────────────
  {
    id: 'cls-43', group: 'Questions', groupMg: 'Fanontaniana',
    en: 'Did you finish?', mg: 'Vita ve ianao?',
    note: 'The teacher asks if your work is done.', emoji: '✅',
  },
  {
    id: 'cls-44', group: 'Questions', groupMg: 'Fanontaniana',
    en: 'Who has already finished?', mg: 'Iza no efa vita?',
    note: 'Pupils who are done raise their hand.', emoji: '🙋‍♀️',
  },
  {
    id: 'cls-45', group: 'Questions', groupMg: 'Fanontaniana',
    en: 'Have you done your homework?', mg: 'Vita ve ny devoaranao?',
    note: 'A question about last night\'s homework.', emoji: '🏠',
  },
  {
    id: 'cls-46', group: 'Questions', groupMg: 'Fanontaniana',
    en: 'Do you understand?', mg: 'Azonao ve?',
    note: 'Answer "Yes" or "No".', emoji: '❓',
  },
  {
    id: 'cls-47', group: 'Questions', groupMg: 'Fanontaniana',
    en: 'Is that clear?', mg: 'Mazava ve?',
    note: 'The teacher checks that everyone understood.', emoji: '💡',
  },
  {
    id: 'cls-48', group: 'Questions', groupMg: 'Fanontaniana',
    en: 'What is this?', mg: 'Inona ity?',
    note: 'Point at the thing and answer in English.', emoji: '🔎',
  },
  {
    id: 'cls-49', group: 'Questions', groupMg: 'Fanontaniana',
    en: 'This', mg: 'Ity',
    note: 'Use "this" for something near you.', emoji: '👇',
  },
  {
    id: 'cls-50', group: 'Questions', groupMg: 'Fanontaniana',
    en: 'What is your name?', mg: 'Iza ny anaranao?',
    note: 'A useful question for new friends.', emoji: '🪪',
  },

  // ─── 5. PRAISE & ENCOURAGEMENT ───────────────────────────────────────
  {
    id: 'cls-51', group: 'Praise & Encouragement', groupMg: 'Fiderana sy Fampahery',
    en: 'Very good!', mg: 'Tsara be!',
    note: 'The teacher praises good work.', emoji: '🌟',
  },
  {
    id: 'cls-52', group: 'Praise & Encouragement', groupMg: 'Fiderana sy Fampahery',
    en: 'Well done!', mg: 'Tena tsara!',
    note: 'Say this after a correct answer.', emoji: '👏',
  },
  {
    id: 'cls-53', group: 'Praise & Encouragement', groupMg: 'Fiderana sy Fampahery',
    en: 'Excellent!', mg: 'Mahafinaritra!',
    note: 'For very good work.', emoji: '🏆',
  },
  {
    id: 'cls-54', group: 'Praise & Encouragement', groupMg: 'Fiderana sy Fampahery',
    en: 'Try again', mg: 'Andramo indray',
    note: 'Do not give up — have another go.', emoji: '🔄',
  },
  {
    id: 'cls-55', group: 'Praise & Encouragement', groupMg: 'Fiderana sy Fampahery',
    en: 'Never mind', mg: 'Tsy maninona',
    note: 'Said to comfort someone after a mistake.', emoji: '🤗',
  },
  {
    id: 'cls-56', group: 'Praise & Encouragement', groupMg: 'Fiderana sy Fampahery',
    en: 'You can do it', mg: 'Afaka ianao',
    note: 'Encourage a friend who is trying.', emoji: '💪',
  },
  {
    id: 'cls-57', group: 'Praise & Encouragement', groupMg: 'Fiderana sy Fampahery',
    en: 'Keep going', mg: 'Tohizo',
    note: 'Continue with your work.', emoji: '🚀',
  },

  // ─── 6. ASKING FOR HELP ──────────────────────────────────────────────
  {
    id: 'cls-58', group: 'Asking for Help', groupMg: 'Fangatahana Fanampiana',
    en: "I don't understand", mg: 'Tsy azoko',
    note: 'Tell the teacher when you are lost.', emoji: '😕',
  },
  {
    id: 'cls-59', group: 'Asking for Help', groupMg: 'Fangatahana Fanampiana',
    en: "I don't know", mg: 'Tsy haiko',
    note: 'An honest answer when you have no idea.', emoji: '🤔',
  },
  {
    id: 'cls-60', group: 'Asking for Help', groupMg: 'Fangatahana Fanampiana',
    en: 'Help me, please', mg: 'Ampio aho azafady',
    note: 'Ask politely when you need a hand.', emoji: '🆘',
  },
  {
    id: 'cls-61', group: 'Asking for Help', groupMg: 'Fangatahana Fanampiana',
    en: 'What does this mean?', mg: 'Inona ny dikan\'ity?',
    note: 'Ask about a new word.', emoji: '🔤',
  },
  {
    id: 'cls-62', group: 'Asking for Help', groupMg: 'Fangatahana Fanampiana',
    en: 'How do you say … in English?', mg: 'Ahoana no fiteny anglisy ny …?',
    note: 'Use it when you know the word in Malagasy only.', emoji: '🌍',
  },
  {
    id: 'cls-63', group: 'Asking for Help', groupMg: 'Fangatahana Fanampiana',
    en: 'Can you repeat that, please?', mg: 'Azafady, mba avereno kely?',
    note: 'Ask the teacher to say it again.', emoji: '🔁',
  },
];

// ─── GROUP LIST (extracted for convenience) ──────────────────────────
const CLASSROOM_GROUPS = [];
const classroomGroupSeen = new Set();
CLASSROOM_PHRASES.forEach(function (p) {
  if (!classroomGroupSeen.has(p.group)) {
    classroomGroupSeen.add(p.group);
    CLASSROOM_GROUPS.push({
      name: p.group,
      nameMg: p.groupMg,
      count: CLASSROOM_PHRASES.filter(function (q) { return q.group === p.group; }).length,
    });
  }
});
