export class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  // Returns a pseudo-random float between 0 and 1
  next(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  // Returns a pseudo-random integer between min and max (inclusive)
  range(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  // Picks a random element from an array
  choice<T>(arr: T[]): T {
    if (arr.length === 0) return undefined as any;
    const index = Math.floor(this.next() * arr.length);
    return arr[index];
  }

  // Shuffles an array
  shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}

// Generate a random seed
export const generateSeed = (): number => {
  return Math.floor(Math.random() * 1000000) + 1;
};
