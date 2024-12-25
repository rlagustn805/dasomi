export default function Title() {
    return (
        <div className="relative">
            <picture>
                <source srcSet="/assets/images/title.webp" type="image/webp" />
                <source srcSet="/assets/images/title.jpg" type="image/jpeg" />
                <img
                    src="/assets/images/title.jpg"
                    className="brightness-75 rounded-xl h-[400px] object-cover w-full"
                />
            </picture>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center text-white">
                <p className="text-3xl lg:text-4xl">
                    함께하는 생활, 함께하는 꿈
                </p>
                <p className="text-lg lg:text-xl">
                    여러분과 함께 할 룸메이트를 찾아 드릴게요.
                </p>
            </div>
        </div>
    );
}
