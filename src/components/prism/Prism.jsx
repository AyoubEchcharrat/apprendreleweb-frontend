/* 'use client'

import { useEffect } from 'react';
import './prismcss.css'

export default function PrismComp() {
    useEffect(() => {

        function formaterCode(input) {
            const result = input
                .replace('import', '<span class="import">import</span>')
                .replace('export', '<span class="export">export</span>')
                .replace('function', '<span class="function">function</span>')
                .replace('const', '<span class="var">const</span>')
                .replace('var', '<span class="var">var</span>')
                .replace('let', '<span class="var">let</span> ')
                .replace('return', '<span class="return">return</span>')
                .replace('<', '<span class="balise">&lt;</span>')
                .replace('>', '<span class="balise">&gt;</span>')
        
            return result;
        }

        const balisesCode = document.getElementsByTagName('code');

        for (let i = 0; i < 4; i++) {
            console.log(balisesCode[i].outerHTML);
            console.log(formaterCode(balisesCode[i].outerText));
            balisesCode[i].innerText = (formaterCode(balisesCode[i].outerText))
        }
    }, []);
    return <div></div>
} 

A CORRIGER IL FAUT TROUVER UNE SOLUTION, INNERHTML/INNERTEXT DANS LES DEUX CAS IL Y A BC DE PROBLEMES
*/