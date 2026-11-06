/**
 * Level-specific classroom, seminar, and study language.
 *
 * The original classroom catalogue is retained for Beginner. These sets make
 * the same screen useful for older and more advanced learners: the language
 * moves from instructions, to collaboration, to academic discussion and
 * professional presentation.
 */
function classroomCoursePhrase(level, code, group, groupMg, en, mg, note, emoji) {
  return {
    id: 'course-classroom-' + level + '-' + code,
    level: level,
    group: group,
    groupMg: groupMg || '',
    en: en,
    mg: mg || '',
    note: note || '',
    emoji: emoji || '💬',
  };
}

const CLASSROOM_COURSE_PHRASES = [
  // ─── ELEMENTARY · A1/A2 ──────────────────────────────────────────────
  classroomCoursePhrase('elementary', '01', 'Instructions and materials', 'Baiko sy fitaovana', 'Take out your exercise book.', 'Avoahy ny kahienao.', 'Prepare the book you use for written work.', '📓'),
  classroomCoursePhrase('elementary', '02', 'Instructions and materials', 'Baiko sy fitaovana', 'Put your books away.', 'Avereno any amin’ny toerany ny bokinao.', 'Finish the activity and tidy your materials.', '📚'),
  classroomCoursePhrase('elementary', '03', 'Instructions and materials', 'Baiko sy fitaovana', 'Work with a partner.', 'Miaraha miasa amin’ny namana iray.', 'Use this before pair work begins.', '👥'),
  classroomCoursePhrase('elementary', '04', 'Instructions and materials', 'Baiko sy fitaovana', 'Work in groups of four.', 'Miaraha miasa anaty vondrona misy olona efatra.', 'Organise the class into small groups.', '4️⃣'),
  classroomCoursePhrase('elementary', '05', 'Checking understanding', 'Manamarina fahatakarana', 'Can you explain your answer?', 'Afaka manazava ny valinteninao ve ianao?', 'Ask a pupil to give a reason.', '💡'),
  classroomCoursePhrase('elementary', '06', 'Checking understanding', 'Manamarina fahatakarana', 'I think the answer is …', 'Heveriko fa … ny valiny.', 'Use this before giving a possible answer.', '🤔'),
  classroomCoursePhrase('elementary', '07', 'Checking understanding', 'Manamarina fahatakarana', 'I am not sure.', 'Tsy azoko antoka.', 'A useful honest response.', '❔'),
  classroomCoursePhrase('elementary', '08', 'Checking understanding', 'Manamarina fahatakarana', 'Can you say that again, please?', 'Afaka miteny izany indray ve ianao, azafady?', 'Ask for repetition politely.', '🔁'),
  classroomCoursePhrase('elementary', '09', 'Pair work', 'Asan’olona roa', 'What do you think?', 'Ahoana ny hevitrao?', 'Invite your partner to speak.', '💬'),
  classroomCoursePhrase('elementary', '10', 'Pair work', 'Asan’olona roa', 'I agree with you.', 'Manaiky anao aho.', 'Show agreement.', '👍'),
  classroomCoursePhrase('elementary', '11', 'Pair work', 'Asan’olona roa', 'I have a different answer.', 'Manana valiny hafa aho.', 'Disagree politely and continue the task.', '↔️'),
  classroomCoursePhrase('elementary', '12', 'Pair work', 'Asan’olona roa', 'Let us check together.', 'Andao hojerentsika miaraka.', 'Invite your partner to review the work.', '✅'),

  // ─── PRE-INTERMEDIATE · A2/B1 ────────────────────────────────────────
  classroomCoursePhrase('pre-intermediate', '01', 'Discussion skills', 'Fahaiza-manao amin’ny adihevitra', 'Can I add something?', 'Afaka manampy zavatra iray ve aho?', 'Join a group discussion politely.', '➕'),
  classroomCoursePhrase('pre-intermediate', '02', 'Discussion skills', 'Fahaiza-manao amin’ny adihevitra', 'I would like to ask a question.', 'Te hametraka fanontaniana aho.', 'Open a question in a lesson or presentation.', '🙋'),
  classroomCoursePhrase('pre-intermediate', '03', 'Discussion skills', 'Fahaiza-manao amin’ny adihevitra', 'I agree because …', 'Manaiky aho satria …', 'Give a reason, not only agreement.', '💬'),
  classroomCoursePhrase('pre-intermediate', '04', 'Discussion skills', 'Fahaiza-manao amin’ny adihevitra', 'I see your point, but …', 'Azoko ny hevitrao, saingy …', 'Disagree respectfully.', '⚖️'),
  classroomCoursePhrase('pre-intermediate', '05', 'Presentations', 'Fanolorana', 'Today I am going to talk about …', 'Androany aho hiresaka momba ny …', 'Introduce a short presentation.', '🎤'),
  classroomCoursePhrase('pre-intermediate', '06', 'Presentations', 'Fanolorana', 'First, I will explain …', 'Voalohany, hanazava ny … aho.', 'Signpost the first point.', '1️⃣'),
  classroomCoursePhrase('pre-intermediate', '07', 'Presentations', 'Fanolorana', 'For example, …', 'Ohatra, …', 'Introduce supporting evidence or an example.', '📌'),
  classroomCoursePhrase('pre-intermediate', '08', 'Presentations', 'Fanolorana', 'To sum up, …', 'Raha fintinina, …', 'Close a short explanation.', '🏁'),
  classroomCoursePhrase('pre-intermediate', '09', 'Study strategies', 'Paikady fianarana', 'I need to look up this word.', 'Mila mitady ity teny ity ao amin’ny rakibolana aho.', 'Use a dictionary instead of guessing forever.', '📖'),
  classroomCoursePhrase('pre-intermediate', '10', 'Study strategies', 'Paikady fianarana', 'Can you show me an example?', 'Afaka mampiseho ohatra ve ianao?', 'Ask for a model.', '🔎'),
  classroomCoursePhrase('pre-intermediate', '11', 'Study strategies', 'Paikady fianarana', 'I have finished the first part.', 'Vitaiko ny ampahany voalohany.', 'Report progress in a project.', '✅'),
  classroomCoursePhrase('pre-intermediate', '12', 'Study strategies', 'Paikady fianarana', 'What should I do next?', 'Inona no tokony hataoko manaraka?', 'Ask for the next step.', '➡️'),

  // ─── INTERMEDIATE · B1/B2 ────────────────────────────────────────────
  classroomCoursePhrase('intermediate', '01', 'Seminar discussion', '', 'Could you clarify the last point?', '', 'Ask for a precise explanation in a seminar.', '🔍'),
  classroomCoursePhrase('intermediate', '02', 'Seminar discussion', '', 'I would like to build on that idea.', '', 'Connect your contribution to another speaker.', '🧱'),
  classroomCoursePhrase('intermediate', '03', 'Seminar discussion', '', 'I am not entirely convinced by that argument.', '', 'Express a careful disagreement.', '⚖️'),
  classroomCoursePhrase('intermediate', '04', 'Seminar discussion', '', 'Could you give some evidence for that claim?', '', 'Ask for support for an assertion.', '📌'),
  classroomCoursePhrase('intermediate', '05', 'Academic reading', '', 'The main idea of this paragraph is …', '', 'Explain the central point of a text.', '📖'),
  classroomCoursePhrase('intermediate', '06', 'Academic reading', '', 'The writer seems to imply that …', '', 'Discuss an implied meaning.', '🧠'),
  classroomCoursePhrase('intermediate', '07', 'Academic reading', '', 'This example supports the conclusion because …', '', 'Link evidence to an interpretation.', '🔗'),
  classroomCoursePhrase('intermediate', '08', 'Academic reading', '', 'The source presents a different perspective.', '', 'Compare viewpoints in two texts.', '👁️'),
  classroomCoursePhrase('intermediate', '09', 'Presentations', '', 'My presentation is divided into three sections.', '', 'Tell the audience how the talk is organised.', '3️⃣'),
  classroomCoursePhrase('intermediate', '10', 'Presentations', '', 'I will now turn to the second point.', '', 'Move clearly between sections.', '➡️'),
  classroomCoursePhrase('intermediate', '11', 'Presentations', '', 'I will be happy to answer questions.', '', 'Invite questions at the end.', '🙋'),
  classroomCoursePhrase('intermediate', '12', 'Presentations', '', 'Thank you for listening.', '', 'Close a formal presentation.', '👏'),

  // ─── ADVANCED · B2/C1 ────────────────────────────────────────────────
  classroomCoursePhrase('advanced', '01', 'Academic debate', '', 'May I challenge that assumption?', '', 'Question an underlying idea diplomatically.', '⚖️'),
  classroomCoursePhrase('advanced', '02', 'Academic debate', '', 'That interpretation overlooks an important detail.', '', 'Identify a limitation without attacking the speaker.', '🔎'),
  classroomCoursePhrase('advanced', '03', 'Academic debate', '', 'I accept the point in principle; however, …', '', 'Concede part of an argument before qualifying it.', '↔️'),
  classroomCoursePhrase('advanced', '04', 'Academic debate', '', 'The available evidence does not necessarily support that conclusion.', '', 'Use cautious, evidence-based criticism.', '📊'),
  classroomCoursePhrase('advanced', '05', 'Critical analysis', '', 'The author appears to frame the issue as …', '', 'Analyse framing and authorial purpose.', '🧠'),
  classroomCoursePhrase('advanced', '06', 'Critical analysis', '', 'The choice of language creates the impression that …', '', 'Connect language choice to reader effect.', '✍️'),
  classroomCoursePhrase('advanced', '07', 'Critical analysis', '', 'A counterargument would be that …', '', 'Introduce an opposing position fairly.', '⚔️'),
  classroomCoursePhrase('advanced', '08', 'Critical analysis', '', 'This distinction is significant because …', '', 'Explain why a difference matters.', '📌'),
  classroomCoursePhrase('advanced', '09', 'Professional seminar', '', 'Could we return to the central question?', '', 'Bring a discussion back to its purpose.', '🎯'),
  classroomCoursePhrase('advanced', '10', 'Professional seminar', '', 'Would you be willing to reconsider that proposal?', '', 'Invite a change of position diplomatically.', '🤝'),
  classroomCoursePhrase('advanced', '11', 'Professional seminar', '', 'On balance, I would recommend proceeding with caution.', '', 'Give a measured recommendation.', '⚖️'),
  classroomCoursePhrase('advanced', '12', 'Professional seminar', '', 'Let me summarise the action points before we close.', '', 'Close a meeting with a precise summary.', '📝'),
];
