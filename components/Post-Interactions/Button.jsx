import React from "react";

export default function Button({ className, text, Icon}) {
    return (
        <div>
            <button classname={className} >            
                <Icon className="h-7 text-gray-100" />
            </button>
        </div>
    )
}