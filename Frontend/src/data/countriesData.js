// Detailed country information for itinerary planning
export const countryDetails = {
  iceland: {
    name: "Iceland",
    tagline: "Land of Fire and Ice",
    description: "Iceland is a Nordic island country known for its dramatic volcanic landscapes, geysers, hot springs, and lava fields. Experience the magical Northern Lights, explore ice caves, and relax in geothermal pools.",
    heroImage: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1200&q=80",
    places: [
      {
        id: 1,
        name: "Reykjavik",
        description: "The vibrant capital city with colorful buildings, world-class restaurants, and lively nightlife",
        image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
        estimatedDays: "2-3 days",
        attractions: [
          "Hallgrímskirkja Church",
          "Harpa Concert Hall",
          "Sun Voyager Sculpture",
          "Perlan Museum"
        ],
        cuisines: [
          { name: "Icelandic Hot Dog", restaurant: "Bæjarins Beztu Pylsur" },
          { name: "Fresh Seafood", restaurant: "Sægreifinn" },
          { name: "Traditional Lamb", restaurant: "Dill Restaurant" }
        ]
      },
      {
        id: 2,
        name: "Blue Lagoon",
        description: "World-famous geothermal spa with milky-blue waters rich in minerals",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
        estimatedDays: "1 day",
        attractions: [
          "Geothermal Spa",
          "Silica Mud Mask Bar",
          "Lava Restaurant",
          "In-water Massage"
        ],
        cuisines: [
          { name: "Spa Cuisine", restaurant: "Lava Restaurant" },
          { name: "Light Bites", restaurant: "Blue Café" }
        ]
      },
      {
        id: 3,
        name: "Golden Circle",
        description: "Iceland's most popular tourist route featuring geysers, waterfalls, and national parks",
        image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80",
        estimatedDays: "1-2 days",
        attractions: [
          "Þingvellir National Park",
          "Geysir Geothermal Area",
          "Gullfoss Waterfall",
          "Kerið Crater Lake"
        ],
        cuisines: [
          { name: "Farm-to-Table", restaurant: "Friðheimar Tomato Farm" },
          { name: "Traditional Icelandic", restaurant: "Efstidalur Farm" }
        ]
      },
      {
        id: 4,
        name: "South Coast",
        description: "Stunning black sand beaches, powerful waterfalls, and glacier views",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
        estimatedDays: "2-3 days",
        attractions: [
          "Seljalandsfoss Waterfall",
          "Skógafoss Waterfall",
          "Reynisfjara Black Sand Beach",
          "Jökulsárlón Glacier Lagoon"
        ],
        cuisines: [
          { name: "Local Seafood", restaurant: "Víkurskáli" },
          { name: "Icelandic Comfort Food", restaurant: "Smiðjan Brugghús" }
        ]
      }
    ]
  },

  maldives: {
    name: "Maldives",
    tagline: "Paradise on Earth",
    description: "The Maldives is a tropical paradise of 1,000+ coral islands, known for pristine beaches, crystal-clear waters, and luxury overwater bungalows. Perfect for diving, snorkeling, and ultimate relaxation.",
    heroImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
    places: [
      {
        id: 1,
        name: "Malé",
        description: "The bustling capital city with colorful buildings, fish markets, and local culture",
        image: "https://images.unsplash.com/photo-1589197331516-5c5d88850c70?w=800&q=80",
        estimatedDays: "1-2 days",
        attractions: [
          "Grand Friday Mosque",
          "Malé Fish Market",
          "National Museum",
          "Artificial Beach"
        ],
        cuisines: [
          { name: "Maldivian Curry", restaurant: "Symphony Restaurant" },
          { name: "Fresh Seafood", restaurant: "The Sea House" },
          { name: "Street Food", restaurant: "Majestic Restaurant" }
        ]
      },
      {
        id: 2,
        name: "Maafushi Island",
        description: "Budget-friendly local island with beautiful beaches and water sports",
        image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
        estimatedDays: "3-4 days",
        attractions: [
          "Bikini Beach",
          "Snorkeling Tours",
          "Dolphin Watching",
          "Sandbank Picnic"
        ],
        cuisines: [
          { name: "Grilled Fish", restaurant: "Stingray Café" },
          { name: "Traditional Maldivian", restaurant: "Arena Beach Restaurant" }
        ]
      },
      {
        id: 3,
        name: "Baa Atoll",
        description: "UNESCO Biosphere Reserve famous for manta ray diving",
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
        estimatedDays: "3-5 days",
        attractions: [
          "Hanifaru Bay (Manta Rays)",
          "Luxury Resort Hopping",
          "Diving & Snorkeling",
          "Sunset Cruises"
        ],
        cuisines: [
          { name: "Fine Dining", restaurant: "Resort Restaurants" },
          { name: "Beachside BBQ", restaurant: "Various Resorts" }
        ]
      }
    ]
  },

  japan: {
    name: "Japan",
    tagline: "Where Tradition Meets Future",
    description: "Japan seamlessly blends ancient traditions with cutting-edge technology. From serene temples and gardens to neon-lit cities and bullet trains, experience a culture like no other.",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
    places: [
      {
        id: 1,
        name: "Tokyo",
        description: "The electric capital with skyscrapers, temples, shopping, and incredible food",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
        estimatedDays: "3-4 days",
        attractions: [
          "Senso-ji Temple",
          "Shibuya Crossing",
          "Tokyo Skytree",
          "Meiji Shrine",
          "Akihabara Electric Town"
        ],
        cuisines: [
          { name: "Sushi", restaurant: "Sukiyabashi Jiro" },
          { name: "Ramen", restaurant: "Ichiran" },
          { name: "Tempura", restaurant: "Tsunahachi" }
        ]
      },
      {
        id: 2,
        name: "Kyoto",
        description: "Ancient capital with thousands of temples, traditional geisha districts, and gardens",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
        estimatedDays: "2-3 days",
        attractions: [
          "Fushimi Inari Shrine",
          "Kinkaku-ji (Golden Pavilion)",
          "Arashiyama Bamboo Grove",
          "Gion District"
        ],
        cuisines: [
          { name: "Kaiseki", restaurant: "Kikunoi" },
          { name: "Matcha Desserts", restaurant: "Tsujiri" },
          { name: "Tofu Cuisine", restaurant: "Tousuiro" }
        ]
      },
      {
        id: 3,
        name: "Osaka",
        description: "Japan's kitchen - street food paradise and vibrant nightlife",
        image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80",
        estimatedDays: "2 days",
        attractions: [
          "Osaka Castle",
          "Dotonbori",
          "Universal Studios Japan",
          "Kuromon Market"
        ],
        cuisines: [
          { name: "Takoyaki", restaurant: "Kukuru" },
          { name: "Okonomiyaki", restaurant: "Mizuno" },
          { name: "Kushikatsu", restaurant: "Daruma" }
        ]
      },
      {
        id: 4,
        name: "Mount Fuji",
        description: "Japan's iconic sacred mountain and surrounding lakes",
        image: "https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?w=800&q=80",
        estimatedDays: "1-2 days",
        attractions: [
          "Lake Kawaguchi",
          "Chureito Pagoda",
          "Fuji Five Lakes",
          "Oshino Hakkai"
        ],
        cuisines: [
          { name: "Houtou Noodles", restaurant: "Local Restaurants" },
          { name: "Mountain Cuisine", restaurant: "Various Lodges" }
        ]
      }
    ]
  },

  // Add more countries following the same pattern...
  norway: {
    name: "Norway",
    tagline: "Land of Fjords",
    description: "Norway offers breathtaking fjords, Northern Lights, and Viking heritage. Experience dramatic landscapes, midnight sun, and charming coastal villages.",
    heroImage: "https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?w=1200&q=80",
    places: [
      {
        id: 1,
        name: "Oslo",
        description: "Modern capital with Viking ships, contemporary art, and waterfront promenades",
        image: "https://images.unsplash.com/photo-1564844536308-b3e6f2d4e8a3?w=800&q=80",
        estimatedDays: "2 days",
        attractions: [
          "Viking Ship Museum",
          "Oslo Opera House",
          "Vigeland Sculpture Park",
          "Akershus Fortress"
        ],
        cuisines: [
          { name: "Norwegian Salmon", restaurant: "Lofoten Fiskerestaurant" },
          { name: "Traditional Nordic", restaurant: "Maaemo" }
        ]
      },
      {
        id: 2,
        name: "Bergen & Fjords",
        description: "Gateway to the fjords with colorful wooden houses and stunning nature",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80",
        estimatedDays: "3-4 days",
        attractions: [
          "Bryggen Wharf",
          "Fløyen Mountain",
          "Sognefjord Cruise",
          "Hardangerfjord"
        ],
        cuisines: [
          { name: "Fresh Seafood", restaurant: "Enhjørningen" },
          { name: "Local Delicacies", restaurant: "Lysverket" }
        ]
      }
    ]
  }
};