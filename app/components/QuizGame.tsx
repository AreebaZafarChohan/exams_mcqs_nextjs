"use client";
import React, { useContext, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import { questions } from "../data/questions";

const QuizGame = () => {
  const context = useContext(QuizContext);

  // Ensure context is available
  if (!context) {
    return <div>Error: Quiz context not found!</div>;
  }

  const { quizState, setQuizState, resetQuiz } = context;
  const { score, level, currentQuestionIndex } = quizState;
  const [answerStatus, setAnswerStatus] = useState<string | null>(null); // Holds the feedback for the answer (correct/incorrect)
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null); // Holds the correct answer

  const filteredQuestions = questions.filter((q) => q.level === level);
  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleAnswer = (option: string) => {
    const isCorrect = option === currentQuestion.answer;

    if (isCorrect) {
      setQuizState((prevState: any) => ({
        ...prevState,
        score: prevState.score + 1, // Increment score
      }));
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("incorrect");
      setCorrectAnswer(currentQuestion.answer);
    }

    // Move to the next question or change the level
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
      setQuizState((prevState: any) => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
      }));
    } else {
      // Update level when all questions are answered
      if (level === "easy") {
        setQuizState({ level: "medium", score, currentQuestionIndex: 0 });
      } else if (level === "medium") {
        setQuizState({ level: "hard", score, currentQuestionIndex: 0 });
      } else {
        setQuizState({ ...quizState, level: "completed" });
      }
    }
  };

  if (level === "completed") {
    return (
      <div className="font-serif flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold">Congratulations! ✨🌸👏🎉</h1>
        <p className="text-2xl text-green-500 py-4">Your final score is: {score}</p>
        <p className="text-lg black py-4 mx-36">"Assalam o Alaikum!

Mere piyare students, yaad rakho ke zindagi ka har imtihaan humein aur behtar banane ke liye hota hai. Apni mehnat aur hosle se har mushkil ko asaan bana lo. Tumhare ander woh taaqat hai jo kisi bhi challenge ko jeet sakti hai.

Kabhi hope lose mat karna, kyunke haar aur jeet sirf ek soch ka naam hai. Mehnat se jo cheez milti hai, uska maza alag hi hota hai. Bas apne upar bharosa rakho aur dua ke saath koshish mein koi kami mat chhoro.

Areeba Zafar (Student Leader) ki taraf se tum sab ko Best of Luck exams ke liye! Tum zarur kamyab hoge. Allah tumhare maqsad ko kamyabi se nawazay. 🌟✨

Duaon ke saath,
Areeba Zafar"</p>
        <button
          className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={resetQuiz}
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="font-serif flex flex-col items-center py-20 min-h-screen bg-gray-100 border m-20 rounded-lg shadow-lg">
      <p className="py-4">Prepared by: Areeba Zafar (Student Leader) Saturday 9 to 12</p>
<h1 className="text-4xl text-center font-bold pb-2 mb-4 border-b-4 border-purple-500 ">MCQS of Next.js for Exams Preparation</h1>
      <h2 className="text-2xl  font-bold">LEVEL: <span className="text-pink-600">{level.toUpperCase()}</span></h2>
      <h2 className="text-2xl mt-4">Question: {currentQuestion.question}</h2>
      <div className="mt-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`block w-full my-2 px-4 py-2 rounded ${
              answerStatus === "correct" && option === currentQuestion.answer
                ? "bg-blue-500" : answerStatus === "incorrect" && option === currentQuestion.answer
                ? "bg-blue-500"
                : "bg-blue-500"
            } text-white hover:bg-blue-600`}
          >
            <div className="flex gap-2">
            <span>{index + 1})</span> <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Feedback Section */}
      {answerStatus === "correct" && (
        <div className="mt-4 text-green-500">
          <p>Great job! You got the correct answer. ✨🌸👏🎉</p>
        </div>
      )}

      {answerStatus === "incorrect" && correctAnswer && (
        <div className="mt-4">
          <p className="text-red-500">Wrong answer!❌</p>
          <p className="text-yellow-500">The correct answer is: <span className="text-xl text-green-500">({correctAnswer})</span></p>
        </div>
      )}

      <p className="mt-4 text-2xl border px-12 py-2 border-blue-500 rounded-lg">Score: <span className="text-green-700">{score}</span></p>
    </div>
  );
};

export default QuizGame;
