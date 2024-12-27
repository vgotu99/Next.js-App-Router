import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true, // 모든 데이터 페칭이 콘솔에 로그로 찍히도록 하는 옵션
    }
  }
};

export default nextConfig;
