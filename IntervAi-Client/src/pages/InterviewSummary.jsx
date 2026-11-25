import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function InterviewSummary(){
    const { id } = useParams();
    const [interview, setInterview] = useState(null);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchInterview(){
            try{
                const response = await api.get(`interviews/${id}`);
                setInterview(response.data.interview);
                setResponses(response.data.responses);
            }
            catch(err){
                console.error("Failed to load interview summary:", err);
            }
            finally{
                setLoading(false);
            }
        }
        fetchInterview();
    }, [id]);

    if(loading){
        return <div className="min-h-screen bg-orange-50 flex items-center justify-center">Loading...</div>;
    }

    if(!interview){
        return <div className="min-h-screen bg-orange-50 flex items-center justify-center">Interview not found.</div>;
    }

    return(
        <div className="min-h-screen bg-orange-50 px-4 py-8">
            <div className="max-w-lg mx-auto">

                <div className="text-center mb-7">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-green-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                    <h1 className="text-stone-900 font-semibold text-lg mt-3.5">Interview complete</h1>
                    <div className="text-3xl font-semibold text-stone-900 mt-2">
                        {interview.overallScore?.toFixed(1)} <span className="text-base font-normal text-stone-400">/ 10</span>
                    </div>
                    <p className="text-sm text-stone-500 mt-1">{interview.role} - {interview.about}</p>
                </div>

                <div className="flex flex-col gap-1.5 mb-6">
                    {responses.map((response, index) => (
                        <div
                        key={response._id}
                        className="flex items-center justify-between bg-white border border-orange-100 rounded-lg px-3.5 py-2.5"
                        >
                            <span className="text-sm text-stone-700 pr-3">Q{index + 1} — {response.question}</span>
                            <span className="text-sm font-medium text-orange-700 whitespace-nowrap">{response.score}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    <Link
                        to={`/interview/${id}/review`}
                        className="w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm py-2.5 rounded-lg transition-colors"
                    >
                        Review interview
                    </Link>
                    <Link
                        to="/start-interview"
                        className="w-full text-center bg-white border border-orange-100 hover:border-orange-300 text-stone-700 font-medium text-sm py-2.5 rounded-lg transition-colors"
                    >
                        Start another interview
                    </Link>
                    <Link
                        to="/dashboard"
                        className="w-full text-center text-orange-600 hover:text-orange-800 text-sm py-2"
                    >
                        Return to hub
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default InterviewSummary;