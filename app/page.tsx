import QuizGame from "./components/QuizGame";
import { QuizProvider } from "./context/QuizContext";


const HomePage = () => {
  return (
    <QuizProvider>
      <QuizGame />
    </QuizProvider>
  );
};

export default HomePage;

