export default class Factory<T> {
  constructor(private readonly generator: () => T) {}

  createOne(overloads: Partial<T>): T {
    const generated = this.generator();
    console.log(generated);

    const result = { ...generated, ...overloads };
    return result;
  }

  createMany(count = 1, overloads?: Partial<T> | null): T[] {
    if (overloads === null) {
      overloads = {};
    }

    return [...new Array(count)].map(() => this.createOne(overloads));
  }
}
