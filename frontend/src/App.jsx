import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Phones from "./pages/Phones";
import Panel from "./pages/Panel";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider } from "./context/auth.context";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/phones" element={<Phones />} />
                    <Route path="/panel" element={<Panel />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;