import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try{
            const response = await api.post("auth/login", { email, password });
            login(response.data.token, response.data.user);
            navigate("/dashboard");
        }
        catch(err){
            console.log("LOGIN ERROR:", err);
        console.log("RESPONSE:", err.response);
        console.log("DATA:", err.response?.data);
            setError(err.response?.data?.message || "Something went wrong");
        }
    }

    return(
        <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white border border-orange-100 rounded-2xl p-8 shadow-sm">
                <div className="text-center mb-8">
                    <div className="w-11 h-11 bg-orange-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">IA</span>
                    </div>
                    <h1 className="text-stone-900 font-semibold text-xl">IntervAI</h1>
                    <p className="text-stone-500 text-sm mt-1.5">Log in to continue practicing</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-stone-600 text-xs font-medium block mb-1.5">Email</label>
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-orange-50/50 border border-orange-100 rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-orange-500 focus:bg-white transition-colors"
                        placeholder="name@example.com"
                        />
                    </div>

                    <div>
                        <label className="text-stone-600 text-xs font-medium block mb-1.5">Password</label>
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-orange-50/50 border border-orange-100 rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-orange-500 focus:bg-white transition-colors"
                        placeholder="Enter your password"
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm py-2.5 rounded-lg transition-colors mt-2 shadow-sm shadow-orange-600/20"
                    >
                        Log in
                    </button>
                </form>
                
                <p className="text-center text-stone-500 text-sm mt-6">
                    Don't have an account?
                <Link to="/register" className="text-orange-700 font-medium cursor-pointer hover:text-orange-800"> Register</Link>
                </p>
            </div>
        </div>
  );
}

export default Login;