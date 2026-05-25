Plaintext

```
`/src`

`  /app`

`    /layout.tsx`

`    /page.tsx                // Dashboard: Özet veriler ve son demlemeler`

`    /beans`

`      /page.tsx              // Çekirdek Envanteri listesi`

`      /new/page.tsx          // Yeni çekirdek ekleme formu`

`    /brews`

`      /page.tsx              // Demleme geçmişi listesi`

`      /new/page.tsx          // Yeni demleme kaydı formu`

`    /api`

`      /beans`

`        /route.ts            // GET, POST`

`        /\[id\]/route.ts       // PATCH (Durum güncelle), DELETE`

`      /brews`

`        /route.ts            // GET, POST`

`  /components`

`    /ui                      // Shadcn UI bileşenleri (Button, Input, Table vb.)`

`    /forms`

`      /bean-form.tsx         // Çekirdek ekleme form bileşeni`

`      /brew-form.tsx         // Demleme ekleme form bileşeni`

`    /layout`

`      /navbar.tsx            // Üst menü`

`  /lib`

`    /prisma.ts               // Prisma global instance`

`    /utils.ts                // Tailwind ve format utils`

`    /validations.ts          // Zod form şemaları`
```

## 6. Veri Doğrulama (Zod Validations)

TypeScript

```
`// src/lib/validations.ts`

`import \{ z \} from "zod";`


`export const beanSchema = z.object(\{`

`  roaster: z.string().min(1, "Kavurucu zorunlu"),`

`  name: z.string().min(1, "Çekirdek adı zorunlu"),`

`  origin: z.string().min(1, "Menşei zorunlu"),`

`  variety: z.string().optional(),`

`  process: z.string().min(1, "İşlem zorunlu"),`

`  roastDate: z.string().or(z.date()).transform((val) =\> new Date(val)),`

`  openDate: z.string().or(z.date()).optional().transform((val) =\> val ? new Date(val) : undefined),`

`  isFinished: z.boolean().default(false),`

`\});`


`export const brewLogSchema = z.object(\{`

`  beanId: z.string().uuid("Çekirdek seçilmeli"),`

`  method: z.string().min(1, "Ekipman zorunlu"),`

`  doseGrams: z.number().positive(),`

`  yieldMl: z.number().positive(),`

`  waterTempC: z.number().min(50),`

`  grindSetting: z.string().min(1),`

`  brewTimeSec: z.number().positive(),`

`  rating: z.number().int().min(1).max(5),`

`  tastingNotes: z.string().optional(),`

`\});`
```

## 7. Kullanıcı Arayüzü ve Dinamik Kurallar

1. **Dinamik Demleme Oranı (Brew Ratio):** `brew-form.tsx` içerisinde kullanıcı kahve (`doseGrams`) ve su (`yieldMl`) miktarını girdiği anda formül üzerinden anlık olarak "1 : X" oranı hesaplanıp ekrana yazdırılmalıdır. (Örn: 15g kahve, 240ml su -\> Oran: 1:16)

2. **Mobil Öncelikli (Mobile-First):** Kahve demlerken uygulamanın telefondan rahatça kullanılabilmesi için form elemanları (inputlar, butonlar) dokunmatik ekranlara uygun, büyük ve okunaklı olmalıdır.

3. **Dashboard (Ana Sayfa):** Sistemdeki aktif kahve paketi sayısı, toplam demleme sayısı ve en yüksek puanlı son 3 demleme kartlar halinde gösterilecektir.

## 8. Prisma Seed (Örnek Veri Seti)

Uygulamanın arayüzünü test etmek için `prisma/seed.ts` dosyasına aşağıdaki varsayılan veriler eklenecektir:

TypeScript

```
`import \{ PrismaClient \} from "@prisma/client";`

`const prisma = new PrismaClient();`


`async function main() \{`

`  await prisma.brewLog.deleteMany();`

`  await prisma.bean.deleteMany();`


`  const bean1 = await prisma.bean.create(\{`

`    data: \{`

`      roaster: "Null Coffee",`

`      name: "Colombia Finca El Paraiso",`

`      origin: "Colombia",`

`      variety: "Red Bourbon",`

`      process: "Anaerobic",`

`      roastDate: new Date("2026-05-10"),`

`      isFinished: false,`

`    \},`

`  \});`


`  const bean2 = await prisma.bean.create(\{`

`    data: \{`

`      roaster: "Wayta Coffee",`

`      name: "Peru Cajamarca",`

`      origin: "Peru",`

`      variety: "Geisha",`

`      process: "Washed",`

`      roastDate: new Date("2026-05-15"),`

`      isFinished: false,`

`    \},`

`  \});`


`  await prisma.brewLog.create(\{`

`    data: \{`

`      beanId: bean1.id,`

`      method: "Hario MUGEN",`

`      doseGrams: 16.0,`

`      yieldMl: 250.0,`

`      waterTempC: 93.0,`

`      grindSetting: "22 Clicks",`

`      brewTimeSec: 150,`

`      rating: 5,`

`      tastingNotes: "Çilek ve yoğun kırmızı meyve profili, harika tatlılık.",`

`    \},`

`  \});`


`  await prisma.brewLog.create(\{`

`    data: \{`

`      beanId: bean2.id,`

`      method: "Hario Switch",`

`      doseGrams: 15.0,`

`      yieldMl: 240.0,`

`      waterTempC: 92.0,`

`      grindSetting: "20 Clicks",`

`      brewTimeSec: 180,`

`      rating: 4,`

`      tastingNotes: "Yasemin ve çiçeksi notalar, temiz bir bitiş.",`

`    \},`

`  \});`

`\}`


`main().catch(console.error).finally(() =\> prisma.$disconnect());`
```

## 9. AI İşletim Talimatı

**DIKKAT (Yapay Zeka Asistanı İçin):** 1. Yukarıdaki dizin yapısına sadık kalarak tüm Next.js App Router mimarisini kur. 2. Prisma şemasını oluştur, migrate et ve seed komutunu çalıştır. 3. `/api` rotalarını ve istemci tarafındaki (client-side) form bileşenlerini eksiksiz üret. Kod bloklarında asla kısaltma (placeholder) kullanma, her bir dosyayı tam metin olarak oluştur. """

file\_name = "brewstack\_tum\_proje\_plani\_v2.md" with open(file\_name, "w", encoding="utf-8") as f: f.write(markdown\_content)

print(f"File created successfully: \{file\_name\}")

