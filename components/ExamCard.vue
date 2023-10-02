<template>
  <div class="flex flex-col justify-between px-4 py-2 bg-white border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-between items-center">
      <h5 class=" mb-2 text-2xl font-bold tracking-tight capitalize text-gray-900 dark:text-white">{{ exam.title }}</h5>
      <Button button-type="danger" v-if="role == 'teacher'" class="!p-1" @click="$emit('deleteExam', exam.id)">Delete</Button>
    </div>
    <div class="flex justify-between my-2">
      <div>
        <p class=" font-semibold">Teacher:</p>
        <span v-if="user.role == 'student'" class="text-indigo-600 ">{{ exam.teacher_name }}</span>
        <span v-else class="text-indigo-600">{{ user.full_name }}</span>
        <p class=" font-semibold">Subject:</p>
        <span>{{ exam.subject }}</span>
      </div>
      <div class="flex flex-col text-sm">
        <div class="flex flex-col">
          <p class=" font-semibold">Duration:</p>
          <p class="text-xs">{{ exam.duration }} Minutes</p>
        </div>
        <div class="flex flex-col">
          <p class=" font-semibold">Start time:</p>
          <p class=" text-xs">{{ new Date(exam.start_time).toLocaleString(['en-US'], {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }) }}</p>
        </div>
        <div class="flex flex-col">
          <p class=" font-semibold">End time:</p>
          <p class="text-xs">{{ exam.end_time ? new Date(exam.end_time).toLocaleString(['en-US'], {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }) : "No end time" }}</p>
        </div>
      </div>
    </div>
    <p class="mb-3 font-normal line-clamp-3 hover:line-clamp-none">
      {{ exam.description }}
    </p>
    <div class="grid grid-cols-1 gap-2" v-if="role == 'student'">
      <Button v-if="exam.status == 'not_taken'" :to="`/student/exams/${exam.id}`">Start Exam</Button>
      <Button v-if="(exam.status == 'taken') && exam.show_result" button-type="secondary" :to="`/student/exams/${exam.id}/result`">
        Show Results
      </Button>
      <Button v-else-if="(exam.status == 'taken') && !exam.show_result" :disabled="true">
        Exam Taken
      </Button>
      <Button v-else-if="exam.status == 'in_progress'" :to="`/student/exams/${exam.id}`">
        Continue Exam
      </Button>
      <Button v-else-if="(exam.status == 'calculating_total_score') && exam.show_result" :disabled="true">
        Result Calculating
      </Button>

    </div>
    <div class="grid grid-cols-1 gap-2" v-if="role == 'teacher'">
      <Button :to="`/teacher/exams/${exam.id}`">Show Exam</Button>
      <Button :to="`/teacher/exams/${exam.id}/edit`">Edit Exam</Button>
      <Button :to="`/teacher/exams/${exam.id}/students`">Show Results</Button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  exam: Object,
  role: String,
})
const user = useAuthStore().user
</script>
