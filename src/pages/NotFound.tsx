import { useNavigate } from 'react-router-dom';
import YellowButton from '../components/button/YellowButton';

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="bg-green-700 w-full h-full flex flex-col gap-2 justify-center items-center rounded-xl">
            <picture>
                <source
                    srcSet="/assets/dcuCharacter/webp/dcuFace.webp"
                    type="image/webp"
                />
            </picture>
            <source
                srcSet="/assets/dcuCharacter/jpg/dcuFace.jpg"
                type="image/jpeg"
            />
            <img src="/assets/dcuCharacter/jpg/dcuFace.jpg" width={100} />
            <p className="text-white">존재하지 않는 페이지에요!</p>
            <YellowButton onClick={() => navigate('/')}>
                메인으로 돌아가기
            </YellowButton>
        </div>
    );
}
