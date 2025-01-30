import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import TableInfo from './components/TableInfo';
import { useEffect, useState } from 'react';
import { fetchProjects } from './store/projectsSlice';

const App = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.data) || [];
  const loading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  console.log(projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const totalPages = Math.ceil(projects.length / recordsPerPage);
  const displayedProjects = projects.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data!</p>;

  return (
    <div className="app">
      <h1>Kickstarter Projects</h1>
      <TableInfo
        projects={displayedProjects}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;

