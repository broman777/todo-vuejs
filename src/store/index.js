import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    modalVisible: false,
    taskList: {}
  },
  mutations: {
    toggleModal: (state) => {
      state.modalVisible = !state.modalVisible
      console.log(`Modal toggled!`)
    },
    saveTask: (state, {id, task}) => {
      const taskId = id || Date.now()
      Vue.set(state.taskList, taskId, task)
      console.log(`Task #${taskId} saved!`)
    },
    removeTask: (state, taskId) => {
      Vue.delete(state.taskList, taskId)
      console.log(`Task #${taskId} removed!`)
    },
    addTodo: (state, taskId) => {
      const id = Date.now()
      Vue.set(state.taskList[taskId].todos, id, {
        name: '',
        done: false
      })
      console.log(`Todo #${id} added to task #${taskId}!`)
    },
    removeTodo: (state, { taskId, todoId }) => {
      Vue.delete(state.taskList[taskId].todos, todoId)
      console.log(`Todo #${todoId} from task #${taskId} removed!`)
    },
    toggleTodo: (state, { taskId, todoId }) => {
      state.taskList[taskId].todos[todoId].done = !state.taskList[taskId].todos[todoId].done
      console.log(`Todo ${state.taskList[taskId].todos[todoId].name} from task #${taskId} toggled to ${state.taskList[taskId].todos[todoId].done}`)
    }
  },
  actions: {
    toggleModal: (context, id) => {
      context.commit('toggleModal', id)
    },
    saveTask: (context, {id, task}) => {
      context.commit('saveTask', {id, task})
    },
    removeTask: (context, taskId) => {
      context.commit('removeTask', taskId)
    },
    addTodo: (context, taskId) => {
      context.commit('addTodo', taskId)
    },
    removeTodo: (context, {taskId, todoId}) => {
      context.commit('removeTodo', {taskId, todoId})
    },
    toggleTodo: (context, todo) => {
      context.commit('toggleTodo', todo)
    }
  }
})
