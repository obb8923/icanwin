import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FightPage } from "./domain/fight/pages/FightPage";
import {RankPage} from "./domain/rank";
import {BottomNavigation} from "./shared/components/BottomNavigation";
import './App.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FightPage />} />
        <Route path="/rank" element={<RankPage />} />
      </Routes>
      <BottomNavigation />
    </BrowserRouter>
  )
}

export default App
