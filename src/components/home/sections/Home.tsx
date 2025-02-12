import { useState, useEffect, useCallback } from "react";
import LoadingIndicator from "../LoadingIndicator";
import ErrorDisplay from "../ErrorDisplay";
import SuggestedFilesGrid from "../SuggestedFilesGrid";
import RecentFilesGrid from "../RecentFileGrid";
import RecentFilesTable from "../RecentFilesTable";
import ButtonGroup from "../ButtonGroup";
import axios from "axios";

interface File {
  fileName: string;
  created: string;
  modified: string;
  imagepath: string;
  mime_type: string;
  size: number;
}

const Home: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<number>(2);

  const fetchData = useCallback(() => {
    setLoading(true);
    axios
      .get("/api/directory", {
        params: {
          path: ".",
        },
      })
      .then((response) => {
        console.log(response.data);
        const directories = response.data.directories;
        const requestedPath = ".";
        if (directories && Array.isArray(directories[requestedPath])) {
          setFiles(directories[requestedPath]);
        } else {
          setFiles([]);
          setError("Unexpected response format.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch directory data.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <LoadingIndicator />
      </div>
    );
  }

  if (error) {
    return <ErrorDisplay errorMessage={error} />;
  }

  return (
    <div>
      <section className="px-6">
        <h2 className="text-xl font-bold mt-1 mb-4 dark:text-white">For you</h2>
        <SuggestedFilesGrid files={files.slice(0, 5)} refreshData={fetchData} />
      </section>
      <section className="px-6">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold dark:text-white">Recent</h2>
          <div>
            <ButtonGroup activeView={view} onChangeView={setView} />
          </div>
        </div>
        {view === 1 ? (
          <RecentFilesGrid files={files} refreshData={fetchData} />
        ) : (
          <RecentFilesTable files={files} refreshData={fetchData} />
        )}
      </section>
    </div>
  );
};

export default Home;
