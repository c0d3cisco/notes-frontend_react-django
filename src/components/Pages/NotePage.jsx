import { useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left.svg'
import axios from 'axios';
import { useContext } from 'react';
import { RefetchContext } from '../../context/RefetchContext';


export async function loader({ params }, id, setFunction) {
	const note = await axios.get(`http://127.0.0.1:8000/api/notes/` + (params.id || id));
	return note.data;
}

const NotePage = () => {

	const [note, setNotes] = useState(null)
	const { toggleRefetch } = useContext(RefetchContext);


	let noteLoad = useLoaderData();
	useEffect(() => {
		setNotes(noteLoad)
	},[noteLoad])
	
	
	const navigate = useNavigate();
	const { id } = useParams();
	const handleSubmit = async () => {
		try {
      await axios.put(`http://127.0.0.1:8000/api/notes/${id}/update/`, note);
      toggleRefetch(prev => !prev);  // Toggle the refetch signal
      navigate('/');
    } catch (error) {
      console.log('error fetching data!!!!!', error)
    }
  };

	return (
		<div className='note'>
			<div className='note-header'>
						<h3 className='note-title'><ArrowLeft onClick={handleSubmit} /> {note?.title}</h3>
			</div>
			<textarea defaultValue={note?.body} onChange={(e)=>setNotes({...note, body: e.target.value})}></textarea>
		</div>
	)
}

export default NotePage