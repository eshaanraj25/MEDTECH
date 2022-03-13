import { useEffect, useState } from "react";
import { useWeb3Context } from "../../context/Web3Context";
import { useRouter } from "next/router";
import useAsync from "../../hooks/useAsync";
import axios from "../../network/axios";

const Patient = () => {
  const { getPatient } = useWeb3Context();
  const [patient, setPatient] = useState(null);
  const {
    data: recordData,
    loading,
    execute,
  } = useAsync({
    execOnStart: false,
  });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const pateint = await getPatient();
      if (pateint) {
        setPatient(pateint);
      } else {
        router.push("/patient/create");
      }
    })();
  }, []);

  useEffect(() => {
    if (!patient) return;
    execute(() => axios.get(`/record/${patient.rId}`));
  }, [patient]);

  // useEffect(() => {
  //   console.log("DTATAA: ", recordData);
  // }, [recordData]);

  if (loading) return <>LOADING</>;

  return (
    <div className="bg-white p-4 rounded-lg ">
      <h1>Patient:</h1>
      <div className="flex flex-col justify-center items-center">
        {patient && patient.rId && (
          <>
            <h1>name :{patient.name}</h1>
            <h1>dob :{patient.dob}</h1>
            {/* <h1>rId :{patient.rId}</h1> */}
            <GenLink id={patient.rId} />
          </>
        )}
      </div>
    </div>
  );
};

export default Patient;

const GenLink = ({ id }) => {
  const { data, loading, execute } = useAsync({
    execOnStart: false,
  });
  useEffect(() => {
    console.log("data: ", data);
  }, [data]);
  return (
    <>
      {data ? (
        <>
          <h1>{data.data.shortId}</h1>
        </>
      ) : (
        <button
          className="login-btn"
          disabled={loading}
          onClick={() => {
            execute(() =>
              axios.post(`/record/genLink`, {
                id,
              })
            );
          }}
        >
          {loading ? "loading" : "Gen link"}
        </button>
      )}
    </>
  );
};
