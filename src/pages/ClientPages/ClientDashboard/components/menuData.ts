// menuData.js
type Dish = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type Menu = {
  [category: string]: { [key: string]: Dish };
};

const menu: Menu = {
    khaivi: {
      supcua: { id: 1, name: "Sup Cua", price: 5.99, image: "https://i.pinimg.com/564x/5a/70/8a/5a708a97a93061d568620183d4e1b8f8.jpg" },
      kimbab: { id: 2, name: "Kimbab", price: 4.99, image: "https://i.pinimg.com/564x/5a/70/8a/5a708a97a93061d568620183d4e1b8f8.jpg" },
      goiCuon: { id: 7, name: "Gỏi Cuốn", price: 6.99, image: "https://i.pinimg.com/564x/5a/70/8a/5a708a97a93061d568620183d4e1b8f8.jpg" },
      salad: { id: 8, name: "Salad", price: 4.50, image: "https://i.pinimg.com/564x/5a/70/8a/5a708a97a93061d568620183d4e1b8f8.jpg" },
      chao: { id: 9, name: "Cháo", price: 5.49, image: "https://i.pinimg.com/564x/5a/70/8a/5a708a97a93061d568620183d4e1b8f8.jpg" }
    },
    sashimiCombo: {
      sashimiSet: { id: 3, name: "Sashimi Set", price: 12.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      sashimiRoll: { id: 4, name: "Sashimi Roll", price: 10.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      sashimiSalad: { id: 9, name: "Sashimi Salad", price: 11.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      sashimiTacos: { id: 10, name: "Sashimi Tacos", price: 13.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      sashimiDon: { id: 11, name: "Sashimi Don", price: 14.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" }
    },
    nigiri: {
      tunaNigiri: { id: 5, name: "Tuna Nigiri", price: 8.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      salmonNigiri: { id: 6, name: "Salmon Nigiri", price: 9.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      eelNigiri: { id: 11, name: "Eel Nigiri", price: 10.49, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      shrimpNigiri: { id: 12, name: "Shrimp Nigiri", price: 9.49, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      octopusNigiri: { id: 13, name: "Octopus Nigiri", price: 10.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" }
    },
    sushi: {
      californiaRoll: { id: 14, name: "California Roll", price: 8.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      spicyTunaRoll: { id: 15, name: "Spicy Tuna Roll", price: 9.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      tempuraRoll: { id: 16, name: "Tempura Roll", price: 10.49, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      dragonRoll: { id: 17, name: "Dragon Roll", price: 12.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      rainbowRoll: { id: 18, name: "Rainbow Roll", price: 13.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" }
    },
    ramen: {
      tonkotsuRamen: { id: 19, name: "Tonkotsu Ramen", price: 11.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      misoRamen: { id: 20, name: "Miso Ramen", price: 10.49, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      shoyuRamen: { id: 21, name: "Shoyu Ramen", price: 9.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      spicyRamen: { id: 22, name: "Spicy Ramen", price: 10.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      curryRamen: { id: 23, name: "Curry Ramen", price: 11.49, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" }
    },
    tempura: {
      shrimpTempura: { id: 24, name: "Shrimp Tempura", price: 9.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      vegetableTempura: { id: 25, name: "Vegetable Tempura", price: 8.49, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      mixedTempura: { id: 26, name: "Mixed Tempura", price: 10.49, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      sweetPotatoTempura: { id: 27, name: "Sweet Potato Tempura", price: 8.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      fishTempura: { id: 28, name: "Fish Tempura", price: 10.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" }
    },
    curry: {
      chickenCurry: { id: 29, name: "Chicken Curry", price: 10.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      beefCurry: { id: 30, name: "Beef Curry", price: 11.49, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      vegetableCurry: { id: 31, name: "Vegetable Curry", price: 9.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      seafoodCurry: { id: 32, name: "Seafood Curry", price: 12.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      curryUdon: { id: 33, name: "Curry Udon", price: 11.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" }
    },
    dessert: {
      mochi: { id: 34, name: "Mochi", price: 4.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      greenTeaIceCream: { id: 35, name: "Green Tea Ice Cream", price: 5.49, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      dorayaki: { id: 36, name: "Dorayaki", price: 3.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      matchaCake: { id: 37, name: "Matcha Cake", price: 6.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      fruitSushi: { id: 38, name: "Fruit Sushi", price: 7.49, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" }
    },
    drink: {
      greenTea: { id: 39, name: "Green Tea", price: 2.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      sake: { id: 40, name: "Sake", price: 7.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      ramune: { id: 41, name: "Ramune", price: 3.49, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      icedMatcha: { id: 42, name: "Iced Matcha", price: 4.99, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" },
      bubbleTea: { id: 43, name: "Bubble Tea", price: 5.49, image: "https://i.pinimg.com/564x/67/46/8d/67468d5f811773cc9dcacfcd8fcb6361.jpg" }
    }
  };
  

export default menu;