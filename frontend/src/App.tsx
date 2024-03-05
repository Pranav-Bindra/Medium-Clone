import './App.css'
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublishBlog } from './pages/PublishBlog';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/signup" element = {<Signup></Signup>}></Route>
          <Route path = "/signin" element = {<Signin></Signin>}></Route>
          <Route path = "/blog/:id" element = {<Blog></Blog>}></Route>
          <Route path = "/blogs" element = {<Blogs></Blogs>}></Route>
          <Route path = "/publish" element = {<PublishBlog></PublishBlog>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
