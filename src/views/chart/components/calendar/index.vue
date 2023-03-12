<template>
  <el-card class="container" :body-style="{padding: 0}">
    <el-calendar v-model="currentDate" class="calendar">
      <template #dateCell="{ data }">
        <p :class="[data.isSelected ? 'is-selected' : '', calendarItemBgClass(data.day)]">
          {{ data.day.split('-').slice(2).join('') }}
          <br />
          <span v-if="getToadyAmount(data.day) !== 0" class="amount">{{ getToadyAmount(data.day) }}</span>
        </p>
      </template>
    </el-calendar>
  </el-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getChartCalendar } from '@/api/chart'
import emitter from '@/utils/eventHub'
const currentDate = ref(new Date())
const calendarListData = ref([])
const getCalendarListData = async () => {
  const { result } = await getChartCalendar()
  calendarListData.value = result
}
getCalendarListData()
const dateAmountObj = ref({})
const getToadyAmount = (date) => {
  if (dateAmountObj.value[date]) {
    return dateAmountObj.value[date]
  }
  const todayData = calendarListData.value.find((item) => item.date === date)
  if (!todayData) {
    return 0
  }
  const todayAmount = todayData.amount
  dateAmountObj.value[date] = todayAmount
  return todayAmount
}
const calendarItemBgClass = (day) => {
  const amount = getToadyAmount(day)
  if (amount > 0) {
    return 'profit'
  } else if (amount < 0) {
    return 'loss'
  }
  return ''
}
watch(currentDate, (val) => {
  emitter.emit('calendarChange', val)
})
</script>

<style lang="scss" scoped>
.container {
  height: 443px;
  .calendar {
    :deep(.el-calendar__body) {
      padding: 0 12px 12px;
      font-size: 14px;
    }
    :deep(.el-calendar-day) {
      height: 66px !important;
      padding: 0 !important;
      p {
        height: 100%;
        padding: 8px;
      }
      .amount {
        font-size: 12px;
      }
      .profit {
        background-color: #f3fff3;
        span {
          color: #649840;
        }
      }
      .loss {
        background-color: #ffe7e7;
        span {
          color: #b65d59;
        }
      }

      .is-selected {
        background-color: #d6f2ff;
      }
    }
  }
}
</style>
