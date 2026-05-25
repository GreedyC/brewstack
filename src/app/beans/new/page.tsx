import { BeanForm } from "@/components/forms/bean-form";

export default function NewBeanPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Yeni Çekirdek</h1>
        <p className="text-sm text-[var(--ink-muted)]">
          Yeni kavrum paketini envantere ekle.
        </p>
      </div>
      <BeanForm />
    </div>
  );
}
