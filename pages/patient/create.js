import { useWeb3Context } from "../../context/Web3Context";
import axios from "../../network/axios";
import { useState } from "react";

const CreatePatient = () => {
  const { createPatientWeb3 } = useWeb3Context();
  const [newPatient, setNewPatient] = useState({ name: "", dob: "", rId: "" });
  const [loading, setLoading] = useState(false);

  const createPatient = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(`/record/create`);
      console.log("Data: ", data);
      const p = await createPatientWeb3(
        newPatient.name,
        newPatient.dob,
        data.data.recordId
      );
      console.log("p ", p);

      setNewPatient({ ...newPatient, rId: data.data.recordId });
    } catch (err) {
      console.log("err: ", err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white flex flex-col justify-center items-center">
      <div>
        <label htmlFor="name"> Name : </label>
        <input
          className="mneu"
          id="name"
          placeholder="enter name"
          value={newPatient.name}
          onChange={(e) => {
            setNewPatient((p) => ({ ...p, name: e.target.value }));
          }}
        />
      </div>
      <div>
        <label htmlFor="dob"> Dob : </label>
        <input
          className="mneu text-black"
          id="dob"
          placeholder="enter DOB"
          value={newPatient.dob}
          onChange={(e) => {
            setNewPatient((p) => ({ ...p, dob: e.target.value }));
          }}
        />
      </div>
      <button
        className="rounded-lg w-full p-4 bg-white text-black"
        disabled={loading}
        onClick={createPatient}
      >
        {loading ? "Loading..." : "Create"}
      </button>
    </div>
  );
};

export default CreatePatient;
