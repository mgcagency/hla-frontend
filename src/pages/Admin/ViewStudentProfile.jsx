import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Navbar/StudentToggleBtnHeader";
import ScheduledClassesCard from "../../components/Dashboard/ScheduledClassesCard";
import { IMAGES } from "../../assets";
import AttendanceChart from "../../components/Admin/Students/AttendanceChart";
import ClassEngChart from "../../components/Admin/Students/ClassEngChart";
import HittingObjChart from "../../components/Admin/Students/HittingObjChart";
import { useLocation } from "react-router-dom";
import EditStudent from "../../components/Admin/Students/EditStudent";
import StudentEditedPopup from "../../components/Admin/Students/StudentEditedPopup";
import { useOverLay } from "../../contexts/OverlayContext";
import { useGetUsers } from "../../contexts/GetUsersContext";
import { giveBgColor } from "../../utils/BgColor";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ViewStudentProfile() {
  const [profileSelectedPage, setProfileSelectedPage] = useState("Profile");
  const [selectedOption, setSelectedOption] = useState("This Week");
  const [classes, setClasses] = useState([]);
  const [seeAllView, setSeeAllView] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [editedPopup, setEditedPopup] = useState(false);
  const { toggleOverlay, isOverlayEnable } = useOverLay();

  const location = useLocation();
  const { refetch } = useGetUsers();

  const handleProfilePageToggle = (page) => {
    setProfileSelectedPage(page);
  };

  const toggleSeeAllView = () => {
    setSeeAllView(!seeAllView);
  };

  const toggleEditModal = (student) => {
    setSelectedStudent(student);
    setEditModal(!editModal);
    toggleOverlay();
  };

  const toggleEditedPopup = () => {
    setEditedPopup(!editedPopup);
  };

  const [objectivesStats, setObjectivesStats] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [engagementStats, setEngagementStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPdf, setIsPdf] = useState(false);

  const getClassesData = async () => {
    setLoading(true);
    console.log("location is : ", location.state);
    let totalClasses = location?.state.assignedClasses.filter(
      (f) => f.status == "Completed"
    );
    let totalPresents = 0;

    let objectives = {
      workingTowards: 0,
      hit: 0,
      exceeded: 0,
      no: 0,
    };

    let engagement = {
      fully: 0,
      partially: 0,
      notAtAll: 0,
    };

    console.log("total finished classes", totalClasses);

    totalClasses.map((item) => {
      if (item?.review_id?.question[0].a == "Yes.") {
        totalPresents++;
      }

      if (item?.review_id.question[3].a == "Working Towards") {
        objectives.workingTowards = objectives.workingTowards + 1;
      }

      if (item?.review_id.question[3].a == "No") {
        objectives.no = objectives.no + 1;
      }

      if (item?.review_id.question[3].a == "Hit") {
        objectives.hit = objectives.hit + 1;
      }

      if (item?.review_id.question[3].a == "Exceeded") {
        objectives.exceeded = objectives.exceeded + 1;
      }

      if (item?.review_id.question[1].a == "Paritally") {
        engagement.partially = engagement.partially + 1;
      }

      if (item?.review_id.question[1].a == "Fully") {
        engagement.fully = engagement.fully + 1;
      }

      if (item?.review_id.question[1].a == "Not At All") {
        engagement.notAtAll = engagement.notAtAll + 1;
      }
    });

    let attendanceObj = {
      totalPresents,
      totalAbsents: totalClasses?.length - totalPresents,
    };

    console.log("objectives : ", objectives);
    console.log("engagement : ", engagement);

    setObjectivesStats(objectives);
    setEngagementStats(engagement);
    setAttendance(attendanceObj);

    setLoading(false);
  };

  useEffect(() => {
    getClassesData();
  }, []);

  const contentRef = useRef(null);

  async function getPdfDownload() {

    setIsPdf(true);
    let div1 = document.getElementById("div1");
    // let profilePic = document.getElementById("profilePic");
    // profilePic.src = await location?.state?.student?.photo;
    
    let classeng = document.getElementById("classeng");
    let classeng1 = document.getElementById("classeng1");
    classeng.style.display = "none"
    classeng1.style.display = "flex"
    
    let attendance = document.getElementById("attendance");
    attendance.style.display = "none"
    
    let hittingobj = document.getElementById("hittingobj");
    let hittingobj1 = document.getElementById("hittingobj1");
    hittingobj.style.display = "none"
    hittingobj1.style.display = "flex"


    div1.style.paddingBottom = "20px";
    div1.style.paddingTop = "4px";
    const content = contentRef.current;
    if (!content) return;
    const scale = 1.5;
    const canvas = await html2canvas(content, {
      scale: scale,
      useCORS: true,
      logging: false,
      windowWidth: content.scrollWidth,
      windowHeight: content.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      unit: "px",
      format: "a4",
      orientation: "landscape",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const widthRatio = pageWidth / canvas.width;
    const heightRatio = pageHeight / canvas.height;
    const ratio = Math.min(widthRatio, heightRatio);

    const canvasWidth = canvas.width * ratio;
    const canvasHeight = canvas.height * ratio;

    console.log("again cnvas withd : ", canvasWidth);
    console.log("again cnvas height : ", canvasHeight);

    const marginX = (pageWidth - canvasWidth) / 2;
    const marginY = 10;
    // const marginY = (pageHeight - canvasHeight) / 2;

    console.log(" margin x : ", marginX);
    console.log(" margin Y : ", marginY);

    setTimeout(() => {
      div1.style.paddingBottom = "10px"
    }, 1000);

    pdf.addImage(imgData, "PNG", marginX, marginY, canvasWidth, canvasHeight);

    pdf.save("report.pdf");

    hittingobj.style.display = "flex"
    hittingobj1.style.display = "none"
    attendance.style.display = "flex"
    classeng.style.display = "flex"
    classeng1.style.display = "none"


    setTimeout(() => {
      setIsPdf(false);
    }, 1000);
  }

  return (
    <>
      <div
        className={`flex flex-col p-2 rounded-tl-3xl bg-white rounded-bl-3xl h-full w-full`}
      >
        {/* Header  */}
        <Header
          selectedPage={profileSelectedPage}
          handlePageToggle={setProfileSelectedPage}
          student={location?.state}
        />
        {editedPopup && <StudentEditedPopup toggleFunc={toggleEditedPopup} />}

        {/* Main Page  */}
        <div className="flex flex-col text-customGray font-medium text-lg">
          {/* Upper Div  */}
          <div id="contents"
              ref={contentRef} className="flex flex-col items-center mdLg:flex-row mdLg:items-start gap-x-10 px-5 mt-5 ">
            {/* Left Div  */}
            <div className="flex-1 mb-8 mdLg:mb-0 ">
              <p className="mb-2 text-center mdLg:text-start">Profile</p>
              <div className="w-[400px] h-[400px] mdLg:w-auto mdLg:h-[800px] lg:h-[550px] border-2 border-gray-300 rounded-lg p-4 px-6 space-y-4">
                {/* Edit Icon  */}
                <div
                  onClick={toggleEditModal}
                  className="flex flex-row-reverse items-center cursor-pointer"
                >
                  <p className="text-sm ml-2">Edit</p>
                  <img
                    src={IMAGES.edit_icon2}
                    alt="Edit Icon"
                    className="w-[15px] h-[15px]"
                  />
                </div>

                {/* Profile Image and Name  */}
                <div className="flex flex-col items-center">
                  <img
                  id="profilePic"
                    src={IMAGES.default_profile}
                    // src={location?.state?.student?.photo || IMAGES.avatar}
                    alt="Student Pic"
                    className="w-20 h-20 rounded-full mb-1 border border-black"
                  />
                  <p>{location?.state.student.name}</p>
                </div>

                {/* profile Data  */}
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-customLightGray font-normal">
                      Name
                    </p>
                    <p className="text-sm">{location?.state.student.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-customLightGray font-normal">
                      Email
                    </p>
                    <p className="text-sm">{location?.state.student.email}</p>
                  </div>
                  <div>
                    {/* <p className="text-xs text-customLightGray font-normal">
                      Phone No
                    </p>
                    <p className="text-sm">{location?.state.student.phoneNo}</p> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Div  */}
            <div
              className="mdLg:flex-[2] flex-1 flex flex-col justify-center md:w-8/12 w-6/12  "
            >
              <div className="flex flex-row justify-between mb-4">
                <p className="mb-2 text-start flex-start">Report</p>
                <p onClick={getPdfDownload} id="div1" className="mb-2 text-start flex-start cursor-pointer bg-customMaroon text-white px-4 py-2 rounded-lg hover:bg-customMaroon/90">
                  Download
                </p>
                {/* <DropDown
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                /> */}
              </div>
              {/* Recently Scheduled Classes Cards  */}
              {/* {!editModal && ( */}

              {/* <div>hi</div> */}
              {!loading && (
                <div className="flex h-60 flex-col lg:grid lg:grid-cols-2 gap-2 ">
                  <AttendanceChart data={attendance} ispdf={isPdf} />
                  <ClassEngChart data={engagementStats} ispdf={isPdf} />
                  <HittingObjChart data={objectivesStats} ispdf={isPdf} />
                </div>
              )}
              {/* )} */}
            </div>
          </div>

          {/* Lower Div  */}
          <div className="px-5 mt-10 mb-8">
            {seeAllView}
            <div className="">
              <div className="flex flex-row justify-between mb-3">
                <p className="font-semibold">
                  {seeAllView
                    ? "All Scheduled Classes"
                    : "Recently Scheduled Classes"}
                </p>
                <p
                  onClick={toggleSeeAllView}
                  className="text-sm text-customYellow hover:underline cursor-pointer"
                >
                  {seeAllView ? "See Less" : "See All"}
                </p>
              </div>
              {/* Recently Scheduled Classes Cards  */}
              {location.state.assignedClasses.length === 0 ? (
                <div className="flex h-40 justify-center items-center">
                  <p>No classes scheduled</p>
                </div>
              ) : (
                <div
                  className={`${
                    seeAllView
                      ? "flex flex-col md:grid md:grid-cols-3 gap-4"
                      : "flex flex-row gap-4"
                  } `}
                >
                  {seeAllView
                    ? location.state.assignedClasses
                        .slice()
                        .reverse()
                        .map((item, index) => (
                          <ScheduledClassesCard
                            key={index}
                            title={item.title}
                            location={item.location.name}
                            teacherName={item.teacher_id.name}
                            teacherImg={item.teacher_id.photo}
                            studentName={item.student_id.name}
                            studentImg={item.student_id.photo}
                            startTime={item.startTime}
                            endTime={item.endTime}
                            days={item.weekDays}
                            dotsMenu={false}
                            bgColor={giveBgColor(index)}
                          />
                        ))
                    : location.state.assignedClasses
                        .slice()
                        .reverse()
                        .slice(0, 3)
                        .map((item, index) => (
                          <ScheduledClassesCard
                            key={index}
                            title={item.title}
                            location={item.location.name}
                            teacherName={item.teacher_id.name}
                            teacherImg={item.teacher_id.photo}
                            studentName={item.student_id.name}
                            studentImg={item.student_id.photo}
                            startTime={item.startTime}
                            endTime={item.endTime}
                            days={item.weekDays}
                            dotsMenu={false}
                            bgColor={giveBgColor(index)}
                          />
                        ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {editModal && (
          <EditStudent
            student={location?.state}
            toggleFunc={toggleEditModal}
            editedPopup={editedPopup}
            toggleEditedPopup={toggleEditedPopup}
          />
        )}
      </div>
    </>
  );
}
