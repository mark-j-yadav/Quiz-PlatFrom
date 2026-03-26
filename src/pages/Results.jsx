import { useQuiz } from '../context/QuizContext'
import { useNavigate } from 'react-router-dom'

export default function Results() {
  const { state, dispatch } = useQuiz()
  const navigate = useNavigate()

  const percentage = Math.round((state.score / (state.questions.length * 10)) * 100)

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="bg-zinc-900 rounded-3xl p-12 border border-zinc-700">
        <h1 className="text-5xl font-bold mb-2">Quiz Completed!</h1>
        <p className="text-2xl text-zinc-400 mb-10">Your Score</p>

        <div className="text-8xl font-bold text-violet-400 mb-4">{state.score}</div>
        <div className="text-xl text-zinc-400">out of {state.questions.length * 10}</div>

        <div className="my-10 h-3 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-violet-500 transition-all" style={{ width: `${percentage}%` }}></div>
        </div>

        <div className="flex justify-center gap-8 text-center mb-12">
          <div>
            <div className="text-4xl font-bold">{percentage}%</div>
            <div className="text-sm text-zinc-400">Accuracy</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{state.timeTaken}s</div>
            <div className="text-sm text-zinc-400">Time Taken</div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              dispatch({ type: 'RESET_QUIZ' })
              navigate('/')
            }}
            className="flex-1 py-6 bg-zinc-800 hover:bg-zinc-700 rounded-2xl font-semibold"
          >
            Play Again
          </button>
          <button
            onClick={() => navigate('/leaderboard')}
            className="flex-1 py-6 bg-violet-600 hover:bg-violet-500 rounded-2xl font-semibold"
          >
            See Leaderboard
          </button>
        </div>
      </div>
    </div>
  )
}