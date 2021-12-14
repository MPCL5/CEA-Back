export default class Factory<T> {
  constructor(private readonly generator: () => T) {}

  createOne(overloads: Partial<T>): T {
    const generated = this.generator();
    console.log(generated);

    const result = { ...generated, ...overloads };
    return result;
  }

  createMany(
    count = 1,
    overloads?: null | Partial<T> | ((index: number) => Partial<T>),
  ): T[] {
    if (overloads === null) {
      overloads = {};
    }

    const result = [];

    for (let i = 0; i < count; i++) {
      if (typeof overloads === 'function') {
        result.push(this.createOne(overloads(i)));
      } else {
        result.push(this.createOne(overloads));
      }
    }

    return result;
  }
}
