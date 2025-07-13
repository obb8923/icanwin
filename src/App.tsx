import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FightPage } from "./domain/fight/pages/FightPage";
import BottomNavigation from "./shared/components/BottomNavigation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FightPage />} />
      </Routes>
      <BottomNavigation />
    </BrowserRouter>
  )
}

export default App
