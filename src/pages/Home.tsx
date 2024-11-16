import Domitorys from '../components/Dormitorys';
import Title from '../components/Title';

export default function Home() {
    return (
        <div>
            <Title />
            <div className="mt-10">
                <Domitorys />
            </div>
        </div>
    );
}
