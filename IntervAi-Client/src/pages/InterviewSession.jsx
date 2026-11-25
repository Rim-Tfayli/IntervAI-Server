import { useState, useRef, useEffect  } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

import ScoreBadge from "../components/ScoreBadge";
import StarIcon from "../components/StarIcon";
import Card from "../components/Card";

function InterviewSession(){
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [responses] = useState(location.state?.responses || []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isRecording, setIsRecording] = useState(false);

    const recognitionRef = useRef(null);

    const currentQuestion = responses[currentIndex];

    console.log("location.state is:", location.state);

    async function handleSubmitAnswer(e){
        e.preventDefault();
        setError("");
        setLoading(true);

        try{
            console.log("Submitting for question:", currentQuestion._id);
            const response = await api.post("responses/", {
                responseId: currentQuestion._id,
                userAnswer: answer
            });
            setFeedback(response.data.response);
        }
        catch(err){
            setError(err.response?.data?.message || "Something went wrong");
        }
        finally{
            setLoading(false);
        } 
    }

    async function handleToggleFavorite(){
        try{
            const response = await api.patch(`responses/${feedback._id}/favorite`);
            setFeedback(response.data.response);
        } 
        catch(err){
            console.error("Failed to toggle favorite:", err);
        }
    }

    function handleNext(){
        if(currentIndex + 1 < responses.length){
            setCurrentIndex(currentIndex + 1);
            setAnswer("");
            setFeedback(null);
        }
        else{
            navigate(`/interview/${id}/summary`);
        }
    }

    function handleToggleRecording(){
       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
       if(!SpeechRecognition){
            alert("Voice input isn't supported in this browser. Try Chrome, or type your answer instead.");
            return;
        }

        if(isRecording){
            recognitionRef.current?.stop();
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;

        recognition.onstart = () => setIsRecording(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setAnswer((prev) => (prev ? prev + " " + transcript : transcript));
        };
 
        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsRecording(false);
        };

        recognition.onend = () => setIsRecording(false);

        recognitionRef.current = recognition;
        recognition.start();
    }

    useEffect(() => {
        if(currentQuestion && "speechSynthesis" in window){
            const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
            utterance.lang = "en-US";
            window.speechSynthesis.speak(utterance);
        }
        return () => {
            window.speechSynthesis.cancel();
        };
    }, [currentQuestion]);

    if(!currentQuestion){
        return <div className="min-h-screen bg-orange-50 flex items-center justify-center">No questions found.</div>;
    }

    return (
        <div className="min-h-screen bg-orange-50 px-4 py-8">
            <div className="max-w-xl mx-auto">

                <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-1 bg-orange-100 rounded-full overflow-hidden">
                        <div
                        className="h-full bg-orange-600 transition-all"
                        style={{ width: `${((currentIndex + 1) / responses.length) * 100}%` }}
                        />
                    </div>
                    <span className="text-xs text-stone-500 whitespace-nowrap">
                        Question {currentIndex + 1} of {responses.length}
                    </span>
                </div>

                {!feedback ? (
                <>
                    <div className="bg-white border border-orange-100 rounded-xl p-5 mb-4">
                        <p className="text-stone-900 font-medium">{currentQuestion.question}</p>
                    </div>

                    <form onSubmit={handleSubmitAnswer}>
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            rows="6"
                            className="w-full bg-white border border-orange-100 rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-orange-500 transition-colors resize-none mb-3"
                            placeholder="Type your answer here..."
                        />

                        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

                        <button
                            type="button"
                            onClick={handleToggleRecording}
                            className={`w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg transition-colors mb-3 ${
                                isRecording
                                ? "bg-red-50 text-red-600 border border-red-200"
                                : "bg-white border border-orange-100 text-stone-700 hover:border-orange-300"
                            }`}
                        >
                            {isRecording ? "🎙️ Listening..." : "🎤 Record answer"}
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-medium text-sm py-2.5 rounded-lg transition-colors"
                        >
                            {loading ? "Evaluating..." : "Submit answer"}
                        </button>
                    </form>
                </>
                ) : (
                <Card>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-stone-900">Your evaluation</span>
                        <ScoreBadge score={feedback.score} />

                    </div>

                    <p className="text-sm text-stone-600 leading-relaxed mb-4">{feedback.aiFeedback}</p>

                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-stone-900">Suggested answer</span>
                        <button
                            onClick={handleToggleFavorite}
                            className="flex items-center gap-1 text-xs text-stone-500 hover:text-orange-600 transition-colors"
                        >
                            <StarIcon filled={feedback.isFavorite} className={`w-4 h-4 ${feedback.isFavorite ? "text-orange-600" : ""}`} />

                            Save
                        </button>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed mb-5">{feedback.idealAnswer}</p>

                    <button
                    onClick={handleNext}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm py-2.5 rounded-lg transition-colors"
                    >
                        {currentIndex + 1 < responses.length ? "Next question" : "Finish interview"}
                    </button>
                </Card>
                )}

            </div>
        </div>
  );
}

export default InterviewSession;