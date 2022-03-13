import { useState, useEffect } from "react";
const useAsync = (
  { DEFAULT_DATA = null, execOnStart = true } = {},
  defaultFetchData = null
) => {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const execute = async (fn = null) => {
    let fetchData = fn;
    if (fetchData === null) {
      fetchData = defaultFetchData;
    }
    if (!fetchData) {
      throw new Error("FETCH DATA IS NULL");
    }
    try {
      setLoading(true);
      const { data } = await fetchData();
      setData(data);
    } catch (err) {
      console.log("err: ", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (execOnStart) {
      execute();
    }
  }, []);

  return {
    execute,
    data,
    error,
    loading,
  };
};
export default useAsync;
