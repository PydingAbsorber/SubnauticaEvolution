import { useState, useEffect, React } from 'react';
import "./Modal2.css";

const Modal = ({ active, setActive, fish, setFish, lvl, setLvl }) => {
    const [buttonAnimation, setButtonAnimation] = useState(false);
    const [buttonAnimation2, setButtonAnimation2] = useState(false);
    const [buttonAnimation3, setButtonAnimation3] = useState(false);
    const [cost, setCost] = useState(100*(1+lvl));
    const handleUpgrade = () => {
        setButtonAnimation(true);
        const audio1 = new Audio("/click1.mp3");
        const audio2 = new Audio("/click2.mp3");
        if (Math.random() > 0.5)
            audio1.play(); else audio2.play();
        document.body.style.userSelect = 'none';
        setTimeout(() => {
            setButtonAnimation(false);
            document.body.style.userSelect = 'auto';
        }, 250);
    };
    useEffect(() => {
        window.addEventListener('unload', handleTabClosing2)
        return () => {
            window.removeEventListener('unload', handleTabClosing2)
        }
    })
    const handleTabClosing2 = () => {
    }
    return (
        <div className={active ? "modal active" : "modal"}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2 className='upgrade-text'>Flora upgrades:</h2>
                <button className={buttonAnimation ? 'modal-upgrade-button-animation' : 'modal-upgrade-button'} onClick={handleUpgrade}>
                    <span className="button-text-upgrade"> Upgrade Lvl cost: {cost} </span>
                </button>
            </div>
        </div>
        );
};

export default Modal;