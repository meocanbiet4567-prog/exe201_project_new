import React from 'react';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-2 mb-4">
          <Leaf className="w-8 h-8 text-green-400" />
          <span className="text-2xl font-bold">EcoSeed</span>
        </div>

        <p className="text-gray-400 mb-6">
          Mỗi tờ giấy là một bước nhỏ cho môi trường xanh
        </p>

        <div className="flex justify-center gap-8 text-sm text-gray-400">
          <a href="/#products" className="hover:text-white">Sản Phẩm</a>
          <a href="/contact" className="hover:text-white">Liên Hệ</a>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          © 2026 EcoSeed. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
