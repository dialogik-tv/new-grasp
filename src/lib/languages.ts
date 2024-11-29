import { LANG_REPO_URL, DEFAULT_LANG, SUPPORTED_LANGUAGES } from './config';

export async function getLanguageData(urlParams: URLSearchParams): Promise<string[]> {
  const langData: string[] = [];
  const paramLangs = urlParams.get('lang')?.split('|') || [DEFAULT_LANG];

  for (const lang of paramLangs) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      console.warn(`Language [${lang.toUpperCase()}] not supported. Skipping!`);
      continue;
    }

    try {
      const response = await fetch(`${LANG_REPO_URL}/lang.${lang}.json`);
      const data = await response.json();
      
      // Merge lang data arrays (remove duplicates before concatenating)
      langData.push(...data.filter((item: string) => !langData.includes(item)));
    } catch (error) {
      console.error(`Error loading language ${lang}:`, error);
    }
  }

  return langData;
}