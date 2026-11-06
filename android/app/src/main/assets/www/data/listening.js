/**
 * Easy English — Listening & Pronunciation data for Malagasy learners
 *
 * Sections: minimal pairs, phoneme drills, stress patterns, tips
 */

const LISTENING_DATA = {
  sections: [
    {
      id: 'listen-minimal-pairs',
      title: 'Minimal Pairs — Sounds that are similar',
      description: `Minimal pairs are two words that sound almost the same but have one different sound. Practise saying them aloud. Listen carefully to the difference.`,
      descriptionMg: `Ny “minimal pairs” dia teny roa izay saika mitovy feo, saingy misy feo iray tsy mitovy. Manaova fanazaran-tena amin’ny fanononana azy ireo. Henoy tsara ny fahasamihafana.`,
      pairs: [
        { a: 'ship', b: 'sheep', ipa: '/ʃɪp/ vs /ʃiːp/', note: 'Short /ɪ/ vs long /iː/' },
        { a: 'bed', b: 'bad', ipa: '/bed/ vs /bæd/', note: 'Short /e/ vs /æ/ (open your mouth more)' },
        { a: 'think', b: 'sink', ipa: '/θɪŋk/ vs /sɪŋk/', note: 'Put tongue between teeth for /θ/' },
        { a: 'live', b: 'leave', ipa: '/lɪv/ vs /liːv/', note: 'Short /ɪ/ vs long /iː/' },
        { a: 'full', b: 'fool', ipa: '/fʊl/ vs /fuːl/', note: 'Short /ʊ/ vs long /uː/' },
        { a: 'cat', b: 'cut', ipa: '/kæt/ vs /kʌt/', note: 'Open vowel /æ/ vs short /ʌ/' },
        { a: 'boat', b: 'bought', ipa: '/boʊt/ vs /bɔːt/', note: 'Diphthong /oʊ/ vs open /ɔː/' },
        { a: 'rice', b: 'rise', ipa: '/raɪs/ vs /raɪz/', note: 'Voiceless /s/ vs voiced /z/' },
        { a: 'thin', b: 'tin', ipa: '/θɪn/ vs /tɪn/', note: 'Put tongue out for /θ/ (th)' },
        { a: 'very', b: 'berry', ipa: '/ˈveri/ vs /ˈberi/', note: '/v/ bites lip, /b/ closes lips' },
      ],
    },

    {
      id: 'listen-th-sounds',
      title: 'The "th" Sounds — /θ/ and /ð/',
      description: `The "th" sound does not exist in Malagasy. There are two "th" sounds:
      <br><br>• <strong>Voiceless /θ/</strong> — like in "think" and "three". Put your tongue between your teeth and blow air out. Do not use your voice.
      <br>• <strong>Voiced /ð/</strong> — like in "this" and "mother". Put your tongue between your teeth and use your voice (your throat vibrates).`,
      descriptionMg: `Tsy misy ao amin’ny fiteny Malagasy ny feo “th”. Apetraho eo anelanelan’ny nify ny lela.`,
      pairs: [
        { a: 'think', b: 'this', ipa: '/θɪŋk/ vs /ðɪs/', note: '/θ/ air only, /ð/ voice on' },
        { a: 'three', b: 'the', ipa: '/θriː/ vs /ðə/', note: 'Practise putting tongue out' },
        { a: 'bath', b: 'bathe', ipa: '/bɑːθ/ vs /beɪð/', note: 'Both end with th: voiceless vs voiced' },
        { a: 'teeth', b: 'teethe', ipa: '/tiːθ/ vs /tiːð/', note: 'Nouns vs verbs difference' },
        { a: 'thanks', b: 'that', ipa: '/θæŋks/ vs /ðæt/', note: 'Common words to practise' },
        { a: 'mouth', b: 'mouths', ipa: '/maʊθ/ vs /maʊðz/', note: 'Singular vs plural th sound changes' },
      ],
    },

    {
      id: 'listen-vowel-length',
      title: 'Long and Short Vowels',
      description: `English has short vowels and long vowels. The length of the vowel can change the meaning of a word.
      <br><br>Short vowels: /ɪ/ (sit), /ʊ/ (book), /e/ (bed), /æ/ (cat), /ʌ/ (cup), /ɒ/ (hot)
      <br>Long vowels: /iː/ (seat), /uː/ (food), /ɑː/ (car), /ɔː/ (door), /ɜː/ (bird)`,
      descriptionMg: `Misy zanatsoratra fohy sy lava ny teny anglisy. Afaka manova ny hevitry ny teny ny halavan’ny feo.`,
      pairs: [
        { a: 'sit', b: 'seat', ipa: '/sɪt/ vs /siːt/', note: 'Short /ɪ/ vs long /iː/' },
        { a: 'pull', b: 'pool', ipa: '/pʊl/ vs /puːl/', note: 'Short /ʊ/ vs long /uː/' },
        { a: 'cot', b: 'caught', ipa: '/kɒt/ vs /kɔːt/', note: 'Open short /ɒ/ vs long /ɔː/' },
        { a: 'cup', b: 'carp', ipa: '/kʌp/ vs /kɑːp/', note: 'Short /ʌ/ vs long /ɑː/' },
        { a: 'bed', b: 'bird', ipa: '/bed/ vs /bɜːd/', note: 'Short /e/ vs long /ɜː/' },
        { a: 'ship', b: 'sheep', ipa: '/ʃɪp/ vs /ʃiːp/', note: 'Classic short vs long pair' },
      ],
    },

    {
      id: 'listen-word-stress',
      title: 'Word Stress — Which syllable is strong?',
      description: `In English words with two or more syllables, one syllable is pronounced more strongly (stress). The wrong stress can make a word hard to understand.
      <br><br>Stress is marked with ' before the stressed syllable.`,
      descriptionMg: `Misy vaninteny hamafisina sy vaninteny malefaka ao amin’ny teny anglisy. Raha diso ny fanamafisana dia mety ho sarotra ny mahazo ilay teny.`,

      pairs: [
        { a: 'RECord', b: 'reCORD', ipa: '/ˈrekɔːd/ (noun) vs /rɪˈkɔːd/ (verb)', note: 'Noun stress on first, verb on second' },
        { a: 'PREsent', b: 'preSENT', ipa: '/ˈprezənt/ (gift) vs /prɪˈzent/ (to show)', note: 'Same pattern: noun vs verb' },
        { a: 'IMport', b: 'imPORT', ipa: '/ˈɪmpɔːt/ (goods) vs /ɪmˈpɔːt/ (to bring in)', note: 'Practice saying both' },
        { a: 'PHOto', b: 'phoTOGrapher', ipa: '/ˈfoʊtoʊ/ vs /fəˈtɒɡrəfə/', note: 'Stress moves in longer words' },
        { a: 'eDUcation', b: 'eduCAtional', ipa: '/ˌedʒuˈkeɪʃən/ vs /ˌedʒuˈkeɪʃənəl/', note: 'Stress stays on -ca-' },
      ],
    },

    {
      id: 'listen-connected-speech',
      title: 'Connected Speech and Linking',
      description: `In natural speech, words connect and some sounds become weaker. Listen for the rhythm rather than trying to hear every word separately.`,
      pairs: [
        { a: 'pick it up', b: 'turn it off', ipa: '/pɪk ɪt ʌp/ · /tɜːn ɪt ɒf/', note: 'Notice the words joining across boundaries' },
        { a: 'want to', b: 'going to', ipa: '/wɒnə/ · /ɡənə/', note: 'Common weak forms in conversation' },
        { a: 'next week', b: 'good girl', ipa: '/nekst wiːk/ · /ɡʊd ɡɜːl/', note: 'Final consonant meets the next sound' },
      ],
    },
    {
      id: 'listen-intonation',
      title: 'Intonation and Meaning',
      description: `The voice rises and falls to show whether a speaker is asking, checking, continuing, or finishing. Practise the whole thought, not only individual words.`,
      pairs: [
        { a: 'Really?', b: 'Really.', ipa: '/ˈrɪəli/ ↗ · /ˈrɪəli/ ↘', note: 'A rise can show surprise; a fall can show certainty' },
        { a: 'You finished?', b: 'You finished.', ipa: '/juː ˈfɪnɪʃt/ ↗ · /juː ˈfɪnɪʃt/ ↘', note: 'The same words can ask or state' },
        { a: 'If you agree,', b: 'we can begin.', ipa: '/ɪf juː əˈɡriː/ ↗ · /wiː kən bɪˈɡɪn/ ↘', note: 'The voice often rises before a completed idea' },
      ],
    },
    {
      id: 'listen-advanced-discourse',
      title: 'Listening for Argument and Attitude',
      description: `Advanced listeners identify the speaker’s claim, evidence, contrast, and attitude. Pay attention to stress on words such as however, only, and must.`,
      pairs: [
        { a: 'The evidence is strong.', b: 'The evidence is limited.', ipa: '/ˈɛvɪdəns ɪz strɒŋ/ · /ˈɛvɪdəns ɪz ˈlɪmɪtɪd/', note: 'Stress changes the evaluation' },
        { a: 'We should continue.', b: 'We could continue.', ipa: '/ʃʊd/ · /kʊd/', note: 'Modal choice changes certainty' },
        { a: 'It was a success.', b: 'It was not a success.', ipa: '/səkˈsɛs/ · /nɒt ə səkˈsɛs/', note: 'Listen for the contrast marker' },
      ],
    },
    {
      id: 'listen-sentence-stress',
      title: 'Sentence Stress and Focus',
      description: `Content words usually carry the main stress in a sentence. Move the focus to a different word and the meaning or contrast can change.`,
      descriptionMg: `Ny teny mitondra hevitra no matetika hamafisina ao amin’ny fehezanteny. Mety hiova ny hevitra rehefa miova ny teny hamafisina.`,
      pairs: [
        { a: 'I wanted the red book.', b: 'I wanted the blue book.', ipa: '/aɪ ˈwɒntɪd ðə red bʊk/ · /aɪ ˈwɒntɪd ðə bluː bʊk/', note: 'Contrast the colour' },
        { a: 'She borrowed my pen.', b: 'She borrowed my book.', ipa: '/ʃiː ˈbɒrəʊd maɪ pen/ · /ʃiː ˈbɒrəʊd maɪ bʊk/', note: 'Contrast the object' },
        { a: 'We can meet on Monday.', b: 'We can meet on Tuesday.', ipa: '/wiː kən ˈmiːt ɒn ˈmʌndeɪ/ · /wiː kən ˈmiːt ɒn ˈtjuːzdeɪ/', note: 'Stress the changed day' },
      ],
    },
    {
      id: 'listen-phonological-endings',
      title: 'Endings: -s and -ed',
      description: `The endings -s and -ed have different sounds. Listen to the final sound and notice whether the ending adds a new syllable.`,
      descriptionMg: `Misy feo samihafa ny fiafaran’ny teny -s sy -ed. Henoy ny feo farany ary jereo raha manampy vaninteny vaovao ilay fiafarana.`,
      pairs: [
        { a: 'walks', b: 'plays', ipa: '/wɔːks/ · /pleɪz/', note: '-s can be /s/ or /z/' },
        { a: 'washed', b: 'needed', ipa: '/wɒʃt/ · /ˈniːdɪd/', note: '-ed can be /t/ or /ɪd/' },
        { a: 'jumped', b: 'wanted', ipa: '/dʒʌmpt/ · /ˈwɒntɪd/', note: 'Count the syllables' },
      ],
    },
    {
      id: 'listen-formal-intonation',
      title: 'Formal Intonation and Politeness',
      description: `In formal English, intonation helps a request sound respectful rather than demanding. Practise the pause, pitch, and softening phrase together.`,
      pairs: [
        { a: 'Could you help me?', b: 'You must help me.', ipa: '/kʊd juː ˈhelp miː/ ↗ · /juː mʌst ˈhelp miː/ ↘', note: 'A modal can soften a request' },
        { a: 'I was wondering if…', b: 'I want to know…', ipa: '/aɪ wəz ˈwʌndərɪŋ ɪf/ · /aɪ wɒnt tə nəʊ/', note: 'Softened versus direct opening' },
        { a: 'Would you mind waiting?', b: 'Wait here.', ipa: '/wʊd juː maɪnd ˈweɪtɪŋ/ ↗ · /weɪt hɪə/ ↘', note: 'Request versus command' },
      ],
    },
    {
      id: 'listen-lecture-notes',
      title: 'Listening to a Lecture or Presentation',
      description: `Listen for the structure of an extended talk: the topic, signposts, examples, contrast, and conclusion. Do not try to write every word.`,
      pairs: [
        { a: 'To begin with,', b: 'In conclusion,', ipa: '/tə bɪˈɡɪn wɪð/ · /ɪn kənˈkluːʒən/', note: 'Opening and closing signposts' },
        { a: 'For example,', b: 'As a result,', ipa: '/fər ɪɡˈzɑːmpəl/ · /əz ə rɪˈzʌlt/', note: 'Example and consequence' },
        { a: 'On the other hand,', b: 'Nevertheless,', ipa: '/ɒn ði ˈʌðə hænd/ · /ˌnevəðəˈles/', note: 'Contrast and concession' },
      ],
    },

    {
      id: 'listen-tips',
      title: 'Tips for Better Pronunciation',
      description: `<strong>1. Listen and repeat</strong> — Listen to English songs, watch videos, and repeat what you hear.
      <br><br><strong>2. Record yourself</strong> — Use your phone to record your voice. Compare it with a native speaker.
      <br><br><strong>3. Use a mirror</strong> — Watch your mouth in a mirror when you say /θ/ and /ð/. Make sure your tongue is visible.
      <br><br><strong>4. Practise every day</strong> — 5 minutes a day is better than 1 hour once a week.
      <br><br><strong>5. Learn the IPA</strong> — The International Phonetic Alphabet symbols help you know the exact sound from a dictionary.
      <br><br><strong>6. Speak slowly</strong> — Do not rush. Speaking slowly and clearly is better than speaking fast with mistakes.
      `,
      descriptionMg: `Tsy maninona raha tsy tonga lafatra ny fanononao! Ny zava-dehibe dia ny mianatra tsikelikely.`,
      pairs: [],
    },
  ],
};
