import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import CartList from './components/CartList/CartList';
import MainLayout from './Layouts/MainLayout';
import DescriptionPage from './pages/description/DescriptionPage';

import './App.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/cart-list" element={<CartList />} />
            <Route
              path="/description/:productId"
              element={<DescriptionPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
