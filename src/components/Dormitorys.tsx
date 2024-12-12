import { useNavigate } from 'react-router-dom';

interface Domitorys {
    id: number;
    name: string;
    jpgSrc: string;
    webpSrc: string;
}

export default function Domitorys() {
    const navigate = useNavigate();

    const domitorys: Domitorys[] = [
        {
            id: 111,
            name: '참인재관',
            jpgSrc: 'src/assets/dormitorys/chaminjae.jpg',
            webpSrc: 'src/assets/dormitorys/chaminjae.webp',
        },
        {
            id: 222,
            name: '아마레관',
            jpgSrc: 'src/assets/dormitorys/amare.jpg',
            webpSrc: 'src/assets/dormitorys/amare.webp',
        },
        {
            id: 333,
            name: '예지관',
            jpgSrc: 'src/assets/dormitorys/remain.jpg',
            webpSrc: 'src/assets/dormitorys/remain.webp',
        },
        {
            id: 444,
            name: '세르비레관',
            jpgSrc: 'src/assets/dormitorys/servire.jpg',
            webpSrc: 'src/assets/dormitorys/servire.webp',
        },
        {
            id: 555,
            name: '효성관',
            jpgSrc: 'src/assets/dormitorys/remain.jpg',
            webpSrc: 'src/assets/dormitorys/remain.webp',
        },
        {
            id: 666,
            name: '성김대건관',
            jpgSrc: 'src/assets/dormitorys/remain.jpg',
            webpSrc: 'src/assets/dormitorys/remain.webp',
        },
        {
            id: 777,
            name: '다솜관',
            jpgSrc: 'src/assets/dormitorys/remain.jpg',
            webpSrc: 'src/assets/dormitorys/remain.webp',
        },
    ];

    return (
        <>
            <p className="text-lg mb-1">기숙사별 룸메이트 찾기</p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                {domitorys.map((domitory) => (
                    <div
                        key={domitory.id}
                        className="h-36 relative md:h-52"
                        onClick={() => navigate(`/${domitory.name}`)}
                    >
                        <picture>
                            <source
                                srcSet={domitory.webpSrc}
                                type="image/webp"
                            />
                            <source
                                srcSet={domitory.jpgSrc}
                                type="image/jpeg"
                            />
                            <img
                                src={domitory.jpgSrc}
                                className="w-full h-full object-cover brightness-90 hover:brightness-75 rounded-lg cursor-pointer"
                            />
                        </picture>
                        <p className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2 text-lg">
                            {domitory.name}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}
