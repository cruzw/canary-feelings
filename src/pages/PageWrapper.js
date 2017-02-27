import React from "react";
import UniversalHeader from "../components/UniversalHeader";

const pageStyles = {
  minHeight: "100vh",
  width: "100vw",
  boxSizing: "border-box",
  margin: 0,
  padding: 0
};

const contentContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "calc(100vh - 64px)"
};

const PageWrapper = ({ children, customTitle, router }) => (
	<div style={{ ...pageStyles }}>
		<UniversalHeader
			customTitle={customTitle}
			router={router}
		/>
		<div style={{ ...contentContainerStyles }}>
			{ children }
		</div>
	</div>
);

export default PageWrapper;
