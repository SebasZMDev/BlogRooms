import { IoMdClose } from "react-icons/io";

type Props = {
    imgSrc: string;
    closeImg: ()=>void;
}

const ImgPreview = ({ imgSrc, closeImg }: Props) => {

    return (
        <div className="img-prev-div">
            <div className="img-prev-bg">
                <IoMdClose size={75} color="FDFD96" onClick={closeImg}/>
            </div>
            <img className="img-prev" src={imgSrc} alt="Preview" />
        </div>
    );
}

export default ImgPreview;
