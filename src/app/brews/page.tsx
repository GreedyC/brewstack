import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/table";
import { formatDateTime, formatDurationParts, formatNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function BrewsPage() {
  const brews = await prisma.brewLog.findMany({
    orderBy: { createdAt: "desc" },
    include: { bean: true }
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Demleme Geçmişi</h1>
          <p className="text-sm text-[var(--ink-muted)]">
            Tüm demleme kayıtlarını tek yerden izle.
          </p>
        </div>
        <Link href="/brews/new">
          <Button>Yeni Demleme</Button>
        </Link>
      </div>

      {brews.length === 0 ? (
        <Card>
          <p className="text-sm text-[var(--ink-muted)]">
            Henüz demleme eklenmedi.
          </p>
        </Card>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Çekirdek</TableHeaderCell>
              <TableHeaderCell>Ekipman</TableHeaderCell>
              <TableHeaderCell>Oran</TableHeaderCell>
              <TableHeaderCell>Süre</TableHeaderCell>
              <TableHeaderCell>Puan</TableHeaderCell>
              <TableHeaderCell>Tarih</TableHeaderCell>
            </TableRow>
          </TableHead>
          <tbody>
            {brews.map((brew) => {
              const ratio = brew.yieldMl / brew.doseGrams;
              return (
                <TableRow key={brew.id}>
                  <TableCell>
                    <div className="font-semibold">{brew.bean.name}</div>
                    <div className="text-xs text-[var(--ink-muted)]">
                      {brew.bean.roaster}
                    </div>
                  </TableCell>
                  <TableCell>{brew.method}</TableCell>
                  <TableCell>
                    1:{Number.isFinite(ratio) ? ratio.toFixed(1) : "—"}
                  </TableCell>
                  <TableCell>
                    {formatDurationParts(brew.brewTimeMin, brew.brewTimeSec)}
                  </TableCell>
                  <TableCell>
                    <Badge tone={brew.rating >= 8 ? "success" : "default"}>
                      {formatNumber(brew.rating, 1)}/10
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDateTime(brew.createdAt)}</TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}
