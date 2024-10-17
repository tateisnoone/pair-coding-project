import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./card.module.css";

type Variant = {
  id: number;
  name: string;
  isCorrect: boolean;
};

type QuestionProps = {
  id: number;
  name: string;
  variants: Variant[];
};

type QuizProps = {
  id: number;
  name: string;
  questions: QuestionProps[];
};

const QuizComponent: React.FC<{ quiz: QuizProps }> = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const navigate = useNavigate();

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerChange = (variantId: number) => {
    setSelectedAnswer(variantId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAnswer !== null) {
      if (
        currentQuestion.variants.find((v) => v.id === selectedAnswer)?.isCorrect
      ) {
        setCorrectAnswers(correctAnswers + 1);
      }

      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null); // Reset selected answer
      } else {
        // Quiz completed, navigate to success page
        navigate("/success", {
          state: { correctAnswers, totalQuestions: quiz.questions.length },
        });
      }
    } else {
      alert("Please select an answer before submitting.");
    }
  };

  return (
    <div className={styles.quizContainer}>
      <h2>{quiz.name}</h2>
      <QuestionComponent
        id={currentQuestion.id}
        name={currentQuestion.name}
        variants={currentQuestion.variants}
        selectedAnswer={selectedAnswer}
        handleAnswerChange={handleAnswerChange}
      />
      <button onClick={handleSubmit} className={styles.submitBtn}>
        Submit
      </button>
    </div>
  );
};

const QuestionComponent: React.FC<{
  id: number;
  name: string;
  variants: Variant[];
  selectedAnswer: number | null;
  handleAnswerChange: (variantId: number) => void;
}> = ({ id, name, variants, selectedAnswer, handleAnswerChange }) => {
  return (
    <div className={styles.questionContainer}>
      <h3>{name}</h3>
      <form>
        {variants.map((variant) => (
          <div>
            <label
              htmlFor={`question-${id}`}
              key={variant.id}
              className={selectedAnswer === variant.id ? styles.selected : ""}
            />
            <input
              type="radio"
              name={`question-${id}`}
              value={variant.id}
              onChange={() => handleAnswerChange(variant.id)}
              checked={selectedAnswer === variant.id}
            />
            {variant.name}
          </div>
        ))}
      </form>
    </div>
  );
};

export default QuizComponent;
