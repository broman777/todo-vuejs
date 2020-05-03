<template>
  <div class="edit">
    <div class="top flexbox">
      <h1>{{ header }}</h1>
    </div>
    <div class="form flexbox">
      <div class="form-group">
        <input type="text" v-model="task.name" @keyup.enter="updateTask" placeholder="Enter task name here">
      </div>
      <div class="actions">
        <button @click="updateTask" class="actions__link">Save</button>
        <button @click="showModal('remove')" class="actions__link">Remove</button>
        <button @click="showModal('cancel')" class="actions__link">Cancel</button>
      </div>
    </div>
    <div class="todos" v-if="id">
      <div class="flexbox">
        <h2>Todo list for task: </h2>
      </div>
      <ul>
        <li v-for="(todo, todoId) in task.todos" :key="todoId">
          <div class="form-group" :class="{done: todo.done}">
            <input type="text" v-model="todo.name" placeholder="Enter todo here">
          </div>
          <div class="actions">
            <button class="actions__link" @click="toggleTodo({taskId: id, todoId})">Toggle</button>
            <button class="actions__link" @click="removeTodo({taskId: id, todoId})">Remove</button>
          </div>
        </li>
      </ul>
      <div class="actions alone">
        <button class="actions__link" @click="addTodo(id)">Add todo</button>
      </div>
    </div>
    <modal
      class="modal"
      :is-visible="modalVisible"
      @closeModal="toggleModal()"
    >
      <p class="heading" v-if="modalType === 'remove'">You want to remove task?</p>
      <p class="heading" v-else>You reset task editing?</p>
      <div class="actions centered">
        <button v-if="modalType === 'remove'" class="actions__link" @click="remove">Remove</button>
        <button v-else class="actions__link" @click="goHome(true)">Yes</button>
        <button class="actions__link" @click="toggleModal()">Cancel</button>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TaskEdit',
  data () {
    return {
      modalType: 'remove',
      task: {
        name: '',
        todos: {}
      }
    }
  },
  methods: {
    ...mapActions([
      'removeTask',
      'saveTask',
      'addTodo',
      'toggleTodo',
      'removeTodo',
      'toggleModal'
    ]),
    goHome (hide) {
      if (hide) this.toggleModal()
      this.$router.push('/')
    },
    async remove () {
      await this.removeTask(this.id)
      this.goHome(true)
    },
    showModal (type) {
      this.modalType = type
      this.toggleModal()
    },
    async updateTask () {
      await this.saveTask({'id': this.id, 'task': this.task})
      this.goHome()
    }
  },
  mounted () {
    if (this.id) {
      for (const key in this.taskList[this.id]) {
        this.task[key] = this.taskList[this.id][key]
      }
    }
  },
  computed: {
    ...mapState([
      'taskList',
      'modalVisible'
    ]),
    id: function () {
      return (this.taskList[this.$route.params.id]) ? this.$route.params.id : undefined
    },
    header: function () {
      return (this.id) ? `Edit: ${this.task.name}` : 'Add your task'
    }
  }
}
</script>

<style lang="scss" scoped>
  .form {
    margin-bottom: 12px;
  }
  h2 {
    margin-bottom: 6px;
  }
  li {
    display: flex;
    margin-top: 12px;
    .form-group {
      width: 100%;
    }
  }
</style>
