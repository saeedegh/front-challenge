# پلتفرم SaaS — معماری Frontend چندمحصولی

این پروژه یک Frontend چندمحصولی برای یک پلتفرم SaaS است که دو محصول مستقل **Admin** و **Profile** را در یک Monorepo نگه‌داری می‌کند. هدف اصلی پروژه نمایش یک معماری قابل توسعه برای چند محصول و چند تیم است؛ بنابراین تصمیم‌ها بیشتر بر مرزبندی کد، مالکیت Featureها، مدیریت وابستگی‌ها و رفتار قابل پیش‌بینی برنامه متمرکز هستند.

## فهرست مطالب

- [قابلیت‌های پیاده‌سازی‌شده](#قابلیتهای-پیادهسازیشده)
- [اجرای پروژه](#اجرای-پروژه)
- [ساختار مخزن](#ساختار-مخزن)
- [معماری انتخاب‌شده](#معماری-انتخابشده)
  - [دلیل انتخاب تکنولوژی‌ها](#دلیل-انتخاب-تکنولوژیها)
  - [توسعه پروژه با Featureها و تیم‌های جدید](#توسعه-پروژه-با-featureها-و-تیمهای-جدید)
- [پروژه‌ها و Libraryهای Nx](#پروژهها-و-libraryهای-nx)
- [گراف وابستگی Nx](#گراف-وابستگی-nx)
- [مرز مسئولیت لایه‌ها](#مرز-مسئولیت-لایهها)
- [تصمیم متفاوت برای Admin و Profile](#تصمیم-متفاوت-برای-admin-و-profile)
- [مدیریت API و Server State](#مدیریت-api-و-server-state)
- [احراز هویت و Protected Routes](#احراز-هویت-و-protected-routes)
- [مدیریت Loading و Error](#مدیریت-loading-و-error)
- [کنترل کیفیت](#کنترل-کیفیت)

## قابلیت‌های پیاده‌سازی‌شده

### Admin

- ورود و خروج کاربر
- محافظت از تمام Routeهای مدیریتی و کنترل نقش `admin`
- Dashboard با خلاصه تعداد کاربران و مدیران
- مشاهده فهرست کاربران
- مشاهده جزئیات کاربر
- ساخت، ویرایش و حذف کاربر
- فرم‌های Formik با Validation مبتنی بر Yup
- Sidebar واکنش‌گرا و رابط کاملاً راست‌چین

### Profile

- ورود و خروج کاربر
- محافظت از Route پروفایل
- دریافت و نمایش اطلاعات کاربر واردشده
- رابط کاملاً راست‌چین

### قابلیت‌های مشترک

- احراز هویت و بررسی اعتبار Session
- HTTP Client و قرارداد یکسان برای خطاهای API
- مدیریت Server State با React Query
- Theme، Layout، حالت‌های Loading/Error و زیرساخت RTL
- API Mock با MSW و داده‌ها و پیام‌های فارسی
- جلوگیری از ارسال تکراری عملیات در زمان Loading

## اجرای پروژه

### پیش‌نیاز

- نسخه LTS از Node.js
- npm

### نصب

```bash
npm install
```

فایل‌های Service Worker مربوط به MSW داخل هر دو اپ قرار دارند. اگر این فایل‌ها حذف شدند، می‌توان آن‌ها را دوباره ساخت:

```bash
npx msw init apps/admin/public --save
npx msw init apps/profile/public --save
```

### اجرای اپ‌ها

```bash
# Admin: http://localhost:3000
npm run dev:admin

# Profile: http://localhost:3001
npm run dev:profile
```

### حساب‌های آزمایشی

| کاربرد | ایمیل           | رمز عبور   |
| ------ | --------------- | ---------- |
| مدیر   | `admin@saas.io` | `admin123` |
| کاربر  | `user@saas.io`  | `user123`  |

<p dir="rtl" align="right">
برای ورود به <bdi dir="ltr">Route</bdi>های محافظت‌شده <bdi dir="ltr">Admin</bdi> باید از حساب مدیر استفاده شود.
</p>

<p dir="rtl" align="right">
<bdi dir="ltr">Mock API</bdi> در محیط <bdi dir="ltr">Development</bdi> به‌صورت خودکار فعال است. برای فعال‌کردن صریح آن در محیطی دیگر می‌توان مقدار زیر را تنظیم کرد:
</p>

```bash
NEXT_PUBLIC_ENABLE_MOCKS=true
```

در Production و بدون این متغیر، برنامه درخواست‌ها را به Endpointهای واقعی `/api` ارسال می‌کند.

## ساختار مخزن

<pre dir="ltr"><code>.
├── apps/
│   ├── admin/
│   │   ├── app/                    # <bdi dir="rtl"><bdi dir="ltr">Next.js routes, layouts, loading</bdi> و <bdi dir="ltr">error boundaries</bdi></bdi>
│   │   │   ├── login/
│   │   │   └── (protected)/
│   │   │       ├── dashboard/
│   │   │       └── users/
│   │   │           ├── new/
│   │   │           └── [id]/edit/
│   │   └── src/app-shell/          # <bdi dir="rtl"><bdi dir="ltr">Navigation</bdi> و تنظیمات <bdi dir="ltr">Shell</bdi> اپ <bdi dir="ltr">Admin</bdi></bdi>
│   │
│   └── profile/
│       ├── app/                    # <bdi dir="rtl"><bdi dir="ltr">Next.js routes</bdi> و <bdi dir="ltr">layouts</bdi></bdi>
│       │   ├── login/
│       │   └── (protected)/profile/
│       └── src/
│           ├── app-shell/          # <bdi dir="rtl">تنظیمات <bdi dir="ltr">Shell</bdi> اپ <bdi dir="ltr">Profile</bdi></bdi>
│           └── features/profile/   # <bdi dir="rtl"><bdi dir="ltr">Feature</bdi> داخلی و اختصاصی <bdi dir="ltr">Profile</bdi></bdi>
│
├── libs/
│   ├── admin/
│   │   ├── dashboard/
│   │   │   ├── feature/            # <bdi dir="ltr"><bdi dir="ltr">Dashboard screen</bdi></bdi>
│   │   │   │   └── src/
│   │   │   │       ├── index.ts
│   │   │   │       └── lib/
│   │   │   │           └── screens/
│   │   │   │               └── dashboard-screen.tsx
│   │   │   └── data-access/        # <bdi dir="rtl"><bdi dir="ltr">Query</bdi>، <bdi dir="ltr">query key</bdi> و <bdi dir="ltr">API</bdi></bdi>
│   │   └── users/feature/          # <bdi dir="rtl"><bdi dir="ltr">Feature</bdi> کامل <bdi dir="ltr">User Management</bdi> در <bdi dir="ltr">Admin</bdi></bdi>
│   │       └── src/
│   │           ├── index.ts
│   │           └── lib/
│   │               ├── screens/    # <bdi dir="rtl">ورودی‌های سطح <bdi dir="ltr">Route</bdi></bdi>
│   │               ├── components/ # <bdi dir="rtl">اجزای نمایشی <bdi dir="ltr">Feature</bdi></bdi>
│   │               ├── hooks/      # <bdi dir="rtl">منطق و <bdi dir="ltr">Controller</bdi>های صفحه</bdi>
│   │               └── validation/ # <bdi dir="rtl"><bdi dir="ltr">Schema</bdi>های <bdi dir="ltr">Yup</bdi></bdi>
│   │
│   ├── users/
│   │   ├── domain/                 # <bdi dir="rtl">مدل‌ها و قراردادهای مستقل از <bdi dir="ltr">Framework</bdi></bdi>
│   │   └── data-access/            # <bdi dir="rtl"><bdi dir="ltr">React Query hooks</bdi> و <bdi dir="ltr">Users API</bdi></bdi>
│   │
│   ├── auth/                       # <bdi dir="rtl"><bdi dir="ltr">Login</bdi>، <bdi dir="ltr">Session</bdi>، <bdi dir="ltr">Logout</bdi> و <bdi dir="ltr">ProtectedRoute</bdi></bdi>
│   ├── ui/                         # <bdi dir="rtl"><bdi dir="ltr">UI</bdi> و <bdi dir="ltr">Layout</bdi> مشترک و مستقل از محصول</bdi>
│   └── shared/
│       ├── app-runtime/            # <bdi dir="rtl"><bdi dir="ltr">Provider</bdi>های سراسری و <bdi dir="ltr">QueryClient</bdi></bdi>
│       ├── http-client/            # <bdi dir="rtl">تنها محل استفاده مستقیم از <bdi dir="ltr">fetch</bdi></bdi>
│       └── mock-api/               # <bdi dir="rtl"><bdi dir="ltr">Handler</bdi>ها و داده‌های <bdi dir="ltr">MSW</bdi></bdi>
│
├── tools/                          # <bdi dir="rtl">تنظیمات مشترک <bdi dir="ltr">alias</bdi> و <bdi dir="ltr">Next.js</bdi></bdi>
├── eslint.config.mjs               # <bdi dir="rtl">قوانین کیفیت و <bdi dir="ltr">Nx boundaries</bdi></bdi>
├── nx.json
├── tsconfig.base.json              # <bdi dir="ltr"><bdi dir="ltr">Public import aliases</bdi></bdi>
└── vitest.config.mjs</code></pre>

## معماری انتخاب‌شده

معماری پروژه یک **Modular Monorepo با Feature-based Architecture و مرزبندی لایه‌ای** است.

<ul dir="rtl" align="right">
  <li><strong><bdi dir="ltr">Monorepo</bdi></strong> امکان نگه‌داری چند محصول و کد مشترک آن‌ها را در یک مخزن فراهم می‌کند.</li>
  <li><strong><bdi dir="ltr">Feature-based Architecture</bdi></strong> کد را بر اساس قابلیت‌های کسب‌وکار مانند <bdi dir="ltr">Authentication</bdi>، <bdi dir="ltr">User Management</bdi> و <bdi dir="ltr">Dashboard</bdi> سازماندهی می‌کند.</li>
  <li><strong><bdi dir="ltr">Layered boundaries</bdi></strong> جهت وابستگی میان <bdi dir="ltr">Domain</bdi>، <bdi dir="ltr">Data Access</bdi>، <bdi dir="ltr">Feature</bdi>، <bdi dir="ltr">UI</bdi> و <bdi dir="ltr">App</bdi> را مشخص می‌کند.</li>
  <li>هر <bdi dir="ltr">Next.js App</bdi> یک واحد مستقل برای اجرا، <bdi dir="ltr">Build</bdi> و استقرار است و نقش <bdi dir="ltr">Composition Root</bdi> محصول را دارد.</li>
</ul>

<p dir="rtl" align="right">
این ساختار برای سناریوی تسک مناسب است، چون تیم‌های آینده می‌توانند جداگانه روی هر اپ کار کنند و کد مشترک را در <bdi dir="ltr">Library</bdi>های مشخص با قراردادهای عمومی نگه دارند. تغییر مشترک در <bdi dir="ltr">Auth</bdi>، <bdi dir="ltr">UI</bdi> یا <bdi dir="ltr">API</bdi> می‌تواند در یک تغییر هماهنگ برای هر دو محصول انجام شود؛ به این ترتیب انسجام محصولات حفظ می‌شود و مالکیت کد اختصاصی هر محصول هم روشن می‌ماند. <bdi dir="ltr">Feature</bdi>ها ماژولار هستند و در صورت سازگاری مسئولیت و محدودهٔ وابستگی، از طریق <bdi dir="ltr">Public API</bdi> قابل استفادهٔ مجددند؛ لازم نیست همهٔ آن‌ها بین همهٔ محصولات مشترک باشند. افزودن قابلیت جدید نیز با پیروی از ساختار قابلیت‌های موجود و تعیین محدوده و وابستگی‌های آن ساده‌تر می‌شود.
</p>

<p dir="rtl" align="right">
<bdi dir="ltr">Micro Frontend</bdi> در وضعیت فعلی انتخاب نشده است. در فرض طراحی این تسک، مقیاس تیم هنوز آن‌قدر بزرگ نیست که انتشار و استقرار مستقل بخش‌های یک محصول توسط چند تیم ضروری باشد. همچنین نیازی به ساخت محصول یا بخشی از آن با یک استک دیگر مانند <bdi dir="ltr">Angular</bdi> و ترکیب آن با بخش‌های فعلی در <bdi dir="ltr">Runtime</bdi> مطرح نشده است. بنابراین <bdi dir="ltr">Monorepo</bdi> در کنار ساختار <bdi dir="ltr">Feature-based</bdi> نیاز فعلی را پوشش می‌دهد.
</p>

<p dir="rtl" align="right">
دو <bdi dir="ltr">Next.js App</bdi> همین حالا هم از نظر اجرا، <bdi dir="ltr">Build</bdi> و استقرار مستقل هستند؛ این استقلال به‌تنهایی نیازمند <bdi dir="ltr">Micro Frontend</bdi> نیست. حتی داشتن محصولی مستقل با استک متفاوت نیز به‌تنهایی چنین ضرورتی ایجاد نمی‌کند. اگر در آینده چند تیم به انتشار مستقل بخش‌های یک رابط مشترک و ترکیب آن‌ها در <bdi dir="ltr">Runtime</bdi> نیاز پیدا کنند، این انتخاب بازنگری می‌شود. در شرایط فعلی، هزینهٔ <bdi dir="ltr">Versioning</bdi>، ارتباط بین بخش‌ها، استقرار و <bdi dir="ltr">Debug</bdi> چنین معماری‌ای توجیه ندارد.
</p>

<p dir="rtl" align="right">
برای مثال، اگر در آینده تیم‌های مسئول <bdi dir="ltr">Dashboard</bdi> و مدیریت کاربران نیاز داشته باشند بخش خود را جداگانه <bdi dir="ltr">Build</bdi> و <bdi dir="ltr">Deploy</bdi> کنند، بدون آنکه انتشار آن بخش نیازمند بازسازی و استقرار کل اپ <bdi dir="ltr">Admin</bdi> باشد، و این بخش‌ها همچنان در یک رابط مشترک نمایش داده شوند، <bdi dir="ltr">Micro Frontend</bdi> گزینهٔ قابل بررسی خواهد بود. <bdi dir="ltr">Library</bdi>های فعلی مرز کد و مالکیت تیمی ایجاد می‌کنند، اما واحد استقرار مستقل نیستند. در مقابل، اگر فقط بخواهیم اپ‌های <bdi dir="ltr">Admin</bdi> و <bdi dir="ltr">Profile</bdi> را جداگانه و در زمان‌های متفاوت مستقر کنیم، ساختار فعلی این امکان را دارد و نیازی به تغییر معماری نیست.
</p>

### انتخاب Nx

<p dir="rtl" align="right">
پس از انتخاب معماری <bdi dir="ltr">Monorepo + Modular Feature-based</bdi>، ابزار <bdi dir="ltr">Nx</bdi> برای مدیریت و کنترل این ساختار انتخاب شده است. صرفاً قرار دادن چند اپ در یک مخزن به <bdi dir="ltr">Nx</bdi> نیاز ندارد؛ <a href="https://pnpm.io/workspaces"><bdi dir="ltr">pnpm Workspaces</bdi></a> هم مدیریت پکیج‌های یک مخزن و اتصال وابستگی‌های محلی را فراهم می‌کند. <bdi dir="ltr">pnpm</bdi> مدیر پکیج است و می‌تواند کنار <bdi dir="ltr">Nx</bdi> یا <bdi dir="ltr">Turborepo</bdi> استفاده شود؛ پروژهٔ فعلی از <bdi dir="ltr">npm</bdi> استفاده می‌کند. مقایسهٔ زیر دربارهٔ ابزار مدیریت پروژه‌ها و اجرای کارهاست، نه تعویض مدیر پکیج پروژه.
</p>

<p dir="rtl" align="right">
مزیت تعیین‌کنندهٔ <bdi dir="ltr">Nx</bdi> برای این تسک، تبدیل مرزهای معماری به قوانین قابل بررسی است. در <code dir="ltr">eslint.config.mjs</code>، قانون <code dir="ltr">@nx/enforce-module-boundaries</code> با تگ‌های نوع و محدوده فعال است؛ مثلاً <bdi dir="ltr">Profile</bdi> نمی‌تواند قابلیت اختصاصی <bdi dir="ltr">Admin</bdi> را وارد کند و <bdi dir="ltr">Domain</bdi> به لایه‌های نمایشی وابسته نمی‌شود. این تصمیم بر قابلیت واقعی استفاده‌شده در مخزن تکیه دارد. جزئیات این امکان در <a href="https://nx.dev/docs/guides/enforce-module-boundaries">مستندات مرزبندی Nx</a> آمده است.
</p>

<table dir="rtl">
  <thead><tr><th>معیار</th><th><bdi dir="ltr">Nx</bdi></th><th><bdi dir="ltr">Turborepo + pnpm</bdi></th></tr></thead>
  <tbody>
    <tr><td>پیچیدگی راه‌اندازی</td><td>در ساختار فعلی بیشتر؛ تعریف پروژه‌ها، تگ‌ها و قواعد</td><td>برای شروع با پکیج‌ها و اسکریپت‌ها معمولاً کمتر</td></tr>
    <tr><td>تولید کد</td><td>✅ تولیدکننده‌های قابل برنامه‌نویسی و توسعه از طریق پلاگین</td><td>✅ تولید کد و پکیج با <code dir="ltr">turbo gen</code> و قالب‌ها</td></tr>
    <tr><td>اعمال مرز ماژول‌ها</td><td>قواعد مبتنی بر تگ در <bdi dir="ltr">ESLint</bdi>؛ استفاده‌شده در همین پروژه</td><td>دارای <code dir="ltr">turbo boundaries</code>؛ دامنه و بلوغ آن باید با قواعد موردنیاز پروژه سنجیده شود</td></tr>
    <tr><td>اکوسیستم پلاگین</td><td>ابزارهای یکپارچه برای تولید کد، اجرای کارها و مهاجرت تنظیمات</td><td>تمرکز بر اجرای اسکریپت‌های پکیج‌ها؛ یکپارچه‌سازی ابزارهای دیگر بیشتر بر عهدهٔ مخزن</td></tr>
    <tr><td>منحنی یادگیری</td><td>در این الگو بیشتر؛ گراف، تگ‌ها و تنظیمات پروژه</td><td>برای تیم آشنا با پکیج‌ها و اسکریپت‌ها معمولاً کمتر</td></tr>
    <tr><td>مقیاس سازمانی</td><td>برای نیاز این تسک به کنترل معماری و رشد چندتیمی مناسب‌تر ارزیابی شده است</td><td>قابل استفاده در مقیاس بزرگ؛ قواعد معماری موردنیاز باید جداگانه ارزیابی و تکمیل شوند</td></tr>
  </tbody>
</table>

<p dir="rtl" align="right">
ارزیابی پیچیدگی و تناسب سازمانی در جدول، قضاوت طراحی این پروژه است، نه رتبه‌بندی مطلق ابزارها. هر دو ابزار امکانات اجرای کارها و کش دارند؛ دلیل ترجیح <bdi dir="ltr">Nx</bdi> فقط سرعت <bdi dir="ltr">Build</bdi> نیست. برای بررسی قابلیت‌ها: <a href="https://21.nx.dev/docs/features">امکانات Nx</a>، <a href="https://turborepo.dev/docs/guides/generating-code">تولید کد Turborepo</a> و <a href="https://turborepo.dev/docs/reference/boundaries">مرزبندی Turborepo</a>. بنابراین نبود تولید کد یا نبود مطلق مرزبندی در <bdi dir="ltr">Turborepo</bdi> مبنای این انتخاب نیست.
</p>

<p dir="rtl" align="right">
تگ‌های <code dir="ltr">type:*</code> لایهٔ هر پروژه و تگ‌های <code dir="ltr">scope:*</code> مالکیت آن را مشخص می‌کنند. گراف وابستگی نیز برای تشخیص پروژه‌های اثرپذیر و اجرای کارهای مرتبط با <code dir="ltr">affected</code> به کار می‌رود؛ با رشد تیم‌ها، مرز مسئولیت و اثر تغییرات قابل بررسی باقی می‌ماند.
</p>

### انتخاب Next.js

<p dir="rtl" align="right">
<bdi dir="ltr">Next.js</bdi> روی <bdi dir="ltr">React</bdi> ساخته شده است و جایگزین آن نیست؛ مقایسهٔ تصمیم این پروژه، استفاده از این فریم‌ورک در برابر ترکیب <bdi dir="ltr">React</bdi> با ابزار ساختی مانند <bdi dir="ltr">Vite</bdi> و یک مسیریاب جداگانه است. انتخاب <bdi dir="ltr">Next.js</bdi> برای داشتن قرارداد یکسان مسیریابی فایل‌محور و <bdi dir="ltr">Layout</bdi>های تو‌در‌تو در هر دو محصول است. ساختار <code dir="ltr">page.tsx</code> و <code dir="ltr">layout.tsx</code> در <a href="https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts">مستندات نسخهٔ ۱۴ Next.js</a> توضیح داده شده است.
</p>

<p dir="rtl" align="right">
در این مخزن، فایل‌های مسیر فقط صفحهٔ مناسب را متصل می‌کنند و <bdi dir="ltr">Layout</bdi> گروه محافظت‌شده محل اتصال محافظ احراز هویت و پوستهٔ محصول است. منطق قابلیت‌ها در <bdi dir="ltr">Feature</bdi>ها باقی می‌ماند؛ در نتیجه تیم‌ها برای اضافه‌کردن مسیر جدید از قرارداد مشخصی پیروی می‌کنند و هر اپ تنظیمات اجرا و <bdi dir="ltr">Build</bdi> خود را دارد. وجود <bdi dir="ltr">Next.js</bdi> به‌خودی‌خود احراز هویت یا مجوز دسترسی ایجاد نمی‌کند؛ این رفتار با کد مشترک <bdi dir="ltr">Auth</bdi> پیاده شده است.
</p>

<p dir="rtl" align="right">
برای صفحات مدیریتی فعلی، <bdi dir="ltr">SEO</bdi> و دریافت داده در سرور دلیل اصلی انتخاب نیستند؛ داده‌های صفحات فعلی با <bdi dir="ltr">React Query</bdi> در سمت کلاینت دریافت می‌شوند. ترکیب <bdi dir="ltr">React + Vite</bdi> هم گزینهٔ معتبری بود و برای یک اپ صرفاً کلاینتی می‌توانست ساده‌تر باشد. در این تسک، یکپارچگی قراردادهای مسیریابی و ساختار دو محصول به هزینهٔ یادگیری و تنظیمات بیشتر فریم‌ورک ترجیح داده شده است.
</p>

### دلیل انتخاب تکنولوژی‌ها

<p dir="rtl" align="right">
دلیل انتخاب <bdi dir="ltr">Nx</bdi> و <bdi dir="ltr">Next.js</bdi> در بخش‌های <a href="#انتخاب-nx">انتخاب Nx</a> و <a href="#انتخاب-nextjs">انتخاب Next.js</a> توضیح داده شده است. جدول زیر نقش و دلیل انتخاب سایر ابزارها را خلاصه می‌کند.
</p>

<table dir="rtl">
  <thead>
    <tr>
      <th dir="rtl" align="right">تکنولوژی</th>
      <th dir="rtl" align="right">نقش و دلیل انتخاب</th>
    </tr>
  </thead>
  <tbody>
    <tr><td dir="rtl" align="right"><bdi dir="ltr">React + TypeScript Strict</bdi></td><td dir="rtl" align="right">ساخت رابط با قراردادهای نوعی روشن و کشف خطا پیش از اجرا.</td></tr>
    <tr><td dir="rtl" align="right"><bdi dir="ltr">TanStack React Query</bdi></td><td dir="rtl" align="right">مدیریت یکپارچهٔ دادهٔ سرور، کش و وضعیت درخواست‌ها در هر دو اپ.</td></tr>
    <tr><td dir="rtl" align="right"><bdi dir="ltr">Fetch + Shared HTTP Client</bdi></td><td dir="rtl" align="right">ارسال درخواست با <bdi dir="ltr">API</bdi> استاندارد و متمرکزکردن پردازش پاسخ و خطا.</td></tr>
    <tr><td dir="rtl" align="right"><bdi dir="ltr">Zustand</bdi></td><td dir="rtl" align="right">نگه‌داری وضعیت احراز هویت سمت کلاینت، جدا از دادهٔ سرور.</td></tr>
    <tr><td dir="rtl" align="right"><bdi dir="ltr">Material UI + Emotion + Stylis RTL</bdi></td><td dir="rtl" align="right">ساخت سریع رابط واکنش‌گرا با تم مشترک و استایل راست‌به‌چپ.</td></tr>
    <tr><td dir="rtl" align="right"><bdi dir="ltr">Formik + Yup</bdi></td><td dir="rtl" align="right">مدیریت فرم‌ها و اعتبارسنجی قابل استفادهٔ مجدد، جدا از کد نمایشی.</td></tr>
    <tr><td dir="rtl" align="right"><bdi dir="ltr">MSW</bdi></td><td dir="rtl" align="right">شبیه‌سازی پاسخ <bdi dir="ltr">API</bdi> در سطح شبکه برای اجرای پروژه بدون بک‌اند واقعی.</td></tr>
    <tr><td dir="rtl" align="right"><bdi dir="ltr">react-hot-toast</bdi></td><td dir="rtl" align="right">نمایش یکسان بازخورد موفقیت و خطای عملیات.</td></tr>
    <tr><td dir="rtl" align="right"><bdi dir="ltr">Vitest</bdi></td><td dir="rtl" align="right">تست قراردادهای داده و منطق مستقل از رابط کاربری.</td></tr>
    <tr><td dir="rtl" align="right"><bdi dir="ltr">ESLint + Prettier</bdi></td><td dir="rtl" align="right">کنترل قواعد معماری و یکسان‌سازی قالب کد.</td></tr>
  </tbody>
</table>


<br clear="all" />

### توسعه پروژه با Featureها و تیم‌های جدید

<h4 dir="rtl" align="right">افزودن <bdi dir="ltr">Feature</bdi> بزرگ به <bdi dir="ltr">Admin</bdi></h4>

<p dir="rtl" align="right">
برای <bdi dir="ltr">Feature</bdi> مستقلی مانند <bdi dir="ltr">Billing</bdi> که تیم یا چرخه توسعه جدا دارد:
</p>

```text
libs/admin/billing/
├── feature/
│   ├── project.json
│   └── src/
│       ├── screens/
│       ├── components/
│       ├── hooks/
│       └── index.ts
└── data-access/
    ├── project.json
    └── src/
        ├── billing.api.ts
        ├── billing.keys.ts
        ├── billing.queries.ts
        └── index.ts
```

Route مربوط به آن فقط Screen را در `apps/admin/app/(protected)` Compose می‌کند. Tagهای `scope:admin` و نوع مناسب نیز باید به Projectها افزوده شوند.

#### افزودن Feature کوچک به Profile

تا زمانی که Featureها توسط یک تیم و در یک چرخه Release نگه‌داری می‌شوند:

```text
apps/profile/src/features/<feature-name>/
```

اگر تعداد تیم‌ها، اندازه کد یا نیاز به مرز مستقل افزایش یافت، Feature به `libs/profile/<feature-name>` منتقل و Tagهای Nx برای آن تعریف می‌شود. معیار استخراج، مالکیت و هزینه هماهنگی است، نه صرفاً تعداد فایل‌ها.

#### افزودن محصول جدید

1. یک Next.js App جدید در `apps/<product>` ساخته می‌شود.
2. Scope جدید مانند `scope:billing` تعریف می‌شود.
3. قوانین مجاز وابستگی آن Scope به ESLint اضافه می‌شود.
4. `AppProviders`، Auth و UI مشترک در Root Layout Compose می‌شوند.
5. فقط قابلیت‌های واقعاً مشترک از `libs` مصرف می‌شوند و Featureهای اختصاصی در Scope محصول باقی می‌مانند.

## پروژه‌ها و Libraryهای Nx

<p dir="rtl" align="right">
<bdi dir="ltr">Workspace</bdi> در حال حاضر <strong>۱۲ پروژه <bdi dir="ltr">Nx</bdi></strong> دارد: <strong>۲ <bdi dir="ltr">Application</bdi></strong> و <strong>۱۰ <bdi dir="ltr">Library</bdi></strong>.
</p>

| محدوده      |  تعداد | پروژه‌ها                                                                        |
| ----------- | -----: | ------------------------------------------------------------------------------- |
| Application |      ۲ | `admin`, `profile`                                                              |
| Admin       |      ۳ | `admin-users-feature`, `admin-dashboard-feature`, `admin-dashboard-data-access` |
| Users       |      ۲ | `users-domain`, `users-data-access`                                             |
| Shared      |      ۵ | `auth`, `ui`, `shared-app-runtime`, `shared-http-client`, `shared-mock-api`     |
| **مجموع**   | **۱۲** | **۲ App + ۱۰ Library**                                                          |

<p dir="rtl" align="right">
<bdi dir="ltr">Library</bdi>ها فقط برای اشتراک کد ساخته نشده‌اند. در <bdi dir="ltr">Admin</bdi>، بعضی <bdi dir="ltr">Library</bdi>ها مرز مالکیت، نوع وابستگی و واحد مستقل <bdi dir="ltr">Cache/Affected</bdi> در <bdi dir="ltr">Nx</bdi> نیز هستند. در مقابل، کوچک‌ترین فایل یا <bdi dir="ltr">Feature</bdi> به <bdi dir="ltr">Library</bdi> تبدیل نشده تا گراف پروژه بی‌دلیل بزرگ و نگه‌داری آن پرهزینه نشود.
</p>

## گراف وابستگی Nx

نمودار زیر از خروجی واقعی `nx graph` این Workspace استخراج شده است. جهت فلش از مصرف‌کننده به وابستگی است و خط‌چین وابستگی Dynamic مربوط به بارگذاری MSW را نشان می‌دهد.

```mermaid
flowchart LR
  subgraph Apps[Applications]
    admin[admin]
    profile[profile]
  end

  subgraph Admin[Admin Libraries]
    adminUsers[admin-users-feature]
    adminDashboardFeature[admin-dashboard-feature]
    adminDashboardData[admin-dashboard-data-access]
  end

  subgraph Users[Users Libraries]
    usersData[users-data-access]
    usersDomain[users-domain]
  end

  subgraph Shared[Shared Libraries]
    auth[auth]
    appRuntime[shared-app-runtime]
    httpClient[shared-http-client]
    mockApi[shared-mock-api]
    ui[ui]
  end

  admin --> adminUsers
  admin --> adminDashboardFeature
  admin --> auth
  admin --> appRuntime
  admin --> ui

  profile --> auth
  profile --> appRuntime
  profile --> usersData
  profile --> ui

  adminUsers --> usersData
  adminUsers --> usersDomain
  adminUsers --> adminDashboardData
  adminUsers --> ui

  adminDashboardFeature --> adminDashboardData
  adminDashboardFeature --> ui
  adminDashboardData --> usersDomain
  adminDashboardData --> httpClient

  usersData --> usersDomain
  usersData --> httpClient

  auth --> usersDomain
  auth --> httpClient
  auth --> ui

  appRuntime --> auth
  appRuntime --> httpClient
  appRuntime --> ui
  appRuntime -. development .-> mockApi
  mockApi --> usersDomain
```

برای مشاهده نسخه Interactive گراف:

```bash
npx nx graph
```

وابستگی `admin-users-feature` به `admin-dashboard-data-access` برای باطل‌کردن Cache خلاصه Dashboard پس از حذف کاربر است. اگر تعداد Featureهای Admin زیاد شود، این هماهنگی می‌تواند به یک لایه Invalidation/Event مشترک منتقل شود تا Featureها به یکدیگر وابستگی مستقیم نداشته باشند.

## مرز مسئولیت لایه‌ها

### Apps؛ Composition Root و Routing

پوشه‌های `apps/*/app` فقط مسئول موارد زیر هستند:

- تعریف URL و Route با Next.js App Router
- Layout و Error/Loading boundary سطح Route
- Metadata و Redirect ورودی اپ
- اتصال Route به Screen یا Feature مناسب

<p dir="rtl" align="right">
کد فرم، <bdi dir="ltr">Query</bdi>، مدیریت <bdi dir="ltr">State</bdi> و جزئیات <bdi dir="ltr">UI</bdi> داخل <code dir="ltr">page.tsx</code> قرار نمی‌گیرد. این تصمیم <bdi dir="ltr">Route</bdi>ها را کوتاه و قابل فهم نگه می‌دارد، وابستگی کد کسب‌وکار به <bdi dir="ltr">Next.js</bdi> را کم می‌کند و جابه‌جایی یا تست <bdi dir="ltr">Feature</bdi> را ساده‌تر می‌سازد.
</p>

<h3 dir="rtl" align="right"><bdi dir="ltr">Screen</bdi></h3>

<p dir="rtl" align="right">
<bdi dir="ltr">Screen</bdi> ورودی <bdi dir="ltr">UI</bdi> یک قابلیت در سطح <bdi dir="ltr">Route</bdi> است. وظیفه آن چیدن <bdi dir="ltr">Component</bdi>ها و نمایش حالت‌های اصلی صفحه مانند <bdi dir="ltr">Loading</bdi>، <bdi dir="ltr">Error</bdi>، <bdi dir="ltr">Empty</bdi> و <bdi dir="ltr">Success</bdi> است. <bdi dir="ltr">Route</bdi> فقط <bdi dir="ltr">Screen</bdi> را از <bdi dir="ltr">Public API</bdi> مربوط به <bdi dir="ltr">Feature</bdi> وارد می‌کند.
</p>

<h3 dir="rtl" align="right"><bdi dir="ltr">Component</bdi></h3>

<p dir="rtl" align="right">
<bdi dir="ltr">Component</bdi>های داخل <bdi dir="ltr">Feature</bdi> بخش‌های نمایشی مانند جدول کاربران، فرم، کارت جزئیات و <bdi dir="ltr">Dialog</bdi> حذف هستند. ورودی و رخدادها تا حد ممکن با <bdi dir="ltr">Props</bdi> دریافت می‌شوند. این تفکیک باعث می‌شود <bdi dir="ltr">UI</bdi> خواناتر، قابل استفاده مجدد و مستقل از جزئیات <bdi dir="ltr">Navigation</bdi> یا <bdi dir="ltr">Data Fetching</bdi> باشد.
</p>

<h3 dir="rtl" align="right"><bdi dir="ltr">Controller Hook</bdi></h3>

<p dir="rtl" align="right">
در <bdi dir="ltr">Screen</bdi>هایی که مدیریت <bdi dir="ltr">Query</bdi>، <bdi dir="ltr">Mutation</bdi>، <bdi dir="ltr">Router</bdi>، <bdi dir="ltr">Toast</bdi>، <bdi dir="ltr">Dialog</bdi> یا جلوگیری از کلیک تکراری پیچیده شده، این منطق به <bdi dir="ltr">Custom Hook</bdi> منتقل شده است. برای مثال <code dir="ltr">useUsersListController</code> وضعیت فهرست، حذف، <bdi dir="ltr">Toast</bdi>، <bdi dir="ltr">Navigation</bdi> و <bdi dir="ltr">Cache invalidation</bdi> را مدیریت می‌کند و <code dir="ltr">UsersListScreen</code> روی نمایش تمرکز دارد.
</p>

<p dir="rtl" align="right">
هدف این نیست که هر <bdi dir="ltr">Screen</bdi> بدون توجه به اندازه آن حتماً یک <bdi dir="ltr">Hook</bdi> داشته باشد. استخراج منطق زمانی انجام می‌شود که خوانایی، تست‌پذیری یا استفاده مجدد را بهتر کند؛ <bdi dir="ltr">Screen</bdi> ساده <bdi dir="ltr">Profile</bdi> عمداً مستقیم و کوچک باقی مانده است.
</p>

<h3 dir="rtl" align="right"><bdi dir="ltr">Data Access</bdi> و <bdi dir="ltr">API</bdi></h3>

<p dir="rtl" align="right">
<bdi dir="ltr">Data Access</bdi> شامل <bdi dir="ltr">React Query hooks</bdi>، <bdi dir="ltr">Query Key</bdi>ها، <bdi dir="ltr">Mutation</bdi>ها و <bdi dir="ltr">API Module</bdi>های یک <bdi dir="ltr">Domain</bdi> است. <bdi dir="ltr">API Module</bdi> فقط <bdi dir="ltr">Endpoint</bdi>، <bdi dir="ltr">Method</bdi>، <bdi dir="ltr">Payload</bdi> و نوع پاسخ را می‌شناسد و هیچ تصمیم نمایشی نمی‌گیرد.
</p>

<p dir="rtl" align="right">
این مرزبندی اجازه می‌دهد <bdi dir="ltr">Backend</bdi> واقعی، <bdi dir="ltr">Mock API</bdi>، سیاست <bdi dir="ltr">Cache</bdi> یا کتابخانه انتقال <bdi dir="ltr">HTTP</bdi> بدون بازنویسی <bdi dir="ltr">Screen</bdi>ها تغییر کند.
</p>

<h3 dir="rtl" align="right"><bdi dir="ltr">Domain</bdi></h3>

<p dir="rtl" align="right">
<code dir="ltr">users-domain</code> شامل مدل‌های <code dir="ltr">User</code>، <code dir="ltr">UserRole</code> و ورودی‌های مربوط به کاربر است. این لایه به <bdi dir="ltr">React</bdi>، <bdi dir="ltr">Next.js</bdi>، <bdi dir="ltr">MUI</bdi> یا <bdi dir="ltr">React Query</bdi> وابسته نیست. مستقل‌بودن <bdi dir="ltr">Domain</bdi> از <bdi dir="ltr">Framework</bdi> از انتشار وابستگی‌های <bdi dir="ltr">UI</bdi> و <bdi dir="ltr">Data Fetching</bdi> به مدل‌های اصلی جلوگیری می‌کند.
</p>

<h3 dir="rtl" align="right"><bdi dir="ltr">Public API</bdi></h3>

<p dir="rtl" align="right">
هر <bdi dir="ltr">Library</bdi> یک <code dir="ltr">src/index.ts</code> دارد. مصرف‌کننده‌ها از <bdi dir="ltr">Alias</bdi>هایی مانند موارد زیر استفاده می‌کنند:
</p>

```ts
import { UsersListScreen } from "@saas/admin/users/feature";
import { useUser } from "@saas/users/data-access";
```

<p dir="rtl" align="right">
فایل‌های داخلی <bdi dir="ltr">Feature</bdi> مستقیماً <bdi dir="ltr">Deep Import</bdi> نمی‌شوند. <bdi dir="ltr">Public API</bdi> سطح قابل پشتیبانی <bdi dir="ltr">Library</bdi> را مشخص می‌کند، <bdi dir="ltr">Refactor</bdi> داخلی را کم‌هزینه‌تر می‌سازد و از وابستگی به جزئیات پیاده‌سازی جلوگیری می‌کند.
</p>

## تصمیم متفاوت برای Admin و Profile

اندازه، نرخ رشد و مدل مالکیت دو محصول یکسان فرض نشده است؛ به همین دلیل Granularity پروژه‌های Nx در آن‌ها عمداً متفاوت است.

<h3 dir="rtl" align="right"><bdi dir="ltr">Profile</bdi></h3>

<p dir="rtl" align="right">
<bdi dir="ltr">Profile</bdi> فعلاً یک قابلیت کوچک و منسجم دارد و فرض شده در آینده یک تیم مالک کل این محصول باشد. <bdi dir="ltr">Feature</bdi> پروفایل در مسیر زیر قرار گرفته است:
</p>

```text
apps/profile/src/features/profile/profile-screen.tsx
```

تبدیل این Feature کوچک به یک Nx Library مستقل، در حال حاضر مزیت مرزبندی تیمی قابل توجهی ایجاد نمی‌کند و فقط Node، تنظیمات و مسیر دیگری به Project Graph اضافه می‌کند. نزدیک‌بودن Feature به اپ، پیدا کردن کد و تغییرات یک تیم واحد را ساده نگه می‌دارد.

### Admin

<p dir="rtl" align="right">
محصول <bdi dir="ltr">Admin</bdi> بزرگ‌تر و دارای قابلیت‌های بیشتری فرض شده و احتمال دارد در آینده چند تیم به‌صورت هم‌زمان روی <bdi dir="ltr">User Management</bdi>، <bdi dir="ltr">Dashboard</bdi> و قابلیت‌های جدید کار کنند. این فرض دربارهٔ رشد کل محصول است؛ صفحهٔ فعلی <bdi dir="ltr">Dashboard</bdi> به‌خودی‌خود بزرگ یا پیچیده نیست. به همین دلیل قابلیت‌های <bdi dir="ltr">Admin</bdi> در <bdi dir="ltr">libs/admin</bdi> مرز مستقل دارند، در حالی که قابلیت کوچک <bdi dir="ltr">Profile</bdi> داخل اپ خودش باقی مانده است. تبدیل قابلیت‌های <bdi dir="ltr">Admin</bdi> به <bdi dir="ltr">Library</bdi>های <bdi dir="ltr">Nx</bdi> کمک می‌کند تا:
</p>

- مرز مالکیت هر Feature روشن باشد؛
- وابستگی‌های غیرمجاز با Tag و ESLint متوقف شوند؛
- Nx بتواند تغییرات اثرپذیر را دقیق‌تر تشخیص دهد؛
- Cache و اجرای Taskها با Granularity مناسب انجام شود؛
- تیم‌ها بتوانند Featureها را با Public API مستقل توسعه دهند.

این تفاوت یک استثنای تصادفی نیست؛ سطح جداسازی بر اساس هزینه واقعی هماهنگی تیم‌ها انتخاب شده است. اگر Profile در آینده چند Feature مستقل یا چند تیم مالک پیدا کند، می‌توان ساختار آن را بدون تغییر Routeهای بیرونی به شکل `libs/profile/<feature>` توسعه داد.

### دلیل قرارگیری Users در libs

<p dir="rtl" align="right">
قرارگیری <bdi dir="ltr">users</bdi> در <code dir="ltr">libs/users</code> به استفادهٔ مشترک از مدل‌ها و دسترسی به دادهٔ کاربران مربوط است. رابط مدیریت کاربران مخصوص <bdi dir="ltr">Admin</bdi> در <code dir="ltr">libs/admin/users/feature</code> قرار دارد، اما قراردادهای دامنه در <code dir="ltr">libs/users/domain</code> و منطق دسترسی به داده در <code dir="ltr">libs/users/data-access</code> نگه‌داری می‌شوند. هم صفحات مدیریت کاربران و هم صفحهٔ <bdi dir="ltr">Profile</bdi> از این لایهٔ داده استفاده می‌کنند؛ برای نمونه هر دو برای دریافت جزئیات کاربر از <code dir="ltr">useUser</code> استفاده می‌کنند.
</p>

<p dir="rtl" align="right">
این جداسازی برای سناریوی چندمحصولی تسک مناسب است: قراردادهای کاربر، درخواست‌های <bdi dir="ltr">API</bdi> و کلیدهای <bdi dir="ltr">Query</bdi> تکرار نمی‌شوند و <bdi dir="ltr">Profile</bdi> برای دسترسی به دادهٔ کاربر به قابلیت اختصاصی <bdi dir="ltr">Admin</bdi> وابسته نمی‌شود. در مقابل، داده‌های خلاصهٔ <bdi dir="ltr">Dashboard</bdi> مخصوص <bdi dir="ltr">Admin</bdi> هستند؛ بنابراین <code dir="ltr">libs/admin/dashboard/data-access</code> کنار قابلیت آن قرار گرفته است. معیار محل قرارگیری کد، مصرف‌کننده‌ها و مسئولیت آن است؛ یکسان‌بودن ظاهری همهٔ پوشه‌ها هدف نیست.
</p>

## مدیریت API و Server State

تمام عملیات Server State از یک مسیر ثابت عبور می‌کنند:

```mermaid
flowchart LR
  Page[Next.js Page] --> Screen
  Screen --> Controller[Controller Hook]
  Controller --> Query[React Query Hook]
  Query --> API[API Module]
  API --> HTTP[Shared HTTP Client]
  HTTP --> Target[Real Backend / MSW]
```

<p dir="rtl" align="right">
<bdi dir="ltr">React Query</bdi> و <code dir="ltr">fetch</code> نقش یکسان ندارند. <bdi dir="ltr">React Query</bdi> چرخه <bdi dir="ltr">Server State</bdi> شامل <bdi dir="ltr">Cache</bdi>، <bdi dir="ltr">Loading</bdi>، <bdi dir="ltr">Error</bdi>، <bdi dir="ltr">Retry</bdi>، <bdi dir="ltr">Cancellation</bdi> و <bdi dir="ltr">Invalidation</bdi> را مدیریت می‌کند. <code dir="ltr">fetch</code> ابزار انتقال <bdi dir="ltr">HTTP</bdi> است و فقط داخل <code dir="ltr">shared-http-client</code> استفاده می‌شود.
</p>

<p dir="rtl" align="right">
<bdi dir="ltr">HTTP Client</bdi> مشترک وظایف زیر را متمرکز می‌کند:
</p>

<ul dir="rtl" align="right">
  <li><bdi dir="ltr">Serialize</bdi> کردن <bdi dir="ltr">JSON</bdi> و تنظیم <bdi dir="ltr">Header</bdi>ها</li>
  <li><bdi dir="ltr">Parse</bdi> کردن پاسخ</li>
  <li>تبدیل پاسخ ناموفق به <code dir="ltr">HttpError</code> دارای <bdi dir="ltr">Status</bdi> و <bdi dir="ltr">Body</bdi></li>
  <li>فراهم‌کردن متدهای یکسان <bdi dir="ltr"><code>get</code>, <code>post</code>, <code>put</code>, <code>patch</code>, <code>delete</code></bdi></li>
</ul>

<p dir="rtl" align="right">
<bdi dir="ltr">ESLint</bdi> استفاده مستقیم از <code dir="ltr">fetch</code> را در <code dir="ltr">apps</code> و سایر <code dir="ltr">libs</code> ممنوع می‌کند تا این قرارداد در طول زمان شکسته نشود.
</p>

<p dir="rtl" align="right">
برای <bdi dir="ltr">Query</bdi>های خواندنی، <code dir="ltr">AbortSignal</code> به <bdi dir="ltr">HTTP Client</bdi> منتقل می‌شود؛ بنابراین <bdi dir="ltr">React Query</bdi> می‌تواند <bdi dir="ltr">Request</bdi> بلااستفاده را لغو کند. پس از <bdi dir="ltr">Mutation</bdi> نیز <bdi dir="ltr">Query</bdi>های مرتبط <bdi dir="ltr">Invalid</bdi> می‌شوند تا <bdi dir="ltr">UI</bdi> با داده سرور همگام بماند.
</p>

## احراز هویت و Protected Routes

<p dir="rtl" align="right">
<bdi dir="ltr">Authentication</bdi> در <bdi dir="ltr">Library</bdi> مشترک <code dir="ltr">auth</code> قرار دارد، چون هر دو محصول به <bdi dir="ltr">Login</bdi>، <bdi dir="ltr">Logout</bdi>، بازیابی <bdi dir="ltr">Session</bdi> و محافظت <bdi dir="ltr">Route</bdi> نیاز دارند.
</p>

<ul dir="rtl" align="right">
  <li><bdi dir="ltr">Zustand</bdi> فقط وضعیت <bdi dir="ltr">Client</bdi> شامل <bdi dir="ltr">User</bdi>، <bdi dir="ltr">Token</bdi> و <bdi dir="ltr">Hydration</bdi> را نگه می‌دارد.</li>
  <li><bdi dir="ltr">React Query</bdi> اعتبار <bdi dir="ltr">Session</bdi> را از <code dir="ltr">/api/auth/me</code> بررسی می‌کند.</li>
  <li><code dir="ltr">AuthProvider</code> وضعیت <bdi dir="ltr">Persist</bdi>شده و <bdi dir="ltr">Session</bdi> سمت سرور را هماهنگ می‌کند.</li>
  <li><bdi dir="ltr">Login</bdi> و <bdi dir="ltr">Logout</bdi> به‌صورت <bdi dir="ltr">Mutation</bdi> پیاده شده‌اند.</li>
  <li>هنگام تغییر حساب یا <bdi dir="ltr">Logout</bdi>، <bdi dir="ltr">Query</bdi>های فعال لغو و <bdi dir="ltr">Cache</bdi> پاک می‌شود تا داده کاربر قبلی به کاربر بعدی نشت نکند.</li>
  <li>پاسخ <code dir="ltr">401</code> یا <code dir="ltr">403</code> <bdi dir="ltr">Session</bdi> را نامعتبر می‌کند؛ خطای موقت شبکه به‌عنوان <bdi dir="ltr">Logout</bdi> تفسیر نمی‌شود و امکان <bdi dir="ltr">Retry</bdi> دارد.</li>
</ul>

<p dir="rtl" align="right">
<code dir="ltr">ProtectedRoute</code> در <bdi dir="ltr">Layout</bdi> گروه <code dir="ltr">(protected)</code> هر اپ قرار گرفته است. در نتیجه لازم نیست هر <bdi dir="ltr">Page</bdi> دوباره <bdi dir="ltr">Guard</bdi> را تعریف کند و هیچ <bdi dir="ltr">Route</bdi> جدیدی در این گروه به‌صورت اتفاقی بدون محافظ باقی نمی‌ماند. <bdi dir="ltr">Admin</bdi> علاوه بر ورود معتبر، نقش <code dir="ltr">admin</code> را نیز کنترل می‌کند.
</p>

<p dir="rtl" align="right">
<bdi dir="ltr">Mock</bdi> فعلی <bdi dir="ltr">Token</bdi> را در <bdi dir="ltr">Storage</bdi> مرورگر نگه می‌دارد. در <bdi dir="ltr">Backend</bdi> واقعی، استفاده از <bdi dir="ltr">Cookie</bdi> امن <code dir="ltr">HttpOnly</code> می‌تواند خطر دسترسی <bdi dir="ltr">JavaScript</bdi> به <bdi dir="ltr">Token</bdi> را کاهش دهد و باید همراه سیاست <bdi dir="ltr">CSRF</bdi> مناسب طراحی شود.
</p>

## مدیریت Loading و Error

<p dir="rtl" align="right">
<bdi dir="ltr">Loading</bdi> و <bdi dir="ltr">Error</bdi> بخشی از قرارداد هر عملیات <bdi dir="ltr">Async</bdi> در نظر گرفته شده‌اند:
</p>

<ul dir="rtl" align="right">
  <li>بارگذاری اولیه صفحه با <code dir="ltr">PageLoading</code> نمایش داده می‌شود.</li>
  <li>خطای <bdi dir="ltr">Query</bdi> با <code dir="ltr">PageError</code> و امکان <bdi dir="ltr">Retry</bdi> نمایش داده می‌شود.</li>
  <li><bdi dir="ltr">Loading</bdi> مربوط به بازیابی <bdi dir="ltr">Session</bdi> قبل از نمایش <bdi dir="ltr">Route</bdi> محافظت‌شده کل صفحه را می‌پوشاند.</li>
  <li>دکمه‌های <bdi dir="ltr">Login</bdi>، <bdi dir="ltr">Logout</bdi>، <bdi dir="ltr">Create</bdi>، <bdi dir="ltr">Edit</bdi> و <bdi dir="ltr">Delete</bdi> هنگام <bdi dir="ltr">Mutation</bdi> وضعیت <bdi dir="ltr">Loading</bdi> دارند و غیرفعال می‌شوند.</li>
  <li>در عملیات حساس به کلیک تکراری، علاوه بر <code dir="ltr">isPending</code> از <bdi dir="ltr">Lock</bdi> هم استفاده شده تا فاصله کوتاه قبل از <bdi dir="ltr">Render</bdi> بعدی باعث ارسال <bdi dir="ltr">Request</bdi> دوم نشود.</li>
  <li>موفقیت و خطای <bdi dir="ltr">Mutation</bdi>ها با <bdi dir="ltr">Toast</bdi> فارسی اعلام می‌شود.</li>
  <li>شکست راه‌اندازی <bdi dir="ltr">Mock API</bdi> به‌جای صفحه خالی با پیام مشخص نمایش داده می‌شود.</li>
</ul>

<p dir="rtl" align="right">
سیاست عمومی <bdi dir="ltr">React Query</bdi> در <code dir="ltr">shared-app-runtime</code> متمرکز است: خطاهای <code dir="ltr">4xx</code> دوباره امتحان نمی‌شوند، خطاهای موقت <bdi dir="ltr">Query</bdi> حداکثر یک بار <bdi dir="ltr">Retry</bdi> می‌شوند و <bdi dir="ltr">Mutation</bdi>ها <bdi dir="ltr">Retry</bdi> خودکار ندارند تا عملیات تغییردهنده ناخواسته تکرار نشوند.
</p>

## کنترل کیفیت

```bash
# TypeScript هر دو اپ
npm run typecheck

# ESLint و Nx module boundaries
npm run lint

# تست‌های واحد
npm test

# کنترل قالب کد
npm run format:check

# Build مستقل محصولات
npm run build:admin
npm run build:profile
```

تست‌های فعلی قرارداد HTTP Client و API، Header احراز هویت، Query Keyها، سیاست Retry Session و Schemaهای Validation را پوشش می‌دهند. Build مستقل هر دو اپ نیز تضمین می‌کند مرزهای بسته‌بندی و Aliasهای Libraryها در Production قابل Resolve هستند.

## جمع‌بندی تصمیم معماری

ساختار پروژه تلاش می‌کند بین دو هزینه تعادل برقرار کند: جلوگیری از درهم‌تنیدگی چند محصول و پرهیز از تبدیل هر بخش کوچک به یک Library مستقل. کد مشترک و Featureهای بزرگ Admin مرز Nx دارند؛ Feature کوچک و تک‌تیمی Profile نزدیک اپ باقی مانده است. با این مدل، ساختار امروز ساده می‌ماند و مسیر رشد به چند محصول، چند Feature و چند تیم نیز از قبل مشخص و قابل اعمال است.
