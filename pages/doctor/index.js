import { useState, useEffect } from "react";
import useAsync from "../../hooks/useAsync";
import axios from "../../network/axios";
import { useRouter } from "next/router";
const Doctor = () => {
  const [code, setCode] = useState("");
  const router = useRouter();
  const [record, setRecord] = useState(null);
  const { data, loading, execute, error } = useAsync(
    { execOnStart: false },
    null
  );
  const {
    data: newRecData,
    loading: saveLoading,
    execute: executeSave,
  } = useAsync({ execOnStart: false }, null);
  const {
    data: closeRes,
    loading: closeLoading,
    execute: executeClose,
  } = useAsync({ execOnStart: false }, null);

  const [newReport, setNewReport] = useState("");
  const [newRec, setNewRec] = useState(0);
  useEffect(() => {
    if (closeRes?.data) {
      setRecord(null);
    }
  }, [closeRes]);
  useEffect(() => {
    console.log(record);
  }, [record]);
  useEffect(() => {
    if (!data) return;
    if (data.data) {
      //   router.push("/doctor/session");
      setRecord(data.data);
    } else if (data.error) {
      alert("invalid code");
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      alert("invalid code");
    }
  }, [error]);
  useEffect(() => {
    console.log(newRecData?.data);
    if (newRecData?.data) setRecord(newRecData.data.record);
  }, [newRecData]);
  return (
    <div className="bg-white rounded-lg p-4 overflow-hidden">
      {!record && (
        <div className="bg-gray-200  p-4 rounded-lg flex flex-col justify-center items-center">
          <label htmlFor="shortId">Enter Code : </label>
          <input
            className="mneu"
            id="shortId"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            className="login-btn"
            disabled={loading}
            onClick={() => {
              execute(() => axios.get(`record/getFromLink/${code}`));
            }}
          >
            Get patient records
          </button>
        </div>
      )}
      {record && (
        <div>
          {record ? (
            <div>
              <div className="bg-blue-200 rounded-lg p-2">
                {record.recordData.length === 0 && "0 records found"}
                {record.recordData.map((r, i) => (
                  <h1 key={i}>{r}</h1>
                ))}
              </div>
              <div className="bg-blue-200 rounded-lg p-2 m-1">
                {record.recordData.length === 0 && "0 reports found"}
                {record.reports.map((r, i) => (
                  <h1 key={i}>{r}</h1>
                ))}
              </div>
            </div>
          ) : null}
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="newRec">Add new record: </label>
              <input
                id="newRec"
                className="border-2 mneu"
                type="number"
                value={newRec}
                onChange={(e) => setNewRec(e.target.value)}
              />
              <label htmlFor="newRec-report">Add report</label>
              <textarea
                id="newRec-report"
                className="border-2 mneu-textarea"
                type="number"
                value={newReport}
                onChange={(e) => setNewReport(e.target.value)}
              />
            </div>
            <button
              className="login-btn"
              onClick={() =>
                executeSave(() =>
                  axios.put(`record/update`, {
                    shortId: code,
                    newData: {
                      recordData: newRec,
                      report: newReport,
                    },
                  })
                )
              }
              disabled={saveLoading}
            >
              Save rec
            </button>
            <button
              className="bg-red-600 rounded-xl text-white p-2 w-48"
              onClick={() =>
                executeClose(() => axios.delete(`record/link/${code}`))
              }
              disabled={closeLoading}
            >
              Close session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctor;
