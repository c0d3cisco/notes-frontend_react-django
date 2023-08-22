import ListItem from '../ListItem';
import { Outlet, useLoaderData, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { RefetchContext } from '../../context/RefetchContext';

export async function loader() {
  console.log('loader is being activated');
  const notes = await axios.get('http://127.0.0.1:8000/api/notes/');
  return notes.data;
}

const NotesListPage = () => {
  const { refetchSignal } = useContext(RefetchContext);
  const [notes, setNotes] = useState(useLoaderData());

  const match = (/\/note\/(\d+)/).test(window.location.pathname);

  useEffect(() => {
    
    (async () => {
      if (refetchSignal) {  // Refetch if the signal is toggled
        const newNotes = await loader();
        setNotes(newNotes);
      }
    })();
  }, [refetchSignal]);



  return (
    <div className='notes'>
      {match ? <Outlet /> :
        <>
          <div className='notes-header'>
            <h2 className='notes-title'>&#9782; Notes</h2>
            <p className='notes-count'>{notes?.length}</p>
          </div>
          <div className='notes-list'>
            {notes?.map((note, index) => (
              <ListItem key={index} note={note} />
            ))}
          </div>
        </>}
    </div>
  );
};

export default NotesListPage;
