function ScoreBadge({ score }){
    return(
        <span className="bg-orange-100 text-orange-700 text-sm font-medium px-3 py-1 rounded-md whitespace-nowrap">
            {score} / 10
        </span>
    );
}

export default ScoreBadge;