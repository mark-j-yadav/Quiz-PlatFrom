import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import Leaderboard from './pages/Leaderboard'
import { QuizProvider } from './context/QuizContext'

function App() {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-zinc-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </QuizProvider>
  )
}

export default App