import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Hero(){
    const { token } = useAuth();

    if(token){
        return <Navigate to="/dashboard" replace />;
    }

    return(
        <div className="min-h-screen bg-orange-50 flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 max-w-5xl w-full mx-auto">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">IA</span>
                    </div>
                    <span className="font-semibold text-stone-900">IntervAI</span>
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/login" className="text-sm text-stone-600 hover:text-orange-600 transition-colors">
                        Log in
                    </Link>
                    <Link
                        to="/register"
                        className="text-sm bg-orange-600 hover:bg-orange-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                        Get started
                    </Link>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center px-6">
                <div className="max-w-lg text-center">
                    <h1 className="text-4xl font-semibold text-stone-900 leading-tight">
                        Walk into your next interview
                        <span className="text-orange-600"> already prepared</span>
                    </h1>
                    <p className="text-stone-500 mt-4 leading-relaxed">
                        Tell IntervAI the role you're going for. Get a real mock interview,
                        instant feedback on every answer, and a personal library of the
                        questions worth remembering.
                    </p>

                    <div className="flex items-center justify-center gap-3 mt-8">
                        <Link
                        to="/register"
                        className="bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm px-6 py-3 rounded-lg transition-colors shadow-sm shadow-orange-600/20"
                        >
                        Start practicing
                        </Link>
                        <Link
                        to="/login"
                        className="bg-white border border-orange-100 hover:border-orange-300 text-stone-700 font-medium text-sm px-6 py-3 rounded-lg transition-colors"
                        >
                        I already have an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;