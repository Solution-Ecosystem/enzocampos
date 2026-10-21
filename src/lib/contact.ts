export const WHATSAPP_NUMBER = '5511986372751';
export const INSTAGRAM_URL = 'https://www.instagram.com/enzokmpos/';
export const INSTAGRAM_HANDLE = '@enzokmpos';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Olá, Enzo! Vi seu portfólio e gostaria de conversar sobre social media para a minha marca.';

export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
