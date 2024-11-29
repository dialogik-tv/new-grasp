export function getChannelFromUrl(): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('channel');
}

export function getUrlParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}