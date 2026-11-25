import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

import StarIcon from "../components/StarIcon";
import Card from "../components/Card";
import BackLink from "../components/BackLink";

function Favorites(){
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFavorites(){
            try{
                const response = await api.get("responses/favorites");
                setFavorites(response.data.favorites);
            } 
            catch(err){
                console.error("Failed to load favorites:", err);
            } 
            finally{
                setLoading(false);
            }
        }

        fetchFavorites();
    }, []);
    
    async function handleUnfavorite(id){
        try{
            await api.patch(`responses/${id}/favorite`);
            setFavorites((prev) => prev.filter((f) => f._id !== id));
        }
        catch(err){
            console.error("Failed to remove favorite:", err);
        }
    }

    if(loading){
        return <div className="min-h-screen bg-orange-50 flex items-center justify-center">Loading...</div>;
    }

    return(
        <div className="min-h-screen bg-orange-50 px-4 py-8">
            <div className="max-w-2xl mx-auto">

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <BackLink to="/dashboard" />
                        <h1 className="text-xl font-semibold text-stone-900 mt-3">Favorites</h1>
                    </div>
                    <span className="text-sm text-stone-500">{favorites.length} saved</span>
                </div>

                {favorites.length === 0 ? (
                    <div className="text-center text-stone-400 text-sm border border-dashed border-orange-200 rounded-xl py-14">
                        No favorites yet. Star a question during practice to save it here.
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {favorites.map((favorite) => (
                            <Card key={favorite._id}>
                                <div className="flex items-start justify-between gap-4 mb-2.5">
                                    <p className="text-stone-900 font-medium">{favorite.question}</p>
                                    <button
                                        onClick={() => handleUnfavorite(favorite._id)}
                                        className="flex-shrink-0 text-orange-600 hover:text-orange-400 transition-colors"
                                    >
                                        <StarIcon filled className="w-5 h-5" />s
                                    </button>
                                </div>
                                <p className="text-sm text-stone-600 leading-relaxed">{favorite.idealAnswer}</p>
                            </Card>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default Favorites;