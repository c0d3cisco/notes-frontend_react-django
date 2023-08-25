import './App.css';
import Header from './components/Header';
import NotesListPage, { loader as notesListLoader } from './pages/NoteListPage';
import NotePage, { loader as noteLoader, dynamicActionHandler } from './pages/NotePage';
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NotesListPage />,
    loader: notesListLoader,
  },{
    path: "/note/:id",
    element: <NotePage />,
    loader: noteLoader,
    action: dynamicActionHandler,
  },{
    path: "/note/create",
    element: <NotePage />,
    action: dynamicActionHandler,
  },
]);


function App() {
  return (
    <div className="container dark">
      <div className="app">
        <Header />
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
