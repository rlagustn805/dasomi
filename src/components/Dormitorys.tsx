interface Domitorys {
    id: number;
    name: string;
    jpgSrc: string;
    webpSrc: string;
}

export default function Domitorys() {
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
            <p className="text-lg">기숙사별 룸메이트 찾기</p>
            <div className="flex flex-wrap justify-between">
                {domitorys.map((domitory) => (
                    <div
                        key={domitory.id}
                        className="border-2 w-[49%] lg:w-[33%] relative cursor-pointer mb-2 rounded-lg"
                    >
                        <picture>
                            <source
                                srcSet={domitory.webpSrc}
                                type="image/webp"
                            />
                            <source
                                srcSet={domitory.jpgSrc}
                                type="image/jepg"
                            />
                            <img
                                src={domitory.jpgSrc}
                                className="w-full h-full brightness-90 hover:brightness-75 rounded-lg"
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
