import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { AllBlogs } from "./pages/Blogs";
import { Publish } from './pages/Publish';
import { MyBlogs } from './pages/MyBlogs';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;