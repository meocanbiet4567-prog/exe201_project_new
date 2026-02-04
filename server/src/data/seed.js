import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';

dotenv.config();
await connectDB();


const products = [
  {
    name: 'Lịch Gieo Mầm',
    price: 120000,          // ✅ NUMBER
    originalPrice: 65000,  // ✅ NUMBER
    rating: 4.8,
    reviews: 124,
    seeds: 'Các loại mầm hoa',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220165/L%E1%BB%8Bch1.1_szpfwg.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220167/L%E1%BB%8Bch_1.2_b9reib.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220165/L%E1%BB%8Bch1.1_szpfwg.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220167/L%E1%BB%8Bch_1.2_b9reib.jpg',
    ],
    description:
      'Lịch giấy gieo mầm là sản phẩm thân thiện với môi trường, được làm từ giấy tái chế chứa hạt giống tự nhiên. Sau khi sử dụng, bạn có thể gieo phần giấy xuống đất, tưới nước và chứng kiến những mầm xanh nảy nở, biến chiếc lịch cũ thành cây mới. Vừa tiện ích, vừa mang ý nghĩa bền vững và lan tỏa lối sống xanh',
    features: [
      '90% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '105 x 148 mm (A6)',
      'Màu sắc': 'Như hình',
      'Sản phẩm đi kèm': '7 tờ A6 , túi zip, gói hút ẩm',
      'Loại hạt': 'Các loại mầm hoa',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
  //thiep a5
  {
    name: 'Thiệp Tết A5',
    price: 20000,          // ✅ NUMBER
    originalPrice: 75000,  // ✅ NUMBER
    rating: 4.9,
    reviews: 130,
    seeds: 'Các loại mầm hoa',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220169/3.1_ptu3mz.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220170/3.2_l7aj61.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220171/3.3_rctmgo.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220189/3.4_y1o2vb.jpg'
    ],
    description:
      'Thiệp Gieo Mầm Tết A5 là món quà chúc Tết ý nghĩa, được làm từ giấy gieo mầm thân thiện với môi trường. Sau khi gửi trọn lời chúc đầu năm, thiệp có thể được gieo xuống đất để nảy mầm xanh tươi, tượng trưng cho khởi đầu mới, may mắn và sinh sôi trong năm mới. Vừa tinh tế, vừa lan tỏa thông điệp sống xanh',
    features: [
      '100% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '150 x 210 mm (A5)',
      'Màu sắc': 'Như hình',
      'Sản phẩm đi kèm': 'Thiệp, túi zip, gói hút ẩm',
      'Loại hạt': 'Các loại mầm hoa',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
  {
    name: 'Thiệp Con Mèo A5',
    price: 20000,          // ✅ NUMBER
    originalPrice: 60000,  // ✅ NUMBER
    rating: 4.8,
    reviews: 124,
    seeds: 'Các loại mầm hoa',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220167/2.1_oxcblw.png',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220183/2.2_msylvk.png',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220185/2.3_hxxgfb.png',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220167/2.1_oxcblw.png'
    ],
    description:
      'Thiệp Con Mèo A5 được làm từ giấy gieo mầm thân thiện với môi trường, thiết kế hình chú mèo dễ thương, mang cảm giác ấm áp và vui tươi. Không chỉ là tấm thiệp gửi gắm lời chúc ý nghĩa, sau khi sử dụng bạn còn có thể gieo xuống đất để mầm xanh nảy nở, biến món quà nhỏ thành một khởi đầu xanh đầy yêu thương 🌱🐱',
    features: [
      '90% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '150 x 210 mm (A5)',
      'Màu sắc': 'Như hình',
      'Sản phẩm đi kèm': 'Thiệp, túi zip, gói hút ẩm',
      'Loại hạt': 'Các loại mầm hoa',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
  {
    name: 'Thiệp Con Thỏ A5',
    price: 20000,          // ✅ NUMBER
    originalPrice: 60000,  // ✅ NUMBER
    rating: 4.8,
    reviews: 124,
    seeds: 'Các loại mầm hoa',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220178/1.1_nskgte.png',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220179/1.2_j0db5p.png',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220181/1.3_dc3fsj.png',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220178/1.1_nskgte.png'
    ],
    description:
      ' Con Thỏ A5 được làm từ giấy gieo mầm thân thiện với môi trường, thiết kế chú thỏ đáng yêu tượng trưng cho sự nhẹ nhàng và khởi đầu mới. Sau khi gửi gắm lời chúc, thiệp có thể được gieo xuống đất để mầm xanh vươn lên, mang theo thông điệp yêu thiên nhiên và lối sống bền vững 🌱🐰',
    features: [
      '90% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '150 x 210 mm (A5)',
      'Màu sắc': 'Như hình',
      'Sản phẩm đi kèm': 'Thiệp, túi zip, gói hút ẩm',
      'Loại hạt': 'Các loại mầm hoa',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
  {
    name: 'Thiệp Valentine A5',
    price: 20000,          // ✅ NUMBER
    originalPrice: 60000,  // ✅ NUMBER
    rating: 4.8,
    reviews: 124,
    seeds: 'Các loại mầm hoa',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220214/7.1_lipyhb.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220194/7.2_z77nfn.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220218/7.3_sqdo3z.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220214/7.1_lipyhb.jpg'
    ],
    description:
      'Thiệp Valentine A5 được làm từ giấy gieo mầm thân thiện với môi trường, là món quà ngọt ngào để gửi gắm yêu thương. Sau khi trao đi lời chúc, thiệp có thể được gieo xuống đất để nảy mầm xanh tươi, như tình cảm được nuôi dưỡng và lớn lên theo thời gian. Lãng mạn, tinh tế và đầy ý nghĩa 🌱💖',
    features: [
      '90% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '150 x 210 mm (A5)',
      'Màu sắc': 'Như hình',
      'Sản phẩm đi kèm': 'Thiệp, túi zip, gói hút ẩm',
      'Loại hạt': 'Các loại mầm hoa',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
  {
    name: 'Thiệp Valentine A5',
    price: 20000,          // ✅ NUMBER
    originalPrice: 60000,  // ✅ NUMBER
    rating: 4.8,
    reviews: 124,
    seeds: 'Các loại mầm hoa',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220188/6.1_i4temm.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220191/6.2_iei8dh.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220192/6.3_bmvnbs.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220188/6.1_i4temm.jpg'
    ],
    description:
      'Thiệp Valentine A5 được làm từ giấy gieo mầm thân thiện với môi trường, là món quà ngọt ngào để gửi gắm yêu thương. Sau khi trao đi lời chúc, thiệp có thể được gieo xuống đất để nảy mầm xanh tươi, như tình cảm được nuôi dưỡng và lớn lên theo thời gian. Lãng mạn, tinh tế và đầy ý nghĩa 🌱💖',
    features: [
      '90% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '150 x 210 mm (A5)',
      'Màu sắc': 'Như hình',
      'Sản phẩm đi kèm': 'Thiệp, túi zip, gói hút ẩm',
      'Loại hạt': 'Các loại mầm hoa',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
  //thiep a6
  {
    name: 'Thiệp Sinh Nhật A6',
    price: 15000,          // ✅ NUMBER
    originalPrice: 60000,  // ✅ NUMBER
    rating: 4.8,
    reviews: 124,
    seeds: 'Các loại mầm hoa',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770221025/9.1_u2apdd.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770221028/9.2_dem4cy.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770221025/9.1_u2apdd.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770221028/9.2_dem4cy.jpg'
    ],
    description:
      'Thiệp Sinh Nhật A6 được làm từ giấy gieo mầm thân thiện với môi trường, nhỏ xinh nhưng đầy ý nghĩa. Không chỉ gửi gắm lời chúc sinh nhật ấm áp, thiệp còn có thể gieo xuống đất để mầm xanh nảy nở, tượng trưng cho tuổi mới nhiều niềm vui, may mắn và những khởi đầu tốt đẹp 🌱🎂',
    features: [
      '90% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '105 x 148 mm (A6)',
      'Màu sắc': 'Như hình',
      'Sản phẩm đi kèm': 'Thiệp, túi zip, gói hút ẩm',
      'Loại hạt': 'Các loại mầm hoa',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
  {
    name: 'Thiệp Ngày Phụ Nữ Việt Nam A6',
    price: 15000,          // ✅ NUMBER
    originalPrice: 60000,  // ✅ NUMBER
    rating: 4.8,
    reviews: 124,
    seeds: 'Các loại mầm hoa',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770221021/8.1_kelkyq.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770221023/8.2_paxcfv.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770221021/8.1_kelkyq.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770221023/8.2_paxcfv.jpg',
    ],
    description:
      'Thiệp Ngày Phụ Nữ Việt Nam A6 được làm từ giấy gieo mầm thân thiện với môi trường, là món quà tinh tế để gửi lời tri ân và yêu thương đến những người phụ nữ Việt. Sau khi trao lời chúc, thiệp có thể được gieo xuống đất để mầm xanh nảy nở, tượng trưng cho vẻ đẹp, sự bền bỉ và những điều tốt lành luôn sinh sôi 🌱🌸',
    features: [
      '90% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '105 x 148 mm (A6)',
      'Màu sắc': 'Như hình',
      'Sản phẩm đi kèm': 'Thiệp, túi zip, gói hút ẩm',
      'Loại hạt': 'Các loại mầm hoa',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
  {
    name: 'Thiệp Valentine A6',
    price: 15000,          // ✅ NUMBER
    originalPrice: 60000,  // ✅ NUMBER
    rating: 4.8,
    reviews: 124,
    seeds: 'Các loại mầm hoa',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220216/5.1_mrf0ue.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220195/5.2_mvga6v.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220216/5.1_mrf0ue.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220195/5.2_mvga6v.jpg'
    ],
    description:
      'Thiệp Valentine A6 được làm từ giấy gieo mầm thân thiện với môi trường, là món quà ngọt ngào để gửi gắm yêu thương. Sau khi trao đi lời chúc, thiệp có thể được gieo xuống đất để nảy mầm xanh tươi, như tình cảm được nuôi dưỡng và lớn lên theo thời gian. Lãng mạn, tinh tế và đầy ý nghĩa 🌱💖',
    features: [
      '90% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '105 x 148 mm (A6)',
      'Màu sắc': 'Như hình',
      'Sản phẩm đi kèm': 'Thiệp, túi zip, gói hút ẩm',
      'Loại hạt': 'Các loại mầm hoa',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
  {
    name: 'Thiệp Tết A6',
    price: 15000,          // ✅ NUMBER
    originalPrice: 60000,  // ✅ NUMBER
    rating: 4.8,
    reviews: 124,
    seeds: 'Các loại mầm hoa',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220174/4.1_ehd40g.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220173/4.2_mpyyik.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220174/4.1_ehd40g.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220173/4.2_mpyyik.jpg'
    ],
    description:
      'Thiệp Tết A6 là món quà chúc Tết ý nghĩa, được làm từ giấy gieo mầm thân thiện với môi trường. Sau khi gửi trọn lời chúc đầu năm, thiệp có thể được gieo xuống đất để nảy mầm xanh tươi, tượng trưng cho khởi đầu mới, may mắn và sinh sôi trong năm mới. Vừa tinh tế, vừa lan tỏa thông điệp sống xanh 🌱',
    features: [
      '90% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '105 x 148 mm (A6)',
      'Màu sắc': 'Như hình',
      'Sản phẩm đi kèm': 'Thiệp, túi zip, gói hút ẩm, bộ dụng cụ mini, 1 chậu sơ dừa, 2 viên đất nén, 1 phong bao, 1 tag cảm ơn, 1 hộp carton, giấy rơm',
      'Loại hạt': 'Các loại mầm hoa',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
  // box thiep a5
  {
    name: 'Box Thiệp A5',
    price: 75000,          // ✅ NUMBER
    originalPrice: 60000,  // ✅ NUMBER
    rating: 4.8,
    reviews: 124,
    seeds: 'Các loại mầm hoa',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770043672/combo_gxfhyg.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770043672/combo_gxfhyg.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770043672/combo_gxfhyg.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770043672/combo_gxfhyg.jpg'
    ],
    description:
      'Box Thiệp A5 là bộ quà tặng gieo mầm trọn gói, tinh tế và thân thiện với môi trường. Sản phẩm bao gồm thiệp A5 giấy gieo mầm cùng đầy đủ phụ kiện như túi zip, gói hút ẩm, bộ dụng cụ mini, chậu đất nung, viên đất nén và phong bao, được đóng gói chỉn chu trong hộp carton kèm giấy rơm. Phù hợp làm quà tặng ý nghĩa, vừa trao gửi thông điệp yêu thương vừa lan tỏa lối sống xanh 🌱',
    features: [
      '90% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '148 × 210 mm',
      'Màu sắc': 'Như hình',
      'Sản phẩm đi kèm': 'Thiệp, túi zip, gói hút ẩm, bộ dụng cụ mini, 1 chậu đất nung, 2 viên đất nén, 1 phong bao, 1 tag cảm ơn, 1 hộp carton, giấy rơm',
      'Loại hạt': 'Các loại mầm hoa',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
  // box thiep a6
  {
    name: 'Box Thiệp A6',
    price: 50000,          // ✅ NUMBER
    originalPrice: 60000,  // ✅ NUMBER
    rating: 4.8,
    reviews: 124,
    seeds: 'Các loại mầm hoa',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770043672/combo_gxfhyg.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770043672/combo_gxfhyg.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770043672/combo_gxfhyg.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770043672/combo_gxfhyg.jpg'
    ],
    description:
      'Box Thiệp A6 là bộ quà tặng gieo mầm trọn gói, tinh tế và thân thiện với môi trường. Sản phẩm bao gồm thiệp A6 giấy gieo mầm cùng đầy đủ phụ kiện như túi zip, gói hút ẩm, bộ dụng cụ mini, chậu đất nung, viên đất nén và phong bao, được đóng gói chỉn chu trong hộp carton kèm giấy rơm. Phù hợp làm quà tặng ý nghĩa, vừa trao gửi thông điệp yêu thương vừa lan tỏa lối sống xanh 🌱',
    features: [
      '90% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '105 x 148 mm',
      'Màu sắc': 'Như hình',
      'Sản phẩm đi kèm': 'Thiệp, túi zip, gói hút ẩm, bộ dụng cụ mini, 1 chậu đất nung, 2 viên đất nén, 1 phong bao, 1 tag cảm ơn, 1 hộp carton, giấy rơm',
      'Loại hạt': 'Các loại mầm hoa',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
  {
    name: 'Box Lịch A6',
    price: 1500000,          // ✅ NUMBER
    originalPrice: 60000,  // ✅ NUMBER
    rating: 4.8,
    reviews: 124,
    seeds: 'Các loại mầm hoa',
    inStock: true,
    images: [
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220165/Box_L%E1%BB%8Bch_qcjhpt.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770043672/combo_gxfhyg.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220165/L%E1%BB%8Bch1.1_szpfwg.jpg',
      'https://res.cloudinary.com/dotom7ksq/image/upload/v1770220167/L%E1%BB%8Bch_1.2_b9reib.jpg'
    ],
    description:
      'Box Lịch A6 là bộ quà tặng gieo mầm nhỏ gọn và ý nghĩa, được thiết kế thân thiện với môi trường. Lịch A6 làm từ giấy gieo mầm không chỉ dùng để xem ngày tháng mà còn có thể gieo xuống đất sau khi sử dụng để mầm xanh nảy nở. Sản phẩm được đóng gói tinh tế, phù hợp làm quà tặng doanh nghiệp hoặc quà tri ân mang thông điệp sống xanh 🌱',
    features: [
      '90% phân hủy sinh học',
      'Chứa hạt giống hoa cúc chất lượng cao',
      'Làm từ giấy tái chế thân thiện môi trường',
      'Tỷ lệ nảy mầm cao đến 85%',
      'Phù hợp làm quà tặng ý nghĩa',
      'Hướng dẫn sử dụng chi tiết kèm theo'
    ],
    specifications: {
      'Kích thước': '105 x 148 mm',
      'Màu sắc': 'Như hình',
      'Sản phẩm đi kèm': 'Lịch, túi zip, gói hút ẩm, bộ dụng cụ mini, 3 chậu đất nung, 6 viên đất nén, 1 tag cảm ơn, 1 hộp carton, giấy rơm',
      'Loại hạt': 'Các loại mầm hoa',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Nơi khô ráo, thoáng mát'
    }
  },
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
