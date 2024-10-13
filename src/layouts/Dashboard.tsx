import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import DashboardSidebar from "../components/DashboardSidebar";
import { Box, Flex } from "@chakra-ui/react";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Flex>
        <DashboardSidebar />
        <Box mt={20} flexGrow={1}>
          <Outlet />
        </Box>
      </Flex>
    </>
  );
};

export default DashboardLayout;
