import { useState, useEffect } from 'react'
import { useQuiz } from '../context/QuizContext'
import { useNavigate } from 'react-router-dom'
import { Timer, ArrowRight } from 'lucide-react'

export default function Quiz() {
  const { state, dispatch } = useQuiz()
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(20)
  const [selectedOption, setSelectedOption] = useState(null)

  const currentQ = state.questions[state.currentQuestion]

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext()
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft, state.currentQuestion])

  const handleAnswer = (index) => {
    setSelectedOption(index)
    const isCorrect = index === currentQ.correct
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: { questionId: currentQ.id, selected: index, isCorrect }
    })
  }

  const handleNext = () => {
    if (state.currentQuestion + 1 < state.questions.length) {
      dispatch({ type: 'NEXT_QUESTION' })
      setTimeLeft(20)
      setSelectedOption(null)
    } else {
      dispatch({ type: 'FINISH_QUIZ', payload: { timeTaken: 20 * state.questions.length - timeLeft } })
      navigate('/results')
    }
  }

  if (!state.quizStarted) return null

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-700">
        {/* Progress */}
        <div className="flex justify-between mb-8">
          <div className="text-sm font-medium">
            Question {state.currentQuestion + 1} / {state.questions.length}
          </div>
          <div className="flex items-center gap-2 text-orange-400">
            <Timer size={18} />
            <span className="font-mono">{timeLeft}s</span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-10 leading-relaxed">
          {currentQ.question}
        </h2>

        <div className="space-y-4">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-6 rounded-2xl border text-lg transition-all
                ${selectedOption === index 
                  ? index === currentQ.correct 
                    ? 'bg-green-600 border-green-500' 
                    : 'bg-red-600 border-red-500'
                  : 'hover:bg-zinc-800 border-zinc-700'
                }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="mt-12 w-full bg-white text-black py-5 rounded-2xl font-semibold text-xl flex items-center justify-center gap-3 disabled:opacity-40"
        >
          {state.currentQuestion + 1 === state.questions.length ? 'Finish Quiz' : 'Next Question'}
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}