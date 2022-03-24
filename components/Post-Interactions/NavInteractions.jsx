import React from "react";
import { AiFillDislike, AiFillLike, } from 'react-icons/ai';
import Button from "@/components/Post-Interactions/Button"

export default function NavInteractions() {
    return (
        <div className="flex text-slate-700">
        <nav className="flex sm:justify-around space-x-4">
            {[
                ['AiFillLike', '/like'],
                ['AiFillLike', '/dislike'],
                ['AiFillLike', '/comment'],

            ].map(([url, index]) => (
                <Button className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
                key={index} href={url} Icon={AiFillLike} />
            ))}
        </nav>
        </div>
    )
}