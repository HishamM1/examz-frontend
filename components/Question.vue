<template>
    <div class="border shadow p-4 rounded-lg my-6 relative" :class="{
        'bg-green-100': (question.student_answer == question.correct_answer) || question.score == question.student_score,
        'bg-red-100': (question.student_answer != question.correct_answer) && !question.is_correct && question.score != question.student_score,
    }">
        <div class="flex justify-between items-center">
            <h3 class="font-semibold">{{ index + 1 }}.</h3>
            <p class=" text-gray-500" v-if="question.similarity">Similarity:
                <span :class="{
                    'text-red-500': (Math.round(question.similarity * 100) < 60) || question.similarity == null,
                    'text-green-500': Math.round(question.similarity * 100) >= 60,
                }">{{ Math.round(question.similarity * 100) }}%
                </span>
            </p>
            <div class="border border-black rounded-lg px-2 text-sm sm:text-lg font-light">
                Score : {{ question.student_score }} / {{ question.score }}
            </div>
        </div>
        <!-- question text -->
        <p class="text-xl font-semibold my-2">{{ question.text }}</p>
        <!-- question image -->
        <img v-if="question.image" :src="question.image" alt="question image" class="my-4 w-1/2">
        <!-- mcq -->
        <div v-if="question.type == 'mcq'" class=" grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="option in question.options" :key="option.id" class="flex justify-start items-center gap-2">
                <input :id="option.id" disabled type="radio" :name="question.id"
                    :checked="+question.student_answer == option.id"
                    class="  appearance-none rounded-full border-2 w-4 h-4  bg-gray-100 border-gray-300" :class="{
                        'checked:bg-green-500': +question.correct_answer == option.id,
                        'checked:bg-red-500': +question.student_answer == option.id && +question.correct_answer != option.id,
                    }">
                <label :for="option.id" class="text-lg">{{ option.text }}</label>
                <div v-if="+question.correct_answer == option.id">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </div>
        <!-- open ended -->
        <div v-else>
            <textarea rows="4" disabled
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 disabled:bg-gray-200 "
                placeholder="Write your answer here...">{{ question.student_answer }}</textarea>
            <div v-if="!question.is_correct" class=" border border-black shadow-sm p-4 mt-4 rounded-lg">
                <p class="text-red-500" v-if="question.similarity * 100 < 60">Your answer is incorrect</p>
                <p class=" text-green-800" v-else>Your answer is close</p>
                <p class="text-sm text-gray-500">Correct answer:</p>
                <p>
                    {{ question.correct_answer }}
                </p>
            </div>
        </div>
            <div v-if="user_role == 'teacher'">
                <Button button-type="secondary" class="mt-4" @click="toggleEdit(index)">Edit score</Button>
                <div v-if="props.editForm[index]" class="flex items-center justify-start gap-2 mt-2">
                    <input type="number" v-model="new_score" min="0" :max="question.score"
                        class="border border-black rounded-lg px-2 text-lg bg-transparent font-light w-1/12">
                    <Button button-type="secondary" class="!p-1 !m-0" @click="editScore(question.id)">Save</Button>
                </div>
            </div>
    </div>
</template>

<script setup>
import { useToast } from 'tailvue'


const props = defineProps({
    question: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    editForm: {
        type: Array,
        required: false
    },
    studentId: {
        type: Number,
        required: false
    },
    examId: {
        type: Number,
        required: false
    }
})

const emit = defineEmits(['getQuestions'])

const new_score = ref(0)

const user_role = useAuthStore().user.role

const toggleEdit = (index) => {
    props.editForm[index] = !props.editForm[index]
    
    new_score.value = props.question.student_score 
    // only one edit form can be open at a time
    for (let i = 0; i < props.editForm.length; i++) {
        if (i != index) {
            props.editForm[i] = false
        }
    }
}



const editScore = (id) => {
    useApiFetch(`/api/v1/teacher/exams/${props.examId}/students/${props.studentId}/question/${id}`, {
        method: 'PUT',
        body: {
            score: new_score.value
        }
    }).then(() => {
        emit('getQuestions')        
        useToast().show({
            title: 'Success',
            message: 'Score updated successfully',
            type: 'success'
        })
    }).catch((err) => {
        console.log(err.data);
        useToast().show({
            title: 'Error',
            message: err.data.message,
            type: 'danger'
        })
    })
}
</script>