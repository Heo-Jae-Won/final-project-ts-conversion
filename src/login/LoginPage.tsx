import { Route, Routes } from "react-router-dom"
import LoginFindId from "./LoginFindId"
import LoginFindPass from "./LoginFindPass"
import LoginForm from "./LoginForm"
import LoginRegister from "./LoginRegister"
import LoginRestore from "./LoginRestore"

/**
 * 로그인에 관한 routing
 */
const LoginPage = () => {

  return (
    <div>
      <Routes>
        <Route path="/form" element={<LoginForm/>} />
        <Route path="/register" element={<LoginRegister/>} />
        <Route path="/restore/:userId" element={<LoginRestore/>} />
        <Route path="/findPass" element={<LoginFindPass/>} />
        <Route path="/findId" element={<LoginFindId/>} />
      </Routes>
    </div>
  )
}

export default LoginPage