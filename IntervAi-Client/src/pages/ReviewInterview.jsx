import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

import Card from "../components/Card";
import ScoreBadge from "../components/ScoreBadge";
import BackLink from "../components/BackLink";

function ReviewInterview(){
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
                console.error("Failed to load interview review:", err);
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

    return (
        <div className="min-h-screen bg-orange-50 px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-7">
                    <BackLink to="/dashboard" />

                    <h1 className="text-xl font-semibold text-stone-900 mt-4">
                        Interview review
                    </h1>

                    <p className="text-sm text-stone-500 mt-1">
                        {interview.role} - {interview.about}
                    </p>
                </div>

                <div className="flex flex-col gap-5">

                    {responses.map((response, index) => (
                        <Card key={response._id}>

                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <span className="text-xs text-orange-600 font-medium">
                                        QUESTION {index + 1}
                                    </span>

                                    <p className="text-stone-900 font-medium mt-1">
                                        {response.question}
                                    </p>
                                </div>

                                <ScoreBadge score={response.score} />
                            </div>

                            <div className="mb-5">
                                <p className="text-xs font-medium text-stone-500 mb-1.5">
                                    YOUR ANSWER
                                </p>

                                <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 rounded-lg p-3">
                                    {response.userAnswer}
                                </p>
                            </div>

                            <div className="mb-5">
                                <p className="text-xs font-medium text-stone-500 mb-1.5">
                                    AI FEEDBACK
                                </p>

                                <p className="text-sm text-stone-600 leading-relaxed">
                                    {response.aiFeedback}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-stone-500 mb-1.5">
                                    SUGGESTED ANSWER
                                </p>

                                <p className="text-sm text-stone-600 leading-relaxed bg-orange-50 rounded-lg p-3">
                                    {response.idealAnswer}
                                </p>
                            </div>
                        </Card>
                    ))}

                </div>

            </div>
        </div>
    );
}

export default ReviewInterview;