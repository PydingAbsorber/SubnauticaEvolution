import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Modal from './Modal/Modal';
import Modal2 from './Modal/Modal2';
import store from 'store';

function App() {
    const [fishFood, setFishFood] = useState(parseInt(localStorage.getItem('fishFood')) || 0);
    const [baseChance, setBaseChance] = useState(parseInt(localStorage.getItem('baseChance')) || 0);
    const [fishBonus, setFishBonus] = useState(parseInt(localStorage.getItem('fishBonus')) || 0);
    const [fishType, setFishType] = useState(parseInt(localStorage.getItem('fishType')) || 0);
    const [fishLvl, setFishLvl] = useState(parseInt(localStorage.getItem('fishLvl')) || 0);
    const [fishFoodMax, setfishFoodMax] = useState(parseInt(localStorage.getItem('fishFoodMax')) || 0);
    store.set('storeFish', fishFood);
    const storeFish = store.get('storeFish');

    useEffect(() => {
        window.addEventListener('unload', handleTabClosing)
        return () => {
            window.removeEventListener('unload',handleTabClosing)
        }
    })
    const handleTabClosing = () => {
        localStorage.setItem('fishFood', fishFood.toString());
        localStorage.setItem('baseChance', baseChance.toString());
        localStorage.setItem('fishBonus', fishBonus.toString());
        localStorage.setItem('fishType', fishType.toString());
        localStorage.setItem('fishLvl', fishLvl.toString());
        localStorage.setItem('fishFoodMax', fishFoodMax.toString());
    }
    const [buttonAnimation, setButtonAnimation] = useState(false);
    const [buttonAnimation2, setButtonAnimation2] = useState(false);
    const [buttonAnimation3, setButtonAnimation3] = useState(false);
    const [textAnimation, setTextAnimation] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [modalActive2, setModalActive2] = useState(false);
    const handleCollect = () => {
        setButtonAnimation(true);
        if (fishType == 0) {
            if (fishLvl > 5)
                setBaseChance(0.01+(fishLvl/300));
            if (fishLvl > 10)
                setFishBonus(1+(fishLvl-10));
        }
        const audio1 = new Audio("/click1.mp3");
        const audio2 = new Audio("/click2.mp3");
        const audio3 = new Audio("/bigclick.mp3");
        if (Math.random() < 0.1 + baseChance) {
            setFishFood(fishFood + 2 + fishBonus);
            setTextAnimation(true);
            audio3.play();
        } else {
            setFishFood(fishFood + 1);
            if (Math.random() > 0.5)
                audio1.play(); else audio2.play();
        }
        document.body.style.userSelect = 'none';
        setTimeout(() => {
            setButtonAnimation(false);
            setTextAnimation(false);
            document.body.style.userSelect = 'auto';
        }, 250);
    };
    const handleUpgrade = () => {
        setButtonAnimation2(true);
        const audio1 = new Audio("/click1.mp3");
        const audio2 = new Audio("/click2.mp3");
        if (Math.random() > 0.5)
            audio1.play(); else audio2.play();
        document.body.style.userSelect = 'none';
        if (modalActive == true)
            setModalActive(false);
        else setModalActive(true);
        setTimeout(() => {
            setButtonAnimation2(false);
            setTextAnimation(false);
            document.body.style.userSelect = 'auto';
        }, 250);
    };
    const handleFlora = () => {
        setButtonAnimation3(true);
        const audio1 = new Audio("/click1.mp3");
        const audio2 = new Audio("/click2.mp3");
        if (Math.random() > 0.5)
            audio1.play(); else audio2.play();
        document.body.style.userSelect = 'none';
        if (modalActive2 == true)
            setModalActive2(false);
        else setModalActive2(true);
        setTimeout(() => {
            setButtonAnimation3(false);
            setTextAnimation(false);
            document.body.style.userSelect = 'auto';
        }, 250);
    };
  return (
      <div className="App">
        <Modal active={modalActive} setActive={setModalActive} fish={fishFood} setFish={setFishFood} lvl={fishLvl} setLvl={setFishLvl} />
        <Modal2 active={modalActive2} setActive={setModalActive2} fish={fishFood} setFish={setFishFood} />
        <div>
                <img src="/Peeper.png" className="fish" />
        </div>
        <div>
            <p className="water-text">
                  Your Lvl: {fishLvl}
            </p>
        </div>
        <div className="middle-button">
        <button className={buttonAnimation ? 'water-button-animation' : 'water-button'} onClick={handleCollect}>
                    <span className="button-text"> Harvest fish food </span>
        </button>
        </div>
        <div className="left-button">
        <button className={buttonAnimation2 ? 'water-button2-animation' : 'water-button2'} onClick={handleUpgrade}>
                    <span className="button-text-upgrade"> Open fish upgrades </span> 
        </button>
        </div>
        <div className="right-button">
            <button className={buttonAnimation3 ? 'water-button3-animation' : 'water-button3'} onClick={handleFlora}>
                <span className="button-text-flora"> Open flora upgrades </span>
            </button>
        </div>
        <div>
              <p className={textAnimation ? 'water-text-animation' : 'water-text'}>
            You have {fishFood} fish food!
        </p>
        </div>
        <div>
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        </div>
        <div>
            <p className="read-the-docs">
                Made by Osadcii Iurii Cr-214 FCIM
            </p>
        </div>
    </div>
  )
}

export default App
