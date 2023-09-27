import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import myTeamData from "@/data/myTeamData";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const MyTeam = () => {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            My Team
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Id", "Member", "Position", "Email"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myTeamData.map(({ img, name, email, id, job }, key) => {
                const className = `py-3 px-5 ${
                  key === myTeamData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                const memberId = useState();

                return (
                  <tr key={name}>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {id}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar src={img} alt={name} size="sm" />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {job[0]}
                      </Typography>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {job[1]}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {email}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        <Link to={"/dashboard/my_team_member"}>
                          <Button variant="outlined">View</Button>
                        </Link>
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default MyTeam;
