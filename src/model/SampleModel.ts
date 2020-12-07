import 'latest-createjs';

/**
 * @class SampleModel
 * @purpose Exemple de modèle
 */
export default class SampleModel extends createjs.EventDispatcher {
    private _life: number = 100;

    public set life(life: number) {
        this._life = Math.max(0, Math.min(100, life));
        this.sendUpdate(); // On signale aux vues que les valeurs ont changées
    }

    public get life(): number {
        return this._life;
    }

    /**
     * Le joueur perd de la vie (amount, ou 50 par défaut)pm
     * @param amount
     */
    public hurt(amount: number = 50): void {
        this._life = Math.max(0, this._life - amount);
        this.dispatchEvent(new createjs.Event("hurt", false, true));
        this.sendUpdate(); // On signale aux vues que les valeurs ont changées
    }

    /**
     * Indique que les valeurs du modèle ont changées
     * @private
     */
    private sendUpdate(): void {
        this.dispatchEvent(new createjs.Event("update", false, true));
    }
}