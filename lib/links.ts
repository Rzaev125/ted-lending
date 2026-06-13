import { Mail, Phone } from 'lucide-react';
import type { ComponentType } from 'react';

import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from '@/components/ui/ChannelIcons';

/**
 * Статический конфиг каналов связи для секции контактов на главной
 * (`components/sections/ContactChannels`) — реальные соцсети академии. Статика
 * (не backend/CMS), чтобы секция не зависела от наличия бэкенда.
 */

export type ContactLinkId =
  | 'instagram'
  | 'tiktok'
  | 'whatsapp'
  | 'facebook'
  | 'linkedin'
  | 'youtube'
  | 'phone'
  | 'email';

export interface ContactLink {
  /** Совпадает с i18n-ключом `links.<id>` для подписи кнопки. */
  id: ContactLinkId;
  href: string;
  /** Инлайн-градиент кнопки (канал-бренд или фирменная ось TED). */
  gradient: string;
  /** Внешний URL (открывать в новой вкладке) против `tel:`/`mailto:`. */
  external: boolean;
  Icon: ComponentType<{ className?: string }>;
}

const PHONE = '+994 55 244 69 69';
const EMAIL = 'wisdom.sf.2012@gmail.com';

/** Фирменная ось бренда (индиго → маджента), как `from-primary to-primary-2`. */
const TED_GRADIENT = 'linear-gradient(135deg, #2415C2, #A601A9)';

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: 'instagram',
    href: 'https://www.instagram.com/tedacademy.az?igsh=MWdtNXF6eWcxeG1zeA==',
    gradient: 'linear-gradient(135deg, #F58529, #DD2A7B 55%, #8134AF)',
    external: true,
    Icon: InstagramIcon,
  },
  {
    id: 'tiktok',
    href: 'https://www.tiktok.com/@tedacademy.az?_r=1&_t=ZS-977esS6bPUq',
    gradient: 'linear-gradient(135deg, #25F4EE, #000000 50%, #FE2C55)',
    external: true,
    Icon: TikTokIcon,
  },
  {
    id: 'whatsapp',
    href: 'https://api.whatsapp.com/send/?phone=%2B994552446969&text&type=phone_number&app_absent=0',
    gradient: 'linear-gradient(135deg, #25D366, #128C7E)',
    external: true,
    Icon: WhatsAppIcon,
  },
  {
    id: 'facebook',
    href: 'https://www.facebook.com/share/1FvheqAcRu/?mibextid=wwXIfr',
    gradient: 'linear-gradient(135deg, #1877F2, #0A52C0)',
    external: true,
    Icon: FacebookIcon,
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/company/ted-academy-byfuadismayilov/',
    gradient: 'linear-gradient(135deg, #0A66C2, #004182)',
    external: true,
    Icon: LinkedInIcon,
  },
  {
    id: 'youtube',
    href: 'https://youtube.com/@tedacademyaz?si=m0d851l1aBDmMQPN',
    gradient: 'linear-gradient(135deg, #FF0000, #C4302B)',
    external: true,
    Icon: YouTubeIcon,
  },
  {
    id: 'phone',
    href: `tel:${PHONE.replace(/[^0-9+]/g, '')}`,
    gradient: TED_GRADIENT,
    external: false,
    Icon: Phone,
  },
  {
    id: 'email',
    href: `mailto:${EMAIL}`,
    gradient: TED_GRADIENT,
    external: false,
    Icon: Mail,
  },
];
