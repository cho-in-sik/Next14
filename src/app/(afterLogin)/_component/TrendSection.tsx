'use client';

import { usePathname } from 'next/navigation';
import style from './trendSection.module.css';
import Trend from '@/app/(afterLogin)/_component/Trend';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getTrends } from '../_lib/getTrends';
import { Hashtag } from '@/model/Hashtag';

export default function TrendSection() {
  const { data: session } = useSession();

  const { data } = useQuery<Hashtag[]>({
    queryKey: ['trends'],
    queryFn: getTrends,
    staleTime: 10 * 1000,
    gcTime: 300 * 1000,
    enabled: !!session?.user,
  });

  const pathname = usePathname();

  if (pathname === '/explore') return null;
  if (session?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          {data?.map((trend, i) => (
            <Trend trend={trend} key={i} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={style.trendBg}>
      <div className={style.trend}>트렌드를 가져올 수 없습니다.</div>
    </div>
  );
}
