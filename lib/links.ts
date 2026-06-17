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
 * Конфиг каналов связи для секции контактов (`components/sections/ContactChannels`).
 *
 * URL соцсетей — статика (в схеме backend полей под них нет), а телефон, e-mail и
 * WhatsApp берутся из редактируемого слоя контента (`contacts` из `GET /public/site`
 * с фоллбэком в `lib/defaults.ts`), чтобы их можно было менять из админки. Значения
 * по умолчанию ниже используются только если `contacts` не передан.
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

/** Минимально необходимая форма контактов из динамического слоя (`ContactsContent`). */
export interface ContactDetails {
  phone: string;
  email: string;
  whatsapp_url?: string | null;
}

const DEFAULT_PHONE = '+994 55 244 69 69';
const DEFAULT_EMAIL = 'office@ted.edu.az';
const DEFAULT_WHATSAPP = 'https://wa.me/994552446969';

/** Фирменная ось бренда (индиго → маджента), как `from-primary to-primary-2`. */
const TED_GRADIENT = 'linear-gradient(135deg, #2415C2, #A601A9)';

/** `tel:`-ссылка из человекочитаемого номера (оставляем только цифры и `+`). */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`;
}

/** Ссылка для кнопки «Напишите нам»: WhatsApp, если задан, иначе e-mail. */
export function writeHref(contacts: ContactDetails): string {
  return contacts.whatsapp_url || `mailto:${contacts.email}`;
}

/** Реальные брендовые ссылки соцсетей — статика (нет полей в схеме backend). */
const SOCIAL_LINKS: Record<'instagram' | 'tiktok' | 'facebook' | 'linkedin' | 'youtube', ContactLink> = {
  instagram: {
    id: 'instagram',
    href: 'https://www.instagram.com/tedacademy.az?igsh=MWdtNXF6eWcxeG1zeA==',
    gradient: 'linear-gradient(135deg, #F58529, #DD2A7B 55%, #8134AF)',
    external: true,
    Icon: InstagramIcon,
  },
  tiktok: {
    id: 'tiktok',
    href: 'https://www.tiktok.com/@tedacademy.az?_r=1&_t=ZS-977esS6bPUq',
    gradient: 'linear-gradient(135deg, #25F4EE, #000000 50%, #FE2C55)',
    external: true,
    Icon: TikTokIcon,
  },
  facebook: {
    id: 'facebook',
    href: 'https://www.facebook.com/share/1FvheqAcRu/?mibextid=wwXIfr',
    gradient: 'linear-gradient(135deg, #1877F2, #0A52C0)',
    external: true,
    Icon: FacebookIcon,
  },
  linkedin: {
    id: 'linkedin',
    href: 'https://www.linkedin.com/company/ted-academy-byfuadismayilov/',
    gradient: 'linear-gradient(135deg, #0A66C2, #004182)',
    external: true,
    Icon: LinkedInIcon,
  },
  youtube: {
    id: 'youtube',
    href: 'https://youtube.com/@tedacademyaz?si=m0d851l1aBDmMQPN',
    gradient: 'linear-gradient(135deg, #FF0000, #C4302B)',
    external: true,
    Icon: YouTubeIcon,
  },
};

/**
 * Каналы связи для секции контактов. Соцсети — статика; WhatsApp, телефон и e-mail
 * строятся из переданных `contacts` (редактируемых из админки), с фоллбэком на
 * значения по умолчанию. Порядок прежний: instagram, tiktok, whatsapp, facebook,
 * linkedin, youtube, phone, email.
 */
export function buildContactLinks(contacts?: ContactDetails): ContactLink[] {
  const phone = contacts?.phone || DEFAULT_PHONE;
  const email = contacts?.email || DEFAULT_EMAIL;
  const whatsapp = contacts?.whatsapp_url || DEFAULT_WHATSAPP;
  return [
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.tiktok,
    {
      id: 'whatsapp',
      href: whatsapp,
      gradient: 'linear-gradient(135deg, #25D366, #128C7E)',
      external: true,
      Icon: WhatsAppIcon,
    },
    SOCIAL_LINKS.facebook,
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.youtube,
    {
      id: 'phone',
      href: telHref(phone),
      gradient: TED_GRADIENT,
      external: false,
      Icon: Phone,
    },
    {
      id: 'email',
      href: `mailto:${email}`,
      gradient: TED_GRADIENT,
      external: false,
      Icon: Mail,
    },
  ];
}
