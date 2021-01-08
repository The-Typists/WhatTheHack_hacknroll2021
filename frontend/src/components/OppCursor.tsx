import React, {useEffect, useState} from "react";

export function OppCursor({playerPtr, character, opp}: any) {
    // if any of the other elements equal mine, then i add them:
    let others = opp.slice(1,opp.length)
    console.log("opp sliced:", others)
    let markers = others.map((elem: number) => {
        if(elem == playerPtr) {
            return <span>|</span>
        }
    })

    return <span style={{backgroundColor:"red"}}>
        {markers}
        {character} 
        {markers}
        </span>
}