import React from "react";
import AdminVector from "../../../assets/spadmin.svg";
import { Crown } from "lucide-react";

const AdminCard = () => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mt-4">

            <div className="flex justify-center">
                <img
                    src={AdminVector}
                    alt="Super Admin"
                    className="w-40 h-40 object-contain"
                />
            </div>

            <div className="text-center mt-2">
                <h2 className="text-lg font-bold text-gray-900">
                    Super Admin
                </h2>

                <div className="inline-flex items-center gap-1 mt-1 text-xs text-indigo-600 font-semibold">
                    <Crown size={12} />
                    OWNER
                </div>
            </div>

            <div className="mt-4 space-y-1.5 text-sm">

                <div className="flex justify-between">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium truncate max-w-[140px]">
                        admin@gmail.com
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">Role</span>
                    <span className="font-medium">
                        Super Admin
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium text-green-600">
                        Active
                    </span>
                </div>

            </div>

        </div>
    );
};

export default AdminCard;