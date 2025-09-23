# نائبك.كوم - لوحة التحكم الاحترافية

[![Build Status](https://github.com/alcounsol17/naebak-admin-dashboard/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/alcounsol17/naebak-admin-dashboard/actions)
[![Test Coverage](https://img.shields.io/badge/coverage-90.9%25-brightgreen)](./coverage)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)](https://nextjs.org/)

لوحة التحكم الاحترافية لإدارة منصة نائبك.كوم - Professional Admin Dashboard for Naebak.com Platform

## 🌟 المميزات

- ✅ **Next.js 15** مع App Router الجديد
- ✅ **TypeScript** للأمان والموثوقية
- ✅ **Tailwind CSS** للتصميم المتجاوب
- ✅ **اختبارات شاملة** مع Jest و Testing Library
- ✅ **CI/CD متكامل** مع GitHub Actions
- ✅ **Docker** للنشر والحاويات
- ✅ **تصميم عربي RTL** محسن
- ✅ **تغطية كود 90.9%**

## 🚀 البدء السريع

### المتطلبات

- Node.js 18+ أو 20+
- npm أو yarn
- Docker (اختياري)

### التثبيت

```bash
# استنساخ المستودع
git clone https://github.com/alcounsol17/naebak-admin-dashboard.git
cd naebak-admin-dashboard

# تثبيت التبعيات
npm install

# تشغيل التطوير
npm run dev
```

### الاختبارات

```bash
# تشغيل جميع الاختبارات
npm test

# تشغيل الاختبارات مع التغطية
npm run test:coverage

# تشغيل الاختبارات في وضع المراقبة
npm run test:watch
```

### البناء والنشر

```bash
# بناء للإنتاج
npm run build

# تشغيل الإنتاج
npm start

# بناء Docker
npm run docker:build

# تشغيل Docker
npm run docker:run
```

## 📊 إحصائيات المشروع

| المقياس | القيمة |
|---------|-------|
| إجمالي الاختبارات | 47 |
| معدل النجاح | 91.5% |
| تغطية الكود | 90.9% |
| حجم البناء | 112 kB |

## 🏗️ البنية

```
naebak-admin-dashboard/
├── app/                    # صفحات التطبيق (App Router)
│   ├── layout.tsx         # التخطيط الرئيسي
│   └── page.tsx           # الصفحة الرئيسية
├── __tests__/             # ملفات الاختبارات
│   ├── components/        # اختبارات المكونات
│   ├── pages/            # اختبارات الصفحات
│   ├── utils/            # اختبارات الأدوات
│   └── integration/      # اختبارات التكامل
├── .github/workflows/     # إعدادات CI/CD
├── styles/               # ملفات التصميم
└── public/               # الملفات الثابتة
```

## 🧪 الاختبارات

المشروع يتضمن نظام اختبارات شامل:

- **اختبارات الوحدة:** للمكونات الفردية
- **اختبارات التكامل:** للتفاعل بين المكونات
- **اختبارات الصفحات:** للصفحات الكاملة
- **اختبارات الأدوات:** للوظائف المساعدة

## 🔄 CI/CD

النظام يتضمن pipeline متكامل:

1. **اختبار:** تشغيل جميع الاختبارات
2. **بناء:** بناء التطبيق للإنتاج
3. **أمان:** فحص الثغرات الأمنية
4. **نشر:** نشر تلقائي للبيئات
5. **أداء:** فحص الأداء مع Lighthouse

## 🐳 Docker

```bash
# بناء الصورة
docker build -t naebak-admin-dashboard .

# تشغيل الحاوية
docker run -p 3000:3000 naebak-admin-dashboard

# استخدام Docker Compose
docker-compose up
```

## 📝 المساهمة

1. Fork المشروع
2. إنشاء فرع للميزة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 👥 الفريق

- **Naebak Team** - التطوير الأولي - [naebak.com](https://naebak.com)

## 🔗 روابط مفيدة

- [التوثيق](./docs)
- [تقرير التطوير](./DEVELOPMENT_REPORT.md)
- [نتائج الاختبارات](./final_test_results.log)
- [الموقع الرسمي](https://naebak.com)
