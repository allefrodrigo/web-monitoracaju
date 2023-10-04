
  // react-router-dom components
  import { Link } from "react-router-dom";

  // prop-types is a library for typechecking of props
  import PropTypes from "prop-types";

  // @mui material components
  import Card from "@mui/material/Card";
  import CardMedia from "@mui/material/CardMedia";
  import Tooltip from "@mui/material/Tooltip";

  // Monitora Caju React components
  import MDBox from "components/MDBox";
  import MDTypography from "components/MDTypography";
  import MDButton from "components/MDButton";

  function DefaultProjectCard({ image, title, description, link, actions }) {
    const url = link ? link : "#";
    console.log('url', url)
    const truncatedDescription = description.length > 150 ? description.substring(0, 150) + "..." : description;

    
    return (
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "transparent",
          boxShadow: "none",
          overflow: "visible",
        }}
      >
        <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
          <CardMedia
            src={`${image}`}
            component="img"
            title={title}
            sx={{
              maxWidth: "100%",
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </MDBox>
        <MDBox mt={1} m={2}>
        
          <MDBox mb={1}>
            <Tooltip title={url} placement="top">

          <MDTypography
                variant="h5"
                textTransform="capitalize"
                onClick={() => window.open(url, "_blank")}
                style={{ cursor: "pointer" }}
              >
                {title}
              </MDTypography>
            </Tooltip>

          </MDBox>
          <MDBox mb={3} lineHeight={0}>
            <MDTypography variant="button" fontWeight="light" color="text">
              {truncatedDescription}
            </MDTypography>
          </MDBox>
          <MDBox display="flex" justifyContent="space-around" alignItems="center">
            {actions}
          </MDBox>
        </MDBox>
      </Card>
    );
  }

  // Setting default values for the props of DefaultProjectCard
  DefaultProjectCard.defaultProps = {
    authors: [],
  };

  // Typechecking props for the DefaultProjectCard
  DefaultProjectCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,

    authors: PropTypes.arrayOf(PropTypes.object),
  };

  export default DefaultProjectCard;
