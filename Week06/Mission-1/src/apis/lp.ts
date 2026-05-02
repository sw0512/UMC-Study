import type { PageNationDto } from "../types/common";
import type { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  pageNationDto: PageNationDto,
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: pageNationDto,
  });

  return data;
};
