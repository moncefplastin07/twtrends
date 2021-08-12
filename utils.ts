export const getPageSourceCode = async (pageUrl: string = "") => {
  const response = await fetch(`https://trends24.in/${pageUrl}`);
  return response.ok
    ? { succes: true, sourceCode: await response.text() }
    : {
      succes: false,
      errorCode: response.status,
      errorText: response.statusText,
    };
};
