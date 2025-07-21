
import React from 'react';

const NaverPay: React.FC = () => {
    return (
        <div className="mt-8 border border-gray-200 rounded-md p-4 flex justify-between items-center bg-white">
            <div className="flex items-center">
                <div className="mr-4">
                    <span className="text-green-500 font-bold text-lg">NAVER</span>
                    <p className="text-xs text-gray-500">네이버ID로 간편구매</p>
                    <p className="text-xs text-gray-500">네이버페이</p>
                </div>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center space-x-1 text-sm">
                    <span className="font-bold text-green-500">N</span>
                    <span>pay 구매</span>
                </button>
            </div>
            <div className="flex items-center text-sm">
                <p className="text-gray-600 mr-2">Npay 10주년 AI가 들려주는...</p>
                <div className="flex space-x-1">
                    <button className="border border-gray-300 w-6 h-6 rounded text-gray-400">{'<'}</button>
                    <button className="border border-gray-300 w-6 h-6 rounded text-gray-400">{'>'}</button>
                </div>
            </div>
        </div>
    );
};

export default NaverPay;
