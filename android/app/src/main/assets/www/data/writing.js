/**
 * Easy English — Writing exercises for Malagasy learners
 *
 * Each exercise has:
 *   id, title, level, instructions,
 *   model (example text), prompt (what to write),
 *   tips (helpful hints)
 */

const WRITING_EXERCISES = [
  {
    id: 'write-1',
    title: 'About Yourself',
    level: 'Beginner',
    instructions: `Write a short paragraph about yourself. Include your name, where you are from, your age, what you like, and what you do every day. Use the model below to help you.`,
    model: `Hello! My name is Rina. I am nine years old. I am from Antananarivo. I go to school every day. I like English and maths. My favourite food is rice with beans. I have a cat. Its name is Kitty.`,
    prompt: `Write about yourself. Answer these questions:
    • What is your name?
    • How old are you?
    • Where are you from?
    • What do you like?
    • What is your favourite food?`,
    tips: `Start with "Hello" or "Hi". Use "I am" or "I'm" for your name and age. Use "I like" for things you enjoy. Write 4-5 sentences. Check that each sentence starts with a capital letter and ends with a full stop (.).`,
  },

  {
    id: 'write-2',
    title: 'My Daily Routine',
    level: 'Beginner',
    instructions: `Write about your daily routine. What do you do from morning to evening? Use the Present Simple tense (I wake up, I eat, I go...).`,
    model: `I wake up at six o'clock. I wash my face and brush my teeth. I eat breakfast with my family. I go to school at seven o'clock. I study until noon. I eat lunch at school. I go home at four o'clock. I do my homework. I eat dinner at seven. I go to bed at eight.`,
    prompt: `Describe your day. Answer these questions:
    • What time do you wake up?
    • What do you do in the morning?
    • What do you do at school?
    • What do you do after school?
    • What time do you go to bed?`,
    tips: `Use time words: in the morning, in the afternoon, in the evening, at night.
    <br>Use "then" to connect sentences: "I eat breakfast, then I go to school."
    <br>Use "after that" to show the next action.
    <br>Write at least 6 sentences.`,
  },

  {
    id: 'write-3',
    title: 'Describing My Family',
    level: 'Beginner',
    instructions: `Write about your family. Describe each person and what they do. Use adjectives (tall, kind, funny) and the Present Simple tense.`,
    model: `There are four people in my family: my mother, my father, my brother, and me. My mother is kind. She is a teacher. My father is tall. He is a farmer. My brother is funny. He is ten years old. He likes football. I love my family.`,
    prompt: `Write about your family. Answer these questions:
    • How many people are in your family?
    • What are their names?
    • What are they like? (use adjectives)
    • What do they do?
    • Why do you love them?`,
    tips: `Use "There are..." to say how many. Use "He is" / "She is" + adjective. Use "He likes" / "She likes" for what they enjoy. Write 6-8 sentences.`,
  },

  {
    id: 'write-4',
    title: 'What Happened Yesterday',
    level: 'Elementary',
    instructions: `Write about what you did yesterday. Use the Past Simple tense. Think about the morning, afternoon, and evening.`,
    model: `Yesterday was Sunday. I did not go to school. I woke up at eight o'clock. I ate bread and drank tea for breakfast. Then I helped my mother in the garden. After that, I played with my friends. We played football. In the evening, I watched television with my family. I went to bed at nine o'clock. It was a good day.`,
    prompt: `Write about yesterday. Answer these questions:
    • What day was yesterday?
    • What did you do in the morning?
    • What did you do in the afternoon?
    • What did you do in the evening?
    • Was it a good day? Why or why not?`,
    tips: `Most verbs add -ed for the past (play → played, watch → watched).
    <br>Some verbs are irregular: go → went, eat → ate, drink → drank.
    <br>Use "then" and "after that" to connect events.
    <br>Write 6-8 sentences. Check your verb forms!`,
  },

  {
    id: 'write-5',
    title: 'My Plans for Next Week',
    level: 'Elementary',
    instructions: `Write about what you are going to do next week. Use "going to" or "will" to talk about the future.`,
    model: `Next week I am going to study hard for my English test. I am going to read one book every day. On Saturday, I will visit my grandmother. She is going to cook a special meal for me. On Sunday, I am going to play football with my friends. I think it will be a great week!`,
    prompt: `Write about your plans. Answer these questions:
    • What are you going to do at school next week?
    • Where are you going to go?
    • Who are you going to visit?
    • What are you going to do for fun?
    • How do you think the week will be?`,
    tips: `Use "I am going to" for plans you have made. Use "I will" for decisions or promises. Use "next week", "on Monday", "on Saturday" for time. Write 5-7 sentences.`,
  },

  {
    id: 'write-6',
    title: 'Describing a Place',
    level: 'Elementary',
    instructions: `Describe your favourite place. It could be your home, your school, a market, or a place in nature. Use adjectives and prepositions of place (in, on, at, next to, between).`,
    model: `My favourite place is the rice field near my house. It is very big and green. There are many birds in the field. The water is clean and cool. I like to sit under a big tree next to the field. I watch the farmers working. The sky is blue and beautiful. The rice field makes me feel calm and happy.`,
    prompt: `Describe your favourite place. Answer these questions:
    • What is your favourite place? Where is it?
    • What does it look like? (size, colour)
    • What can you see, hear, or smell there?
    • What can you do there?
    • How does it make you feel?`,
    tips: `Use "there is" / "there are" to describe what you see. Use adjectives: beautiful, big, quiet, green, clean. Use prepositions: in, on, at, under, next to, between, near. Write 6-8 sentences.`,
  },

  {
    id: 'write-7',
    title: 'Explain a Useful Change',
    level: 'Intermediate',
    instructions: `Write a short explanation about a change that would improve your school or community. Give the situation, your suggestion, reasons, and a practical example.`,
    model: `Our school could create a small reading corner. Many pupils want to read, but there are not enough books in the classrooms. A reading corner would give everyone a quiet place to practise. Teachers could invite families to donate old books, and pupils could take turns looking after them. This simple project would help us become better readers.`,
    prompt: `Write 120–150 words. Explain:
    • What is the situation now?
    • What change do you suggest?
    • Why would it help?
    • How could people make it happen?`,
    tips: `Use linking words: however, because, therefore, for example, and as a result. Organise your answer into a beginning, supporting reasons, and a conclusion.`,
  },

  {
    id: 'write-8',
    title: 'Build an Argument',
    level: 'Advanced',
    instructions: `Write a clear argument about an issue that matters to young people. Present a position, support it with reasons and examples, and acknowledge another point of view.`,
    model: `Schools should teach practical environmental habits as part of everyday learning. Knowledge becomes more meaningful when pupils apply it: they can reduce waste, protect water, and care for trees around the school. Some people may argue that the timetable is already full. Nevertheless, a short weekly project could connect science, language, and community life without adding a separate subject.`,
    prompt: `Write 180–220 words. Choose one topic:
    • Should every school have a reading club?
    • How can communities protect clean water?
    • Should pupils learn a practical skill every term?`,
    tips: `Use a precise thesis, developed paragraphs, examples, and a conclusion. Use although, nevertheless, whereas, in addition, and consequently carefully.`,
  },
  {
    id: 'write-9', title: 'A Memorable Experience', level: 'Pre-Intermediate',
    instructions: `Write a story about an experience you remember clearly. Organise it with a beginning, important events, and an ending.`,
    model: `Last year, I took part in a school sports day. At first, I felt nervous because many pupils were watching. My friend encouraged me, so I tried my best. I did not win the race, but I finished it and felt proud. Afterwards, we laughed and shared some food. The day taught me that taking part is more important than winning.`,
    prompt: `Write 100–130 words. Include when and where it happened, what happened first, how you felt, and what you learned.`,
    tips: `Use past simple for completed events and past continuous for background actions. Use first, then, while, suddenly, and finally.`,
  },
  {
    id: 'write-10', title: 'Give Advice to a New Learner', level: 'Pre-Intermediate',
    instructions: `Write advice for a pupil who wants to improve English. Give at least four practical suggestions and explain why they help.`,
    model: `A new learner should practise a little every day. First, they should listen to short English sentences and repeat them. They should also keep a vocabulary notebook and write an example for each new word. If they make a mistake, they should correct it and try again. Finally, they could practise with a friend because speaking regularly builds confidence.`,
    prompt: `Write 100–130 words using should, could, because, and if.`,
    tips: `Give a clear suggestion, then explain its reason. Avoid repeating “you should” in every sentence; use could, it is useful to, and I recommend.`,
  },
  {
    id: 'write-11', title: 'Explain a Local Process', level: 'Pre-Intermediate',
    instructions: `Explain how something is made, prepared, or completed in your community.`,
    model: `Rice goes through several stages before people eat it. First, farmers prepare the field and plant the seedlings. They look after the crop while it grows. When the rice is ready, workers harvest and dry it. Finally, the grain is stored and sold at the market. This process requires patience and teamwork.`,
    prompt: `Write 100–140 words. Use sequence words and the passive voice where useful.`,
    tips: `Use first, after that, while, when, and finally. Check the difference between is grown and grows.`,
  },
  {
    id: 'write-12', title: 'Compare Two Ways of Learning', level: 'Intermediate',
    instructions: `Compare learning alone with learning in a group. Explain advantages, disadvantages, and your conclusion.`,
    model: `Learning alone allows students to work at their own pace. They can repeat difficult sections without feeling embarrassed. Group learning, on the other hand, gives learners opportunities to exchange ideas and practise communication. Although groups can become noisy, a clear task usually keeps everyone focused. In my view, combining both methods is most effective.`,
    prompt: `Write 140–170 words. Use whereas, however, although, on the other hand, and in my view.`,
    tips: `Organise your comparison into clear paragraphs. Do not list ideas without explaining how they support your conclusion.`,
  },
  {
    id: 'write-13', title: 'A Short Formal Report', level: 'Intermediate',
    instructions: `Write a report about one improvement your school or community needs. Include a heading, the current situation, findings, and recommendations.`,
    model: `Report: The School Reading Area
    The reading area is useful, but it currently has too few books and no clear timetable. Pupils said they would use it more often if new stories were available. I recommend collecting books from families and creating a weekly reading schedule. These changes would make the area more organised and accessible.`,
    prompt: `Write 150–180 words with a clear title, findings, and two recommendations.`,
    tips: `Use a formal tone. Use the passive where appropriate: books are needed, a timetable should be created.`,
  },
  {
    id: 'write-14', title: 'Evaluate an Argument', level: 'Advanced',
    instructions: `Evaluate an argument about an important issue. Explain its strongest point, its limitation, and your final judgement.`,
    model: `The argument that every school should provide a reading club is persuasive because regular reading supports vocabulary, concentration, and independent learning. Nevertheless, the proposal may be difficult for schools with limited staff or materials. This limitation does not invalidate the idea, but it suggests that clubs should begin with a small volunteer programme. Overall, the benefits justify a carefully planned introduction.`,
    prompt: `Write 200–240 words. Present a balanced evaluation rather than only your personal opinion.`,
    tips: `Distinguish evidence from opinion. Use nevertheless, however, whereas, despite, and overall to control the argument.`,
  },
  {
    id: 'write-15', title: 'A Proposal for Community Action', level: 'Advanced',
    instructions: `Write a formal proposal for a project that could improve life in your community.`,
    model: `Proposal: A Community Water Awareness Project
    The project would combine school lessons, public information, and a monthly clean-up. Its objective would be to reduce waste near water sources. Volunteers could work with local leaders to identify problem areas and measure progress. If the project were supported by several organisations, it would be more sustainable. The proposal should be reviewed after six months.`,
    prompt: `Write 220–260 words with an objective, actions, resources, risks, and a method for evaluating success.`,
    tips: `Use formal headings and precise verbs. Avoid informal phrases and support each recommendation with a reason.`,
  },
];
