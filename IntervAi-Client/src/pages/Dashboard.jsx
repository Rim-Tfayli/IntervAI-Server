import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function Dashboard(){
    const [stats, setStats] = useState(null);
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    function handleLogout(){
        logout();
        navigate("/login");
    }

    async function handleDelete(interviewId, e){
        e.preventDefault();
        e.stopPropagation();

        if(!window.confirm("Delete this interview? This can't be undone.")){
            return;
        }
        try{
            await api.delete(`interviews/${interviewId}`);
            setInterviews((prev) => prev.filter((i) => i._id !== interviewId));
        } 
        catch(err){
            console.error("Failed to delete interview:", err);
        }
    }
    
    useEffect(() => {
        async function fetchDashboardData(){
            try{
                const statsRes = await api.get("interviews/stats");
                const interviewsRes = await api.get("interviews");

                setStats(statsRes.data);
                setInterviews(interviewsRes.data.userInterviews);
            }
            catch(err){
                console.error("Failed to load dashboard:", err);
            }
            finally{
                setLoading(false);
            }
        }
        fetchDashboardData();
    }, []);
    if(loading){
        return <div className="min-h-screen bg-orange-50 flex items-center justify-center">Loading...</div>;
    }
    return(
        <div className="min-h-screen bg-orange-50 px-4 py-8">
            <div className="max-w-2xl mx-auto">

                <div className="flex items-center justify-between bg-white border border-orange-100 rounded-xl px-4 py-3 mb-6">
                    <span className="font-semibold text-stone-900">IntervAI</span>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-medium text-orange-700">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div> 
                        <Link to="/favorites" className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-orange-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            Favorites
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1.5 text-sm text-stone-500 border border-stone-200 rounded-md hover:text-red-500 hover:border-red-200 transition-colors"
                        >
                            Log out
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white border border-orange-100 rounded-xl p-4">
                        <div className="text-stone-500 text-sm">Interviews completed</div>
                        <div className="text-2xl font-semibold mt-1 text-stone-900">{stats.interviewCount}</div>
                    </div>
                    <div className="bg-white border border-orange-100 rounded-xl p-4">
                        <div className="text-stone-500 text-sm">Average score</div>
                        <div className="text-2xl font-semibold mt-1 text-stone-900">{stats.averageScore.toFixed(1)} / 10</div>
                    </div>
                </div>

                <Link
                to="/start-interview"
                className="block bg-white border border-orange-100 rounded-xl p-5 mb-6 hover:border-orange-300 transition-colors"
                >
                    <span className="font-medium text-stone-900">Start new interview</span>
                </Link>

                <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-stone-900 text-sm">Recent interviews</span>
                </div>

                {interviews.length === 0 ? (
                    <div className="text-center text-stone-400 text-sm border border-dashed border-orange-200 rounded-xl py-10">
                        You have no interviews yet. Start your first one!
                    </div>
                ):(
                    <div className="flex flex-col gap-2">
                        {interviews.map((interview) => (
                            <Link
                                key={interview._id}
                                to={`/interview/${interview._id}/review`}
                                className="flex items-center justify-between bg-white border border-orange-100 rounded-lg px-4 py-3 hover:border-orange-300 transition-colors"
                            >
                                <div>
                                    <div className="text-sm font-medium text-stone-900">{interview.role}</div>
                                    <div className="text-xs text-stone-500 mt-0.5">{interview.about}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {interview.overallScore !== null && (
                                        <div className="text-sm font-medium text-green-600">
                                            {interview.overallScore.toFixed(1)}
                                        </div>
                                    )}
                                    <button onClick={(e) => handleDelete(interview._id, e)} className="text-stone-400 hover:text-red-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;