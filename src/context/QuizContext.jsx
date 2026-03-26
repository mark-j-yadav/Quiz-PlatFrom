import { createContext, useContext, useReducer } from 'react'

const QuizContext = createContext()

const initialState = {
  currentQuestion: 0,
  score: 0,
  answers: [],
  timeTaken: 0,
  quizStarted: false,
  quizCompleted: false,
  selectedCategory: null,
  questions: [],
  leaderboard: JSON.parse(localStorage.getItem('leaderboard')) || []
}

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...state,
        selectedCategory: action.payload.category,
        questions: action.payload.questions,
        currentQuestion: 0,
        score: 0,
        answers: [],
        timeTaken: 0,
        quizStarted: true,
        quizCompleted: false,
      }
    case 'ANSWER_QUESTION':
      const newAnswers = [...state.answers]
      newAnswers[state.currentQuestion] = action.payload
      return {
        ...state,
        answers: newAnswers,
        score: action.payload.isCorrect ? state.score + 10 : state.score,
      }
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      }
    case 'FINISH_QUIZ':
      const finalTime = action.payload.timeTaken
      const newScore = {
        name: "You",
        score: state.score,
        category: state.selectedCategory.name,
        time: finalTime,
        date: new Date().toLocaleDateString()
      }
      const updatedLeaderboard = [...state.leaderboard, newScore]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
      
      localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard))
      
      return {
        ...state,
        quizCompleted: true,
        timeTaken: finalTime,
        leaderboard: updatedLeaderboard
      }
    case 'RESET_QUIZ':
      return initialState
    default:
      return state
  }
}

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => useContext(QuizContext)