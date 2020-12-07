export default class BasicButtonComponent extends createjs.Container {
    private readonly background: createjs.Shape;
    private readonly text: createjs.Text;

    constructor(value: string, private color: string = '#AAAAAA', private overColor: string = '#CCCCCC') {
        super();

        this.background = new createjs.Shape();
        this.text = new createjs.Text(value, '14px Arial Black', 'black');
        this.addChild(this.background, this.text);

        this.on('mouseover', () => this.update(true), this);
        this.on('mouseout', this.update, this);
        this.cursor = 'pointer';

        this.update();
    }

    private update(over: boolean = false): void {
        this.background.graphics
                .clear()
                .beginFill(over ? this.overColor : this.color)
                .rr(0, 0, this.text.getMeasuredWidth() + 30, this.text.getMeasuredHeight() + 10, 10)
                .endFill();
        this.text.set({x: 15, y: 5});
    }
}