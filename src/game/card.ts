export default class Card {
  suit: string;

  rank: string;

  value: number;

  id: string;

  constructor(suit: string, rank: string, value: number) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
    if (this.suit === 'joker') {
      this.id = `c-${this.suit.toUpperCase()[0]}${this.rank}`;
    } else {
      this.id = `c-${this.rank}${this.suit.toUpperCase()[0]}`;
    }
  }
}
