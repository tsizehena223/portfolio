import React from 'react';
import { KEYWORDS } from "../../data/data.js";

export default function Banner({ lang = 'en' }) {
    const keywordsList = KEYWORDS[lang] || KEYWORDS.en || KEYWORDS;

    return (
        <div className="flex justify-center border-y border-black/10 bg-black py-3" aria-hidden="true">
            <div className="w-full max-w-6xl overflow-hidden text-white">
                <div className="marquee flex w-max gap-8 whitespace-nowrap font-mono text-[10px] uppercase tracking-[.2em]">
                    {keywordsList.concat(keywordsList).map((keyword, index) => (
                        <React.Fragment key={`${keyword}-${index}`}>
                            <span className="text-md md:text-lg">
                                {keyword}
                            </span>
                            <span className="text-md md:text-lg text-white/50">
                                |
                            </span>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}