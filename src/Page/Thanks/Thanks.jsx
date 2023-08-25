import React from 'react';
import { Link } from 'react-router-dom';

const Thanks = () => {
    return (
        <div className="flex items-center justify-center pt-24 pb-24 bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg w-screen max-w-screen-md">
                <div className="flex items-center justify-center mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-24 w-24 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h2 className="text-4xl font-semibold mb-4 flex items-center justify-center">Thank You!</h2>
                <p className="text-gray-600">
                    Chúng tôi xin chân thành cảm ơn bạn đã lựa chọn mua sắm tại cửa hàng của chúng tôi! Sự ủng hộ của bạn không chỉ là nguồn động viên quý báu mà còn là động lực giúp chúng tôi không ngừng hoàn thiện và phục vụ tốt hơn.!<br /><br />
                    Việc bạn tin tưởng và chọn lựa sản phẩm của chúng tôi không chỉ giúp bạn trải nghiệm những sản phẩm tốt nhất mà còn giúp chúng tôi phát triển và phục vụ cộng đồng ngày càng tốt hơn.<br /><br />
                    Một lần nữa, chúng tôi chân thành cảm ơn bạn vì đã đồng hành cùng chúng tôi. Chúc bạn có những trải nghiệm mua sắm thú vị và hài lòng tại cửa hàng của chúng tôi!<br />
                </p>
                <button className="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                    <Link to={'/'}> Back to Home</Link>
                </button>
            </div>
        </div>
    );
};

export default Thanks;


