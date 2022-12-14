// Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Components
import Navbar from './components/Navbar'
// Pages
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'
// Private Routes
import PrivateRouteForAuth from './utils/PrivateRouteForAuth'
import PrivateRouteForNonAuth from './utils/PrivateRouteForNonAuth'
// Context
import { UserAuthContextProvider } from './context/userAuthContext'
// App
function App() {
  return (
    <UserAuthContextProvider>
      <Router>
        <div className='container max-w-7xl mx-auto pt-3'>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route element={<PrivateRouteForAuth />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route element={<PrivateRouteForNonAuth />}>
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/sign-up' element={<SignUp />} />
            </Route>
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </UserAuthContextProvider>
  )
}

export default App
