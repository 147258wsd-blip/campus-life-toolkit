require('dotenv').config();

const mongoose = require('mongoose');
const { User, Project, BlogPost } = require('./models');
const content = require('../content/seed-content.json');

async function main() {
  if (!process.env.MONGODB_URI || !process.env.ADMIN_EMAIL) {
    throw new Error('Set MONGODB_URI and ADMIN_EMAIL in server/.env');
  }

  const options = process.env.MONGODB_PROXY_HOST
    ? { proxyHost: process.env.MONGODB_PROXY_HOST, proxyPort: Number(process.env.MONGODB_PROXY_PORT || 1080) }
    : {};

  try {
    await mongoose.connect(process.env.MONGODB_URI, options);
    const admin = await User.findOne({ email: process.env.ADMIN_EMAIL, isAdmin: true });
    if (!admin) throw new Error('Admin account not found; run node create-admin.js first');

    for (const item of content.projects) {
      await Project.findOneAndUpdate(
        { title: item.title, user: admin._id },
        { ...item, user: admin._id },
        { upsert: true, runValidators: true }
      );
    }

    for (const item of content.posts) {
      await BlogPost.findOneAndUpdate(
        { title: item.title, author: admin._id },
        { ...item, author: admin._id },
        { upsert: true, runValidators: true }
      );
    }

    console.log('Content ready: 3 projects and 3 blog posts');
  } finally {
    await mongoose.disconnect();
  }
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
