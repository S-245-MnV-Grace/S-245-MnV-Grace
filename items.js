export const SOURCES = {
  intimacy: "https://gameofvampirestwilightsun.fandom.com/wiki/Intimacy_Items",
  attraction: "https://gameofvampirestwilightsun.fandom.com/wiki/Attraction_Items"
};

export const ITEMS = [
  {
    id: "gift-box",
    name: "Gift Box",
    stat: "intimacy",
    group: "Gift Boxes",
    min: 1,
    max: 1,
    targetType: "chosen",
    sourceUrl: SOURCES.intimacy
  },
  {
    id: "deluxe-gift-box",
    name: "Deluxe Gift Box",
    stat: "intimacy",
    group: "Gift Boxes",
    min: 2,
    max: 2,
    targetType: "chosen",
    sourceUrl: SOURCES.intimacy
  },
  {
    id: "premium-gift-box",
    name: "Premium Gift Box",
    stat: "intimacy",
    group: "Gift Boxes",
    min: 5,
    max: 5,
    targetType: "chosen",
    sourceUrl: SOURCES.intimacy
  },
  {
    id: "intimacy-purse",
    name: "Intimacy Purse",
    stat: "intimacy",
    group: "Intimacy Holders",
    min: 1,
    max: 4,
    targetType: "random",
    sourceUrl: SOURCES.intimacy
  },
  {
    id: "intimacy-bag",
    name: "Intimacy Bag",
    stat: "intimacy",
    group: "Intimacy Holders",
    min: 5,
    max: 8,
    targetType: "random",
    sourceUrl: SOURCES.intimacy
  },
  {
    id: "intimacy-case",
    name: "Intimacy Case",
    stat: "intimacy",
    group: "Intimacy Holders",
    min: 4,
    max: 50,
    targetType: "random",
    sourceUrl: SOURCES.intimacy
  },
  {
    id: "demon-coin",
    name: "Demon Coin",
    stat: "intimacy",
    group: "Demon Coins",
    min: 1,
    max: 1,
    targetType: "random",
    sourceUrl: SOURCES.intimacy
  },
  {
    id: "bronze-demon-coin",
    name: "Bronze Demon Coin",
    stat: "intimacy",
    group: "Demon Coins",
    min: 2,
    max: 2,
    targetType: "random",
    sourceUrl: SOURCES.intimacy
  },
  {
    id: "silver-demon-coin",
    name: "Silver Demon Coin",
    stat: "intimacy",
    group: "Demon Coins",
    min: 5,
    max: 5,
    targetType: "random",
    sourceUrl: SOURCES.intimacy
  },
  {
    id: "gold-demon-coin",
    name: "Gold Demon Coin",
    stat: "intimacy",
    group: "Demon Coins",
    min: 25,
    max: 25,
    targetType: "random",
    sourceUrl: SOURCES.intimacy
  },
  {
    id: "rose-bouquet",
    name: "Rose Bouquet",
    stat: "attraction",
    group: "Bouquets",
    min: 1,
    max: 1,
    targetType: "chosen",
    sourceUrl: SOURCES.attraction
  },
  {
    id: "azure-bouquet",
    name: "Azure Bouquet",
    stat: "attraction",
    group: "Bouquets",
    min: 2,
    max: 2,
    targetType: "chosen",
    sourceUrl: SOURCES.attraction
  },
  {
    id: "indigo-bouquet",
    name: "Indigo Bouquet",
    stat: "attraction",
    group: "Bouquets",
    min: 5,
    max: 5,
    targetType: "chosen",
    sourceUrl: SOURCES.attraction
  },
  {
    id: "charm-phial",
    name: "Charm Phial",
    stat: "attraction",
    group: "Charm Items",
    min: 1,
    max: 4,
    targetType: "random",
    sourceUrl: SOURCES.attraction
  },
  {
    id: "charm-bottle",
    name: "Charm Bottle",
    stat: "attraction",
    group: "Charm Items",
    min: 5,
    max: 8,
    targetType: "random",
    sourceUrl: SOURCES.attraction
  },
  {
    id: "charm-box",
    name: "Charm Box",
    stat: "attraction",
    group: "Charm Items",
    min: 4,
    max: 50,
    targetType: "random",
    sourceUrl: SOURCES.attraction
  },
  {
    id: "spectral-text",
    name: "Spectral Text",
    stat: "attraction",
    group: "Haunted Texts",
    min: 1,
    max: 1,
    targetType: "random",
    sourceUrl: SOURCES.attraction
  },
  {
    id: "nocturnal-text",
    name: "Nocturnal Text",
    stat: "attraction",
    group: "Haunted Texts",
    min: 2,
    max: 2,
    targetType: "random",
    sourceUrl: SOURCES.attraction
  },
  {
    id: "sanguine-text",
    name: "Sanguine Text",
    stat: "attraction",
    group: "Haunted Texts",
    min: 5,
    max: 5,
    targetType: "random",
    sourceUrl: SOURCES.attraction
  },
  {
    id: "gilded-text",
    name: "Gilded Text",
    stat: "attraction",
    group: "Haunted Texts",
    min: 25,
    max: 25,
    targetType: "random",
    sourceUrl: SOURCES.attraction
  }
];
