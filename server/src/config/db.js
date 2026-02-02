import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log('================ DB INFO ================');
    console.log('✅ MongoDB connected');
    console.log('📌 Database name:', conn.connection.name);
    console.log('🌐 Host:', conn.connection.host);
    console.log('========================================');

  } catch (error) {
    console.error('❌ MongoDB error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
