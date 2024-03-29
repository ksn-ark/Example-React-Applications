import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import noteService from '../services/notes'

const Note = ({ note }) => {
  const dispatch = useDispatch()
  const handleClick = async () => {
    const toggledNote = { ...note, important: !note.important }
    const updatedNote = await noteService.updateExisting(toggledNote)
    dispatch(toggleImportanceOf(updatedNote))
  }
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important)
  })

  return (
    <ul>
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </ul>
  )
}

export default Notes
