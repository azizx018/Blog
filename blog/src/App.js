import HomePage from './pages/HomePage';
import NavBar from './NavBar';
import About from './pages/About';
import ArticleListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <NavBar />
      <div id="page-body">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/articles" element={<ArticleListPage/>} />
          <Route path="/articles/:articleId" element={<ArticlePage/>} />
        </Routes>
      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
