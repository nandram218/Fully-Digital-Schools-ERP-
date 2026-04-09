import React, { useState, useMemo } from "react";

// Level mapping
const LEVELS = {
  "Pre-Primary": ["Play Group","PP3","PP4","PP5","Nursery","LKG","UKG"],
  "Primary": ["1st","2nd","3rd","4th","5th"],
  "Middle": ["6th","7th","8th"],
  "Secondary": ["9th","10th"],
  "Senior Secondary": ["11th","12th"]
};

// Flattened classes for dropdown
const ALL_CLASSES = Object.values(LEVELS).flat();

// Streams for 11th/12th
const STREAMS = ["Science","Commerce","Arts","Agriculture"];
const STREAM_SHORT = { "Science":"Sci", "Commerce":"Com", "Arts":"Arts", "Agriculture":"Agri" };

// Row colors
const ROW_COLORS = {
  "Play Group":"#fce4ec","PP3":"#fce4ec","PP4":"#fce4ec","PP5":"#fce4ec",
  "Nursery":"#e3f2fd","LKG":"#e3f2fd","UKG":"#e3f2fd",
  "1st":"#e8f5e9","2nd":"#e8f5e9","3rd":"#e8f5e9","4th":"#e8f5e9","5th":"#e8f5e9",
  "6th":"#fff3e0","7th":"#fff3e0","8th":"#fff3e0",
  "9th":"#fffde7","10th":"#fffde7",
  "11th":"#ede7f6","12th":"#ede7f6"
};

const SummaryCard = ({label,count,children}) => (
  <div style={{flex:1,backgroundColor:"#007bff",color:"white",padding:"10px",borderRadius:"8px",textAlign:"center",fontWeight:"bold"}}>
    <div>{label}: {count}</div>
    {children && <div style={{display:"flex",gap:"5px",flexWrap:"wrap",justifyContent:"center",marginTop:"5px"}}>{children}</div>}
  </div>
);

const StudentRow = ({student,onEdit,onDelete}) => (
  <tr style={{borderBottom:"1px solid #ddd",textAlign:"center",height:"40px",cursor:"pointer",backgroundColor:ROW_COLORS[student.class]||"white"}}
      onMouseEnter={e=>e.currentTarget.style.backgroundColor="#f0f8ff"}
      onMouseLeave={e=>e.currentTarget.style.backgroundColor=ROW_COLORS[student.class]||"white"}>
    <td>{student.id}</td>
    <td>{student.name}</td>
    <td>{student.class}</td>
    <td>{student.stream||"-"}</td>
    <td>
      <button onClick={()=>onEdit(student)} style={{padding:"4px 8px",marginRight:"8px",borderRadius:"5px",border:"none",backgroundColor:"#2196F3",color:"white",cursor:"pointer"}}>Edit</button>
      <button onClick={()=>onDelete(student.id)} style={{padding:"4px 8px",borderRadius:"5px",border:"none",backgroundColor:"#f44336",color:"white",cursor:"pointer"}}>Delete</button>
    </td>
  </tr>
);

const Students = () => {
  const [students,setStudents] = useState([
    {id:1,name:"Ram",class:"10th"},
    {id:2,name:"Shyam",class:"12th",stream:"Science"},
    {id:3,name:"Geeta",class:"11th",stream:"Commerce"}
  ]);
  const [name,setName] = useState("");
  const [studentClass,setStudentClass] = useState("");
  const [stream,setStream] = useState("");
  const [editId,setEditId] = useState(null);
  const [searchTerm,setSearchTerm] = useState("");
  const [classFilter,setClassFilter] = useState("");
  const [currentPage,setCurrentPage] = useState(1);
  const STUDENTS_PER_PAGE = 5;

  // ---------------- Derived
  const totalStudents = students.length;

  const levelCounts = useMemo(()=>{
    return Object.keys(LEVELS).map(level=>({
      level,
      count: students.filter(stu=>LEVELS[level].includes(stu.class)).length
    }));
  },[students]);

  const seniorStreams = useMemo(()=>{
    const seniorStu = students.filter(stu=>["11th","12th"].includes(stu.class));
    return STREAMS.filter(s=>seniorStu.some(stu=>stu.stream===s))
           .map(s=>({short:STREAM_SHORT[s],count:seniorStu.filter(stu=>stu.stream===s).length}));
  },[students]);

  const filteredStudents = useMemo(()=>{
    let temp = students.filter(stu=>stu.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if(classFilter) temp = temp.filter(stu=>stu.class===classFilter);
    return temp;
  },[students,searchTerm,classFilter]);

  const indexOfLast = currentPage*STUDENTS_PER_PAGE;
  const indexOfFirst = indexOfLast-STUDENTS_PER_PAGE;
  const currentStudents = filteredStudents.slice(indexOfFirst,indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length/STUDENTS_PER_PAGE);

  // ---------------- Handlers
  const addOrUpdateStudent = ()=>{
    if(!name||!studentClass) return;
    const newStu = {id:editId||students.length+1,name, class:studentClass, stream:(studentClass==="11th"||studentClass==="12th")?stream:""};
    if(editId) setStudents(students.map(stu=>stu.id===editId?newStu:stu));
    else setStudents([...students,newStu]);
    setName(""); setStudentClass(""); setStream(""); setEditId(null);
  };

  const editStudent = stu => { setEditId(stu.id); setName(stu.name); setStudentClass(stu.class); setStream(stu.stream||""); };
  const deleteStudent = id => setStudents(students.filter(stu=>stu.id!==id));

  const exportToCSV = ()=>{
    const headers = ["ID","Name","Class","Stream"];
    const rows = filteredStudents.map(stu=>[stu.id,stu.name,stu.class,stu.stream||""]);
    const csvContent = "data:text/csv;charset=utf-8,"+[headers,...rows].map(e=>e.join(",")).join("\n");
    const link = document.createElement("a"); link.setAttribute("href",encodeURI(csvContent));
    link.setAttribute("download","students_list.csv"); document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  // ---------------- JSX
  return (
    <div style={{padding:"20px",fontFamily:"Arial,sans-serif"}}>
      <h2>Students Module</h2>

      {/* Summary Cards */}
      <div style={{display:"flex",gap:"10px",marginBottom:"15px",flexWrap:"wrap"}}>
        <SummaryCard label="School Total Students" count={totalStudents}/>
        {levelCounts.map(lc=>
          <SummaryCard key={lc.level} label={`${lc.level} Level Students`} count={lc.count}
            children={lc.level==="Senior Secondary"?seniorStreams.map(s=><div key={s.short} style={{padding:"2px 6px",backgroundColor:"#fff",color:"#000",borderRadius:"4px"}}>{s.short}: {s.count}</div>):null}
          />
        )}
      </div>

      {/* Search & Filter */}
      <div style={{display:"flex",gap:"10px",marginBottom:"15px",flexWrap:"wrap"}}>
        <input placeholder="Search Name" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} style={{padding:"6px 10px",borderRadius:"5px",border:"1px solid #ccc"}}/>
        <select value={classFilter} onChange={e=>setClassFilter(e.target.value)} style={{padding:"6px 10px",borderRadius:"5px",border:"1px solid #ccc"}}>
          <option value="">All Classes</option>
          {ALL_CLASSES.map(cls=><option key={cls} value={cls}>{cls}</option>)}
        </select>
        <button onClick={exportToCSV} style={{padding:"6px 12px",borderRadius:"5px",border:"none",backgroundColor:"#FF9800",color:"white"}}>Export CSV</button>
      </div>

      {/* Add/Edit Form */}
      <div style={{marginBottom:"15px"}}>
        <input placeholder="Enter Name" value={name} onChange={e=>setName(e.target.value)} style={{padding:"6px 10px",borderRadius:"5px",border:"1px solid #ccc"}}/>
        <select value={studentClass} onChange={e=>setStudentClass(e.target.value)} style={{padding:"6px 10px",borderRadius:"5px",border:"1px solid #ccc",marginLeft:"10px"}}>
          <option value="">Select Class</option>
          {ALL_CLASSES.map(cls=><option key={cls} value={cls}>{cls}</option>)}
        </select>
        {(studentClass==="11th"||studentClass==="12th") &&
          <select value={stream} onChange={e=>setStream(e.target.value)} style={{padding:"6px 10px",borderRadius:"5px",border:"1px solid #ccc",marginLeft:"10px"}}>
            <option value="">Select Stream</option>
            {STREAMS.map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
        }
        <button onClick={addOrUpdateStudent} style={{marginLeft:"10px",padding:"6px 12px",borderRadius:"5px",border:"none",backgroundColor:"#4CAF50",color:"white"}}>{editId?"Update":"Add"}</button>
      </div>

      {/* Students Table */}
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead>
          <tr style={{backgroundColor:"#007bff",color:"white"}}>
            <th style={{border:"1px solid #ddd",padding:"8px"}}>ID</th>
            <th style={{border:"1px solid #ddd",padding:"8px"}}>Name</th>
            <th style={{border:"1px solid #ddd",padding:"8px"}}>Class</th>
            <th style={{border:"1px solid #ddd",padding:"8px"}}>Stream</th>
            <th style={{border:"1px solid #ddd",padding:"8px"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map(stu=><StudentRow key={stu.id} student={stu} onEdit={editStudent} onDelete={deleteStudent}/>)}
          {currentStudents.length===0 && <tr><td colSpan="5" style={{textAlign:"center",padding:"10px"}}>No students found</td></tr>}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages>1 && <div style={{marginTop:"15px",textAlign:"center"}}>
        {Array.from({length:totalPages},(_,i)=><button key={i} onClick={()=>setCurrentPage(i+1)} style={{margin:"0 5px",padding:"4px 8px",borderRadius:"4px",border:"1px solid #ccc",backgroundColor:currentPage===i+1?"#007bff":"white",color:currentPage===i+1?"white":"black"}}>{i+1}</button>)}
      </div>}
    </div>
  );
};

export default Students;