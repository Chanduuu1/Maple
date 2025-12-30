export const featuredCountries = [
  {
    id: 1,
    name: "Iceland",
    tagline: "Land of Fire and Ice",
    description: "Witness the mesmerizing Northern Lights and explore volcanic landscapes",
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1200&q=80",
    category: "Northern Lights"
  },
  {
    id: 2,
    name: "Maldives",
    tagline: "Paradise on Earth",
    description: "Crystal clear waters and pristine beaches await you",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
    category: "Summer"
  },
  {
    id: 3,
    name: "Japan",
    tagline: "Where Tradition Meets Future",
    description: "Experience ancient temples and cutting-edge technology",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
    category: "Cultural"
  },
  {
    id: 4,
    name: "New Zealand",
    tagline: "Adventure Capital",
    description: "From bungee jumping to hiking, adrenaline awaits",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1200&q=80",
    category: "Adventure"
  },
  {
    id: 5,
    name: "Norway",
    tagline: "Fjords and Northern Lights",
    description: "Dramatic landscapes and Arctic wonders",
    image: "https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?w=1200&q=80",
    category: "Northern Lights"
  }
];

export const categorizedCountries = {
  summer: {
    title: "Summer's Calling ☀️",
    subtitle: "Beaches, sunshine, and endless vibes",
    countries: [
      {
        id: 10,
        name: "Maldives",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
        description: "Overwater bungalows & turquoise waters",
        bestTime: "Nov - Apr"
      },
      {
        id: 11,
        name: "Greece",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
        description: "Island hopping in the Aegean Sea",
        bestTime: "May - Oct"
      },
      {
        id: 12,
        name: "Bali",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        description: "Tropical paradise with ancient temples",
        bestTime: "Apr - Oct"
      },
      {
        id: 13,
        name: "Croatia",
        image: "https://images.unsplash.com/photo-1555990538-c3d6d1f6c7a6?w=800&q=80",
        description: "Adriatic coast & historic cities",
        bestTime: "May - Sep"
      },
      {
        id: 14,
        name: "Thailand",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
        description: "Beaches, street food & nightlife",
        bestTime: "Nov - Feb"
      }
    ]
  },
  northernLights: {
    title: "Your Sign to Witness Northern Lights 🌌",
    subtitle: "Chase the Aurora Borealis",
    countries: [
      {
        id: 20,
        name: "Iceland",
        image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80",
        description: "Best aurora viewing in Europe",
        bestTime: "Sep - Apr"
      },
      {
        id: 21,
        name: "Norway",
        image: "https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?w=800&q=80",
        description: "Tromsø - Arctic Circle magic",
        bestTime: "Sep - Mar"
      },
      {
        id: 22,
        name: "Finland",
        image: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=800&q=80",
        description: "Glass igloos under the lights",
        bestTime: "Sep - Mar"
      },
      {
        id: 23,
        name: "Canada",
        image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80",
        description: "Yukon & Northwest Territories",
        bestTime: "Aug - Apr"
      },
      {
        id: 24,
        name: "Sweden",
        image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&q=80",
        description: "Abisko National Park wonders",
        bestTime: "Sep - Mar"
      }
    ]
  },
  adventure: {
    title: "Adventure Awaits 🏔️",
    subtitle: "For the thrill-seekers",
    countries: [
      {
        id: 30,
        name: "New Zealand",
        image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80",
        description: "Bungee, skydiving & hiking",
        bestTime: "Dec - Feb"
      },
      {
        id: 31,
        name: "Nepal",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
        description: "Everest Base Camp trek",
        bestTime: "Mar - May"
      },
      {
        id: 32,
        name: "Peru",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80",
        description: "Machu Picchu & Amazon jungle",
        bestTime: "May - Sep"
      },
      {
        id: 33,
        name: "Switzerland",
        image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80",
        description: "Alpine skiing & paragliding",
        bestTime: "Dec - Mar"
      },
      {
        id: 34,
        name: "Costa Rica",
        image: "https://images.unsplash.com/photo-1621894551361-0c6ac7f0e5b8?w=800&q=80",
        description: "Zip-lining & volcano hiking",
        bestTime: "Dec - Apr"
      }
    ]
  },
  cultural: {
    title: "Cultural Escapes 🏛️",
    subtitle: "Immerse in history and traditions",
    countries: [
      {
        id: 40,
        name: "Japan",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
        description: "Temples, tea ceremonies & tech",
        bestTime: "Mar - May"
      },
      {
        id: 41,
        name: "Italy",
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
        description: "Rome, Florence & Venice",
        bestTime: "Apr - Jun"
      },
      {
        id: 42,
        name: "Egypt",
        image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&q=80",
        description: "Pyramids & ancient wonders",
        bestTime: "Oct - Apr"
      },
      {
        id: 43,
        name: "India",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
        description: "Taj Mahal & spiritual journeys",
        bestTime: "Oct - Mar"
      },
      {
        id: 44,
        name: "Morocco",
        image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80",
        description: "Souks, deserts & riads",
        bestTime: "Mar - May"
      }
    ]
  }
};