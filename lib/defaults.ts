/**
 * Bundled fallback for the public site bundle, used when the backend is
 * unreachable so the landing page still renders fully (see ``getSite`` in
 * ``lib/content.ts``).
 *
 * Mirrors the canonical fresh-install content in
 * ``backend/app/core/landing_seed.py`` (trilingual ru/en/az; non-localized
 * fields — names, colors, urls — are shared). Synthetic ``default-*`` ids are
 * React keys only.
 */

import type { PublicSiteBundle } from './content';

export const DEFAULT_SITE_BUNDLE: PublicSiteBundle = {
  content: {
    hero: {
      eyebrow: {
        ru: 'Набор на 2026/27 учебный год открыт',
        en: 'Enrollment for the 2026/27 academic year is open',
        az: '2026/27 tədris ilinə qəbul açıqdır',
      },
      title_lead: { ru: 'TED Academy', en: 'TED Academy', az: 'TED Academy' },
      title_tail: {
        ru: 'Ваш успех — наша цель',
        en: 'Your success — our goal',
        az: 'Sizin uğurunuz — bizim məqsədimiz',
      },
      subtitle: {
        ru:
          'Современный образовательный центр в Баку. Обучение на азербайджанском, ' +
          'русском и английском — от первых классов до подготовки к SAT, IELTS и ' +
          'поступления в лучшие университеты мира.',
        en:
          'A modern educational center in Baku. Tuition in Azerbaijani, Russian ' +
          "and English — from the early grades to SAT and IELTS prep and admission " +
          "to the world's best universities.",
        az:
          'Bakıda müasir təhsil mərkəzi. Azərbaycan, rus və ingilis dillərində ' +
          'təhsil — ibtidai siniflərdən SAT, IELTS hazırlığına və dünyanın ən yaxşı ' +
          'universitetlərinə qəbula qədər.',
      },
      cta_primary_label: {
        ru: 'Позвоните нам',
        en: 'Call us',
        az: 'Bizə zəng edin',
      },
      cta_secondary_label: {
        ru: 'Напишите нам',
        en: 'Write to us',
        az: 'Bizə yazın',
      },
      stats: [
        {
          value: '27',
          label: {
            ru: 'лет опыта основателя',
            en: "years of founder's experience",
            az: 'il təsisçi təcrübəsi',
          },
        },
        {
          value: '3000+',
          label: { ru: 'довольных учеников', en: 'happy students', az: 'məmnun şagird' },
        },
        {
          value: '20+',
          label: { ru: 'авторских учебников', en: 'original textbooks', az: 'müəllif dərsliyi' },
        },
      ],
    },
    why_us: {
      eyebrow: { ru: 'Почему TED Academy', en: 'Why TED Academy', az: 'Niyə TED Academy' },
      title: {
        ru: 'Шесть причин, по которым нас выбирают',
        en: 'Six reasons families choose us',
        az: 'Bizi seçməyin altı səbəbi',
      },
      subtitle: {
        ru: 'Нас выбирают благодаря нашему подходу к детям и высоким результатам!',
        en: 'Families choose us for our approach to children and our strong results!',
        az: 'Bizi uşaqlara yanaşmamıza və yüksək nəticələrimizə görə seçirlər!',
      },
      cards: [
        {
          icon_key: 'cpu',
          title: {
            ru: 'Интерактивное обучение',
            en: 'Interactive learning',
            az: 'İnteraktiv təhsil',
          },
          body: {
            ru:
              'Планшеты, электронные учебники, эксклюзивное цифровое приложение на AI ' +
              'и видеоуроки — собраны нашей командой в единую среду.',
            en:
              'Tablets, e-textbooks, an exclusive AI-powered app and video lessons — ' +
              'brought together by our team into a single environment.',
            az:
              'Planşetlər, elektron dərsliklər, süni intellekt əsaslı eksklüziv ' +
              'rəqəmsal tətbiq və video dərslər — komandamız tərəfindən vahid mühitdə ' +
              'birləşdirilib.',
          },
        },
        {
          icon_key: 'route',
          title: {
            ru: 'Индивидуальный подход',
            en: 'Personalized approach',
            az: 'Fərdi yanaşma',
          },
          body: {
            ru:
              'Раскрываем потенциал каждого ученика: диагностика на первом занятии, ' +
              'личная траектория, бесплатные support-уроки при необходимости.',
            en:
              "We unlock every student's potential: assessment on the first lesson, " +
              'a personal learning path, and free support lessons when needed.',
            az:
              'Hər şagirdin potensialını açırıq: ilk dərsdə diaqnostika, fərdi tədris ' +
              'marşrutu və lazım olduqda pulsuz dəstək dərsləri.',
          },
        },
        {
          icon_key: 'line-chart',
          title: { ru: 'Контроль прогресса', en: 'Progress tracking', az: 'Tərəqqiyə nəzarət' },
          body: {
            ru:
              'Регулярные экзамены по пройденным темам и оперативная обратная связь ' +
              'с родителями по всем моментам обучения.',
            en:
              'Regular exams on covered topics and prompt feedback to parents on ' +
              'every aspect of learning.',
            az:
              'Keçilən mövzular üzrə müntəzəm imtahanlar və təhsilin bütün məqamları ' +
              'barədə valideynlərə operativ geri dönüş.',
          },
        },
        {
          icon_key: 'heart-handshake',
          title: { ru: 'Дружелюбная атмосфера', en: 'Friendly atmosphere', az: 'Mehriban mühit' },
          body: {
            ru:
              'Молодой увлечённый коллектив, поездки и совместные мероприятия. Дети ' +
              'сами хотят проводить время в TED и вне уроков.',
            en:
              'A young, passionate team, trips and shared events. Kids want to spend ' +
              'time at TED even outside lessons.',
            az:
              'Gənc və həvəsli kollektiv, səyahətlər və birgə tədbirlər. Uşaqlar ' +
              'dərslərdən kənarda da TED-də vaxt keçirmək istəyir.',
          },
        },
        {
          icon_key: 'users',
          title: {
            ru: 'Залог нашего успеха',
            en: 'The key to our success',
            az: 'Uğurumuzun təminatı',
          },
          body: {
            ru:
              'Слаженная и продуктивная работа всей команды, уважительное ' +
              'отношение к каждому ученику и помощь в раскрытии потенциала каждого ' +
              'как личности.',
            en:
              'The coordinated, productive work of the whole team, a respectful ' +
              'attitude to every student and help in unlocking each child’s ' +
              'potential as a personality.',
            az:
              'Bütün komandanın əlaqəli və məhsuldar işi, hər şagirdə hörmətlə ' +
              'yanaşma və hər kəsin şəxsiyyət kimi potensialını açmağa kömək.',
          },
        },
        {
          icon_key: 'home',
          title: { ru: 'Комфортная среда', en: 'Comfortable environment', az: 'Rahat mühit' },
          body: {
            ru:
              'Современные аудитории с большими мониторами, экзаменационные залы, ' +
              'комната отдыха, свой кафетерий и зелёный дворик с беседкой.',
            en:
              'Modern classrooms with large monitors, exam halls, a lounge, our own ' +
              'cafeteria and a green courtyard with a gazebo.',
            az:
              'Böyük monitorlu müasir auditoriyalar, imtahan zalları, istirahət otağı, ' +
              'öz kafeteriyamız və talvarlı yaşıl həyət.',
          },
        },
      ],
    },
    founder: {
      eyebrow: { ru: 'Founder & CEO', en: 'Founder & CEO', az: 'Təsisçi və CEO' },
      name: 'Fuad Ismayilov',
      title: {
        ru: 'Выпускник БГУ, факультет механической математики · 27 лет преподавания математики',
        en: 'Graduate of Baku State University, Faculty of Mechanics and Mathematics · 27 years teaching mathematics',
        az: 'BDU-nun Mexanika-riyaziyyat fakültəsinin məzunu · 27 illik riyaziyyat təcrübəsi',
      },
      badge_label: {
        ru: 'Автор 20+ учебников',
        en: 'Author of 20+ textbooks',
        az: '20+ dərsliyin müəllifi',
      },
      bio_paragraphs: [
        {
          ru:
            'Окончил Бакинский Государственный Университет, факультет «Механической ' +
            'математики», и магистратуру по специальности [[«Методика преподавания»]] ' +
            'с красным дипломом. ' +
            'Работал в государственных и частных школах, вёл индивидуальную ' +
            'подготовку по Curriculum / DİM, SAT и IB.',
          en:
            'Graduated from Baku State University, Faculty of Mechanics and ' +
            'Mathematics, and completed a master’s degree in [[«Teaching methodology»]] ' +
            'with honours. He worked in public and private schools and provided ' +
            'individual preparation for Curriculum / DİM, SAT and IB.',
          az:
            'Bakı Dövlət Universitetinin «Mexanika-riyaziyyat» fakültəsini və ' +
            '[[«Tədris metodikası»]] üzrə magistraturanı fərqlənmə diplomu ilə bitirib. ' +
            'Dövlət və özəl məktəblərdə çalışıb, Curriculum / DİM, SAT və IB üzrə ' +
            'fərdi hazırlıq aparıb.',
        },
        {
          ru:
            'По всеобщей просьбе родителей основал WisDoM Education Center, позже ' +
            'переименованный в TED Academy by Fuad Ismayilov. Автор 20+ электронных ' +
            'учебников по SAT и Curriculum/DİM на трёх языках.',
          en:
            'At the parents’ request he founded the WisDoM Education Center, later ' +
            'renamed TED Academy by Fuad Ismayilov. He is the author of 20+ ' +
            'e-textbooks for SAT and Curriculum/DİM in three languages.',
          az:
            'Valideynlərin ümumi istəyi ilə WisDoM Education Center-i təsis edib, ' +
            'sonradan TED Academy by Fuad Ismayilov adlandırılıb. SAT və ' +
            'Curriculum/DİM üzrə üç dildə 20-dən çox elektron dərsliyin müəllifidir.',
        },
      ],
      quote: {
        ru: '«Чужих детей не бывает» — главный девиз команды TED Academy.',
        en: '"There are no other people\'s children" — the guiding motto of the TED Academy team.',
        az: '«Özgə uşaq olmur» — TED Academy komandasının əsas devizi.',
      },
    },
    contacts: {
      phone: '+994 55 244 69 69',
      email: 'office@ted.edu.az',
      whatsapp_url: 'https://wa.me/994552446969',
      telegram_url: 'https://t.me/tedacademy',
      address: {
        ru: 'Баку, ул. Сейфеддин Даглы, 51',
        en: 'Baku, Seyfəddin Dağlı 51',
        az: 'Bakı, Seyfəddin Dağlı 51',
      },
      hours: [
        {
          ru: 'Очные и онлайн-занятия',
          en: 'In-person and online classes',
          az: 'Əyani və onlayn dərslər',
        },
        { ru: 'Пн–Сб: 10:00–18:00', en: 'Mon–Sat: 10:00–18:00', az: 'B.e–Ş: 10:00–18:00' },
      ],
      map_link: null,
    },
    meta: {
      site_title: {
        ru: 'TED Academy — учебный центр',
        en: 'TED Academy — educational center',
        az: 'TED Academy — tədris mərkəzi',
      },
      site_description: {
        ru:
          'Учебный центр в Баку. Математика, языки, подготовка к SAT и DİM, IT и ' +
          'Study Abroad. Онлайн и очно.',
        en:
          'Educational center in Baku. Mathematics, languages, SAT and DİM prep, IT ' +
          'and Study Abroad. Online and in person.',
        az:
          'Bakıda tədris mərkəzi. Riyaziyyat, dillər, SAT və DİM hazırlığı, IT və ' +
          'Study Abroad. Onlayn və əyani.',
      },
      og_image_url: null,
      logo_url: null,
    },
    updated_at: '2026-01-01T00:00:00Z',
  },
  courses: [
    {
      id: 'default-course-0',
      order_index: 0,
      icon_key: 'math',
      title: {
        ru: 'Математика и точные науки',
        en: 'Mathematics & sciences',
        az: 'Riyaziyyat və dəqiq elmlər',
      },
      body: {
        ru:
          'Математика с 1 по 11 класс, Calculus, физика, химия, биология, география, история. ' +
          'Авторские электронные учебники Фуада Исмаилова.',
        en:
          'Mathematics for grades 1–11, Calculus, physics, chemistry, biology, ' +
          'geography, history. Original e-textbooks by Fuad Ismayilov.',
        az:
          '1–11-ci siniflər üzrə riyaziyyat, Calculus, fizika, kimya, biologiya, ' +
          'coğrafiya, tarix. Fuad İsmayılovun müəllif elektron dərslikləri.',
      },
      link_url: null,
      archived_at: null,
    },
    {
      id: 'default-course-1',
      order_index: 1,
      icon_key: 'languages',
      title: { ru: 'Языки', en: 'Languages', az: 'Dillər' },
      body: {
        ru:
          'Английский по уровням A1–C2, американский английский, IELTS, TOEFL, ' +
          'Duolingo. Русский, азербайджанский, литература. Сертифицированные преподаватели.',
        en:
          'English by levels A1–C2, American English, IELTS, TOEFL, Duolingo. ' +
          'Russian, Azerbaijani, literature. Certified teachers.',
        az:
          'A1–C2 səviyyələri üzrə ingilis dili, Amerikan ingiliscəsi, IELTS, TOEFL, ' +
          'Duolingo. Rus, Azərbaycan dili, ədəbiyyat. Sertifikatlı müəllimlər.',
      },
      link_url: null,
      archived_at: null,
    },
    {
      id: 'default-course-2',
      order_index: 2,
      icon_key: 'exam',
      title: { ru: 'Экзамены DİM и SAT', en: 'DİM & SAT exams', az: 'DİM və SAT imtahanları' },
      body: {
        ru:
          'Подготовка к школьной аттестации (ИСО/БСО) и экзаменам для 8, 10 и 11 ' +
          'классов, ЛСО/6СО для 7–8 классов, выпускным и вступительным DİM (9–11), ' +
          'SAT Math & Verbal. Реальные варианты приёмной комиссии.',
        en:
          'Preparation for school attestation (summative assessments) and the exams ' +
          'for grades 8, 10 and 11, LSO/6SO for grades 7–8, DİM graduation and ' +
          'entrance exams (9–11), SAT Math & Verbal. Real admission-board papers.',
        az:
          'Məktəb attestasiyası (KSQ/BSQ) və 8, 10, 11-ci siniflər üçün imtahanlar, ' +
          '7–8-ci siniflər üçün LSO/6SO, DİM buraxılış və qəbul imtahanları (9–11), ' +
          'SAT Math & Verbal üzrə hazırlıq. Real qəbul komissiyası variantları.',
      },
      link_url: null,
      archived_at: null,
    },
    {
      id: 'default-course-3',
      order_index: 3,
      icon_key: 'it',
      title: { ru: 'IT и Study Abroad', en: 'IT & Study Abroad', az: 'IT və Study Abroad' },
      body: {
        ru:
          'Full-stack, Frontend, Backend, UI/UX, Data Analytics, ML-engineering. ' +
          'Поступление в вузы СНГ, России и топовые университеты мира — ' +
          'профессиональный подбор и сопровождение.',
        en:
          'Full-stack, Frontend, Backend, UI/UX, Data Analytics, ML engineering. ' +
          'Admission to universities in the CIS, Russia and the world’s top ' +
          'universities — professional selection and guidance.',
        az:
          'Full-stack, Frontend, Backend, UI/UX, Data Analytics, ML-engineering. ' +
          'MDB, Rusiya və dünyanın ən yaxşı universitetlərinə qəbul — peşəkar seçim ' +
          'və müşayiət.',
      },
      link_url: null,
      archived_at: null,
    },
  ],
  subjects: [
    {
      id: 'default-subject-0',
      order_index: 0,
      label: { ru: 'Математика 1–11', en: 'Mathematics 1–11', az: 'Riyaziyyat 1–11' },
      color_hex: '#2415C2',
    },
    {
      id: 'default-subject-1',
      order_index: 1,
      label: { ru: 'SAT Math & Verbal', en: 'SAT Math & Verbal', az: 'SAT Math & Verbal' },
      color_hex: '#A601A9',
    },
    {
      id: 'default-subject-2',
      order_index: 2,
      label: { ru: 'IELTS / TOEFL', en: 'IELTS / TOEFL', az: 'IELTS / TOEFL' },
      color_hex: '#5A2BD8',
    },
    {
      id: 'default-subject-3',
      order_index: 3,
      label: { ru: 'Duolingo English', en: 'Duolingo English', az: 'Duolingo English' },
      color_hex: '#C42BB0',
    },
    {
      id: 'default-subject-4',
      order_index: 4,
      label: { ru: 'Calculus', en: 'Calculus', az: 'Calculus' },
      color_hex: '#8E18BE',
    },
    {
      id: 'default-subject-5',
      order_index: 5,
      label: {
        ru: 'Физика / Химия / Биология',
        en: 'Physics / Chemistry / Biology',
        az: 'Fizika / Kimya / Biologiya',
      },
      color_hex: '#7A1FC8',
    },
    {
      id: 'default-subject-6',
      order_index: 6,
      label: {
        ru: 'Русский / Азербайджанский',
        en: 'Russian / Azerbaijani',
        az: 'Rus / Azərbaycan dili',
      },
      color_hex: '#2415C2',
    },
    {
      id: 'default-subject-7',
      order_index: 7,
      label: { ru: 'IT и Study Abroad', en: 'IT & Study Abroad', az: 'IT və Study Abroad' },
      color_hex: '#C42BB0',
    },
  ],
  testimonials: [
    {
      id: 'default-testimonial-0',
      order_index: 0,
      quote: {
        ru:
          'Сын ходит на математику и физику второй год. До TED Academy геометрия была ' +
          'болью — сейчас ребёнок сам решает задачи повышенной сложности и просит ' +
          'дополнительные. Огромное спасибо фуад муаллиму за терпение и подачу материала.',
        en:
          'My son has been attending mathematics and physics for a second year. ' +
          'Before TED Academy geometry was a pain — now he solves advanced problems ' +
          'on his own and asks for more. Huge thanks to Fuad müəllim for his patience ' +
          'and the way he explains the material.',
        az:
          'Oğlum ikinci ildir riyaziyyat və fizikaya gedir. TED Academy-dən əvvəl ' +
          'həndəsə əzab idi — indi çətin məsələləri özü həll edir və əlavə tapşırıq ' +
          'istəyir. Səbri və materialı izah tərzinə görə Fuad müəllimə təşəkkür edirik.',
      },
      author_name: 'Nigar Aliyeva',
      author_role: {
        ru: 'мама девятиклассника, Баку',
        en: 'mother of a 9th-grader, Baku',
        az: 'doqquzuncu sinif şagirdinin anası, Bakı',
      },
      avatar_initial: 'N',
      avatar_gradient_from: '#C42BB0',
      avatar_gradient_to: '#8E18BE',
      archived_at: null,
    },
    {
      id: 'default-testimonial-1',
      order_index: 1,
      quote: {
        ru:
          'Дочь готовилась к IELTS и SAT — поступила в университет в Турции со ' +
          'стипендией. Команда Study Abroad вела её от отбора вузов до визы. Мы живём ' +
          'в Канаде и занимались всё время онлайн — это реально работает.',
        en:
          'My daughter prepared for IELTS and SAT and got into a university in Turkey ' +
          'with a scholarship. The Study Abroad team guided her from choosing ' +
          'universities to the visa. We live in Canada and studied entirely online — ' +
          'it really works.',
        az:
          'Qızım IELTS və SAT-a hazırlaşdı — təqaüdlə Türkiyədə universitetə qəbul ' +
          'oldu. Study Abroad komandası onu universitet seçimindən vizaya qədər ' +
          'müşayiət etdi. Biz Kanadada yaşayırıq və bütün müddət onlayn oxuduq — bu, ' +
          'həqiqətən işləyir.',
      },
      author_name: 'Kamal Hasanov',
      author_role: {
        ru: 'папа выпускницы 2025, Торонто',
        en: 'father of a 2025 graduate, Toronto',
        az: '2025 məzununun atası, Toronto',
      },
      avatar_initial: 'K',
      avatar_gradient_from: '#2415C2',
      avatar_gradient_to: '#5A2BD8',
      archived_at: null,
    },
    {
      id: 'default-testimonial-2',
      order_index: 2,
      quote: {
        ru:
          'Привели младшего в седьмом классе — отставал по DİM-программе. Через ' +
          'полгода — лучший в классе, сам идёт на занятия. Нравится комната отдыха и ' +
          'дворик — ребёнок остаётся после уроков и занимается с друзьями.',
        en:
          'We brought our youngest in 7th grade — he was falling behind on the DİM ' +
          'program. Six months later he’s top of the class and goes to lessons ' +
          'himself. He loves the lounge and the courtyard — he stays after class and ' +
          'studies with friends.',
        az:
          'Kiçik oğlumuzu yeddinci sinifdə gətirdik — DİM proqramında geri qalırdı. ' +
          'Altı aydan sonra sinifdə birincidir, dərslərə özü gedir. İstirahət otağını ' +
          'və həyəti sevir — dərsdən sonra qalıb dostları ilə məşğul olur.',
      },
      author_name: 'Leyla Mammadova',
      author_role: {
        ru: 'мама ученика 8 класса',
        en: 'mother of an 8th-grade student',
        az: '8-ci sinif şagirdinin anası',
      },
      avatar_initial: 'L',
      avatar_gradient_from: '#A601A9',
      avatar_gradient_to: '#C42BB0',
      archived_at: null,
    },
    {
      id: 'default-testimonial-3',
      order_index: 3,
      quote: {
        ru:
          'Пришёл на Full-stack без опыта в программировании. За год собрал реальное ' +
          'портфолио и получил первую работу junior-разработчиком. Преподаватели-практики ' +
          'разбирали код вместе со мной и помогали готовиться к собеседованиям.',
        en:
          'I started Full-stack with zero coding experience. In a year I built a real ' +
          'portfolio and landed my first job as a junior developer. The teachers are ' +
          'working engineers — they reviewed my code with me and helped me prep for interviews.',
        az:
          'Full-stack-ə proqramlaşdırma təcrübəsi olmadan gəldim. Bir ildə real portfolio ' +
          'topladım və junior developer kimi ilk işimə düzəldim. Müəllimlər praktiklərdir — ' +
          'kodu mənimlə birlikdə təhlil etdilər və müsahibəyə hazırlaşmağa kömək etdilər.',
      },
      author_name: 'Elvin Quliyev',
      author_role: {
        ru: 'выпускник IT-направления, Баку',
        en: 'IT track graduate, Baku',
        az: 'IT istiqamətinin məzunu, Bakı',
      },
      avatar_initial: 'E',
      avatar_gradient_from: '#5A2BD8',
      avatar_gradient_to: '#2415C2',
      archived_at: null,
    },
    {
      id: 'default-testimonial-4',
      order_index: 4,
      quote: {
        ru:
          'Записалась на английский почти с нуля и через полтора года сдала TOEFL на ' +
          'нужный балл. Очень помогли электронное приложение и индивидуальный план — ' +
          'занималась в своём темпе и видела прогресс по каждой теме.',
        en:
          'I enrolled in English almost from scratch and a year and a half later passed ' +
          'TOEFL with the score I needed. The digital app and a personal study plan made ' +
          'the difference — I learned at my own pace and saw progress on every topic.',
        az:
          'İngilis dilinə demək olar ki, sıfırdan yazıldım və bir il yarım sonra TOEFL-u ' +
          'lazımi balla verdim. Rəqəmsal tətbiq və fərdi plan çox kömək etdi — öz tempimdə ' +
          'öyrəndim və hər mövzu üzrə tərəqqini gördüm.',
      },
      author_name: 'Aysel Mehdiyeva',
      author_role: {
        ru: 'студентка курса английского',
        en: 'English course student',
        az: 'İngilis dili kursunun tələbəsi',
      },
      avatar_initial: 'A',
      avatar_gradient_from: '#8E18BE',
      avatar_gradient_to: '#A601A9',
      archived_at: null,
    },
    {
      id: 'default-testimonial-5',
      order_index: 5,
      quote: {
        ru:
          'Сын поступил в один из топовых вузов Москвы. Команда Study Abroad помогла с ' +
          'выбором программы, документами и подготовкой к экзаменам — всё сопровождение ' +
          'от начала до зачисления было на них.',
        en:
          "My son got into one of Moscow's top universities. The Study Abroad team helped " +
          'with choosing the programme, the paperwork and exam prep — they handled the ' +
          'whole process from start to enrolment.',
        az:
          'Oğlum Moskvanın ən yaxşı universitetlərindən birinə qəbul oldu. Study Abroad ' +
          'komandası proqram seçimində, sənədlərdə və imtahan hazırlığında kömək etdi — ' +
          'bütün prosesi əvvəldən qəbula qədər onlar apardı.',
      },
      author_name: 'Rəşad Əliyev',
      author_role: {
        ru: 'папа первокурсника, Москва',
        en: 'father of a first-year student, Moscow',
        az: 'birinci kurs tələbəsinin atası, Moskva',
      },
      avatar_initial: 'R',
      avatar_gradient_from: '#2415C2',
      avatar_gradient_to: '#A601A9',
      archived_at: null,
    },
    {
      id: 'default-testimonial-6',
      order_index: 6,
      quote: {
        ru:
          'Дочь во втором классе и сама просится на занятия. Планшеты и электронные ' +
          'учебники делают уроки интересными, а мне в приложении видно, что и как ребёнок ' +
          'прошёл. Спокойна за её прогресс.',
        en:
          'My daughter is in second grade and asks to go to her lessons herself. The ' +
          'tablets and e-textbooks make classes fun, and in the app I can see exactly ' +
          "what she's covered. I feel at ease about her progress.",
        az:
          'Qızım ikinci sinifdədir və dərslərə özü getmək istəyir. Planşetlər və elektron ' +
          'dərsliklər dərsləri maraqlı edir, tətbiqdə isə uşağın nəyi keçdiyini görürəm. ' +
          'Onun tərəqqisinə görə arxayınam.',
      },
      author_name: 'Günel Hüseynova',
      author_role: {
        ru: 'мама ученицы 2 класса',
        en: 'mother of a 2nd-grade student',
        az: '2-ci sinif şagirdinin anası',
      },
      avatar_initial: 'G',
      avatar_gradient_from: '#C42BB0',
      avatar_gradient_to: '#5A2BD8',
      archived_at: null,
    },
    {
      id: 'default-testimonial-7',
      order_index: 7,
      quote: {
        ru:
          'Готовился к SAT по математике и набрал 780 из 800. Авторские учебники и ' +
          'регулярные пробные экзамены сделали своё — на реальном тесте не было ни одного ' +
          'сюрприза. Теперь подаюсь в сильные университеты.',
        en:
          'I prepped for SAT Math and scored 780 out of 800. The original textbooks and ' +
          'regular mock exams did the job — there was not a single surprise on the real ' +
          'test. Now I am applying to strong universities.',
        az:
          'SAT riyaziyyata hazırlaşdım və 800-dən 780 topladım. Müəllif dərslikləri və ' +
          'müntəzəm sınaq imtahanları öz işini gördü — real testdə bir dənə də sürpriz ' +
          'olmadı. İndi güclü universitetlərə sənəd verirəm.',
      },
      author_name: 'Tural Babayev',
      author_role: {
        ru: 'выпускник, SAT Math 780',
        en: 'graduate, SAT Math 780',
        az: 'məzun, SAT Math 780',
      },
      avatar_initial: 'T',
      avatar_gradient_from: '#A601A9',
      avatar_gradient_to: '#5A2BD8',
      archived_at: null,
    },
  ],
  results: [
    {
      id: 'default-result-0',
      order_index: 0,
      author_name: 'Aysel Mehdiyeva',
      photo_url: null,
      avatar_initial: 'A',
      avatar_gradient_from: '#C42BB0',
      avatar_gradient_to: '#8E18BE',
      course: { ru: 'SAT / Математика', en: 'SAT / Mathematics', az: 'SAT / Riyaziyyat' },
      admission: {
        ru: 'Boğaziçi University · стипендия',
        en: 'Boğaziçi University · scholarship',
        az: 'Boğaziçi University · təqaüd',
      },
      archived_at: null,
    },
    {
      id: 'default-result-1',
      order_index: 1,
      author_name: 'Tural Babayev',
      photo_url: null,
      avatar_initial: 'T',
      avatar_gradient_from: '#A601A9',
      avatar_gradient_to: '#5A2BD8',
      course: { ru: 'SAT Math', en: 'SAT Math', az: 'SAT Math' },
      admission: {
        ru: 'Koç University · грант 50%',
        en: 'Koç University · 50% grant',
        az: 'Koç University · 50% qrant',
      },
      archived_at: null,
    },
    {
      id: 'default-result-2',
      order_index: 2,
      author_name: 'Nigar Hüseynova',
      photo_url: null,
      avatar_initial: 'N',
      avatar_gradient_from: '#2415C2',
      avatar_gradient_to: '#5A2BD8',
      course: {
        ru: 'IELTS / Study Abroad',
        en: 'IELTS / Study Abroad',
        az: 'IELTS / Study Abroad',
      },
      admission: {
        ru: 'University of Toronto',
        en: 'University of Toronto',
        az: 'University of Toronto',
      },
      archived_at: null,
    },
    {
      id: 'default-result-3',
      order_index: 3,
      author_name: 'Kamran Əliyev',
      photo_url: null,
      avatar_initial: 'K',
      avatar_gradient_from: '#7A1FC8',
      avatar_gradient_to: '#A601A9',
      course: { ru: 'DİM / Математика', en: 'DİM / Mathematics', az: 'DİM / Riyaziyyat' },
      admission: {
        ru: 'ADA University · грант',
        en: 'ADA University · grant',
        az: 'ADA University · qrant',
      },
      archived_at: null,
    },
    {
      id: 'default-result-4',
      order_index: 4,
      author_name: 'Leyla Mammadova',
      photo_url: null,
      avatar_initial: 'L',
      avatar_gradient_from: '#A601A9',
      avatar_gradient_to: '#C42BB0',
      course: { ru: 'IELTS / TOEFL', en: 'IELTS / TOEFL', az: 'IELTS / TOEFL' },
      admission: {
        ru: 'METU (Турция)',
        en: 'METU (Turkey)',
        az: 'METU (Türkiyə)',
      },
      archived_at: null,
    },
    {
      id: 'default-result-5',
      order_index: 5,
      author_name: 'Elvin Quliyev',
      photo_url: null,
      avatar_initial: 'E',
      avatar_gradient_from: '#5A2BD8',
      avatar_gradient_to: '#2415C2',
      course: {
        ru: 'IT / Олимпиадная математика',
        en: 'IT / Competition mathematics',
        az: 'IT / Olimpiada riyaziyyatı',
      },
      admission: {
        ru: 'ITMO University · бюджет',
        en: 'ITMO University · state-funded',
        az: 'ITMO University · büdcə',
      },
      archived_at: null,
    },
  ],
};
