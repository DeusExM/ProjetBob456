import 'latest-createjs'
import SampleModel from "./model/SampleModel";
import LifeBarComponent from "./user-interface/LifeBarComponent";
import BasicButtonComponent from "./user-interface/BasicButtonComponent";
import AnimatedLifeBarComponent from "./user-interface/AnimatedLifeBarComponent";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const stage = new createjs.Stage(canvas);


const model = new SampleModel();
const lifeBar = new LifeBarComponent(model);
const animatedLifeBar = new AnimatedLifeBarComponent(model);
const btnHeal = new BasicButtonComponent('+50', '#33CC33', '#66CC66');
const btnHurt = new BasicButtonComponent('-20', '#CC3333', '#CC6666');

lifeBar.set({x: 5, y: 5});
animatedLifeBar.set({x: 200, y: 5});
btnHeal.set({x: 5, y: 40});
btnHurt.set({x: 90, y: 40});

btnHurt.on('click', () => model.hurt(20));
btnHeal.on('click', () => model.life = model.life + 50);

stage.addChild(lifeBar, animatedLifeBar, btnHurt, btnHeal);
stage.enableMouseOver(50);

// Mise à jour de l'affichage à chaque frame
createjs.Ticker.addEventListener('tick', stage);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
// Mise à jour au redimenssionnement de la fenêtre
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
})