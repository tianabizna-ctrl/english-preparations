/**
 * Easy English — Real-life dialogues for Malagasy learners
 *
 * Each dialogue contains a conversation between two speakers (A and B),
 * a Malagasy translation for every line, and language notes.
 */

const CONVERSATIONS = [

  // ─── 1. GREETING SOMEONE FOR THE FIRST TIME ────────────────────────
  {
    id: 'conv-01',
    title: 'Greeting Someone for the First Time',
    level: 'Beginner',
    topic: 'Greetings and Introductions',
    lines: [
      { speaker: 'A', en: 'Hello! My name is Rivo. What is your name?', mg: 'Salama! Rivo no anarako. Iza ny anaranao?' },
      { speaker: 'B', en: 'Hi, Rivo. I am Faly. Nice to meet you!', mg: 'Manao ahoana, Rivo. Faly aho. Faly mahafantatra anao!' },
      { speaker: 'A', en: 'Nice to meet you too, Faly. How are you?', mg: 'Faly mahafantatra anao koa aho, Faly. Manao ahoana ianao?' },
      { speaker: 'B', en: 'I am fine, thank you. And you?', mg: 'Tsara aho, misaotra. Ary ianao?' },
      { speaker: 'A', en: 'I am very well, thanks. Goodbye, Faly!', mg: 'Tsara be aho, misaotra. Veloma, Faly!' },
      { speaker: 'B', en: 'Goodbye, Rivo! See you later.', mg: 'Veloma, Rivo! Mandrapihaona.' },
    ],
    notes: [
      '"Nice to meet you" is used when you meet someone for the first time.',
      '"How are you?" is a common greeting — you can answer "I am fine" or "I am well".',
      '"See you later" means you expect to meet again soon.',
    ],
  },

  // ─── 2. BUYING FRUIT AT THE MARKET ──────────────────────────────────
  {
    id: 'conv-02',
    title: 'Buying Fruit at the Market',
    level: 'Beginner',
    topic: 'Shopping and Food',
    lines: [
      { speaker: 'A', en: 'Good morning! How much are the bananas?', mg: 'Miarahaba anao! Ohatrinona ny akondro?' },
      { speaker: 'B', en: 'Good morning! They are 2,000 ariary a kilo. How many kilos do you want?', mg: 'Miarahaba anao! 2 000 ariary ny kilao. Kilao firy no tianao?' },
      { speaker: 'A', en: 'Please give me two kilos. Are the oranges fresh?', mg: 'Omeo kilao roa aho azafady. Vaovao ve ny voasary?' },
      { speaker: 'B', en: 'Yes, they are very fresh. I picked them this morning.', mg: 'Eny, vaovao be izy ireo. Nojoko izy ireo omaly maraina.' },
      { speaker: 'A', en: 'Great! I will take six oranges too. How much is that altogether?', mg: 'Tena tsara! Haka voasary enina koa aho. Firy ny tontaliny?' },
      { speaker: 'B', en: 'Two kilos of bananas and six oranges — that is 8,000 ariary, please.', mg: 'Kilao roa ny akondro sy voasary enina — 8 000 ariary izany, azafady.' },
      { speaker: 'A', en: 'Here you are. Thank you!', mg: 'Inty. Misaotra anao!' },
      { speaker: 'B', en: 'Thank you. Have a good day!', mg: 'Misaotra anao. Mirary tontolo andro tsara!' },
    ],
    notes: [
      '"How much is...?" asks about the price of one item. "How much are...?" for plural.',
      'When shopping, say "I will take..." to tell the seller what you want to buy.',
      '"Altogether" means the total price of everything.',
    ],
  },

  // ─── 3. ASKING FOR DIRECTIONS IN TOWN ──────────────────────────────
  {
    id: 'conv-03',
    title: 'Asking for Directions in Town',
    level: 'Elementary',
    topic: 'Places and Directions',
    lines: [
      { speaker: 'A', en: 'Excuse me, can you help me?', mg: 'Azafady, afaka manampy ahy ve ianao?' },
      { speaker: 'B', en: 'Of course. What do you need?', mg: 'Mazava ho azy. Inona no ilainao?' },
      { speaker: 'A', en: 'How do I get to the post office?', mg: 'Ahoana no fomba handehanana any amin\'ny paositra?' },
      { speaker: 'B', en: 'It is near here. Go straight ahead for two blocks, then turn left.', mg: 'Eto akaiky izy io. Mandehana mahitsy mandritra ny lalana roa, dia mihaviavia.' },
      { speaker: 'A', en: 'Turn left after two blocks. Is it on the right or left?', mg: 'Mihaviavia aorian\'ny lalana roa. Eo ankavanana sa ankavia izy io?' },
      { speaker: 'B', en: 'It is on the right, next to the big blue shop.', mg: 'Eo ankavanana izy io, eo akaikin\'ny fivarotana manga lehibe.' },
      { speaker: 'A', en: 'Thank you very much! Is it far from here?', mg: 'Misaotra betsaka anao! Lavitra ve izy io?' },
      { speaker: 'B', en: 'No, it is only five minutes on foot. You are welcome!', mg: 'Tsia, dimy minitra monja amin\'ny tongotra. Tsy misy fisaorana!' },
    ],
    notes: [
      '"Excuse me" is used to politely get someone\'s attention before asking a question.',
      '"Go straight ahead" means continue in the same direction without turning.',
      '"On foot" means walking. You can also say "by foot".',
    ],
  },

  // ─── 4. ORDERING FOOD AT A RESTAURANT ──────────────────────────────
  {
    id: 'conv-04',
    title: 'Ordering Food at a Restaurant',
    level: 'Elementary',
    topic: 'Food and Dining',
    lines: [
      { speaker: 'A', en: 'Good evening! A table for two, please.', mg: 'Miarahaba anao! Latabatra ho an\'ny roa, azafady.' },
      { speaker: 'B', en: 'Of course. Please sit here. Here is the menu.', mg: 'Mazava ho azy. Mipetraha eto azafady. Inty ny menio.' },
      { speaker: 'A', en: 'Thank you. What do you recommend?', mg: 'Misaotra. Inona no soso-kevitrao?' },
      { speaker: 'B', en: 'The grilled fish with rice is very good today.', mg: 'Tsara be ny trondro nendasina miaraka amin\'ny vary androany.' },
      { speaker: 'A', en: 'That sounds nice. I will have the grilled fish and rice, please.', mg: 'Tsara izany. Haka ny trondro nendasina sy vary aho, azafady.' },
      { speaker: 'B', en: 'And for you, sir?', mg: 'Ary ianao, tompoko?' },
      { speaker: 'A', en: 'I will have the chicken with vegetables, please.', mg: 'Haka ny akoho miaraka amin\'ny legioma aho, azafady.' },
      { speaker: 'B', en: 'Would you like something to drink?', mg: 'Mila misotro zavatra ve ianareo?' },
      { speaker: 'A', en: 'A bottle of water and a fresh juice, please.', mg: 'Tavoahangy rano iray sy ranom-boankazo vaovao iray, azafady.' },
      { speaker: 'B', en: 'I will bring your order soon.', mg: 'Ho entiko haingana ny baiko.' },
    ],
    notes: [
      '"What do you recommend?" asks for the waiter\'s suggestion of the best dish.',
      '"I will have..." is a polite way to say what you want to order.',
      '"Would you like...?" is a polite offer. You can answer "Yes, please" or "No, thank you".',
    ],
  },

  // ─── 5. TALKING ABOUT FAMILY WITH A FRIEND ──────────────────────────
  {
    id: 'conv-05',
    title: 'Talking About Family with a Friend',
    level: 'Elementary',
    topic: 'Family and Relationships',
    lines: [
      { speaker: 'A', en: 'Do you have any brothers or sisters?', mg: 'Manana anadahy na anabavy ve ianao?' },
      { speaker: 'B', en: 'Yes, I have two brothers and one sister. I am the oldest.', mg: 'Eny, manana anadahy roa sy anabavy iray aho. Zoky aho.' },
      { speaker: 'A', en: 'Do you help them with homework?', mg: 'Manampy azy ireo amin\'ny devoira ve ianao?' },
      { speaker: 'B', en: 'Yes, I help my sister with English. She is good at reading.', mg: 'Eny, manampy ny anabaviko amin\'ny teny anglisy aho. Mahay mamaky tena izy.' },
      { speaker: 'A', en: 'My family is small — I have only one sister.', mg: 'Kely ny fianakaviako — anabavy iray monja no ananako.' },
      { speaker: 'B', en: 'Do you live with your parents?', mg: 'Mipetraka miaraka amin\'ny ray aman-dreninao ve ianao?' },
      { speaker: 'A', en: 'Yes, I live with my mother and father. My grandmother lives nearby.', mg: 'Eny, miaraka amin\'ny reniko sy dadako aho. Ny renibeko dia mipetraka akaiky.' },
    ],
    notes: [
      '"The oldest" means the first-born child. "The youngest" is the last-born.',
      '"Do you live with...?" is a common question about family living arrangements.',
      '"She is good at reading" — use "good at" + verb-ing for skills and abilities.',
    ],
  },

  // ─── 6. GOING TO THE DOCTOR ─────────────────────────────────────────
  {
    id: 'conv-06',
    title: 'Going to the Doctor',
    level: 'Pre-Intermediate',
    topic: 'Health and Illness',
    lines: [
      { speaker: 'A', en: 'Good morning. Please take a seat. What seems to be the problem?', mg: 'Miarahaba anao. Mipetraha azafady. Inona no olana?' },
      { speaker: 'B', en: 'I have a bad headache and my throat hurts.', mg: 'Mafy ny lohako ary marary ny tendako.' },
      { speaker: 'A', en: 'Do you have a fever?', mg: 'Manana tazo ve ianao?' },
      { speaker: 'B', en: 'Yes, I felt very hot last night.', mg: 'Eny, nafana be aho halina.' },
      { speaker: 'A', en: 'Let me check your temperature. Open your mouth, please.', mg: 'Avelao aho hanamarina ny hafananao. Sokafy ny vavanao, azafady.' },
      { speaker: 'B', en: 'Is it serious, doctor?', mg: 'Mavesatra ve izany, dokotera?' },
      { speaker: 'A', en: 'Do not worry. You have a cold and a mild fever. I will prescribe some medicine.', mg: 'Aza manahy. Manana hatsiaka sy tazo kely ianao. Hanoratra fanafody aho.' },
      { speaker: 'B', en: 'How many times a day should I take it?', mg: 'Impiry isan\'andro no tokony hisotroako azy?' },
      { speaker: 'A', en: 'Three times a day after meals. Drink plenty of water and rest for two days.', mg: 'Intelo isan\'andro aorian\'ny sakafo. Misotroa rano betsaka ary mitsaharamandry mandritra ny roa andro.' },
      { speaker: 'B', en: 'Thank you, doctor. I will follow your advice.', mg: 'Misaotra anao, dokotera. Hanaraka ny toro-hevitrao aho.' },
    ],
    notes: [
      '"What seems to be the problem?" is a polite way doctors ask about your symptoms.',
      '"I have a headache / a cold / a fever" — use "have" for illnesses and pains.',
      '"Take medicine" means to swallow or use the prescribed drug.',
      '"Plenty of water" means a lot of water.',
    ],
  },

  // ─── 7. MAKING PLANS FOR THE WEEKEND ────────────────────────────────
  {
    id: 'conv-07',
    title: 'Making Plans for the Weekend',
    level: 'Pre-Intermediate',
    topic: 'Free Time and Plans',
    lines: [
      { speaker: 'A', en: 'What are you doing this weekend?', mg: 'Inona no ataonao amin\'ny faran\'ny herinandro ity?' },
      { speaker: 'B', en: 'I am not sure yet. I might visit my grandparents in the village.', mg: 'Mbola tsy azoko antoka. Mety hitsidika ny renibeko sy raibeko any an-tanàna aho.' },
      { speaker: 'A', en: 'Would you like to go to the beach on Saturday instead?', mg: 'Te handeha any amoron-dranomasina amin\'ny Asabotsy ve ianao?' },
      { speaker: 'B', en: 'I would love to, but I promised my grandmother I would help her in the garden.', mg: 'Tiako tokoa, saingy nampanantena ny renibeko aho fa hanampy azy any an-jaridaina.' },
      { speaker: 'A', en: 'How about Sunday morning? We could swim and have a picnic.', mg: 'Ahoana ny amin\'ny Alahady maraina? Afaka milomano sy manao piknik isika.' },
      { speaker: 'B', en: 'Sunday sounds perfect. What time should we meet?', mg: 'Tsara ny Alahady. Amin\'ny firy isika no hihaona?' },
      { speaker: 'A', en: 'Let us meet at nine o\'clock at the bus station.', mg: 'Andao hihaona amin\'ny sivy ora eo amin\'ny fiantsonan\'ny bisikara.' },
      { speaker: 'B', en: 'Great! I will bring some food and drinks.', mg: 'Tena tsara! Hitondra sakafo sy zava-pisotro aho.' },
    ],
    notes: [
      '"What are you doing this weekend?" — use present continuous for planned arrangements.',
      '"I might..." expresses a possibility — you are not 100% sure yet.',
      '"Would you like to...?" is a polite invitation. Answer "I would love to" to accept.',
      '"How about...?" is another way to suggest an activity or time.',
    ],
  },

  // ─── 8. A PHONE CALL INVITATION ──────────────────────────────────────
  {
    id: 'conv-08',
    title: 'A Phone Call Invitation',
    level: 'Pre-Intermediate',
    topic: 'Telephone and Invitations',
    lines: [
      { speaker: 'A', en: 'Hello? Is this Miora?', mg: 'Salama? I Miora ve ity?' },
      { speaker: 'B', en: 'Yes, speaking. Who is calling, please?', mg: 'Eny, izy io. Iza no miantso, azafady?' },
      { speaker: 'A', en: 'Hi, Miora! It is Lala. I am calling to invite you to my birthday party.', mg: 'Manao ahoana, Miora! Lala ity. Miantso aho hanasa anao ho any amin\'ny fetin\'ny tsingerintaona nahaterahako.' },
      { speaker: 'B', en: 'When is the party?', mg: 'Rahoviana ny fety?' },
      { speaker: 'A', en: 'It is next Saturday, starting at three o\'clock in the afternoon.', mg: 'Amin\'ny Asabotsy ho avy, manomboka amin\'ny telo ora tolakandro.' },
      { speaker: 'B', en: 'Where will it be?', mg: 'Aiza no hanaovana azy?' },
      { speaker: 'A', en: 'At my house — the blue house next to the school.', mg: 'Any an-tranoko — ny trano manga eo akaikin\'ny sekoly.' },
      { speaker: 'B', en: 'Shall I bring anything?', mg: 'Mila mitondra zavatra ve aho?' },
      { speaker: 'A', en: 'Just bring yourself! But you can bring a friend if you want.', mg: 'Tongava fotsiny! Fa afaka mitondra namana koa ianao raha tianao.' },
      { speaker: 'B', en: 'Thank you for inviting me! See you on Saturday!', mg: 'Misaotra anao nanasa ahy! Mandrapihaona amin\'ny Asabotsy!' },
    ],
    notes: [
      '"Is this [name]?" is used on the phone to confirm you are speaking to the right person.',
      '"Speaking" means "Yes, I am the person you asked for."',
      '"Shall I bring anything?" is a polite offer to contribute something.',
      '"Just bring yourself!" means your presence is enough — no gift needed.',
    ],
  },

  // ─── 9. IN THE CLASSROOM — TEACHER AND PUPILS ───────────────────────
  {
    id: 'conv-09',
    title: 'In the Classroom — Teacher and Pupils',
    level: 'Beginner',
    topic: 'School and Classroom',
    lines: [
      { speaker: 'A', en: 'Good morning, class! Please sit down.', mg: 'Miarahaba anareo, ry kilasy! Mipetraha azafady.' },
      { speaker: 'B', en: 'Good morning, teacher!', mg: 'Miarahaba anao, tompoko!' },
      { speaker: 'A', en: 'Be quiet, please. Open your book and look at the board.', mg: 'Manginàna azafady. Sokafy ny bokinao ary jereo ny tabilao.' },
      { speaker: 'B', en: 'Excuse me, teacher. May I ask a question?', mg: 'Azafady, tompoko. Afaka manontany ve aho?' },
      { speaker: 'A', en: 'Yes, of course — but raise your hand before you speak.', mg: 'Eny, mazava ho azy — fa asandrato ny tananao vao miteny.' },
      { speaker: 'B', en: 'Thank you. I do not understand this word.', mg: 'Misaotra. Tsy azoko ity teny ity.' },
      { speaker: 'A', en: 'Never mind. Listen carefully and repeat after me.', mg: 'Tsy maninona. Mihainoa tsara ary avereno aorianao aho.' },
      { speaker: 'B', en: 'Very good! Did you finish your work?', mg: 'Tsara be! Vita ve ny asanao?' },
      { speaker: 'A', en: 'Yes, I have finished. Here is my exercise book.', mg: 'Eny, vita ny asako. Inty ny kahie misy ny asako.' },
      { speaker: 'B', en: 'Well done! Do your work quietly, then line up at the door.', mg: 'Tena tsara! Ataovy mangina ny asanao, dia milahatra eo am-baravarana.' },
    ],
    notes: [
      '"Raise your hand before you speak" is a polite classroom rule in English classes.',
      '"Be quiet" and "Listen carefully" are common classroom commands.',
      '"Did you finish?" asks if your work is complete. Answer "Yes, I have finished."',
      'Pupils often say "Excuse me" before asking the teacher something.',
    ],
  },

  // ─── 10. BREAK TIME CHAT BETWEEN PUPILS ─────────────────────────────
  {
    id: 'conv-10',
    title: 'Break Time Chat Between Pupils',
    level: 'Beginner',
    topic: 'Friends and School Life',
    lines: [
      { speaker: 'A', en: 'Hi, Rasoa! Do you want to play with us?', mg: 'Salama, Rasoa! Te hilalao miaraka aminay ve ianao?' },
      { speaker: 'B', en: 'Hi, Faly! Yes, I do. What are we playing?', mg: 'Salama, Faly! Eny, te hilalao aho. Inona no lalaovintsika?' },
      { speaker: 'A', en: 'Let us play with the ball. Ndriana has a new ball.', mg: 'Andao hilalao baolina. Manana baolina vaovao i Ndriana.' },
      { speaker: 'B', en: 'Great! But first, did you finish your homework?', mg: 'Tena tsara! Fa aloha, vita ve ny devoaranao?' },
      { speaker: 'A', en: 'Yes, I did it last night. It was easy.', mg: 'Eny, vitako omaly alina. Mora izy io.' },
      { speaker: 'B', en: 'Me too. Let us go to the playground before the bell rings.', mg: 'Izaho koa. Andao any amin\'ny kianja filalaovana alohan\'ny feon\'ny lakolosy.' },
      { speaker: 'A', en: 'Wait for me! I am tying my shoe.', mg: 'Andraso aho! Mamihina ny kiraroko aho.' },
      { speaker: 'B', en: 'Come on, slow coach! The others are waiting.', mg: 'Andao fa, miadana ianao! Miandry isika ireo hafa.' },
      { speaker: 'A', en: 'All right, I am ready. Let us go!', mg: 'Tsara, vonona aho. Andao!' },
    ],
    notes: [
      '"Do you want to play with us?" is a friendly way to invite a friend.',
      '"Me too" means "I did the same thing".',
      '"Come on, slow coach!" is a fun, friendly way to tell someone to hurry up.',
      '"Let us go!" (or "Let\'s go!") is used to start an activity together.',
    ],
  },

  // ─── 11. A PUPIL ASKS THE TEACHER FOR HELP ──────────────────────────
  {
    id: 'conv-11',
    title: 'A Pupil Asks the Teacher for Help',
    level: 'Beginner',
    topic: 'School and Classroom',
    lines: [
      { speaker: 'A', en: 'Excuse me, teacher. May I ask a question?', mg: 'Azafady, tompoko. Afaka manontany ve aho?' },
      { speaker: 'B', en: 'Yes, of course. But remember to raise your hand first.', mg: 'Eny, mazava ho azy. Fa tsarovy ny manandratra ny tananao aloha.' },
      { speaker: 'A', en: 'Sorry, teacher. I do not understand this word. What does "village" mean?', mg: 'Miala tsiny, tompoko. Tsy azoko ity teny ity. Inona ny dikan\'ny "village"?' },
      { speaker: 'B', en: 'A village is a small group of houses in the countryside. You live in a village, do you not?', mg: 'Ny "village" dia andiana trano kely any ambanivohitra. Mipetraka ao an-tanàna kely ve ianao?' },
      { speaker: 'A', en: 'Yes, teacher. I live in a small village near the river.', mg: 'Eny, tompoko. Mipetraka ao amin\'ny tanàna kely akaikin\'ny renirano aho.' },
      { speaker: 'B', en: 'Very good. Now copy the word and its meaning in your exercise book.', mg: 'Tena tsara. Soraty ao amin\'ny kahieo ny teny sy ny dikany.' },
      { speaker: 'A', en: 'Should I write the English and the Malagasy?', mg: 'Soraty ve ny anglisy sy ny malagasy?' },
      { speaker: 'B', en: 'Yes, both. Then read the sentence aloud for the class.', mg: 'Eny, samy soraty. Avy eo vakio mafy ny fehezanteny ho an\'ny kilasy.' },
      { speaker: 'A', en: 'Thank you, teacher. I understand now.', mg: 'Misaotra anao, tompoko. Azoko izao.' },
      { speaker: 'B', en: 'Well done! Asking questions helps you learn.', mg: 'Tena tsara! Ny fanontaniana no manampy anao hianatra.' },
    ],
    notes: [
      '"May I ask a question?" is a polite way to stop the teacher and ask something.',
      '"What does ... mean?" asks for the meaning of a word or phrase.',
      '"Should I ...?" asks for advice about what to do.',
      'Always say "Excuse me" and raise your hand before speaking to the teacher.',
    ],
  },

  // ─── 12. A DAY WITH MY FAMILY (FAMILY LIFE) ─────────────────────────
  {
    id: 'conv-12',
    title: 'A Day with My Family',
    level: 'Elementary',
    topic: 'Family and Relationships',
    lines: [
      { speaker: 'A', en: 'Good evening, my child. How was school today?', mg: 'Miarahaba anao, anaka. Nanao ahoana ny sekoly androany?' },
      { speaker: 'B', en: 'Good evening, Mother. School was fine. We learned about the family.', mg: 'Miarahaba anao, Neny. Tsara ny sekoly. Nianatra momba ny fianakaviana izahay.' },
      { speaker: 'A', en: 'That is nice. Tonight we eat together. Please help your sister set the table.', mg: 'Tsara izany. Anio hariva isika miara-misakafo. Ampio ny anabavinao hametraka ny latabatra.' },
      { speaker: 'B', en: 'Yes, Mother. Where is Father?', mg: 'Eny, Neny. Aiza i Dada?' },
      { speaker: 'A', en: 'He is in the garden, feeding the chickens. Call him for dinner.', mg: 'Any an-jaridaina izy, mamahana ny akoho. Antsoy izy hisakafo.' },
      { speaker: 'B', en: 'Father! Dinner is ready! He is coming.', mg: 'Dada! Vonona ny sakafo! Tonga izy.' },
      { speaker: 'A', en: 'Sit with us. After dinner, we will wash the plates, and then you study.', mg: 'Mipetraha miaraka aminay. Aorian\'ny sakafo, hosasantsika ny lovia, dia hianatra ianao.' },
      { speaker: 'B', en: 'I will do my homework first, then I will help you.', mg: 'Hanao ny devoarako aloha aho, dia hanampy anao.' },
      { speaker: 'A', en: 'That is my good child. A family is happy when everyone helps.', mg: 'Izany no zanako tsara. Sambatra ny fianakaviana raha samy manampy.' },
      { speaker: 'B', en: 'Yes, Mother. I love our family.', mg: 'Eny, Neny. Tiako ny fianakavianay.' },
    ],
    notes: [
      '"How was school today?" is a common question parents ask their children.',
      '"Set the table" means to put the plates and spoons on the table.',
      '"A family is happy when everyone helps" — family life works well when each person helps.',
      'English families often say "my child", "Mother" and "Father" in everyday talk.',
    ],
  },

  // ─── 13. LIFE IN A VILLAGE ──────────────────────────────────────────
  {
    id: 'conv-13',
    title: 'Life in a Village',
    level: 'Elementary',
    topic: 'Village Life',
    lines: [
      { speaker: 'A', en: 'Where do you live, Randri?', mg: 'Aiza ianao no mipetraka, Randri?' },
      { speaker: 'B', en: 'I live in a small village in the countryside. It is quiet and green.', mg: 'Mipetraka ao amin\'ny tanàna kely any ambanivohitra aho. Mangina sy maitso izy io.' },
      { speaker: 'A', en: 'Is it far from the town?', mg: 'Lavitra ny tanàna lehibe ve izy?' },
      { speaker: 'B', en: 'Yes, about two hours by bus. There is a river and many rice fields.', mg: 'Eny, tokony roa ora amin\'ny bisikara. Misy renirano sy tanimbary maro.' },
      { speaker: 'A', en: 'What do people do in your village?', mg: 'Inona no ataon\'ny olona ao amin\'ny tanànareo?' },
      { speaker: 'B', en: 'We grow rice, look after the cows, and fetch water from the well. In the evening, the villagers tell stories.', mg: 'Mamboly vary izahay, miandry omby, ary mantsaka rano ao amin\'ny fantsakana. Hariva, mifanaraka angano ny mponina.' },
      { speaker: 'A', en: 'That sounds lovely. Is it a big village?', mg: 'Mahafinaritra izany. Tanàna lehibe ve izy io?' },
      { speaker: 'B', en: 'Not really. Only about three hundred villagers. Everyone knows everyone.', mg: 'Tsy dia lehibe. Tokony telon-jato eo ho eo ny mponina. Samy mifankahalala ny rehetra.' },
      { speaker: 'A', en: 'Do you have a market?', mg: 'Manana tsena ve ianareo?' },
      { speaker: 'B', en: 'Yes, every Saturday. The farmers bring their crops to sell. You are welcome to visit!', mg: 'Eny, isaky ny Asabotsy. Mitondra ny vokatra hamidy ny tantsaha. Tongasoa hitsidika!' },
    ],
    notes: [
      '"Where do you live?" is a useful question to start a conversation.',
      '"About two hours by bus" tells how long a journey takes.',
      '"Fetch water" means to go and bring water back.',
      '"Everyone knows everyone" describes life in a small village.',
    ],
  },

  // ─── 14. WORKING ON THE FARM ────────────────────────────────────────
  {
    id: 'conv-14',
    title: 'Working on the Farm',
    level: 'Elementary',
    topic: 'Village Life',
    lines: [
      { speaker: 'A', en: 'Good morning, Father. Where are you going so early?', mg: 'Miarahaba anao, Dada. Aiza ianao no mandeha maraina be?' },
      { speaker: 'B', en: 'Good morning! I am going to the rice field. The harvest begins today.', mg: 'Miarahaba! Mandeha any amin\'ny tanimbary aho. Manomboka anio ny fijinjana.' },
      { speaker: 'A', en: 'Can I come and help you?', mg: 'Afaka manaraka anao sy manampy ve aho?' },
      { speaker: 'B', en: 'Of course. Take the hoe and the basket. Do not forget your hat.', mg: 'Mazava ho azy. Ento ny angady sy ny harona. Aza adino ny satrokao.' },
      { speaker: 'A', en: 'What work will we do?', mg: 'Inona no asa hataontsika?' },
      { speaker: 'B', en: 'We will cut the rice and carry it to the granary. A farmer works hard.', mg: 'Hijinja vary isika ary hitondra azy any amin\'ny trahambo. Miasa mafy ny tantsaha.' },
      { speaker: 'A', en: 'Is it difficult?', mg: 'Sarotra ve izany?' },
      { speaker: 'B', en: 'It is hard, but we do it together. At midday, we rest under the tree.', mg: 'Sarotra, saingy ataontsika miaraka. Amin\'ny mitataovovonana, miala sasatra eo ambanin\'ny hazo isika.' },
      { speaker: 'A', en: 'I like working on the farm with you, Father.', mg: 'Tiako ny miasa eny an-tsaha miaraka aminao, Dada.' },
      { speaker: 'B', en: 'And I am proud of you. A good farmer feeds the whole village.', mg: 'Ary reharehako ianao. Ny tantsaha mahay no mamelona ny tanàna iray manontolo.' },
    ],
    notes: [
      '"Where are you going so early?" asks about an early start to the day.',
      '"Take the hoe and the basket" tells someone what to carry.',
      '"A farmer works hard" — "works hard" means to work with a lot of effort.',
      '"Feeds the whole village" means the farmer grows food for everybody.',
    ],
  },

  // ─── 15. THE VILLAGERS HELP EACH OTHER ──────────────────────────────
  {
    id: 'conv-15',
    title: 'The Villagers Help Each Other',
    level: 'Pre-Intermediate',
    topic: 'Village Life',
    lines: [
      { speaker: 'A', en: 'Neighbour, I heard the storm damaged your roof.', mg: 'Ry namana, reko fa simba ny tafon-tranonao noho ny rivodoza.' },
      { speaker: 'B', en: 'Yes, the wind took off many tiles. I cannot fix it alone.', mg: 'Eny, nanaisotra taila maro ny rivotra. Tsy afaka manamboatra azy irery aho.' },
      { speaker: 'A', en: 'Do not worry. In our village, we help each other. I will call the other villagers.', mg: 'Aza manahy. Eto amin\'ny tanànantsika, mifanampy isika. Hantsoiko ny mponina hafa.' },
      { speaker: 'B', en: 'Thank you so much. That is the spirit of our village.', mg: 'Misaotra betsaka anao. Izany no fanahin\'ny tanànantsika.' },
      { speaker: 'A', en: 'Tomorrow morning, the men will bring wood and nails. The women will cook rice for us.', mg: 'Rahampitso maraina, hitondra hazo sy loza ny lehilahy. Hanohana vary ho antsika ny vehivavy.' },
      { speaker: 'B', en: 'I am grateful. When your field needs help, we will come to you.', mg: 'Manankasitraka aho. Raha mila fanampiana ny sahanao, ho avy izahay.' },
      { speaker: 'A', en: 'That is how we live here. One good turn deserves another.', mg: 'Izany no fomba iainantsika eto. Ny soa atao dia miverina aminao.' },
      { speaker: 'B', en: 'Truly. Many hands make light work.', mg: 'Marina izany. Ny mpiara-miasa maro dia manamora ny asa.' },
    ],
    notes: [
      '"I heard (that) ..." is a common way to share news in a village.',
      '"We help each other" means neighbours support one another.',
      '"One good turn deserves another" means if someone helps you, you should help them back.',
      '"Many hands make light work" means a job is easier when many people help.',
    ],
  },

  // ─── 16. SOLVING A SCHOOL PROJECT ────────────────────────────────────
  {
    id: 'conv-16',
    title: 'Solving a School Project',
    level: 'Intermediate',
    topic: 'Ideas and collaboration',
    lines: [
      { speaker: 'A', en: 'We need to present our project on Friday. Have you finished the introduction?' },
      { speaker: 'B', en: 'Almost. I am still checking the sources because I want the information to be accurate.' },
      { speaker: 'A', en: 'That makes sense. I can prepare the pictures while you finish the notes.' },
      { speaker: 'B', en: 'Great. Let us meet after class so that we can practise the presentation together.' },
      { speaker: 'A', en: 'Good idea. We should also decide who will answer questions from the class.' },
    ],
    notes: ['Use “because” to give a reason.', '“That makes sense” shows that you understand and agree with an idea.'],
  },

  // ─── 17. DISCUSSING A COMMUNITY PROBLEM ─────────────────────────────
  {
    id: 'conv-17',
    title: 'Discussing a Community Problem',
    level: 'Advanced',
    topic: 'Opinions and solutions',
    lines: [
      { speaker: 'A', en: 'The river is becoming polluted, and the community needs a practical solution.' },
      { speaker: 'B', en: 'I agree. Before we make a plan, we should find out where most of the waste is coming from.' },
      { speaker: 'A', en: 'If we involve the schools, young people could help collect information and educate their families.' },
      { speaker: 'B', en: 'That would be useful. We could also ask the local council to provide collection points.' },
      { speaker: 'A', en: 'Exactly. A solution will work only if everyone understands their responsibility.' },
    ],
    notes: ['“If we involve...” introduces a possible condition.', 'Use “could” to suggest a possible solution politely.'],
  },
  {
    id: 'conv-18', title: 'Discussing a Reading Assignment', level: 'Intermediate', topic: 'Study and interpretation',
    lines: [
      { speaker: 'A', en: 'What did you think of the article we read yesterday?' },
      { speaker: 'B', en: 'I found the main idea convincing, although one example was not very clear.' },
      { speaker: 'A', en: 'I agree. The writer provides useful evidence, but the conclusion seems too strong.' },
      { speaker: 'B', en: 'Perhaps we should compare it with another source before we decide.' },
    ],
    notes: ['Use although to introduce a contrast.', 'Compare sources before accepting a strong conclusion.'],
  },
  {
    id: 'conv-19', title: 'Planning a Community Project', level: 'Intermediate', topic: 'Planning and cooperation',
    lines: [
      { speaker: 'A', en: 'Our objective is to improve the area near the school.' },
      { speaker: 'B', en: 'We could begin by asking residents which problem matters most to them.' },
      { speaker: 'A', en: 'That is sensible. After we collect the responses, we can prepare a practical plan.' },
      { speaker: 'B', en: 'I will contact the council, and you can organise the volunteers.' },
    ],
    notes: ['Use could to make a suggestion politely.', 'An objective explains what a project wants to achieve.'],
  },
  {
    id: 'conv-20', title: 'A Formal Meeting', level: 'Advanced', topic: 'Professional communication',
    lines: [
      { speaker: 'A', en: 'Before we approve the proposal, we need to evaluate its likely consequences.' },
      { speaker: 'B', en: 'Certainly. The financial plan is feasible, but the timeline may be too ambitious.' },
      { speaker: 'A', en: 'Would you recommend extending the first stage?' },
      { speaker: 'B', en: 'Yes. That would reduce the risk and give us reliable evidence for the next decision.' },
    ],
    notes: ['Would you recommend...? is a diplomatic way to ask for advice.', 'Use may be to express a cautious possibility.'],
  },
  {
    id: 'conv-21', title: 'Responding to a Different View', level: 'Advanced', topic: 'Argument and diplomacy',
    lines: [
      { speaker: 'A', en: 'I believe the school should introduce the programme immediately.' },
      { speaker: 'B', en: 'I understand your point. Nevertheless, we should test it with one class first.' },
      { speaker: 'A', en: 'That is a reasonable compromise. The results would help us improve the proposal.' },
      { speaker: 'B', en: 'Exactly. We can expand it once the evidence supports the decision.' },
    ],
    notes: ['I understand your point acknowledges another view before disagreeing.', 'A compromise is an agreement between different positions.'],
  },
];

const CONVERSATION_LEVELS = [];
const levelSeen = new Set();
CONVERSATIONS.forEach(function(d) {
  if (!levelSeen.has(d.level)) {
    levelSeen.add(d.level);
    CONVERSATION_LEVELS.push({ name: d.level, count: CONVERSATIONS.filter(function(c) { return c.level === d.level; }).length });
  }
});

const CONVERSATION_TOPICS = [];
const topicSeen = new Set();
CONVERSATIONS.forEach(function(d) {
  if (!topicSeen.has(d.topic)) {
    topicSeen.add(d.topic);
    CONVERSATION_TOPICS.push({ name: d.topic, count: CONVERSATIONS.filter(function(c) { return c.topic === d.topic; }).length });
  }
});
