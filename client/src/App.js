import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PracticeScreen from './pages/PracticeScreen';
import RankScreen from './pages/RankScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PracticeScreen />} />
        <Route path="/rank/:score" element={<RankScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
