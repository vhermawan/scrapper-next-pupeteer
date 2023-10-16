import { UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { scrappingData } from "../service";

export const useScrappingData = (
  options?: UseMutationOptions<
    BlobPart,
    Error,
    string,
    unknown
  >,
): UseMutationResult<
  BlobPart,
  Error,
  string,
  unknown
> =>
  useMutation(
    (params) => scrappingData(params),
    options,
  );
