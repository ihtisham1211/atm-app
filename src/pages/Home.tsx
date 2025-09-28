import { AtmProvider } from "../context/atmContext";
import { CardsHolder } from "../components/home/CardsHolder";
import AtmScreen from "../components/home/AtmScreen";

const Home: React.FC = () => {
  return (
    <AtmProvider>
      <div className="bg-white flex flex-col items-center border-t-4 border-button w-9/10 px-4 py-3 h-full">
        <CardsHolder />
        <AtmScreen />
      </div>
    </AtmProvider>
  );
};

export default Home;
