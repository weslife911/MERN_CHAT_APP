import Navbar from "./components/Navbar"
import { Toaster } from "react-hot-toast"
import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"

function App() {

  const { getUser, isCheckingAuth, authUser } = useAuthStore();
  const auth_token = localStorage.getItem("auth_token");

  useEffect(() => {
    getUser();
  }, []);

  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen" >
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={authUser && auth_token ? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser && !auth_token ? <LoginPage/> : <Navigate to="/" />} />
        <Route path="/signup" element={authUser && !auth_token ? <SignUpPage/> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser && auth_token ? <ProfilePage/> : <Navigate to="/login" />} />
        <Route path="/settings" element={<SettingsPage/>} />
      </Routes>

      <Toaster/>
    </>
  )
}

export default App
