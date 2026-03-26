import { useQuiz } from '../context/QuizContext'
import { quizData } from '../data/quizData'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const { dispatch } = useQuiz()
  const navigate = useNavigate()

  const startQuiz = (categoryKey) => {
    const category = quizData[categoryKey]
    dispatch({
      type: 'START_QUIZ',
      payload: { category: { name: category.name, key: categoryKey }, questions: category.questions }
    })
    navigate('/quiz')
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-4">Ready to Test Your Brain?</h1>
        <p className="text-xl text-zinc-400">Choose a category and start the quiz now!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.keys(quizData).map((key) => {
          const cat = quizData[key]
          return (
            <div
              key={key}
              onClick={() => startQuiz(key)}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-3xl p-8 cursor-pointer transition-all hover:scale-105"
            >
              <div className="text-5xl mb-6">{key === 'gk' ? '🌍' : key === 'science' ? '🔬' : '💻'}</div>
              <h3 className="text-3xl font-semibold mb-2">{cat.name}</h3>
              <p className="text-zinc-400">{cat.questions.length} Questions • 10 points each</p>
              <button className="mt-8 w-full bg-violet-600 hover:bg-violet-500 py-4 rounded-2xl font-medium transition-colors">
                Start Quiz →
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}