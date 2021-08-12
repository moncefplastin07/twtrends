import { DOMParser, parseDate } from "./deps.ts";
import { getPageSourceCode } from "./utils.ts";
export const getTrendList = async (area: string = "") => {
  const getPageResponse = await getPageSourceCode(area);
  if (!getPageResponse.succes) {
     return getPageResponse
  }
  const pageSourceCode = getPageResponse.sourceCode || ""
  const document = new DOMParser().parseFromString(
    pageSourceCode,
    "text/html",
  )!;
  const trendCardsDom = document.querySelectorAll(".trend-card");

  const header = {
    area: document.getElementById("app-bar-toggle")?.innerText,
    url: area,
  };
  const trends: any[] = [];
  trendCardsDom.forEach((card: any) => {
    const topics = [...card.querySelectorAll(".trend-card__list a")].map(
      (element: any, index: number) => {
        return { index: index + 1, text: element.innerText, url: element.getAttribute('href') };
      },
    );
    trends.push({
      last_update: parseDate(card.querySelector(".trend-card__time").innerText, 'dd-MM-yyyy HH:mm:ss'),
      topics,
    });
  });
  return { ...header, trends };
};
