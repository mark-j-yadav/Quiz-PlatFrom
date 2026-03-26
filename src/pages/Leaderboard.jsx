import { useQuiz } from '../context/QuizContext'
import { Trophy } from 'lucide-react'

export default function Leaderboard() {
  const { state } = useQuiz()

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Trophy size={36} className="text-yellow-400" />
        <h1 className="text-4xl font-bold">Leaderboard</h1>
      </div>

      <div className="bg-zinc-900 rounded-3xl border border-zinc-700 overflow-hidden">
        {state.leaderboard.length === 0 ? (
          <p className="text-center py-20 text-zinc-400">No scores yet. Be the first!</p>
        ) : (
          state.leaderboard.map((entry, index) => (
            <div key={index} className="flex items-center justify-between px-8 py-6 border-b border-zinc-700 last:border-none">
              <div className="flex items-center gap-6">
                <span className="text-3xl font-bold text-zinc-500 w-8">{index + 1}</span>
                <div>
                  <p className="font-semibold">{entry.name}</p>
                  <p className="text-sm text-zinc-400">{entry.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-violet-400">{entry.score}</p>
                <p className="text-xs text-zinc-500">{entry.time}s • {entry.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}