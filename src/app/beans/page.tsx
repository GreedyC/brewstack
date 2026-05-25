import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { BeansTable } from "@/components/beans/beans-table";

export const dynamic = "force-dynamic";

export default async function BeansPage() {
  const beans = await prisma.bean.findMany({
    orderBy: { roastDate: "desc" }
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Çekirdek Envanteri</h1>
          <p className="text-sm text-[var(--ink-muted)]">
            Kavrum ve paket durumunu takip et.
          </p>
        </div>
        <Link href="/beans/new">
          <Button>Yeni Çekirdek</Button>
        </Link>
      </div>

      <BeansTable beans={beans} />
    </div>
  );
}
