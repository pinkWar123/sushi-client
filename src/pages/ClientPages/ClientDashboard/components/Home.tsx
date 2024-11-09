import sushiHome from '../../../../../public/images/sushi_home.png';
import './css/Home.css';

const Home = (): JSX.Element => {
  return (
    <div
      id="home"
      className="w-screen h-screen flex justify-center items-center flex-column p-5 bg-[url('https://i.pinimg.com/564x/6b/49/aa/6b49aa631286f13d057a3e737d1b17d1.jpg')]"
    >
      <h1 className="w-full font-bold text-center text-9xl mt-40">寿司の芸術</h1>
      <div className="flex justify-center items-center">
        <img id="home-image" src={sushiHome} alt="sushi" />
      </div>
    </div>
  );
};

export default Home;
