export class Vector2D extends Array {
  set x(v: number) {
    this[0] = v;
  }
  get x(): number {
    return this[0];
  }
  set y(v: number) {
    this[1] = v;
  }
  get y(): number {
    return this[1];
  }
  constructor(x: number, y: number) {
    super(x, y);
  }
  rotate(rad: number): Vector2D {
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const [x, y] = this;

    this.x = x * c + y * -s;
    this.y = x * s + y * c;

    return this;
  }
}
