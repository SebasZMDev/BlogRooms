import './ComStyles.css';
import { useState } from 'react';
import FrasesJSON from './frases.json';



const Frases = () => {
    const [Frase, setFrase] = useState<string[]>([]);
    const FraseRandom = () => {
        const randomFrases = Array.from({ length: 3 }, () => {
            const randomIndex = Math.floor(Math.random() * FrasesJSON.length);
            return FrasesJSON[randomIndex].text;
        });
        setFrase(randomFrases);
    };
    return (
        <div onClick={FraseRandom} className='frases-container '>
            <strong>Frases del día:</strong>
            1: {Frase[0]}<br/>
            2: {Frase[1]}<br/>
            3: {Frase[2]}
        </div>
    );
}

export default Frases;
