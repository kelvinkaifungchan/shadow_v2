const hashFunction = require("../auth/hashFunction")

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('user').del()
      .then(async () => {
        // Inserts seed entries
        return knex('user').insert([{
          displayName: 'Test Wong',
          email: "test@test.com",
          passwordHash: await hashFunction.hashPassword("thisisatest"),
          picture: "https://static-s.aa-cdn.net/img/gp/20600014424487/UTpd6qixaabJJIKkkMixyqTq26NMnWoFJvgXXXEMf7aJGsR0lyYFYaLU9_TTP7kLGqI=s300?v=1"
        }, {
          displayName: 'User Philip',
          email: "user@user.com",
          passwordHash: await hashFunction.hashPassword("thisisauser"),
          picture: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress%2Cformat&ixlib=php-3.3.0"
        }, {
          displayName: 'John Cheng',
          email: "john@john.com",
          passwordHash: await hashFunction.hashPassword("thisisajohn"),
          picture: "https://i1.sndcdn.com/artworks-RJG4jIrv6lZwWkQH-cWi6nA-t500x500.jpg"
        }, {
          displayName: 'Jack Wynn',
          email: "jack@jack.com",
          passwordHash: await hashFunction.hashPassword("thisisajack"),
          picture: "https://s3.getstickerpack.com/storage/uploads/sticker-pack/cat-memes/sticker_3.png?c6e3e2eb120b5c81fe616d90bfbea285&d=200x200"
        }]);
      })
      .then(() => {
        return knex('tag').del();
      })
      .then(() => {
        return knex('tag').insert([{
          tagBody: "difficult",
        }, {
          tagBody: "easy"
        }, {
          tagBody: "veryeasy"
        }, {
          tagBody: "mediuma"
        }])
      })
      .then(() => {
        return knex('classroom').del();
      })
      .then(() => {
        return knex('classroom').insert([{
          user_id: 1,
          classroomTitle: "English101",
          classroomDesc: " this is English101",
          classroomStatus: true
        }, {
          user_id: 1,
          classroomTitle: "Korea101",
          classroomDesc: " this is Korea101",
          classroomStatus: true
        }, {
          user_id: 2,
          classroomTitle: "English101",
          classroomDesc: " this is English101",
          classroomStatus: true
        }, {
          user_id: 2,
          classroomTitle: "Japan101",
          classroomDesc: " this is Japan101",
          classroomStatus: true
        }])
      })
      .then(() => {
        return knex('classroom_user').del();
      })
      .then(() => {
        return knex('classroom_user').insert([{
          classroom_id: 1,
          sharedUser_id: 1
        }, {
          classroom_id: 1,
          sharedUser_id: 2
        }, {
          classroom_id: 2,
          sharedUser_id: 1
        }, {
          classroom_id: 2,
          sharedUser_id: 2
        }, {
          classroom_id: 3,
          sharedUser_id: 1
        }])
      })
      .then(() => {
        return knex('set').del();
      })
      .then(() => {
        return knex('set').insert([{
          user_id: 1,
          setTitle: "Test Wong's Set",
          setDesc: "This set was created by user 1 Test Wong",
          setStatus: true
        }, {
          user_id: 1,
          setTitle: "User Philip's Set",
          setDesc: "This set was created by user 2 User Phlip",
          setStatus: true
        }, {
          user_id: 1,
          setTitle: "John Cheng's Set",
          setDesc: "This set was created by user 3 John Cheng",
          setStatus: true
        }, {
          user_id: 1,
          setTitle: "Jack Wynn's Set",
          setDesc: "This set was created by user 4 Jack Wynn",
          setStatus: true
        }])
      })
      .then(() => {
        return knex('flashcard').del();
      })
      .then(() => {
        return knex('flashcard').insert([{
          user_id: 1,
          flashcardTitle: "Test Wong's flashCard",
          flashcardBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          flashcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/14bb4e8f-4af2-4c2e-9243-402460c17887",
          flashcardStatus: true,
        }, {
          user_id: 1,
          flashcardTitle: "User Chan's flashCard",
          flashcardBody: "SPEAK",
          flashcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169736469.webm",
          flashcardStatus: true,
        }, {
          user_id: 2,
          flashcardTitle: "User Philip's flashCard",
          flashcardBody: "This is the body text of User Philip's card.",
          flashcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169736469.webm",
          flashcardStatus: true,
        }, {
          user_id: 3,
          flashcardTitle: "John Cheng's flashCard",
          flashcardBody: "This is the body text of John Cheng's Card.",
          flashcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          flashcardStatus: true,
        }, {
          user_id: 4,
          flashcardTitle: "Jack Wynn's flashCard",
          flashcardBody: "This is the body text of Jack Wynn's Card.",
          flashcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          flashcardStatus: true,
        }])
      })
      .then(() => {
        return knex('flashcardSubmission').del();
      })
      .then(() => {
        return knex('flashcardSubmission').insert([{
          user_id: 1,
          flashcard_id: 1,
          flashcardSubmissionRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/14bb4e8f-4af2-4c2e-9243-402460c17887",
          flashcardSubmissionStatus: true
        }, {
          user_id: 2,
          flashcard_id: 1,
          flashcardSubmissionRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169736469.webm",
          flashcardSubmissionStatus: true
        }, {
          user_id: 3,
          flashcard_id: 2,
          flashcardSubmissionRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          flashcardSubmissionStatus: true
        }])
      })
      .then(() => {
        return knex('flashcardFeedback').del();
      })
      .then(() => {
        return knex('flashcardFeedback').insert([{
          user_id: 4,
          flashcardSubmission_id: 1,
          flashcardFeedbackBody: "Speak slower",
          flashcardFeedbackTime: "01:19",
          flashcardFeedbackStatus: true
        }, {
          user_id: 1,
          flashcardSubmission_id: 2,
          flashcardFeedbackBody: "Speak slower",
          flashcardFeedbackTime: "00:37",
          flashcardFeedbackStatus: true
        }, {
          user_id: 3,
          flashcardSubmission_id: 2,
          flashcardFeedbackBody: "Speak faster",
          flashcardFeedbackTime: "01:00",
          flashcardFeedbackStatus: true
        }])
      })
      .then(() => {
        return knex('quizcard').del();
      })
      .then(() => {
        return knex('quizcard').insert([{
          user_id: 1,
          quizcardTitle: "Test Wong's Quiz Card 1",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          quizcardStatus: true,
        }, {
          user_id: 1,
          quizcardTitle: "Test Wong's Quiz Card 2",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169736469.webm",
          quizcardStatus: true,
        }, {
          user_id: 1,
          quizcardTitle: "Test Wong's Quiz Card 3",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169736469.webm",
          quizcardStatus: true,
        }, {
          user_id: 2,
          quizcardTitle: "User Philip's Quiz Card 1",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/14bb4e8f-4af2-4c2e-9243-402460c17887",
          quizcardStatus: true,
        }, {
          user_id: 2,
          quizcardTitle: "User Philip's Quiz Card 2",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/14bb4e8f-4af2-4c2e-9243-402460c17887",
          quizcardStatus: true,
        }, {
          user_id: 3,
          quizcardTitle: "John Cheng's Quiz Card 1",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/14bb4e8f-4af2-4c2e-9243-402460c17887",
          quizcardStatus: true,
        }, {
          user_id: 3,
          quizcardTitle: "John Cheng's Quiz Card 2",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/14bb4e8f-4af2-4c2e-9243-402460c17887",
          quizcardStatus: true,
        }, {
          user_id: 4,
          quizcardTitle: "Jack Wynn's Quiz Card",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          quizcardStatus: true,
        }])
      })
      .then(() => {
        return knex('quizcardQuestion').del();
      })
      .then(() => {
        return knex('quizcardQuestion').insert([{
          quizcard_id: 1,
          questionType: "multipleChoice",
          questionTime: "00:02",
          questionBody: "What is this?",
          multipleChoiceA: "A",
          multipleChoiceB: "B",
          multipleChoiceC: "C",
          multipleChoiceD: "D",
          multipleChoiceAnswer: "A",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          quizcardStatus: true,
        }, {
          quizcard_id: 1,
          questionType: "MC",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169736469.webm",
          quizcardStatus: true,
        }, {
          user_id: 1,
          quizcardTitle: "Test Wong's Quiz Card 3",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169736469.webm",
          quizcardStatus: true,
        }, {
          user_id: 2,
          quizcardTitle: "User Philip's Quiz Card 1",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/14bb4e8f-4af2-4c2e-9243-402460c17887",
          quizcardStatus: true,
        }, {
          user_id: 2,
          quizcardTitle: "User Philip's Quiz Card 2",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/14bb4e8f-4af2-4c2e-9243-402460c17887",
          quizcardStatus: true,
        }, {
          user_id: 3,
          quizcardTitle: "John Cheng's Quiz Card 1",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/14bb4e8f-4af2-4c2e-9243-402460c17887",
          quizcardStatus: true,
        }, {
          user_id: 3,
          quizcardTitle: "John Cheng's Quiz Card 2",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/14bb4e8f-4af2-4c2e-9243-402460c17887",
          quizcardStatus: true,
        }, {
          user_id: 4,
          quizcardTitle: "Jack Wynn's Quiz Card",
          quizcardRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          quizcardStatus: true,
        }])
      })
      // .then(() => {
      //   return knex('multipleChoice').del();
      // })
      // .then(() => {
      //   return knex('multipleChoice').insert([{
      //     quizcard_id: 1,
      //     multipleChoiceBody: "Which one is apple?",
      //     multipleChoiceA: "fuckingA",
      //     multipleChoiceB: "fuckB",
      //     multipleChoiceC: "fuckC",
      //     multipleChoiceD: "fuckD",
      //     multipleChoiceAnswer: "A",
      //     multipleChoiceTime: "00:05",
      //     multipleChoiceStatus: true,
      //   }, {
      //     quizcard_id: 1,
      //     multipleChoiceBody: "Which one is apple?",
      //     multipleChoiceA: "fuckA",
      //     multipleChoiceB: "fuckingB",
      //     multipleChoiceC: "fuckC",
      //     multipleChoiceD: "fuckD",
      //     multipleChoiceAnswer: "A",
      //     multipleChoiceTime: "00:05",
      //     multipleChoiceStatus: true,
      //   }, {
      //     quizcard_id: 2,
      //     multipleChoiceBody: "Which one is apple?",
      //     multipleChoiceA: "fuckA",
      //     multipleChoiceB: "fuckB",
      //     multipleChoiceC: "fuckingC",
      //     multipleChoiceD: "fuckD",
      //     multipleChoiceAnswer: "A",
      //     multipleChoiceTime: "00:05",
      //     multipleChoiceStatus: true,
      //   }, {
      //     quizcard_id: 3,
      //     multipleChoiceBody: "Which one is apple?",
      //     multipleChoiceA: "fuckA",
      //     multipleChoiceB: "fuckB",
      //     multipleChoiceC: "fuckC",
      //     multipleChoiceD: "fuckDing",
      //     multipleChoiceAnswer: "A",
      //     multipleChoiceTime: "00:05",
      //     multipleChoiceStatus: true,
      //   }, {
      //     quizcard_id: 4,
      //     multipleChoiceBody: "Which one is apple?",
      //     multipleChoiceA: "fuckingA",
      //     multipleChoiceB: "fuckB",
      //     multipleChoiceC: "fuckC",
      //     multipleChoiceD: "fuckD",
      //     multipleChoiceAnswer: "A",
      //     multipleChoiceTime: "00:05",
      //     multipleChoiceStatus: true,
      //   }])
      // })
      // .then(() => {
      //   return knex('multipleChoiceSubmission').del();
      // })
      // .then(() => {
      //   return knex('multipleChoiceSubmission').insert([{
      //     user_id: 1,
      //     multipleChoice_id: 1,
      //     multipleChoiceSubmission: "A",
      //     multipleChoiceMarking: true,
      //     multipleChoiceStatus: true,
      //   }, {
      //     user_id: 1,
      //     multipleChoice_id: 1,
      //     multipleChoiceSubmission: "A",
      //     multipleChoiceMarking: true,
      //     multipleChoiceStatus: true,
      //   }, {
      //     user_id: 2,
      //     multipleChoice_id: 1,
      //     multipleChoiceSubmission: "A",
      //     multipleChoiceMarking: true,
      //     multipleChoiceStatus: true,
      //   }])
      // })
      // .then(() => {
      //   return knex('trueFalse').del();
      // })
      // .then(() => {
      //   return knex('trueFalse').insert([{
      //     quizcard_id: 1,
      //     trueFalseBody: "Is this an apple?",
      //     trueFalseAnswer: true,
      //     trueFalseTime: "00:05",
      //     trueFalseStatus: true,
      //   }, {
      //     quizcard_id: 1,
      //     trueFalseBody: "Is this an apple?",
      //     trueFalseAnswer: true,
      //     trueFalseTime: "00:05",
      //     trueFalseStatus: true,
      //   }, {
      //     quizcard_id: 2,
      //     trueFalseBody: "Is this an apple?",
      //     trueFalseAnswer: true,
      //     trueFalseTime: "00:05",
      //     trueFalseStatus: true,
      //   }])
      // })
      // .then(() => {
      //   return knex('trueFalseSubmission').del();
      // })
      // .then(() => {
      //   return knex('trueFalseSubmission').insert([{
      //     user_id: 1,
      //     trueFalse_id: 1,
      //     trueFalseSubmission: true,
      //     trueFalseMarking: true,
      //     trueFalseSubmissionStatus: true,
      //   }, {
      //     user_id: 2,
      //     trueFalse_id: 2,
      //     trueFalseSubmission: false,
      //     trueFalseMarking: true,
      //     trueFalseSubmissionStatus: true,
      //   }, {
      //     user_id: 2,
      //     trueFalse_id: 2,
      //     trueFalseSubmission: true,
      //     trueFalseMarking: false,
      //     trueFalseSubmissionStatus: true,
      //   }])
      // })
      .then(() => {
        return knex('dictationcard').del();
      })
      .then(() => {
        return knex('dictationcard').insert([{
          user_id: 1,
          dictationcardTitle: "testwong Dictation Card1",
          dictationcardStatus: true,
        }, {
          user_id: 1,
          dictationcardTitle: "testwong Dictation Card2",
          dictationcardStatus: true,
        }, {
          user_id: 2,
          dictationcardTitle: "user2 Dictation's Card1",
          dictationcardStatus: true,
        }, {
          user_id: 3,
          dictationcardTitle: "user3 Dictations Card1",
          dictationcardStatus: true,
        }, {
          user_id: 4,
          dictationcardTitle: "user 4 Dictation Card1",
          dictationcardStatus: true,
        }])
      })
      .then(() => {
        return knex('dictation').del();
      })
      .then(() => {
        return knex('dictation').insert([{
          user_id: 1,
          dictationcard_id: 1,
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 1,
          dictationcard_id: 2,
          dictationBody: "please write down the following word",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 2,
          dictationcard_id: 2,
          dictationBody: "please write down the following word",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 3,
          dictationcard_id: 3,
          dictationBody: "please write down the following word",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }, {
          user_id: 4,
          dictationcard_id: 4,
          dictationBody: "please write down the following word",
          dictationRecording: "https://shadowvideo.s3.ap-southeast-1.amazonaws.com/1629169637786.webm",
          dictationStatus: true,
        }])
      })
      .then(() => {
        return knex('dictationSubmission').del();
      })
      .then(() => {
        return knex('dictationSubmission').insert([{
          user_id: 1,
          dictation_id: 1,
          dictationSubmissionPath: "https://mk0designbombsg12amh.kinstacdn.com/wp-content/uploads/2016/05/rochester.png",
          dictationSubmissionStatus: true
        }, {
          user_id: 2,
          dictation_id: 1,
          dictationSubmissionPath: "https://mk0designbombsg12amh.kinstacdn.com/wp-content/uploads/2016/05/rochester.png",
          dictationSubmissionStatus: true
        }, {
          user_id: 3,
          dictation_id: 1,
          dictationSubmissionPath: "https://mk0designbombsg12amh.kinstacdn.com/wp-content/uploads/2016/05/rochester.png",
          dictationSubmissionStatus: true
        }, {
          user_id: 4,
          dictation_id: 1,
          dictationSubmissionPath: "https://mk0designbombsg12amh.kinstacdn.com/wp-content/uploads/2016/05/rochester.png",
          dictationSubmissionStatus: true
        }, {
          user_id: 1,
          dictation_id: 2,
          dictationSubmissionPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0d1lO6pGGgzEaGYV6QIPQrH_ZPGxuIaBxYrJeAneAMobRGSw5BbvhLmr3DM2AXGbPQ&usqp=CAU",
          dictationSubmissionStatus: true
        }, {
          user_id: 2,
          dictation_id: 2,
          dictationSubmissionPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0d1lO6pGGgzEaGYV6QIPQrH_ZPGxuIaBxYrJeAneAMobRGSw5BbvhLmr3DM2AXGbPQ&usqp=CAU",
          dictationSubmissionStatus: true
        }, {
          user_id: 3,
          dictation_id: 2,
          dictationSubmissionPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0d1lO6pGGgzEaGYV6QIPQrH_ZPGxuIaBxYrJeAneAMobRGSw5BbvhLmr3DM2AXGbPQ&usqp=CAU",
          dictationSubmissionStatus: true
        }, {
          user_id: 4,
          dictation_id: 2,
          dictationSubmissionPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi0d1lO6pGGgzEaGYV6QIPQrH_ZPGxuIaBxYrJeAneAMobRGSw5BbvhLmr3DM2AXGbPQ&usqp=CAU",
          dictationSubmissionStatus: true
        }])
      })
      .then(() => {
        return knex('dictationFeedback').del();
      })
      .then(() => {
        return knex('dictationFeedback').insert([{
          user_id: 4,
          dictationSubmission_id: 1,
          dictationFeedbackBody: "Stroke wrong",
          dictationFeedbackStatus: true
        }, {
          user_id: 1,
          dictationSubmission_id: 1,
          dictationFeedbackBody: "Stroke wrong",
          dictationFeedbackStatus: true
        }, {
          user_id: 3,
          dictationSubmission_id: 1,
          dictationFeedbackBody: "Stroke wrong",
          dictationFeedbackStatus: true
        }])
      })
      .then(() => {
        return knex('classroom_set').del();
      })
      .then(() => {
        return knex('classroom_set').insert([{
          classroom_id: 1,
          set_id: 1
        }, {
          classroom_id: 1,
          set_id: 2
        }, {
          classroom_id: 2,
          set_id: 4
        }, {
          classroom_id: 2,
          set_id: 3
        }, {
          classroom_id: 3,
          set_id: 4
        }])
      })
      .then(() => {
        return knex('set_flashcard').del();
      })
      .then(() => {
        return knex('set_flashcard').insert([{
          set_id: 1,
          flashcard_id: 1
        }, {
          set_id: 1,
          flashcard_id: 2
        }, {
          set_id: 2,
          flashcard_id: 1
        }, {
          set_id: 2,
          flashcard_id: 2
        }, {
          set_id: 3,
          flashcard_id: 1
        }])
      })
      .then(() => {
        return knex('set_quizcard').del();
      })
      .then(() => {
        return knex('set_quizcard').insert([{
          set_id: 1,
          quizcard_id: 1
        }, {
          set_id: 1,
          quizcard_id: 2
        }, {
          set_id: 2,
          quizcard_id: 1
        }, {
          set_id: 2,
          quizcard_id: 2
        }, {
          set_id: 3,
          quizcard_id: 1
        }])
      })
      .then(() => {
        return knex('set_dictationcard').del();
      })
      .then(() => {
        return knex('set_dictationcard').insert([{
          set_id: 1,
          dictationcard_id: 1
        }, {
          set_id: 1,
          dictationcard_id: 2
        }, {
          set_id: 2,
          dictationcard_id: 1
        }, {
          set_id: 2,
          dictationcard_id: 2
        }, {
          set_id: 3,
          dictationcard_id: 1
        }])
      })
      .then(() => {
        return knex('tag_classroom').del();
      })
      .then(() => {
        return knex('tag_classroom').insert([{
          tag_id: 1,
          classroom_id: 1
        }, {
          tag_id: 1,
          classroom_id: 2
        }, {
          tag_id: 2,
          classroom_id: 1
        }, {
          tag_id: 2,
          classroom_id: 2
        }, {
          tag_id: 3,
          classroom_id: 1
        }])
      })
      .then(() => {
        return knex('tag_set').del();
      })
      .then(() => {
        return knex('tag_set').insert([{
          tag_id: 1,
          set_id: 1,
        }, {
          tag_id: 2,
          set_id: 1,
        }, {
          tag_id: 1,
          set_id: 2,
        }, {
          tag_id: 2,
          set_id: 2,
        }, {
          tag_id: 1,
          set_id: 3,
        }])
      })
  };