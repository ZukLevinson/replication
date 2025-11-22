export type EntityParsingFailure<OriginalEntity extends object> = {
  entity: OriginalEntity;
  exception: unknown;
};

export type ParsingResult<
  OriginalEntity extends object,
  ParsedEntity extends object
> = {
  parsedEntities: ParsedEntity[];
  failedEntities: EntityParsingFailure<OriginalEntity>[];
};
