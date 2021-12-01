import { useState, useRef, useEffect } from "react";
import axios from "axios";
const getTodo = () => {
  const config = {
    url: "http://localhost:3001/products",
    method: "get"
  };
  return axios(config);
};

const todoFilterDepartment = (item) => {
  if (item == "all") {
    const config = {
      url: `http://localhost:3001/products`,
      method: "get"
    };
    return axios(config);
  }
  const config = {
    url: `http://localhost:3001/products?department=${item}`,
    method: "get"
  };
  return axios(config);
};
const todoFilterSalary = (item) => {
  if (item == "all") {
    const config = {
      url: `http://localhost:3001/products`,
      method: "get"
    };
    return axios(config);
  }
  const config = {
    url: `http://localhost:3001/products?_sort=salary&_order=${item}`,
    method: "get"
  };
  return axios(config);
};

const createTodo = (name, age, address, department, salary, maritalStatus) => {
  const payload = {
    name: name,
    age: age,
    address: address,
    department: department,
    salary: salary,
    maritalStatus: maritalStatus ? "True" : "false"
  };
  const config = {
    url: "http://localhost:3001/products",
    method: "post",
    data: payload
  };
  return axios(config);
};

const todoDelete = (id) => {
  const config = {
    url: `http://localhost:3001/products/${id}`,
    method: "delete"
  };
  return axios(config);
};
export default function Form() {
  const [todo, setTodo] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    age: "",
    address: "",
    department: "",
    salary: "",
    maritalStatus: ""
  });

  const refImage = useRef(null);

  useEffect(() => {
    getTodo()
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleUpdateImage = (e) => {
  //   const file = e.target.files[0];
  //   setFormState({
  //     ...formState,
  //     image: file
  //   });
  // };

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
    createTodo(
      formState.name,
      formState.age,
      formState.address,
      formState.department,
      formState.salary,
      formState.maritalStatus
    )
      .then((res) => {
        setTodo([...todo, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDepartment = (item) => {
    todoFilterDepartment(item)
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSalary = (item) => {
    todoFilterSalary(item)
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    todoDelete(id);
    getTodo()
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
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
            <lable>Age : </lable>
            <input
              onChange={handleFormUpdate}
              value={formState.age}
              placeholder="Age"
              type="number"
              name="age"
            />
          </div>
          <br />
          <div>
            <lable>Address : </lable>
            <input
              onChange={handleFormUpdate}
              value={formState.address}
              placeholder="Address"
              type="text"
              name="address"
            />
          </div>
          <br />
          <div>
            <label>Department : </label>
            <select
              name="department"
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
            <lable>Salary : </lable>
            <input
              onChange={handleFormUpdate}
              value={formState.salary}
              placeholder="Salary"
              type="text"
              name="salary"
            />
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
          {/* <div>
          <label>Profile Picture : </label>
          <input type="file" ref={refImage} onChange={handleUpdateImage} />
        </div> */}
          <br />
          <button onClick={handleSubmit} ref={refImage}>
            Submit
          </button>
        </div>
      </form>
      <div>
        <br />
        <br />
        {["manager", "hr", "finance", "developer", "all"].map((item) => (
          <button onClick={() => handleDepartment(item)}>{item}</button>
        ))}
        <br />
        <br />
        {["ASC", "DESC", "all"].map((item) => (
          <button onClick={() => handleSalary(item)}>{item}</button>
        ))}
        <br />
        <br />
        <table border="1">
          <tr>
            <td>name</td>
            <td>age</td>
            <td>address</td>
            <td>department</td>
            <td>salary</td>
            <td>maritalStatus</td>
            <td>Button</td>
          </tr>
          {todo.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.address}</td>
              <td>{item.department}</td>
              <td>{item.salary}</td>
              <td>{item.maritalStatus}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}
