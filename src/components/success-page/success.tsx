import { useLocation } from "react-router-dom";
import styles from "./sucess.module.css";

const SuccessPage = () => {
  const location = useLocation();
  const { correctAnswers, totalQuestions } = location.state as {
    correctAnswers: number;
    totalQuestions: number;
  };

  return (
    <div className={styles.successContainer}>
      <h2 className={styles.title}>Quiz Completed!</h2>
      <p className={styles.result}>
        You answered {correctAnswers} out of {totalQuestions} questions
        correctly.
      </p>
      <button
        className={styles.tryAgainBtn}
        onClick={() => (window.location.href = "/")}
      >
        Try Again
      </button>
    </div>
  );
};

export default SuccessPage;
