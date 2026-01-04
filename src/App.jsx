import { Routes, Route } from 'react-router-dom';
import WebinarList from './pages/WebinarList';
import WebinarDetail from './pages/WebinarDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
      <Routes>
        <Route path="/" element={<WebinarList />} />
        <Route path="/webinars/:id" element={<WebinarDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;