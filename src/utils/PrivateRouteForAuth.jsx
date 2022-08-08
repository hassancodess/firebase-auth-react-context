import { Outlet, Navigate } from 'react-router-dom'
import { useUserAuth } from '../context/userAuthContext'
function PrivateRouteForAuth({ children }) {
  const { user } = useUserAuth()
  return <div>{user ? <Outlet /> : <Navigate to='/' />}</div>
}

export default PrivateRouteForAuth
