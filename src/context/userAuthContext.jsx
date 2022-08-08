import { createContext, useContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../../firebase.config'

const userAuthContext = createContext()

function UserAuthContextProvider({ children }) {
  // States
  const [user, setUser] = useState({})

  // Functions
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (name, email, password) => {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user.user, { displayName: name })
    return user
  }

  const logOut = () => {
    signOut(auth)
  }

  // useEffect

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log('Current User', currentUser)
      setUser(currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  //   Values to Export
  const values = {
    user,
    logIn,
    signUp,
    logOut,
  }
  //   Provider
  return (
    <userAuthContext.Provider value={values}>
      {children}
    </userAuthContext.Provider>
  )
}

function useUserAuth() {
  return useContext(userAuthContext)
}

export { userAuthContext, useUserAuth, UserAuthContextProvider }
