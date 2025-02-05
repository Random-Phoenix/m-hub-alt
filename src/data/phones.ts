import { Phone } from '../types';

export const phones: Phone[] = [
  // Latest Phones (50 devices)
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: [
      "Xiaomi Redmi Note 14 Pro", "Samsung Galaxy S25 Ultra", "iPhone 16 Pro Max", "Google Pixel 9 Pro", "Oppo Reno 13",
      "Vivo V30 Pro", "Realme GT 5 Pro", "OnePlus 12T", "Huawei P70 Pro", "Infinix Zero 40 Ultra",
      "Tecno Phantom X5", "Nokia XR30", "Motorola Edge 50 Pro", "Sony Xperia 1 VI", "Honor Magic 6 Pro",
      "Asus Zenfone 11", "LG Velvet 3", "ZTE Axon 50 Ultra", "Meizu 21 Pro", "Black Shark 6 Pro",
      "Lenovo Legion Phone 3", "Poco X7 Pro", "iQOO 12 Pro", "Nubia Z60 Ultra", "Fairphone 5",
      "Cat S75", "Sharp Aquos R8", "HTC U24 Pro", "Micromax In 3 Pro", "Lava Agni 3",
      "Google Pixel 8a", "Samsung Galaxy A75", "Xiaomi Mi 14 Lite", "Oppo Find X7", "Vivo X100 Pro",
      "Realme Narzo 70 Pro", "Infinix Note 40 Pro", "Tecno Camon 30 Ultra", "Motorola Moto G100", "Nokia G60",
      "OnePlus Nord 5", "Huawei Nova 12 Pro", "Honor X9b", "Asus ROG Phone 8", "Sony Xperia 10 VI",
      "ZTE Nubia Red Magic 10", "Meizu 20 Pro", "Black Shark 7 Pro", "Lenovo Legion Phone 4", "Poco F6 Pro"
    ][i],
    price: parseInt([
      "79,999", "390,500", "518,999", "376,400", "100,300",
      "120,000", "145,000", "160,000", "180,000", "95,000",
      "85,000", "110,000", "130,000", "250,000", "200,000",
      "140,000", "90,000", "150,000", "170,000", "220,000",
      "210,000", "80,000", "190,000", "230,000", "240,000",
      "70,000", "260,000", "135,000", "50,000", "60,000",
      "105,000", "115,000", "125,000", "175,000", "185,000",
      "65,000", "75,000", "88,000", "98,000", "108,000",
      "118,000", "128,000", "138,000", "148,000", "158,000",
      "168,000", "178,000", "188,000", "198,000", "208,000"
    ][i].replace(/,/g, ''), 10),
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
    category: "Latest Phones",
    specs: {
      screen: [
        "6.7-inch OLED", "6.8-inch AMOLED", "6.7-inch Super Retina XDR", "6.7-inch OLED 120Hz", "6.78-inch AMOLED",
        "6.56-inch AMOLED", "6.74-inch AMOLED", "6.67-inch AMOLED", "6.8-inch OLED", "6.9-inch AMOLED",
        "6.55-inch OLED", "6.5-inch IPS LCD", "6.7-inch OLED", "6.1-inch OLED 4K", "6.81-inch OLED",
        "6.59-inch AMOLED", "6.8-inch P-OLED", "6.92-inch AMOLED", "6.7-inch AMOLED", "6.78-inch AMOLED",
        "6.9-inch AMOLED", "6.67-inch AMOLED", "6.78-inch AMOLED", "6.8-inch AMOLED", "6.3-inch OLED",
        "6.5-inch IPS LCD", "6.6-inch AMOLED", "6.7-inch OLED", "6.5-inch IPS LCD", "6.78-inch AMOLED",
        "6.1-inch OLED", "6.4-inch AMOLED", "6.55-inch AMOLED", "6.82-inch AMOLED", "6.78-inch AMOLED",
        "6.72-inch IPS LCD", "6.78-inch AMOLED", "6.67-inch AMOLED", "6.7-inch OLED", "6.56-inch IPS LCD",
        "6.55-inch AMOLED", "6.78-inch AMOLED", "6.8-inch AMOLED", "6.78-inch AMOLED", "6.5-inch OLED",
        "6.8-inch AMOLED", "6.7-inch AMOLED", "6.78-inch AMOLED", "6.9-inch AMOLED", "6.67-inch AMOLED"
      ][i],
      processor: [
        "Snapdragon 8 Gen 3", "Exynos 2400", "A18 Bionic", "Google Tensor G4", "Dimensity 9200",
        "Snapdragon 7+ Gen 2", "Snapdragon 8 Gen 2", "Dimensity 9200+", "Kirin 9000S", "Helio G99",
        "Snapdragon 778G", "Snapdragon 695", "Snapdragon 8+ Gen 1", "Snapdragon 8 Gen 1", "Snapdragon 8 Gen 2",
        "Snapdragon 888", "Snapdragon 765G", "Snapdragon 8 Gen 3", "Dimensity 8100", "Snapdragon 8 Gen 2",
        "Snapdragon 8 Gen 3", "Snapdragon 7 Gen 2", "Snapdragon 8 Gen 2", "Snapdragon 8 Gen 3", "Snapdragon 778G",
        "Helio G85", "Snapdragon 480+", "Snapdragon 680", "Helio G36", "Dimensity 9200",
        "Google Tensor G3", "Exynos 1380", "Snapdragon 7 Gen 1", "Snapdragon 8 Gen 2", "Dimensity 9200+",
        "Helio G99", "Helio G95", "Snapdragon 695", "Snapdragon 778G", "Snapdragon 480+",
        "Snapdragon 7 Gen 2", "Snapdragon 8 Gen 2", "Snapdragon 8 Gen 3", "Snapdragon 8 Gen 2", "Snapdragon 778G",
        "Snapdragon 8 Gen 3", "Snapdragon 8 Gen 2", "Snapdragon 8 Gen 3", "Snapdragon 8 Gen 2", "Snapdragon 7 Gen 2"
      ][i],
      camera: [
        "50MP Triple Camera", "200MP Quad Camera", "48MP Triple Camera", "50MP Triple Camera", "64MP Triple Camera",
        "50MP Dual Camera", "108MP Triple Camera", "50MP Triple Camera", "50MP Quad Camera", "64MP Triple Camera",
        "64MP Triple Camera", "50MP Dual Camera", "50MP Triple Camera", "12MP Triple Camera", "50MP Triple Camera",
        "64MP Triple Camera", "64MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "108MP Triple Camera",
        "64MP Dual Camera", "50MP Triple Camera", "50MP Triple Camera", "64MP Triple Camera", "50MP Dual Camera",
        "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "13MP Dual Camera", "50MP Triple Camera",
        "64MP Dual Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera",
        "50MP Dual Camera", "50MP Triple Camera", "64MP Triple Camera", "50MP Dual Camera", "50MP Dual Camera",
        "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Dual Camera",
        "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera"
      ][i]
    },
    releaseDate: new Date("2024-10-01"),
    views: 15000,
    trending: true
  })),
  // Premium Phones (50 devices)
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 51,
    name: [
      "Samsung Galaxy Z Fold 6", "iPhone 15 Pro Max", "Google Pixel 9 Pro XL", "Huawei Mate XT Ultimate", "OnePlus Nord 4",
      "Xiaomi Mi 14 Ultra", "Oppo Find X7 Pro", "Vivo X100 Ultra", "Realme GT 6 Pro", "Infinix Zero 40 Ultra",
      "Tecno Phantom X6", "Nokia XR40", "Motorola Edge 60 Pro", "Sony Xperia 1 VI", "Honor Magic 6 Ultimate",
      "Asus Zenfone 12", "LG Velvet 4", "ZTE Axon 60 Ultra", "Meizu 22 Pro", "Black Shark 7 Pro",
      "Lenovo Legion Phone 4", "Poco X8 Pro", "iQOO 13 Pro", "Nubia Z70 Ultra", "Fairphone 6",
      "Cat S80", "Sharp Aquos R9", "HTC U25 Pro", "Micromax In 4 Pro", "Lava Agni 4",
      "Google Pixel 9 Pro", "Samsung Galaxy A85", "Xiaomi Mi 15 Lite", "Oppo Find X8", "Vivo X110 Pro",
      "Realme Narzo 80 Pro", "Infinix Note 50 Pro", "Tecno Camon 40 Ultra", "Motorola Moto G200", "Nokia G70",
      "OnePlus Nord 6", "Huawei Nova 13 Pro", "Honor X10b", "Asus ROG Phone 9", "Sony Xperia 11 VI",
      "ZTE Nubia Red Magic 11", "Meizu 21 Pro", "Black Shark 8 Pro", "Lenovo Legion Phone 5", "Poco F7 Pro"
    ][i],
    price: parseInt([
      "577,999", "325,900", "314,999", "185,500", "152,200",
      "200,000", "220,000", "240,000", "160,000", "95,000",
      "85,000", "110,000", "130,000", "250,000", "200,000",
      "140,000", "90,000", "150,000", "170,000", "220,000",
      "210,000", "80,000", "190,000", "230,000", "240,000",
      "70,000", "260,000", "135,000", "50,000", "60,000",
      "105,000", "115,000", "125,000", "175,000", "185,000",
      "65,000", "75,000", "88,000", "98,000", "108,000",
      "118,000", "128,000", "138,000", "148,000", "158,000",
      "168,000", "178,000", "188,000", "198,000", "208,000"
    ][i].replace(/,/g, ''), 10),
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
    category: "Premium Phones",
    specs: {
      screen: [
        "7.6-inch Foldable AMOLED", "6.7-inch Super Retina XDR", "6.8-inch OLED 120Hz", "6.78-inch AMOLED", "6.74-inch AMOLED",
        "6.8-inch AMOLED", "6.82-inch AMOLED", "6.78-inch AMOLED", "6.7-inch AMOLED", "6.9-inch AMOLED",
        "6.55-inch OLED", "6.5-inch IPS LCD", "6.7-inch OLED", "6.1-inch OLED 4K", "6.81-inch OLED",
        "6.59-inch AMOLED", "6.8-inch P-OLED", "6.92-inch AMOLED", "6.7-inch AMOLED", "6.78-inch AMOLED",
        "6.9-inch AMOLED", "6.67-inch AMOLED", "6.78-inch AMOLED", "6.8-inch AMOLED", "6.3-inch OLED",
        "6.5-inch IPS LCD", "6.6-inch AMOLED", "6.7-inch OLED", "6.5-inch IPS LCD", "6.78-inch AMOLED",
        "6.1-inch OLED", "6.4-inch AMOLED", "6.55-inch AMOLED", "6.82-inch AMOLED", "6.78-inch AMOLED",
        "6.72-inch IPS LCD", "6.78-inch AMOLED", "6.67-inch AMOLED", "6.7-inch OLED", "6.56-inch IPS LCD",
        "6.55-inch AMOLED", "6.78-inch AMOLED", "6.8-inch AMOLED", "6.78-inch AMOLED", "6.5-inch OLED",
        "6.8-inch AMOLED", "6.7-inch AMOLED", "6.78-inch AMOLED", "6.9-inch AMOLED", "6.67-inch AMOLED"
      ][i],
      processor: [
        "Snapdragon 8 Gen 3", "A17 Pro", "Google Tensor G4", "Kirin 9000S", "Snapdragon 8 Gen 2",
        "Snapdragon 8 Gen 3", "Snapdragon 8 Gen 2", "Dimensity 9200+", "Snapdragon 8 Gen 2", "Helio G99",
        "Snapdragon 778G", "Snapdragon 695", "Snapdragon 8+ Gen 1", "Snapdragon 8 Gen 1", "Snapdragon 8 Gen 2",
        "Snapdragon 888", "Snapdragon 765G", "Snapdragon 8 Gen 3", "Dimensity 8100", "Snapdragon 8 Gen 2",
        "Snapdragon 8 Gen 3", "Snapdragon 7 Gen 2", "Snapdragon 8 Gen 2", "Snapdragon 8 Gen 3", "Snapdragon 778G",
        "Helio G85", "Snapdragon 480+", "Snapdragon 680", "Helio G36", "Dimensity 9200",
        "Google Tensor G3", "Exynos 1380", "Snapdragon 7 Gen 1", "Snapdragon 8 Gen 2", "Dimensity 9200+",
        "Helio G99", "Helio G95", "Snapdragon 695", "Snapdragon 778G", "Snapdragon 480+",
        "Snapdragon 7 Gen 2", "Snapdragon 8 Gen 2", "Snapdragon 8 Gen 3", "Snapdragon 8 Gen 2", "Snapdragon 778G",
        "Snapdragon 8 Gen 3", "Snapdragon 8 Gen 2", "Snapdragon 8 Gen 3", "Snapdragon 8 Gen 2", "Snapdragon 7 Gen 2"
      ][i],
      camera: [
        "50MP Triple Camera", "48MP Triple Camera", "50MP Triple Camera", "50MP Quad Camera", "64MP Triple Camera",
        "50MP Dual Camera", "108MP Triple Camera", "50MP Triple Camera", "50MP Quad Camera", "64MP Triple Camera",
        "64MP Triple Camera", "50MP Dual Camera", "50MP Triple Camera", "12MP Triple Camera", "50MP Triple Camera",
        "64MP Triple Camera", "64MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "108MP Triple Camera",
        "64MP Dual Camera", "50MP Triple Camera", "50MP Triple Camera", "64MP Triple Camera", "50MP Dual Camera",
        "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "13MP Dual Camera", "50MP Triple Camera",
        "64MP Dual Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera",
        "50MP Dual Camera", "50MP Triple Camera", "64MP Triple Camera", "50MP Dual Camera", "50MP Dual Camera",
        "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Dual Camera",
        "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera"
      ][i]
    },
    releaseDate: new Date("2024-09-15"),
    views: 25000,
    trending: true
  })),
  // Gaming Phones (50 devices)
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 101,
    name: [
      "Red Magic 10 Pro Plus", "ASUS ROG Phone 7", "Nubia RedMagic 9 Pro", "Black Shark 5 Pro", "Lenovo Legion Y90",
      "Xiaomi Black Shark 6 Pro", "Poco F6 GT", "Realme GT Neo 5", "iQOO 12 Pro", "ZTE Nubia Red Magic 10",
      "Meizu 21 Pro", "Black Shark 7 Pro", "Lenovo Legion Phone 3", "Poco X7 Pro", "iQOO 13 Pro",
      "Nubia Z60 Ultra", "Fairphone 5", "Cat S75", "Sharp Aquos R8", "HTC U24 Pro",
      "Micromax In 3 Pro", "Lava Agni 3", "Google Pixel 8a", "Samsung Galaxy A75", "Xiaomi Mi 14 Lite",
      "Oppo Find X7", "Vivo X100 Pro", "Realme Narzo 70 Pro", "Infinix Note 40 Pro", "Tecno Camon 30 Ultra",
      "Motorola Moto G100", "Nokia G60", "OnePlus Nord 5", "Huawei Nova 12 Pro", "Honor X9b",
      "Asus ROG Phone 8", "Sony Xperia 10 VI", "ZTE Nubia Red Magic 11", "Meizu 20 Pro", "Black Shark 8 Pro",
      "Lenovo Legion Phone 4", "Poco F6 Pro", "iQOO 14 Pro", "Nubia Z70 Ultra", "Fairphone 6",
      "Cat S80", "Sharp Aquos R9", "HTC U25 Pro", "Micromax In 4 Pro", "Lava Agni 4"
    ][i],
    price: parseInt([
      "225,400", "279,999", "244,800", "154,600", "97,500",
      "200,000", "220,000", "240,000", "160,000", "95,000",
      "85,000", "110,000", "130,000", "250,000", "200,000",
      "140,000", "90,000", "150,000", "170,000", "220,000",
      "210,000", "80,000", "190,000", "230,000", "240,000",
      "70,000", "260,000", "135,000", "50,000", "60,000",
      "105,000", "115,000", "125,000", "175,000", "185,000",
      "65,000", "75,000", "88,000", "98,000", "108,000",
      "118,000", "128,000", "138,000", "148,000", "158,000",
      "168,000", "178,000", "188,000", "198,000", "208,000"
    ][i].replace(/,/g, ''), 10),
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
    category: "Gaming Phones",
    specs: {
      screen: [
        "6.8-inch AMOLED 165Hz", "6.78-inch AMOLED 165Hz", "6.8-inch AMOLED 120Hz", "6.67-inch AMOLED 144Hz", "6.92-inch AMOLED 144Hz",
        "6.78-inch AMOLED", "6.67-inch AMOLED", "6.74-inch AMOLED", "6.78-inch AMOLED", "6.8-inch AMOLED",
        "6.7-inch AMOLED", "6.78-inch AMOLED", "6.9-inch AMOLED", "6.67-inch AMOLED", "6.78-inch AMOLED",
        "6.8-inch AMOLED", "6.3-inch OLED", "6.5-inch IPS LCD", "6.6-inch AMOLED", "6.7-inch OLED",
        "6.5-inch IPS LCD", "6.78-inch AMOLED", "6.1-inch OLED", "6.4-inch AMOLED", "6.55-inch AMOLED",
        "6.82-inch AMOLED", "6.78-inch AMOLED", "6.72-inch IPS LCD", "6.78-inch AMOLED", "6.67-inch AMOLED",
        "6.7-inch OLED", "6.56-inch IPS LCD", "6.55-inch AMOLED", "6.78-inch AMOLED", "6.8-inch AMOLED",
        "6.78-inch AMOLED", "6.5-inch OLED", "6.8-inch AMOLED", "6.7-inch AMOLED", "6.78-inch AMOLED",
        "6.9-inch AMOLED", "6.67-inch AMOLED", "6.78-inch AMOLED", "6.8-inch AMOLED", "6.3-inch OLED",
        "6.5-inch IPS LCD", "6.6-inch AMOLED", "6.7-inch OLED", "6.5-inch IPS LCD", "6.78-inch AMOLED"
      ][i],
      processor: [
        "Snapdragon 8 Gen 3", "Snapdragon 8 Gen 2", "Snapdragon 8 Gen 3", "Snapdragon 8 Gen 1", "Snapdragon 8 Gen 1",
        "Snapdragon 8 Gen 3", "Snapdragon 8 Gen 2", "Dimensity 9200+", "Snapdragon 8 Gen 2", "Helio G99",
        "Snapdragon 778G", "Snapdragon 695", "Snapdragon 8+ Gen 1", "Snapdragon 8 Gen 1", "Snapdragon 8 Gen 2",
        "Snapdragon 888", "Snapdragon 765G", "Snapdragon 8 Gen 3", "Dimensity 8100", "Snapdragon 8 Gen 2",
        "Snapdragon 8 Gen 3", "Snapdragon 7 Gen 2", "Snapdragon 8 Gen 2", "Snapdragon 8 Gen 3", "Snapdragon 778G",
        "Helio G85", "Snapdragon 480+", "Snapdragon 680", "Helio G36", "Dimensity 9200",
        "Google Tensor G3", "Exynos 1380", "Snapdragon 7 Gen 1", "Snapdragon 8 Gen 2", "Dimensity 9200+",
        "Helio G99", "Helio G95", "Snapdragon 695", "Snapdragon 778G", "Snapdragon 480+",
        "Snapdragon 7 Gen 2", "Snapdragon 8 Gen 2", "Snapdragon 8 Gen 3", "Snapdragon 8 Gen 2", "Snapdragon 778G",
        "Snapdragon 8 Gen 3", "Snapdragon 8 Gen 2", "Snapdragon 8 Gen 3", "Snapdragon 8 Gen 2", "Snapdragon 7 Gen 2"
      ][i],
      camera: [
        "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "108MP Triple Camera", "64MP Dual Camera",
        "50MP Dual Camera", "108MP Triple Camera", "50MP Triple Camera", "50MP Quad Camera", "64MP Triple Camera",
        "64MP Triple Camera", "50MP Dual Camera", "50MP Triple Camera", "12MP Triple Camera", "50MP Triple Camera",
        "64MP Triple Camera", "64MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "108MP Triple Camera",
        "64MP Dual Camera", "50MP Triple Camera", "50MP Triple Camera", "64MP Triple Camera", "50MP Dual Camera",
        "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "13MP Dual Camera", "50MP Triple Camera",
        "64MP Dual Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera",
        "50MP Dual Camera", "50MP Triple Camera", "64MP Triple Camera", "50MP Dual Camera", "50MP Dual Camera",
        "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Dual Camera",
        "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera", "50MP Triple Camera"
      ][i]
    },
    releaseDate: new Date("2024-08-20"),
    views: 30000,
    trending: true
  })),
  // Budget Phones (50 devices)
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 151,
    name: [
      "Xiaomi Redmi A3x", "Infinix Smart 8 Pro", "Tecno Spark 20 Pro", "Realme C63", "Itel A70",
      "Samsung Galaxy A15", "Nokia G22", "Motorola Moto G14", "Oppo A18", "Vivo Y17s",
      "Infinix Hot 40i", "Tecno Spark Go 2024", "Realme Narzo N63", "Itel Vision 5", "Samsung Galaxy A05s",
      "Nokia C32", "Motorola Moto E40", "Oppo A58", "Vivo Y22s", "Infinix Zero 30 Lite",
      "Tecno Camon 20", "Realme C55", "Itel S23", "Samsung Galaxy A04", "Nokia G11",
      "Motorola Moto G04", "Oppo A38", "Vivo Y16", "Infinix Hot 30i", "Tecno Spark 10C",
      "Realme Narzo N55", "Itel A60s", "Samsung Galaxy A03 Core", "Nokia C21", "Motorola Moto E32",
      "Oppo A17", "Vivo Y15s", "Infinix Smart 7", "Tecno Spark 9 Pro", "Realme C35",
      "Itel A58", "Samsung Galaxy A02s", "Nokia G10", "Motorola Moto G13", "Oppo A16",
      "Vivo Y12s", "Infinix Hot 12 Play", "Tecno Spark 8C", "Realme Narzo N53", "Itel A49"
    ][i],
    price: parseInt([
      "18,999", "25,999", "45,000", "34,999", "19,999",
      "30,000", "35,000", "40,000", "22,000", "28,000",
      "20,000", "15,000", "32,000", "18,000", "26,000",
      "24,000", "21,000", "29,000", "27,000", "23,000",
      "33,000", "36,000", "17,000", "19,500", "25,500",
      "20,500", "22,500", "28,500", "21,500", "16,500",
      "31,000", "18,500", "19,000", "24,500", "20,000",
      "23,500", "27,500", "22,000", "26,500", "29,500",
      "17,500", "20,000", "25,000", "30,500", "22,500",
      "28,000", "21,000", "16,000", "32,500", "18,000"
    ][i].replace(/,/g, ''), 10),
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
    category: "Budget Phones",
    specs: {
      screen: [
        "6.8-inch AMOLED 165Hz", "6.78-inch AMOLED 165Hz", "6.8-inch AMOLED 120Hz", "6.67-inch AMOLED 144Hz", "6.92-inch AMOLED 144Hz",
        "6.78-inch AMOLED", "6.67-inch AMOLED", "6.74-inch AMOLED", "6.78-inch AMOLED", "6.8-inch AMOLED",
        "6.7-inch AMOLED", "6.78-inch AMOLED", "6.9-inch AMOLED", "6.67-inch AMOLED", "6.78-inch AMOLED",
        "6.8-inch AMOLED", "6.3-inch OLED", "6.5-inch IPS LCD", "6.6-inch AMOLED", "6.7-inch OLED",
        "6.5-inch IPS LCD", "6.78-inch AMOLED", "6.1-inch OLED", "6.4-inch AMOLED", "6.55-inch AMOLED",
        "6.82-inch AMOLED", "6.78-inch AMOLED", "6.72-inch IPS LCD", "6.78-inch AMOLED", "6.67-inch AMOLED",
        "6.7-inch OLED", "6.56-inch IPS LCD", "6.55-inch AMOLED", "6.78-inch AMOLED", "6.8-inch AMOLED",
        "6.78-inch AMOLED", "6.5-inch OLED", "6.8-inch AMOLED", "6.7-inch AMOLED", "6.78-inch AMOLED",
        "6.9-inch AMOLED", "6.67-inch AMOLED", "6.78-inch AMOLED", "6.8-inch AMOLED", "6.3-inch OLED",
        "6.5-inch IPS LCD", "6.6-inch AMOLED", "6.7-inch OLED", "6.5-inch IPS LCD", "6.78-inch AMOLED"
      ][i],
    processor: [
      "Helio G36", "Helio G35", "Helio G85", "Unisoc T612", "Unisoc T606",
      "Helio G35", "Unisoc T606", "Helio G37", "Helio G35", "Helio G35",
      "Helio G35", "Helio G35", "Unisoc T612", "Unisoc T606", "Helio G35",
      "Unisoc T606", "Helio G37", "Helio G35", "Helio G35", "Helio G35",
      "Helio G35", "Unisoc T612", "Unisoc T606", "Helio G35", "Helio G35",
      "Helio G37", "Helio G35", "Helio G35", "Helio G35", "Helio G35",
      "Unisoc T612", "Unisoc T606", "Helio G35", "Helio G35", "Helio G37",
      "Helio G35", "Helio G35", "Helio G35", "Helio G35", "Unisoc T612",
      "Unisoc T606", "Helio G35", "Helio G35", "Helio G37", "Helio G35",
      "Helio G35", "Helio G35", "Helio G35", "Unisoc T612", "Unisoc T606"
    ][i],
    camera: [
      "13MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "13MP Dual Camera",
      "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera",
      "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera",
      "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera",
      "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera",
      "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera",
      "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera",
      "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera",
      "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera",
      "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera", "50MP Dual Camera"
    ][i]
  },
  releaseDate: new Date("2024-01-15"),
  views: 5000,
  trending: false
}))
];