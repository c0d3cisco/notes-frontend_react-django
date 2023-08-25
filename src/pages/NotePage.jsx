import { useState } from 'react'
import { Form, useLoaderData, redirect } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import axios from 'axios';

export async function loader({ params }, id) {
	const note = await axios.get(`http://127.0.0.1:8000/api/notes/` + (params.id || id));
	return note.data;
}

// https://stackoverflow.com/questions/75407487/how-to-use-multiple-actions-in-a-single-route-in-react-router-dom
export async function dynamicActionHandler({ request, params }) {
	const formData = await request.formData();
	const entries = Object.fromEntries(formData);
	const key = entries['form-id']; // Use the entries to get the form id

	switch (key) {
		case 'update form':
			console.log('trying to update');
			const updates = Object.fromEntries(formData);
			console.log('updates', updates);  // for debugging
			await axios.put(`http://127.0.0.1:8000/api/notes/${params.id}/update/`, updates);
			break;
		case 'delete form':
			console.log('trying to delete'); // for debugging
			await axios.delete(`http://127.0.0.1:8000/api/notes/${params.id}/delete/`); // added await
			break;
		case 'create form':
			console.log('trying to create'); // for debugging
			const creates = Object.fromEntries(formData);
			console.log('creates', creates);  // for debugging
			await axios.post(`http://127.0.0.1:8000/api/notes/create/`, creates);
			break;
		default:
			break;
	}
	return redirect(`/`);
}

const NotePage = () => {

	const [note, setNotes] = useState(useLoaderData())
	const [actionType, setActionType] = useState('');

	let match = '/note/create' ===	window.location.pathname;

	return (
		<div className='note'>
			<Form method='post'>
				<div className='note-header'>
					<button
						type="submit"  // changed to type button so it doesn't submit
						onClick={() => {
							if(/^[ ]+$/.test(note?.body) || !note?.body){
								if(match) redirect('/')
								if(!match) setActionType('delete form')
							} else {
								if(match) setActionType('create form')
								if(!match) setActionType('update form')
							}
						}}
					>
						<h3 className='note-title'>
							<ArrowLeft />
						</h3>
					</button>
					<button
						type="submit"  // changed to type button
						onClick={() => match ? redirect('/') : setActionType('delete form')}  // set actionType
					>
						{match ? 'X' : 'Delete'}
					</button>
					<input
						hidden
						name="form-id"
						defaultValue={actionType}
					/>
				</div>
				<textarea
					name="body"
					defaultValue={note?.body}
					onChange={(e) =>
						setNotes({ ...note, body: e.target.value })
					}
				/>
			</Form>
		</div>
	)
}

export default NotePage