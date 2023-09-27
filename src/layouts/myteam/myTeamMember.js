import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";

import { ProfileInfoCard } from "@/widgets/cards";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export function MyTeamMember() {
  return (
    <>
      <div className="relative mt-2 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Richard Davis
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  CEO / Co-Founder
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="gird-cols-1 mb-12 grid gap-8 px-4 lg:grid-cols-2 xl:grid-cols-1">
              <ProfileInfoCard
                title="Profile Information"
                description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                details={{
                  Level: "1",
                  Name: "Alec M. Thompson",
                  mobile: "(44) 123 1234 123",
                  email: "alecthompson@mail.com",
                }}
              />
              <ProfileInfoCard
                details={{
                  Team: 8,
                }}
              />
              <Link to="/dashboard/organisation_chart">
                <Button className="w-fit whitespace-nowrap" variant="contained">
                  View Tree
                </Button>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default MyTeamMember;
