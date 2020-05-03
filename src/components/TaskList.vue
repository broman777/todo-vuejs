<template>
  <div class="task-list">
    <div class="top flexbox">
      <h1 class="heading">Hello, here is your task list:</h1>
      <div class="actions">
        <router-link :to="{ name: 'TaskEdit', params: { id: 'new' } }" class="actions__link">Add task</router-link>
      </div>
    </div>
    <div class="item" v-for="(task, taskId) in taskList" :key="(taskId)">
      <div class="item__body flexbox">
        <h2 class="item__title">{{ task.name }}</h2>
        <div class="actions">
          <router-link :to="{ name: 'TaskEdit', params: { id: taskId } }" class="actions__link">Edit</router-link>
          <button @click="showModal(taskId)" class="actions__link" >Remove</button>
        </div>
      </div>
      <ul class="item__list">
        <li v-for="(todo, todoId) in task.todos" :key="todoId" :class="{done: todo.done}">{{ todo.name }}</li>
      </ul>
    </div>
    <modal
      class="modal"
      :is-visible="modalVisible"
      @closeModal="toggleModal()"
    >
      <p class="heading">You want to delete task?</p>
      <div class="actions centered">
        <button class="actions__link" @click="remove">Remove</button>
        <button class="actions__link" @click="toggleModal()">Cancel</button>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TaskList',
  data () {
    return {
      currentTaskId: null
    }
  },
  computed: {
    ...mapState(['taskList', 'modalVisible'])
  },
  methods: {
    ...mapActions([
      'removeTask',
      'toggleModal'
    ]),
    remove (id) {
      this.removeTask(this.currentTaskId)
      this.toggleModal()
    },
    showModal (id) {
      this.currentTaskId = id
      this.toggleModal()
    }
  }
}
</script>

<style lang="scss">
  .item {
    border: 1px solid #000;
    margin: 10px 0;
    padding: 10px;

    &__list {
      list-style: inside;
    }
  }
</style>
