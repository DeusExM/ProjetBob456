import 'latest-createjs'

import SampleModel from "../model/SampleModel";

export default class LifeBarComponent extends createjs.Container {
    private readonly background: createjs.Shape;
    private readonly hurted: createjs.Shape;
    private readonly text: createjs.Text;

    constructor(private model: SampleModel) {
        super();

        this.background = new createjs.Shape();
        this.hurted = new createjs.Shape();
        this.text = new createjs.Text('', '14px Arial Black', '#FFFFFF');
        this.text.textAlign = 'center';
        this.hurted.alpha = 0;
        this.addChild(this.background, this.text, this.hurted);

        // A chaque fois que le modèle est mis à jour, on met à jour l'affichage
        model.on('update', this.update, this);

        // Quand le joueur est blessé, on joue l'animation blessé
        model.on('hurt', this.hurt, this);

        this.update();
    }

    // Animation blessé
    private hurt(): void {
        createjs.Tween.removeTweens(this.hurted);
        createjs.Tween.get(this.hurted).to({alpha: 1}, 200).to({alpha: 0}, 200);
    }

    // Mise à jour
    private update(): void {
        // On récupère la vie dans le modèle (et on en fait un pourcentage)
        const lifePourcentage = Math.max(0.05, this.model.life / 100);


        // On met a jour le texte
        this.text.text = `${this.model.life.toFixed(0)}/100`;

        // Et le fond
        const width = 150;
        const height = 6 + this.text.getMeasuredHeight();
        this.hurted.graphics
            .clear()
            .beginFill('rgba(200,0,0,0.3)')
            .drawRoundRect(0, 0, width, height, 10)
            .endFill();

        this.background.graphics
            .clear()
            .beginStroke('#FFFFFF')
            .drawRoundRect(0, 0, width, height, 10)
            .endStroke()
            .beginLinearGradientFill(['#66FF66', '#339933'], [0, 1], 0, 0, 0, height)
            .drawRoundRect(2, 2, lifePourcentage * (width - 4), height - 4, 8)
            .endFill();

        this.text.set({
            x: 0.5 * width,
            y: 2,
        });
    }
}