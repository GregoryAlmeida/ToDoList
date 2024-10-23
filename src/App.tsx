import { FormEvent, useState } from "react"
import Input from "./Components/Input/Input"
import './App.css'

type IList = {
  id: string;
  tarefa: string;
  inicio: string;
  fim: string;
  concluido: boolean;
}

function App() {
  const [task, setTask] = useState('')
  const [list, setList] = useState<IList[]>([])
  const data = new Date()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (task.trim() != '') {
      setList([...list, {
        id: crypto.randomUUID(),
        tarefa: task,
        inicio: `${data.getDate()} / ${data.getMonth() + 1}`,
        fim: '',
        concluido: false,
      }])
      setTask('')
    }
  }

  const handler = (id: string, param: "mudar" | 'deletar') => {
    const index = list.findIndex(item => item.id === id)
    if (param === 'mudar') {
      list[index].concluido = !list[index].concluido
      list[index].fim = `${data.getDate()} / ${data.getMonth() + 1}`
    } 

    if (param === 'deletar') {
      list.splice(index, 1)
    }
    setList([...list])
  }

  return (
    <form onSubmit={handleSubmit}>
      <header><h1>Controle de Tarefas</h1></header>
      <div className="status" >
        <p style={{backgroundColor: '#2e86de'}} >Total de Tarefas: {list.length}</p>
        <p style={{backgroundColor: '#2ecc71'}}>
          Concluidas: {list.map(item => item.concluido).filter(item => item === true).length}
        </p>
        <p style={{backgroundColor: '#e74c3c'}} >
          Em espera: {list.map(item => item.concluido).filter(item => item === false).length}
        </p>
      </div>
      <section>
        <Input 
          className="main-input"
          label="Escreva sua Tarefa" 
          type="text" 
          value={task} 
          onChange={({currentTarget}) => setTask(currentTarget.value)} 
        />
        <button className="adicionar" >Adicionar</button>
      </section>
      <section>
          {list.map(({id, tarefa, inicio, fim, concluido}) => (
            <span key={id}>
              <h2>{tarefa}</h2>
              <div className="div-p">
                <p>Início: {inicio}</p>
                {concluido && <p>Fim: {fim}</p>}
              </div>

              <Input 
                label={concluido ? 'Concluido!' : 'Em espera!'} 
                checked={concluido}
                id={id}
                type="checkbox"
                onChange={() => handler(id, 'mudar')}
              />
              <button className="btnDeletar" onClick={() => handler(id, 'deletar')}>X</button>
            </span>))}
      </section>
    </form>
  )
}

export default App
