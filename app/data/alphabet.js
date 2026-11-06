/**
 * Easy English — Alphabet and everyday essentials.
 *
 *   ALPHABET         the 26 letters with their IPA pronunciation, an example
 *                    word and the Malagasy meaning
 *   TIME_PHRASES     useful sentences for asking and telling the time
 *   MEASURE_PHRASES  useful sentences for distance, length and weight
 *
 * The days of the week and the months of the year are shown in the Alphabet
 * screen from VOCABULARY (categories "Time & Days" and "Months") so they are
 * never written twice.
 */

const ALPHABET = [
  { letter: 'A', ipa: '/eɪ/',   type: 'vowel',     keyword: 'apple',    keywordMg: 'paoma',        emoji: '🍎' },
  { letter: 'B', ipa: '/biː/',  type: 'consonant', keyword: 'ball',     keywordMg: 'baolina',      emoji: '⚽' },
  { letter: 'C', ipa: '/siː/',  type: 'consonant', keyword: 'cat',      keywordMg: 'saka',         emoji: '🐱' },
  { letter: 'D', ipa: '/diː/',  type: 'consonant', keyword: 'dog',      keywordMg: 'alika',        emoji: '🐶' },
  { letter: 'E', ipa: '/iː/',   type: 'vowel',     keyword: 'egg',      keywordMg: 'atody',        emoji: '🥚' },
  { letter: 'F', ipa: '/ef/',   type: 'consonant', keyword: 'fish',     keywordMg: 'trondro',      emoji: '🐟' },
  { letter: 'G', ipa: '/dʒiː/', type: 'consonant', keyword: 'goat',     keywordMg: 'osy',          emoji: '🐐' },
  { letter: 'H', ipa: '/eɪtʃ/', type: 'consonant', keyword: 'house',    keywordMg: 'trano',        emoji: '🏠' },
  { letter: 'I', ipa: '/aɪ/',   type: 'vowel',     keyword: 'ink',      keywordMg: 'ranomainty',   emoji: '🖋️' },
  { letter: 'J', ipa: '/dʒeɪ/', type: 'consonant', keyword: 'jump',     keywordMg: 'mitsambikina', emoji: '🤸' },
  { letter: 'K', ipa: '/keɪ/',  type: 'consonant', keyword: 'kite',     keywordMg: 'papango',      emoji: '🪁' },
  { letter: 'L', ipa: '/el/',   type: 'consonant', keyword: 'lion',     keywordMg: 'liona',        emoji: '🦁' },
  { letter: 'M', ipa: '/em/',   type: 'consonant', keyword: 'moon',     keywordMg: 'volana',       emoji: '🌙' },
  { letter: 'N', ipa: '/en/',   type: 'consonant', keyword: 'nose',     keywordMg: 'orona',        emoji: '👃' },
  { letter: 'O', ipa: '/əʊ/',   type: 'vowel',     keyword: 'orange',   keywordMg: 'voasary',      emoji: '🍊' },
  { letter: 'P', ipa: '/piː/',  type: 'consonant', keyword: 'pen',      keywordMg: 'penina',       emoji: '🖊️' },
  { letter: 'Q', ipa: '/kjuː/', type: 'consonant', keyword: 'queen',    keywordMg: 'mpanjakavavy', emoji: '👑' },
  { letter: 'R', ipa: '/ɑːr/',  type: 'consonant', keyword: 'rain',     keywordMg: 'ranonorana',   emoji: '🌧️' },
  { letter: 'S', ipa: '/es/',   type: 'consonant', keyword: 'sun',      keywordMg: 'masoandro',    emoji: '☀️' },
  { letter: 'T', ipa: '/tiː/',  type: 'consonant', keyword: 'tree',     keywordMg: 'hazo',         emoji: '🌳' },
  { letter: 'U', ipa: '/juː/',  type: 'vowel',     keyword: 'umbrella', keywordMg: 'elom-baravarana', emoji: '☂️' },
  { letter: 'V', ipa: '/viː/',  type: 'consonant', keyword: 'village',  keywordMg: 'tanàna',       emoji: '🏘️' },
  { letter: 'W', ipa: '/ˈdʌbəljuː/', type: 'consonant', keyword: 'water', keywordMg: 'rano',       emoji: '💧' },
  { letter: 'X', ipa: '/eks/',  type: 'consonant', keyword: 'box',      keywordMg: 'boataboatra',  emoji: '📦' },
  { letter: 'Y', ipa: '/waɪ/',  type: 'consonant', keyword: 'yellow',   keywordMg: 'mavo',         emoji: '💛' },
  { letter: 'Z', ipa: '/zed/',  type: 'consonant', keyword: 'zebra',    keywordMg: 'zebra',        emoji: '🦓' },
];

const TIME_PHRASES = [
  { en: 'What time is it?',        mg: 'Manao ahoana ny ora?',        emoji: '⏰' },
  { en: "It is six o'clock.",      mg: 'Enina ora izao.',             emoji: '🕕' },
  { en: 'half past six',           mg: 'enina sy sasany',             emoji: '🕡' },
  { en: 'quarter past six',        mg: 'enina sy dimy ambin\u2019ny folo minitra', emoji: '🕕' },
  { en: 'It is noon.',             mg: 'Mitataovovonana izao.',       emoji: '🌞' },
  { en: 'It is midnight.',         mg: 'Misasakalina izao.',          emoji: '🌙' },
  { en: 'in the morning',          mg: 'ny maraina',                  emoji: '🌅' },
  { en: 'in the afternoon',        mg: 'ny tolakandro',               emoji: '🌇' },
  { en: 'in the evening',          mg: 'ny hariva',                   emoji: '🌆' },
  { en: 'at night',                mg: 'ny alina',                    emoji: '🌙' },
  { en: 'I am early.',             mg: 'Aloha aho.',                  emoji: '⏱️' },
  { en: 'I am late.',              mg: 'Tara aho.',                   emoji: '⌛' },
  { en: 'How many minutes?',       mg: 'Firy minitra?',               emoji: '⏲️' },
  { en: 'See you at three.',       mg: 'Hifankahita amin\u2019ny telo.', emoji: '👋' },
];

const MEASURE_PHRASES = [
  { en: 'How far is it?',          mg: 'Hafiriana izy?',                    emoji: '📍' },
  { en: 'It is far.',              mg: 'Lavitra izy.',                      emoji: '🔭' },
  { en: 'It is near.',             mg: 'Akaiky izy.',                       emoji: '📌' },
  { en: 'It is two kilometres.',   mg: 'Roa kilometatra izy.',              emoji: '🛣️' },
  { en: 'How long is it?',         mg: 'Firy ny halavany?',                 emoji: '📏' },
  { en: 'It is one metre long.',   mg: 'Iray metatra ny halavany.',         emoji: '📐' },
  { en: 'How heavy is it?',        mg: 'Firy ny lanjany?',                  emoji: '⚖️' },
  { en: 'It is five kilograms.',   mg: 'Dimy kilao izy.',                   emoji: '🧱' },
  { en: 'How tall are you?',       mg: 'Firy ny hahavonao?',                emoji: '📐' },
  { en: 'I am one metre fifty.',   mg: 'Iray metatra sy dimampolo aho.',    emoji: '🧍' },
  { en: 'a step',                  mg: 'iray dingana',                      emoji: '🦶' },
  { en: 'an arm\u2019s length',    mg: 'iray sedra',                        emoji: '💪' },
];
