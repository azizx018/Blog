import HomePage from './pages/HomePage';
import NavBar from './NavBar';
import About from './pages/About';
import ArticleListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';

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
          <Route path="*" element={<NotFoundPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="create-account" element={<CreateAccountPage/>}/>
        </Routes>
      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
