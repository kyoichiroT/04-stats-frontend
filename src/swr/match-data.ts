import { WinRatio } from "@/app/match-data/match-data-types";
import useSWRImmutable from "swr/immutable";

const API_ENDPOINT = "http://localhost:4000";
const MTACH_DATA_API = "/match-data";
const WIN_RATIO_API = "/win-ratio";

/**
 * マッチデータを取得するswr
 * @returns
 */
export const useMatchData = () => {
  return useSWRImmutable<WinRatio[]>(
    "match-data",
    async () => {
      try {
        console.log(
          "fetching match data",
          API_ENDPOINT + MTACH_DATA_API + WIN_RATIO_API + WIN_RATIO_API
        );
        return fetch(`${API_ENDPOINT}${MTACH_DATA_API}${WIN_RATIO_API}`).then(
          (res) => res.json()
        );
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );
};
