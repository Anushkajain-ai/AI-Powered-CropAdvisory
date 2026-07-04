const mongoose = require("mongoose");
require("dotenv").config();

const Crop = require("./models/Crop");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // Remove old data (optional)
    await Crop.deleteMany({});

    const crops = [      {
        crop: "Tomato",
        disease: "Late Blight",

        description:
          "Late Blight is one of the most destructive diseases of tomato caused by Phytophthora infestans. It spreads rapidly during cool and humid weather and can destroy an entire crop within a few days if not controlled.",

        cause: [
          "Cool temperatures between 15°C and 22°C.",
          "High humidity and prolonged leaf wetness.",
          "Poor air circulation and infected crop residue."
        ],

        symptoms: [
          "Large dark brown or black spots on leaves.",
          "White fungal growth on the underside of leaves.",
          "Brown lesions on stems.",
          "Dark rotten patches on tomato fruits."
        ],

        control: [
          "Remove infected leaves immediately.",
          "Avoid overhead irrigation.",
          "Maintain proper spacing between plants.",
          "Practice crop rotation with non-host crops."
        ],

        chemical: [
          "Mancozeb 75% WP",
          "Metalaxyl + Mancozeb",
          "Chlorothalonil"
        ],

        prevention: [
          "Use certified disease-free seedlings.",
          "Inspect plants regularly.",
          "Remove infected crop debris after harvest.",
          "Ensure good field drainage."
        ]
      },

      {
        crop: "Tomato",
        disease: "Bacterial Blight",

        description:
          "Bacterial Blight is a serious bacterial disease that attacks tomato leaves, stems, and fruits. Under warm and wet conditions it spreads rapidly and significantly reduces yield.",

        cause: [
          "Infected seeds and seedlings.",
          "Continuous rainfall or overhead watering.",
          "Warm humid environmental conditions."
        ],

        symptoms: [
          "Small water-soaked spots on leaves.",
          "Yellow halos around lesions.",
          "Dark raised spots on fruits.",
          "Premature leaf drop."
        ],

        control: [
          "Remove infected plants.",
          "Avoid working in wet fields.",
          "Rotate crops every season.",
          "Use disease-free seeds."
        ],

        chemical: [
          "Copper Oxychloride",
          "Copper Hydroxide",
          "Streptocycline (as recommended locally)"
        ],

        prevention: [
          "Disinfect farm tools.",
          "Avoid overhead irrigation.",
          "Maintain field sanitation.",
          "Purchase certified seeds."
        ]
      },

      {
        crop: "Tomato",
        disease: "Fusarium Wilt",

        description:
          "Fusarium Wilt is a soil-borne fungal disease that blocks water transport inside the plant, causing severe wilting and eventual plant death.",

        cause: [
          "Fusarium fungus present in soil.",
          "Warm soil temperatures.",
          "Continuous cultivation of tomato in the same field."
        ],

        symptoms: [
          "Yellowing of lower leaves.",
          "Wilting during daytime.",
          "Brown discoloration inside stem.",
          "Complete drying of the plant."
        ],

        control: [
          "Remove infected plants immediately.",
          "Rotate crops with cereals.",
          "Use resistant tomato varieties.",
          "Improve soil drainage."
        ],

        chemical: [
          "Carbendazim",
          "Thiophanate-Methyl",
          "Trichoderma bio-fungicide"
        ],

        prevention: [
          "Avoid waterlogging.",
          "Use healthy seedlings.",
          "Solarize soil before planting.",
          "Maintain balanced fertilization."
        ]
      },      {
        crop: "Potato",
        disease: "Early Blight",

        description:
          "Early Blight is a fungal disease caused by Alternaria solani. It mainly attacks older leaves and gradually reduces photosynthesis and potato yield.",

        cause: [
          "Warm temperatures.",
          "High humidity.",
          "Weak or nutrient-deficient plants."
        ],

        symptoms: [
          "Brown circular spots with concentric rings.",
          "Yellowing around infected spots.",
          "Premature leaf fall.",
          "Reduced tuber size."
        ],

        control: [
          "Remove infected foliage.",
          "Rotate crops.",
          "Apply balanced fertilizers.",
          "Avoid excessive irrigation."
        ],

        chemical: [
          "Mancozeb",
          "Azoxystrobin",
          "Chlorothalonil"
        ],

        prevention: [
          "Use certified seed potatoes.",
          "Avoid overhead irrigation.",
          "Destroy infected plant debris.",
          "Maintain field hygiene."
        ]
      },

      {
        crop: "Potato",
        disease: "Potato Scab",

        description:
          "Potato Scab is a bacterial disease that mainly affects tubers by producing rough corky lesions, reducing market quality though rarely affecting yield.",

        cause: [
          "Dry alkaline soil.",
          "Streptomyces bacteria in soil.",
          "Improper irrigation."
        ],

        symptoms: [
          "Rough cork-like lesions.",
          "Deep pits on potato skin.",
          "Poor tuber appearance.",
          "Reduced market value."
        ],

        control: [
          "Maintain proper soil moisture.",
          "Lower soil pH where suitable.",
          "Rotate crops.",
          "Plant resistant varieties."
        ],

        chemical: [
          "No highly effective chemical treatment.",
          "Gypsum (soil amendment)",
          "Bio-fertilizers containing beneficial microbes"
        ],

        prevention: [
          "Maintain slightly acidic soil.",
          "Avoid fresh manure before planting.",
          "Use certified seed potatoes.",
          "Practice crop rotation."
        ]
      },

      {
        crop: "Rice",
        disease: "Rice Blast",

        description:
          "Rice Blast is one of the most destructive fungal diseases of rice caused by Magnaporthe oryzae. It attacks leaves, nodes, necks, and panicles, leading to major yield losses.",

        cause: [
          "High humidity and frequent rainfall.",
          "Excess nitrogen fertilizer.",
          "Dense planting and poor air circulation."
        ],

        symptoms: [
          "Diamond-shaped gray spots on leaves.",
          "Brown lesions on leaf edges.",
          "Broken panicles.",
          "Poor grain filling."
        ],

        control: [
          "Use resistant rice varieties.",
          "Avoid excessive nitrogen fertilizer.",
          "Maintain proper spacing.",
          "Destroy infected crop residues."
        ],

        chemical: [
          "Tricyclazole",
          "Isoprothiolane",
          "Azoxystrobin"
        ],

        prevention: [
          "Use certified seeds.",
          "Maintain proper drainage.",
          "Balanced fertilizer application.",
          "Monitor crop regularly."
        ]
      },

      {
        crop: "Wheat",
        disease: "Stem Rust",

        description:
          "Stem Rust is a fungal disease caused by Puccinia graminis. It attacks stems and leaves, reducing grain quality and yield.",

        cause: [
          "Warm temperatures.",
          "High humidity.",
          "Wind-borne fungal spores."
        ],

        symptoms: [
          "Reddish-brown pustules on stems.",
          "Weak stems.",
          "Shriveled grains.",
          "Premature drying."
        ],

        control: [
          "Grow resistant wheat varieties.",
          "Destroy volunteer wheat plants.",
          "Regular field inspection.",
          "Apply fungicide at early stages."
        ],

        chemical: [
          "Propiconazole",
          "Tebuconazole",
          "Triadimefon"
        ],

        prevention: [
          "Use resistant seeds.",
          "Rotate crops.",
          "Avoid late sowing.",
          "Maintain healthy crop nutrition."
        ]
      },

      {
        crop: "Wheat",
        disease: "Powdery Mildew",

        description:
          "Powdery Mildew is a fungal disease that produces a white powder-like coating on wheat leaves, reducing photosynthesis and yield.",

        cause: [
          "Cool temperatures.",
          "High humidity.",
          "Dense crop canopy."
        ],

        symptoms: [
          "White powder on leaves.",
          "Yellowing of foliage.",
          "Poor grain development.",
          "Dry leaves."
        ],

        control: [
          "Improve air circulation.",
          "Avoid excessive nitrogen.",
          "Remove infected plants.",
          "Use resistant varieties."
        ],

        chemical: [
          "Sulfur",
          "Propiconazole",
          "Hexaconazole"
        ],

        prevention: [
          "Balanced fertilization.",
          "Proper plant spacing.",
          "Regular field monitoring.",
          "Use certified seed."
        ]
      },      {
        crop: "Maize",
        disease: "Northern Corn Leaf Blight",

        description:
          "Northern Corn Leaf Blight is a fungal disease that produces long cigar-shaped lesions on maize leaves and significantly reduces grain yield.",

        cause: [
          "Cool humid weather.",
          "Continuous maize cultivation.",
          "Fungal spores surviving in crop residue."
        ],

        symptoms: [
          "Long gray-green lesions.",
          "Leaves dry prematurely.",
          "Reduced photosynthesis.",
          "Poor grain filling."
        ],

        control: [
          "Rotate crops.",
          "Remove infected crop residue.",
          "Grow resistant hybrids.",
          "Maintain balanced nutrition."
        ],

        chemical: [
          "Azoxystrobin",
          "Propiconazole",
          "Mancozeb"
        ],

        prevention: [
          "Use disease-free seeds.",
          "Avoid overcrowding.",
          "Field sanitation.",
          "Monitor crop frequently."
        ]
      },

      {
        crop: "Maize",
        disease: "Corn Smut",

        description:
          "Corn Smut is caused by Ustilago maydis and produces swollen galls on ears, leaves, and stems, reducing crop quality.",

        cause: [
          "Warm weather.",
          "Plant injuries.",
          "Fungal spores in soil."
        ],

        symptoms: [
          "Large swollen galls.",
          "Gray-black fungal spores.",
          "Distorted ears.",
          "Reduced grain production."
        ],

        control: [
          "Remove infected plants.",
          "Avoid damaging plants.",
          "Maintain field sanitation.",
          "Rotate crops."
        ],

        chemical: [
          "Copper Oxychloride",
          "Propiconazole",
          "Mancozeb"
        ],

        prevention: [
          "Grow resistant hybrids.",
          "Control insect damage.",
          "Destroy infected residues.",
          "Maintain healthy field hygiene."
        ]
      }

    ];

    await Crop.insertMany(crops);

    console.log("✅ Crop data inserted successfully!");

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Error seeding database:", err);
    mongoose.connection.close();
  });