import ListItem from '../components/ListItem';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import AddButton from '../components/AddButton';


export async function loader() {
  const notes = await axios.get('http://127.0.0.1:8000/api/notes/');
  return notes.data;
}

const NotesListPage = () => {

  const notes = useLoaderData();

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes?.length}</p>
      </div>
      <div className='notes-list'>
        {notes?.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
