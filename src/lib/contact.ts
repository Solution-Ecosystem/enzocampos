export const WHATSAPP_NUMBER = '5511986372751';
export const WHATSAPP_DISPLAY = '(11) 98637-2751';
export const INSTAGRAM_URL = 'https://www.instagram.com/enzokmpos/';
export const EMAIL = 'enzokmposbussines@gmail.com';
export const INSTAGRAM_HANDLE = '@enzokmpos';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Olá, Enzo! Vi seu portfólio e gostaria de conversar sobre social media para a minha marca.';

export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}

/** Opens an external link in a new tab; if the browser blocks it, navigates the top window instead. */
export function openExternal(event: { preventDefault: () => void }, url: string) {
  event.preventDefault();
  const tab = window.open(url, '_blank');
  if (tab) { tab.opener = null; return; }
  try { (window.top ?? window).location.href = url; } catch { window.location.href = url; }
}
