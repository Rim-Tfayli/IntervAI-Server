import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import BackLink from "../components/BackLink";

function StartInterview(){
    const [role, setRole] = useState("");
    const [about, setAbout] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        setError("");
        setLoading(true);

        try{
            const response = await api.post("interviews/", { role, about });
            navigate(`/interview/${response.data.interview._id}/session`, {
                state: { responses: response.data.responses }
            });
        } 
        catch(err){
            setError(err.response?.data?.message || "Something went wrong");
            setLoading(false);
        }
    }
    return(
        <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
            <div className="min-h-screen bg-orange-50 px-4 py-6">
                <BackLink to="/dashboard" />
                <div className="w-full max-w-md bg-white border border-orange-100 rounded-2xl p-8 shadow-sm">
                    <div className="mb-6">
                        <h1 className="text-stone-900 font-semibold text-lg">Start a new interview</h1>
                        <p className="text-stone-500 text-sm mt-1">10 questions, generated for you</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-stone-600 text-xs font-medium block mb-1.5">Role</label>
                            <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-orange-50/50 border border-orange-100 rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-orange-500 focus:bg-white transition-colors"
                            placeholder="Backend Developer"
                            />
                        </div>

                        <div>
                            <label className="text-stone-600 text-xs font-medium block mb-1.5">About</label>
                            <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            rows="3"
                            className="w-full bg-orange-50/50 border border-orange-100 rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-orange-500 focus:bg-white transition-colors resize-none"
                            placeholder="Node.js, Express, MongoDB, REST APIs  -  Junior Level"
                            />
                            <p className="text-xs text-stone-400 mt-1.5">
                                Tip: mention your experience level (intern, junior, mid, senior) for more accurate question difficulty.
                            </p>
                        </div>

                        {error && <p className="text-red-600 text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-medium text-sm py-2.5 rounded-lg transition-colors mt-2 shadow-sm shadow-orange-600/20"
                        >
                            {loading ? "Generating your questions..." : "Start interview"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StartInterview;