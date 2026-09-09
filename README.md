# پروژه Admin و Profile

<p dir="rtl" align="right">
این پروژه دو اپ دارد: <bdi dir="ltr">Admin</bdi> برای مدیریت کاربران و <bdi dir="ltr">Profile</bdi> برای نمایش اطلاعات حساب کاربر. هر دو با <bdi dir="ltr">Next.js</bdi> ساخته شده‌اند. رابط فارسی و راست‌چین است و برای اجرای آزمایشی به بک‌اند واقعی نیاز ندارد.
</p>

## فهرست مطالب

- [امکانات](#امکانات)
- [اجرای پروژه](#اجرای-پروژه)
- [ساختار مخزن](#ساختار-مخزن)
- [معماری](#معماری)
- [داده و احراز هویت](#داده-و-احراز-هویت)
- [بررسی پروژه](#بررسی-پروژه)

## امکانات

<ul dir="rtl" align="right">
  <li><bdi dir="ltr">Admin</bdi>: ورود و خروج، داشبورد، فهرست و جزئیات کاربران، ساخت، ویرایش و حذف کاربر.</li>
  <li><bdi dir="ltr">Profile</bdi>: ورود و خروج و نمایش اطلاعات کاربر واردشده.</li>
  <li>محافظت از صفحه‌ها، اعتبارسنجی فرم‌ها، نمایش بارگذاری و خطا و جلوگیری از ارسال تکراری فرم.</li>
</ul>

## اجرای پروژه

<p dir="rtl" align="right">با نصب بودن <bdi dir="ltr">Node.js</bdi> و <bdi dir="ltr">npm</bdi>، از پوشهٔ اصلی پروژه اجرا کنید:</p>

```bash
npm install
```

<p dir="rtl" align="right">هر اپ را در یک ترمینال جدا اجرا کنید:</p>

```bash
# http://localhost:3000
npm run dev:admin

# http://localhost:3001
npm run dev:profile
```

### حساب‌های آزمایشی

| حساب | ایمیل | رمز عبور |
| --- | --- | --- |
| مدیر | `admin@saas.io` | `admin123` |
| کاربر | `user@saas.io` | `user123` |

<p dir="rtl" align="right">
برای ورود به <bdi dir="ltr">Admin</bdi> از حساب مدیر استفاده کنید. در حالت توسعه، <bdi dir="ltr">MSW</bdi> پاسخ‌های API را شبیه‌سازی می‌کند و تنظیم دیگری لازم نیست.
</p>

### اجرای نسخه Production

<p dir="rtl" align="right">برای استفاده از داده‌های آزمایشی در نسخهٔ <bdi dir="ltr">Production</bdi>، شبیه‌سازی را قبل از Build فعال کنید. در <bdi dir="ltr">PowerShell</bdi>:</p>

```powershell
$env:NEXT_PUBLIC_ENABLE_MOCKS = "true"
npm run build:admin
npx next start apps/admin --port 3000
```

<p dir="rtl" align="right">
برای اپ دوم، در ترمینال جدا همین متغیر را تنظیم کنید و از <code dir="ltr">npm run build:profile</code> و <code dir="ltr">npx next start apps/profile --port 3001</code> استفاده کنید. اگر نسخهٔ توسعه باز است، آن را متوقف کنید تا پورت آزاد شود. بدون این متغیر، نسخهٔ Production درخواست‌ها را به مسیرهای واقعی <code dir="ltr">/api</code> می‌فرستد و به بک‌اند نیاز دارد.
</p>

## ساختار مخزن

```text
apps/
├── admin/
└── profile/
    └── src/features/profile/

libs/
├── admin/
│   ├── dashboard/
│   │   ├── feature/src/lib/screens/
│   │   └── data-access/
│   └── users/feature/src/
│       ├── index.ts
│       └── lib/
│           ├── screens/
│           ├── components/
│           ├── hooks/
│           └── validation/
├── users/
│   ├── domain/
│   └── data-access/
├── auth/
├── ui/
└── shared/
    ├── app-runtime/
    ├── http-client/
    └── mock-api/
```

<p dir="rtl" align="right">
مسیرها و Layoutها در <code dir="ltr">apps/*/app</code> هستند. داخل Libraryها، کد در <code dir="ltr">src/lib</code> و exportهای عمومی در <code dir="ltr">src/index.ts</code> قرار می‌گیرند. پوشهٔ <code dir="ltr">auth</code> برای ورود و دسترسی‌ها، <code dir="ltr">ui</code> برای اجزای مشترک و <code dir="ltr">shared</code> برای تنظیمات اجرا، ارتباط HTTP و API آزمایشی است.
</p>

## معماری

<p dir="rtl" align="right">
ساختار پروژه <bdi dir="ltr">Monorepo + Feature-based</bdi> است. هر اپ جدا اجرا و ساخته می‌شود، ولی کدهای مشترک در همان مخزن هستند. فایل‌ها بر اساس قابلیت دسته‌بندی شده‌اند تا تغییر یک بخش و کار چند تیم روی بخش‌های جدا ساده‌تر باشد.
</p>

### تفاوت Admin و Profile

<p dir="rtl" align="right">
در این تسک فرض شده <bdi dir="ltr">Admin</bdi> رشد بیشتری دارد و ممکن است چند تیم روی کاربران، داشبورد و بخش‌های بعدی کار کنند؛ برای همین قابلیت‌هایش در <code dir="ltr">libs/admin</code> جدا شده‌اند. خود داشبورد فعلی بزرگ نیست. <bdi dir="ltr">Profile</bdi> فعلاً یک قابلیت کوچک دارد و داخل اپ مانده است؛ اگر بزرگ‌تر شد، می‌توان آن را هم به Library منتقل کرد.
</p>

<p dir="rtl" align="right">
مدل‌ها و دسترسی به دادهٔ کاربران در <code dir="ltr">libs/users</code> هستند، چون هر دو اپ از آن‌ها استفاده می‌کنند. به همین خاطر <code dir="ltr">libs/admin/users</code> فقط رابط مدیریت کاربران را دارد. داده‌های داشبورد مخصوص Admin هستند و کنار Feature خودش قرار گرفته‌اند.
</p>

### چرا Micro Frontend نه؟

<p dir="rtl" align="right">
فعلاً در فرض پروژه، نه مقیاس تیم چنین پیچیدگی‌ای می‌خواهد و نه نیاز به ترکیب بخش‌هایی با استک متفاوت مثل <bdi dir="ltr">Angular</bdi> داریم. دو اپ همین حالا هم جداگانه قابل دیپلوی هستند. اگر بعدها تیم داشبورد بخواهد بخش خودش را بدون ساخت و دیپلوی کل Admin منتشر کند و همچنان داخل همان رابط باشد، <bdi dir="ltr">Micro Frontend</bdi> ارزش بررسی دارد. Libraryهای فعلی مرز کد هستند، نه واحد دیپلوی مستقل.
</p>

### انتخاب Nx

<p dir="rtl" align="right">
دلیل اصلی انتخاب <bdi dir="ltr">Nx</bdi> کنترل وابستگی‌هاست. قواعد <code dir="ltr">eslint.config.mjs</code> با تگ‌های نوع و محدوده جلوی وابستگی اشتباه را می‌گیرند؛ مثلاً Profile نباید کد اختصاصی Admin را وارد کند. گراف پروژه، کش و دستور <code dir="ltr">affected</code> هم برای بررسی اثر تغییرات کمک می‌کنند.
</p>

<table dir="rtl">
  <tr><th align="right">معیار</th><th>Nx</th><th><bdi dir="ltr">Turborepo + pnpm</bdi></th></tr>
  <tr><td>راه‌اندازی و یادگیری</td><td>در این ساختار بیشتر</td><td>برای شروع معمولاً ساده‌تر</td></tr>
  <tr><td>تولید کد</td><td>تولیدکننده‌ها و پلاگین‌ها</td><td><code dir="ltr">turbo gen</code></td></tr>
  <tr><td>مرزبندی</td><td>قواعد تگ‌محور؛ در این پروژه فعال‌اند</td><td><code dir="ltr">turbo boundaries</code>؛ نیازمند بررسی تناسب قواعد</td></tr>
</table>

<p dir="rtl" align="right">
هر دو گزینه قابل استفاده‌اند؛ اینجا قواعد معماری Nx با نیاز پروژه سازگارتر بودند. <bdi dir="ltr">pnpm Workspaces</bdi> برای مدیریت پکیج‌های مخزن است و می‌تواند کنار هر دو ابزار باشد؛ این پروژه از npm استفاده می‌کند. جزئیات: <a href="https://nx.dev/docs/guides/enforce-module-boundaries">مرزبندی Nx</a> و <a href="https://turborepo.dev/docs/guides/generating-code">تولید کد Turborepo</a>.
</p>

### انتخاب Next.js و ابزارهای دیگر

<p dir="rtl" align="right">
<bdi dir="ltr">Next.js</bdi> برای مسیریابی فایل‌محور و Layoutهای مشترک انتخاب شده است. رابط همچنان با React نوشته شده؛ Next جایگزین React نیست. <bdi dir="ltr">React + Vite</bdi> هم جواب می‌داد، ولی اینجا قرارداد آمادهٔ مسیرها در هر دو اپ ترجیح داده شده است. داده‌های فعلی سمت کلاینت دریافت می‌شوند و SEO دلیل اصلی انتخاب نبوده است.
</p>

<ul dir="rtl" align="right">
  <li><bdi dir="ltr">TypeScript</bdi> برای نوع‌ها، <bdi dir="ltr">React Query</bdi> برای دادهٔ سرور و <bdi dir="ltr">Zustand</bdi> برای وضعیت احراز هویت سمت کلاینت.</li>
  <li><bdi dir="ltr">Material UI</bdi> برای رابط و <bdi dir="ltr">Emotion + Stylis RTL</bdi> برای استایل راست‌چین.</li>
  <li><bdi dir="ltr">Formik + Yup</bdi> برای فرم و اعتبارسنجی و <bdi dir="ltr">react-hot-toast</bdi> برای پیام عملیات.</li>
  <li><bdi dir="ltr">MSW</bdi> برای API آزمایشی، <bdi dir="ltr">Vitest</bdi> برای تست و <bdi dir="ltr">ESLint + Prettier</bdi> برای بررسی و قالب کد.</li>
</ul>

### اضافه کردن قابلیت جدید

<p dir="rtl" align="right">
برای قابلیتی مثل Billing می‌توان از ساختار کاربران الگو گرفت: صفحه‌ها در <code dir="ltr">src/lib/screens</code>، اجزای فرم و جدول در <code dir="ltr">components</code> و منطق پیچیده‌تر در <code dir="ltr">hooks</code>. مسیر Next فقط صفحه را وارد می‌کند. درخواست‌ها در <code dir="ltr">data-access</code> و مدل‌ها در <code dir="ltr">domain</code> قرار می‌گیرند. برای Library جدید باید exportها، تگ‌ها و وابستگی‌های مجاز هم مشخص شوند. کدی که واقعاً بین محصولات مشترک است بیرون از محدودهٔ یک اپ قرار می‌گیرد.
</p>

## داده و احراز هویت

<ul dir="rtl" align="right">
  <li><bdi dir="ltr">React Query</bdi> کش و وضعیت درخواست‌ها را مدیریت می‌کند؛ ارسال درخواست و تبدیل خطاها در <code dir="ltr">shared-http-client</code> متمرکز است. بعد از تغییر داده، Queryهای مرتبط به‌روز می‌شوند.</li>
  <li>ورود و بررسی Session در <code dir="ltr">auth</code> مشترک است. <code dir="ltr">ProtectedRoute</code> در Layout گروه <code dir="ltr">(protected)</code> قرار دارد و Admin نقش مدیر را هم بررسی می‌کند.</li>
  <li>هنگام خروج یا تغییر حساب، کش پاک می‌شود. خطای موقت شبکه باعث خروج کاربر نمی‌شود و امکان تلاش دوباره دارد.</li>
  <li>صفحه‌ها حالت بارگذاری و خطا دارند؛ دکمه‌ها هنگام ارسال غیرفعال می‌شوند و نتیجه با پیام فارسی نمایش داده می‌شود.</li>
</ul>

<p dir="rtl" align="right">
نسخهٔ آزمایشی Token را در حافظهٔ ماندگار مرورگر نگه می‌دارد. اتصال به بک‌اند واقعی به پیاده‌سازی احراز هویت و کنترل دسترسی سمت سرور هم نیاز دارد.
</p>

## بررسی پروژه

```bash
npm run typecheck
npm run lint
npm test
npm run format:check
npm run build:admin
npm run build:profile
```

<p dir="rtl" align="right">تست‌ها بخش‌هایی مثل HTTP Client، API کاربران، کلیدهای Query و اعتبارسنجی فرم را پوشش می‌دهند. برای دیدن گراف وابستگی‌ها:</p>

```bash
npx nx graph
```
