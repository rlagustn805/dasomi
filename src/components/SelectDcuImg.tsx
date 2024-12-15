import { dcuImgArr } from './utils/array';

export interface DcuImgArr {
    id: string;
    jpgSrc: string;
    webpSrc: string;
}

export default function SelectDcuImg({ handleImgClick }: any) {
    return (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 p-4">
            {dcuImgArr.map((img) => (
                <picture key={img.id} onClick={() => handleImgClick(img.id)}>
                    <source srcSet={img.webpSrc} type="image/webp" />
                    <source srcSet={img.jpgSrc} type="image/jpeg" />
                    <img
                        src={img.jpgSrc}
                        alt={img.id}
                        width={120}
                        className="p-2 border border-black rounded-xl cursor-pointer hover:opacity-80 transition-transform duration-300 ease-in-out hover:translate-y-[-10px]"
                    />
                </picture>
            ))}
        </div>
    );
}
