import { useState, useRef, useEffect } from "react";

export default function Form() {
  const [formState, setFormState] = useState({
    name: "",
    gender: "",
    role: "",
    maritalStatus: "",
    image: null
  });

  const refImage = useRef(null);

  useEffect(() => {}, []);

  const handleUpdateImage = (e) => {
    const file = e.target.files[0];
    setFormState({
      ...formState,
      image: file
    });
  };

  const handleFormUpdate = (e) => {
    let { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormState({
      ...formState,
      [name]: val
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };
  return (
    <form>
      <div>
        <div>
          <lable>Name : </lable>
          <input
            onChange={handleFormUpdate}
            value={formState.name}
            placeholder="Name"
            type="text"
            name="name"
          />
        </div>
        <br />
        <div>
          <label> Gender : </label>
          <select
            name="gender"
            value={formState.gender}
            onChange={handleFormUpdate}
          >
            <option value="M" key="male">
              M
            </option>
            <option value="F" key="female">
              f
            </option>
          </select>
        </div>
        <br />
        <div>
          <label>Role : </label>
          <select
            name="role"
            value={formState.role}
            onChange={handleFormUpdate}
          >
            <option value="manager" key="manager">
              Manager
            </option>
            <option value="hr" key="hr">
              HR
            </option>
            <option value="finance" key="finance">
              finance
            </option>
            <option value="developer" key="developer">
              developer
            </option>
          </select>
        </div>
        <br />
        <div>
          <label>Marital Status :</label>
          <input
            value={formState.maritalStatus}
            onChange={handleFormUpdate}
            type="checkbox"
            name="maritalStatus"
          />
        </div>
        <br />
        <div>
          <label>Profile Picture : </label>
          <input type="file" ref={refImage} onChange={handleUpdateImage} />
        </div>
        <br />
        <button onClick={handleSubmit} ref={refImage}>
          Submit
        </button>
      </div>
    </form>
  );
}
