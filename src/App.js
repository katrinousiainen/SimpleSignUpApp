import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ContentEditable from 'react-contenteditable'
import { Table, Button } from 'semantic-ui-react'
import './App.css';
import { FaTrash } from 'react-icons/fa';


class App extends Component {
  initialState = {
    people: [
      { id: 1, name: 'George Clooney', email: 'george.clooney@hollywood.com', phone: '0405859403' },
      { id: 2, name: 'George Clooney', email: 'george.clooney@hollywood.com', phone: '0405859403' },
      { id: 3, name: 'George Clooney', email: 'george.clooney@hollywood.com', phone: '0405859403' },
      { id: 4, name: 'George Clooney', email: 'george.clooney@hollywood.com', phone: '0405859403' },
      { id: 5, name: 'George Clooney', email: 'george.clooney@hollywood.com', phone: '0405859403' },
      { id: 6, name: 'George Clooney', email: 'george.clooney@hollywood.com', phone: '0405859403' },
      { id: 7, name: 'George Clooney', email: 'george.clooney@hollywood.com', phone: '0405859403' },
      { id: 8, name: 'George Clooney', email: 'george.clooney@hollywood.com', phone: '0405859403' },
      { id: 9, name: 'George Clooney', email: 'george.clooney@hollywood.com', phone: '0405859403' },
      { id: 10, name: 'George Clooney', email: 'george.clooney@hollywood.com', phone: '0405859403' }
    ],
    row: {
      name: '',
      email: '',
      phone: ''
    },
  }

  state = this.initialState

  addRow = () => {
    const trimSpaces = string => {
      return string
        .replace(/&nbsp;/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
    }
  
    this.setState(({ people, row }) => {
      const trimmedRow = {
        ...row,
        name: trimSpaces(row.name),
        id: people.length + 1,
      }
      return {
        people: [...people, trimmedRow],
        row: this.initialState.row,
      }
    })
  }

  
  deleteRow = id => {
    this.setState(({ people }) => ({
      people: people.filter(name => id !== name.id),
    }))
  }

  onlyPlainText = event => {
    event.preventDefault()
  
    const text = event.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  disableEmptylines = event => {
    const keyCode = event.keyCode || event.which
  
    if (keyCode === 13) {
      event.returnValue = false
      if (event.preventDefault) event.preventDefault()
    }
  }

  validateNumbersInPhone = event => {
    const keyCode = event.keyCode || event.which
    const string = String.fromCharCode(keyCode)
    const regex = /[0-9,]|\./
  
    if (!regex.test(string)) {
      event.returnValue = false
      if (event.preventDefault) event.preventDefault()
    }
  }

  handleContentEditable = event => {
    const { row } = this.state
    const {
      currentTarget: {
        dataset: { column },
      },
      target: { value },
    } = event
  
    this.setState({ row: { ...row, [column]: value } })
  }

  handleContentEditableOnUpdate = event => {
    const {
      currentTarget: {
        dataset: { row, column },
      },
      target: { value },
    } = event
  
    this.setState(({ people }) => {
      return {
        people: people.map(name => {
          return name.id === parseInt(row, 10) ? { ...name, [column]: value } : name
        }),
      }
    })
  }


  render() {
    const {
      people,
      row: { name, email, phone},
    } = this.state

    return (
      <div className="App">
        <h1 class="headline">List of participants</h1>
        <Table celled>
          <Table.Body>
          <Table.Row>
      <Table.Cell className="narrow">
          <div class="holder" id="holder" placeholder="Full name">
        <ContentEditable
          html={name}
          data-column="name"
          data-row="Full name"
          className="content-editable"
          onPaste={this.onlyPlainText}
          onKeyPress={this.disableEmptylines}
          onChange={this.handleContentEditable}
        /></div>
      </Table.Cell>

      <Table.Cell className="narrow">
      <div class="holder" placeholder="E-mail address">
        <ContentEditable
          html={email}
          data-column="email"
          className="content-editable"
          onPaste={this.onlyPlainText}
          onKeyPress={this.disableEmptylines}
          onChange={this.handleContentEditable}
        /></div>
      </Table.Cell>

      <Table.Cell className="narrow">
      <div class="holder" placeholder="Phone number">
        <ContentEditable
          html={phone}
          data-column="phone"
          className="content-editable"
          onPaste={this.onlyPlainText}
          onKeyPress={this.disableEmptylines}
          onKeyPress={this.validateNumbersInPhone}
          onChange={this.handleContentEditable}
        /></div>
      </Table.Cell>
      <Table.Cell className="narrow">
        <Button id="button"  disabled={!name || !email || !phone} onClick={this.addRow}>Add new</Button>
      </Table.Cell>
    </Table.Row>
          </Table.Body>
        </Table>

        <Table celled>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell className="headercell">Name</Table.HeaderCell>
      <Table.HeaderCell className="headercell">E-mail address</Table.HeaderCell>
      <Table.HeaderCell className="headercell">Phone number</Table.HeaderCell>
      <Table.HeaderCell className="headercell"> </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  
  <Table.Body>
    {people.map((row,i) => {
      return (
        <Table.Row key={row.id}>
          <Table.Cell className="narrow">
            <ContentEditable
            html={row.name}
            data-column="name"
            data-row={row.id}
            className="content-editable"
            onChange=
            {this.handleContentEditableOnUpdate}
            />
          </Table.Cell>

            <Table.Cell className="narrow">
            <ContentEditable
            html={row.email}
            data-column="email"
            data-row={row.id}
            className="content-editable"
            onChange=
            {this.handleContentEditableOnUpdate}
            />
            </Table.Cell>

            <Table.Cell className="narrow">
            <ContentEditable
            html={row.phone}
            data-column="phone"
            data-row={row.id}
            className="content-editable"
            onChange=
            {this.handleContentEditableOnUpdate}
            />
            </Table.Cell>
            
          <Table.Cell className="narrow">
            <Button
              onClick={() => {
                this.deleteRow(row.id)
              }}
              ><FaTrash/>
            </Button>
          </Table.Cell>
        </Table.Row>
      )
    })}
  </Table.Body>
</Table>
      </div>
    )
  }
}


export default App;


