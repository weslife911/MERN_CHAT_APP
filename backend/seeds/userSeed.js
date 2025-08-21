const { config } = require("dotenv");
const connectDB = require("../database/db");
const User = require("../models/User");

config();

const seedUsers = [
  // Female Users
  {
    email: "emma.thompson@example.com",
    full_name: "Emma Thompson",
    role: "user",
    role: "user",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    full_name: "Olivia Miller",
    role: "user",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "sophia.davis@example.com",
    full_name: "Sophia Davis",
    role: "user",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "ava.wilson@example.com",
    full_name: "Ava Wilson",
    role: "user",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "isabella.brown@example.com",
    full_name: "Isabella Brown",
    role: "user",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "mia.johnson@example.com",
    full_name: "Mia Johnson",
    role: "user",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "charlotte.williams@example.com",
    full_name: "Charlotte Williams",
    role: "user",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "amelia.garcia@example.com",
    full_name: "Amelia Garcia",
    role: "user",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    full_name: "James Anderson",
    role: "user",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "william.clark@example.com",
    full_name: "William Clark",
    role: "user",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "benjamin.taylor@example.com",
    full_name: "Benjamin Taylor",
    role: "user",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "lucas.moore@example.com",
    full_name: "Lucas Moore",
    role: "user",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "henry.jackson@example.com",
    full_name: "Henry Jackson",
    role: "user",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "alexander.martin@example.com",
    full_name: "Alexander Martin",
    role: "user",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "daniel.rodriguez@example.com",
    full_name: "Daniel Rodriguez",
    role: "user",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();