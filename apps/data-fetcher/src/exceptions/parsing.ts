export class ParsingMethodMissingException extends Error {
  constructor(entityName: string) {
    super(`entity ${entityName} has no provided parsing method`);
  }
}
