import { UserMealForm } from '@/components/riwayatharian/UserMealForm'
import { UserMealHistory } from '@/components/riwayatharian/UserMealHistory'
import { UserMealToday } from '@/components/riwayatharian/UserMealToday'
import React from 'react'

export default function RiwayatHarianPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="space-y-6">
    <UserMealForm />
    <UserMealToday />
  </div>

  <div className="lg:col-span-2">
    <UserMealHistory />
  </div>
</div>
  )
}
