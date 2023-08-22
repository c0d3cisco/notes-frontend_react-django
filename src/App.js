import './App.css';
import Header from './components/Header';
import NotesListPage, { loader as notesListLoader } from './components/Pages/NoteListPage';
import NotePage, { loader as noteLoader } from './components/Pages/NotePage';
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { RefetchProvider } from './context/RefetchContext';


const router = createBrowserRouter([
  {
    path: "/",
    element: <NotesListPage />,
    loader: notesListLoader,
    children: [{
      path: "/note/:id",
      element: <NotePage />,
      loader: noteLoader,
    },],
  },
]);


function App() {
  return (
    <RefetchProvider>
      <div className="container dark">
        <div className="app">
          <Header />
          <RouterProvider router={router} />
        </div>
      </div>
    </RefetchProvider>

  );
}

export default App;
