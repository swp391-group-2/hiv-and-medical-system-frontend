function QAndAHero() {
  return (
    <div className="bg-gradient-to-r from-primary to-sky-300 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Hỏi Đáp Y Tế</h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Đặt câu hỏi ẩn danh và nhận được tư vấn từ các chuyên gia y tế
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Đặt Câu Hỏi
          </button>
          <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
            Xem Câu Hỏi Phổ Biến
          </button>
        </div>
      </div>
    </div>
  );
}

export default QAndAHero;
