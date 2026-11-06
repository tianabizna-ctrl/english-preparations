/**
 * Easy English — Reading passages with comprehension questions
 *
 * Each passage has:
 *   id, title, level (Beginner / Elementary / Pre-Intermediate / Intermediate),
 *   text (with <p> paragraphs), vocabulary items [{word, mg}],
 *   comprehension [{question, answer}]
 */

const READING_PASSAGES = [
  {
    id: 'read-1',
    title: 'A Day at School',
    level: 'Beginner',
    text: `<p>My name is <span class="vocab-highlight" title="Rakoto">Rakoto</span>. I am a pupil. I go to school every day. I wake up at six o'clock in the morning. I <span class="vocab-highlight" title="misakafo maraina">eat breakfast</span> with my family. I eat rice and beans. Then I walk to school with my friends.</p>
    <p>At school, I learn English, maths, and science. My teacher is kind. She helps me when I do not understand. I like English class because I learn new words. After school, I play football with my friends. I go home at four o'clock. In the evening, I do my homework. Then I eat dinner and go to bed.</p>`,
    vocabulary: [
      { word: 'wake up', mg: 'mifoha' },
      { word: 'breakfast', mg: 'sakafo maraina' },
      { word: 'walk', mg: 'mandeha an-tongotra' },
      { word: 'learn', mg: 'mianatra' },
      { word: 'kind', mg: 'tsara fanahy' },
      { word: 'homework', mg: 'devoara / enti-mody' },
      { word: 'dinner', mg: 'sakafo hariva' },
    ],
    comprehension: [
      { question: 'What time does Rakoto wake up?', answer: 'He wakes up at six o\'clock.' },
      { question: 'What does he eat for breakfast?', answer: 'He eats rice and beans.' },
      { question: 'How does he go to school?', answer: 'He walks to school with his friends.' },
      { question: 'Why does Rakoto like English class?', answer: 'He likes it because he learns new words.' },
      { question: 'What does he do in the evening?', answer: 'He does his homework, eats dinner, and goes to bed.' },
    ],
  },

  {
    id: 'read-2',
    title: 'My Family',
    level: 'Beginner',
    text: `<p>I live with my family in a small village near <span class="vocab-highlight" title="Fianarantsoa">Fianarantsoa</span>. There are five people in my family: my father, my mother, my two sisters, and me. My father is a farmer. He grows rice and vegetables. My mother is a <span class="vocab-highlight" title="mpivarotra">trader</span>. She sells fruits at the market.</p>
    <p>My big sister is called Mamy. She is fifteen years old. She helps my mother at the market. My little sister is called Koto. She is seven years old. She goes to primary school. I help my father in the field after school. On Sundays, we all eat together. My grandmother lives nearby. She visits us every weekend. I love my family very much.</p>`,
    vocabulary: [
      { word: 'village', mg: 'tanàna / vohitra' },
      { word: 'farmer', mg: 'mpamboly' },
      { word: 'grows', mg: 'mamboly' },
      { word: 'trader', mg: 'mpivarotra' },
      { word: 'sells', mg: 'mivarotra' },
      { word: 'market', mg: 'tsena' },
      { word: 'nearby', mg: 'akaiky' },
      { word: 'weekend', mg: 'faran\'ny herinandro' },
    ],
    comprehension: [
      { question: 'How many people are in the family?', answer: 'There are five people in the family.' },
      { question: 'What does the father do?', answer: 'He is a farmer. He grows rice and vegetables.' },
      { question: 'Where does the mother sell fruits?', answer: 'She sells fruits at the market.' },
      { question: 'How old is Mamy?', answer: 'She is fifteen years old.' },
      { question: 'How often does grandmother visit?', answer: 'She visits every weekend.' },
    ],
  },

  {
    id: 'read-3',
    title: 'The Market',
    level: 'Elementary',
    text: `<p>Every Saturday, my mother and I go to the market. The market is very busy. There are many people selling different things. Some sell fruits like bananas, mangoes, and oranges. Some sell vegetables like tomatoes, onions, and potatoes. Some sell clothes and shoes.</p>
    <p>My mother has a small stall. She sells <span class="vocab-highlight" title="voankazo">fruits</span>. I help her <span class="vocab-highlight" title="mandanja">weigh</span> the fruits and give change to customers. The customers are very nice. They always say "thank you". I like the market because I can meet many people and practise my English with <span class="vocab-highlight" title="mpizaha tany">tourists</span> who visit from other countries.</p>
    <p>Last Saturday, a tourist from England bought some bananas. He spoke slowly so I could understand. He said, "How much are the bananas?" I answered, "They are 2,000 ariary." He smiled and bought <span class="vocab-highlight" title="roa tonta">two bunches</span>. I was very happy because I spoke English with a real person!</p>`,
    vocabulary: [
      { word: 'busy', mg: 'be olona / be atao' },
      { word: 'stall', mg: 'trano kely fivarotana' },
      { word: 'weigh', mg: 'mandanja' },
      { word: 'change', mg: 'fiovam-bola / sisa' },
      { word: 'customer', mg: 'mpividy / mpanjifa' },
      { word: 'tourist', mg: 'mpizaha tany' },
      { word: 'bunch', mg: 'tonta / fehezana' },
    ],
    comprehension: [
      { question: 'When does the family go to the market?', answer: 'Every Saturday.' },
      { question: 'What does the mother sell?', answer: 'She sells fruits.' },
      { question: 'How does the boy help his mother?', answer: 'He weighs the fruits and gives change to customers.' },
      { question: 'Why does the boy like the market?', answer: 'He can meet people and practise English with tourists.' },
      { question: 'What did the tourist say?', answer: 'He asked, "How much are the bananas?"' },
      { question: 'How much were the bananas?', answer: 'They were 2,000 ariary for two bunches.' },
    ],
  },

  {
    id: 'read-4',
    title: 'My Best Friend',
    level: 'Elementary',
    text: `<p>My best friend is Lala. We are in the same class at school. We sit next to each other. Lala is very <span class="vocab-highlight" title="mampihomehy">funny</span>. She always makes me laugh. She is also very kind and helps me when I have a problem.</p>
    <p>After school, we often play together. We like playing <span class="vocab-highlight" title="tsipaoka">hopscotch</span> and skipping rope. Sometimes we go to the river to swim. Lala is a good swimmer. I am still learning. Last week, Lala taught me how to swim better. I was afraid at first, but she said, "Do not worry! I am here." Now I can swim a little.</p>
    <p>At the weekend, we help our families. Lala helps her mother to <span class="vocab-highlight" title="manondraka">water</span> the <span class="vocab-highlight" title="zaridaina">garden</span>. I help my father to clean the yard. In the evening, we sometimes do our homework together. I am happy to have a good friend like Lala.</p>`,
    vocabulary: [
      { word: 'funny', mg: 'mampihomehy' },
      { word: 'laugh', mg: 'mihomehy' },
      { word: 'hopscotch', mg: 'tsipaoka' },
      { word: 'skipping rope', mg: 'tady hitsambikina' },
      { word: 'swimmer', mg: 'mpilomano' },
      { word: 'taught', mg: 'nampianatra (lasa)' },
      { word: 'afraid', mg: 'matahotra' },
      { word: 'yard', mg: 'tokotany' },
    ],
    comprehension: [
      { question: 'What is Lala like? (two things)', answer: 'She is funny and kind.' },
      { question: 'What do they play after school?', answer: 'They play hopscotch and skipping rope.' },
      { question: 'What did Lala teach the writer last week?', answer: 'She taught the writer how to swim better.' },
      { question: 'How does Lala help at home?', answer: 'She helps her mother water the garden.' },
      { question: 'What does the writer do at the weekend?', answer: 'He helps his father clean the yard.' },
    ],
  },

  {
    id: 'read-5',
    title: 'The Festival of the Year',
    level: 'Pre-Intermediate',
    text: `<p><span class="vocab-highlight" title="Taom-baovao">New Year</span> is an important celebration in Madagascar. People call it the <span class="vocab-highlight" title="Fandroana">Fandroana</span> in some regions. It is a time when families come together. People travel from the cities to their home villages. They want to be with their parents and grandparents.</p>
    <p>Before the New Year, people clean their houses. They throw away old things and buy new clothes. On New Year's Eve, families eat a special dinner. They eat <span class="vocab-highlight" title="vary sy hena">rice with meat</span> and sometimes fried bananas. After dinner, people stay awake until midnight. At midnight, everyone shouts "Happy New Year!" There are fireworks in the big cities.</p>
    <p>On New Year's Day, children visit their grandparents. They say "thank you" and ask for <span class="vocab-highlight" title="tsodrano">blessings</span>. The elders give advice and small gifts. It is a day of joy and family. Everyone wears their best clothes. People <span class="vocab-highlight" title="mihira sy mandihy">sing and dance</span> late into the night.</p>`,
    vocabulary: [
      { word: 'celebration', mg: 'fankalazana' },
      { word: 'region', mg: 'faritra' },
      { word: 'travel', mg: 'mandeha lavitra' },
      { word: 'throw away', mg: 'manary' },
      { word: 'New Year\'s Eve', mg: 'andro farany amin\'ny taona' },
      { word: 'fireworks', mg: 'afo fankalazana' },
      { word: 'blessing', mg: 'tsodrano' },
      { word: 'elder', mg: 'zokiolona' },
      { word: 'gift', mg: 'fanomezana' },
    ],
    comprehension: [
      { question: 'What do people call the New Year in some regions?', answer: 'They call it the Fandroana.' },
      { question: 'What do people do before New Year?', answer: 'They clean their houses, throw away old things, and buy new clothes.' },
      { question: 'When do people shout "Happy New Year"?', answer: 'At midnight on New Year\'s Eve.' },
      { question: 'What do children do on New Year\'s Day?', answer: 'They visit grandparents, say thank you, and ask for blessings.' },
      { question: 'What do elders give to children?', answer: 'They give advice and small gifts.' },
    ],
  },

  {
    id: 'read-6',
    title: 'The Seasons in Madagascar',
    level: 'Elementary',
    text: `<p>Madagascar has two main seasons: the rainy season and the dry season. The rainy season is from November to April. During this time, it rains a lot. The rice fields are full of water. The plants grow very fast. The rivers are full and sometimes there are <span class="vocab-highlight" title="tsatso / tondra-drano">floods</span>.</p>
    <p>The dry season is from May to October. The weather is cooler. The sun shines most days. This is the best time for <span class="vocab-highlight" title="fambolena">harvesting</span> rice. Farmers work hard in the fields. Children can play outside more because it does not rain.</p>
    <p>In the highlands, like Antananarivo, the winter months (June to August) can be quite cold in the mornings. People wear <span class="vocab-highlight" title="akanjo mafana">warm clothes</span> and drink hot tea. In the coastal areas, it is warm all year round. The weather is different in every part of our big island.</p>`,
    vocabulary: [
      { word: 'season', mg: 'vanim-potoana' },
      { word: 'rainy season', mg: 'vanin-taona orana' },
      { word: 'dry season', mg: 'vanin-taona maina' },
      { word: 'flood', mg: 'tsatso / tondra-drano' },
      { word: 'harvesting', mg: 'fambolena / fijinjana' },
      { word: 'highlands', mg: 'tany avo' },
      { word: 'coastal', mg: 'amoron-dranomasina' },
    ],
    comprehension: [
      { question: 'What are the two main seasons in Madagascar?', answer: 'The rainy season and the dry season.' },
      { question: 'When is the rainy season?', answer: 'From November to April.' },
      { question: 'When is the best time for harvesting rice?', answer: 'During the dry season (May to October).' },
      { question: 'What is the weather like in the highlands in winter?', answer: 'It can be quite cold in the mornings.' },
      { question: 'What do people in the highlands drink to keep warm?', answer: 'They drink hot tea.' },
    ],
  },

  {
    id: 'read-7',
    title: 'A Letter to a Pen Friend',
    level: 'Pre-Intermediate',
    text: `<p>Dear Pierre,</p>
    <p>Hello! My name is Hanitra and I am a twelve-year-old girl from Antsirabe, Madagascar. I am writing this letter because I would like to be your pen friend. I have never written a letter to someone in another country before, so I am a little nervous!</p>
    <p>I live with my parents and my little brother. My father is a <span class="vocab-highlight" title="mpanamboatra">mechanic</span> and my mother is a nurse. I am in <span class="vocab-highlight" title="kilasy faha-enina">grade six</span> at a primary school near my home. My favourite subjects are English and geography. I like learning about other countries and cultures.</p>
    <p>In my free time, I enjoy reading storybooks and playing football. I also help my mother in the kitchen. I can cook <span class="vocab-highlight" title="vary sy vary amin\'ny akoho">rice with chicken</span> quite well! What do you like to do? What is your favourite food?</p>
    <p>I hope you will write back to me. I want to learn more about your country. Please send me a photo of your family!</p>
    <p>Your new friend,<br>Hanitra</p>`,
    vocabulary: [
      { word: 'pen friend', mg: 'namana ifanoratana taratasy' },
      { word: 'nervous', mg: 'sahiran-tsaina / mitebiteby' },
      { word: 'mechanic', mg: 'mpanamboatra fiara' },
      { word: 'nurse', mg: 'mpitsabo mpanampy' },
      { word: 'grade', mg: 'kilasy / taona' },
      { word: 'geography', mg: 'jeografia' },
      { word: 'culture', mg: 'kolontsaina' },
      { word: 'storybook', mg: 'boky tantara' },
    ],
    comprehension: [
      { question: 'Where is Hanitra from?', answer: 'She is from Antsirabe, Madagascar.' },
      { question: 'Why is Hanitra writing the letter?', answer: 'She wants to find a pen friend in another country.' },
      { question: 'What does Hanitra\'s father do?', answer: 'He is a mechanic.' },
      { question: 'What are Hanitra\'s favourite subjects?', answer: 'English and geography.' },
      { question: 'What can Hanitra cook?', answer: 'She can cook rice with chicken.' },
    ],
  },

  {
    id: 'read-8',
    title: 'The Zebu — Our Precious Animal',
    level: 'Pre-Intermediate',
    text: `<p>The <span class="vocab-highlight" title="omby / aomby">zebu</span> is a very important animal in Madagascar. It has a large <span class="vocab-highlight" title="vokona">hump</span> on its back and long, curved horns. Zebus are not just animals for food — they are part of our culture and traditions.</p>
    <p>In many parts of Madagascar, people measure wealth by how many zebus a family has. A man who has many zebus is considered rich. During weddings and funerals, families often <span class="vocab-highlight" title="manao sorona">sacrifice</span> a zebu to share with the community. This is a sign of <span class="vocab-highlight" title="fahalalahan-tanana">generosity</span> and respect.</p>
    <p>Zebus help farmers too. They pull the <span class="vocab-highlight" title="ara-na">plough</span> in the rice fields. Children learn to take care of zebus from a young age. They <span class="vocab-highlight" title="manondro">herd</span> them to the fields in the morning and bring them back in the evening. The zebu is truly a symbol of Madagascar.</p>`,
    vocabulary: [
      { word: 'zebu', mg: 'omby / aomby' },
      { word: 'hump', mg: 'vokona' },
      { word: 'wealth', mg: 'harena / fananana' },
      { word: 'sacrifice', mg: 'manao sorona' },
      { word: 'generosity', mg: 'fahalalahan-tanana' },
      { word: 'plough', mg: 'ara-na' },
      { word: 'herd', mg: 'manondro (biby)' },
      { word: 'symbol', mg: 'mariky ny firenena' },
    ],
    comprehension: [
      { question: 'What does the zebu look like?', answer: 'It has a large hump on its back and long, curved horns.' },
      { question: 'How do people measure wealth in some parts of Madagascar?', answer: 'By how many zebus a family has.' },
      { question: 'When do families sacrifice a zebu?', answer: 'During weddings and funerals.' },
      { question: 'How do zebus help farmers?', answer: 'They pull the plough in the rice fields.' },
      { question: 'What does the zebu symbolise for Madagascar?', answer: 'It is a symbol of the country.' },
    ],
  },

  {
    id: 'read-9',
    title: 'Antananarivo — The City of a Thousand Warriors',
    level: 'Intermediate',
    text: `<p><span class="vocab-highlight" title="Antananarivo">Antananarivo</span>, often called Tana, is the capital city of Madagascar. The name means "the city of a thousand warriors". It is built on and around a long, narrow hill that rises about 200 metres above the surrounding rice fields. The city has a rich history that goes back to the 17th century.</p>
    <p>In the centre of the city is the <span class="vocab-highlight" title="Rova">Rova</span> — the Queen's Palace. It stands on the highest point of the hill. From there, you can see the whole city. The palace was the home of the Merina queens and kings who ruled Madagascar in the 19th century. It is an important historical monument.</p>
    <p>Today, Antananarivo is a busy city with more than two million people. The streets are crowded with cars, taxis, and bicycle rickshaws. There are many markets, shops, schools, and universities. The city has a special charm because it mixes old and new — traditional wooden houses stand next to modern buildings. The climate is mild, with warm summers and cool winters.</p>`,
    vocabulary: [
      { word: 'capital', mg: 'renivohitra' },
      { word: 'warrior', mg: 'miaramila / mpiady' },
      { word: 'palace', mg: 'lapa / rova' },
      { word: 'monument', mg: 'tsangambato' },
      { word: 'crowded', mg: 'be olona / feno olona' },
      { word: 'rickshaw', mg: 'bisikileta misy seza' },
      { word: 'charm', mg: 'hakanto / hatsarana' },
      { word: 'century', mg: 'taonjato' },
    ],
    comprehension: [
      { question: 'What does "Antananarivo" mean?', answer: 'It means "the city of a thousand warriors".' },
      { question: 'Where is the Queen\'s Palace located?', answer: 'On the highest point of the hill, in the centre of the city.' },
      { question: 'Who lived in the Rova?', answer: 'The Merina queens and kings who ruled in the 19th century.' },
      { question: 'How many people live in Antananarivo today?', answer: 'More than two million people.' },
      { question: 'What makes the city special?', answer: 'It mixes old and new: traditional wooden houses stand next to modern buildings.' },
    ],
  },

  {
    id: 'read-10',
    title: 'Protecting Madagascar’s Forests',
    level: 'Advanced',
    text: `<p>Madagascar is home to plants and animals found nowhere else on Earth. However, forests are under pressure from farming, fires, illegal logging, and the effects of a changing climate. When forests disappear, communities lose clean water, fertile soil, and natural protection from floods.</p>
    <p>Conservation is not only the responsibility of scientists or government agencies. Local communities can protect forest edges, plant native trees, and use land more carefully. Schools can help by teaching pupils to observe nature, reduce waste, and explain why biodiversity matters.</p>
    <p>Protecting a forest is a long-term project. It requires cooperation, reliable information, and decisions that respect both people and the environment. Small actions become powerful when many people continue them together.</p>`,
    vocabulary: [],
    comprehension: [
      { question: 'Why are Madagascar’s forests important?', answer: 'They contain unique species and provide clean water, fertile soil, and protection from floods.' },
      { question: 'Name two pressures on the forests.', answer: 'Farming, fires, illegal logging, and climate change are pressures on the forests.' },
      { question: 'How can local communities help?', answer: 'They can protect forest edges, plant native trees, and use land carefully.' },
      { question: 'Why are schools mentioned in the passage?', answer: 'Schools can teach pupils to observe nature, reduce waste, and understand biodiversity.' },
    ],
  },

  {
    id: 'read-11', title: 'A Rainy School Morning', level: 'Beginner',
    text: `<p>It is raining this morning. Lova puts on her yellow raincoat and takes an umbrella. She walks carefully because the road is wet.</p><p>At school, her friends are already in the classroom. They read a story while they wait for the teacher. After the rain stops, they play outside.</p>`,
    vocabulary: [{ word: 'raincoat', mg: 'akanjo fiarovana amin’ny orana' }, { word: 'wet', mg: 'lena' }, { word: 'wait', mg: 'miandry' }],
    comprehension: [
      { question: 'What does Lova wear?', answer: 'She wears a yellow raincoat.' },
      { question: 'Why does she walk carefully?', answer: 'Because the road is wet.' },
      { question: 'What do the pupils do while they wait?', answer: 'They read a story.' },
    ],
  },
  {
    id: 'read-12', title: 'My Favourite Animal', level: 'Beginner',
    text: `<p>My favourite animal is the zebu. A zebu is strong and useful. It has horns and a hump on its back. Its hair can be brown, black, or white.</p><p>My grandfather has two zebus. They help him on the farm. I give them grass and clean water every morning.</p>`,
    vocabulary: [{ word: 'horn', mg: 'tandroka' }, { word: 'hump', mg: 'vongan’ny lamosina' }, { word: 'grass', mg: 'ahitra' }],
    comprehension: [
      { question: 'What is the writer’s favourite animal?', answer: 'The writer’s favourite animal is the zebu.' },
      { question: 'What can the zebu look like?', answer: 'It can be brown, black, or white.' },
      { question: 'What does the writer give the zebus?', answer: 'Grass and clean water.' },
    ],
  },
  {
    id: 'read-13', title: 'Helping at Home', level: 'Elementary',
    text: `<p>Every Saturday, Tiana helps her family at home. In the morning, she sweeps the floor and washes the dishes. Her brother carries water from the well.</p><p>After lunch, they tidy the rooms and feed the chickens. Their parents are pleased because everyone shares the work. In the evening, the family rests together.</p>`,
    vocabulary: [{ word: 'sweep', mg: 'mamafa' }, { word: 'well', mg: 'lavadrano' }, { word: 'share', mg: 'mizara' }],
    comprehension: [
      { question: 'When does Tiana help her family?', answer: 'She helps every Saturday.' },
      { question: 'What does her brother carry?', answer: 'He carries water from the well.' },
      { question: 'Why are the parents pleased?', answer: 'Because everyone shares the work.' },
    ],
  },
  {
    id: 'read-14', title: 'A Visit to the Coast', level: 'Elementary',
    text: `<p>During the school holiday, Miora visits the coast with her cousins. They swim in the warm sea and collect shells on the beach. Their aunt warns them not to go too far into the water.</p><p>In the afternoon, the children watch fishermen return with their boats. They buy fresh fish for dinner and thank the fishermen politely.</p>`,
    vocabulary: [{ word: 'coast', mg: 'morontsiraka' }, { word: 'shell', mg: 'akorandriaka' }, { word: 'fisherman', mg: 'mpanjono' }],
    comprehension: [
      { question: 'Who visits the coast with Miora?', answer: 'She visits with her cousins.' },
      { question: 'What does their aunt warn them about?', answer: 'She warns them not to go too far into the water.' },
      { question: 'What do they buy for dinner?', answer: 'They buy fresh fish.' },
    ],
  },
  {
    id: 'read-15', title: 'From Rice Field to Table', level: 'Pre-Intermediate',
    text: `<p>Rice is an important food in Madagascar, but it takes many months to reach the table. Farmers prepare the fields, plant seedlings, and protect the crop while it grows. They must watch the water and remove weeds.</p><p>When the rice is ready, workers harvest it and dry the grains. The rice is then stored, carried to a market, and sold to families. Each bowl of rice represents patient work.</p>`,
    vocabulary: [{ word: 'seedling', mg: 'zana-ketsa' }, { word: 'crop', mg: 'vokatra' }, { word: 'harvest', mg: 'jinja' }],
    comprehension: [
      { question: 'What do farmers do before the rice grows?', answer: 'They prepare the fields and plant seedlings.' },
      { question: 'What must farmers watch?', answer: 'They must watch the water and remove weeds.' },
      { question: 'What happens after harvesting?', answer: 'The grains are dried, stored, carried to a market, and sold.' },
    ],
  },
  {
    id: 'read-16', title: 'Learning from a Mistake', level: 'Pre-Intermediate',
    text: `<p>Fara had to give a short presentation, but she forgot to check the time. She prepared many slides and spoke too quickly. Her classmates understood the main idea, but they could not remember all the details.</p><p>After the lesson, Fara asked her teacher for advice. Next time, she will choose three important points, practise aloud, and leave time for questions. The mistake helped her become a better speaker.</p>`,
    vocabulary: [{ word: 'presentation', mg: 'fampisehoana' }, { word: 'detail', mg: 'antsipiriany' }, { word: 'advice', mg: 'torohevitra' }],
    comprehension: [
      { question: 'What did Fara forget to check?', answer: 'She forgot to check the time.' },
      { question: 'What problem did the classmates have?', answer: 'They could not remember all the details.' },
      { question: 'What will Fara do next time?', answer: 'She will choose three points, practise, and leave time for questions.' },
    ],
  },
  {
    id: 'read-17', title: 'Why Community Libraries Matter', level: 'Intermediate',
    text: `<p>A community library is more than a room full of books. It gives children a quiet place to study, provides access to information, and encourages people to learn together. In areas where internet access is limited, a library can be especially valuable.</p><p>A successful library depends on local participation. Volunteers can organise reading clubs, repair books, and help younger readers. When families contribute time or materials, the library becomes a shared responsibility rather than a service used by only a few people.</p>`,
    vocabulary: [],
    comprehension: [
      { question: 'Why can a library be valuable where internet access is limited?', answer: 'It provides access to information and a place to study.' },
      { question: 'How can volunteers help?', answer: 'They can organise clubs, repair books, and help younger readers.' },
      { question: 'What makes the library a shared responsibility?', answer: 'Families contribute time or materials.' },
    ],
  },
  {
    id: 'read-18', title: 'Choosing a Career Path', level: 'Intermediate',
    text: `<p>Choosing a career is not a single decision made at the end of school. It is a process of discovering interests, developing skills, and learning about different kinds of work. A student may begin with one ambition and later discover a new possibility.</p><p>Good advice is useful, but students should also test their ideas. They can speak to professionals, volunteer, read about a field, or practise a related skill. These experiences make a future plan more realistic.</p>`,
    vocabulary: [],
    comprehension: [
      { question: 'What three things are part of choosing a career?', answer: 'Discovering interests, developing skills, and learning about work.' },
      { question: 'Why should students test their ideas?', answer: 'Their experiences make a future plan more realistic.' },
      { question: 'Name one way students can test an idea.', answer: 'They can speak to professionals, volunteer, read, or practise a skill.' },
    ],
  },
  {
    id: 'read-19', title: 'Learning in a Changing World', level: 'Advanced',
    text: `<p>Education is no longer limited to information delivered in a classroom. Digital tools, community projects, and independent study can all support learning. However, access to technology does not automatically create understanding; learners still need guidance, judgement, and opportunities to apply knowledge.</p><p>The strongest learning environments combine reliable information with discussion and practice. They encourage learners to question sources, explain their reasoning, and revise their ideas when new evidence appears.</p>`,
    vocabulary: [],
    comprehension: [
      { question: 'Why do digital tools not automatically create understanding?', answer: 'Learners still need guidance, judgement, and opportunities to apply knowledge.' },
      { question: 'What should learners do with sources?', answer: 'They should question whether sources are reliable.' },
      { question: 'When should learners revise their ideas?', answer: 'They should revise them when new evidence appears.' },
    ],
  },
  {
    id: 'read-20', title: 'Adapting to a Changing Climate', level: 'Advanced',
    text: `<p>Communities facing a changing climate must prepare for risks that may affect water, farming, health, and infrastructure. Adaptation does not mean predicting every event perfectly. It means identifying vulnerable areas, planning several responses, and improving systems over time.</p><p>Local knowledge is essential. Residents understand seasonal changes and practical constraints that outside experts may overlook. When scientific information and local experience are combined, communities can make decisions that are both effective and realistic.</p>`,
    vocabulary: [],
    comprehension: [
      { question: 'Which areas may climate risks affect?', answer: 'Water, farming, health, and infrastructure.' },
      { question: 'What does adaptation involve?', answer: 'It involves identifying risks, planning responses, and improving systems.' },
      { question: 'Why is local knowledge essential?', answer: 'Residents understand local changes and practical constraints.' },
    ],
  },
];
