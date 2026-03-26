import { Link } from 'react-router-dom'
import { Trophy } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center text-xl font-bold">🧠</div>
          <h1 className="text-2xl font-bold tracking-tight text-white">QuizMaster</h1>
        </Link>
        
        <div className="flex items-center gap-8">
          <Link to="/" className="hover:text-violet-400 transition-colors">Home</Link>
          <Link to="/leaderboard" className="flex text-white items-center gap-2 hover:text-violet-400 transition-colors">
            <Trophy size={20} />
            Leaderboard
          </Link>
        </div>
      </div>
    </nav>
  )
}