import {
  GaiaClienteQueryParams,
  GaiaClienteQueryWithoutFormattingParams,
} from "./types";

export function queryFormat(
  params: GaiaClienteQueryWithoutFormattingParams
): GaiaClienteQueryParams {
  let formattedQuery = params.query;
  let formattedValues: any[] = [];

  Object.keys(params.values).forEach((key, index) => {
    const placeholder = `$${index + 1}`;
    formattedQuery = formattedQuery.replace(
      new RegExp(`\\$${key}`, "g"),
      placeholder
    );
    formattedValues.push(params.values[key]);
  });

  return {
    query: formattedQuery,
    values: formattedValues,
  };
}
