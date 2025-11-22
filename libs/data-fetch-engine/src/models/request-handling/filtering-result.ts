export class EntityFilteringException<
  ParsedEntity extends object
> extends Error {
  constructor(public entity: ParsedEntity, public exception: unknown) {
    super('failed to filter entity');
  }
}

export type FilteringResult<ParsedEntity extends object> = {
  filteredInEntities: ParsedEntity[];
  filteredOutEntities: ParsedEntity[];
  failedEntities: EntityFilteringException<ParsedEntity>[];
};
