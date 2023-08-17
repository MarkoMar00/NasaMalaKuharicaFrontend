export class Recepy {
  id: number;
  name: string;
  portions: number;
  preparationTimeMinutes: number;
  instructions: string;
  date: string;


  constructor() {
    this.id = 0;
    this.name = '';
    this.portions = 0;
    this.preparationTimeMinutes = 0;
    this.instructions = '';
    this.date = '';
  }
}
