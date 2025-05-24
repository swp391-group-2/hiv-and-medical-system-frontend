import React from "react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}

      {/* Main Login Section */}
      <main className="flex flex-1 items-center justify-center bg-gray-200 py-16 px-4">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
          {/* Left image placeholder */}
          <div className="w-1/2 bg-sky-300 flex items-center justify-center text-center text-black font-bold text-lg p-6">
            SOME
            <br />
            RANDOM
            <br />
            PICTURE
          </div>

          {/* Right login form */}
          <div className="w-1/2 bg-gray-100 p-8">
            <h2 className="text-center text-xl font-bold mb-6">ĐĂNG Ký</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                 Nhập lại Mật khẩu
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded font-medium"
              >
                Đăng nhập
              </button>
            </form>

            {/* Social Login */}
            <div className="text-center mt-4 text-sm">Hoặc đăng ký với</div>
            <div className="flex justify-center space-x-4 mt-2">
              <div className="w-8 h-8 bg-gray-300 rounded" />
              <div className="w-8 h-8 bg-gray-300 rounded" />
              <div className="w-8 h-8 bg-gray-300 rounded" />
            </div>

            {/* Links */}
            <div className="mt-4 text-sm text-center">
             
              <br />
              Đã có tài khoản?{" "}
              <a href="/login" className="text-red-600 font-semibold">
                Đăng nhập ngay !
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
