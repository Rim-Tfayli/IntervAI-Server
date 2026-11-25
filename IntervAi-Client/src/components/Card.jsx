function Card({ children, className = "" }){
    return(
        <div className={`bg-white border border-orange-100 rounded-xl p-5 ${className}`}>
            {children}
        </div>
    );
}

export default Card;