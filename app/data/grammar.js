/**
 * Easy English — Grammar & Tenses data for Malagasy learners
 *
 * Each lesson has:
 *   id, title, type (tense|pos|structure), tag label,
 *   formula (structure pattern), explanation (in English + Malagasy),
 *   examples [{en, mg}], notes (optional)
 */

const GRAMMAR_LESSONS = [

  // ─── TENSES ─────────────────────────────────────────────────────────

  {
    id: 'tense-present-simple',
    title: 'Present Simple',
    type: 'tense',
    tag: 'Tense',
    formula: 'Subject + verb (base / -s for he/she/it)',
    explanation: `We use the Present Simple to talk about habits, routines, general truths, and facts.
    <br><br><strong>Mampiasa ny "Present Simple" isika rehefa miteny ny zavatra atao matetika, ny fahazarana, na ny fahamarinana tsy miova.</strong>`,
    examples: [
      { en: 'I go to school every day.', mg: 'Mandeha sekoly isan\'andro aho.' },
      { en: 'She reads books in the evening.', mg: 'Mamaky boky amin\'ny hariva izy.' },
      { en: 'We eat rice every day.', mg: 'Mihinana vary isan\'andro izahay.' },
      { en: 'The sun rises in the east.', mg: 'Miposaka any atsinanana ny masoandro.' },
      { en: 'They play football on Sundays.', mg: 'Milalao baolina kitra amin\'ny Alahady izy ireo.' },
    ],
    notes: `For he / she / it, add -s to the verb (eat → eats, play → plays).
    <br>For verbs ending in -ch, -sh, -s, -x, -o, add -es (go → goes, wash → washes).
    <br>For verbs ending in consonant + y, change y to ies (study → studies).
    <br><br>Raha he/she/it ny mpanao, ampio -s amin\'ny matoanteny.`
  },

  {
    id: 'tense-present-continuous',
    title: 'Present Continuous',
    type: 'tense',
    tag: 'Tense',
    formula: 'Subject + am/is/are + verb-ing',
    explanation: `We use the Present Continuous to talk about actions happening right now, or around the present time.
    <br><br><strong>Mampiasa ny "Present Continuous" isika rehefa miteny ny zavatra atao amin\'izao fotoana izao.</strong>`,
    examples: [
      { en: 'I am reading a book now.', mg: 'Mamaky boky aho izao.' },
      { en: 'She is cooking rice in the kitchen.', mg: 'Mahandro vary any an-dakozia izy.' },
      { en: 'They are playing outside.', mg: 'Milalao any ivelany izy ireo.' },
      { en: 'The teacher is explaining the lesson.', mg: 'Manazava ny lesona ny mpampianatra.' },
      { en: 'We are learning English today.', mg: 'Mianatra anglisy isika androany.' },
    ],
    notes: `Add -ing to the verb (play → playing, read → reading).
    <br>If the verb ends in -e, remove the -e and add -ing (write → writing, make → making).
    <br>If the verb has one syllable and ends in consonant-vowel-consonant, double the final letter (sit → sitting, run → running).
    <br><br>Ampio -ing amin\'ny matoanteny.`
  },

  {
    id: 'tense-past-simple',
    title: 'Past Simple',
    type: 'tense',
    tag: 'Tense',
    formula: 'Subject + verb (past form)',
    explanation: `We use the Past Simple to talk about finished actions in the past.
    <br><br><strong>Mampiasa ny "Past Simple" isika rehefa miteny ny zavatra efa vita tany aloha.</strong>`,
    examples: [
      { en: 'I visited my grandmother yesterday.', mg: 'Nitsidiky ny bebe aho omaly.' },
      { en: 'She walked to school this morning.', mg: 'Nandeha an-tongotra nianatra izy androany maraina.' },
      { en: 'They played football last week.', mg: 'Nilalao baolina kitra izy ireo herinandro lasa.' },
      { en: 'He ate rice for lunch.', mg: 'Nihinana vary izy nisakafo antoandro.' },
      { en: 'We watched television last night.', mg: 'Nijery tele izahay omaly alina.' },
    ],
    notes: `Regular verbs: add -ed (walk → walked, play → played, talk → talked).
    <br>Irregular verbs change form (go → went, eat → ate, see → saw, buy → bought).
    <br>There is no special form for he/she/it in the past.
    <br><br>Misy matoanteny miova tsy ara-dalàna (irregular) — tsy misy -ed.`
  },

  {
    id: 'tense-past-continuous',
    title: 'Past Continuous',
    type: 'tense',
    tag: 'Tense',
    formula: 'Subject + was/were + verb-ing',
    explanation: `We use the Past Continuous to talk about actions that were in progress at a specific time in the past.
    <br><br><strong>Mampiasa ny "Past Continuous" isika rehefa miteny ny zavatra nitranga nandritra ny fotoana iray tany aloha.</strong>`,
    examples: [
      { en: 'I was reading when she arrived.', mg: 'Namaky boky aho raha tonga izy.' },
      { en: 'They were playing at 4 o\'clock.', mg: 'Nilalao izy ireo tamin\'ny 4 ora.' },
      { en: 'She was cooking while he was studying.', mg: 'Nahandro izy raha nianatra kosa izy.' },
      { en: 'We were walking to school when it started to rain.', mg: 'Nandeha nianatra izahay raha nanomboka nilatsaka ny orana.' },
    ],
    notes: `Use "was" with I, he, she, it. Use "were" with you, we, they.
    <br>This tense is often used with "when" or "while" to show two actions happening at the same time.
    <br><br>Ampiasao "was" ho an\'ny I, he, she, it. Ampiasao "were" ho an\'ny you, we, they.`
  },

  {
    id: 'tense-future',
    title: 'Future (will / going to)',
    type: 'tense',
    tag: 'Tense',
    formula: 'will + verb  OR  am/is/are going to + verb',
    explanation: `We use "will" for decisions made now or predictions. We use "going to" for plans and intentions.
    <br><br><strong>Mampiasa ny "will" isika rehefa manapa-kevitra eo no ho eo na maminavina. Mampiasa ny "going to" rehefa efa misy drafitra.</strong>`,
    examples: [
      { en: 'I will help you with your homework.', mg: 'Hanampy anao amin\'ny devoarao aho.' },
      { en: 'It will rain tomorrow.', mg: 'Hilatsaka ny orana rahampitso.' },
      { en: 'I am going to visit my family next week.', mg: 'Hitsidiky ny ankohonako aho herinandro ho avy.' },
      { en: 'She is going to study medicine.', mg: 'Hianatra fitsaboana izy.' },
      { en: 'We will see you later!', mg: 'Hahita anao any aoriana izahay!' },
    ],
    notes: `"Will" is used for promises (I will help), offers (I will carry that), and predictions (It will be sunny).
    <br>"Going to" is used when you have already decided (I am going to buy a new book).
    <br><br>Tsy miova endrika ny matoanteny aorian\'ny "will" na "going to".`
  },

  {
    id: 'tense-present-perfect',
    title: 'Present Perfect (intro)',
    type: 'tense',
    tag: 'Tense',
    formula: 'Subject + have/has + past participle',
    explanation: `We use the Present Perfect to talk about past actions that have a connection to the present. It is often used with "ever", "never", "already", "just", and "yet".
    <br><br><strong>Mampiasa ny "Present Perfect" isika rehefa miteny ny zavatra efa natao nefa mbola misy fiantraikany amin\'izao fotoana izao.</strong>`,
    examples: [
      { en: 'I have visited Antananarivo.', mg: 'Efa nitsidiky Antananarivo aho.' },
      { en: 'She has never eaten pizza.', mg: 'Tsy mbola nihinana pizza mihitsy izy.' },
      { en: 'They have just finished their homework.', mg: 'Vao avy nahavita ny devoarany izy ireo.' },
      { en: 'Have you ever seen the sea?', mg: 'Efa nahita ranomasina ve ianao?' },
      { en: 'We have already learned a lot.', mg: 'Efa nianatra zavatra maro izahay.' },
    ],
    notes: `Use "have" with I, you, we, they. Use "has" with he, she, it.
    <br>The past participle for regular verbs is the same as the past form (-ed).
    <br>Irregular verbs have special past participles (see → seen, eat → eaten, go → gone, write → written).
    <br><br>Tsy milaza fotoana marina ny Present Perfect.`
  },

  // ─── PARTS OF SPEECH ────────────────────────────────────────────────

  {
    id: 'pos-nouns',
    title: 'Nouns (Anarana)',
    type: 'pos',
    tag: 'Part of Speech',
    formula: '—',
    explanation: `A noun is a word that names a person, place, thing, or idea.
    <br><br><strong>Ny "noun" dia teny manondro olona, toerana, zavatra, na hevitra.</strong>
    <br><br>In English, most nouns add -s to form the plural (book → books, cat → cats).
    <br>If a noun ends in -s, -sh, -ch, -x, add -es (bus → buses, box → boxes).
    <br>Some nouns have irregular plurals (child → children, foot → feet, mouse → mice).`,
    examples: [
      { en: 'book / books', mg: 'boky / boky (maro)' },
      { en: 'child / children', mg: 'zaza / ankizy' },
      { en: 'teacher', mg: 'mpampianatra' },
      { en: 'Antananarivo', mg: 'Antananarivo' },
      { en: 'happiness', mg: 'fahasambarana' },
    ],
    notes: `Proper nouns (names of specific people/places) start with a capital letter: Madagascar, Marie, Antananarivo.
    <br>Common nouns are general: country, girl, city.
    <br><br>Ny anaran\'olona sy toerana dia soratana amin\'ny litera lehibe.`
  },

  {
    id: 'pos-verbs',
    title: 'Verbs (Matoanteny)',
    type: 'pos',
    tag: 'Part of Speech',
    formula: '—',
    explanation: `A verb is a word that describes an action, occurrence, or state of being.
    <br><br><strong>Ny "verb" dia teny milaza asa, zava-mitranga, na toe-javatra.</strong>
    <br><br>In English, verbs change form for tense (present, past, future) and for the person (I eat, she eats).`,
    examples: [
      { en: 'run — I run to school.', mg: 'mihazakazaka' },
      { en: 'eat — She eats rice.', mg: 'mihinana' },
      { en: 'sleep — They sleep at night.', mg: 'matory' },
      { en: 'be — I am happy. / You are kind. / He is tall.', mg: 'misy / ho' },
      { en: 'have — We have a book.', mg: 'manana' },
    ],
    notes: `The verb "to be" is irregular: I am, you are, he/she/it is, we are, they are.
    <br>Past: I was, you were, he/she/it was, we were, they were.
    <br><br>Ny matoanteny "be" dia tsy ara-dalàna: am, is, are.`
  },

  {
    id: 'pos-adjectives',
    title: 'Adjectives (Mpamaritra)',
    type: 'pos',
    tag: 'Part of Speech',
    formula: '—',
    explanation: `An adjective describes a noun. It tells us more about a person, place, or thing.
    <br><br><strong>Ny "adjective" dia teny milaza ny toetran\'ny olona na zavatra.</strong>
    <br><br>In English, adjectives come BEFORE the noun (a big house, a red car).
    <br>Adjectives do not change for plural or gender.`,
    examples: [
      { en: 'a big house', mg: 'trano lehibe' },
      { en: 'a small cat', mg: 'saka kely' },
      { en: 'a beautiful flower', mg: 'voninkazo tsara tarehy' },
      { en: 'a hot day', mg: 'andro mafana' },
      { en: 'an old book', mg: 'boky tranainy' },
    ],
    notes: `Comparative: add -er (big → bigger, small → smaller). Use "more" for longer words (beautiful → more beautiful).
    <br>Superlative: add -est (big → the biggest). Use "most" for longer words (beautiful → the most beautiful).
    <br><br>Ampio -er raha mitaha (big → bigger). Ampiasao "more" ho an\'ny teny lava.`
  },

  {
    id: 'pos-adverbs',
    title: 'Adverbs (Teny fanampiny)',
    type: 'pos',
    tag: 'Part of Speech',
    formula: '—',
    explanation: `An adverb describes a verb, an adjective, or another adverb. It tells us how, when, where, or how often something happens.
    <br><br><strong>Ny "adverb" dia teny milaza ny fanaovana ny asa (amin\'ny fomba ahoana, amin\'ny fotoana ahoana, na amin\'ny toerana ahoana).</strong>
    <br><br>Many adverbs end in -ly (slow → slowly, careful → carefully).`,
    examples: [
      { en: 'She speaks slowly.', mg: 'Miteny miadana izy.' },
      { en: 'He runs fast.', mg: 'Mihazakazaka haingana izy.' },
      { en: 'We go to school every day.', mg: 'Mandeha sekoly isan\'andro izahay.' },
      { en: 'They play outside.', mg: 'Milalao any ivelany izy ireo.' },
      { en: 'She always arrives early.', mg: 'Tonga aloha foana izy.' },
    ],
    notes: `Adverbs of frequency: always (100%), usually (80%), often (50%), sometimes (30%), rarely (10%), never (0%).
    <br>They come before the main verb but after the verb "to be".
    <br><br>Ny matetika: always → usually → often → sometimes → rarely → never.`
  },

  {
    id: 'pos-prepositions',
    title: 'Prepositions (Mpampiankina)',
    type: 'pos',
    tag: 'Part of Speech',
    formula: '—',
    explanation: `A preposition shows the relationship between a noun/pronoun and another word in the sentence. It often tells us about position, time, or direction.
    <br><br><strong>Ny "preposition" dia teny mampifandray ny anarana sy ny teny hafa ao amin\'ny fehezanteny.</strong>`,
    examples: [
      { en: 'The book is ON the table.', mg: 'Eo AMBONY ny latabatra ny boky.' },
      { en: 'She is IN the classroom.', mg: 'Ao ANATY efitrano izy.' },
      { en: 'I go TO school AT 7 o\'clock.', mg: 'Mandeha ANY amin\'ny sekoly amin\'ny 7 ora aho.' },
      { en: 'The cat is UNDER the chair.', mg: 'Eo AMBANY ny seza ny saka.' },
      { en: 'He is sitting NEXT TO me.', mg: 'Mipetraka eo ANILAIKO izy.' },
    ],
    notes: `Common prepositions of place: in, on, at, under, behind, in front of, next to, between.
    <br>Common prepositions of time: at (at 5pm), in (in the morning), on (on Monday).
    <br><br>Misy karazana preposition milaza toerana sy milaza fotoana.`
  },

  {
    id: 'pos-articles',
    title: 'Articles (a / an / the)',
    type: 'pos',
    tag: 'Part of Speech',
    formula: 'a/an + singular countable noun  |  the + any noun',
    explanation: `Articles are small words that come before nouns.
    <br><br><strong>Ny "article" dia teny fohy eo alohan\'ny anarana.</strong>
    <br><br>• "a" — before words starting with a CONSONANT sound (a book, a car, a university — "university" sounds like "yoo")
    <br>• "an" — before words starting with a VOWEL sound (an apple, an hour — "hour" sounds like "our")
    <br>• "the" — for specific things (the book on the table)`,
    examples: [
      { en: 'a book', mg: 'boky iray' },
      { en: 'an apple', mg: 'paoma iray' },
      { en: 'the sun', mg: 'ny masoandro (izay fantatra)' },
      { en: 'an umbrella', mg: 'elo iray' },
      { en: 'the book I bought yesterday', mg: 'ny boky novidiko omaly' },
    ],
    notes: `Do not use "a" or "an" with plural nouns (books ✓, a books ✗).
    <br>Use "the" when both the speaker and listener know which thing.
    <br>Do not use "the" with general ideas (Books are useful. ✓ — The books are useful. only if specific).
    <br><br>Tsy ampiasaina ny "a"/"an" amin\'ny anarana maro.`
  },

  {
    id: 'pos-pronouns',
    title: 'Pronouns (Mpisolo anarana)',
    type: 'pos',
    tag: 'Part of Speech',
    formula: '—',
    explanation: `A pronoun replaces a noun so we do not have to repeat it.
    <br><br><strong>Ny "pronoun" dia teny misolo ny anarana mba tsy hiverimberina.</strong>
    <br><br>Subject pronouns: I, you, he, she, it, we, they
    <br>Object pronouns: me, you, him, her, it, us, them
    <br>Possessive pronouns: mine, yours, his, hers, its, ours, theirs`,
    examples: [
      { en: 'Sita is a student. → She is a student.', mg: 'Mpianatra i Sita. → Mpianatra izy.' },
      { en: 'I see John. → I see him.', mg: 'Mahita azy aho.' },
      { en: 'This book is mine.', mg: 'Ahy ity boky ity.' },
      { en: 'We love our country.', mg: 'Tianay ny firenenay.' },
      { en: 'They live near us.', mg: 'Mipetraka akaikinay izy ireo.' },
    ],
    notes: `Subject pronouns go before the verb. Object pronouns go after the verb.
    <br>Possessive adjectives (my, your, his, her, its, our, their) are different from possessive pronouns.
    <br><br>My sady ny anarana no misolo ny mpanao na ny mpiharan'ny asa.`
  },

  // ─── SENTENCE STRUCTURES ────────────────────────────────────────────

  {
    id: 'struct-questions',
    title: 'Making Questions (Fanontaniana)',
    type: 'structure',
    tag: 'Structure',
    formula: 'Question word + auxiliary + subject + verb?',
    explanation: `There are two types of questions in English:
    <br><br>1. YES/NO questions — start with an auxiliary verb (am, is, are, do, does, did, have, has, will)
    <br>2. WH-questions — start with a question word (what, where, when, why, who, how)
    <br><br><strong>Karazana fanontaniana roa amin\'ny Anglisy: eny/tsia ary WH-fanontaniana.</strong>`,
    examples: [
      { en: 'Do you like rice? → Yes, I do. / No, I don\'t.', mg: 'Tianao ve ny vary?' },
      { en: 'Is she your sister?', mg: 'Anabavinao ve izy?' },
      { en: 'What is your name?', mg: 'Iza no anaranao?' },
      { en: 'Where do you live?', mg: 'Aiza no misy anao?' },
      { en: 'How old are you?', mg: 'Firy taona ianao?' },
    ],
    notes: `Question words: What (inona), Where (aiza), When (oviana), Why (nahoana), Who (iza), How (ahoana).
    <br>For present simple questions, use "do" (I/you/we/they) or "does" (he/she/it).
    <br>For past simple questions, use "did" for all persons.
    <br><br>Ampiasao "do" ho an\'ny fanontaniana ankehitriny, "did" ho an\'ny lasa.`
  },

  {
    id: 'struct-negatives',
    title: 'Negatives (Fandavana)',
    type: 'structure',
    tag: 'Structure',
    formula: 'Subject + auxiliary + not + verb',
    explanation: `To make a negative sentence, add "not" after the auxiliary verb.
    <br><br><strong>Mba hanaovana fehezanteny mandavà, ampio "not" aorian\'ny matoanteny fanampy (auxiliary).</strong>
    <br><br>Present: I do not (don\'t) like / She does not (doesn\'t) like
    <br>Past: I did not (didn\'t) go
    <br>Future: I will not (won\'t) go
    <br>To be: I am not / She is not (isn\'t) / They are not (aren\'t)`,
    examples: [
      { en: 'I do not eat meat.', mg: 'Tsy mihinana hena aho.' },
      { en: 'She does not speak English.', mg: 'Tsy miteny anglisy izy.' },
      { en: 'They did not come to school.', mg: 'Tsy tonga nianatra izy ireo.' },
      { en: 'He is not a teacher.', mg: 'Tsy mpampianatra izy.' },
      { en: 'We will not go tomorrow.', mg: 'Tsy handeha rahampitso izahay.' },
    ],
    notes: `Contractions (short forms):
    <br>do not = don't    does not = doesn't    did not = didn't
    <br>is not = isn't    are not = aren't    am not = (no contraction)
    <br>will not = won't    have not = haven't    has not = hasn't
    <br><br>Misy endrika fohy (contractions) ampiasaina amin\'ny teny andavan\'andro.`
  },

  {
    id: 'struct-imperatives',
    title: 'Imperatives (Didy / Fangatahana)',
    type: 'structure',
    tag: 'Structure',
    formula: 'Base verb + (object)  |  Don\'t + base verb',
    explanation: `We use the imperative to give commands, instructions, or make requests. The subject "you" is not spoken.
    <br><br><strong>Mampiasa ny "imperative" isika rehefa manome didy, toromarika, na fangatahana. Tsy ilaina ny milaza ny mpanao (you).</strong>`,
    examples: [
      { en: 'Open the door, please.', mg: 'Sokafy ny varavarana azafady.' },
      { en: 'Sit down.', mg: 'Mipetraha.' },
      { en: 'Don\'t run in the classroom.', mg: 'Aza mihazakazaka ao an-dakilasy.' },
      { en: 'Listen carefully.', mg: 'Mihainoa tsara.' },
      { en: 'Please write your name.', mg: 'Soraty ny anaranao azafady.' },
    ],
    notes: `To make a negative imperative, use "Don\'t" (or "Do not") at the beginning.
    <br>Adding "please" makes the request more polite.
    <br>Use the imperative for instructions (recipes, directions, rules).
    <br><br>Ampio "please" mba ho fanajana.`
  },

  // ─── CONDITIONALS ──────────────────────────────────────────────────

  {
    id: 'conditional-zero',
    title: 'Zero Conditional — Facts (Fahamarinana)',
    type: 'tense',
    tag: 'Conditional',
    formula: 'If + present simple, + present simple',
    explanation: `We use the Zero Conditional for things that are always true — facts and general truths.
    <br><br><strong>Mampiasa ny "Zero Conditional" isika rehefa milaza zavatra marina foana — fahamarinana tsy miova.</strong>`,
    examples: [
      { en: 'If you heat water, it boils.', mg: 'Raha afanaina ny rano, dia mangotraka izy.' },
      { en: 'If the sun shines, plants grow.', mg: 'Raha mamirapiratra ny masoandro, dia mitombo ny zavamaniry.' },
      { en: 'If you mix red and blue, you get purple.', mg: 'Raha afangaro ny mena sy manga, dia volomparasy ny vokany.' },
    ],
    notes: `In the zero conditional, "if" = "when" — the result is always true.
    <br><br>Eo amin\'ny zero conditional, "if" = "when" — foana no marina ny vokany.`
  },

  {
    id: 'conditional-first',
    title: 'First Conditional — Real Possibility (Mety hitranga)',
    type: 'tense',
    tag: 'Conditional',
    formula: 'If + present simple, + will + base verb',
    explanation: `We use the First Conditional for real or possible situations in the future.
    <br><br><strong>Mampiasa ny "First Conditional" isika rehefa miteny zavatra mety hitranga tokoa amin\'ny ho avy.</strong>`,
    examples: [
      { en: 'If it rains tomorrow, we will stay at home.', mg: 'Raha milatsaka ny orana rahampitso, dia hijanona any an-trano isika.' },
      { en: 'If you study hard, you will pass the exam.', mg: 'Raha mianatra mafy ianao, dia handalo ny fanadinana.' },
      { en: 'If I have money, I will buy a new bike.', mg: 'Raha manan-karena aho, dia hividy bisikileta vaovao.' },
      { en: 'She will call you if she arrives early.', mg: 'Hiantso anao izy raha tonga aloha.' },
    ],
    notes: `The "if" part uses PRESENT simple (not "will"). The result part uses "will".
    <br>We can swap the order: "You will pass the exam if you study."
    <br><br>Tandremo: olona maro no diso mampiasa "will" ao amin\'ny manaraka ny "if" — tsy mety izany!`
  },

  {
    id: 'conditional-second',
    title: 'Second Conditional — Imaginary (Saina / Zavatra an-tsaina)',
    type: 'tense',
    tag: 'Conditional',
    formula: 'If + past simple, + would + base verb',
    explanation: `We use the Second Conditional for imaginary or unreal situations — things that are not true now.
    <br><br><strong>Mampiasa ny "Second Conditional" isika rehefa miteny zavatra an-tsaina, tsy tena misy amin\'izao fotoana izao.</strong>`,
    examples: [
      { en: 'If I were rich, I would travel around the world.', mg: 'Raha manan-karena aho, dia handeha hitsidika an\'izao tontolo izao.' },
      { en: 'If I had a car, I would drive to school.', mg: 'Raha manana fiara aho, dia handeha amin\'ny fiara hianatra.' },
      { en: 'If she spoke English, she could work abroad.', mg: 'Raha mahay miteny anglisy izy, dia afaka miasa any ivelany.' },
      { en: 'If we lived near the sea, we would swim every day.', mg: 'Raha mipetraka akaikin\'ny ranomasina isika, dia milomano isan\'andro.' },
    ],
    notes: `We use "were" for all subjects in the second conditional (If I were, if she were) — even for he/she/it.
    <br>We use "would" for imaginary results.
    <br><br>Ampiasaina ny "were" ho an\'ny olona rehetra: If I were... If she were... (tsy "was")`
  },

  {
    id: 'conditional-third',
    title: 'Third Conditional — Past Regrets (Nenina tamin\'ny lasa)',
    type: 'tense',
    tag: 'Conditional',
    formula: 'If + past perfect, + would have + past participle',
    explanation: `We use the Third Conditional to talk about imaginary situations in the past — things that did not happen, and we cannot change them.
    <br><br><strong>Mampiasa ny "Third Conditional" isika rehefa miteny zavatra tsy nitranga tamin\'ny lasa, fa misaintsaina hoe "inona no ho azoko natao".</strong>`,
    examples: [
      { en: 'If I had studied harder, I would have passed.', mg: 'Raha nianatra mafy kokoa aho, dia ho lany ny fanadinana.' },
      { en: 'If she had taken the bus, she would not have been late.', mg: 'Raha nitaingina bus izy, dia tsy ho tara.' },
      { en: 'We would have won if we had played better.', mg: 'Ho nandresy isika raha nilalao tsara kokoa.' },
    ],
    notes: `Past perfect: had + past participle (had studied, had gone, had eaten).
    <br>Result: would have + past participle (would have passed, would have gone).
    <br><br>Ity dia ampiasaina indrindra hanehoana nenina na fanenenana.`
  },

  // ─── MODAL VERBS ────────────────────────────────────────────────────

  {
    id: 'modal-can',
    title: 'Can / Could — Ability & Permission (Fahaizana sy Fahazoan-dalana)',
    type: 'pos',
    tag: 'Modals',
    formula: 'can/could + base verb',
    explanation: `"Can" and "could" talk about ability and permission.
    <br>• can — present ability and permission (I can swim / Can I go out?)
    <br>• could — past ability and polite requests (When I was young, I could run fast / Could you help me?)
    <br><br><strong>"Can" sy "could" dia milaza fahaizana sy fangatahana alalana. "Could" koa dia fampolonina kokoa.</strong>`,
    examples: [
      { en: 'I can speak a little English.', mg: 'Mahay miteny anglisy kely aho.' },
      { en: 'She can play the guitar.', mg: 'Mahay mitendry gitara izy.' },
      { en: 'Can I borrow your pen?', mg: 'Azoko nindramina ve ny peninao?' },
      { en: 'When I was ten, I could climb trees.', mg: 'Fony folo taona aho, dia afaka niakatra hazo.' },
      { en: 'Could you open the window, please?', mg: 'Afaka manokatra ny varavarankely ve ianao, azafady?' },
    ],
    notes: `After "can"/"could", the verb has NO "to" and NO change: "I can swim" (NOT "I can to swim").
    <br>Negative: cannot / can\'t, could not / couldn\'t.
    <br>There is no -s on "can" for he/she/it: "She can" (NOT "she cans").
    <br><br>Tsy miova ny matoanteny aorian\'ny "can": I can swim.`
  },

  {
    id: 'modal-must',
    title: 'Must & Have to — Obligation (Teren-katao)',
    type: 'pos',
    tag: 'Modals',
    formula: 'must / have to + base verb',
    explanation: `"Must" and "have to" talk about obligation — things you are required to do.
    <br>• must — strong personal obligation or rule (You must wear a uniform.) — stronger and more serious
    <br>• have to — external obligation (I have to do my homework.)
    <br>• must not / mustn\'t — prohibition (You mustn\'t talk in the exam.)
    <br><br><strong>Samihafa kely ny "must" sy "have to", fa mitovy ny heviny: zavatra tsy maintsy atao.</strong>`,
    examples: [
      { en: 'You must stop at the red light.', mg: 'Tsy maintsy mijanona amin\'ny jiro mena ianao.' },
      { en: 'I have to go to school every day.', mg: 'Tsy maintsy mianatra isan\'andro aho.' },
      { en: 'She has to help her mother at home.', mg: 'Tsy maintsy manampy ny reniny any an-trano izy.' },
      { en: 'You mustn\'t smoke here.', mg: 'Tsy maintsy tsy mifoka eto ianao.' },
      { en: 'Do we have to wear uniforms?', mg: 'Tsy maintsy manao fanamiana ve isika?' },
    ],
    notes: `"Must" has no past form — use "had to" for the past.
    <br>"Have to" changes for he/she/it: has to.
    <br>"Mustn\'t" = it is forbidden. "Don\'t have to" = it is not necessary.
    <br><br>"Mustn\'t" dia fandrarana; "don\'t have to" dia tsy ilaina — samy hafa.`
  },

  {
    id: 'modal-should',
    title: 'Should — Advice (Toro-hevitra)',
    type: 'pos',
    tag: 'Modals',
    formula: 'should / shouldn\'t + base verb',
    explanation: `We use "should" to give advice or say what is a good idea.
    <br><br><strong>Mampiasa ny "should" isika rehefa manome toro-hevitra na milaza izay zavatra mety.</strong>`,
    examples: [
      { en: 'You should drink more water.', mg: 'Tokony hisotro rano betsaka kokoa ianao.' },
      { en: 'You shouldn\'t eat too much sugar.', mg: 'Tsy tokony hihinana siramamy be loatra ianao.' },
      { en: 'He should go to bed early tonight.', mg: 'Tokony hatory aloha izy anio alina.' },
      { en: 'Should I take an umbrella?', mg: 'Tokony hitondra elo ve aho?' },
      { en: 'You should practise English every day.', mg: 'Tokony hanao fanazarana anglisy isan\'andro ianao.' },
    ],
    notes: `"Should" is not as strong as "must". Should = good idea, must = required.
    <br>Question: Should + subject + verb? (Should I...?)
    <br><br>Ny "should" dia tsy dia mafy loatra raha oharina amin\'ny "must".`
  },

  // ─── PASSIVE VOICE ─────────────────────────────────────────────────

  {
    id: 'passive-voice',
    title: 'Passive Voice (Fanehoana tsy misy mpanao)',
    type: 'structure',
    tag: 'Voice',
    formula: 'Subject + be + past participle (+ by...)',
    explanation: `We use the passive voice when the action is more important than WHO does it.
    <br><br><strong>Mampiasa ny "passive" isika rehefa zava-dehibe kokoa ny asa noho ny mpanao azy.</strong>
    <br><br>Active: Someone builds houses. → Passive: Houses are built.
    <br>Active: Someone wrote the book. → Passive: The book was written.`,
    examples: [
      { en: 'Rice is grown in Madagascar.', mg: 'Any Madagasikara no ambolena ny vary.' },
      { en: 'The cake was made by my mother.', mg: 'Ny reniko no nanao ny mofomamy.' },
      { en: 'English is spoken in many countries.', mg: 'Teny anglisy no ampiasaina any amin\'ny firenena maro.' },
      { en: 'The letter was written yesterday.', mg: 'Nosoratana omaly ny taratasy.' },
      { en: 'The new school will be built next year.', mg: 'Hamboarina herintaona ho avy ny sekoly vaovao.' },
    ],
    notes: `Present passive: am/is/are + past participle (is grown, are spoken)
    <br>Past passive: was/were + past participle (was written, were built)
    <br>Future passive: will be + past participle (will be built)
    <br>Use "by" to say who did it, if important.
    <br><br>Ampiasao ny "by" rehefa tianao lazaina ny mpanao.`
  },

  // ─── REPORTED SPEECH ───────────────────────────────────────────────

  {
    id: 'reported-speech',
    title: 'Reported Speech (Famoahana kabary)',
    type: 'structure',
    tag: 'Reported',
    formula: 'He said (that) + subject + tense change',
    explanation: `We use reported speech to say what someone said without using their exact words.
    <br><br><strong>Mampiasa ny "reported speech" isika rehefa mitantara ny teny nataon\'olona, nefa tsy ny teny tonga lafatra.</strong>
    <br><br>Tenses usually go one step back:
    <br>• present → past: "I am tired" → She said (that) she was tired.
    <br>• will → would: "I will come" → He said he would come.
    <br>• can → could: "I can help" → She said she could help.`,
    examples: [
      { en: '"I am hungry." → She said (that) she was hungry.', mg: '"Noana aho." → Hoy izy noana.' },
      { en: '"We play football." → They said (that) they played football.', mg: '"Milalao baolina kitra izahay." → Hoy izy ireo nilalao.' },
      { en: '"I will come tomorrow." → He said (that) he would come the next day.', mg: '"Ho avy aho rahampitso." → Hoy izy ho avy ny andro manaraka.' },
      { en: '"Where is the market?" → She asked where the market was.', mg: '"Aiza ny tsena?" → Nanontany izy hoe aiza ny tsena.' },
    ],
    notes: `Present simple → past simple, present continuous → past continuous, past simple → past perfect.
    <br>Pronouns change: I → he/she, we → they.
    <br>Time words change: today → that day, tomorrow → the next day, yesterday → the day before.
    <br><br>Misy fiovana eo amin\'ny fotoana sy ny mpisolo anarana.`
  },

  // ─── CONJUNCTIONS / LINKING WORDS ─────────────────────────────────

  {
    id: 'conjunctions',
    title: 'Conjunctions & Linking Words (Mpampitohy)',
    type: 'structure',
    tag: 'Linking',
    formula: '..., and / but / because / so / or ...',
    explanation: `Conjunctions connect words, phrases, and sentences. They make English flow — this is the key to fluency!
    <br><br><strong>Ny "conjunction" dia mampitohy ny fehezanteny. Zava-dehibe ho an\'ny fahaizana miteny mivaingana ireo!</strong>
    <br><br>• and — added information (I like rice and beans)
    <br>• but — contrast (I am small but strong)
    <br>• because — reason (I stayed home because I was tired)
    <br>• so — result (It rained, so we stayed inside)
    <br>• or — choice (Tea or coffee?)`,
    examples: [
      { en: 'I bought bread and milk.', mg: 'Nividy mofo sy ronono aho.' },
      { en: 'He is poor but honest.', mg: 'Mahantra izy nefa marina.' },
      { en: 'She stayed at home because it was raining.', mg: 'Nijanona tao an-trano izy satria nilatsaka ny orana.' },
      { en: 'I was tired, so I went to bed early.', mg: 'Reraka aho, ka natory aloha.' },
      { en: 'Do you want tea or coffee?', mg: 'Te-dite sa kafe ve ianao?' },
    ],
    notes: `More linking words: although (na dia), however (nefa), therefore (kosa), for example (ohatra).
    <br>Use "so" for results and "because" for reasons — do not mix them up!
     <br><br>Aza afangaro ny "because" (satria) sy "so" (ka).`
  },

  // ─── COMPARATIVES & SUPERLATIVES ──────────────────────────────────

  {
    id: 'comparatives',
    title: 'Comparatives & Superlatives (Fampitahana)',
    type: 'structure',
    tag: 'Comparison',
    formula: 'adjective + -er / more + adjective | the + adjective + -est / the most + adjective',
    explanation: `We use comparatives to compare two things, and superlatives to compare three or more.
    <br><br><strong>Mampiasa ny "comparative" isika rehefa mampitaha zavatra roa, ary ny "superlative" rehefa zavatra mihoatra ny roa.</strong>
    <br><br>Short adjectives (1 syllable): add -er / -est (tall → taller → the tallest)
    <br>Long adjectives (3+ syllables): use more / the most (beautiful → more beautiful → the most beautiful)
    <br>Two-syllable adjectives ending in -y: change y to ier (happy → happier → the happiest)`,
    examples: [
      { en: 'Today is hotter than yesterday.', mg: 'Mafana kokoa androany noho omaly.' },
      { en: 'My sister is taller than me.', mg: 'Lava kokoa noho izaho ny anabaviko.' },
      { en: 'English is more difficult than maths.', mg: 'Sarotra kokoa noho ny matematika ny Anglisy.' },
      { en: 'Madagascar is the largest island in Africa.', mg: 'I Madagasikara no nosy lehibe indrindra any Afrika.' },
      { en: 'This is the most interesting lesson!', mg: 'Ity no lesona mahaliana indrindra!' },
    ],
    notes: `Irregular comparatives: good → better → the best, bad → worse → the worst, far → farther/further → the farthest/furthest.
    <br>Use "than" for comparisons: taller THAN me.
    <br>Use "the" before superlatives: THE tallest.
    <br><br>Tsy ara-dalàna: good → better → best, bad → worse → worst.`
  },

  // ─── WH QUESTIONS ───────────────────────────────────────────────────

  {
    id: 'wh-questions',
    title: 'WH Questions (Fanontaniana)',
    type: 'structure',
    tag: 'Questions',
    formula: 'WH word + auxiliary / be + subject + verb?',
    explanation: `WH questions ask for information, not only “yes” or “no”. Choose the question word that matches the information you need.
    <br><br><strong>Ny fanontaniana WH dia mitady fampahalalana manokana, fa tsy valiny “eny” na “tsia” fotsiny.</strong>
    <br><br><strong>Who</strong> = person · <strong>What</strong> = thing or action · <strong>Where</strong> = place · <strong>When</strong> = time · <strong>Why</strong> = reason · <strong>Which</strong> = choice · <strong>Whose</strong> = owner · <strong>How</strong> = way, amount or condition`,
    examples: [
      { en: 'Who is your teacher?', mg: 'Iza no mpampianatra anao?' },
      { en: 'What do you eat for breakfast?', mg: 'Inona no haninao amin’ny sakafo maraina?' },
      { en: 'Where do you live?', mg: 'Aiza ianao no mipetraka?' },
      { en: 'When does school start?', mg: 'Rahoviana no manomboka ny sekoly?' },
      { en: 'Why are you happy?', mg: 'Nahoana ianao no faly?' },
      { en: 'How many books do you have?', mg: 'Firy ny boky anananao?' },
    ],
    notes: `With most verbs, use do / does / did: Where do you live? What does she like? When did they arrive?
    <br>With be, put be before the subject: Where is the school? Why are you late?
    <br>With a modal, put the modal before the subject: What can you do? Where should we go?
    <br><br>Tsarovy: “does” no ampiasaina amin’ny he/she/it amin’ny ankehitriny, fa miverina amin’ny endrika fototra ny matoanteny: What does he eat?`,
  },

  // ─── BE AND HAVE ────────────────────────────────────────────────────

  {
    id: 'be-and-have',
    title: 'To Be & To Have (Be / Have)',
    type: 'structure',
    tag: 'Verbs',
    formula: 'be: am / is / are · have: have / has',
    explanation: `Be describes a person or thing, a condition, or a place. Have shows possession or something connected to a person.
    <br><br><strong>Ny “be” dia ilazana hoe iza na manao ahoana ny olona/zavatra. Ny “have” dia ilazana fananana.</strong>`,
    examples: [
      { en: 'I am a pupil. / She is kind. / They are at school.', mg: 'Mpianatra aho. / Tsara fanahy izy. / Any an-tsekoly izy ireo.' },
      { en: 'I have a book. / He has two sisters.', mg: 'Manana boky aho. / Manana anabavy roa izy.' },
      { en: 'Are you ready? / Does she have a pencil?', mg: 'Vonona ve ianao? / Manana pensilihazo ve izy?' },
      { en: 'We were happy yesterday. / They had rice for lunch.', mg: 'Faly izahay omaly. / Nihinana vary izy ireo tamin’ny sakafo atoandro.' },
    ],
    notes: `Present be: I am, you/we/they are, he/she/it is. Past be: I/he/she/it was, you/we/they were.
    <br>Present have: I/you/we/they have, he/she/it has. Past have: had for every subject.
    <br>Questions with be: Is she happy? Questions with have: Does she have a book?`,
  },

  {
    id: 'advanced-register',
    title: 'Formal and Academic English',
    type: 'structure',
    tag: 'Advanced',
    formula: 'precise vocabulary + logical links + controlled sentence structure',
    explanation: `Formal English is used in reports, applications, presentations and academic writing. Choose precise words, avoid unnecessary repetition, and make the relationship between ideas clear.`,
    examples: [
      { en: 'The project was successful because the team planned carefully.', mg: '' },
      { en: 'Although the road was difficult, the group completed the journey.', mg: '' },
      { en: 'The evidence suggests that regular reading improves vocabulary.', mg: '' },
      { en: 'In conclusion, small local actions can create lasting change.', mg: '' },
    ],
    notes: `Useful links: however, therefore, consequently, in contrast, for example, in addition, and in conclusion.
    <br>Prefer precise verbs: improve instead of make better, investigate instead of look at, and demonstrate instead of show.`,
  },

  {
    id: 'intermediate-relative-clauses', title: 'Relative Clauses', type: 'structure', tag: 'Intermediate',
    formula: 'noun + who / which / that / where + clause',
    explanation: `Relative clauses add information about a person, thing, or place. They help you join ideas without repeating the same noun.`,
    examples: [
      { en: 'The girl who won the prize is my cousin.', mg: '' },
      { en: 'This is the book that I recommended.', mg: '' },
      { en: 'We visited the village where my grandfather was born.', mg: '' },
      { en: 'The project, which took three months, was successful.', mg: '' },
    ],
    notes: `Use who for people, which for things, that for people or things in defining clauses, and where for places.`,
  },
  {
    id: 'intermediate-question-tags', title: 'Question Tags', type: 'structure', tag: 'Intermediate',
    formula: 'positive statement + negative tag | negative statement + positive tag',
    explanation: `Question tags check information or invite agreement. The auxiliary in the tag matches the main statement.`,
    examples: [
      { en: 'You are ready, aren’t you?', mg: '' },
      { en: 'She has finished, hasn’t she?', mg: '' },
      { en: 'They don’t live here, do they?', mg: '' },
      { en: 'Let’s begin, shall we?', mg: '' },
    ],
    notes: `Keep the statement and tag opposite: positive → negative, negative → positive.`,
  },
  {
    id: 'intermediate-gerunds-infinitives', title: 'Gerunds and Infinitives', type: 'structure', tag: 'Intermediate',
    formula: 'verb + -ing | verb + to + base verb',
    explanation: `Some verbs are followed by an -ing form, while others are followed by to + verb. A few verbs can take both forms with a change in meaning.`,
    examples: [
      { en: 'I enjoy reading after school.', mg: '' },
      { en: 'She decided to study medicine.', mg: '' },
      { en: 'They avoid wasting water.', mg: '' },
      { en: 'We hope to finish early.', mg: '' },
    ],
    notes: `Common -ing verbs: enjoy, avoid, finish, suggest. Common infinitive verbs: decide, hope, plan, want.`,
  },
  {
    id: 'intermediate-discourse-markers', title: 'Discourse Markers', type: 'structure', tag: 'Intermediate',
    formula: 'idea 1; however, idea 2. Therefore, result.',
    explanation: `Discourse markers show how ideas connect. They make speaking and writing easier to follow.`,
    examples: [
      { en: 'The road was difficult. However, we continued.', mg: '' },
      { en: 'The evidence was limited. Therefore, we need more research.', mg: '' },
      { en: 'In addition, the plan is affordable.', mg: '' },
      { en: 'For example, pupils can start a reading club.', mg: '' },
    ],
    notes: `Use however for contrast, therefore for result, in addition for another point, and for example to introduce evidence.`,
  },
  {
    id: 'advanced-mixed-conditionals', title: 'Mixed Conditionals', type: 'structure', tag: 'Advanced',
    formula: 'if + past perfect, would + base verb (past cause → present result)',
    explanation: `Mixed conditionals connect a past condition with a present result, or a present condition with a past result.`,
    examples: [
      { en: 'If I had studied engineering, I would have a different job now.', mg: '' },
      { en: 'If she were more organised, she would have finished yesterday.', mg: '' },
      { en: 'If we had planned better, the project would be easier now.', mg: '' },
    ],
    notes: `Choose the tense according to the time of the condition and the time of the result.`,
  },
  {
    id: 'advanced-inversion', title: 'Inversion for Emphasis', type: 'structure', tag: 'Advanced',
    formula: 'negative adverb + auxiliary + subject + verb',
    explanation: `In formal English, inversion can emphasise a negative or limiting expression at the beginning of a sentence.`,
    examples: [
      { en: 'Rarely do we see such careful work.', mg: '' },
      { en: 'Not only did she finish early, but she also helped others.', mg: '' },
      { en: 'Under no circumstances should you share the password.', mg: '' },
    ],
    notes: `The auxiliary comes before the subject: Rarely do we..., not Rarely we do....`,
  },
  {
    id: 'advanced-modal-deduction', title: 'Modals of Deduction', type: 'structure', tag: 'Advanced',
    formula: 'must / might / can’t + base verb | must have + participle',
    explanation: `Use modal verbs to express how certain you are about a present or past situation.`,
    examples: [
      { en: 'The lights are on; someone must be home.', mg: '' },
      { en: 'She might have missed the bus.', mg: '' },
      { en: 'They can’t have finished already.', mg: '' },
    ],
    notes: `Must shows strong certainty, might shows possibility, and can’t shows that something is impossible.`,
  },
  {
    id: 'advanced-cohesion', title: 'Cohesion and Reference', type: 'structure', tag: 'Advanced',
    formula: 'reference word + clear link + repeated key idea',
    explanation: `Advanced writing connects sentences with reference words, substitution, and carefully chosen repetition.`,
    examples: [
      { en: 'The library needs more books. This investment would benefit every class.', mg: '' },
      { en: 'Several pupils volunteered. They organised the first meeting.', mg: '' },
      { en: 'The plan is affordable; moreover, it is easy to maintain.', mg: '' },
    ],
    notes: `Check that words such as this, they, and it clearly refer to one idea.`,
  },
];
