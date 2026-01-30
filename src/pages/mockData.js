// Mock data для інтернет-магазину "Поплавок"

// ==============================================
// ІМПОРТ ФОТОГРАФІЙ
// ==============================================

// Леска
// mockData.js
// Импорт фотографий
import Lestka1 from "./Photos/Lestka-100m.jpg";
import Lestka2 from "./Photos/Lestka-300m.jpg";
import Lugha100g from "./Photos/lugha-100g.jpg";
import Lugha10g from "./Photos/lugha-10g.jpg";
import Lugha50g from "./Photos/lugha-50g.jpg";
import Chat from "./Photos/Chat.png";
import Fider from "./Photos/Fider.jpg";
import Fish from "./Photos/Fish.jpg";
import Hook from "./Photos/Hook.jpg";
import Coil from "./Photos/Coil.jpg";
import Umbrella from "./Photos/Umbrella.jpg";
import Wobbler from "./Photos/Wobbler.jpg";

export const categories = [
  { 
    id: 1, 
    name: 'Лижа', 
    slug: 'spinning-rods', 
    image: Lugha10g,
    subcategories: [
      { id: 101, name: '10г', slug: '10g', image: Lugha10g },
      { id: 103, name: '50г', slug: '50g', image: Lugha50g },
      { id: 105, name: '100г', slug: '100g', image: Lugha100g }
    ]
  },
  { 
    id: 2, 
    name: 'Ліска', 
    slug: 'spinning-reels', 
    image: Lestka1,
    subcategories: [
      { id: 201, name: '100м', slug: '100m', image: Lestka1 },
      { id: 202, name: '300м', slug: '300m', image: Lestka2 }
    ]
  },
  { 
    id: 3, 
    name: 'Фідерні вудилища', 
    slug: 'feeder-rods', 
    image: Fider,
    subcategories: []
  },
  { 
    id: 4, 
    name: 'Фідерні котушки', 
    slug: 'feeder-reels', 
    image: Coil,
    subcategories: []
  },
  { 
    id: 5, 
    name: 'Коропові вудилища', 
    slug: 'carp-rods', 
    image: Fider,
    subcategories: []
  },
  { 
    id: 6,
    name: 'Коропові котушки', 
    slug: 'carp-reels', 
    image: Coil,
    subcategories: []
  },
  { 
    id: 7, 
    name: 'Жилки, волосінь', 
    slug: 'fishing-line', 
    image: Lestka1,
    subcategories: []
  },
  { 
    id: 8, 
    name: 'Гачки', 
    slug: 'hooks', 
    image: Hook,
    subcategories: []
  },
  { 
    id: 9, 
    name: 'Приманки', 
    slug: 'lures', 
    image: Wobbler,
    subcategories: []
  },
  { 
    id: 10, 
    name: 'Зимове оснащення', 
    slug: 'winter-equipment', 
    image: Fish,
    subcategories: []
  },
  { 
    id: 11, 
    name: 'Одяг, взуття', 
    slug: 'clothing', 
    image: Umbrella,
    subcategories: []
  },
  { 
    id: 12, 
    name: 'Туризм, кемпінг', 
    slug: 'camping', 
    image: Umbrella,
    subcategories: []
  }
];

// ==============================================
// ТОВАРИ
// ==============================================

export const products = [
  // ========== ЛИЖА - 10г ==========
  {
    id: 1,
    name: 'Спінінгове вудлище Azura Safina Thrower ST86M (10г)',
    price: 7100,
    oldPrice: null,
    image: Lugha10g,
    category: 'spinning-rods',
    subcategory: '10g',
    isNew: true,
    isHit: false,
    discount: null,
    description: 'Високоякісне спінінгове вудлище для професійної риболовлі. Довжина 2.59м, тест 6-28г.',
    specifications: {
      length: '2.59м',
      test: '6-28г',
      sections: '2',
      weight: '145г',
      material: 'Вуглепластик'
    },
    inStock: true,
    rating: 4.8,
    reviews: 24
  },
  {
    id: 2,
    name: 'Спінінгове вудлище Shimano Catana CX 240 (10г)',
    price: 4500,
    oldPrice: 5200,
    image: Lugha10g,
    category: 'spinning-rods',
    subcategory: '10g',
    isNew: false,
    isHit: true,
    discount: 13,
    description: 'Надійне універсальне вудлище для початківців. Довжина 2.4м, тест 5-25г.',
    specifications: {
      length: '2.4м',
      test: '5-25г',
      sections: '2',
      weight: '180г',
      material: 'Карбон'
    },
    inStock: true,
    rating: 4.5,
    reviews: 42
  },
  
  // ========== ЛИЖА - 50г ==========
  {
    id: 3,
    name: 'Спінінгове вудлище Salmo Elite Sniper (50г)',
    price: 7800,
    oldPrice: 8500,
    image: Lugha50g,
    category: 'spinning-rods',
    subcategory: '50g',
    isNew: false,
    isHit: true,
    discount: 8,
    description: 'Професійне вудлище для морської риболовлі. Тест 40-100г.',
    specifications: {
      length: '3.0м',
      test: '40-100г',
      sections: '2',
      weight: '280г',
      material: 'Вуглепластик'
    },
    inStock: true,
    rating: 4.8,
    reviews: 36
  },
  {
    id: 4,
    name: 'Спінінгове вудлище Daiwa Ninja 702MFS (50г)',
    price: 6200,
    oldPrice: 7000,
    image: Lugha50g,
    category: 'spinning-rods',
    subcategory: '50g',
    isNew: false,
    isHit: false,
    discount: 11,
    description: 'Міцне вудлище для важких приманок. Тест 40-80г.',
    specifications: {
      length: '2.1м',
      test: '40-80г',
      sections: '2',
      weight: '265г',
      material: 'Карбон'
    },
    inStock: true,
    rating: 4.6,
    reviews: 18
  },
  
  // ========== ЛИЖА - 100г ==========
  {
    id: 5,
    name: 'Спінінгове вудлище Azura Power Hunter (100г)',
    price: 8900,
    oldPrice: 9500,
    image: Lugha100g,
    category: 'spinning-rods',
    subcategory: '100g',
    isNew: false,
    isHit: true,
    discount: 6,
    description: 'Потужне вудлище для ловлі великої риби. Тест 80-150г.',
    specifications: {
      length: '2.7м',
      test: '80-150г',
      sections: '2',
      weight: '310г',
      material: 'Вуглепластик'
    },
    inStock: true,
    rating: 4.7,
    reviews: 29
  },
  {
    id: 6,
    name: 'Спінінгове вудлище Mikado Fish Hunter (100г)',
    price: 5500,
    oldPrice: null,
    image: Lugha100g,
    category: 'spinning-rods',
    subcategory: '100g',
    isNew: true,
    isHit: false,
    discount: null,
    description: 'Міцне вудлище для важких приманок. Тест 70-120г.',
    specifications: {
      length: '2.4м',
      test: '70-120г',
      sections: '2',
      weight: '330г',
      material: 'Скловолокно'
    },
    inStock: true,
    rating: 4.4,
    reviews: 15
  },
  
  // ========== ЛІСКА - 100м ==========
  {
    id: 7,
    name: 'Ліска Monofilament Premium 100м',
    price: 150,
    oldPrice: 200,
    image: Lestka1,
    category: 'spinning-reels',
    subcategory: '100m',
    isNew: false,
    isHit: true,
    discount: 25,
    description: 'Якісна монофілна ліска діаметром 0.25мм, довжина 100м.',
    specifications: {
      length: '100м',
      diameter: '0.25мм',
      breaking_load: '5кг',
      color: 'Прозорий'
    },
    inStock: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 8,
    name: 'Ліска Fluorocarbon Expert 100м',
    price: 350,
    oldPrice: 400,
    image: Lestka1,
    category: 'spinning-reels',
    subcategory: '100m',
    isNew: true,
    isHit: false,
    discount: 13,
    description: 'Флуорокарбонова ліска з низькою видимістю у воді.',
    specifications: {
      length: '100м',
      diameter: '0.20мм',
      breaking_load: '4кг',
      color: 'Зелений'
    },
    inStock: true,
    rating: 4.7,
    reviews: 23
  },
  
  // ========== ЛІСКА - 300м ==========
  {
    id: 9,
    name: 'Ліска Braided Sufix 832 300м',
    price: 850,
    oldPrice: 950,
    image: Lestka2,
    category: 'spinning-reels',
    subcategory: '300m',
    isNew: false,
    isHit: true,
    discount: 11,
    description: 'Преміум плетена ліска з 8-нитковим плетінням.',
    specifications: {
      length: '300м',
      diameter: '0.18мм',
      breaking_load: '12кг',
      color: 'Чорний'
    },
    inStock: true,
    rating: 4.8,
    reviews: 52
  },
  {
    id: 10,
    name: 'Ліска Monofilament Maxcatch 300м',
    price: 180,
    oldPrice: null,
    image: Lestka2,
    category: 'spinning-reels',
    subcategory: '300m',
    isNew: true,
    isHit: false,
    discount: null,
    description: 'Економна монофілна ліска для початківців.',
    specifications: {
      length: '300м',
      diameter: '0.35мм',
      breaking_load: '9кг',
      color: 'Прозорий'
    },
    inStock: true,
    rating: 4.3,
    reviews: 27
  },
  
  // ========== ФІДЕРНІ КОТУШКИ ==========
  {
    id: 11,
    name: 'Котушка Azura 25 Olivia 1000S',
    price: 2500,
    oldPrice: null,
    image: Coil,
    category: 'feeder-reels',
    subcategory: null,
    isNew: true,
    isHit: true,
    discount: null,
    description: 'Надійна спінінгова котушка з плавним ходом та потужною системою гальмування.',
    specifications: {
      bearings: '10+1',
      gear_ratio: '5.2:1',
      weight: '230г',
      line_capacity: '0.20мм/240м'
    },
    inStock: true,
    rating: 4.9,
    reviews: 47
  },
  {
    id: 12,
    name: 'Котушка Shimano Nexave 4000',
    price: 3200,
    oldPrice: 3800,
    image: Coil,
    category: 'feeder-reels',
    subcategory: null,
    isNew: false,
    isHit: true,
    discount: 16,
    description: 'Потужна котушка для фідерної риболовлі.',
    specifications: {
      bearings: '8+1',
      gear_ratio: '5.0:1',
      weight: '310г',
      line_capacity: '0.25мм/200м'
    },
    inStock: true,
    rating: 4.7,
    reviews: 31
  },
  
  // ========== ПРИМАНКИ ==========
  {
    id: 13,
    name: 'Набір приманок Premium Set',
    price: 890,
    oldPrice: 1200,
    image: Wobbler,
    category: 'lures',
    subcategory: null,
    isNew: false,
    isHit: true,
    discount: 26,
    description: 'Професійний набір силіконових приманок для хижої риби. 20 штук різних розмірів.',
    specifications: {
      quantity: '20 шт',
      sizes: '5-12см',
      colors: 'Мікс'
    },
    inStock: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 14,
    name: 'Воблер Rapala X-Rap 10',
    price: 450,
    oldPrice: 550,
    image: Wobbler,
    category: 'lures',
    subcategory: null,
    isNew: true,
    isHit: false,
    discount: 18,
    description: 'Популярний воблер для ловлі щуки та судака.',
    specifications: {
      length: '10см',
      weight: '14г',
      заглиблення: '1.5-2м',
      color: 'Червоно-білий'
    },
    inStock: true,
    rating: 4.8,
    reviews: 89
  },
  
  // ========== ФІДЕРНІ ВУДИЛИЩА ==========
  {
    id: 15,
    name: 'Фідерне вудлище Pro Feeder 3.6м',
    price: 3200,
    oldPrice: null,
    image: Fider,
    category: 'feeder-rods',
    subcategory: null,
    isNew: false,
    isHit: true,
    discount: null,
    description: 'Універсальне фідерне вудлище для риболовлі на середніх дистанціях.',
    specifications: {
      length: '3.6м',
      test: 'до 100г',
      sections: '3',
      quivertips: '3 шт'
    },
    inStock: true,
    rating: 4.7,
    reviews: 52
  },
  
  // ========== КЕМПІНГ ==========
  {
    id: 16,
    name: 'Парасоля з тентом Competition 2.5м',
    price: 4000,
    oldPrice: null,
    image: Umbrella,
    category: 'camping',
    subcategory: null,
    isNew: true,
    isHit: false,
    discount: null,
    description: 'Професійна парасоля для риболовлі з повним тентом. Захист від дощу та сонця.',
    specifications: {
      diameter: '2.5м',
      material: 'Поліестер 190T',
      uv_protection: 'UPF 50+',
      weight: '3.2кг'
    },
    inStock: true,
    rating: 4.6,
    reviews: 18
  },
  {
    id: 17,
    name: 'Намет туристичний Forrest Camping 3',
    price: 4500,
    oldPrice: null,
    image: Umbrella,
    category: 'camping',
    subcategory: null,
    isNew: false,
    isHit: false,
    discount: null,
    description: 'Тримісний намет для туризму та риболовлі. Водонепроникний матеріал.',
    specifications: {
      capacity: '3 особи',
      waterproof: '3000мм',
      size: '210x180x130см',
      weight: '4.5кг'
    },
    inStock: true,
    rating: 4.5,
    reviews: 34
  },
  
  // ========== ГАЧКИ ==========
  {
    id: 18,
    name: 'Гачки коропові Size 6 (10 шт)',
    price: 120,
    oldPrice: null,
    image: Hook,
    category: 'hooks',
    subcategory: null,
    isNew: false,
    isHit: false,
    discount: null,
    description: 'Гострі міцні гачки для коропової риболовлі. Антикорозійне покриття.',
    specifications: {
      size: '№6',
      quantity: '10 шт',
      coating: 'PTFE',
      color: 'Чорний'
    },
    inStock: true,
    rating: 4.8,
    reviews: 93
  },
  {
    id: 19,
    name: 'Гачки Owner SSW Size 2 (15 шт)',
    price: 280,
    oldPrice: 350,
    image: Hook,
    category: 'hooks',
    subcategory: null,
    isNew: true,
    isHit: true,
    discount: 20,
    description: 'Високоякісні гачки для морської риболовлі.',
    specifications: {
      size: '№2',
      quantity: '15 шт',
      coating: 'Нержавіюча сталь',
      color: 'Золотий'
    },
    inStock: true,
    rating: 4.9,
    reviews: 47
  },
  
  // ========== ОДЯГ ==========
  {
    id: 20,
    name: 'Термокостюм зимовий Azura XXL',
    price: 5800,
    oldPrice: 7200,
    image: Umbrella,
    category: 'clothing',
    subcategory: null,
    isNew: false,
    isHit: true,
    discount: 19,
    description: 'Теплий водонепроникний костюм для зимової риболовлі.',
    specifications: {
      size: 'XXL',
      temperature: 'до -30°C',
      material: 'Мембрана 10000/10000',
      insulation: 'Тінсулейт'
    },
    inStock: true,
    rating: 4.9,
    reviews: 42
  },
  
  // ========== КОРОПОВІ ВУДИЛИЩА ==========
  {
    id: 21,
    name: 'Коропове вудлище Korda Kaizen Green 12ft',
    price: 7506,
    oldPrice: null,
    image: Fider,
    category: 'carp-rods',
    subcategory: null,
    isNew: true,
    isHit: false,
    discount: null,
    description: 'Преміум коропове вудлище з чутливим бланком для далекого забросу.',
    specifications: {
      length: '12ft (3.66м)',
      test: '3.5lb',
      sections: '2',
      weight: '385г'
    },
    inStock: true,
    rating: 4.9,
    reviews: 31
  }
];

// ==============================================
// ВИДИ РИБ
// ==============================================

export const fishTypes = [
  { id: 1, name: 'Щука', slug: 'pike', image: Fish },
  { id: 2, name: 'Короп', slug: 'carp', image: Fish },
  { id: 3, name: 'Карась', slug: 'crucian', image: Fish },
  { id: 4, name: 'Окунь', slug: 'perch', image: Fish },
  { id: 5, name: 'Судак', slug: 'zander', image: Fish },
  { id: 6, name: 'Лящ', slug: 'bream', image: Fish },
  { id: 7, name: 'Сом', slug: 'catfish', image: Fish },
  { id: 8, name: 'Товстолобик', slug: 'silver-carp', image: Fish }
];

// ==============================================
// БАНЕРИ
// ==============================================

export const banners = [
  {
    id: 1,
    title: 'Знижка 10% на все',
    subtitle: 'Святкова акція',
    image: Chat,
    link: '/promotions/winter-sale'
  },
  {
    id: 2,
    title: 'Новий магазин у Тернополі',
    subtitle: 'Запрошуємо відвідати',
    image: Chat,
    link: '/news/new-store'
  },
  {
    id: 3,
    title: 'Зимова колекція',
    subtitle: 'Все для зимової риболовлі',
    image: Fish,
    link: '/catalog/winter-equipment'
  }
];

// ==============================================
// БРЕНДИ
// ==============================================

export const brands = [
  { id: 1, name: 'Поплавок', logo: '/brands/poplavok.svg' },
  { id: 2, name: 'Azura', logo: '/brands/azura.svg' },
  { id: 3, name: 'Forrest', logo: '/brands/forrest.svg' },
  { id: 4, name: 'Korda', logo: '/brands/korda.svg' }
];

// ==============================================
// ОСОБЛИВОСТІ
// ==============================================

export const features = [
  {
    id: 1,
    title: 'Ми завжди поруч',
    description: 'Завдяки магазинам по Україні та швидкій доставці ми завжди поруч із вами.',
    icon: 'MapPin'
  },
  {
    id: 2,
    title: 'Турбота про ваш гаманець',
    description: 'Програма лояльності — вигідні покупки та до 15% знижки.',
    icon: 'Wallet'
  },
  {
    id: 3,
    title: 'Спільна мета',
    description: 'Ми створюємо культуру риболовлі та підтримуємо еко-ініціативи.',
    icon: 'Target'
  },
  {
    id: 4,
    title: 'Якість продукції',
    description: 'Товари обираються та тестуються рибалками для рибалок.',
    icon: 'Award'
  },
  {
    id: 5,
    title: 'Власне виробництво',
    description: 'Наші унікальні товари створені рибалками для справжніх ентузіастів.',
    icon: 'Factory'
  },
  {
    id: 6,
    title: '25 років довіри',
    description: 'Ми здобули довіру тисяч рибалок по всій Україні.',
    icon: 'Shield'
  }
];