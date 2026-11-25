import { Link } from "react-router-dom";

function BackLink({ to, children = "Return to hub" }){
    return(
        <Link to={to} className="text-sm text-stone-400 hover:text-stone-800">
            ← {children}
        </Link>
    );
}

export default BackLink;