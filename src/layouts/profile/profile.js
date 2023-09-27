import { Card, CardBody, Avatar, Typography, Tooltip } from "@material-tailwind/react";
import { Dialog } from "@headlessui/react";

import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { useEffect, useState } from "react";
import { profile } from "@/Api/Api";
import { API_AUTHORIZATION_CODE } from "Api/Api";
let circleCommonClasses = "h-2.5 w-2.5 bg-current   rounded-full";
export function Profile() {
  const [profileData, setProfile] = useState();
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPanCardModalOpen, setIsPanCardModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPanCardModal = () => {
    setIsPanCardModalOpen(true);
  };

  const closePanCardModal = () => {
    setIsPanCardModalOpen(false);
  };
  useEffect(() => {
    getLocalToke();
  }, []);
  const getLocalToke = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      setLoader(true);
      fetch(profile, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_AUTHORIZATION_CODE,
        },
        body: JSON.stringify({ token: token }),
      })
        .then((response) => response.json())
        .then((response) => {
          setLoader(false);
          const data = response.data;
          if (data) {
            setLoader(false);
            console.log(data);
            setProfile(data);
          } else {
            setLoader(false);
            console.error("API response is not an array:", data);
          }
        })
        .catch((error) => {
          setLoader(false);
          console.error(error);
        });
    }
  };
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-none bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 rounded-none">
        {loader ? (
          <div
            className="flex justify-center items-center"
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
          </div>
        ) : (
          <CardBody className="p-4">
            <div className="mb-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <Avatar
                  src={profileData?.urlPath + "/" + profileData?.user?.meta?.photo}
                  alt="bruce-mars"
                  size="xl"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {profileData?.user?.name}
                  </Typography>
                  <Typography variant="small" className="font-normal text-blue-gray-600">
                    {profileData?.levelDetails?.name}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:max-w-[450px]">
                <div className="border shadow-md p-3">
                  <h1 className="font-bold my-2">Contact Details</h1>
                  <p>
                    <span className="font-bold">Phone :</span> {profileData?.user?.phone}
                  </p>
                  <p>
                    {" "}
                    <span className="font-bold">Email : </span>
                    {profileData?.user?.email}
                  </p>

                  <p>
                    <span className="font-bold">Permanent address :</span>{" "}
                    {profileData?.usersDetails?.contact_details?.permanent_address.street},{" "}
                    {profileData?.usersDetails?.contact_details?.permanent_address.city},{" "}
                    {profileData?.usersDetails?.contact_details?.permanent_address.state},{" "}
                    {profileData?.usersDetails?.contact_details?.permanent_address.postcode}
                  </p>

                  <p>
                    <span className="font-bold">Residential address :</span>{" "}
                    {profileData?.usersDetails?.contact_details?.residential_address.street},{" "}
                    {profileData?.usersDetails?.contact_details?.residential_address.city},{" "}
                    {profileData?.usersDetails?.contact_details?.residential_address.state},{" "}
                    {profileData?.usersDetails?.contact_details?.residential_address.postcode}
                  </p>
                  <hr style={{ margin: "10px 0px" }}></hr>
                  {/* <ul className="flex flex-col gap-2 p-0">
         
         <li className="flex items-center gap-4"><b>Position</b>: { profileData?.levelDetails?.name}</li>
          <li className="flex items-center gap-4"><b>Business Amount</b>: { profileData?.level_benefits?.business_amount} RS</li>
          <li className="flex items-center gap-4"><b>Benefit Amount</b>: { profileData?.level_benefits?.benefit_amount}%</li>
          <li className="flex items-center gap-4"><b>Team Benefit</b>: { profileData?.level_benefits?.team_benefit}%</li>

     
     </ul> */}
                </div>
                <div>
                  <h1 className="mt-6 mb-3 font-bold">Documents</h1>
                  <h3 className="font-semibold my-1">Aadhar card </h3>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-2 rounded-sm mt-2"
                    onClick={openModal}
                  >
                    View Aadhar Card
                  </button>

                  {/* Modal component */}
                  <Dialog
                    open={isModalOpen}
                    onClose={closeModal}
                    className="fixed inset-0 z-10 overflow-y-auto"
                  >
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="flex flex-col items-center justify-center min-h-screen">
                      <Dialog.Title className="text-sm font-bold text-gray-800">
                        Adhar card details
                      </Dialog.Title>
                      <Dialog.Description className="text-gray-600">
                        <img
                          className="sm:max-w-[150px]"
                          src={
                            profileData?.urlPath +
                            "/" +
                            profileData?.usersDetails?.documents_details?.aadhar_card
                          }
                          alt=""
                        />
                      </Dialog.Description>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-sm text-xs mt-4"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog>

                  <h3 className="font-semibold my-1 mt-3">Pan card</h3>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-[18px]  rounded-sm mt-2"
                    onClick={openPanCardModal}
                  >
                    View Pan Card
                  </button>

                  {/* Pan Card Modal component */}
                  <Dialog
                    open={isPanCardModalOpen}
                    onClose={closePanCardModal}
                    className="fixed inset-0 z-10 overflow-y-auto"
                  >
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="flex flex-col items-center justify-center min-h-screen">
                      <Dialog.Title className="text-sm font-bold text-gray-800">
                        Pan Card Details
                      </Dialog.Title>
                      <Dialog.Description className="text-gray-600">
                        <img
                          className="sm:max-w-[150px]"
                          src={
                            profileData?.urlPath +
                            "/" +
                            profileData?.usersDetails?.documents_details?.pan_card
                          }
                          alt=""
                        />
                      </Dialog.Description>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs py-1 px-2 rounded-sm mt-4"
                        onClick={closePanCardModal}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog>
                </div>
              </div>
              <div className="w-full border shadow-md h-[162px] px-3">
                <ProfileInfoCard
                  details={{
                    "First Name": profileData?.user?.name,
                    Mobile: profileData?.user?.phone,
                    Email: profileData?.user?.email,
                  }}
                />
              </div>
            </div>
          </CardBody>
        )}
      </Card>
    </>
  );
}

export default Profile;
