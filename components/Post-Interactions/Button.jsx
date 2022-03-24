import React from "react";

export default function Button({ text, Icon}) {
    return (
        <div>
            <button onClick={() => alert("test")}>            
                <Icon className="h-7 text-gray-100" />
            </button>
        </div>
    )
}