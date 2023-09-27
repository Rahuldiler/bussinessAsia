import React, { useEffect, useState } from "react";
import "../../../public/css/tree.css";
import { downtree } from "@/Api/Api";
import { API_AUTHORIZATION_CODE } from "Api/Api";
// import treeData from "@/data/treeChartData";

const TreeChart = () => {
  const [loader, setLoader] = useState(false)
  const [treeData, setTreeData] = useState([])
  const [publicPath, setPublicPath] = useState('');
  useEffect(() => {
    getDataFromLocal()
  }, [])
  const getDataFromLocal = async () => {
    setLoader(true)
    let token = await localStorage.getItem("token");
    if (token) {
      fetch(downtree, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_AUTHORIZATION_CODE,
        },
        body: JSON.stringify({ token: token }),
      })
        .then((response) => response.json())
        .then((response) => {
          setLoader(false)
          const data = response.data;
          if (data) {
            console.log(data)
            setLoader(false)
            setTreeData(data)
            setPublicPath(response.public_path)
            // setProfile(data);
          } else {
            setLoader(false)
            console.error("API response is not an array:", data);
          }
        })
        .catch((error) => {
          setLoader(false)
          console.error(error)
        });
    }
  }
  return (
    <div className="overflow-x-auto whitespace-nowrap" style={{ backgroundColor: "#fff", padding: "10px", textAlign: "center" }}>
      <h2>My Team</h2>
      <div className="tree w-max">{treeRendering(treeData, loader, publicPath)}</div>
    </div>
  );
};

const treeRendering = (treeData, loader, publicPath) => {
  console.log("loader is>>", loader)
  // let circleCommonClasses = 'h-2.5 w-2.5 bg-current   rounded-full';
  return (
    <>
      <ul>
        {loader ?
          <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
            >
          </div>
          :
          treeData.map((item) => (
            <li>
              <div className={item.text + item.id}>
                {item.photo ? <>
                  <img
                    style={{ borderRadius: 99, width: "20px", height: "20px", display: "inline-block", boxShadow: "0px 0px 3px #000" }}
                    className="h-16 rounded-full object-cover"
                    src={item.photo}
                    alt="image"
                  />
                </> : <>
                  <img
                    style={{ borderRadius: 99, width: "20px", height: "20px", display: "inline-block", boxShadow: "0px 0px 3px #000" }}
                    className="h-16 rounded-full object-cover"
                    src={publicPath + '/' + "dummy.jpg"}
                    alt="image"
                  />
                </>}

                <p className="text-base font-bold" style={{ fontSize: "10px" }}>{item.name}</p>
                <p className="font-semibold text-gray-800" style={{ fontSize: "8px", marginTop: "-8px" }}>{item.level}</p>
              </div>
              {item.children && item.children.length
                ? treeRendering(item.children, loader, publicPath)
                : ""}
            </li>
          ))}
      </ul>
    </>
  );
};

export default TreeChart;
