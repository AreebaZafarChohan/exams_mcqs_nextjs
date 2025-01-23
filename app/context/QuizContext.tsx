"use client";
import { createContext, ReactNode, useState } from "react";

export const QuizContext = createContext<any>(null);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizState, setQuizState] = useState({
    score: 0,
    level: "easy",
    currentQuestionIndex: 0,
  });

  const resetQuiz = () => {
    setQuizState({
      score: 0,
      level: "easy",
      currentQuestionIndex: 0,
    });
  };

  return (
    <QuizContext.Provider value={{ quizState, setQuizState, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
