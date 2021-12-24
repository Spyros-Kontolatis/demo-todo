import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/Home.module.css'
import Api from "../core/api"
import ToDoListTable from '../components/ToDoListTable'

export default class Home extends React.Component {

  static async getInitialProps() {

    const api = new Api()

    let todos = await api.fetchJson("/todo/get")

    return { todos }
  }

  constructor(props){
    super(props)
    this.state={
      todos: props.todos
    }
  }

  async click() {
    const api = new Api()

    let newTodo = await api.fetchJson("/todo/add", "POST", { text: "test" });
    this.setState({
      todos: [...this.state.todos, newTodo]
    })
  }
  async delete(id){
    const api = new Api()
    let newTodos = await api.fetchJson("/todo/remove", "POST", { id: id })
    this.setState({
      todos:newTodos
    })
  }

  render() {
    return (
      <div>
        <Head>
          <title>Demo todo list</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <div className={styles.welcome}>
          <h1>TODO LIST</h1>
        </div>
        <ToDoListTable 
          headers={['ID','Text','Actions']} 
          values={this.state.todos}
          fnDeleteValue={(id)=>{
            this.delete.bind(this); 
            this.delete(id);
          }}
        />
        <button onClick={this.click.bind(this)} className={styles.addBtn}>Add new record</button>
        
      </div>
    )
  }

}
