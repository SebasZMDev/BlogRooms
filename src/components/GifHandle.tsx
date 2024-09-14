import { useFetch } from "../useFetch";
import './ComStyles.css';
import { IoMdClose, IoMdArrowRoundBack} from "react-icons/io";
import { useEffect, useState } from "react";

interface GiphyImage {
    url: string;
}
interface GiphyData {
    images: {
        original: GiphyImage;
    };
}
interface GiphyResponse {
    data: GiphyData[];
}

type Props = {
    isDisplay: boolean;
    onClose: () => void;
    selectGif: (gifURL: string) => void;
}

const GifHandle = ({ isDisplay, onClose, selectGif}: Props) => {
    const GiphyApiKey = 'dTTrs8c5LUucR6yfxNy7GhG0inrvbKCS';
    const [searchQuery, setSearchQuery] = useState<string>('');
    const limit = 12;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GiphyApiKey}&q=${searchQuery}&limit=${limit}`;
    const SugList: string[] = [
        "Felicidad",
        "Sorpresa",
        "Amor",
        "Confusión",
        "Bailando",
        "Celebración",
        "Despedida",
        "Dormir",
        "Frustración",
        "Motivación",
        "Cara de asombro",
        "Emoción",
        "Tristeza",
        "Risa",
        "Enojo",
        "Aburrimiento",
        "Divertido",
        "Aplausos",
        "Festejo",
        "Agradecimiento",
        "Nervios",
        "Relajación",
        "Inspiración",
        "Alegría"
    ];
    const [sugerencias, setSugerencias] = useState<string[]>([]);
    function getRandomElements(array: string[], count: number) {
        if (count > array.length) {
            throw new Error("El número de elementos deseado es mayor que el tamaño del array.");
        }
        // Crear una copia del array para no modificar el original
        const shuffled = array.slice().sort(() => 0.5 - Math.random());
        // Tomar los primeros 'count' elementos del array barajado
        setSugerencias(shuffled.slice(0, count))
    }
    function setSearch (item:string) {
        setSearchQuery(item)
    }

    const { data: gifData, loading: gifLoading, error: gifError } = useFetch(url) as {
        data: GiphyResponse | null;
        loading: boolean;
        error: Error | null;
    };



    useEffect(()=>{
        getRandomElements(SugList, 6)
    },[isDisplay])

    return (
        <div className="gif-container" style={{display:isDisplay?'':'none'}}>
            <div className="gif-container-bg"></div>
            <div className="gif-display">
                <div className="gif-input-display">
                    {searchQuery.length>1?
                    (<IoMdArrowRoundBack onClick={()=>setSearchQuery('')} className="gif-input-btn" />):
                    (<IoMdClose onClick={onClose} className="gif-input-btn" />)}
                    <input
                        className="gif-input"
                        name="gif-search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar GIFs"
                    />
                </div>
                <br />
                {searchQuery.length>1?
                    (<div>
                        {gifLoading && <h1>Loading gifs...</h1>}
                        {gifError && <h1>Error loading gif: {gifError.message}</h1>}
                        {gifData && <div className="gif-suggest">
                            {gifData.data.map((element, index)=>(
                            <img onClick={() => {
                                selectGif(element.images.original.url);
                                onClose();}}
                                className="gif-img"
                                key={index}
                                src={element.images.original.url}
                                alt={`gif-n-${index}`}/>
                            ))}
                        </div>}
                    </div>):
                    (<div className="gif-suggest">
                        {sugerencias.map((item, index)=>(
                        <div key={index} className="gif-div" onClick={()=>setSearch(item)}>
                            <div className="gif-cover">
                                {item}
                            </div>
                        </div>
                        ))}
                    </div>)
                }
            </div>
        </div>
    );
}

export default GifHandle;