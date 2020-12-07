import 'latest-createjs'

import SampleModel from "../model/SampleModel";

// Une version plus poussée avec une animation comme démo

export default class AnimatedLifeBarComponent extends createjs.Container {
    private readonly background: createjs.Shape;
    private readonly hurted: createjs.Shape;
    private readonly text: createjs.Text;
    private displayedLife: number; // Copie de la vie affichée (pour animation)

    constructor(private model: SampleModel) {
        super();

        this.background = new createjs.Shape();
        this.hurted = new createjs.Shape();
        this.text = new createjs.Text('', '14px Arial Black', '#FFFFFF');
        this.text.textAlign = 'center';
        this.hurted.alpha = 0;
        this.addChild(this.background, this.text, this.hurted);

        this.displayedLife = this.model.life;

        // A chaque fois que le modèle est mis à jour, on met à jour l'affichage
        model.on('update', this.valueChanged, this);

        // Quand le joueur est blessé, on joue l'animation blessé
        model.on('hurt', this.hurt, this);

        this.on('tick', this.update, this);
    }

    // Animation blessé
    private hurt(): void {
        createjs.Tween.removeTweens(this.hurted);
        createjs.Tween.get(this.hurted).to({alpha: 1}, 200).to({alpha: 0}, 200);
    }

    private valueChanged(): void {
        createjs.Tween.removeTweens(this);
        createjs.Tween.get(this).to({displayedLife: this.model.life}, 500);
    }

    // Mise à jour
    private update(): void {
        // On récupère la vie dans le modèle (et on en fait un pourcentage)
        const lifePourcentage = Math.max(0.05, this.displayedLife / 100);


        // On met a jour le texte
        this.text.text = `${this.displayedLife.toFixed(0)}/100`;

        // Et le fond
        const width = 150;
        const height = 6 + this.text.getMeasuredHeight();
        this.hurted.graphics.c().f('rgba(200,0,0,0.3)').rr(0, 0, width, height, 10).ef();
        this.background.graphics
            .c().s('#FFFFFF').rr(0, 0, width, height, 10).es()
            .lf(lifePourcentage > 0.5 ? ['#66FF66', '#339933'] : lifePourcentage > 0.3 ? ['#ffd966', '#998033'] : ['#ff6666', '#993333'], [0, 1], 0, 0, 0, height)
            .rr(2, 2, lifePourcentage * (width - 4), height - 4, 8).ef();
        this.text.set({x: 0.5 * width, y: 2,});
    }
}