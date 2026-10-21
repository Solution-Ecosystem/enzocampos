import { describe, expect, it } from 'vitest';
import { whatsappUrl } from '@/lib/contact';

describe('Contato', () => {
  it('abre o WhatsApp do Enzo no número (11) 98637-2751', () => {
    expect(whatsappUrl('Oi').startsWith('https://api.whatsapp.com/send?phone=5511986372751&text=')).toBe(true);
  });
});
