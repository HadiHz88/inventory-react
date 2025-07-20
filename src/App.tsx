
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductList from './components/products/ProductList';
import Home from './pages/Home';
import NavBar from './components/partials/NavBar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
