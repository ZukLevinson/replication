export class FilteringMethodMissingException extends Error {
  constructor(entityName: string) {
    super(`entity ${entityName} has no provided filtering method`);
  }
}
