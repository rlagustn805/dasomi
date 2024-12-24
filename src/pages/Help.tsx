export default function Help() {
    const helpImgArr = [
        {
            webpSrc: 'src/assets/help/webp/h1.webp',
            pngSrc: 'src/assets/help/h1.png',
        },
        {
            webpSrc: 'src/assets/help/webp/h2.webp',
            pngSrc: 'src/assets/help/h2.png',
        },
        {
            webpSrc: 'src/assets/help/webp/h3.webp',
            pngSrc: 'src/assets/help/h3.png',
        },
        {
            webpSrc: 'src/assets/help/webp/h4.webp',
            pngSrc: 'src/assets/help/h4.png',
        },
        {
            webpSrc: 'src/assets/help/webp/h5.webp',
            pngSrc: 'src/assets/help/h5.png',
        },
        {
            webpSrc: 'src/assets/help/webp/h6.webp',
            pngSrc: 'src/assets/help/h6.png',
        },
        {
            webpSrc: 'src/assets/help/webp/h7.webp',
            pngSrc: 'src/assets/help/h7.png',
        },
        {
            webpSrc: 'src/assets/help/webp/h8.webp',
            pngSrc: 'src/assets/help/h8.png',
        },
        {
            webpSrc: 'src/assets/help/webp/h9.webp',
            pngSrc: 'src/assets/help/h9.png',
        },
        {
            webpSrc: 'src/assets/help/webp/h10.webp',
            pngSrc: 'src/assets/help/h10.png',
        },
    ];

    return (
        <div className="flex flex-col gap-3 items-center p-2 border-2 border-black rounded-xl lg:p-20">
            {helpImgArr.map((help, index) => (
                <picture key={index}>
                    <source srcSet={help.webpSrc} type="image/webp" />
                    <source srcSet={help.pngSrc} type="image/jpeg" />
                    <img src={help.pngSrc} />
                </picture>
            ))}
        </div>
    );
}
