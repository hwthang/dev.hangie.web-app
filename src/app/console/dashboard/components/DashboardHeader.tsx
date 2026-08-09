import { Plus } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Tổng quan</h1>

        <p className="mt-1 text-sm text-slate-500">
          Theo dõi lịch dạy và thu nhập của bạn.
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
