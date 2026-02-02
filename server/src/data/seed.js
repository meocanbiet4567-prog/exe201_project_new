import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';

dotenv.config();
await connectDB();


const products = [
  {
    name: 'Giấy Gieo Mầm Hoa Cúc',
    price: 40000,          // ✅ NUMBER
    originalPrice: 65000,  // ✅ NUMBER
    rating: 4.8,
    reviews: 124,
    seeds: 'Hạt hoa cúc',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770043672/combo_gxfhyg.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1769614314/product1_wja149.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1769614314/product1_wja149.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1769614314/product1_wja149.jpg'
    ],
    description:
      'Giấy gieo mầm hoa cúc là sản phẩm thân thiện với môi trường...',
    features: [
      '90% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '15cm x 21cm (A4)',
      'Màu sắc': 'Trắng kem tự nhiên',
      'Trọng lượng': '120gsm',
      'Loại hạt': 'Hoa cúc hữu cơ',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
  {
    name: 'Giấy Gieo Mầm Hoa hướng dương',
    price: 50000,          // ✅ NUMBER
    originalPrice: 75000,  // ✅ NUMBER
    rating: 4.9,
    reviews: 130,
    seeds: 'Hạt hoa hướng dương',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1769614314/product1_wja149.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1769614314/product1_wja149.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1769614314/product1_wja149.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1769614314/product1_wja149.jpg'
    ],
    description:
      'Giấy gieo mầm hoa cúc là sản phẩm thân thiện với môi trường...',
    features: [
      '100% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '15cm x 21cm (A5)',
      'Màu sắc': 'Trắng kem tự nhiên',
      'Trọng lượng': '120gsm',
      'Loại hạt': 'Hoa cúc hữu cơ',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
  {
    name: 'Giấy Gieo Mầm Hoa Hồng',
    price: 35000,          // ✅ NUMBER
    originalPrice: 60000,  // ✅ NUMBER
    rating: 4.8,
    reviews: 124,
    seeds: 'Hạt hoa hồng',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770043672/combo_gxfhyg.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1769614314/product1_wja149.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1769614314/product1_wja149.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1769614314/product1_wja149.jpg'
    ],
    description:
      'Giấy gieo mầm hoa cúc là sản phẩm thân thiện với môi trường...',
    features: [
      '90% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '15cm x 21cm (A4)',
      'Màu sắc': 'Trắng kem tự nhiên',
      'Trọng lượng': '120gsm',
      'Loại hạt': 'Hoa cúc hữu cơ',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
  {
    name: 'Giấy Gieo Mầm Hoa Mười giờ',
    price: 20000,          // ✅ NUMBER
    originalPrice: 40000,  // ✅ NUMBER
    rating: 4.0,
    reviews: 100,
    seeds: 'Hạt mười giờ',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1769614314/product1_wja149.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1769614314/product1_wja149.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1769614314/product1_wja149.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1769614314/product1_wja149.jpg'
    ],
    description:
      'Giấy gieo mầm hoa cúc là sản phẩm thân thiện với môi trường...',
    features: [
      '90% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '15cm x 21cm (A4)',
      'Màu sắc': 'Trắng kem tự nhiên',
      'Trọng lượng': '120gsm',
      'Loại hạt': 'Hoa cúc hữu cơ',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  }
];


try {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log('🌱 Seed dữ liệu thành công!');
  process.exit();
} catch (error) {
  console.error(error);
  process.exit(1);
}
