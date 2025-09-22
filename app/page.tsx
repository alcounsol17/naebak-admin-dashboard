'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  ChartBarIcon, 
  UsersIcon, 
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  StarIcon,
  NewspaperIcon,
  CogIcon,
  EyeIcon,
  BellIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

// مكونات الإحصائيات
interface StatCardProps {
  title: string
  value: string | number
  change: string
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: React.ReactNode
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}

const StatCard = ({ title, value, change, changeType, icon, color }: StatCardProps) => {
  const colorClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500', 
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  }

  const changeIcon = changeType === 'increase' ? 
    <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" /> :
    changeType === 'decrease' ?
    <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" /> :
    <div className="w-4 h-4" />

  return (
    <div className="naebak-card">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-3 rounded-lg ${colorClasses[color]} text-white`}>
          {icon}
        </div>
        <div className="mr-4 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-1">
            {changeIcon}
            <span className={`text-sm mr-1 ${
              changeType === 'increase' ? 'text-green-600' : 
              changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {change}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// مكون الرسم البياني المبسط
const SimpleChart = () => {
  return (
    <div className="naebak-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات الزوار</h3>
      <div className="h-64 flex items-end justify-between space-x-2">
        {[65, 45, 78, 52, 89, 67, 43, 76, 58, 82, 71, 94].map((height, index) => (
          <div
            key={index}
            className="bg-primary-500 rounded-t-sm flex-1 transition-all duration-300 hover:bg-primary-600"
            style={{ height: `${height}%` }}
            title={`اليوم ${index + 1}: ${height}%`}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>يناير</span>
        <span>ديسمبر</span>
      </div>
    </div>
  )
}

// مكون الأنشطة الأخيرة
const RecentActivity = () => {
  const activities = [
    { id: 1, type: 'complaint', message: 'شكوى جديدة من أحمد محمد', time: 'منذ 5 دقائق', status: 'new' },
    { id: 2, type: 'rating', message: 'تقييم جديد للنائب سارة أحمد', time: 'منذ 15 دقيقة', status: 'completed' },
    { id: 3, type: 'message', message: 'رسالة جديدة بين مواطن ونائب', time: 'منذ 30 دقيقة', status: 'pending' },
    { id: 4, type: 'news', message: 'تم نشر خبر جديد في الشريط الإخباري', time: 'منذ ساعة', status: 'completed' },
    { id: 5, type: 'user', message: 'تسجيل مستخدم جديد', time: 'منذ ساعتين', status: 'completed' },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'complaint': return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
      case 'rating': return <StarIcon className="w-5 h-5 text-yellow-500" />
      case 'message': return <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-500" />
      case 'news': return <NewspaperIcon className="w-5 h-5 text-green-500" />
      case 'user': return <UsersIcon className="w-5 h-5 text-purple-500" />
      default: return <BellIcon className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon className="w-4 h-4 text-green-500" />
      case 'pending': return <ClockIcon className="w-4 h-4 text-yellow-500" />
      case 'new': return <XCircleIcon className="w-4 h-4 text-red-500" />
      default: return null
    }
  }

  return (
    <div className="naebak-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">الأنشطة الأخيرة</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.message}</p>
              <div className="flex items-center mt-1">
                <p className="text-xs text-gray-500">{activity.time}</p>
                <div className="mr-2">
                  {getStatusIcon(activity.status)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// الصفحة الرئيسية
export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* الهيدر */}
      <header className="naebak-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src="/images/logo-naebak-green.png"
                alt="نائبك.كوم"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <h1 className="mr-4 text-2xl font-bold text-gray-900">لوحة التحكم</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {currentTime.toLocaleString('ar-EG', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <button className="naebak-btn-primary">
                <CogIcon className="w-5 h-5 ml-2" />
                الإعدادات
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* بنر الترحيب */}
        <div className="naebak-gradient rounded-naebak p-6 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">مرحباً بك في لوحة التحكم</h2>
          <p className="text-lg opacity-90">إدارة شاملة لجميع جوانب منصة نائبك.كوم</p>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="إجمالي الشكاوى"
            value="1,247"
            change="+12% من الشهر الماضي"
            changeType="increase"
            icon={<ExclamationTriangleIcon className="w-6 h-6" />}
            color="error"
          />
          <StatCard
            title="المستخدمين النشطين"
            value="8,392"
            change="+8% من الشهر الماضي"
            changeType="increase"
            icon={<UsersIcon className="w-6 h-6" />}
            color="primary"
          />
          <StatCard
            title="الرسائل اليوم"
            value="156"
            change="-3% من أمس"
            changeType="decrease"
            icon={<ChatBubbleLeftRightIcon className="w-6 h-6" />}
            color="secondary"
          />
          <StatCard
            title="متوسط التقييمات"
            value="4.7"
            change="ثابت"
            changeType="neutral"
            icon={<StarIcon className="w-6 h-6" />}
            color="warning"
          />
        </div>

        {/* الرسوم البيانية والأنشطة */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SimpleChart />
          <RecentActivity />
        </div>

        {/* إحصائيات إضافية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="naebak-card text-center">
            <EyeIcon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">زوار اليوم</h3>
            <p className="text-3xl font-bold text-primary-500">2,847</p>
            <p className="text-sm text-gray-600 mt-1">+15% من أمس</p>
          </div>
          
          <div className="naebak-card text-center">
            <NewspaperIcon className="w-12 h-12 text-secondary-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">الأخبار المنشورة</h3>
            <p className="text-3xl font-bold text-secondary-500">23</p>
            <p className="text-sm text-gray-600 mt-1">هذا الأسبوع</p>
          </div>
          
          <div className="naebak-card text-center">
            <ChartBarIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">معدل الاستجابة</h3>
            <p className="text-3xl font-bold text-green-500">94%</p>
            <p className="text-sm text-gray-600 mt-1">للشكاوى المحلولة</p>
          </div>
        </div>
      </main>

      {/* الفوتر */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2024 نائبك.كوم. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-gray-600 hover:text-primary-500">الدعم الفني</a>
              <a href="#" className="text-sm text-gray-600 hover:text-primary-500">التوثيق</a>
              <a href="#" className="text-sm text-gray-600 hover:text-primary-500">الإعدادات</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
