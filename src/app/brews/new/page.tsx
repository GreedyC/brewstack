import { prisma } from "@/lib/prisma";
import { BrewForm } from "@/components/forms/brew-form";

export const dynamic = "force-dynamic";

export default async function NewBrewPage() {
  const beans = await prisma.bean.findMany({
    where: { isFinished: false },
    orderBy: { roastDate: "desc" }
  });

  const options = beans.map((bean) => ({
    id: bean.id,
    label: `${bean.roaster} · ${bean.name}`
  }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Yeni Demleme</h1>
        <p className="text-sm text-[var(--ink-muted)]">
          Yeni bir demleme kaydı oluştur.
        </p>
      </div>
      <BrewForm beans={options} />
    </div>
  );
}
