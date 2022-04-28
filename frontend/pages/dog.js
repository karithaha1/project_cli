import Head from "next/head";
import Layout from "../components/layout";
import { useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import config from "../config/config";
import Link from "next/link";

export default function Dog({ token }) {
    const [name, setName] = useState("");
    const [weight, setWeight] = useState(0);
    const [picture, setPicture] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [idEdit, setidEdit] = useState(0);

  const addTask = () => {
    console.log("add");
    if (tasks.length > 9) {
      alert(' Task name can not exceed 10 Tasks');
    }
    else if (name.trim() !== '') {
      const id = [tasks.length - 1] < 0 ? 1 : tasks[tasks.length - 1].id + 1;
      setTasks([...tasks, { id: id, name: name, weight: weight, picture: picture }]);
    }
    console.log('Tasks:', tasks);
  }

  const deleteTask = (id) => {
    console.log("Delete", id);
    const newTasks = tasks.filter((item) => +item.id !== +id);
    setTasks(newTasks);
  };

  const editTask = (id) => {
    console.log('Edit Task', id);
    setidEdit(id)
    let t = tasks.find((task) => +task.id === +id)
    setName(t.name)
    setWeight(t.weight)
    setPicture(t.picture)
    if (+idEdit === +id) { //Press Edit again
      let newTasks = tasks.map((task, index) => {
        if (+task.id === +id) {
          tasks[index].name = name
          tasks[index].weight = weight
          tasks[index].picture = picture
        }
        return task
      })
      setTasks(newTasks)
      setidEdit(0)
    }
  };




  const renderTask = () => {
    return tasks.map((item, index) => (
      <li key={index} className="relative m-4 border-dashed border-2 p-5 flex flex-col">
        <div className="absolute bottom-0 right-0 text-xl mr-2 text-[#17202A] font-bold font-display">
          {index + 1}
        </div>{+idEdit !== +item.id ? (
          <div className="text-2xl text-[#FFF7F7] font-bold drop-shadow-lg max-w-xs font-display">{item.name}</div>) : (
          <input className="text-xl rounded-lg text-[#00ADB5] bg-[#17202A] font-bold pl-4 mt-2 mb-2 outline-[#FFFFFF] font-display" type="task" value={name} onChange={(e) => setName(e.target.value)} />
        )
        }
        {+idEdit !== +item.id ? (
          <div className="text-2xl text-[#FFFFFF] font-bold drop-shadow-lg max-w-xs font-display">{item.weight}</div>) : (
          <input className="text-xl rounded-lg text-[#00ADB5] bg-[#17202A] font-bold pl-4 mt-2 mb-2 outline-[#00ADB5] font-display" type="task" value={weight} onChange={(e) => setWeight(e.target.value)} />
        )
        }
        {+idEdit !== +item.id ? (
          <div className="mb-4 max-w-xs max-h-xs items-center"><img src={item.picture} /></div>) : (
          <input className="text-xl rounded-lg text-[#FFFFFF] bg-[#EEEEEE] font-bold pl-4 mt-2 mb-2 outline-[#00ADB5] font-display" type="task" value={picture} onChange={(e) => setPicture(e.target.value)} />
        )
        }
        <div className="mt-2 flex justify-center">
          <button className="mr-4 p-2 bg-red-400 hover:text-[#EEEEEE] rounded-lg drop-shadow-lg font-bold font-display transition transform hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:transform-none" onClick={() => deleteTask(item.id)}>Delete</button>
          <button className="p-2 bg-yellow-500 hover:text-[#EEEEEE] rounded-lg drop-shadow-lg font-bold font-display transition transform hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:transform-none"
            onClick={() => editTask(item.id)}
          > Edit</button>
        </div>
      </li>
    ));
  };

  return (
    <Layout>
      <div className="bg-[#155C54]  text-indigo-500  h-screen">
        <Head>
          <Navbar />
        </Head>

        <div className="bg-[#155C54] flex flex-col items-center ">
          <h1 className="m-2 text-[#17202A] text-8xl font-bold italic uppercase font-display">
            Find Dog Data
          </h1>
          {/* <h1 className="text-[#EEEEEE] text-1xl font-bold uppercase font-display"><img src={avatar_url} width="40" /> Power by <span >{login} </span> </h1> */}
          <div className="flex flex-col w-5/6 justify-around items-center mt-2 mb-2 ">
            <p class="text-sky-400/100">Enter Dog name</p>
            <input
              className="text-xl text-[#FF#17202A] w-1/3 bg-[#EEEEEE] rounded-lg pl-4 mt-2 mb-2 font-bold outline-[#FFFFFF] font-display"
              type="text"
              name="task"
              onChange={(e) => setName(e.target.value)}
            />
            <p class="text-sky-400/100">Enter Contact Phone</p>
            <input
              className="text-xl text-[#17202A] w-1/3 bg-[#EEEEEE] rounded-lg pl-4 mt-2 mb-2 font-bold outline-[#FFFFFF] font-display"
              type="number"
              name="task"
              onChange={(e) => setWeight(e.target.value)}
            />
            <p class="text-sky-400/100">Enter Dog image</p>
            <input
              className="text-xl text-[#17202A] w-1/3 bg-[#EEEEEE] rounded-lg pl-4 mt-2 mb-2 font-bold outline-[#FFFFFF] font-display"
              type="text"
              name="task"
              onChange={(e) => setPicture(e.target.value)}
            />
            <button
              className="text-2xl w-1/3 bg-[#217168] font-bold text-[#FEFEFF] hover:text-[#ECEEEE] dark:md:hover:bg-[#FAFCFF] rounded-lg mt-2 mb-2 font-display"
              onClick={addTask}
            >
              Add
            </button>
          </div>
          <ul className="flex flex-wrap mb-8">{renderTask()}</ul>
        </div>
      </div>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
